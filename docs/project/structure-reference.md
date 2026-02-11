[← 返回 README.md](../../README.md)

# 專案架構與檔案說明 (完整版)

本文件詳盡說明專案的目錄結構、分層架構設計理念，以及各目錄下重要檔案的用途。

---

## 專案結構概覽

```bash
.
├── apps/                # 應用程式目錄 (Monorepo 架構)
├── layers/              # Nuxt Layers 目錄
├── core/                # 專案核心邏輯與配置
├── configs/             # 開發工具與產品配置
├── modules/             # 業務功能模組
├── components/          # 全域 UI 與業務組件
├── composables/         # 業務邏輯掛鉤 (Vue Hooks)
├── repositories/        # API 資料通訊層
├── stores/              # 全域狀態管理 (Pinia)
├── pages/               # 頁面路由目錄
├── layouts/             # 頁面佈局模板
├── plugins/             # Nuxt 插件系統
├── middleware/          # 路由守衛與中介層
├── assets/              # 需編譯資源 (CSS/SCSS)
├── public/              # 靜態資源 (不需編譯)
├── i18n/                # 多語系語系檔
├── mock/                # Mock Server 模擬資料
├── utils/               # 純邏輯工具函式
├── types/               # TypeScript 型別定義
├── docs/                # 說明文件與指南
├── CI.md                # 持續整合 (CI) 指南
└── CD.md                # 持續部署 (CD) 指南
```

---

## 1. 核心與配置層 (Core & Configs)

這是專案的基礎設施。

### 核心目錄說明

- **`core/`**: 存放專案最核心的邏輯。包含模組化的 Nuxt 配置、全域 API 攔截器（處理 Token 與報錯）、全域常數等。
- **`configs/`**: 存放開發工具的設定檔（如 ESLint, Git 規範等）以及產品本身的預設配置。
- **`layers/core/`**: 提供跨專案共享的基礎功能層，實現程式碼重用。

### 根目錄關鍵檔案

| 檔案                                           | 用途            | 說明                                 |
| :--------------------------------------------- | :-------------- | :----------------------------------- |
| [`package.json`](../../package.json)           | NPM 套件配置    | 定義依賴、腳本、版本資訊             |
| [`nuxt.config.ts`](../../nuxt.config.ts)       | Nuxt 核心配置   | 框架總進入點，載入 `core` 配置       |
| [`tsconfig.json`](../../tsconfig.json)         | TypeScript 配置 | 定義編譯路徑別名 (如 `@/`, `~core/`) |
| [`eslint.config.mjs`](../../eslint.config.mjs) | ESLint 規則     | 程式碼風格檢查與規範                 |
| [`.env.example`](../../.env.example)           | 環境變數範本    | 專案所需變數列舉                     |

---

## 2. 資料持久與通訊層 (Data Layer)

負責處理資料的來源、通訊與全域狀態。

### 資料層目錄說明

- **`repositories/`**: **【極重要】** 這是專案中唯一允許發送 API 請求的地方。採用 Repository Pattern，實現與後端 URL 的解耦。頁面透過呼叫 Repo 函式取得資料。
- **`stores/`**: 使用 Pinia 管理跨頁面共享的全域狀態。
- **`api/`**: 定義 API 請求與回應的 TypeScript 型別定義。

### 狀態管理 (Pinia Stores)

| 檔案                            | 用途       | 說明                               |
| :------------------------------ | :--------- | :--------------------------------- |
| [`app.ts`](../../stores/app.ts) | 應用狀態   | 側邊欄狀態、全域 Loading、通知配置 |
| `user.ts`                       | 使用者狀態 | 儲存基本資訊、權限清單、Token 狀態 |

---

## 3. 商業邏輯與工具層 (Logic Layer)

負責「資料的處理與運算」。

### 邏輯層目錄說明

- **`composables/`**: 存放與 Vue 生命週期或響應式相關的邏輯掛鉤 (Hooks)。
- **`utils/`**: 存放「純粹」的 JavaScript 工具函式，不依賴 Vue 環境，適合前端與 Node.js 通用。
- **`types/`**: 全域定義的 TypeScript 型別，用於確保程式碼品質。

### 關鍵檔案範例

| 檔案            | 用途      | 說明                                     |
| :-------------- | :-------- | :--------------------------------------- |
| `useAuth.ts`    | 認證 Hook | 處理登入流程與登入狀態檢查               |
| `formatDate.ts` | 日期工具  | 封裝 dayjs 提供標準化日期顯示            |
| `api.d.ts`      | 全域型別  | 定義通用的 API 回傳格式 (如 `Result<T>`) |

---

## 4. 組件與視圖層 (View Layer)

負責「畫面的呈現與互動」。

### 視圖層目錄說明

- **`pages/`**: Nuxt 自動產生路由的目錄。檔名即網址路徑。
- **`layouts/`**: 定義網頁的整體骨架（如側邊欄、導覽列）。
- **`components/uiInterface/`**: 基礎「笨組件」，不含業務邏輯 (如 `IButton`, `IInput`)。
- **`components/uiBusiness/`**: 具備業務邏輯的組件 (如 `UserCard`, `OrderList`)。

### 佈局模板 (Layouts)

| 檔案          | 用途     | 說明                            |
| :------------ | :------- | :------------------------------ |
| `default.vue` | 預設佈局 | 標準後台模式 (Header + Sidebar) |
| `blank.vue`   | 空白佈局 | 用於登入頁或全螢幕展示頁面      |

---

## 5. 業務模組層 (Module Layer)

- **`modules/`**: 為了解決專案過大導致的維護困難，我們將相關聯的功能（如「系統管理」）包裝成獨立模組。
- **`modules/showcase/`**: 特別設計的展示模組，內含所有 UI 元件的對照範例與用法說明。

---

## 6. 其他重要目錄

| 目錄              | 用途      | 說明                                         |
| :---------------- | :-------- | :------------------------------------------- |
| **`assets/`**     | 編譯資源  | 存放需要被 Webpack/Vite 編譯的樣式與圖片     |
| **`public/`**     | 靜態資源  | 存放在 root 的原始檔案 (favicon, robots.txt) |
| **`mock/`**       | 模擬資料  | 後端開發階段的假資料產生器                   |
| **`i18n/`**       | 多語系    | 存放各國語系對照表 (json/yaml)               |
| **`plugins/`**    | Nuxt 插件 | 擴充 Nuxt 功能，如 AntD 初始化、API 攔截器   |
| **`middleware/`** | 路由守衛  | 控制頁面跳轉權限，如 `auth` 中介層           |

---

## 命名規則摘要

| 類型                    | 命名方式         | 範例            |
| :---------------------- | :--------------- | :-------------- |
| **頁面**                | kebab-case       | `user-list.vue` |
| **UI 組件 (Interface)** | I + PascalCase   | `IButton.vue`   |
| **UI 組件 (Business)**  | PascalCase       | `OrderCard.vue` |
| **Composables**         | use + camelCase  | `useTheme.ts`   |
| **Repositories**        | camelCase + Repo | `userRepo.ts`   |
| **常數**                | UPPER_SNAKE_CASE | `MAX_FILE_SIZE` |
