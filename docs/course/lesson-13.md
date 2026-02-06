<!-- Author: cindy -->

# 第十三課:複雜對話框處理

本課程教您如何使用 `IModal` 顯示對話框，以及使用確認視窗。

## 1. 什麼時候使用 IModal?

當您需要顯示自訂內容、表單，或是較複雜的資訊時，使用 `IModal`。

### 基本用法

```vue
<script setup lang="ts">
const visible = ref(false)

function openModal() {
  visible.value = true
}

function handleOk() {
  // 處理確認邏輯
  visible.value = false
}
</script>

<template>
  <IButton @click="openModal">開啟設定</IButton>

  <IModal
    v-model:open="visible"
    title="系統設定"
    width="600px"
    @ok="handleOk"
  >
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <span>啟用通知</span>
        <ASwitch />
      </div>
      <div class="flex items-center justify-between">
        <span>深色模式</span>
        <ASwitch />
      </div>
    </div>
  </IModal>
</template>
```

---

## 2. 什麼時候使用 Modal.confirm?

當您只需要一個簡單的「確認」動作 (例如刪除前詢問)，不需要寫模板 HTML 時。

### 使用方法

```typescript
import { Modal } from 'ant-design-vue'

function handleDelete() {
  Modal.confirm({
    title: '確定要刪除嗎?',
    content: '此動作無法復原，請謹慎操作。',
    okText: '刪除',
    okType: 'danger',
    cancelText: '取消',
    async onOk() {
      // 支援 Promise，會自動顯示 loading
      await api.deleteUser(currentId)
      message.success('刪除成功')
    }
  })
}
```

---

## 3. 小結

| 功能       | IModal 組件       | Modal.confirm 函式 |
| :--------- | :---------------- | :----------------- |
| **用途**   | 複雜內容、表單    | 簡單確認、警告     |
| **寫法**   | 寫在 `<template>` | 寫在 `<script>`    |
| **自訂性** | 高 (Slot)         | 低 (文字為主)      |

---

[上一課:進階表單處理](./lesson-12.md) | [下一課:彈窗管理技巧](./lesson-14.md) | [回首頁](../../README.md)
