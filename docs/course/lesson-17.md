# 第十七課：彈窗管理技巧

本課程介紹如何更有系統地管理彈窗（Modal）。當頁面功能變多時，將彈窗拆分為獨立組件能有效保持程式碼的整潔與可維護性。

---

## 1. 建立獨立彈窗組件

當彈窗內的邏輯較為複雜時，建議將其獨立出來成為一個檔案。

(1.) 在 `components/business/` 資料夾下建立 `UserEditModal.vue`。
(2.) 準備好要接收的參數與開關邏輯。

---

## 3. 引入完整程式碼

這裡展示了如何使用 `defineModel` 輕鬆控制彈窗的顯示與隱藏。

(3.) 貼入以下完整程式碼：

```vue
<!-- components/business/UserEditModal.vue -->
<template>
  <IModal
    v-model:open="isOpen"
    title="編輯成員資訊"
    @ok="handleSave"
    class="rounded-[2rem]"
  >
    <div class="p-4 space-y-4">
      <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100">
        <p class="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">正在編輯</p>
        <p class="text-lg font-bold text-slate-900">{{ userName }}</p>
      </div>

      <IInput
        v-model="email"
        placeholder="重設電子郵件"
      />
    </div>
  </IModal>
</template>

<script setup lang="ts">
const props = defineProps<{
  userName: string
}>()

// 使用 Vue 3.4 推薦的雙向綁定方式
const isOpen = defineModel<boolean>('open')
const email = ref('')

function handleSave() {
  console.log('正在儲存目標：', props.userName, email.value)
  alert('儲存成功')
  isOpen.value = false
}
</script>
```

---

## 4. 在頁面中引用

(1.) 開啟您的頁面檔案。
(2.) 引入剛才建立的組件並配置控制狀態。

```vue
<template>
  <div class="p-10">
    <IButton
      @click="editModal.open = true"
      variant="primary"
    >
      開啟編輯彈窗
    </IButton>

    <!-- 引用獨立出來的彈窗組件 -->
    <UserEditModal
      v-model:open="editModal.open"
      :user-name="'王小明'"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: '彈窗',
  layout: 'portal'
})

const editModal = reactive({
  open: false
})
</script>
```

---

## 5. 小結

一
只要彈窗內容超過二十行，就強烈建議拆成獨立組件。
二
子組件使用 `defineModel` 即可直接與父層同步顯示狀態。
三
這樣做可以讓父層頁面保持乾淨，專注於主要的商務邏輯。

---

[上一課 第十六課：複雜對話框處理](./lesson-16.md) | [下一課 第十八課：檔案上傳實戰](./lesson-18.md) | [回首頁](../../README.md)
