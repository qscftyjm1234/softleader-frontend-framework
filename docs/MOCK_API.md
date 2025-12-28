# Mock API 系統使用指南

## 📋 概述

本專案使用 **Repository 層 Mock** 實現 Mock API 系統，讓前端可以獨立開發，不依賴後端 API。

> **注意**：本專案已移除 MSW (Mock Service Worker)，改用更輕量的 Repository 層 Mock 方式。

## 🚀 快速開始

### 1. 啟用 Mock API

在 `.env` 文件中設定:

```bash
NUXT_PUBLIC_FEATURE_API_MOCK=true
NUXT_PUBLIC_MOCK_DELAY=500
```

### 2. 啟動開發伺服器

```bash
npm run dev
```

當您在 Console 看到 `Mock API 攔截: /api/users` 時，表示 Mock 系統已成功啟動。

### 3. 測試 Mock API

所有發送到 `/api/*` 的請求都會被攔截並返回 Mock 資料。

## 📁 專案結構

```
mock/
├── schemas/          # Zod Schema 定義
│   ├── user.ts      # User 相關 Schema
│   └── order.ts     # Order 相關 Schema
└── factories/        # Mock 資料工廠
    ├── user.factory.ts
    └── order.factory.ts

utils/api/interceptors/
└── mock.ts           # Mock 資料攔截器

composables/
└── useApi.ts         # 整合 Mock 攔截器
```

## 🎯 使用範例

### 在 Repository 中使用

```typescript
// repositories/modules/user.ts
import { UserListResponseSchema } from '~/mock/schemas/user'

export async function getUsers(params: any) {
  // 如果 Mock 啟用，會自動返回假資料
  // 如果 Mock 關閉，會發送真實請求
  const response = await useApi('/api/users', { params })

  // Zod 驗證響應資料
  const validated = UserListResponseSchema.parse(response)
  return validated
}
```

### 在組件中使用

```vue
<script setup lang="ts">
const { data, pending } = await useFetch('/api/users', {
  query: {
    page: 1,
    limit: 10
  }
})
</script>
```

## 🔧 添加新的 Mock API

### 1. 定義 Schema

在 `mock/schemas/` 創建新的 Schema 文件:

```typescript
// mock/schemas/product.ts
import { z } from 'zod'

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number().min(0)
})

export type Product = z.infer<typeof ProductSchema>
```

### 2. 創建 Factory

在 `mock/factories/` 創建 Factory:

```typescript
// mock/factories/product.factory.ts
import type { Product } from '../schemas/product'

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomFloat(min: number, max: number): number {
  return Number((Math.random() * (max - min) + min).toFixed(2))
}

const PRODUCT_NAMES = ['筆記型電腦', '滑鼠', '鍵盤', '顯示器', '耳機']

export function createMockProduct(): Product {
  return {
    id: randomInt(1, 1000),
    name: PRODUCT_NAMES[randomInt(0, PRODUCT_NAMES.length - 1)],
    price: randomFloat(10, 1000)
  }
}
```

### 3. 在 Mock 攔截器中添加 URL 匹配

在 `utils/api/interceptors/mock.ts` 中添加:

```typescript
// GET /api/products - 商品列表
if (method === 'GET' && url.includes('/api/products')) {
  return {
    data: Array.from({ length: 20 }, () => createMockProduct()),
    total: 20
  }
}

// GET /api/products/:id - 商品詳情
if (method === 'GET' && url.match(/\/api\/products\/\d+/)) {
  const id = parseInt(url.match(/\/api\/products\/(\d+)/)?.[1] || '1')
  return {
    data: createMockProduct({ id })
  }
}
```

## 🌍 環境切換

### 開發環境 (使用 Mock)

```bash
# .env.development
NUXT_PUBLIC_FEATURE_API_MOCK=true
NUXT_PUBLIC_MOCK_DELAY=500
```

### 測試環境 (使用真實 API)

```bash
# .env.staging
NUXT_PUBLIC_FEATURE_API_MOCK=false
NUXT_PUBLIC_API_BASE_URL=https://test-api.example.com
```

### 正式環境 (使用真實 API)

```bash
# .env.production
NUXT_PUBLIC_FEATURE_API_MOCK=false
NUXT_PUBLIC_API_BASE_URL=https://api.example.com
```

## 🎨 進階功能

### 模擬錯誤

```typescript
// 在 utils/api/interceptors/mock.ts 中
if (method === 'GET' && url.match(/\/api\/users\/\d+/)) {
  const userId = parseInt(url.match(/\/api\/users\/(\d+)/)?.[1] || '1')

  // 模擬 404 錯誤
  if (userId === 999) {
    throw createError({
      statusCode: 404,
      message: 'User not found'
    })
  }

  return { data: createMockUser({ id: userId }) }
}
```

### 模擬延遲

延遲時間可以透過環境變數設定:

```bash
NUXT_PUBLIC_MOCK_DELAY=1000  # 1 秒延遲
```

### 選擇性 Mock

只 Mock 特定的 API:

```typescript
// 在 utils/api/interceptors/mock.ts 中
export async function checkMockData(url: string, options: any): Promise<any> {
  const config = useRuntimeConfig()

  // 只 Mock User API
  if (url.includes('/api/users') && config.public.mockUserApi === 'true') {
    return getMockDataByUrl(url, options)
  }

  // 其他 API 發送真實請求
  return null
}
```

## 🐛 除錯

### 查看 Mock 攔截

打開瀏覽器 DevTools Console，應該看到:

```
Mock API 攔截: /api/users
```

### 停用 Mock

```bash
# 方法 1: 環境變數
NUXT_PUBLIC_FEATURE_API_MOCK=false npm run dev

# 方法 2: 修改 .env
NUXT_PUBLIC_FEATURE_API_MOCK=false
```

## 📝 最佳實踐

1. **保持 Schema 同步**: Mock 的 Schema 應與真實 API 一致
2. **使用 Zod 驗證**: 在 Repository 層使用 Zod 驗證響應
3. **真實的假資料**: 使用簡單的隨機函數生成合理的假資料
4. **模擬真實場景**: 包含延遲、錯誤、分頁等
5. **環境隔離**: 開發用 Mock,測試/正式用真實 API

## 🔗 相關資源

- [Zod 官方文檔](https://zod.dev/)
- [Repository 層 Mock 詳細指南](./REPOSITORY_MOCK.md)

## ⚡ 優勢

相比 MSW (Mock Service Worker):

- ✅ **零額外套件** - 不需要 MSW (~160KB)
- ✅ **部署簡單** - 不需要 mockServiceWorker.js
- ✅ **更輕量** - 只是簡單的攔截邏輯
- ✅ **更靈活** - 可以精確控制哪些 API 用 Mock
- ✅ **正式站友好** - 可以安全地在任何環境使用
