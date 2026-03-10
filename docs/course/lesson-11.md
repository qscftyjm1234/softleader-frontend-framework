<!-- Author: antigravity -->

# 第十一課：全域狀態管理 (Pinia)

本課程教您如何管理跨頁面的共用資料。透過狀態，您可以輕鬆實現登入資訊同步、主題切換等功能。

---

## 1. 什麼時候該用 Pinia？

不是所有資料都需要放進 Pinia，以下幫助您判斷：

| 情境                       | 建議方式               | 原因                                                                                  |
| -------------------------- | ---------------------- | ------------------------------------------------------------------------------------- |
| 只在一個元件內使用的資料   | `ref()` / `reactive()` | 放 Pinia 是多此一舉                                                                   |
| 父子元件之間傳遞           | `props` + `emit`       | 直接傳就好，關係明確                                                                  |
| 多個不相關的頁面要共用     | ✅ **Pinia**           | 跨頁面同步，不用一層層傳                                                              |
| 登入狀態、使用者資訊       | ✅ **Pinia + Cookie**  | Pinia 負責全站同步，Cookie 負責持久化（重新整理後從 Cookie 讀回 token 再打 API 還原） |
| 主題設定、側邊欄開關       | ✅ **Pinia**           | 全域 UI 狀態，到處都要讀取                                                            |
| 表單暫存資料（僅當頁使用） | `ref()`                | 離開頁面就不需要了                                                                    |

> 簡單判斷：**「這個資料其他頁面也需要嗎？」** 答案是「是」就用 Pinia。

---

## 2. Pinia Store 的生命週期

了解 Store 何時建立、何時銷毀，可以避免踩坑。

### 2.1 Store ID（第一個參數）

`defineStore('counter', ...)` 的第一個參數是 Store 的**唯一識別碼**，用途有三：

一
**辨識身份** — Pinia 靠這個 ID 判斷「這是哪一個 Store」，ID 不同就是不同的 Store。
二
**確保單例** — 同一個 ID 不管呼叫幾次 `useCounterStore()`，Pinia 都回傳同一個實例。
三
**DevTools 除錯** — Vue DevTools 會用這個名字列出所有 Store，方便查看資料狀態。

命名慣例：檔名、ID、變數名保持一致。

| 檔案                | ID          | 變數名稱          |
| ------------------- | ----------- | ----------------- |
| `stores/counter.ts` | `'counter'` | `useCounterStore` |
| `stores/user.ts`    | `'user'`    | `useUserStore`    |
| `stores/app.ts`     | `'app'`     | `useAppStore`     |

### 2.2 記憶體與頁面切換

Nuxt 是 **SPA（單頁應用）**，點連結切換頁面時瀏覽器**不會重新載入**，JavaScript 記憶體持續存在。這是 Store 能跨頁面共用的關鍵：

```
┌─────────────────────────────────────────────────┐
│                瀏覽器記憶體                        │
│                                                 │
│  ┌──────────┐     SPA 頁面切換（NuxtLink）         │
│  │  Pinia   │  ←── 記憶體不會清空，Store 活著 ✅     │
│  │  Stores  │                                    │
│  └──────────┘     瀏覽器重新整理（F5）               │
│                ←── 記憶體全部清空，Store 銷毀 ❌     │
└─────────────────────────────────────────────────┘
```

舉例來說：

```
1. 使用者在「頁面 A」登入 → token 存進 useUserStore
2. 點 NuxtLink 去「頁面 B」 → Store 還活著，頁面 B 拿得到 token ✅
3. 再點去「頁面 C」 → Store 還活著，頁面 C 也拿得到 ✅
4. 按 F5 重新整理 → 記憶體清空，Store 被重新建立，token 沒了 ❌
   → 這就是為什麼 token 要額外存到 Cookie（見第 6 節常見問題）
```

### 2.3 生命週期流程

```
頁面 A 首次呼叫 useUserStore()
  → Store 被建立（執行 defineStore 內的初始化程式碼）
  → Store 存活在記憶體中

頁面 B 呼叫 useUserStore()
  → 取得同一個 Store 實例（不會重新建立）
  → 資料與頁面 A 完全同步

使用者重新整理瀏覽器 (F5)
  → 所有 Store 被銷毀
  → 下次呼叫時重新建立（資料歸零）
```

### 2.4 關鍵特性

一
**單例模式** — 同一個 Store 全站只有一個實例，多個頁面呼叫的是同一份資料。
二
**惰性建立** — Store 不會在應用啟動時就建立，而是第一次被 `useXxxStore()` 呼叫時才初始化。
三
**重新整理歸零** — 瀏覽器重新整理後 Store 資料會消失。如需持久化，要搭配 Cookie 或 `localStorage`。

---

## 3. Store 的三大組成

每個 Store 由三個部分組成：

| 組成        | 對應 Vue 概念 | 用途                  |
| ----------- | ------------- | --------------------- |
| **State**   | `ref()`       | 儲存資料              |
| **Getters** | `computed()`  | 基於 State 的衍生計算 |
| **Actions** | `function`    | 修改 State 的操作方法 |

---

## 4. 定義狀態倉庫

### 4.1 基礎範例：計數器

(1.) 在 `stores/` 資料夾下建立 `counter.ts`。
(2.) 貼入以下完整程式碼：

```typescript
import { defineStore } from 'pinia'

/**
 * 計數器狀態倉庫範例
 */
export const useCounterStore = defineStore('counter', () => {
  // 1. 資料 (State)
  const count = ref(0)

  // 2. 計算屬性 (Getters)
  const doubleCount = computed(() => count.value * 2)

  // 3. 動作 (Actions)
  function increment() {
    count.value++
  }

  function reset() {
    count.value = 0
  }

  // 必須 return 才能對外使用
  return {
    count,
    doubleCount,
    increment,
    reset
  }
})
```

### 4.2 實戰範例：使用者狀態

這是專案中實際使用的 `useUserStore`，管理登入狀態與使用者資訊：

```typescript
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  // State
  const user = ref<{ name: string; email: string } | null>(null)
  const token = ref<string | null>(null)
  const permissions = ref<string[]>(['*'])

  // Getters
  const isLoggedIn = computed(() => !!token.value)

  // Actions
  function login(payload: { name: string; email: string; token: string }) {
    user.value = { name: payload.name, email: payload.email }
    token.value = payload.token
  }

  function logout() {
    user.value = null
    token.value = null
  }

  // 必須 return 才能對外使用
  return {
    user,
    token,
    permissions,
    isLoggedIn,
    login,
    logout
  }
})
```

---

## 5. 在頁面中使用

### 5.1 解構的注意事項

從 Store 取資料時，**State 和 Getters** 必須用 `storeToRefs` 解構才能保持響應性；**Actions** 則直接解構即可。

```typescript
import { storeToRefs } from 'pinia'
import { useCounterStore } from '~/stores/counter'

const counterStore = useCounterStore()

// ✅ 正確：用 storeToRefs 解構 State 和 Getters
const { count, doubleCount } = storeToRefs(counterStore)

// ✅ 正確：Actions 直接解構
const { increment, reset } = counterStore

// ❌ 錯誤：直接解構 State 會失去響應性
// const { count } = counterStore  // count 不會跟著更新！
```

### 5.2 完整頁面範例

(1.) 在 `pages/` 資料夾下建立 `store-demo.vue`。
(2.) 貼入以下完整程式碼：

```vue
<template>
  <div class="p-10 min-h-screen bg-slate-50 flex items-center justify-center">
    <div
      class="max-w-md w-full bg-white border border-slate-100 p-10 rounded-[2.5rem] shadow-sm text-center"
    >
      <h1 class="text-3xl font-black text-slate-900 mb-2">全域狀態測試</h1>
      <p class="text-slate-400 mb-8">此資料跨頁面同步且具備響應性</p>

      <div class="space-y-6">
        <div class="p-8 bg-slate-50 rounded-3xl border border-slate-100">
          <div class="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
            當前數值
          </div>
          <div class="text-6xl font-black text-blue-600">{{ count }}</div>
          <div class="mt-4 text-sm text-slate-500 font-bold">加倍後：{{ doubleCount }}</div>
        </div>

        <div class="flex gap-4">
          <button
            @click="increment"
            class="flex-1 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95"
          >
            增加數值
          </button>
          <button
            @click="reset"
            class="flex-1 py-4 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all active:scale-95"
          >
            重置
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCounterStore } from '~/stores/counter'

// 取得狀態倉庫實例
const counterStore = useCounterStore()

// 使用 storeToRefs 保持響應性解構
const { count, doubleCount } = storeToRefs(counterStore)
const { increment, reset } = counterStore

definePageMeta({
  title: '狀態管理範例',
  layout: 'portal'
})
</script>
```

---

## 6. 常見問題

### Q：為什麼我的 Store 資料重新整理後就消失了？

因為 Pinia 的資料存在記憶體中，重新整理後會重新初始化。如果需要保留，可以搭配 `localStorage`：

```typescript
// 在 Action 中存入
function login(payload: { name: string; token: string }) {
  token.value = payload.token
  localStorage.setItem('token', payload.token)
}

// 在 State 初始化時讀取
const token = ref<string | null>(localStorage.getItem('token'))
```

### Q：Store 之間可以互相呼叫嗎？

可以。在 Action 內部直接呼叫另一個 Store：

```typescript
export const useCartStore = defineStore('cart', () => {
  function checkout() {
    const userStore = useUserStore()
    if (!userStore.isLoggedIn) {
      navigateTo('/login')
      return
    }
    // 繼續結帳流程...
  }

  return { checkout }
})
```

---

## 7. 小結

一
Pinia 適合管理「多個頁面都需要的共用資料」，單頁資料用 `ref()` 即可。
二
Store 是單例且惰性建立，第一次呼叫時才初始化，全站共用同一份。
三
重新整理後資料會歸零，需要持久化時搭配 `localStorage`。
四
解構 State/Getters 時必須使用 `storeToRefs`，Actions 直接解構。
五
Store 由三大組成：**State**（資料）、**Getters**（計算）、**Actions**（操作）。

---

## 8. 延伸資源

一
[Pinia 官方文件](https://pinia.vuejs.org/)

---

[上一課 第十課：API 串接與資料層](./lesson-10.md) | [下一課 第十二課：選項數據管理](./lesson-12.md) | [回首頁](../../README.md)
