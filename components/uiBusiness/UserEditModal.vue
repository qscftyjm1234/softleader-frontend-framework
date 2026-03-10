<!-- components/business/UserEditModal.vue -->
<template>
  <IModal
    v-model:open="isOpen"
    title="編輯成員資訊"
    class="rounded-[2rem]"
    @ok="handleSave"
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
  isOpen:{{ isOpen }}
</template>

<script setup lang="ts">
const props = defineProps<{
  userName: string
}>()

// 使用 Vue 3.4 推薦的雙向綁定方式
const isOpen = defineModel<boolean>('open')
const email = ref('')

/**
 *
 */
function handleSave() {
  console.log('正在儲存目標：', props.userName, email.value)
  alert('儲存成功')
  isOpen.value = false
}
</script>
