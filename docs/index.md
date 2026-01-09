# 專案文件

歡迎來到專案文件中心。本文件庫旨在提供專案開發、架構設計與使用規範的完整說明。

## 📚 文件目錄

### 1. [專案概覽](./project/architecture.md)

專案架構與設計理念。

- **[專案檔案說明](./project/file-reference.md)**: **每個檔案的用途說明**。
- **[系統架構](./project/architecture.md)**: 框架無關設計。
- **[架構細節](./project/architecture-details.md)**: Config-Driven 架構。
- **[功能開關](./project/features.md)**: Feature Flags 系統。
- **[模組列表](./project/modules.md)**: 系統模組說明。
- **[資料夾結構](./project/folder-structure.md)**: 目錄結構與命名規範。
- **[開發路線圖](./project/roadmap.md)**: 未來開發計畫。

### 2. [核心功能](./core/components.md)

系統核心機制與基礎建設。

- **[通用元件](./core/components.md)**: `components/common` 與 `uiInterface`。
- **[組合式函式](./core/composables.md)**: 27 個可重用邏輯函式。
- **[狀態管理](./core/stores.md)**: Pinia Store 設計與規範。
- **[插件系統](./core/plugins.md)**: Nuxt 插件機制。
- **[多語系](./core/i18n.md)**: 國際化實作。
- **[資安機制](./core/security.md)**: Token 與權限管理。
- **[佈局系統](./core/layout.md)**: 頁面佈局與導航。

### 3. [API 與資料](./api/guide.md)

後端介接與資料模擬。

- **[API 指南](./api/guide.md)**: API 呼叫規範。
- **[Mock Server](./api/mock-server.md)**: 模擬伺服器使用說明。
- **[Repository Pattern](./api/repository-pattern.md)**: 資料層封裝模式。
- **[Mock Details](./api/mock-fine-grained.md)**: 詳細 Mock 資料結構。
- **[Mock Switching](./api/mock-switching.md)**: Mock 切換機制。

### 4. [開發指南](./guides/development.md)

日常開發流程與規範。

- **[套件清單](./guides/package-guide.md)**: **每個套件的功能說明**。
- **[開發手冊](./guides/development-manual.md)**: 完整開發指南 (環境、套件、命名規範)。
- **[註解規範](./guides/comments.md)**: **JSDoc 完整規範** 與註解標準。
- **[Git 工作流配置](./guides/git-workflow.md)**: Git 配置檔案說明 (Commitlint, Commitizen)。
- **[開發規範](./guides/development.md)**: 程式碼風格與開發流程。
- **[除錯指南](./guides/troubleshooting.md)**: 常見問題排除。
- **[DX 指南](./guides/dx.md)**: 開發者體驗工具。

### 5. [工具與測試](./tools/vscode-eslint.md)

開發輔助工具設定。

- **[VS Code & ESLint](./tools/vscode-eslint.md)**: 編輯器環境設定。
- **[Scripts 工具腳本](./tools/scripts.md)**: 產品設定載入器與建置工具。
- **[整合測試](./tools/integration-testing.md)**: 測試環境搭建。
