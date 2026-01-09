# Scripts 工具腳本

本資料夾包含專案的工具腳本,用於建置時期的配置載入與處理。

---

## 📁 檔案列表

### product-loader.ts

**用途**: 產品設定檔載入器

**功能說明**:

- 載入 JSON 格式的產品設定檔
- 支援多產品配置切換
- 提供型別安全的設定介面

---

## 🔧 product-loader.ts 詳細說明

### 核心功能

這個腳本負責在建置時期載入產品專屬的設定檔,讓專案可以根據不同產品需求進行客製化。

### 設定檔位置

```
configs/
├── default.json      # 預設設定
├── product-a.json    # 產品 A 設定
└── product-b.json    # 產品 B 設定
```

### 使用方式

#### 1. 在程式碼中使用

```typescript
import { getProductConfig, productConfig } from '~/scripts/product-loader'

// 方法 1: 使用 singleton instance
console.log(productConfig.modules) // ['module1', 'module2']

// 方法 2: 手動載入
const config = getProductConfig()
console.log(config.meta?.title) // 產品標題
```

#### 2. 環境變數切換

透過 `PRODUCT_CONFIG` 環境變數指定要載入的設定檔:

```bash
# 載入 default.json (預設)
npm run dev

# 載入 product-a.json
PRODUCT_CONFIG=product-a npm run dev

# 載入 product-b.json
PRODUCT_CONFIG=product-b npm run build
```

### 設定檔格式

#### ProductConfig 介面

```typescript
interface ProductConfig {
  modules: string[] // 要啟用的模組列表
  meta?: {
    title?: string // 產品標題
    description?: string // 產品描述
    themeColor?: string // 主題顏色
    favicon?: string // Favicon 路徑
  }
  [key: string]: any // 其他自訂欄位
}
```

#### JSON 設定範例

```json
// configs/default.json
{
  "modules": ["user", "policy", "payment"],
  "meta": {
    "title": "保險管理系統",
    "description": "企業級保險管理平台",
    "themeColor": "#1976D2",
    "favicon": "/favicon.ico"
  },
  "apiBaseUrl": "https://api.example.com",
  "features": {
    "enableNotifications": true,
    "enableAnalytics": false
  }
}
```

### 主要方法

#### getProductConfig(rootDir?)

載入產品設定檔。

**參數**:

- `rootDir` (可選): 專案根目錄,預設為 `process.cwd()`

**回傳**:

- `ProductConfig`: 產品設定物件

**範例**:

```typescript
// 使用預設根目錄
const config = getProductConfig()

// 指定根目錄
const config = getProductConfig('/path/to/project')
```

### 錯誤處理

腳本會自動處理以下情況:

1. **設定檔不存在**:

   ```
   [Config] Configuration file not found: configs/xxx.json. Loading no modules.
   ```

   回傳空的設定物件: `{ modules: [] }`

2. **JSON 解析錯誤**:

   ```
   [Config] Error loading configuration configs/xxx.json: [錯誤訊息]
   ```

   回傳空的設定物件: `{ modules: [] }`

3. **成功載入**:
   ```
   [Config] Loaded configuration: default
   ```

---

## 🎯 使用場景

### 1. 多產品部署

當專案需要為不同客戶或產品提供不同配置時:

```bash
# 為客戶 A 建置
PRODUCT_CONFIG=client-a npm run build

# 為客戶 B 建置
PRODUCT_CONFIG=client-b npm run build
```

### 2. 模組化架構

根據產品需求啟用不同的功能模組:

```json
// configs/basic.json
{
  "modules": ["user", "dashboard"]
}

// configs/premium.json
{
  "modules": [
    "user",
    "dashboard",
    "analytics",
    "reporting",
    "advanced-features"
  ]
}
```

### 3. 環境差異化

不同環境使用不同的設定:

```json
// configs/development.json
{
  "apiBaseUrl": "http://localhost:3000",
  "features": {
    "enableDebug": true
  }
}

// configs/production.json
{
  "apiBaseUrl": "https://api.production.com",
  "features": {
    "enableDebug": false
  }
}
```

---

## 📋 最佳實踐

### 1. 設定檔命名規範

```
configs/
├── default.json           # 預設設定 (必須)
├── {product-name}.json    # 產品專屬設定
├── {client-name}.json     # 客戶專屬設定
└── {environment}.json     # 環境專屬設定
```

### 2. 設定檔結構建議

```yaml
// 基本資訊
{
  "modules": [],
  "meta": {}
}

# API 設定
api:
  baseUrl: ''
  timeout: 30000

# 功能開關
features:
  feature1: true
  feature2: false

# 主題設定
theme:
  primaryColor: ''
  logo: ''
```

### 3. 型別安全

擴充 `ProductConfig` 介面以獲得更好的型別提示:

```typescript
// types/product-config.ts
export interface ExtendedProductConfig extends ProductConfig {
  api?: {
    baseUrl: string
    timeout: number
  }
  features?: {
    enableNotifications: boolean
    enableAnalytics: boolean
  }
}

// 使用
const config = getProductConfig() as ExtendedProductConfig
console.log(config.api?.baseUrl) // 有型別提示
```

---

## 🔍 常見問題

### Q1: 如何新增自訂欄位?

**A**: 直接在 JSON 檔案中新增即可,`ProductConfig` 介面支援任意欄位:

```json
// configs/custom.json
{
  "modules": [],
  "customField": "custom value",
  "nestedConfig": {
    "key1": "value1",
    "key2": "value2"
  }
}
```

### Q2: 可以在執行時期切換設定嗎?

**A**: 不行,`product-loader` 是在建置時期執行的。如需執行時期切換,請使用環境變數或 Runtime Config。

### Q3: 設定檔可以使用 YAML 格式嗎?

**A**: 不行,目前已遷移至 JSON 格式以減少依賴。如需支援 YAML,需要安裝 `js-yaml` 並修改 `product-loader.ts`。

---

## 🛠️ 整合範例

### 在 nuxt.config.ts 中使用

```typescript
// nuxt.config.ts
import { productConfig } from './scripts/product-loader'

export default defineNuxtConfig({
  app: {
    head: {
      title: productConfig.meta?.title || 'Default Title',
      meta: [
        {
          name: 'description',
          content: productConfig.meta?.description || 'Default Description'
        },
        {
          name: 'theme-color',
          content: productConfig.meta?.themeColor || '#1976D2'
        }
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: productConfig.meta?.favicon || '/favicon.ico'
        }
      ]
    }
  },

  runtimeConfig: {
    public: {
      modules: productConfig.modules,
      apiBaseUrl: productConfig.apiBaseUrl || ''
    }
  }
})
```

### 在元件中使用

```vue
<script setup lang="ts">
const config = useRuntimeConfig()
const enabledModules = config.public.modules

// 根據模組啟用狀態顯示功能
const showAnalytics = enabledModules.includes('analytics')
</script>

<template>
  <div>
    <AnalyticsPanel v-if="showAnalytics" />
  </div>
</template>
```

---

## 相關文件

- [專案檔案說明](../project/file-reference.md) - 所有檔案用途說明
- [開發手冊](./development-manual.md) - 開發環境設定
- [功能開關](../project/features.md) - Feature Flags 系統
