[← 返回 README.md](../../README.md)

# 資料夾結構與命名規範

## 資料夾結構概覽

---

## 專案核心架構與分層說明

本專案採用 **Layered Architecture (分層架構)**，將不同性質的程式碼嚴格分開，以達到「高內聚、低耦合」的目標。以下是各層級的詳細功能介紹：

### 1. 核心與配置層 (Core & Configs)

這是整個專案的基礎建設。

- **`core/`**: 存放專案最核心的邏輯。包含模組化的 Nuxt 配置、全域 API 攔截器（處理 Token 與報錯）、全域常數等。
- **`configs/`**: 存放各種開發工具的設定檔。例如 ESLint (程式碼風格)、Commitlint (Git 提交規範) 的具體規則。
- **`nuxt.config.ts`**: 專案的總進入點設定，它會動態載入 `core/config` 中的各項子配置。

### 2. 資料持久與通訊層 (Data Layer)

負責「處理資料的來源」。

- **`repositories/`**: **【極重要】** 這是專案中唯一允許發送 API 請求的地方。我們採用 Repository Pattern，頁面不需要知道後端的 URL 是什麼，只需要呼叫 `userRepo.getUser()` 即可。這樣以後後端改網址，我們只需要改一個地方。
- **`stores/`**: 使用 Pinia 管理全域狀態。適合存放「跨頁面」需要共享的資料，如登入者資訊、全域 UI 狀態。
- **`api/`**: 定義 API 的資料結構 (TypeScript Interfaces)，確保前後端溝通的資料格式正確。

### 3. 商業邏輯與工具層 (Logic Layer)

負責「資料的處理與運算」。

- **`composables/`**: 存放與 Vue 生命週期或響應式相關的邏輯掛鉤 (Hooks)。例如：處理複雜的分頁邏輯、自動儲存草稿的功能。
- **`utils/`**: 存放「純粹」的 JavaScript 工具函式。這些函式不依賴 Vue，在任何 JS 環境都能跑。例如：千分位轉換、日期格式化。
- **`types/`**: 全域共用的 TypeScript 型別定義。

### 4. 組件與視圖層 (View Layer)

負責「畫面的呈現與互動」。

- **`components/uiInterface/`**: 基礎原子元件。如按鈕、輸入框、彈窗。它們是「笨元件」，只負責顯示畫面，不應該包含任何 API 請求。
- **`components/uiBusiness/`**: 具備業務邏輯的組件。如：使用者頭像卡片、包含搜尋功能的訂單列表。
- **`layouts/`**: 定義網頁的整體骨架，如是否包含側邊欄、頂部導覽列。
- **`pages/`**: 根據目錄結構自動產生的路由頁面。

### 5. 業務模組層 (Module Layer)

- **`modules/`**: 為了解決專案過大導致的維護困難，我們將相關聯的功能（如「後台管理」）包裝成獨立模組。每個模組可以有自己的獨立頁面、組件與邏輯。

### 6. 測試與模擬層

- **`mock/`**: 當後端還沒開發完成時，我們在這裡寫假資料 (Mock Server)，讓前端開發不被卡住。

### 7. 資源與其他

- **`assets/`**: 存放需要被編譯的資源，如 SCSS/CSS 樣式表、需要經過 Webpack 處理的圖片。
- **`public/`**: 直接對外公開、不需處理的檔案，如 favicon.ico。
- **`i18n/`**: 多語系語系檔，存放中英文對照文字。

---

## 命名規則總結

| 類型                    | 命名方式         | 範例               |
| :---------------------- | :--------------- | :----------------- |
| **頁面**                | kebab-case       | `user-profile.vue` |
| **佈局**                | kebab-case       | `default.vue`      |
| **UI 元件 (Interface)** | I + PascalCase   | `IButton.vue`      |
| **UI 元件 (Business)**  | PascalCase       | `UserCard.vue`     |
| **Composables**         | use + camelCase  | `useAuth.ts`       |
| **Stores**              | camelCase        | `user.ts`          |
| **Repositories**        | camelCase + Repo | `userRepo.ts`      |
| **Utils**               | camelCase        | `formatDate.ts`    |
| **Types/Interfaces**    | PascalCase       | `UserData`         |
| **Enums**               | PascalCase       | `UserRole`         |
| **常數**                | UPPER_SNAKE_CASE | `API_BASE_URL`     |
