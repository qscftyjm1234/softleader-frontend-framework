# 疑難排解：`__VUE_HMR_RUNTIME__ is not defined`

這個文件記錄了在 Nuxt 3 / Vue 3 開發環境中常見的 HMR (Hot Module Replacement) 錯誤及其解決方法。

## 問題描述

在瀏覽器控制台或頁面載入時出現以下錯誤：
`ReferenceError: __VUE_HMR_RUNTIME__ is not defined`

這會導致頁面無法顯示或開發期間的熱更新 (HMR) 失效。

## 核心原因

1.  **快取衝突**：`.nuxt` 或 `.output` 目錄中的舊檔案與新產生的 HMR 腳本不一致。
2.  **多進程衝突**：背景有殘留的 Node 進程佔用了 HMR 端口，導致狀態錯亂。
3.  **依賴版本不一致**：專案中存在多個版本的 `vue`（通常是某些插件帶來的子依賴引發的）。

## 解決步驟（由淺入深）

### 1. 執行清理腳本 (推薦)

我們已在 `package.json` 中加入了清理自訂指令。請優先執行：

```bash
npm run clean
```

這會自動刪除 `.nuxt` 目錄。執行後請重啟伺服器。

### 2. 手動深度清理

如果 `npm run clean` 無效，請手動刪除以下目錄：

- `.nuxt/`
- `.output/`
- `node_modules/.cache/`

### 3. 結束背景進程

確保沒有多個開發伺服器同時在運行。您可以關閉所有控制台，或在 PowerShell 執行：

```powershell
stop-process -name node -force
```

### 4. 重新安裝依賴 (終極方案)

如果懷疑是 `vue` 版本衝突，請執行：

```bash
npm run reinstall
```

這會完整刪除 `node_modules` 並按照 `package-lock.json` 重新安裝。

## 預防措施

- **保持乾淨的開發環境**：切換 Git 分支後，建議執行一次 `npm run clean`。
- **單一執行環境**：避免同時打開多個編輯器窗口運行同一個專案。
