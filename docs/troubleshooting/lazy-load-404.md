# 解決 Lazy Load 導致的 404 問題

在 Nuxt 3 專案中，由於使用了 **Lazy Loading（隨選下載）**，上版更新時經常會遇到使用者「換頁 404」的問題。以下是解決方案：

## 1. 基礎原理

- **原因**：使用者瀏覽器紀錄的是舊版的 JS 檔名（含舊 Hash），但部署時若將伺服器檔案清空，舊檔消失，使用者換頁就會抓不到檔案而噴 404。

## 2. CI/CD 端的應對策略 (必做)

在執行資源上傳或同步時，應採用 **「增量更新 (Incremental Update)」**，保留舊版本的檔案至少一段時間。

**範例 (以 S3 為例)：**

```bash
# ❌ 錯誤：加上 --delete 會砍掉舊檔案，導致舊使用者 404
aws s3 sync ./dist s3://my-bucket --delete

# ✅ 正確：不加 --delete，保留舊 Hash 檔案
aws s3 sync ./dist s3://my-bucket
```

- **建議**：定期（例如每週）才執行一次清理過期（例如 7 天前）的靜態資源。

## 3. 前端插件補強策略

建議在專案中加入錯誤攔截插件，當偵測到 Chunk 載入失敗時，強制瀏覽器重新整理 (Reload)。

**檔案位置：`plugins/error-handler.client.ts`**

````typescript
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:chunkError', () => {
    // 偵測到版本更新導致的 404，強制刷新抓取新版索引
    window.location.reload()
  })
})
```

## 4. 替代方案：關閉 Lazy Loading (如果不使用 CI/CD)

如果你無法控制部署流程（例如無法保留舊檔案），且專案規模不大，可以考慮 **「關閉 Code Splitting」**。

將所有頁面與程式碼打包成單一檔案 (或極少數檔案)，讓使用者在第一次進入網站時就下載所有內容。這樣換頁時就不會再發送請求，自然也不會 404。

**缺點**：
- 首屏載入時間變長 (Initial Load Time 增加)。
- 失去隨選下載的效能優勢。

**實作方式 (`nuxt.config.ts`)**：

```typescript
export default defineNuxtConfig({
  vite: {
    build: {
      rollupOptions: {
        output: {
          // 強制將所有 chunk 合併為一個
          manualChunks: (id) => {
            // 將 node_modules 打包成 vendor
            if (id.includes('node_modules')) {
              return 'vendor'
            }
            // 其餘 (包含 pages) 全部打包成 app
            return 'app'
          }
        }
      }
    }
  }
})
````
