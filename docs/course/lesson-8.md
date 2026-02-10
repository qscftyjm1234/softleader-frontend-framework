<!-- Author: cindy -->

# 第八課:全域狀態管理 (Pinia)

本課程教您如何使用 **Pinia** 來管理跨頁面的資料 (Global State)。

最常見的情境：登入資訊 (User)、保險試算 (Quotation)、全域設定 (AppConfig)。

## 1. 什麼是 Store?

Store 就像是一個「雲端資料夾」，任何頁面都可以存取它，且**資料會自動同步**。

- **State**: 變數 (如 `selectedPlans`)
- **Getters**: 計算屬性 (如 `totalPremium`)
- **Actions**: 函式 (如 `addPlan`)

---

## 2. 實戰範例：保險試算投保 (QuotationStore)

我們來建立一個保險試算 Store，包含被保險人資訊、保費計算、新增險種功能。

### 步驟 1: 定義 Store (`stores/quotation.ts`)

```typescript
// stores/quotation.ts
export const useQuotationStore = defineStore('quotation', () => {
  // 1. State (資料)
  const policyHolder = ref({ name: '', age: 0 })
  const selectedPlans = ref<any[]>([])

  // 2. Getters (計算屬性)
  const totalPremium = computed(() => {
    return selectedPlans.value.reduce((sum, plan) => sum + plan.premium, 0)
  })

  const planCount = computed(() => selectedPlans.value.length)

  // 3. Actions (動作)
  function addPlan(plan: any) {
    selectedPlans.value.push(plan)
  }

  function resetQuotation() {
    selectedPlans.value = []
    policyHolder.value = { name: '', age: 0 }
  }

  return {
    policyHolder,
    selectedPlans,
    totalPremium,
    planCount,
    addPlan,
    resetQuotation
  }
})
```

### 步驟 2: 在頁面使用

```vue
<script setup lang="ts">
const quoteStore = useQuotationStore()

// ✅ 使用 storeToRefs 保持響應性
const { planCount, totalPremium, policyHolder } = storeToRefs(quoteStore)

function addInsurance() {
  // Action 直接呼叫即可
  quoteStore.addPlan({ name: '意外傷害保險', premium: 1200 })
}
</script>

<template>
  <div class="p-4 border rounded">
    <h2>保險試算摘要</h2>
    <p>要保人：{{ policyHolder.name || '未填寫' }}</p>
    <p>目前選購險種：{{ planCount }} 項</p>
    <p>預估年繳保費：${{ totalPremium }}</p>

    <IButton @click="addInsurance">加入意外險 ($1200)</IButton>
    <IButton
      variant="outline"
      @click="quoteStore.resetQuotation"
    >
      重設試算
    </IButton>
  </div>
</template>
```

---

## 3. 重要觀念：解構陷阱

初學者最常犯的錯，就是直接解構 Store，導致資料不會更新。

| 類型                | 處理方式             | 原因                                   |
| :------------------ | :------------------- | :------------------------------------- |
| **State / Getters** | 必須用 `storeToRefs` | 因為它是 `Ref`，直接解構會變成普通變數 |
| **Actions**         | 直接解構             | 因為它是 `Function`，不會有響應性問題  |

```typescript
// 假設 store.count = 0

// ❌ 壞掉的寫法
const { count } = store
// 此時 count 變成單純的 number 0，store 變了它也不會變

// ✅ 正確寫法
const { count } = storeToRefs(store)
// 此時 count 是 Ref<number>，會跟著 store 連動
```

---

## 4. Pinia 生命週期 (CSR 模式)

由於本專案目前的設定為 **`ssr: false`** (純客戶端渲染 CSR)，Pinia 的生命週期非常直觀，主要遵循「首次呼叫即建立，不重新整理即永生」的原則。

### 生命周期流程圖

```text
[ 瀏覽器載入應用程式 ]
       │
       ▼
[ Nuxt 初始化並註冊 Pinia 插件 ]
       │
       ▼
[ 組件第一次執行 useQuotationStore() ] ─── 沒有人呼叫時 ──▶ [ Store 不會建立 (節省記憶體) ]
       │
       ▼
[ 執行 Store Setup 邏輯 (只執行一次) ]
       │
       ▼
[ Store 進入 Singleton (單例) 模式 ]
       │
       ▼
[ 跨頁導覽、資料持續存在 ] ◀───────┐
       │                       │
       ▼                       │
[ 使用者 F5 重新整理 ? ] ── No ───┘
       │
      Yes
       │
       ▼
[ 環境重啟、資料清空 ]
```

### 生命週期階段說明

| 階段                           | 說明                                                                                                                                                      |
| :----------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1. 定義期 (Definition)**     | 撰寫 `defineStore` 時。此時程式碼已載入，但尚未分配記憶體空間給資料。                                                                                     |
| **2. 初始化 (Initialization)** | **隨選建立 (On-demand)**。只有當第一個組件執行 `const store = useStore()` 時，才會真正執行內部的 `ref` 和 `computed` 邏輯。                               |
| **3. 活躍期 (Active)**         | 一旦建立，Store 就會一直存在於內存中。**換頁 (Router change) 資料絕對不會消失**。無論您在頁面間如何切換 (`/page-a` 到 `/page-b`)，資料都會保持原樣。      |
| **4. 銷毀期 (Destruction)**    | **僅限頁面重新整理或關閉分頁**。CSR 模式下，頁面重新整理等同於整個 JavaScript 環境重啟，此時 Store 資料會被清空（除非有搭配 `localStorage` 持久化套件）。 |

### CSR 模式下的優勢

1.  **環境存取自如**：可以直接在 Store 內存取 `window`、`location` 或 `localStorage`，不必擔心 Server 端報錯。
2.  **簡易除錯**：Vue DevTools 看到的狀態就是數據的唯一真相，沒有 SSR 資料不一致的困擾。
3.  **效能直覺**：資料抓取完全由前端控制，邏輯透明。

> [!TIP]
> **懶加載特性**：如果一個 Store 從未被任何頁面或組件使用，它就不會被初始化，這有助於節省初始載入的資源佔用。

---

## 5. 小結

1.  **State** = `ref()`
2.  **Getters** = `computed()`
3.  **Actions** = `function()`
4.  **Destructure**: 取資料記得用 `storeToRefs()`。

---

[上一課:API 串接與資料層](./lesson-7.md) | [下一課:Git 提交與工作流](./lesson-9.md) | [回首頁](../../README.md)
