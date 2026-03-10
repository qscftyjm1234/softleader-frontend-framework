<!-- Author: antigravity -->

# 第十九課：檔案下載與匯出

本課程教您如何處理後端回傳的檔案流（Blob）並觸發瀏覽器的下載行為。這在匯出 Excel 報表或下載 PDF 合約時非常實用。

---

## 1. 準備下載工具函式

由於下載檔案涉及瀏覽器的網址物件操作，我們建議將其封裝為工具函式。

(1.) 在 `utils/` 資料夾下建立 `file.ts`（如果已存在則直接修改）。
(2.) 準備好處理 Blob 的下載邏輯。

---

## 3. 引入完整程式碼

這裡展示了如何接收後端資料並將其轉換為可供下載的連結，以及如何在頁面中觸發這個動作。

(3.) 貼入以下完整程式碼：

```typescript
// utils/file.ts
/**
 * 觸發瀏覽器下載檔案
 * @param data 檔案二進位資料 (Blob)
 * @param filename 存檔名稱（含副檔名）
 */
export function downloadFile(data: Blob, filename: string) {
  // 建立指向該 Blob 的暫時性網址
  const url = window.URL.createObjectURL(data)
  const link = document.createElement('a')
  link.href = url
  link.download = filename

  // 模擬點擊並移除暫時網址
  link.click()
  window.URL.revokeObjectURL(url)
}
```

---

## 4. 在頁面中實作匯出按鈕

(1.) 開啟您的頁面檔案。
(2.) 呼叫資料倉庫取得 Blob 資料，並傳入下載工具。

```vue
<template>
  <div class="p-10">
    <IButton
      @click="handleExport"
      icon="mdi-file-excel"
      variant="primary"
    >
      匯出報表下載
    </IButton>
  </div>
</template>

<script setup lang="ts">
import { downloadFile } from '~/utils/file'

async function handleExport() {
  // 模擬從 API 取得 Excel 的 Blob 資料
  const mockBlob = new Blob([''], { type: 'application/vnd.ms-excel' })

  // 觸發下載
  downloadFile(mockBlob, '年度業績報告.xlsx')
}
</script>
```

---

## 5. 小結

一
後端匯出介面通常會回傳 `Blob` 格式的二進位內容。
二
透過 `URL.createObjectURL` 可以建立一個臨時網址供瀏覽器進行下載。
三
記得在下載完成後使用 `revokeObjectURL` 釋放記憶體資源，以免造成效能負擔。

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

[上一課 第十八課：檔案上傳實戰](./lesson-18.md) | [下一課 第二十課：UI 資安防護實戰](./lesson-20.md) | [回首頁](../../README.md)
