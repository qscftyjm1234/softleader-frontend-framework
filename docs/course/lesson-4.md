<!-- Author: antigravity -->

# 第四課：頁面導航與路由

本課程教您如何在頁面間跳轉，以及如何從網址中讀取參數。掌握檔案路由、動態參數、查詢字串與程式化導航，讓您的專案具備完整的功能流。

---

## 1. 了解檔案路由

系統會自動根據資料夾結構產生網址，無需手動維護路由表。

一
`pages/index.vue` 對應到首頁 `/`。
二
`pages/about/index.vue` 對應到 `/about`。
三
`pages/users/[id].vue` 對應到帶有參數的網址，如 `/users/123`。
四
`pages/posts/[category]/[slug].vue` 對應到多層參數，如 `/posts/tech/hello-world`。

---

## 2. 使用導航元件

我們建議在頁面中優先使用 `NuxtLink` 進行跳轉，並配合我們的按鈕元件。

(1.) 開啟您的頁面檔案。
(2.) 準備好要跳轉的目的地路徑。

```vue
<template>
  <div class="space-y-4">
    <!-- 基礎用法：固定路徑 -->
    <NuxtLink to="/">回首頁</NuxtLink>

    <!-- 搭配按鈕元件 -->
    <NuxtLink to="/users">
      <IButton variant="primary">使用者列表</IButton>
    </NuxtLink>

    <!-- 帶參數的連結 -->
    <NuxtLink :to="`/users/${userId}`">
      <IButton>檢視使用者 #{{ userId }}</IButton>
    </NuxtLink>

    <!-- 使用物件形式（推薦用於複雜情境） -->
    <NuxtLink :to="{ path: '/users', query: { page: 2, role: 'admin' } }">
      <IButton>第二頁管理員</IButton>
    </NuxtLink>
  </div>
</template>
```

---

## 3. 認識路由物件（useRoute）

在任何頁面呼叫 `useRoute()` 都可以取得當前路由的完整資訊。它包含以下四個最常用的屬性：

| 屬性             | 說明                                     | 範例值                         |
| ---------------- | ---------------------------------------- | ------------------------------ |
| `route.path`     | 純路徑，不包含查詢字串                   | `/hellow`                      |
| `route.fullPath` | 完整路徑，包含查詢字串                   | `/hellow?page=2&role=admin`    |
| `route.params`   | 動態路由參數（來自 `[id]` 等方括號命名） | `{ id: "42" }`                 |
| `route.query`    | 查詢字串參數（來自 `?` 後面的鍵值對）    | `{ page: "2", role: "admin" }` |

### 對照範例

以 `pages/hellow.vue` 為例，檔名中沒有方括號，所以它是**靜態路由**。

當您直接瀏覽 `/hellow` 時：

```
route.fullPath → "/hellow"        // 完整路徑
route.path     → "/hellow"        // 純路徑（此時與 fullPath 相同）
route.params   → {}               // 空的，因為沒有動態參數
route.query    → {}               // 空的，因為沒有帶查詢字串
```

當您瀏覽 `/hellow?keyword=test&page=3` 時：

```
route.fullPath → "/hellow?keyword=test&page=3"
route.path     → "/hellow"
route.params   → {}
route.query    → { keyword: "test", page: "3" }
```

如果改為動態路由 `pages/users/[id].vue`，瀏覽 `/users/42?tab=info` 時：

```
route.fullPath → "/users/42?tab=info"
route.path     → "/users/42"
route.params   → { id: "42" }      // 來自 [id]
route.query    → { tab: "info" }    // 來自 ?tab=info
```

---

## 4. 取得動態路由參數（Route Params）

當頁面檔名包含方括號（如 `[id].vue`），即為動態路由。您可以在頁面中讀取該參數的值。

### 4.1 建立動態路由頁面

(1.) 在 `pages/users/` 資料夾下建立 `[id].vue`。
(2.) 貼入以下程式碼：

```vue
<template>
  <div class="p-10 bg-slate-50 min-h-screen">
    <div class="max-w-4xl mx-auto space-y-8">
      <div class="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm">
        <h3 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">
          動態路由參數展示
        </h3>

        <!-- 顯示從網址取得的 id -->
        <div class="text-center">
          <span class="text-slate-500">目前使用者編號：</span>
          <span class="text-2xl font-black text-blue-600">{{ id }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

// 取得動態路由參數 [id]
// 當網址為 /users/42 時，id 的值就是 "42"
const id = route.params.id

definePageMeta({
  title: '使用者詳情',
  layout: 'portal'
})
</script>
```

### 4.2 多層動態參數

如果檔案路徑為 `pages/posts/[category]/[slug].vue`，則可同時取得兩個參數：

```typescript
const route = useRoute()

const category = route.params.category // 例如 "tech"
const slug = route.params.slug // 例如 "hello-world"
// 當網址為 /posts/tech/hello-world 時
```

---

## 5. 取得查詢字串（Query Parameters）

查詢字串是網址中 `?` 後面的部分，常用於搜尋、分頁、篩選等功能。

例如網址為 `/users?page=2&role=admin&keyword=john`：

```typescript
const route = useRoute()

// 取得單一查詢參數
const page = route.query.page // "2"
const role = route.query.role // "admin"
const keyword = route.query.keyword // "john"
```

> 注意：`route.query` 取出的值都是**字串型態**。如果需要數字，請使用 `Number(route.query.page)` 轉換。

---

## 6. 監聽路由變化

當查詢字串或路由參數改變時，您可以用 `watch` 監聽並重新載入資料。

```typescript
const route = useRoute()

// 監聽整個查詢字串的變化
watch(
  () => route.query,
  (newQuery) => {
    console.log('查詢參數改變了：', newQuery)
    // 在這裡重新呼叫 API 取得新資料
  }
)

// 只監聯特定參數
watch(
  () => route.params.id,
  (newId) => {
    console.log('使用者 ID 改變為：', newId)
    // 重新載入該使用者的資料
  }
)
```

---

## 7. 程式化導航（useRouter）

除了 `NuxtLink`，您也可以在腳本中使用 `useRouter` 進行跳轉。

```typescript
const router = useRouter()

// 推入新頁面（可以點瀏覽器「上一頁」返回）
router.push('/users')

// 帶參數跳轉
router.push(`/users/${userId}`)

// 帶查詢字串跳轉
router.push({
  path: '/users',
  query: { page: 2, role: 'admin' }
})

// 取代目前頁面（不會新增歷史紀錄，無法用「上一頁」返回）
router.replace('/login')

// 返回上一頁
router.back()

// 前進到下一頁
router.forward()

// 跳轉 N 個歷史紀錄（負數為返回，正數為前進）
router.go(-2) // 返回兩頁
```

---

## 8. 使用 navigateTo 輔助函式

Nuxt 提供了 `navigateTo` 輔助函式，可以在任何地方使用（包含中介層與伺服器端）。

```typescript
// 基礎跳轉
await navigateTo('/dashboard')

// 帶查詢字串
await navigateTo({
  path: '/users',
  query: { status: 'active' }
})

// 外部連結（開新分頁）
await navigateTo('https://google.com', { external: true, open: { target: '_blank' } })

// 取代目前頁面（不新增歷史記錄）
await navigateTo('/login', { replace: true })
```

---

## 9. 完整整合範例

這裡展示了如何結合組件跳轉、程式碼跳轉與路由資訊讀取的完整範例。

(3.) 貼入以下完整程式碼：

```vue
<template>
  <div class="p-10 bg-slate-50 min-h-screen">
    <div class="max-w-4xl mx-auto space-y-8">
      <!-- 當前路由資訊 -->
      <div class="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm">
        <h3 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">
          目前路由資訊
        </h3>
        <div class="space-y-2 text-sm text-slate-600 font-mono">
          <p>
            完整路徑：
            <code class="px-2 py-1 bg-slate-100 rounded">{{ route.fullPath }}</code>
          </p>
          <p>
            路徑：
            <code class="px-2 py-1 bg-slate-100 rounded">{{ route.path }}</code>
          </p>
          <p>
            參數：
            <code class="px-2 py-1 bg-slate-100 rounded">{{ JSON.stringify(route.params) }}</code>
          </p>
          <p>
            查詢：
            <code class="px-2 py-1 bg-slate-100 rounded">{{ JSON.stringify(route.query) }}</code>
          </p>
        </div>
      </div>

      <!-- 組件式跳轉 -->
      <div class="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm text-center">
        <h3 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">
          點擊下方按鈕回首頁
        </h3>
        <NuxtLink to="/">
          <IButton
            variant="primary"
            class="px-10"
          >
            回到系統大廳
          </IButton>
        </NuxtLink>
      </div>

      <!-- 腳本式跳轉 -->
      <div class="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm text-center">
        <h3 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">
          使用程式碼邏輯跳轉
        </h3>
        <div class="flex justify-center gap-4">
          <button
            @click="goBack"
            class="px-8 py-3 bg-slate-50 border border-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-100 transition-all"
          >
            模擬上一頁動作
          </button>
          <button
            @click="goToUsers"
            class="px-8 py-3 bg-blue-50 border border-blue-100 text-blue-600 font-bold rounded-2xl hover:bg-blue-100 transition-all"
          >
            前往使用者頁面
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()

function goBack() {
  // 透過程式碼控制路由跳轉
  router.back()
}

function goToUsers() {
  // 帶查詢字串跳轉到使用者頁面
  router.push({
    path: '/users',
    query: { page: 1, sort: 'name' }
  })
}

definePageMeta({
  title: '路由導航指南',
  layout: 'portal'
})
</script>
```

---

## 10. 常用技巧速查表

| 需求         | 方法                   | 範例                          |
| ------------ | ---------------------- | ----------------------------- |
| 取得動態參數 | `route.params.id`      | `/users/[id].vue` 中取得 `id` |
| 取得查詢字串 | `route.query.page`     | `/users?page=2` 中取得 `page` |
| 取得完整路徑 | `route.fullPath`       | `/users?page=2&role=admin`    |
| 取得純路徑   | `route.path`           | `/users`                      |
| 取得路由名稱 | `route.name`           | 自動依檔案結構產生            |
| 跳轉頁面     | `router.push(path)`    | 新增歷史紀錄                  |
| 取代頁面     | `router.replace(path)` | 不新增歷史紀錄                |
| 回上一頁     | `router.back()`        | 等同 `router.go(-1)`          |
| 通用跳轉     | `navigateTo(path)`     | 支援伺服器端                  |

---

## 11. 小結

一
檔案路徑就是網址，無需額外手動配置路由表。
二
推薦使用 `<NuxtLink>`，它具備效能優化與預載功能。
三
使用 `useRoute()` 取得當前路由資訊，包含 `params`（動態參數）與 `query`（查詢字串）。
四
使用 `useRouter()` 進行程式化導航，支援 `push`、`replace`、`back` 等方法。
五
複雜的跳轉邏輯可以使用 `navigateTo` 輔助函式，適用於中介層與伺服器端。
六
透過 `watch` 監聯路由變化，實現資料自動重載。

---

[上一課 第三課：建立您的第一個元件](./lesson-3.md) | [下一課 第五課：環境變數設定](./lesson-5.md) | [回首頁](../../README.md)
