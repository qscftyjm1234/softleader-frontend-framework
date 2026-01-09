# 專案文件 (Project Documentation)

歡迎來到專案文件中心。本文件庫旨在提供專案開發、架構設計與使用規範的完整說明。

## 📚 文件目錄

### 1. [專案概覽 (Project)](./project/architecture.md)

專案的核心架構與規劃。

- **[系統架構 (Architecture)](./project/architecture.md)**: 系統整體設計與分層。
- **[架構詳解 (Details)](./project/architecture-details.md)**: 深入架構實作細節。
- **[功能列表 (Features)](./project/features.md)**: 現有功能清單與狀態。
- **[模組列表 (Modules)](./project/modules.md)**: 系統模組說明。
- **[目錄結構 (Folder Structure)](./project/folder-structure.md)**: 專案目錄規範。
- **[開發路線圖 (Roadmap)](./project/roadmap.md)**: 未來開發計畫。
- **[Schema Driven UI](./project/schema-driven-ui.md)**: SDUI 設計理念。

### 2. [核心功能 (Core)](./core/components.md)

系統核心機制與基礎建設。

- **[通用元件 (Components)](./core/components.md)**: `components/common` 與 `uiInterface`。
- **[狀態管理 (Stores)](./core/stores.md)**: Pinia Store 設計與規範。
- **[插件系統 (Plugins)](./core/plugins.md)**: Nuxt 插件機制。
- **[多語系 (i18n)](./core/i18n.md)**: 國際化實作。
- **[資安機制 (Security)](./core/security.md)**: Token 與權限管理。
- **[佈局系統 (Layout)](./core/layout.md)**: 頁面佈局與導航。

### 3. [API 與資料 (API)](./api/guide.md)

後端介接與資料模擬。

- **[API 指南 (Guide)](./api/guide.md)**: API 呼叫規範。
- **[Mock Server](./api/mock-server.md)**: 模擬伺服器使用說明。
- **[Repository Pattern](./api/repository-pattern.md)**: 資料層封裝模式。
- **[Mock Details](./api/mock-fine-grained.md)**: 詳細 Mock 資料結構。
- **[Mock Switching](./api/mock-switching.md)**: Mock 切換機制。

### 4. [開發指南 (Guides)](./guides/development.md)

日常開發流程與規範。

- **[開發規範 (Development)](./guides/development.md)**: 程式碼風格與開發流程。
- **[註解規範 (Comments)](./guides/comments.md)**: JSDoc 與註解標準。
- **[除錯指南 (Troubleshooting)](./guides/troubleshooting.md)**: 常見問題排除。
- **[DX 指南 (Developer Experience)](./guides/dx.md)**: 開發者體驗工具。

### 5. [工具與測試 (Tools)](./tools/vscode-eslint.md)

開發輔助工具設定。

- **[VS Code & ESLint](./tools/vscode-eslint.md)**: 編輯器環境設定。
- **[整合測試 (Integration Testing)](./tools/integration-testing.md)**: 測試環境搭建。
