[← 返回文件導覽](../index.md)

# Mock API 系統使用指南

## 概述

本專案使用 **Repository 層 Mock** 實現 Mock API 系統，直接在 API 請求發出前由 `useApi` 攔截，回傳預定義的假資料。

> **注意**：本專案已移除 MSW (Mock Service Worker)，改用更輕量的 Repository 層 Mock 方式。

## 快速開始

### 1. 啟用 Mock API

在 `.env` 檔案中設定:

```bash
NUXT_PUBLIC_FEATURE_API_MOCK=true
NUXT_PUBLIC_MOCK_DELAY=500
```

### 2. 啟動開發伺服器

```bash
npm run dev
```

### 3. 測試 Mock API

當 Mock 啟用時，Console 會顯示 `Mock Hit: /api/xxx`，表示請求已被攔截。

## 專案結構

Mock 系統的所有程式碼都位於 `mock/` 目錄下：

```
mock/
├── routes.ts         # 核心：定義所有 Mock 路由與回傳資料
├── core.ts           # 核心邏輯：攔截器實作與 Mock 開關判斷
├── types/            # TypeScript Interfaces (選用)
│   ├── user.ts
│   └── order.ts
└── factories/        # Mock 資料產生器 (假資料工廠)
    ├── user.factory.ts
    └── order.factory.ts
```

## 如何新增 Mock API

所有的 Mock 規則都集中定義在 [`mock/routes.ts`](../../mock/routes.ts)。

### 步驟 1: 開啟配置文件

編輯 `mock/routes.ts`，你會看到 `MOCK_ROUTES` 陣列。

### 步驟 2: 加入新的路由規則

在陣列中加入一個新的物件：

```typescript
{
  // 1. URL 匹配規則 (支援字串或 Regex)
  url: '/api/products',

  // 2. HTTP 方法
  method: 'GET',

  // 3. 模擬延遲 (毫秒)
  delay: 1000,

  // 4. 回傳資料 (可以是物件或函式)
  response: {
    data: [
      { id: 1, name: 'Product A', price: 100 },
      { id: 2, name: 'Product B', price: 200 }
    ],
    total: 2
  }
}
```

### 進階範例：動態回傳

如果需要根據請求參數 (Params/Body) 回傳不同資料，可以使用函式：

```typescript
{
  url: /\/api\/products\/\d+/, // Regex 匹配 ID
  method: 'GET',
  response: (context) => {
    // context.url   -> 請求 URL
    // context.body  -> POST Body
    // context.query -> Query String

    // 從 URL 提取 ID
    const id = Number(context.url.match(/\/api\/products\/(\d+)/)?.[1] || 1)

    return {
      data: {
        id: id,
        name: `Dynamic Product ${id}`,
        price: Math.floor(Math.random() * 1000)
      }
    }
  }
}
```

## 使用範例

### 在 Repository 中使用

開發時不需要修改 Repository 程式碼，`useApi` 會自動處理 Mock。

```typescript
// repositories/modules/user.ts
export async function getUsers(params: any) {
  // 如果 .env 設定了 Mock=true 且 routes.ts 有對應規則，這裡會直接拿到假資料
  const response = await useApi<UserListResponse>('/api/users', { params })
  return response
}
```

## 環境與開關控制

Mock 系統使用單一的全域開關，可以在 `.env` 中設定：

```bash
# 全域開關 (Master Switch)
NUXT_PUBLIC_FEATURE_API_MOCK=true
```

當設定為 `true` 時，系統會攔截 `mock/routes.ts` 中定義的所有請求。設定為 `false` 時，則完全關閉 Mock 功能，所有請求都會直接發送到真實後端。

## 優勢

- **集中管理**：所有路由規則都在 `mock/routes.ts`，一目了然。
- **熱更新**：修改 `routes.ts` 後，Nuxt 會自動熱重載，無需重啟伺服器。
- **型別安全**：支援 TypeScript，可引入 Interface 確保假資料格式正確。
