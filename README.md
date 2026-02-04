# Nuxt 3 開發包

一個基於 Nuxt 3 的前端開發框架，採用Ant Design Vue框架，提供完整的開發工具與實踐。

## 快速開始

新進人員請優先參考此區塊以快速建立開發環境。

### 1. 打開你的終端機，安裝相依套件

這時候他會依照package.json中的套件相依關係，自動安裝對應的套件，
安裝完後會產生node_modules的資料夾

```bash
# 快捷鍵 Ctrl + `
npm install
```

### 2. 環境設定

```bash
# 複製指令快捷鍵
cp .env.example .env
```

複製 `.env.example` 為 `.env` 並設定：

```bash
# API 基礎網址
NUXT_PUBLIC_API_BASE_URL=http://localhost:8080/api

# Mock 模式 (開發時可設為 true)
NUXT_PUBLIC_FEATURE_API_MOCK=false
```

完整環境變數說明請參考 **[環境設定指南](./docs/api/environment-setup.md)**。

### 3. 啟動開發伺服器，

```bash
npm run dev
```

開啟瀏覽器訪問 `http://localhost:3000`

### 4. 開發必讀

- **[開發手冊](./docs/guides/development-manual.md)**: 完整開發指南 (環境、套件、命名規範)。這是一份**必讀**的文件。
- **[Git 工作流配置](./docs/guides/git-workflow.md)**: 了解 Commitlint 與 Commitizen 規範。
- **[ESLint 開發規範](./docs/guides/eslint-rules.md)**: 完整的程式碼風格規範。

## 開發課程

專為新進人員設計的循序漸進教學。

- **[第一課：建立您的第一個頁面](./docs/course/lesson-1.md)**
  - 學習如何建立 Layout 與 Page
  - 使用 Interface Layer 元件 (IButton)
- **[第二課：使用介面元件與 Props](./docs/course/lesson-2.md)**
  - 學習如何使用 `ICard`、`IAvatar`
  - 建立複合元件 `UserInfoCard`
- **[第三課：頁面導航與路由](./docs/course/lesson-3.md)**
  - 建立列表頁與詳情頁
  - 學習動態路由 `[id].vue`
- **[第四課：API 串接與資料層規範](./docs/course/lesson-4.md)**
  - 學習 Repository Pattern
  - 使用 `useAsyncData` 獲取資料
- **[第五課：全域狀態管理 (Pinia)](./docs/course/lesson-5.md)**
  - 建立 Store
  - 跨頁面共享狀態

---

## 文件目錄

詳細文件說明。

### 1. [專案概覽](./docs/project/architecture.md)

專案架構與設計理念。

- **[系統架構](./docs/project/architecture.md)**: 框架無關設計理念。
- **[資料夾結構](./docs/project/folder-structure.md)**: 目錄結構與命名規範。
- **[專案檔案說明](./docs/project/file-reference.md)**: 重點檔案用途說明。
- **[功能展示與範例](./docs/guides/ui-showcase.md)**: 如何使用 Showcase 介面查看 UI 、模組與開發範例。

### 2. [核心功能](./docs/core/components.md)

系統核心機制與基礎建設。

- **[通用元件](./docs/core/components.md)**: `components/common` 與 `uiInterface` 使用說明。
- **[組合式函式 (Composables)](./docs/core/composables.md)**: 27 個可重用邏輯函式介紹。
- **[狀態管理 (Pinia)](./docs/core/stores.md)**: Store 設計與規範。
- **[插件系統](./docs/core/plugins.md)**: Nuxt 插件機制。
- **[佈局系統](./docs/core/layout.md)**: 頁面佈局與導航。
- **[多語系](./docs/core/i18n.md)**: i18n 整合與實作。
- **[認證與權限](./docs/core/security.md)**: Token 與權限管理。

### 3. [API 與資料](./docs/api/guide.md)

後端介接與資料模擬。

- **[快速開始: API 串接](./docs/api/quick-start.md)**: 後端整合快速指南。
- **[API 開發指南](./docs/api/guide.md)**: API 呼叫規範。
- **[後端 API 規範](./docs/api/backend-contract.md)**: 後端 API 格式規範。
- **[Repository Pattern](./docs/api/repository-pattern.md)**: 資料層封裝模式。
- **[Mock Server](./docs/api/mock-server.md)**: 模擬伺服器使用說明。

### 4. [開發指南與規範](./docs/guides/development-manual.md)

日常開發流程與細節規範。

- **[套件清單](./docs/guides/package-guide.md)**: 專案使用套件的功能說明。
- **[註解規範](./docs/guides/comments.md)**: JSDoc 規範與註解標準。
- **[邏輯放置指南](./docs/guides/logic-placement.md)**: Composables vs Utils 使用準則。
- **[除錯指南](./docs/guides/troubleshooting.md)**: 常見問題排除。
- **[DX 指南](./docs/guides/dx.md)**: 開發者體驗工具。

### 5. [工具與測試](./docs/tools/vscode-eslint.md)

- **[VS Code & ESLint](./docs/tools/vscode-eslint.md)**: 編輯器環境設定。
- **[Scripts 工具腳本](./docs/tools/scripts.md)**: 產品設定載入器與建置工具。

---

## 專案開發指令

### Git 提交

本專案使用 Conventional Commits 規範：

```bash
pnpm commit
```

### 程式碼與 Lint

```bash
# 檢查格式
pnpm format

# 自動修正格式
pnpm format:write

# Lint 檢查
pnpm lint
```

### 建置

```bash
# 建置正式版
pnpm build
```

## 核心技術

- **Nuxt 3** - Vue 3 全端框架
- **Vuetify 3** - Material Design 元件庫
- **Pinia** - 狀態管理
- **TypeScript** - 型別安全
- **i18n** - 國際化

## 授權

本專案為內部開發包，請遵守公司相關規範。
