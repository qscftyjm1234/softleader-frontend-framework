<!-- Author: cindy -->

# 第二十課:檔案下載與匯出

本課程教您如何處理後端回傳的檔案流 (Blob) 並觸發下載。

## 1. 下載 Blob

當後端回傳檔案流時 (如 PDF, Excel)。

### 工具函式

使用專案提供的 `downloadFile` (或類似 Utils)。

```typescript
export function downloadFile(data: Blob, filename: string) {
  const url = window.URL.createObjectURL(data)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  window.URL.revokeObjectURL(url)
}
```

### 呼叫方式

```vue
<script setup lang="ts">
const { report } = useRepository()

async function handleExport() {
  const data = await report.exportExcel()
  // 假設 data 是 Blob
  downloadFile(data, 'report.xlsx')
}
</script>

<template>
  <IButton @click="handleExport">匯出報表</IButton>
</template>
```

---

## 2. 小結

1. **API**: 回傳 Blob
2. **Utils**: `downloadFile` 觸發瀏覽器下載
3. **格式**: 注意副檔名 (xlsx, pdf, csv)

---

[上一課:選項數據管理](./lesson-19.md) | [回首頁](../../README.md)
