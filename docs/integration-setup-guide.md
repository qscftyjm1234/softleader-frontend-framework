# Vue + TypeScript + Prettier + ESLint 整合配置指南

## 📋 概述

本專案已完成 Vue、TypeScript、Prettier 和 ESLint 的完整整合配置，確保代碼品質和一致性。

## ✅ 已配置的工具

### 1. **Prettier** - 代碼格式化

- 配置檔：`.prettierrc.json`
- 忽略檔：`.prettierignore`
- 自動格式化：儲存時自動執行

### 2. **ESLint** - 代碼檢查

- 配置檔：`eslint.config.mjs`
- 整合：Nuxt 官方 `@nuxt/eslint`
- 規則：JSDoc、Vue、TypeScript

### 3. **TypeScript** - 類型檢查

- 由 Nuxt 自動配置
- 支援 `.vue` 檔案中的 TypeScript

### 4. **Vue** - 框架支援

- Vue 3 + Composition API
- 完整的 ESLint 規則支援

---

## 🚀 快速開始

### 步驟 1: 安裝必要套件

由於 npm 安裝遇到問題，請手動安裝以下套件：

```bash
# 清除 npm 快取
npm cache clean --force

# 刪除 node_modules 和 package-lock.json
Remove-Item -Recurse -Force node_modules, package-lock.json

# 重新安裝所有套件
npm install

# 安裝 Prettier 整合套件
npm install -D eslint-plugin-prettier eslint-config-prettier
```

### 步驟 2: 啟用 Prettier 整合

安裝完成後，編輯 `eslint.config.mjs`：

1. **取消註解 Prettier 插件**（第 48 行）：

```javascript
plugins: {
  jsdoc,
  prettier: (await import('eslint-plugin-prettier')).default // ✅ 取消註解
}
```

2. **取消註解 Prettier 規則**（第 37-43 行）：

```javascript
'prettier/prettier': [
  'error',
  {},
  {
    usePrettierrc: true
  }
]
```

3. **取消註解 Prettier 配置**（最後一行）：

```javascript
.append((await import('eslint-config-prettier')).default)
```

### 步驟 3: 重新載入 VS Code ESLint 伺服器

1. 按 `Ctrl+Shift+P` 打開命令面板
2. 輸入 "ESLint: Restart ESLint Server"
3. 選擇並執行

---

## 🔧 配置說明

### Prettier 配置 (`.prettierrc.json`)

```json
{
  "semi": false, // 不使用分號
  "singleQuote": true, // 使用單引號
  "trailingComma": "none", // 不使用尾隨逗號
  "endOfLine": "auto", // 自動偵測行尾
  "printWidth": 100, // 行寬限制 100 字元
  "tabWidth": 2, // 縮排 2 空格
  "useTabs": false, // 使用空格而非 Tab
  "arrowParens": "always", // 箭頭函式總是使用括號
  "bracketSpacing": true, // 物件括號內加空格
  "vueIndentScriptAndStyle": false // Vue 檔案不縮排 script 和 style
}
```

### ESLint 配置重點

#### JSDoc 規則（強制）

- 所有導出的函式必須有 JSDoc 註解
- 必須包含參數描述
- 必須包含返回值描述

#### Vue 規則

- 允許單字組件名稱
- 允許多根節點（Vue 3）
- 關閉 `v-slot` 驗證（Vuetify 相容性）

#### TypeScript 規則

- 由 `@nuxt/eslint` 自動配置
- 支援 `.vue` 檔案中的 TypeScript

---

## 🧪 測試驗證

### 1. 測試檔案

打開 `docs/integration-test.vue` 查看各種測試案例：

- ✅ 格式化問題（Prettier）
- ✅ JSDoc 缺失（ESLint）
- ✅ 未使用變數（ESLint）
- ✅ TypeScript 類型（TypeScript）
- ✅ Vue 規則（ESLint）

### 2. 命令列測試

```bash
# ESLint 檢查
npx eslint docs/integration-test.vue

# Prettier 檢查
npx prettier --check docs/integration-test.vue

# Prettier 自動修復
npx prettier --write docs/integration-test.vue

# ESLint 自動修復
npx eslint docs/integration-test.vue --fix

# TypeScript 類型檢查
npx nuxi typecheck
```

### 3. VS Code 視覺驗證

1. 打開 `docs/integration-test.vue`
2. 應該看到：
   - 🔴 紅色波浪線：ESLint 錯誤
   - 🟡 黃色波浪線：ESLint 警告
3. 按 `Shift+Alt+F` 測試自動格式化
4. 儲存檔案測試自動修復

---

## 📝 VS Code 設定說明

### 自動格式化

- **儲存時格式化**：`editor.formatOnSave: true`
- **儲存時 ESLint 修復**：`source.fixAll.eslint: "explicit"`

### 預設格式化工具

- JavaScript: Prettier
- TypeScript: Prettier
- Vue: Prettier
- JSON: Prettier
- Markdown: Prettier

### ESLint 設定

- **即時檢查**：`eslint.run: "onType"`
- **啟用 Lint 任務**：`eslint.lintTask.enable: true`
- **支援檔案類型**：JavaScript, TypeScript, Vue

---

## 🐛 常見問題

### Q1: ESLint 沒有顯示錯誤？

**解決方案：**

1. 確認已安裝 ESLint 擴充套件
2. 重新載入 ESLint 伺服器（`Ctrl+Shift+P` → "ESLint: Restart ESLint Server"）
3. 檢查輸出面板（`Ctrl+Shift+U` → 選擇 "ESLint"）

### Q2: Prettier 沒有自動格式化？

**解決方案：**

1. 確認已安裝 Prettier 擴充套件
2. 檢查 VS Code 設定中的 `editor.defaultFormatter`
3. 確認 `.prettierrc.json` 存在

### Q3: npm 安裝失敗？

**解決方案：**

```bash
# 清除快取
npm cache clean --force

# 刪除 node_modules
Remove-Item -Recurse -Force node_modules

# 刪除 package-lock.json
Remove-Item -Force package-lock.json

# 重新安裝
npm install
```

### Q4: TypeScript 類型錯誤沒有顯示？

**解決方案：**

1. 執行 `npx nuxi typecheck` 查看類型錯誤
2. 確認已安裝 Vue Language Features (Volar) 擴充套件
3. 重新載入 VS Code

---

## 📚 推薦的 VS Code 擴充套件

以下擴充套件已在 `.vscode/extensions.json` 中推薦：

- ✅ **Vue.volar** - Vue 3 語言支援
- ✅ **dbaeumer.vscode-eslint** - ESLint 整合
- ✅ **esbenp.prettier-vscode** - Prettier 格式化
- ✅ **aaron-bond.better-comments** - 增強註解顯示
- ✅ **wayou.vscode-todo-highlight** - TODO 高亮
- ✅ **streetsidesoftware.code-spell-checker** - 拼字檢查

---

## 🎯 下一步

1. ✅ 安裝 `eslint-plugin-prettier` 和 `eslint-config-prettier`
2. ✅ 啟用 `eslint.config.mjs` 中的 Prettier 整合
3. ✅ 重新載入 ESLint 伺服器
4. ✅ 測試 `docs/integration-test.vue`
5. ✅ 開始享受自動格式化和錯誤檢查！

---

## 💡 提示

- 使用 `npm run lint` 檢查整個專案
- 使用 `npm run format:write` 格式化整個專案
- 在 commit 前，Husky 會自動執行 lint 檢查
- 善用 VS Code 的問題面板（`Ctrl+Shift+M`）查看所有錯誤
