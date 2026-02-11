<!-- Author: antigravity -->

# 第二十一課：常見問題排解 (Troubleshooting)

本課程收集了專案開發與部署過程中常見的高頻問題及其解決方案。

## 1. 部署後換頁噴 404 (Chunk Load Error)

### 問題描述

專案在正式環境（Production/Staging）上板後，原本開著網頁的使用者在「不重新整理」的情況下點擊選單換頁，畫面突然卡住，打開控制台（Console）看到 `Failed to load resource: the server responded with a status of 404`，或是報錯 `ChunkLoadError`。但在本地開發環境卻完全無法重現。

### 發生原因：Lazy Load 與檔案雜湊的時差

1.  **隨選下載 (Lazy Loading)**：Nuxt 為了效能，預設不會一次下載所有頁面代碼。當使用者點擊 `/about` 時，瀏覽器才動態去伺服器抓 `about.[hash].js`。
2.  **檔案更名 (Hashing)**：每次重新 Build 時，檔案內容變動會產生新的雜湊名稱（例如 `about.a1b2.js` 變為 `about.x9y8.js`）。
3.  **時差風險**：
    - 使用者目前開的是**舊版**網頁，記憶體裡紀錄的檔案名稱是 `about.a1b2.js`。
    - 您剛好完成了**部署**，伺服器上的舊檔案已被刪除或替換。
    - 使用者點擊換頁，瀏覽器去伺服器抓 `a1b2`，但伺服器只剩下 `x9y8`，因此噴出 **404**。

### 解決方案

#### A. 前端自動重載 (最推薦)

偵測到 Chunk 載入失敗時，強制瀏覽器重新整理，讓它抓取最新的 Manifest 與檔案路徑。

建立 `plugins/error-handler.client.ts`：

```typescript
export default defineNuxtPlugin((nuxtApp) => {
  // 偵測 Chunk 或路由載入錯誤
  nuxtApp.hook('app:chunkError', () => {
    // 發現版本不一致導致載入失敗，強制刷新頁面
    window.location.reload()
  })
})
```

#### B. 伺服器端增量部署 (Incremental Deploy)

調整 CI/CD 流程：

- 部署時**不要清空**伺服器的靜態資源目錄。
- 採用「增量更新 (Incremental Update)」，保留舊版本的網頁檔案。
- **範例指令 (AWS S3)**：

  ```bash
  # ❌ 錯誤：--delete 會刪除伺服器上的舊 Hash 檔案
  aws s3 sync ./dist s3://my-bucket --delete

  # ✅ 正確：保留舊檔案，讓舊使用者的瀏覽器還能抓到對應的 JS
  aws s3 sync ./dist s3://my-bucket
  ```

- 這樣舊使用者在切換時，伺服器依然能提供舊版本的代碼，避免 404。

---

## 2. 小結

1.  **Lazy Load** 讓換頁變成高度依賴「伺服器檔案存在性」的行為。
2.  **404 錯誤** 通常是由於客戶端小本本（Manifest）紀錄的名字與伺服器實際檔名產生衝突。
3.  使用 `app:chunkError` Hook 是最直接的前端保險做法。

---

[上一課：全域錯誤處理](./lesson-20.md) | [回首頁](../../README.md)
