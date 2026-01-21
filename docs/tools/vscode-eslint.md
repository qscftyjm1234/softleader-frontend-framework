[← 返回文件導覽](../index.md)

# VS Code ESLint 設定說明 (VS Code ESLint Configuration)

## 問題排查

如果 ESLint 錯誤沒有在 VSCode 中顯示，請依序檢查：

### 1. 確認 ESLint 擴充套件已安裝

在 VSCode 中按 `Ctrl+Shift+X` 搜尋並安裝：

- **ESLint** (dbaeumer.vscode-eslint)

### 2. 重新載入 VSCode

安裝擴充套件後，按 `Ctrl+Shift+P` 輸入 `Reload Window` 重新載入。

### 3. 檢查 ESLint 輸出

1. 按 `Ctrl+Shift+U` 開啟輸出面板
2. 在右上角下拉選單選擇 `ESLint`
3. 查看是否有錯誤訊息

### 4. 手動啟用 ESLint

按 `Ctrl+Shift+P` 輸入 `ESLint: Restart ESLint Server`

### 5. 檢查檔案是否在工作區內

ESLint 只會檢查工作區內的檔案，確認你的專案資料夾已在 VSCode 中開啟。

### 6. 檢查 ESLint 設定檔

確認專案根目錄有 `eslint.config.mjs` 檔案。

## 常見問題

### Q: 為什麼儲存時沒有自動修復？

A: 確認 `.vscode/settings.json` 中有：

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

### Q: 為什麼 Vue 檔案沒有 ESLint 提示？

A: 確認 `eslint.validate` 包含 `"vue"`：

```json
{
  "eslint.validate": ["javascript", "typescript", "vue"]
}
```

### Q: 如何查看 ESLint 是否正常運作？

A: 在終端機執行：

```bash
npx eslint your-file.js
```

如果終端機有顯示錯誤，但 VSCode 沒有，代表是 VSCode 設定問題。
