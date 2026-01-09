# 開發手冊 (Development Manual)

完整的專案開發指南,包含環境設定、系統套件、命名規範與最佳實踐。

---

## 環境需求 (Environment Requirements)

### 基礎環境 (Runtime)

| 工具        | 版本要求  | 檢查指令         | 下載連結                          |
| :---------- | :-------- | :--------------- | :-------------------------------- |
| **Node.js** | v18.18.0+ | `node --version` | [nodejs.org](https://nodejs.org/) |
| **NPM**     | v9.0.0+   | `npm --version`  | 隨 Node.js 安裝                   |

---

## 系統套件 (System Dependencies)

### 核心與介面 (Framework & UI)

| 套件          | 版本    | 說明                         | 安裝指令                       |
| :------------ | :------ | :--------------------------- | :----------------------------- |
| **nuxt**      | ^3.14.0 | 專案核心框架 (SSR, Route)    | `npm install nuxt@3.14.0`      |
| **vuetify**   | ^3.9.3  | UI 元件庫 (Button, Input...) | `npm install vuetify@3.9.3`    |
| **@mdi/font** | ^7.4.47 | Material Design 圖示集       | `npm install @mdi/font@7.4.47` |

### 邏輯與狀態 (Logic & State)

| 套件             | 版本    | 說明                   | 安裝指令                          |
| :--------------- | :------ | :--------------------- | :-------------------------------- |
| **@pinia/nuxt**  | ^0.11.2 | 全域狀態管理 (Store)   | `npm install @pinia/nuxt@0.11.2`  |
| **@vueuse/nuxt** | ^13.6.0 | Vue 實用工具庫 (Hooks) | `npm install @vueuse/nuxt@13.6.0` |
| **@nuxtjs/i18n** | ^10.0.3 | 多國語系支援           | `npm install @nuxtjs/i18n@10.0.3` |

### 工具函式 (Utilities)

| 套件                 | 版本     | 說明                       | 安裝指令                             |
| :------------------- | :------- | :------------------------- | :----------------------------------- |
| **dayjs**            | ^1.11.13 | 輕量級日期格式化工具       | `npm install dayjs@1.11.13`          |
| **lodash.clonedeep** | ^4.5.0   | 深層複製 (Deep Clone) 工具 | `npm install lodash.clonedeep@4.5.0` |
| **@nuxtjs/device**   | ^3.2.4   | 裝置偵測 (手機/電腦)       | `npm install @nuxtjs/device@3.2.4`   |

### 品質確保 (Code Quality)

| 套件           | 版本    | 說明               | 安裝指令                          |
| :------------- | :------ | :----------------- | :-------------------------------- |
| **typescript** | ^5.9.3  | 強型別語言支援     | `npm install -D typescript@5.9.3` |
| **eslint**     | ^9.39.2 | 程式碼檢查與規範   | `npm install -D eslint@9.39.2`    |
| **prettier**   | ^3.6.2  | 程式碼自動排版工具 | `npm install -D prettier@3.6.2`   |

### Git 工作流 (Workflow)

| 套件                 | 版本    | 說明                      | 安裝指令                                |
| :------------------- | :------ | :------------------------ | :-------------------------------------- |
| **husky**            | ^9.1.7  | Git Hooks (Commit 前檢查) | `npm install -D husky@9.1.7`            |
| **commitizen**       | ^4.3.1  | 協助撰寫標準 Commit 訊息  | `npm install -D commitizen@4.3.1`       |
| **lint-staged**      | ^16.2.7 | 只對暫存區檔案執行檢查    | `npm install -D lint-staged@16.2.7`     |
| **standard-version** | ^9.5.0  | 自動產生版號與 Changelog  | `npm install -D standard-version@9.5.0` |

---

## 把專案跑起來 (Initialization)

### 安裝步驟

**步驟 1: 裝套件**

```bash
npm install
```

**步驟 2: 設定環境變數**

從範例檔複製一份,填入你的設定:

```bash
cp .env.example .env
```

**步驟 3: 啟動!**

```bash
npm run dev
```

### 常用指令

**產生靜態檔案 (上線用)**

```bash
npm run generate
```

**檢查程式碼**

```bash
npm run lint
```

**檢查型別**

```bash
npx nuxi typecheck
```

---

## 命名規範 (Naming Convention)

為了確保程式碼的可讀性與一致性,我們將命名規則嚴格區分為元件、函式與常數三大類。

### 元件命名 - PascalCase

建立 Vue 元件時使用 **PascalCase**:

```
UserCard.vue
NavBar.vue
ProductList.vue
```

### 函式命名 - camelCase

一般函式與變數命名使用 **camelCase**:

```typescript
const getUser = () => {}
let isLoading = true
function handleClick() {}
```

### 常數命名 - UPPER_CASE

固定不變的常數值使用 **UPPER_CASE**:

```typescript
const MAX_COUNT = 10
const API_URL = 'https://api.example.com'
const DEFAULT_TIMEOUT = 5000
```

### 命名規範總結表

| 類型             | 命名方式        | 範例               |
| :--------------- | :-------------- | :----------------- |
| **Vue 元件**     | PascalCase      | `UserCard.vue`     |
| **函式/變數**    | camelCase       | `getUserData()`    |
| **常數**         | UPPER_CASE      | `MAX_COUNT`        |
| **檔案 (pages)** | kebab-case      | `user-profile.vue` |
| **Composables**  | use + camelCase | `useAuth.ts`       |
| **Stores**       | camelCase       | `user.ts`          |

---

## 專案結構 (Project Structure)

### Logic Layer (邏輯層)

| 目錄             | 說明                  |
| :--------------- | :-------------------- |
| **api/**         | API Repository 服務層 |
| **composables/** | 商業邏輯封裝 (Hooks)  |
| **stores/**      | Pinia 全域狀態管理    |

### View Layer (視圖層)

| 目錄            | 說明                          |
| :-------------- | :---------------------------- |
| **pages/**      | 頁面路由 (File-based Routing) |
| **components/** | Vue 共用與業務元件            |
| **layouts/**    | 頁面佈局模板                  |

### Config Layer (配置層)

| 檔案                  | 說明            |
| :-------------------- | :-------------- |
| **nuxt.config.ts**    | Nuxt 核心設定檔 |
| **.env**              | 環境變數設定    |
| **eslint.config.mjs** | ESLint 規則設定 |

---

## 程式碼註解規範 (Code Comments)

**原則:程式碼是給電腦看的,註解是給人看的。**

> 📖 **完整 JSDoc 規範請參考**: [程式碼註解規範 (Comments)](./comments.md)

### ✅ 好的做法 (Do)

- 使用 **JSDoc** 描述 API、函式參數與回傳值 (ESLint 會強制檢查)
- 註解解釋 **"Why"** (為什麼要這樣寫),特別是複雜邏輯或特殊 Workaround
- 針對重大架構變更,使用 `@see` 連結到 Changelog

### JSDoc 必要標籤

所有 exported 函式都必須包含以下標籤:

- `@param` - 參數說明 (必須包含描述)
- `@returns` - 回傳值說明
- `@throws` - 可能拋出的錯誤 (如果有)

### 範例

```typescript
/**
 * 計算用戶稅率
 * @param income - 用戶年收入
 * @returns 稅率 (0-1)
 *
 * @see {@link ../CHANGELOG.md#1.2.0} - v1.2.0 因應 2024 法規調整級距
 */
function calculateTax(income: number): number {
  // 因為舊系統精度問題,這裡必須先轉字串再轉數字
  return Number(String(income)) * 0.05
}
```

### ❌ 壞的做法 (Don't)

- 不要寫修改人與日期 (Git 已經有紀錄了)
- 不要保留被註解掉的舊程式碼 (Dead Code)

```typescript
// ❌ 不要這樣做
// 2024-12-24 Gino: 改成 0.05
// function calculateTax(income) { return income * 0.03 } <-- 刪掉它!
function calculateTax(income: number): number { ... }
```

---

## Commit 規範 (Commit Convention)

為了讓自動化工具運作,我們必須遵守 Commit 規範。

### 使用方式

請使用 `npm run commit` 來提交程式碼,它會引導你完成標準格式。

### Commit 類型

| 類型         | 說明                        | 範例                             |
| :----------- | :-------------------------- | :------------------------------- |
| **feat**     | ✨ 新功能                   | `feat(auth): add login page`     |
| **fix**      | 🐛 錯誤修復                 | `fix(api): handle timeout error` |
| **docs**     | 📝 文件修改                 | `docs: update README`            |
| **style**    | 💄 代碼格式 (不影響邏輯)    | `style: format code`             |
| **refactor** | ♻️ 重構                     | `refactor(user): simplify logic` |
| **perf**     | ⚡️ 效能優化                | `perf(api): cache responses`     |
| **test**     | ✅ 增加測試                 | `test(auth): add unit tests`     |
| **chore**    | 🔧 建置過程或輔助工具的變動 | `chore: update dependencies`     |

### Commit 格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

**範例:**

```
feat(auth): add two-factor authentication

- Implement TOTP-based 2FA
- Add QR code generation
- Update login flow

Closes #123
```

---

## 自動化版本發布 (Release Workflow)

本專案使用 `standard-version` 自動化發布流程。

### 什麼時候執行?

當你完成了幾個功能 (feat) 或修復 (fix),準備發布新版本時。

### 如何執行?

```bash
npm run release
```

### 這個指令會自動做什麼?

1. **升級版本號**:根據你的 Commit 內容,自動判斷是升級大版號、小版號還是修訂號 (Semantic Versioning)
   - `feat` → `1.1.0` (Minor)
   - `fix` → `1.0.1` (Patch)
   - `BREAKING CHANGE` → `2.0.0` (Major)
2. **產生/更新 CHANGELOG.md**:自動抓取 Git Commit,產生繁體中文的修改日誌
3. **建立 Git Tag**:例如 `v1.1.0`

### 執行後該做什麼?

```bash
git push --follow-tags origin main
```

將產生的 Tag 和 Changelog 推送到遠端。

---

## 相關文件

- [開發環境設定指南 (DX Guide)](./dx.md)
- [程式碼註解規範 (Comments)](./comments.md)
- [問題診斷與解決方案 (Troubleshooting)](./troubleshooting.md)
- [資料夾結構與命名規範](../project/folder-structure.md)
- [VS Code ESLint 設定](../tools/vscode-eslint.md)
