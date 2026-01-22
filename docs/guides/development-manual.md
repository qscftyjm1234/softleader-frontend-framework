[返回文件導覽](../index.md)

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

### 邏輯層

| 目錄             | 說明                  |
| :--------------- | :-------------------- |
| **api/**         | API Repository 服務層 |
| **composables/** | 商業邏輯封裝 (Hooks)  |
| **stores/**      | Pinia 全域狀態管理    |

### 視圖層

| 目錄            | 說明                          |
| :-------------- | :---------------------------- |
| **pages/**      | 頁面路由 (File-based Routing) |
| **components/** | Vue 共用與業務元件            |
| **layouts/**    | 頁面佈局模板                  |

### 配置層

| 檔案                  | 說明            |
| :-------------------- | :-------------- |
| **nuxt.config.ts**    | Nuxt 核心設定檔 |
| **.env**              | 環境變數設定    |
| **eslint.config.mjs** | ESLint 規則設定 |

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
