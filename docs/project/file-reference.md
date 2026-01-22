[← 返回文件導覽](../index.md)

# 專案檔案說明

本文件列出專案中所有重要檔案的用途與說明。

---

## 根目錄配置檔案

### 核心配置

| 檔案                                     | 用途            | 說明                              |
| :--------------------------------------- | :-------------- | :-------------------------------- |
| [`package.json`](../../package.json)     | NPM 套件配置    | 定義專案依賴、腳本指令、版本資訊  |
| [`nuxt.config.ts`](../../nuxt.config.ts) | Nuxt 核心配置   | Nuxt 框架設定、模組載入、路由規則 |
| [`tsconfig.json`](../../tsconfig.json)   | TypeScript 配置 | TypeScript 編譯選項與路徑別名     |

### 程式碼品質

| 檔案                                           | 用途              | 說明                                 |
| :--------------------------------------------- | :---------------- | :----------------------------------- |
| [`eslint.config.mjs`](../../eslint.config.mjs) | ESLint 規則配置   | 程式碼檢查規則、JSDoc 規範、Vue 規則 |
| [`.prettierrc.json`](../../.prettierrc.json)   | Prettier 格式配置 | 程式碼格式化規則 (引號、分號、縮排)  |
| [`.prettierignore`](../../.prettierignore)     | Prettier 忽略清單 | 不需要格式化的檔案/目錄              |

### Git 工作流

| 檔案                                                   | 用途            | 說明                                     |
| :----------------------------------------------------- | :-------------- | :--------------------------------------- |
| [`commitlint.config.cjs`](../../commitlint.config.cjs) | Commitlint 入口 | 引用 `configs/git/commitlint.config.cjs` |
| [`.gitignore`](../../.gitignore)                       | Git 忽略清單    | 不納入版本控制的檔案                     |

### 環境變數

| 檔案                                 | 用途            | 說明                              |
| :----------------------------------- | :-------------- | :-------------------------------- |
| `.env`                               | 環境變數 (本地) | 本地開發環境變數 (不納入版本控制) |
| [`.env.example`](../../.env.example) | 環境變數範例    | 環境變數範本,供團隊參考           |

---

## configs/ - 配置目錄

### configs/git/ - Git 工作流配置

| 檔案                                                               | 用途            | 說明                                            |
| :----------------------------------------------------------------- | :-------------- | :---------------------------------------------- |
| [`commit-types.cjs`](../../configs/git/commit-types.cjs)           | Commit 類型定義 | 定義所有允許的 Commit 類型 (feat, fix, docs...) |
| [`commitlint.config.cjs`](../../configs/git/commitlint.config.cjs) | Commitlint 規則 | Commit 訊息檢查規則 (實際配置)                  |
| [`cz-config.cjs`](../../configs/git/cz-config.cjs)                 | Commitizen 配置 | `npm run commit` 互動式介面配置                 |

### configs/ - 產品配置

| 檔案                                         | 用途              | 說明                              |
| :------------------------------------------- | :---------------- | :-------------------------------- |
| `configs/`                                   | 專案設定檔 (JSON) | 存放產品設定,如 `default.json`    |
| [`default.json`](../../configs/default.json) | 預設產品配置      | 定義啟用的模組、主題色、Meta 資訊 |

---

## pages/ - 頁面路由

Nuxt 使用檔案系統路由,`pages/` 目錄中的檔案會自動產生路由。

| 檔案/目錄             | 路由        | 說明                  |
| :-------------------- | :---------- | :-------------------- |
| `pages/index.vue`     | `/`         | 首頁                  |
| `pages/about.vue`     | `/about`    | 關於頁面              |
| `pages/user/[id].vue` | `/user/:id` | 動態路由 (使用者詳情) |

---

## layouts/ - 佈局模板

| 檔案                                       | 用途        | 說明                                    |
| :----------------------------------------- | :---------- | :-------------------------------------- |
| [`default.vue`](../../layouts/default.vue) | 預設佈局    | 包含 Header、Sidebar、Footer 的標準佈局 |
| `portal.vue`                               | Portal 佈局 | 管理後台佈局 (含側邊欄)                 |
| `blank.vue`                                | 空白佈局    | 無框架的空白佈局 (登入頁、錯誤頁)       |

---

## components/ - 元件

### components/layout/ - 佈局元件

| 檔案             | 用途       | 說明                     |
| :--------------- | :--------- | :----------------------- |
| `AppHeader.vue`  | 頁首導航列 | Logo、主選單、使用者選單 |
| `AppSidebar.vue` | 側邊選單   | 主要導航選單             |
| `AppFooter.vue`  | 頁尾       | 版權資訊、連結           |

### components/ui/ - UI 元件

通用的 UI 元件,如按鈕、卡片、表單等。

### components/business/ - 業務元件

特定業務邏輯的元件。

---

## composables/ - 組合式函式

可重用的邏輯函式 (Vue Composition API)。

| 檔案          | 用途     | 說明                       |
| :------------ | :------- | :------------------------- |
| `useAuth.ts`  | 認證邏輯 | 登入、登出、取得使用者資訊 |
| `useApi.ts`   | API 呼叫 | 統一的 API 請求封裝        |
| `useTheme.ts` | 主題切換 | 深色/淺色模式切換          |

---

## stores/ - 狀態管理 (Pinia)

| 檔案                            | 用途         | 說明                       |
| :------------------------------ | :----------- | :------------------------- |
| [`app.ts`](../../stores/app.ts) | 應用程式狀態 | 側邊欄、載入狀態、全域配置 |
| `user.ts`                       | 使用者狀態   | 使用者資訊、權限、登入狀態 |
| `sidebar.ts`                    | 側邊欄狀態   | 選單項目、展開/收合狀態    |
| `features.ts`                   | 功能開關     | 功能旗標管理               |

---

## plugins/ - Nuxt 插件

| 檔案                                                     | 用途           | 說明                            |
| :------------------------------------------------------- | :------------- | :------------------------------ |
| [`api.ts`](../../plugins/api.ts)                         | API 整合       | 提供全域 `$api` 存取點          |
| [`vuetify.ts`](../../plugins/vuetify.ts)                 | Vuetify 初始化 | UI 框架設定                     |
| `dayjs.global.ts`                                        | Day.js 初始化  | 日期處理工具                    |
| [`security.client.ts`](../../plugins/security.client.ts) | 前端資安防護   | 禁用右鍵、截圖偵測等 (僅客戶端) |

---

## middleware/ - 中介層

路由守衛與權限檢查。

| 檔案            | 用途     | 說明                     |
| :-------------- | :------- | :----------------------- |
| `auth.ts`       | 認證檢查 | 檢查使用者是否已登入     |
| `permission.ts` | 權限檢查 | 檢查使用者是否有存取權限 |

---

## api/ - API Repository

統一的 API 呼叫層。

| 目錄             | 用途       | 說明                  |
| :--------------- | :--------- | :-------------------- |
| `modules/user/`  | 使用者 API | 使用者相關的 API 呼叫 |
| `modules/order/` | 訂單 API   | 訂單相關的 API 呼叫   |

---

## utils/ - 工具函式

| 檔案            | 用途       | 說明                              |
| :-------------- | :--------- | :-------------------------------- |
| `format.ts`     | 格式化工具 | 日期、數字、貨幣格式化            |
| `validation.ts` | 驗證工具   | 表單驗證、資料驗證                |
| `storage.ts`    | 儲存工具   | LocalStorage、SessionStorage 封裝 |

---

## types/ - TypeScript 型別定義

| 檔案          | 用途       | 說明                    |
| :------------ | :--------- | :---------------------- |
| `api.d.ts`    | API 型別   | API 請求/回應的型別定義 |
| `user.d.ts`   | 使用者型別 | 使用者相關的型別定義    |
| `global.d.ts` | 全域型別   | 全域型別擴充            |

---

## modules/ - 功能模組

### modules/showcase/ - 展示模組

| 目錄/檔案     | 用途          | 說明               |
| :------------ | :------------ | :----------------- |
| `pages/`      | Showcase 頁面 | 各種功能展示頁面   |
| `components/` | Showcase 元件 | 展示用的元件       |
| `config.ts`   | 模組配置      | 模組設定與選單定義 |

---

## docs/ - 文件目錄

### docs/guides/ - 開發指南

| 檔案                                                               | 用途       | 說明                         |
| :----------------------------------------------------------------- | :--------- | :--------------------------- |
| [`development-manual.md`](../../docs/guides/development-manual.md) | 開發手冊   | 環境需求、系統套件、命名規範 |
| [`comments.md`](../../docs/guides/comments.md)                     | 註解規範   | JSDoc 完整規範與範例         |
| [`git-workflow.md`](../../docs/guides/git-workflow.md)             | Git 工作流 | Git 配置檔案說明             |
| [`development.md`](../../docs/guides/development.md)               | 開發規範   | Commit 規範、版本發布        |
| [`dx.md`](../../docs/guides/dx.md)                                 | DX 指南    | 開發環境設定、Git Hooks      |
| [`troubleshooting.md`](../../docs/guides/troubleshooting.md)       | 問題排除   | 常見問題與解決方案           |
| [`schema-driven-ui.md`](../../docs/guides/schema-driven-ui.md)     | SDUI 指南  | Schema-Driven UI 使用說明    |

### docs/core/ - 核心功能

| 檔案                                             | 用途     | 說明                         |
| :----------------------------------------------- | :------- | :--------------------------- |
| [`components.md`](../../docs/core/components.md) | 元件系統 | 元件分類、使用範例、開發規範 |
| [`stores.md`](../../docs/core/stores.md)         | 狀態管理 | Pinia Store 架構與使用       |
| [`i18n.md`](../../docs/core/i18n.md)             | 多語系   | i18n 系統架構與使用          |
| [`layout.md`](../../docs/core/layout.md)         | 佈局系統 | 佈局類型與使用方式           |
| [`plugins.md`](../../docs/core/plugins.md)       | 插件系統 | Nuxt 插件說明                |
| [`security.md`](../../docs/core/security.md)     | 資安機制 | Token 管理、前端資安防護     |

### docs/project/ - 專案概覽

| 檔案                                                                    | 用途       | 說明                   |
| :---------------------------------------------------------------------- | :--------- | :--------------------- |
| [`architecture.md`](../../docs/project/architecture.md)                 | 系統架構   | 框架無關設計、架構層次 |
| [`architecture-details.md`](../../docs/project/architecture-details.md) | 架構細節   | Config-Driven 架構說明 |
| [`features.md`](../../docs/project/features.md)                         | 功能開關   | Feature Flags 系統說明 |
| [`folder-structure.md`](../../docs/project/folder-structure.md)         | 資料夾結構 | 目錄結構與命名規範     |
| [`modules.md`](../../docs/project/modules.md)                           | 模組說明   | 各功能模組的說明       |
| [`roadmap.md`](../../docs/project/roadmap.md)                           | 開發規劃   | 專案願景與技術棧       |

### docs/api/ - API 與資料

| 檔案                                              | 用途            | 說明                    |
| :------------------------------------------------ | :-------------- | :---------------------- |
| [`guide.md`](../../docs/api/guide.md)             | API 指南        | Smart Client 使用說明   |
| [`mock-server.md`](../../docs/api/mock-server.md) | Mock API        | Mock API 系統使用指南   |
| `mock-fine-grained.md`                            | 細粒度 Mock     | 進階 Mock 配置          |
| `mock-switching.md`                               | Mock 切換       | Mock 與真實 API 切換    |
| `repository-pattern.md`                           | Repository 模式 | Repository 設計模式說明 |

### docs/tools/ - 工具與測試

| 檔案                                                                | 用途           | 說明                           |
| :------------------------------------------------------------------ | :------------- | :----------------------------- |
| [`vscode-eslint.md`](../../docs/tools/vscode-eslint.md)             | VS Code ESLint | ESLint 設定與問題排除          |
| [`integration-testing.md`](../../docs/tools/integration-testing.md) | 整合測試       | Vue + TypeScript + ESLint 整合 |

---

## public/ - 靜態資源

| 檔案/目錄     | 用途     | 說明             |
| :------------ | :------- | :--------------- |
| `favicon.ico` | 網站圖示 | 瀏覽器標籤頁圖示 |
| `robots.txt`  | SEO 設定 | 搜尋引擎爬蟲規則 |
| `images/`     | 圖片資源 | 靜態圖片檔案     |

---

## assets/ - 需編譯的資源

| 目錄      | 用途     | 說明                               |
| :-------- | :------- | :--------------------------------- |
| `styles/` | 樣式檔案 | CSS/SCSS 檔案                      |
| `images/` | 圖片資源 | 需要處理的圖片 (會被 Webpack 處理) |

---

## 相關文件

- [專案架構說明](./architecture.md)
- [資料夾結構與命名規範](./folder-structure.md)
- [開發手冊](../guides/development-manual.md)
