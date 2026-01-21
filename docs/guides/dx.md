[← 返回文件導覽](../index.md)

# 開發環境設定指南 (Developer Experience Guide)

為了確保團隊開發品質，我們建立了一套標準化的「開發者體驗 (DX)」環境。請依照以下步驟完成設定。

## 1. 安裝必要套件

由於自動安裝過程遇到網路或環境問題，請您**務必手動執行**以下指令來安裝 Code Quality 工具：

```bash
# 1. 安裝 ESLint, Husky, Commitlint
npm install -D @nuxt/eslint eslint husky lint-staged @commitlint/cli @commitlint/config-conventional
```

## 2. 初始化 Git Hooks

安裝完成後，請執行一次 setup 來啟動 Husky：

```bash
# 啟動 git hooks
npm run prepare
```

## 3. 功能介紹

### 3.1 自動排版 (ESLint + Prettier)

- 我們已設定 `eslint.config.mjs` 與 VS Code 設定
- **只要按下存檔 (Ctrl+S)**,程式碼就會自動排版並修復錯誤
- 若要手動全域檢查:`npm run lint`

### 3.2 Git 防呆機制 (Husky)

- **Pre-commit**: 每次 commit 前,會自動檢查有修改的檔案。若有 ESLint 錯誤,會禁止 commit
- **Commit-msg**: 強制檢查 commit 訊息格式
  - ❌ `git commit -m "fix bug"` (錯誤)
  - ✅ `git commit -m "fix(auth): handle login error"` (正確:`type(scope): description`)

### 3.3 VS Code 推薦外掛

請打開 `.vscode/extensions.json` 查看推薦列表,或在擴充功能分頁搜尋 `@recommended`,一鍵安裝所有推薦外掛 (Volar, ESLint, Tailwind 等)。
