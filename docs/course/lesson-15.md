<!-- Author: cindy -->

# 第十五課:檔案上傳實戰

本課程教您如何使用 `IUpload` 組件進行檔案上傳。

## 1. 使用 IUpload

本專案封裝了 `<IUpload>`，簡化了上傳流程。

### 基本用法

```vue
<script setup lang="ts">
const fileList = ref([])

function handleChange(info: any) {
  if (info.file.status === 'done') {
    message.success(`${info.file.name} 上傳成功`)
  } else if (info.file.status === 'error') {
    message.error(`${info.file.name} 上傳失敗`)
  }
}
</script>

<template>
  <IUpload
    v-model:file-list="fileList"
    action="/api/upload"
    @change="handleChange"
  >
    <IButton icon="upload">上傳檔案</IButton>
  </IUpload>
</template>
```

---

## 2. 使用 useFileUpload

如果您需要更細緻的控制 (例如檢查檔案大小、類型)，可以使用 `useFileUpload`。

```typescript
const { checkFileSize, checkFileType } = useFileUpload()

function beforeUpload(file: File) {
  // 檢查大小 (限制 2MB)
  if (!checkFileSize(file, 2)) return false

  // 檢查類型 (限制圖片)
  if (!checkFileType(file, ['image/png', 'image/jpeg'])) return false

  return true
}
```

---

## 3. 小結

1. **組件**: `<IUpload>`
2. **驗證**: `useFileUpload`
3. **狀態**: 監聽 `@change`

---

[上一課:彈窗管理技巧](./lesson-14.md) | [下一課:資料格式化工具](./lesson-16.md) | [回首頁](../../README.md)
