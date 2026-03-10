<!-- Author: antigravity -->

# 第十八課：檔案上傳實戰

本課程教您如何實作檔案上傳功能。我們整合了進階的檔案檢查機制，確保上傳的檔案符合系統規格。

---

## 1. 建立上傳頁面

(1.) 在 `pages/` 資料夾下建立 `upload-demo.vue`。
(2.) 準備好檔案清單的響應式變數。

---

## 2. 引入完整程式碼

這裡展示了如何結合系統內建的 `IUpload` 組件，並加入檔案大小與格式限制的完整實例。

(3.) 貼入以下完整程式碼：

```vue
<template>
  <div class="p-10 min-h-screen bg-slate-50 flex items-center justify-center">
    <div class="max-w-xl w-full bg-white border border-slate-100 p-12 rounded-[3rem] shadow-sm">
      <h1 class="text-3xl font-black text-slate-900 mb-2">文件上傳中心</h1>
      <p class="text-slate-400 mb-10">請選擇要上傳的照片或文件（限 2MB 以內）</p>

      <div class="space-y-8">
        <!-- 檔案上傳組件 -->
        <IUpload
          v-model:file-list="fileList"
          action="/api/upload"
          :before-upload="handleBeforeUpload"
          @change="onUploadChange"
        >
          <div
            class="group cursor-pointer p-10 border-2 border-dashed border-slate-200 rounded-[2rem] hover:border-blue-500 hover:bg-blue-50/30 transition-all text-center"
          >
            <IIcon
              icon="mdi-cloud-upload"
              size="48"
              class="text-slate-300 group-hover:text-blue-500 mb-4 transition-colors"
            />
            <p class="text-sm font-bold text-slate-500 group-hover:text-blue-600 transition-colors">
              點擊或拖入檔案開始上傳
            </p>
          </div>
        </IUpload>

        <!-- 檔案預覽清單 -->
        <div
          v-if="fileList.length > 0"
          class="pt-6 border-t border-slate-100"
        >
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
            目前已選取檔案
          </p>
          <div class="space-y-2">
            <div
              v-for="file in fileList"
              :key="file.uid"
              class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100"
            >
              <div class="flex items-center gap-3">
                <IIcon
                  icon="mdi-file-document-outline"
                  size="20"
                  class="text-slate-400"
                />
                <span class="text-sm font-bold text-slate-700 truncate max-w-[200px]">
                  {{ file.name }}
                </span>
              </div>
              <span
                class="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full"
              >
                等待上傳
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const fileList = ref<any[]>([])

// 引入上傳檢查工具
const { checkFileSize, checkFileType } = useFileUpload()

function handleBeforeUpload(file: File) {
  // 限制檔案大小為 2MB
  if (!checkFileSize(file, 2)) return false

  // 限制檔案格式
  if (!checkFileType(file, ['image/png', 'image/jpeg', 'application/pdf'])) return false

  return true
}

function onUploadChange(info: any) {
  if (info.file.status === 'done') {
    alert(`檔案「${info.file.name}」上傳成功`)
  }
}

definePageMeta({
  title: '檔案上傳範例',
  layout: 'portal'
})
</script>
```

---

## 3. 小結

一
使用 `IUpload` 即可快速建立具備拖曳功能的檔案選取器。
二
`before-upload` 攔截點是用來進行檔案大小與格式檢查的最佳時機。
三
推薦使用系統提供的 `useFileUpload` 工具函式，以確保全站驗證邏輯的一致性。

---

[上一課 第十七課：彈窗管理技巧](./lesson-17.md) | [下一課 第十九課：檔案下載與匯出](./lesson-19.md) | [回首頁](../../README.md)
