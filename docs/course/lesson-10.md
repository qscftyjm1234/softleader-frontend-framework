<!-- Author: cindy -->

# 第十課：UI 資安防護機制

本課程介紹如何啟用前端 UI 防護機制，保護系統資料與使用者隱私。

## 1. 全域資安防護模式 (Security Mode)

專案提供了一套開箱即用的防護模組，只需在 `.env` 檔案中開啟開關即可啟用：

```ini
# 啟用全域資安防護 (預設為 false)
NUXT_PUBLIC_ENABLE_SECURITY_MODE=true
```

### 防護功能說明

當 `SECURITY_MODE` 啟用時，系統會自動在全域執行以下行為：

1.  **防截圖與防錄影 (Anti-Screenshot)**
    - 當使用者按下 `PrintScreen` 鍵或使用特定錄影軟體偵測時，畫面會出現短暫模糊，防止敏感報表被截錄。

2.  **閒置模糊 (Idle Blur)**
    - 當使用者超過一段時間（預設 5 分鐘）沒有滑動滑鼠或操作鍵盤，系統會自動模糊畫面。
    - 用途：防止員工暫時離開座位時，路過的人看到敏感的客戶保單資料。

3.  **禁用開發者工具 (Disable DevTools)**
    - 阻擋 F12、`Ctrl+Shift+I` (Windows) 或 `Cmd+Option+I` (Mac)。
    - 用途：防止非開發人員嘗試透過 Console 竄改資料或查看 API 請求。

4.  **禁用右鍵與複製 (Disable Context Menu)**
    - 禁止右鍵選單與 `Ctrl+C` 複製行為。
    - 用途：防止使用者輕易複製公司內部文案、費率表或客戶電話。

---

## 2. 數位浮水印 (Watermark)

浮水印是保護資料不被「手機翻拍」的核心手段。

### 使用方式

在 `app.vue` 或 Layout 中使用 `useWatermark` 即可在畫面上層壓上資訊。

```vue
<script setup lang="ts">
const { showWatermark } = useWatermark()
const quoteStore = useQuotationStore() // 沿用第八課範例

onMounted(() => {
  // 顯示當前操作人的浮水印
  showWatermark({
    text: `經辦人員：${quoteStore.policyHolder.name || '訪客'}`,
    color: 'rgba(0, 0, 0, 0.05)' // 極淡的顏色
  })
})
</script>
```

---

## 3. 小結

1.  **一鍵啟用**：修改 `.env` 中的 `NUXT_PUBLIC_ENABLE_SECURITY_MODE`。
2.  **核心功能**：防截圖、閒置自動模糊、阻擋 F12。
3.  **手機翻拍對策**：使用 `showWatermark` 追蹤洩密來源。

---

[上一課：Git 提交與工作流](./lesson-9.md) | [下一課：環境變數設定](./lesson-11.md) | [回首頁](../../README.md)
