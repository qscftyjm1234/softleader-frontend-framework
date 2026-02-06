<!-- Author: cindy -->

# 第十四課:彈窗管理技巧

本課程介紹如何更有系統地管理彈窗 (Modal)，避免程式碼變成「義大利麵」。

## 1. 為什麼需要管理? (Lesson 13 vs Lesson 14)

在 Lesson 13 中，我們直接在頁面裡寫 `<IModal>`。這在簡單頁面沒問題，但當一個頁面有「新增」、「編輯」、「檢視詳情」、「權限設定」四個彈窗時...

❌ **不好的寫法 (全部塞在同一頁)**:

```vue
<template>
  <div>
    <!-- 頁面內容 -->

    <!-- 四個 Modal 把頁面塞爆了 -->
    <IModal v-model:open="showCreate">...</IModal>
    <IModal v-model:open="showEdit">...</IModal>
    <IModal v-model:open="showDetail">...</IModal>
    <IModal v-model:open="showPermission">...</IModal>
  </div>
</template>
```

---

## 2. 解決方案: 拆分組件 (Component Split)

將每個 Modal 拆分成獨立的 `.vue` 檔案。

### 步驟 1: 建立獨立組件 (components/user/UserEditModal.vue)

```vue
<script setup lang="ts">
const props = defineProps<{
  userId: number
}>()

// 雙向綁定 open 狀態
const open = defineModel<boolean>('open')

const emit = defineEmits(['success'])

async function handleOk() {
  // 處理儲存
  await api.updateUser(props.userId, formState)
  emit('success') // 通知父層重新整理
  open.value = false // 關閉自己
}
</script>

<template>
  <IModal
    v-model:open="open"
    title="編輯使用者"
    @ok="handleOk"
  >
    <!-- 複雜的表單內容放這裡 -->
  </IModal>
</template>
```

### 步驟 2: 父層引用

頁面變得很乾淨，只剩下邏輯控制。

```vue
<script setup lang="ts">
// 狀態
const editModal = reactive({
  open: false,
  userId: 0
})

// 開啟
function openEdit(id: number) {
  editModal.userId = id
  editModal.open = true
}

// 成功回調
function onEditSuccess() {
  refreshTable() // 重整表格
}
</script>

<template>
  <!-- 頁面按鈕 -->
  <IButton @click="openEdit(1)">編輯</IButton>

  <!-- 乾淨的 Modal 引用 -->
  <UserEditModal
    v-model:open="editModal.open"
    :user-id="editModal.userId"
    @success="onEditSuccess"
  />
</template>
```

---

## 3. 使用 defineModel (Vue 3.4+)

Vue 3.4 之後推薦使用 `defineModel` 來簡化 Modal 的開關控制。

```typescript
// 子組件
const open = defineModel<boolean>('open')
```

```vue
// 父組件
<MyModal v-model:open="isVisible" />
```

不用再手寫 `props.open` 和 `emit('update:open')` 了！

---

## 4. 小結

1. **Lesson 13** 教的是 **「怎麼用 Modal」**。
2. **Lesson 14** 教的是 **「怎麼管理 Modal」** (架構面)。
3. **原則**: 只要 Modal 內容超過 20 行，就建議拆成獨立組件。

---

[上一課:複雜對話框處理](./lesson-13.md) | [下一課:檔案上傳實戰](./lesson-15.md) | [回首頁](../../README.md)
