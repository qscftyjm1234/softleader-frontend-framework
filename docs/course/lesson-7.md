<!-- Author: cindy -->

# 第七課:API 串接與資料層

本課程教您如何使用專案內建的 Mock 系統與 Repository 模式進行開發。

## 1. 核心工具 (useApi)

本專案封裝了 `useApi` 來處理所有的 HTTP 請求。它內建了：

- **自動處理 Token**
- **統一錯誤處理**
- **Mock 資料攔截**

```typescript
// 範例：取得 ID 為 1 的使用者
const { data, error } = await useApi('/users/1')
```

---

## 2. 前端模擬資料 (Mock Data)

在後端 API 還沒好之前，我們可以先用 Mock 系統開發。

### 步驟 1: 啟用 Mock

在 `.env.development` 中設定：

```ini
# 開啟 Mock 功能
NUXT_PUBLIC_FEATURE_API_MOCK=true
```

### 步驟 2: 定義假資料 (mock/routes.ts)

開啟 `mock/routes.ts`，加入您的 API 定義。支援 **靜態網址** 與 **動態網址**。

```typescript
// mock/routes.ts
export const MOCK_ROUTES = [
  // 情境 1: 靜態網址 (列表)
  {
    url: '/users',
    method: 'GET',
    delay: 1000,
    response: {
      data: [
        { id: 1, name: '模擬用戶 A' },
        { id: 2, name: '模擬用戶 B' }
      ]
    }
  },

  // 情境 2: 動態網址 (取得單一使用者)
  // 對應 useApi('/users/1') 或 useApi('/users/99')
  {
    url: /\/users\/\d+/, // 使用正規表達式匹配 (users/ 加上數字)
    method: 'GET',
    response: (context) => {
      // context.url 就是請求的網址，例如 "/users/1"
      // 我們可以從這裡取出 ID
      const id = context.url.split('/').pop()

      return {
        data: {
          id: Number(id),
          name: `模擬用戶 ${id}`, // 回傳動態名稱
          role: 'admin'
        }
      }
    }
  }
]
```

### 步驟 3: 呼叫 API

完全不用改程式碼！系統會自動攔截。

```typescript
// 1. 呼叫列表 -> 對應情境 1
const list = await useApi('/users')

// 2. 呼叫單筆 -> 對應情境 2 (Regex)
const user = await useApi('/users/1') // 拿到 { name: '模擬用戶 1' }
```

---

## 3. Repository 模式 (資料層)

為了避免 API 網址散落在各個頁面，我們使用 Repository 模式統一管理。

### 步驟 1: 定義 Repository (repositories/modules/user.ts)

```typescript
export default {
  // 取得使用者列表
  getUsers: (params?: any) => useApi('/users', { method: 'GET', params }),

  // 取得單一使用者 (動態 ID)
  getUserById: (id: number) => useApi(`/users/${id}`, { method: 'GET' })
}
```

### 步驟 2: 在頁面使用

```vue
<script setup lang="ts">
const { user } = useRepository()

// 乾淨！完全看不到 API 網址
const { data, pending } = await user.getUsers({ page: 1 })
</script>

<template>
  <div v-if="pending">Loading...</div>
  <div v-else>{{ data }}</div>
</template>
```

---

## 4. 小結

1.  **Mock**: 設定 `.env` -> 修改 `mock/routes.ts` (支援 Regex)。
2.  **Repo**: 定義在 `repositories/` -> 頁面用 `useRepository()`。
3.  **好處**: 後端沒好也能開發 (Mock)，API 改網址只需改一個地方 (Repo)。

---

[上一課:頁面導航與路由](./lesson-6.md) | [下一課:全域狀態管理](./lesson-8.md) | [回首頁](../../README.md)
