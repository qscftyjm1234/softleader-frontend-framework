<script setup lang="ts">
import { computed, watch, onBeforeUnmount } from 'vue'
import { Alert as AAlert } from 'ant-design-vue'
import IIcon from './IIcon.vue'

/**
 * ISnackbar - 介面層
 * 基底更換為 Ant Design Vue 基礎樣式
 */

interface Props {
  modelValue: boolean
  message: string
  color?: 'success' | 'error' | 'warning' | 'info' | string
  timeout?: number
}

const props = withDefaults(defineProps<Props>(), {
  color: 'success',
  timeout: 3000
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

let timer: any = null

watch(
  () => props.modelValue,
  (val) => {
    if (val && props.timeout > 0) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        emit('update:modelValue', false)
      }, props.timeout)
    }
  }
)

onBeforeUnmount(() => {
  clearTimeout(timer)
})

const antdType = computed(() => {
  if (props.color === 'error') return 'error'
  if (props.color === 'warning') return 'warning'
  if (props.color === 'success') return 'success'
  return 'info'
})

const defaultIcon = computed(() => {
  switch (props.color) {
    case 'success':
      return 'mdi-check-circle'
    case 'error':
      return 'mdi-alert-circle'
    case 'warning':
      return 'mdi-alert'
    case 'info':
      return 'mdi-information'
    default:
      return 'mdi-information'
  }
})
</script>

<template>
  <Teleport to="body">
    <div class="fixed bottom-8 right-8 z-[9999] pointer-events-none">
      <Transition name="snackbar-slide">
        <div
          v-if="modelValue"
          class="pointer-events-auto"
        >
          <AAlert
            :type="antdType"
            show-icon
            class="i-snackbar-wrapper shadow-2xl shadow-slate-900/10"
          >
            <template #icon>
              <IIcon
                :icon="defaultIcon"
                size="20"
              />
            </template>
            <template #message>
              <div class="flex items-center justify-between w-full pr-2">
                <span class="font-bold text-[0.95rem] tracking-tight">{{ message }}</span>
                <button
                  class="ml-4 text-slate-400 hover:text-slate-600 transition-colors"
                  @click="emit('update:modelValue', false)"
                >
                  <IIcon
                    icon="mdi-close"
                    size="18"
                  />
                </button>
              </div>
            </template>
          </AAlert>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.i-snackbar-wrapper {
  min-width: 320px;
  max-width: 420px;
  padding: 16px 20px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(16px);

  :deep(.ant-alert-message) {
    margin-bottom: 0;
    width: 100%;
  }
}

.snackbar-slide-enter-active,
.snackbar-slide-leave-active {
  transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
}

.snackbar-slide-enter-from,
.snackbar-slide-leave-to {
  transform: translateX(100%) scale(0.9);
  opacity: 0;
  filter: blur(8px);
}
</style>
