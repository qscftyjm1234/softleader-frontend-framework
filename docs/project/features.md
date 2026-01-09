# 功能開關系統說明 (Feature Flags System)

## 概述

本系統提供集中式的功能開關管理,讓不同的前端專案或客戶可以根據需求啟用或停用特定功能。

## 功能分類

### 1. 開發工具 (Dev Tools)

| 功能                | 說明                     | 預設狀態 | 建議環境   |
| ------------------- | ------------------------ | -------- | ---------- |
| `historyGeneration` | 自動產生函式歷史記錄文件 | ✅ 啟用  | 開發、測試 |
| `apiMock`           | API Mock 功能            | ✅ 啟用  | 開發       |
| `devLogging`        | 開發環境詳細日誌         | ✅ 啟用  | 開發       |
| `devToolsPanel`     | 開發工具面板             | ✅ 啟用  | 開發       |

### 2. 日誌系統 (Logging)

| 功能           | 說明              | 預設狀態 | 建議環境   |
| -------------- | ----------------- | -------- | ---------- |
| `consoleLog`   | Console 日誌輸出  | ✅ 啟用  | 全部       |
| `apiLog`       | API 請求/回應日誌 | ✅ 啟用  | 開發、測試 |
| `businessLog`  | 業務邏輯執行日誌  | ✅ 啟用  | 開發、測試 |
| `errorDetails` | 錯誤詳細資訊      | ✅ 啟用  | 全部       |

### 3. 監控與追蹤 (Monitoring)

| 功能               | 說明           | 預設狀態 | 建議環境   |
| ------------------ | -------------- | -------- | ---------- |
| `performance`      | 效能監控       | ❌ 停用  | 測試、正式 |
| `errorTracking`    | 錯誤追蹤       | ❌ 停用  | 測試、正式 |
| `analytics`        | 使用者行為分析 | ❌ 停用  | 正式       |
| `pageLoadTracking` | 頁面載入追蹤   | ❌ 停用  | 測試、正式 |

### 4. 實驗性功能 (Experimental)

| 功能           | 說明           | 預設狀態 | 建議環境   |
| -------------- | -------------- | -------- | ---------- |
| `betaFeatures` | Beta 測試功能  | ❌ 停用  | 開發、測試 |
| `abTesting`    | A/B 測試       | ❌ 停用  | 測試、正式 |
| `newUI`        | 新版使用者介面 | ❌ 停用  | 開發、測試 |

### 5. 第三方整合 (Integrations)

| 功能              | 說明             | 預設狀態 | 建議環境   |
| ----------------- | ---------------- | -------- | ---------- |
| `googleAnalytics` | Google Analytics | ❌ 停用  | 正式       |
| `sentry`          | Sentry 錯誤追蹤  | ❌ 停用  | 測試、正式 |
| `hotjar`          | Hotjar 行為分析  | ❌ 停用  | 正式       |

## 使用方式

### 在元件中使用

```vue
<script setup lang="ts">
const { isEnabled } = useFeatureFlag()

// 檢查功能是否啟用
if (isEnabled('devTools.historyGeneration')) {
  console.log('歷史文件生成功能已啟用')
}

// 條件渲染
const showDevPanel = isEnabled('devTools.devToolsPanel')
</script>

<template>
  <div>
    <DevToolsPanel v-if="showDevPanel" />
  </div>
</template>
```

### 在腳本中使用

```typescript
import { useFeatureFlag } from '~/composables/useFeatureFlag'

const { isEnabled, getAllFeatures } = useFeatureFlag()

// 檢查單一功能
if (isEnabled('logging.apiLog')) {
  console.log('API 日誌已啟用')
}

// 獲取所有功能狀態
const allFeatures = getAllFeatures()
console.log(allFeatures)
```

### 在 Node.js 腳本中使用

```javascript
// gen-history.cjs
const features = require('./core/config/features.ts')

// 檢查功能開關
const historyEnabled = process.env.NUXT_PUBLIC_FEATURE_HISTORY_GENERATION !== 'false'

if (!historyEnabled) {
  console.log('歷史文件生成功能已停用')
  process.exit(0)
}
```

## 設定方式

### 方法 1: 修改設定文件

編輯 [`core/config/features.ts`](file:///c:/Users/gino.huang/Documents/nuxt3-test/core/config/features.ts):

```typescript
export const defaultFeatures: FeatureFlags = {
  devTools: {
    historyGeneration: {
      enabled: false, // 停用歷史文件生成
      description: '...'
    }
  }
}
```

### 方法 2: 使用環境變數 (推薦)

創建 `.env` 文件:

```bash
# 停用歷史文件生成
NUXT_PUBLIC_FEATURE_HISTORY_GENERATION=false

# 啟用性能監控
NUXT_PUBLIC_FEATURE_PERFORMANCE=true
```

> 💡 **提示**: 環境變數的優先級高於設定文件

## 不同客戶/專案設定範例

### 範例 1: 精簡版 (小型客戶)

```bash
# .env.minimal
NUXT_PUBLIC_FEATURE_HISTORY_GENERATION=false
NUXT_PUBLIC_FEATURE_API_MOCK=false
NUXT_PUBLIC_FEATURE_DEV_TOOLS_PANEL=false
NUXT_PUBLIC_FEATURE_PERFORMANCE=false
NUXT_PUBLIC_FEATURE_ERROR_TRACKING=false
```

### 範例 2: 完整版 (企業客戶)

```bash
# .env.enterprise
NUXT_PUBLIC_FEATURE_HISTORY_GENERATION=true
NUXT_PUBLIC_FEATURE_PERFORMANCE=true
NUXT_PUBLIC_FEATURE_ERROR_TRACKING=true
NUXT_PUBLIC_FEATURE_ANALYTICS=true
NUXT_PUBLIC_FEATURE_SENTRY=true
NUXT_PUBLIC_FEATURE_GOOGLE_ANALYTICS=true
```

### 範例 3: 開發環境

```bash
# .env.development
NUXT_PUBLIC_FEATURE_HISTORY_GENERATION=true
NUXT_PUBLIC_FEATURE_API_MOCK=true
NUXT_PUBLIC_FEATURE_DEV_LOGGING=true
NUXT_PUBLIC_FEATURE_DEV_TOOLS_PANEL=true
NUXT_PUBLIC_FEATURE_BETA=true
```

### 範例 4: 正式環境

```bash
# .env.production
NUXT_PUBLIC_FEATURE_HISTORY_GENERATION=false
NUXT_PUBLIC_FEATURE_API_MOCK=false
NUXT_PUBLIC_FEATURE_DEV_LOGGING=false
NUXT_PUBLIC_FEATURE_DEV_TOOLS_PANEL=false
NUXT_PUBLIC_FEATURE_PERFORMANCE=true
NUXT_PUBLIC_FEATURE_ERROR_TRACKING=true
NUXT_PUBLIC_FEATURE_ANALYTICS=true
```

## 進階功能

### 獲取特定分類的所有功能

```typescript
const { getCategoryFeatures } = useFeatureFlag()

// 獲取所有開發工具的狀態
const devTools = getCategoryFeatures('devTools')
console.log(devTools)
// { historyGeneration: true, apiMock: true, ... }
```

### 獲取功能完整設定

```typescript
const { getFeatureConfig } = useFeatureFlag()

const config = getFeatureConfig('devTools.historyGeneration')
console.log(config)
// {
//   enabled: true,
//   description: '自動產生函式歷史記錄文件',
//   envKey: 'NUXT_PUBLIC_FEATURE_HISTORY_GENERATION',
//   environments: ['development', 'staging']
// }
```

## 最佳實踐

1. **開發環境**: 啟用所有開發工具和日誌功能
2. **測試環境**: 啟用監控和部分日誌功能
3. **正式環境**: 只啟用必要的監控和第三方整合
4. **使用環境變數**: 不同環境使用不同的 `.env` 文件
5. **文件化**: 為每個新功能添加清楚的描述

## 新增自訂功能

1. 在 [`core/config/features.ts`](file:///c:/Users/gino.huang/Documents/nuxt3-test/core/config/features.ts) 中新增功能定義
2. 更新此文件的功能清單
3. 在 [`.env.example`](file:///c:/Users/gino.huang/Documents/nuxt3-test/.env.example) 中添加對應的環境變數
4. 在程式碼中使用 `useFeatureFlag()` 檢查功能狀態

## 相關文件

- [功能設定文件](file:///c:/Users/gino.huang/Documents/nuxt3-test/core/config/features.ts)
- [Feature Flag Composable](file:///c:/Users/gino.huang/Documents/nuxt3-test/composables/useFeatureFlag.ts)
- [環境變數範例](file:///c:/Users/gino.huang/Documents/nuxt3-test/.env.example)
