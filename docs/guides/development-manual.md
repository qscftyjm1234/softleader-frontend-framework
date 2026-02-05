[← 返回 README.md](../../README.md)

# 開發手冊

完整的專案開發指南,包含環境設定、系統套件、命名規範與最佳實踐。

---

## 環境需求

### 基礎環境

| 工具        | 版本要求  | 檢查指令         | 下載連結                          |
| :---------- | :-------- | :--------------- | :-------------------------------- |
| **Node.js** | v18.18.0+ | `node --version` | [nodejs.org](https://nodejs.org/) |
| **NPM**     | v9.0.0+   | `npm --version`  | 隨 Node.js 安裝                   |

---

## 系統套件

> **詳細套件清單與版本**：請參閱 **[套件清單](./package-guide.md)**
>
> 該文件包含了生產環境與開發環境的所有依賴套件說明、版本資訊與安裝指令。

---

## 把專案跑起來

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

**步驟 3: 啟動**

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

## 命名規範

本專案採用嚴格的命名規範，由 ESLint 自動檢查。

> **完整命名規範請參考**: [ESLint 開發規範](./eslint-rules.md)

### 快速參考

| 類型             | 命名方式         | 範例                         |
| :--------------- | :--------------- | :--------------------------- |
| **Vue 元件**     | PascalCase       | `UserCard.vue`               |
| **函式/變數**    | camelCase        | `getUserData()`              |
| **布林值**       | camelCase + 前綴 | `isLoading`, `hasPermission` |
| **常數**         | UPPER_CASE       | `MAX_COUNT`                  |
| **檔案 (pages)** | kebab-case       | `user-profile.vue`           |
| **Composables**  | use + camelCase  | `useAuth.ts`                 |
| **Stores**       | camelCase        | `user.ts`                    |

**重要**: 函式必須以動詞開頭 (get, set, handle, create 等)，布林值必須以 is/has/should 等開頭。詳見 [ESLint 規範文件](./eslint-rules.md)。

---

## 專案結構

本專案採用 **Layered Architecture (分層架構)** 與 **Module-based (模組化)** 設計，確保各組件責任分明。

### 目錄樹狀圖 (完整版)

```text
root/
├── core/                # 核心配置：基礎建設、全域設定、API 客戶端
├── repositories/        # 資料存取：專門處理 API 請求 (Repository Pattern)
├── stores/              # 狀態管理：Pinia 全域資料存儲
├── api/                 # 介面定義：API 資料結構與介面 (Interface)
├── composables/         # 邏輯掛鉤：可重用的 Vue Composition API
├── utils/               # 工具函式：純 JS 邏輯 (如日期格式化、計算)
├── types/               # 型別定義：全域 TypeScript 型別與介面
├── components/          # 元件庫：UI 元件 (分為基礎介面與業務元件)
├── pages/               # 路由頁面：定義各個網址路徑的畫面
├── layouts/             # 佈局範本：頁面的共同外框 (如 Header/Sidebar)
├── modules/             # 業務模組：獨立的大型功能區塊
├── i18n/                # 多語系：管理各國語言的翻譯文字檔
├── assets/              # 靜態資源：CSS 樣式表、圖片、字體檔
├── plugins/             # 插件：註冊第三方工具 (如 UI 框架、i18n)
├── router/              # 路由強化：動態路由掃描與配置
├── mock/                # 模擬數據：開發環境用的假 API 數據
├── server/              # 後端邏輯：Nuxt Server Engine (Nitro) 相關
├── scripts/             # 工具腳本：負責自動化建置與載入任務
├── configs/             # 規範配置：ESLint、Commitlint 等工具設定
└── public/              # 原始靜態檔：直接對外公開的資源 (如 favicon)
```

### 各層級「在幹嘛」詳細介紹

#### 1. 核心層 (Core Module)

這是專案的「大腦」。我們把複雜的 `nuxt.config.ts` 拆解到 `core/config/`，讓設定檔更易於維護。

- **`core/api/`**: 負責處理所有的 API 請求攔截。例如：在請求標頭加上 Token，或在報錯時跳出通知。

#### 2. 資料與 API 層 (Data Layer)

負責「拿資料」與「存資料」。我們嚴格禁止在頁面中直接寫 API URL。

- **`repositories/`**: 這裡是唯一可以發送 API 請求的地方。頁面只需要呼叫 Repo 的方法，不需要管後端網址是什麼，方便以後修改或更換 API。
- **`stores/`**: 當資料需要「跨頁面」共享時（例如：用戶登入資訊、目前的權限），就放在這裡。
- **`api/`**: 定義資料的「規格」。讓 TypeScript 幫你檢查 API 回來的數據有沒有少欄位。

#### 3. 邏輯與工具層 (Logic Layer)

負責「處理資料」。

- **`composables/`**: 存放會用到 Vue 功能 (如響應式屬性 `ref`) 的邏輯。例如：一個會自動倒數的計時器。
- **`utils/`**: 存放「純粹」的 JS 函式。例如：把數字轉換成千分位格式。這些函式在任何環境都能跑，不依賴 Vue。
- **`types/`**: 確保型別安全的重要宣告檔。

#### 4. 視圖與佈局層 (View Layer)

負責「畫出畫面」。

- **`components/uiInterface/`**: 最基礎的按鈕、輸入框。它們很單純，不知道什麼是後端 API。
- **`components/uiBusiness/`**: 比較複雜的元件，例如：訂單查詢列表、使用者頭像卡片。
- **`layouts/`**: 控制頁面的整體外框。有些頁面可能需要全螢幕，有些要側邊選單，都在這裡控制。

#### 5. 業務模組層 (Module Layer)

當專案規模變大時，我們會把「一整套完整功能」包進 `modules/`。

- **`modules/`**: 每個模組都可以有自己的頁面和元件。系統會動態合併這些模組到主程式中。

#### 6. 支援與配置層

- **`i18n/`**: 網站上的所有中英文文字都寫在這裡。
- **`assets/`**: 專案的視覺效果中心，包含樣式檔與圖檔。
- **`mock/`**: 當後端同事還沒寫好 API 時，我們在這裡寫假資料，讓前端開發不被中斷。

> **更詳盡的目錄說明與命名規範請參考**: [資料夾結構與命名規範文件](../project/folder-structure.md)

---

## 程式碼註解規範

**原則:程式碼是給電腦看的,註解是給人看的。**

> **完整 JSDoc 規範請參考**: [程式碼註解規範](./comments.md)

### 好的做法

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

### 壞的做法

- 不要寫修改人與日期 (Git 已經有紀錄了)
- 不要保留被註解掉的舊程式碼 (Dead Code)

```typescript
// ❌ 不要這樣做
// 2024-12-24 Gino: 改成 0.05
// function calculateTax(income) { return income * 0.03 } <-- 刪掉它!
function calculateTax(income: number): number { ... }
```

---

## Commit 規範

為了讓自動化工具運作,我們必須遵守 Commit 規範。

### 使用方式

請使用 `npm run commit` 來提交程式碼,它會引導你完成標準格式。

### Commit 類型

| 類型         | 說明                     | 範例                             |
| :----------- | :----------------------- | :------------------------------- |
| **feat**     | 新功能                   | `feat(auth): add login page`     |
| **fix**      | 錯誤修復                 | `fix(api): handle timeout error` |
| **docs**     | 文件修改                 | `docs: update README`            |
| **style**    | 代碼格式 (不影響邏輯)    | `style: format code`             |
| **refactor** | 重構                     | `refactor(user): simplify logic` |
| **perf**     | 效能優化                 | `perf(api): cache responses`     |
| **test**     | 增加測試                 | `test(auth): add unit tests`     |
| **chore**    | 建置過程或輔助工具的變動 | `chore: update dependencies`     |

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

## 相關文件

- [開發環境設定指南](./dx.md)
- [程式碼註解規範](./comments.md)
- [問題診斷與解決方案](./troubleshooting.md)
- [資料夾結構與命名規範](../project/folder-structure.md)
- [VS Code ESLint 設定](../tools/vscode-eslint.md)
