[← 返回文件導覽](../index.md)

# 資料夾結構與命名規範

## 資料夾結構概覽

### 1. **pages/** - 頁面路由

**核心職責**: Nuxt 自動根據目錄結構產生路由。

**目錄結構示範**:

- `pages/index.vue` -> 首頁 (/)
- `pages/about.vue` -> 關於頁面 (/about)
- `pages/users/index.vue` -> 使用者列表 (/users)
- `pages/users/[id].vue` -> 動態路由 (/users/123)
- `pages/users/create.vue` -> 表單頁面 (/users/create)
- `pages/[...all].vue` -> 404 頁面

**命名規則**:

- 使用 **kebab-case** (小寫+連字號)。
- 動態路由使用 `[id].vue`, `[slug].vue`。
- Catch-all 路由使用 `[...all].vue`。
- 禁止使用 PascalCase (`UserList.vue`) 或 camelCase (`userList.vue`)。

---

### 2. **layouts/** - 頁面佈局

**核心職責**: 定義頁面的公共外框 (header, footer, sidebar)。

**目錄結構示範**:

- `layouts/default.vue` -> 預設佈局
- `layouts/portal.vue` -> Portal 佈局 (含側邊欄)
- `layouts/auth.vue` -> 登入頁面佈局 (無 header/footer)

**命名規則**:

- 使用 **kebab-case**。
- 命名應簡潔明瞭，描述佈局用途。

---

### 3. **components/** - UI 元件

**核心職責**: 封裝可重複使用的 Vue 元件。

**目錄結構示範**:

- **uiInterface/**: 基礎 UI 元件 (無業務邏輯)。
  - `IButton.vue` -> 按鈕
  - `ICard.vue` -> 卡片
  - `IInput.vue` -> 輸入框
  - `IModal.vue` -> 彈窗
- **uiBusiness/**: 具備業務邏輯的 UI 元件。
  - `UserCard.vue` -> 使用者資訊卡片
  - `ProductList.vue` -> 產品列表
  - `OrderTable.vue` -> 訂單表格
- **business/**: 業務邏輯封裝組件。
  - `GlobalSnackbar.vue` -> 全域通知
  - `ErrorBoundary.vue` -> 錯誤處理

**命名規則**:

- **uiInterface/**: 使用 `I` 前綴 + PascalCase (如 `IButton.vue`)。
- **uiBusiness/**: 使用 PascalCase。
- **business/**: 使用 PascalCase。

---

### 4. **composables/** - 組合式函式

**核心職責**: 封裝商業邏輯 (Vue Composition API)。

**目錄結構示範**:

- `composables/useAuth.ts` -> 認證邏輯
- `composables/useApi.ts` -> API 呼叫
- `composables/useValidation.ts` -> 驗證邏輯
- `composables/useFileUpload.ts` -> 檔案上傳
- `composables/useLocalStorage.ts` -> LocalStorage 封裝

**命名規則**:

- 必須以 `use` 開頭。
- 使用 **camelCase**。

---

### 5. **stores/** - 狀態管理

**核心職責**: Pinia 全域狀態管理。

**目錄結構示範**:

- `stores/user.ts` -> 使用者狀態
- `stores/cart.ts` -> 購物車狀態
- `stores/auth.ts` -> 認證狀態
- `stores/ui.ts` -> UI 狀態

**命名規則**:

- 使用 **camelCase**。
- Store ID 應使用具體名稱。

---

### 6. **core/** - 核心功能

**核心職責**: 專案的核心邏輯封裝，與具體業務無關。

**目錄結構示範**:

- `core/api/client.ts` -> API 客戶端
- `core/api/interceptors.ts` -> 攔截器
- `core/errors/handler.ts` -> 錯誤處理
- `core/constants/api.ts` -> API 定數

**命名規則**:

- 使用 **camelCase**。

---

### 7. **repositories/** - 資料層

**核心職責**: API 呼叫的統一封裝 (Repository Pattern)。

**目錄結構示範**:

- `repositories/userRepo.ts` -> 使用者 API
- `repositories/orderRepo.ts` -> 訂單 API
- `repositories/productRepo.ts` -> 產品 API

**命名規則**:

- 使用 **camelCase** + `Repo` 後綴。

---

### 8. **modules/** - 功能模組

**核心職責**: 將相關聯的功能集結成模組。

**命名規則**:

- 內部文件夾使用 **kebab-case**。
- 模組內部結構應自成體系。

---

### 9. **utils/** - 工具函式

**核心職責**: 純粹的功能函式，不依賴於 Vue。

**命名規則**:

- 使用 **camelCase**。
- 使用分類目錄管理。

---

### 10. **types/** - 型別定義

**核心職責**: TypeScript 型別定義。

**命名規則**:

- Interface/Type: 使用 **PascalCase**。
- Enum: 使用 **PascalCase**。

---

### 11. **mock/** - 模擬數據

**核心職責**: 分離開發中的測試數據。

---

### 12. **plugins/** - Nuxt 插件

**核心職責**: Nuxt 插件 (Vuetify, i18n 等)。

---

### 13. **middleware/** - 路由守衛

**核心職責**: 路由切換時的邏輯處理。

---

### 14. **assets/** - 靜態資源

**核心職責**: CSS、圖片、字體等。

---

### 15. **public/** - 不變資源

**核心職責**: 不需要經過 Webpack 處理的文件。

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
