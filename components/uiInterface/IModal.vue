<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Modal as AModal } from 'ant-design-vue'
import IButton from './IButton.vue'

/**
 * IModal - 介面層
 * 基底更換為 Ant Design Vue (a-modal)
 */

interface Props {
  open: boolean
  title?: string
  content?: string
  confirmText?: string
  cancelText?: string
  showCancel?: boolean
  closeOnMask?: boolean
  persistent?: boolean
  maxWidth?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  content: '',
  confirmText: '確認',
  cancelText: '取消',
  showCancel: true,
  closeOnMask: true,
  persistent: false,
  maxWidth: 500
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  ok: []
  cancel: []
}>()

const internalVisible = ref(props.open)
const internalConfig = ref<Partial<Props>>({})
let resolvePromise: ((value: boolean) => void) | null = null

watch(
  () => props.open,
  (val) => {
    internalVisible.value = val
  }
)

const handleUpdate = (val: boolean) => {
  internalVisible.value = val
  emit('update:open', val)

  if (!val && resolvePromise) {
    resolvePromise(false)
    resolvePromise = null
  }
}

const finalConfig = computed(() => ({
  title: internalConfig.value.title ?? props.title,
  content: internalConfig.value.content ?? props.content,
  confirmText: internalConfig.value.confirmText ?? props.confirmText,
  cancelText: internalConfig.value.cancelText ?? props.cancelText,
  showCancel: internalConfig.value.showCancel ?? props.showCancel,
  closeOnMask: internalConfig.value.closeOnMask ?? props.closeOnMask,
  persistent: internalConfig.value.persistent ?? props.persistent,
  maxWidth: internalConfig.value.maxWidth ?? props.maxWidth
}))

const handleConfirm = () => {
  if (resolvePromise) {
    resolvePromise(true)
    resolvePromise = null
    internalVisible.value = false
    emit('update:open', false)
  } else {
    emit('ok')
  }
}

const handleCancel = () => {
  internalVisible.value = false
  emit('update:open', false)

  if (resolvePromise) {
    resolvePromise(false)
    resolvePromise = null
  } else {
    emit('cancel')
  }
}

const showModal = (config?: Partial<Props>) => {
  internalConfig.value = config || {}
  internalVisible.value = true
  if (resolvePromise) resolvePromise(false)

  return new Promise<boolean>((resolve) => {
    resolvePromise = resolve
  })
}

const confirm = (config?: Partial<Props>) =>
  showModal({
    showCancel: true,
    confirmText: '確認',
    cancelText: '取消',
    ...config
  })

const alert = (config?: Partial<Props>) =>
  showModal({
    showCancel: false,
    confirmText: '確認',
    ...config
  }).then(() => {})

defineExpose({
  show: showModal,
  open: showModal,
  confirm,
  alert
})
</script>

<template>
  <AModal
    v-model:open="internalVisible"
    :title="null"
    :footer="null"
    :closable="false"
    :mask-closable="finalConfig.closeOnMask && !finalConfig.persistent"
    :width="finalConfig.maxWidth"
    centered
    wrap-class-name="i-modal-wrapper"
    @update:open="handleUpdate"
  >
    <div class="i-modal-content">
      <!-- 標題 -->
      <div
        v-if="finalConfig.title"
        class="px-8 pt-8 pb-4"
      >
        <h2 class="text-2xl font-black text-slate-900 tracking-tight">
          {{ finalConfig.title }}
        </h2>
      </div>

      <!-- 內容 -->
      <div
        v-if="finalConfig.content"
        class="px-8 text-[1rem] text-slate-500 leading-relaxed font-medium"
        :class="{ 'pt-10': !finalConfig.title }"
      >
        {{ finalConfig.content }}
      </div>

      <!-- 插槽內容 -->
      <div
        v-if="$slots.default"
        class="px-8 py-4"
      >
        <slot />
      </div>

      <!-- 按鈕區 -->
      <div
        class="px-8 py-6 flex items-center justify-end gap-3 bg-slate-50/50 mt-4 rounded-b-[24px]"
      >
        <IButton
          v-if="finalConfig.showCancel"
          variant="text"
          class="!text-slate-500"
          @click="handleCancel"
        >
          {{ finalConfig.cancelText }}
        </IButton>

        <IButton
          variant="primary"
          class="min-w-[100px]"
          @click="handleConfirm"
        >
          {{ finalConfig.confirmText }}
        </IButton>
      </div>
    </div>
  </AModal>
</template>

<style lang="scss">
.i-modal-wrapper {
  .ant-modal-content {
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    padding: 0;
  }
}
</style>
