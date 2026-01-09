# Git 工作流配置說明 (Git Workflow Configuration)

本專案使用一套完整的 Git 工作流配置,確保 Commit 訊息的一致性與自動化版本管理。

---

## 配置檔案總覽

所有 Git 相關配置檔案位於 [`configs/git/`](file:///c:/Users/gino.huang/Documents/nuxt3-test/configs/git) 目錄:

| 檔案                                                                                                          | 用途                       | 相依套件          |
| :------------------------------------------------------------------------------------------------------------ | :------------------------- | :---------------- |
| [`commit-types.cjs`](file:///c:/Users/gino.huang/Documents/nuxt3-test/configs/git/commit-types.cjs)           | Commit 類型定義 (單一來源) | -                 |
| [`commitlint.config.cjs`](file:///c:/Users/gino.huang/Documents/nuxt3-test/configs/git/commitlint.config.cjs) | Commit 訊息檢查規則        | `@commitlint/cli` |
| [`cz-config.cjs`](file:///c:/Users/gino.huang/Documents/nuxt3-test/configs/git/cz-config.cjs)                 | Commitizen 互動式介面配置  | `commitizen`      |

### 配置檔案架構說明

#### Commitlint 雙層結構

專案採用**入口檔案 + 實際配置**的雙層結構:

```
根目錄/
├── commitlint.config.cjs          ← 入口檔案 (6 行)
└── configs/git/
    └── commitlint.config.cjs      ← 實際配置 (82 行)
```

**為什麼這樣設計?**

1. **工具要求**: `commitlint` 必須在根目錄找到配置檔案
2. **集中管理**: 所有 Git 相關配置統一放在 `configs/git/` 目錄
3. **保持整潔**: 根目錄只保留入口檔案,避免配置檔案過多

**工作原理:**

根目錄的 [`commitlint.config.cjs`](file:///c:/Users/gino.huang/Documents/nuxt3-test/commitlint.config.cjs) 內容:

```javascript
/**
 * Commitlint 設定入口
 * 引用 configs/git/commitlint.config.cjs 中的實際設定
 */
module.exports = require('./configs/git/commitlint.config.cjs')
```

**要修改規則時:**

👉 修改 [`configs/git/commitlint.config.cjs`](file:///c:/Users/gino.huang/Documents/nuxt3-test/configs/git/commitlint.config.cjs) - 這裡才是真正的配置內容

---

## 1. commit-types.cjs - Commit 類型定義

**檔案路徑**: [`configs/git/commit-types.cjs`](file:///c:/Users/gino.huang/Documents/nuxt3-test/configs/git/commit-types.cjs)

### 用途

作為 `commitlint` 和 `commitizen` 的**單一來源 (Single Source of Truth)**,定義所有允許的 Commit 類型。

### 定義的 Commit 類型

| 類型         | 說明                        | 範例                             |
| :----------- | :-------------------------- | :------------------------------- |
| **feat**     | 新功能                      | `feat(auth): add login page`     |
| **fix**      | 修補 bug                    | `fix(api): handle timeout error` |
| **docs**     | 文件修改                    | `docs: update README`            |
| **style**    | 格式調整 (不影響程式碼運行) | `style: format code`             |
| **refactor** | 重構                        | `refactor(user): simplify logic` |
| **perf**     | 效能改進                    | `perf(api): cache responses`     |
| **test**     | 測試相關                    | `test(auth): add unit tests`     |
| **chore**    | 雜務 (不修改 src 或 test)   | `chore: update dependencies`     |
| **revert**   | 回退版本                    | `revert: undo previous commit`   |

### 長度限制

```javascript
maxHeaderLength: 72 // Commit 標題最大長度
maxLineLength: 100 // Commit 內文每行最大長度
```

---

## 2. commitlint.config.cjs - Commit 訊息檢查

**檔案路徑**: [`configs/git/commitlint.config.cjs`](file:///c:/Users/gino.huang/Documents/nuxt3-test/configs/git/commitlint.config.cjs)

### 用途

配置 `commitlint` 的檢查規則,確保所有 Commit 訊息符合規範。

### 主要規則

#### Type (類型) 規則

- `type-enum`: 必須是 `commit-types.cjs` 中定義的類型之一
- `type-case`: 必須是小寫 (lower-case)
- `type-empty`: 不能為空

#### Scope (範圍) 規則

- `scope-case`: 必須是小寫
- `scope-empty`: 允許為空 (可選)

#### Subject (主旨) 規則

- `subject-empty`: 不能為空
- `subject-full-stop`: 結尾不要有句號
- `header-max-length`: 最大 72 字元

#### Body & Footer 規則

- `body-leading-blank`: Header 與 Body 之間要有空行
- `body-max-line-length`: 每行最大 100 字元
- `footer-leading-blank`: Body 與 Footer 之間要有空行

### Commit 訊息格式

```
<type>(<scope>): <subject>
                              ← 空行
<body>
                              ← 空行
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

### 相關檔案

- 配置檔: [`configs/git/commitlint.config.cjs`](file:///c:/Users/gino.huang/Documents/nuxt3-test/configs/git/commitlint.config.cjs)
- 類型定義: [`configs/git/commit-types.cjs`](file:///c:/Users/gino.huang/Documents/nuxt3-test/configs/git/commit-types.cjs)
- Package: [`package.json`](file:///c:/Users/gino.huang/Documents/nuxt3-test/package.json) (devDependencies: `@commitlint/cli`, `@commitlint/config-conventional`)

---

## 3. cz-config.cjs - Commitizen 配置

**檔案路徑**: [`configs/git/cz-config.cjs`](file:///c:/Users/gino.huang/Documents/nuxt3-test/configs/git/cz-config.cjs)

### 用途

配置 `commitizen` 的互動式介面,引導開發者撰寫符合規範的 Commit 訊息。

### 使用方式

```bash
npm run commit
```

### 互動流程

1. **選擇提交類型** - 從 `commit-types.cjs` 定義的類型中選擇
2. **輸入影響範圍** - 可選,例如: `auth`, `api`, `ui`
3. **簡短描述** - Commit 主旨,最多 72 字元
4. **確認提交** - 確認後執行 `git commit`

### 配置選項

```javascript
{
  types: [...],                    // 從 commit-types.cjs 引入
  scopes: [],                      // 允許自訂範圍
  allowCustomScopes: true,         // 允許自訂範圍
  allowBreakingChanges: ['feat', 'fix'],  // 允許 Breaking Changes 的類型
  skipQuestions: ['body', 'breaking', 'footer'],  // 跳過的問題
  subjectLimit: 72                 // 主旨最大長度
}
```

### 相關檔案

- 配置檔: [`configs/git/cz-config.cjs`](file:///c:/Users/gino.huang/Documents/nuxt3-test/configs/git/cz-config.cjs)
- 類型定義: [`configs/git/commit-types.cjs`](file:///c:/Users/gino.huang/Documents/nuxt3-test/configs/git/commit-types.cjs)
- Package: [`package.json`](file:///c:/Users/gino.huang/Documents/nuxt3-test/package.json) (devDependencies: `commitizen`, `cz-customizable`)

---

## 完整工作流程

### 1. 開發階段

```bash
# 正常開發
git add .

# 使用 Commitizen 撰寫 Commit 訊息
npm run commit
```

### 2. Commit 檢查

當執行 `git commit` 時,會自動觸發:

1. **Husky Pre-commit Hook** - 執行 `lint-staged` 檢查程式碼
2. **Husky Commit-msg Hook** - 執行 `commitlint` 檢查 Commit 訊息

### 3. 版本發布

```bash
# 自動升級版本並產生 Changelog
npm run release

# 推送到遠端 (包含 Tag)
git push --follow-tags origin main
```

---

## 相關套件

### 已安裝的 NPM 套件

在 [`package.json`](file:///c:/Users/gino.huang/Documents/nuxt3-test/package.json) 的 `devDependencies`:

```json
{
  "@commitlint/cli": "^19.6.1",
  "@commitlint/config-conventional": "^19.6.0",
  "commitizen": "^4.3.1",
  "cz-customizable": "^7.2.1",
  "husky": "^9.1.7",
  "lint-staged": "^16.2.7",
  "standard-version": "^9.5.0"
}
```

### 套件說明

| 套件                              | 用途                          |
| :-------------------------------- | :---------------------------- |
| `@commitlint/cli`                 | Commit 訊息檢查工具           |
| `@commitlint/config-conventional` | Conventional Commits 規範     |
| `commitizen`                      | 互動式 Commit 訊息撰寫工具    |
| `cz-customizable`                 | Commitizen 自訂配置支援       |
| `husky`                           | Git Hooks 管理工具            |
| `lint-staged`                     | 只對暫存區檔案執行檢查        |
| `standard-version`                | 自動版本管理與 Changelog 產生 |

---

## 配置檔案關聯圖

```
configs/git/commit-types.cjs (單一來源)
    ├── commitlint.config.cjs (引入 types, maxHeaderLength)
    └── cz-config.cjs (引入 types, maxHeaderLength)

configs/git/versionrc.json
    └── standard-version (讀取配置)

package.json
    ├── scripts.commit → commitizen
    ├── scripts.release → standard-version
    └── config.commitizen.path → cz-config.cjs
```

---

## 相關文件

- [開發規範 (Development)](../guides/development.md) - Commit 規範說明
- [開發手冊 (Development Manual)](../guides/development-manual.md) - Commit 類型與格式
- [DX 指南 (Developer Experience)](../guides/dx.md) - Git Hooks 設定
