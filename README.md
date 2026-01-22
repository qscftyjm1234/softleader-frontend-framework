# Nuxt 3 企業級開發包

一個基於 Nuxt 3 的企業級前端開發框架，採用框架無關設計理念，提供完整的開發工具鏈與最佳實踐。

## 特色

- **框架無關設計** - Interface Layer 讓您輕鬆切換 UI 框架
- **Repository Pattern** - 統一的 API 管理與資料層封裝
- **27 個 Composables** - 涵蓋常見開發需求的可重用邏輯
- **完整 Mock 系統** - 前後端分離開發，無需等待後端
- **嚴格程式碼規範** - ESLint + Prettier + Commitlint
- **安全機制** - Token 管理、權限控制、資料加密
- **多語系支援** - i18n 整合與動態語言切換

## 快速開始

### 安裝依賴

```bash
# 使用 pnpm (推薦)
pnpm install

# 或使用 npm
npm install
```

### 開發模式

```bash
pnpm dev
```

開啟瀏覽器訪問 `http://localhost:3000`

### 建置正式版

```bash
pnpm build
```

## 文件導覽

完整文件請參考 [docs/index.md](./docs/index.md)

### 快速連結

- **[專案架構](./docs/project/architecture.md)** - 了解系統設計理念
- **[開發手冊](./docs/guides/development-manual.md)** - 開發規範與流程
- **[API 快速開始](./docs/api/quick-start.md)** - 串接後端 API
- **[元件系統](./docs/core/components.md)** - UI 元件使用指南
- **[Composables](./docs/core/composables.md)** - 可重用邏輯函式

## 開發規範

### Git 提交

本專案使用 Conventional Commits 規範：

```bash
pnpm commit
```

執行後會出現互動式選單，協助您產生符合規範的提交訊息。

### 程式碼格式化

```bash
# 檢查格式
pnpm format

# 自動修正
pnpm format:write
```

### Lint 檢查

```bash
pnpm lint
```

## 註解規範

所有 exported 函式必須包含 JSDoc 註解：

```typescript
/**
 * 函式功能說明
 * @param {type} paramName - 參數說明
 * @returns {type} 回傳值說明
 */
export function myFunction(paramName: type): type {
  // ...
}
```

詳細規範請參考 [docs/guides/comments.md](./docs/guides/comments.md)

## 專案結構

```
├── components/          # Vue 元件
│   ├── uiInterface/    # 介面層元件 (框架無關)
│   ├── uiBusiness/     # 業務元件
│   └── layout/         # 佈局元件
├── composables/        # 可重用邏輯 (27 個)
├── core/               # 核心設定
├── docs/               # 完整文件
├── repositories/       # API Repository
├── utils/              # 工具函式
└── types/              # TypeScript 型別定義
```

## 環境變數

複製 `.env.example` 為 `.env` 並設定：

```bash
# API 基礎網址
NUXT_PUBLIC_API_BASE_URL=http://localhost:8080/api

# Mock 模式 (開發時可設為 true)
NUXT_PUBLIC_FEATURE_API_MOCK=false

# API 超時時間 (毫秒)
NUXT_PUBLIC_API_TIMEOUT=30000
```

完整說明請參考 [docs/api/environment-setup.md](./docs/api/environment-setup.md)

## 核心技術

- **Nuxt 3** - Vue 3 全端框架
- **Vuetify 3** - Material Design 元件庫
- **Pinia** - 狀態管理
- **TypeScript** - 型別安全
- **i18n** - 國際化
- **ESLint + Prettier** - 程式碼品質

## 授權

本專案為內部開發包，請遵守公司相關規範。

## 貢獻

請參考 [開發手冊](./docs/guides/development-manual.md) 了解開發流程與規範。
