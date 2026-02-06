[← 返回 README.md](../../README.md)

# Repository 層 Mock 資料使用指南

## 概述

我們已經將 Mock 資料攔截整合到 `useApi` 中，**不再依賴 MSW**。

## 優勢

相比 MSW：

- **零額外套件** - 不需要 MSW（節省 ~160KB）
- **部署簡單** - 不需要 `mockServiceWorker.js`
- **更靈活** - 可以精確控制哪些 API 用 Mock
- **更輕量** - 只是簡單的 if-else 判斷
- **正式站友好** - 可以安全地在任何環境使用

## 工作原理

### 攔截位置

```
你的代碼
  ↓
useApi('/api/users')
  ↓
onRequest 攔截器
  ↓
checkMockData() 判斷
  ↓
if (啟用 Mock) → 返回假資料
else → 發送真實請求
```

### 程式碼流程

```typescript
// composables/useApi.ts
async onRequest({ request, options }) {
  // 檢查是否需要返回 Mock 資料
  const mockData = await checkMockData(request, options)

  if (mockData !== null) {
    // 直接返回假資料，不發送請求
    options._mockData = mockData
    return
  }

  // 繼續發送真實請求...
}
```

## 使用方式

### 1. 啟用 Mock

```bash
# .env
NUXT_PUBLIC_FEATURE_API_MOCK=true
NUXT_PUBLIC_MOCK_DELAY=500
```

### 2. 在代碼中正常使用 useApi

```typescript
// 完全不需要修改業務代碼！
const { data } = await useApi('/api/users')

// 如果 Mock 啟用 → 返回假資料
// 如果 Mock 關閉 → 發送真實請求
```

### 3. 關閉 Mock

```bash
# .env
NUXT_PUBLIC_FEATURE_API_MOCK=false
NUXT_PUBLIC_API_BASE_URL=https://api.yourapp.com
```

## 檔案結構

```
utils/api/interceptors/
  └── mock.ts              # Mock 資料攔截器

mock/
  ├── factories/           # 假資料生成器（保留）
  │   ├── user.factory.ts
  │   └── order.factory.ts
  └── types/               # TypeScript Interfaces
      ├── user.ts
      └── order.ts

composables/
  └── useApi.ts            # 整合 Mock 攔截器
```

## 添加新的 Mock API

### 步驟 1：在 `mock.ts` 中添加 URL 匹配

```typescript
// utils/api/interceptors/mock.ts

function getMockDataByUrl(url: string, options: any): any {
  const method = options.method || 'GET'

  // ========================================
  // Product API (新增)
  // ========================================

  // GET /api/products - 商品列表
  if (method === 'GET' && url.includes('/api/products')) {
    return {
      data: createMockProducts(20),
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

  // ... 其他 API
}
```

### 步驟 2：創建對應的 Factory（如果需要）

```typescript
// mock/factories/product.factory.ts
export function createMockProduct(overrides?: Partial<Product>): Product {
  return {
    id: randomInt(1, 1000),
    name: randomElement(PRODUCT_NAMES),
    price: randomFloat(10, 1000),
    ...overrides
  }
}
```

## 進階功能

### 1. 選擇性 Mock

只 Mock 特定的 API：

```typescript
// utils/api/interceptors/mock.ts

export async function checkMockData(url: string, options: any): Promise<any> {
  const config = useRuntimeConfig()

  // 只 Mock User API
  if (config.public.mockUserApi === 'true' && url.includes('/api/users')) {
    return getMockDataByUrl(url, options)
  }

  // Order API 打真實後端
  return null
}
```

環境變數：

```bash
NUXT_PUBLIC_MOCK_USER_API=true   # User API 用 Mock
NUXT_PUBLIC_MOCK_ORDER_API=false # Order API 用真實後端
```

### 2. 模擬錯誤

```typescript
// GET /api/users/:id
if (method === 'GET' && url.match(/\/api\/users\/\d+/)) {
  const id = parseInt(url.match(/\/api\/users\/(\d+)/)?.[1] || '1')

  // 模擬 404 錯誤
  if (id === 999) {
    throw createError({
      statusCode: 404,
      message: 'User not found'
    })
  }

  return { data: createMockUser({ id }) }
}
```

### 3. 動態延遲

```typescript
// 根據不同 API 設定不同延遲
const delay = url.includes('/api/slow') ? 3000 : 500
await new Promise((resolve) => setTimeout(resolve, delay))
```

## 環境設定

### 開發環境

```bash
# .env.development
NUXT_PUBLIC_FEATURE_API_MOCK=true
NUXT_PUBLIC_MOCK_DELAY=500
```

### 測試環境（有後端）

```bash
# .env.staging
NUXT_PUBLIC_FEATURE_API_MOCK=false
NUXT_PUBLIC_API_BASE_URL=https://test-api.yourapp.com
```

### 測試環境（無後端，Demo 模式）

```bash
# .env.staging
NUXT_PUBLIC_FEATURE_API_MOCK=true
NUXT_PUBLIC_MOCK_DELAY=300
```

### 正式環境

```bash
# .env.production
NUXT_PUBLIC_FEATURE_API_MOCK=false
NUXT_PUBLIC_API_BASE_URL=https://api.yourapp.com
```

## 除錯

### 檢查 Mock 是否啟用

打開瀏覽器 Console，應該看到：

```
Mock API 攔截: /api/users
```

### 檢查環境變數

```typescript
// 在任何地方
const config = useRuntimeConfig()
console.log('Mock 啟用:', config.public.featureApiMock)
```

## 注意事項

### 1. 不會在 Network 面板看到請求

因為 Mock 資料是在應用層攔截的，不會發送真實的網路請求。

**如果需要看到請求**（例如給客戶 Demo），可以保留 MSW。

### 2. 未匹配的 API 會繼續發送

如果 `getMockDataByUrl()` 返回 `null`，請求會繼續發送到真實 API。

```typescript
// 未匹配的 API
console.warn('未找到對應的 Mock 資料:', url)
return null // 讓請求繼續
```

### 3. 需要手動維護 URL 匹配

每次新增 API 都需要在 `mock.ts` 中添加對應的 URL 匹配邏輯。

## 總結

### 與 MSW 的對比

| 特性         | Repository 層 Mock | MSW                       |
| ------------ | ------------------ | ------------------------- |
| Bundle Size  | 小                 | 大 (~160KB)               |
| 部署複雜度   | 簡單               | 需要 mockServiceWorker.js |
| Network 面板 | 看不到請求         | 可以看到                  |
| 真實性       | 中等               | 高                        |
| 靈活度       | 高                 | 高                        |
| 維護成本     | 需要手動匹配 URL   | 低                        |
| 適用場景     | 開發/測試/正式站   | 開發/測試                 |

### 建議

- **簡單專案** → 用 Repository 層 Mock
- **需要給客戶看真實網路請求** → 用 MSW
- **正式站需要 Demo 模式** → 用 Repository 層 Mock

現在你的專案已經支援兩種方式，可以根據需求選擇！
