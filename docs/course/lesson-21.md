<!-- Author: antigravity -->

# 第二十一課：常見問題排解

本課程收集了開發過程中高頻發生的問題及其解決方案。特別是針對正式環境部署後，使用者可能遇到的換頁錯誤進行預防性處理。

---

## 1. 解決換頁 404 錯誤

當系統更新後，舊使用者若不重新整理網頁直接換頁，可能會因為檔案雜湊（Hash）變更而找不到資源。

(1.) 在 `plugins/` 資料夾下建立 `error-handler.client.ts`。
(2.) 準備好全域錯誤攔截邏輯。

---

## 3. 引入完整程式碼

這裡展示了如何偵測載入失敗（Chunk Load Error）並自動強制頁面重洗的完整實作。

(3.) 貼入以下完整程式碼：

```typescript
/**
 * 用於處理模組隨選載入失敗的全域插件
 */
export default defineNuxtPlugin((nuxtApp) => {
  // 監聽 Nuxt 核心拋出的檔案載入錯誤
  nuxtApp.hook('app:chunkError', () => {
    console.error('偵測到頁面模組版本不符，正在自動重新整理以取得最新資源')

    // 強制瀏覽器重新讀取伺服器上的最新 Manifest
    window.location.reload()
  })
})
```

---

## 4. 小結

一
網頁部署後的雜湊時差是導致 404 錯誤的主因。
二
透過 `app:chunkError` 勾子可以主動偵測這類問題並進行無感復原。
三
在正式環境中，建議始終保留至少一個舊版本的檔案紀錄，以提升系統的容錯能力。

---

```vue
<script setup lang="ts">
definePageMeta({
  title: '資料列表範例',
  layout: 'portal'
})
</script>
```

---

[上一課 第二十課：UI 資安防護實戰](./lesson-20.md) | [下一課 第二十二課：Git 提交與工作流](./lesson-22.md) | [回首頁](../../README.md)
