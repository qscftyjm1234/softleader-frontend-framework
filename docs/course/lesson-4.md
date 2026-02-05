# 第四課：API 串接與資料層規範

在這一課，我們將學習如何依循專案規範 (Repository Pattern) 來串接後端 API。

## 步驟 1: 建立 Repository 模組

專案將所有 API 呼叫封裝在 `repositories` 資料夾中。
在 `repositories/modules` 中建立新檔案 `demo.ts`：

```typescript
// repositories/modules/demo.ts
import { useClient } from '~/composables/useApi'
import type { UseFetchOptions } from 'nuxt/app'

// 定義回傳資料的型別 (依照後端 API 規格)
interface DemoData {
  id: number
  title: string
  content: string
}

// 建立 Client 實例 (設定 API 子路徑)
const api = useClient('/demo')

export default {
  /**
   * 取得教學資料列表
   * @returns List of demos
   */
  getList(options: UseFetchOptions<DemoData[]> = {}) {
    return api.get<DemoData[]>('/list', options)
  },

  /**
   * 根據 ID 取得教學資料
   * @param id - 資料 ID
   */
  getDetail(id: number) {
    return api.get<DemoData>(`/${id}`)
  }
}
```

## 步驟 2: 註冊 Repository (自動)

專案通常已設定自動匯入，但我們需要確認 `repositories/index.ts` 有整合這個新模組。
如果 `repositories/index.ts` 是自動掃描的，則不需額外動作；若為手動註冊，請記得加入。
(本專案主要使用 Composables `useRepository` 來存取，通常不需要手動修改 index，視專案架構而定。)

## 步驟 3: 在頁面中使用 API

修改我們的詳情頁 `pages/demo/[id].vue`，改為從 API 獲取資料。

```vue
<!-- pages/demo/[id].vue -->
<script setup lang="ts">
definePageMeta({
  layout: 'demo'
})
const route = useRoute()
const route = useRoute()
const { demo } = useRepository() // 使用 Composable 取得 Repository

const id = Number(route.params.id)

// 專案的 Repository 已經封裝了 useAsyncData，直接呼叫即可
const {
  data,
  pending,
  error
} = await demo.getDetail(id)
</script>

<template>
  <div class="detail-page">
    <div v-if="pending">載入中...</div>
    <div v-else-if="error">發生錯誤: {{ error.message }}</div>

    <div v-else-if="data">
      <h1>{{ data.title }}</h1>
      <p>{{ data.content }}</p>
    </div>
  </div>
</template>
```
```

## 步驟 5: 串接列表到詳情頁

最後，我們回到 `pages/demo/index.vue`，讓原本的卡片可以點擊並跳轉到詳情頁。

```vue
<!-- pages/demo/index.vue -->
<script setup lang="ts">
// ... 其他程式碼

const router = useRouter()

// 定義點擊事件處理 function
const handleUserClick = (id: number) => {
  router.push(`/demo/${id}`)
}

// 模擬資料加上 ID
const engineer = {
  id: 1,
  name: '王小明',
  // ...
}
</script>

<template>
  <!-- ... -->
  <UserInfoCard
    :name="engineer.name"
    :role="engineer.role"
    :avatar-url="engineer.photo"
    class="cursor-pointer hover:shadow-lg transition-shadow"
    @click="handleUserClick(engineer.id)"
  />
  <!-- ... -->
</template>
```

現在，點擊首頁的卡片，就會導向 `/demo/1`，並且由 API (Mock) 載入並顯示資料！

## 步驟 6: 設定 Mock Data (模擬資料)

在開發階段還沒有後端 API 時，我們可以使用專案內建的 Mock 系統。

### 1. 啟用 Mock 模式

開啟 `.env` 檔案，確保以下設定為 `true`：

```bash
# .env
NUXT_PUBLIC_FEATURE_API_MOCK=true
```

### 2. 新增 Mock 路徑

開啟 `mock/routes.ts`，在 `MOCK_ROUTES` 陣列中加入您的 API 模擬資料：

```typescript
// mock/routes.ts
export const MOCK_ROUTES: MockRoute[] = [
  // ... 其他路由
  
  // 新增 Demo 列表 API
  {
    url: '/demo/list',
    method: 'GET',
    delay: 500, // 模擬網路延遲 0.5 秒
    response: {
      data: [
        { id: 1, title: 'Nuxt 3 入門', content: '學習 Nuxt 3 的基礎知識...' },
        { id: 2, title: 'Repository Pattern', content: '了解如何封裝 API...' }
      ]
    }
  },
  
  // 新增 Demo 詳情 API (支援正則表達式)
  {
    url: /\/demo\/\d+/, // 匹配 /demo/1, /demo/2 ...
    method: 'GET',
    delay: 300,
    response: (context) => {
      // 從網址取得 ID
      const id = Number(context.url.match(/\/demo\/(\d+)/)?.[1] || 1)
      return {
        data: {
          id,
          title: `Demo ${id} - 詳細教學`,
          content: '這是一篇虛擬的教學文章內容...'
        }
      }
    }
  }
]
```

儲存後，API 請求就會被攔截並回傳定義好的假資料，無需重啟伺服器。

---

[上一課：頁面導航與路由](./lesson-3.md) | [回首頁](../../README.md) | [下一課：全域狀態管理](./lesson-5.md)
