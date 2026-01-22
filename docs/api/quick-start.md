[← 返回文件導覽](../index.md)

# 快速開始:API 串接

## 目標讀者

剛拿到這個開發包,需要串接後端 API 的工程師。

## 你將學到

- 如何設定環境變數連接後端 API
- 如何從 Mock 模式切換到真實 API
- 如何新增自己的 API 端點
- 如何處理常見問題

---

## 前置準備

### 1. 設定環境變數

複製 `.env.example` 為 `.env`:

```bash
cp .env.example .env
```

編輯 `.env` 檔案:

```bash
# 設定你的後端 API 網址
NUXT_PUBLIC_API_BASE_URL=http://localhost:8080/api

# 關閉 Mock 模式 (改用真實 API)
NUXT_PUBLIC_FEATURE_API_MOCK=false

# API 超時時間 (毫秒)
NUXT_PUBLIC_API_TIMEOUT=30000

# 失敗重試次數
NUXT_PUBLIC_API_RETRY=1
```

### 2. 確認後端 API 格式

> [!IMPORTANT]
> 請確保你的後端 API 遵循本專案的回應格式規範。
> 詳見 [後端 API 規範](./backend-contract.md)

**成功回應格式**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    // 你的資料
  }
}
```

**錯誤回應格式**:

```json
{
  "code": 400,
  "message": "錯誤訊息",
  "errors": [
    // 錯誤詳情 (選填)
  ]
}
```

---

## 第一個 API 串接:登入功能

### 步驟 1: 後端實作登入 API

你的後端需要提供以下 API:

**端點**: `POST /auth/login`

**請求格式**:

```json
{
  "username": "user@example.com",
  "password": "password123"
}
```

**回應格式** (成功):

```json
{
  "code": 200,
  "message": "登入成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "user@example.com",
      "name": "使用者名稱"
    }
  }
}
```

**回應格式** (失敗):

```json
{
  "code": 401,
  "message": "帳號或密碼錯誤"
}
```

### 步驟 2: 前端已經準備好了!

本專案已經實作好登入邏輯,位於 `repositories/modules/auth.ts`:

```typescript
// repositories/modules/auth.ts
import { useClient } from '~/composables/useApi'

const api = useClient('/auth')

export default {
  login(credentials: any, options = {}) {
    return api.post('/login', credentials, options)
  }
}
```

你只需要確保後端 API 格式正確即可!

### 步驟 3: 測試

1. 啟動你的後端 API (例如 `http://localhost:8080`)
2. 確認 `.env` 中的 `NUXT_PUBLIC_API_BASE_URL` 設定正確
3. 啟動前端專案:

```bash
npm run dev
```

4. 開啟瀏覽器,前往登入頁面
5. 輸入帳號密碼,點擊登入
6. 打開瀏覽器 DevTools > Network,應該會看到真實的 API 請求!

---

## 新增自己的 API

假設你要新增一個「商品管理」功能。

### 步驟 1: 建立 Repository

在 `repositories/modules/` 下建立 `product.ts`:

```typescript
// repositories/modules/product.ts
import { useClient } from '~/composables/useApi'
import type { UseFetchOptions } from 'nuxt/app'

// 定義型別 (選填,但建議)
interface Product {
  id: number
  name: string
  price: number
  description: string
}

interface ProductListResponse {
  items: Product[]
  total: number
}

// 建立 API Client,指向 /products
const api = useClient('/products')

export default {
  /**
   * 取得商品列表
   * @param params - 查詢參數 (分頁、搜尋等)
   */
  getProducts(params = {}, options: UseFetchOptions<ProductListResponse> = {}) {
    return api.get<ProductListResponse>('/', {
      query: params,
      ...options
    })
  },

  /**
   * 根據 ID 取得單一商品
   * @param id - 商品 ID
   */
  getProductById(id: number) {
    return api.get<Product>(`/${id}`)
  },

  /**
   * 建立商品
   * @param productData - 商品資料
   */
  createProduct(productData: Partial<Product>) {
    return api.post<Product>('/', productData, {
      autoSuccess: '商品建立成功!' // 成功時自動顯示通知
    })
  },

  /**
   * 更新商品
   * @param id - 商品 ID
   * @param productData - 更新的商品資料
   */
  updateProduct(id: number, productData: Partial<Product>) {
    return api.put<Product>(`/${id}`, productData, {
      autoSuccess: '商品更新成功!'
    })
  },

  /**
   * 刪除商品
   * @param id - 商品 ID
   */
  deleteProduct(id: number) {
    return api.delete(`/${id}`, {
      autoSuccess: '商品刪除成功!'
    })
  }
}
```

### 步驟 2: 註冊到 Repository Index

編輯 `repositories/index.ts`:

```typescript
import user from './modules/user'
import auth from './modules/auth'
import product from './modules/product' // [新增]

const repositories = {
  user,
  auth,
  product // [新增]
}

export default repositories
```

### 步驟 3: 在頁面中使用

```vue
<script setup lang="ts">
const { $api } = useNuxtApp()

// 取得商品列表
const {
  data: products,
  pending,
  refresh
} = await $api.product.getProducts({
  page: 1,
  itemsPerPage: 10
})

// 建立商品
const handleCreateProduct = async () => {
  const { data, error } = await $api.product.createProduct({
    name: '新商品',
    price: 100,
    description: '商品描述'
  })

  if (!error.value) {
    // 成功!重新載入列表
    refresh()
  }
}
</script>

<template>
  <div>
    <h1>商品列表</h1>

    <!-- Loading 狀態 -->
    <div v-if="pending">載入中...</div>

    <!-- 商品列表 -->
    <div v-else>
      <div
        v-for="product in products?.items"
        :key="product.id"
      >
        {{ product.name }} - ${{ product.price }}
      </div>
    </div>

    <button @click="handleCreateProduct">新增商品</button>
  </div>
</template>
```

---

## 從 Mock 切換到真實 API

### 開發初期 (使用 Mock)

```bash
# .env
NUXT_PUBLIC_FEATURE_API_MOCK=true
NUXT_PUBLIC_MOCK_DELAY=500
```

- 前端可以獨立開發,不需要等後端
- 所有 API 都會返回假資料
- 不會發送真實的網路請求

### 後端就緒 (切換到真實 API)

```bash
# .env
NUXT_PUBLIC_FEATURE_API_MOCK=false
NUXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
```

- 所有 API 都會發送到真實後端
- **不需要修改任何程式碼!**

### 混合模式 (部分 Mock,部分真實)

如果你想要部分 API 用 Mock,部分用真實後端,可以參考 [Mock 切換機制](./mock-switching.md)。

---

## 進階功能

### 1. 自動 Loading 狀態

使用 `loadingRef` 自動管理按鈕的 Loading 狀態:

```vue
<script setup lang="ts">
const { $api } = useNuxtApp()
const isSubmitting = ref(false)

const handleSubmit = async () => {
  const { error } = await $api.product.createProduct(
    { name: '新商品' },
    {
      loadingRef: isSubmitting, // 自動管理 Loading
      globalLoading: false // 關閉全域 Loading 條
    }
  )
}
</script>

<template>
  <button
    @click="handleSubmit"
    :disabled="isSubmitting"
  >
    {{ isSubmitting ? '處理中...' : '送出' }}
  </button>
</template>
```

### 2. 自動重新請求

使用 `watch` 自動監聽變數變化並重新請求:

```vue
<script setup lang="ts">
const page = ref(1)
const search = ref('')

// 當 page 或 search 改變時,自動重新請求
const { data: products } = await $api.product.getProducts(
  { page, q: search },
  {
    watch: [page, search]
  }
)
</script>
```

### 3. 資料轉換

使用 `transform` 在資料傳給前端前先處理:

```typescript
const { data } = await $api.product.getProducts(
  {},
  {
    transform: (response) => {
      // 只取出 items,忽略其他欄位
      return response.items
    }
  }
)

// data.value 直接就是 Product[]
```

---

## 常見問題排除

### Q1: API 請求失敗,顯示 CORS 錯誤

**原因**: 後端沒有設定 CORS

**解決方法**: 請後端工程師設定 CORS,允許前端網域存取。詳見 [後端 API 規範](./backend-contract.md#cors-設定)

### Q2: Token 過期後沒有自動導向登入頁

**原因**: 後端回傳的 HTTP 狀態碼不是 401

**解決方法**: 確保後端在 Token 過期時回傳 HTTP 401 狀態碼

### Q3: API 回應格式不符合規範

**錯誤訊息**: `Cannot read property 'data' of undefined`

**原因**: 後端回應格式不是 `{ code, message, data }`

**解決方法**: 請後端工程師調整回應格式,或在前端使用 `transform` 轉換

### Q4: Mock 模式關閉後,API 還是返回假資料

**原因**: 環境變數沒有正確載入

**解決方法**:

1. 確認 `.env` 中 `NUXT_PUBLIC_FEATURE_API_MOCK=false`
2. 重新啟動開發伺服器 (`npm run dev`)
3. 清除瀏覽器快取

### Q5: 如何查看 API 請求的詳細資訊?

打開瀏覽器 DevTools > Console,你會看到:

```
[API Request] POST /auth/login
[API Response] 200 OK (234ms)
```

如果需要更詳細的資訊,可以在 Network 面板查看。

---

## 延伸閱讀

- [後端 API 規範](./backend-contract.md) - 後端 API 格式規範
- [環境設定指南](./environment-setup.md) - 環境變數完整說明
- [API 開發指南](./guide.md) - `useApi` 和 `useClient` 詳細說明
- [Repository Pattern](./repository-pattern.md) - Repository 層設計模式

---

## 完成

現在你已經知道如何串接後端 API 了!

如果遇到問題,請參考:

1. [常見問題排除](#❓-常見問題排除)
2. [後端 API 規範](./backend-contract.md)
3. 專案的 [除錯指南](../guides/troubleshooting.md)
