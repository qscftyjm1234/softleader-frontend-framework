# 細粒度 Mock 控制使用指南

## 🎯 核心概念

現在你可以**針對每個 API 模組**分別設定是否使用 Mock！

## 📝 配置方式

### 在 `.env` 中設定

```bash
# User API - 後端還在修，用 Mock
NUXT_PUBLIC_MOCK_USER_API=true

# Order API - 後端已完成，用真實 API
NUXT_PUBLIC_MOCK_ORDER_API=false

# 其他 API - 全域設定
NUXT_PUBLIC_FEATURE_API_MOCK=false

# Mock 延遲時間
NUXT_PUBLIC_MOCK_DELAY=500

# 真實 API URL
NUXT_PUBLIC_API_BASE_URL=https://api.yourapp.com
```

## 💡 實際使用場景

### 場景 1：User API 用 Mock，Order API 用真實

```bash
# .env
NUXT_PUBLIC_MOCK_USER_API=true      # User API → Mock 假資料
NUXT_PUBLIC_MOCK_ORDER_API=false    # Order API → 真實後端
NUXT_PUBLIC_API_BASE_URL=https://test-api.yourapp.com
```

**結果**：

- `/api/users` → 返回 Mock 假資料 ✅
- `/api/orders` → 發送到真實後端 ✅

### 場景 2：全部用 Mock

```bash
# .env
NUXT_PUBLIC_MOCK_USER_API=true
NUXT_PUBLIC_MOCK_ORDER_API=true
```

**結果**：

- `/api/users` → Mock 假資料
- `/api/orders` → Mock 假資料

### 場景 3：全部用真實 API

```bash
# .env
NUXT_PUBLIC_MOCK_USER_API=false
NUXT_PUBLIC_MOCK_ORDER_API=false
NUXT_PUBLIC_API_BASE_URL=https://api.yourapp.com
```

**結果**：

- `/api/users` → 真實後端
- `/api/orders` → 真實後端

### 場景 4：新增 Product API（用全域設定）

如果你有新的 API 模組（例如 Product），但還沒在 `mock.ts` 中特別設定，它會使用全域設定：

```bash
# .env
NUXT_PUBLIC_MOCK_USER_API=true      # User 特別設定
NUXT_PUBLIC_MOCK_ORDER_API=false    # Order 特別設定
NUXT_PUBLIC_FEATURE_API_MOCK=true   # 其他 API 用這個
```

**結果**：

- `/api/users` → Mock（特別設定）
- `/api/orders` → 真實（特別設定）
- `/api/products` → Mock（使用全域設定）

## 🔍 如何確認？

### 檢查 Console

**User API 用 Mock**：

```
Mock API 攔截 [User]: /api/users
```

**Order API 用真實**：

```
（沒有 Mock 攔截訊息）
```

### 檢查 Network 面板

- Mock 的 API：看不到請求
- 真實的 API：看得到請求

## 🔧 如何新增其他 API 模組？

### 步驟 1：在 `utils/api/interceptors/mock.ts` 中添加

```typescript
// Product API - 檢查是否啟用 Mock
if (url.includes('/api/products')) {
  if (config.public.mockProductApi !== 'true' && config.public.mockProductApi !== true) {
    return null // Product API 不使用 Mock，發送真實請求
  }
  console.log('Mock API 攔截 [Product]:', url)
  await delay(config)
  return getMockDataByUrl(url, options)
}
```

### 步驟 2：在 `.env` 中添加環境變數

```bash
# Product API Mock 開關
NUXT_PUBLIC_MOCK_PRODUCT_API=true
```

### 步驟 3：在 `getMockDataByUrl` 中添加 Mock 資料

```typescript
// GET /api/products
if (method === 'GET' && url.includes('/api/products')) {
  return {
    data: createMockProducts(20)
  }
}
```

## 📊 優先順序

```
特定 API 設定 > 全域設定 > 預設（不使用 Mock）

例如：
1. NUXT_PUBLIC_MOCK_USER_API=true  → User API 用 Mock
2. NUXT_PUBLIC_FEATURE_API_MOCK=false → 其他 API 不用 Mock
3. 未設定的 API → 不使用 Mock（發送真實請求）
```

## 🎉 總結

### 靈活度超高！

- ✅ 可以針對每個 API 模組分別設定
- ✅ 後端修好一個，就關掉一個 Mock
- ✅ 新的 API 可以用全域設定
- ✅ 完全不需要改代碼，只改環境變數

### 實際開發流程

```
第 1 週：全部用 Mock
NUXT_PUBLIC_MOCK_USER_API=true
NUXT_PUBLIC_MOCK_ORDER_API=true

第 2 週：User API 後端完成
NUXT_PUBLIC_MOCK_USER_API=false  ← 改這個
NUXT_PUBLIC_MOCK_ORDER_API=true

第 3 週：Order API 後端完成
NUXT_PUBLIC_MOCK_USER_API=false
NUXT_PUBLIC_MOCK_ORDER_API=false  ← 改這個

完成！全部用真實 API
```

完美！🎊
