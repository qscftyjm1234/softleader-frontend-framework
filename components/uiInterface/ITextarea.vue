<script setup lang="ts">
import { computed } from 'vue'
import { Textarea as ATextarea } from 'ant-design-vue'

/**
 * ITextarea - 多行文字輸入介面層
 * 基底更換為 Ant Design Vue (a-textarea)
 */

interface Props {
  modelValue: string
  label?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  rows?: number
  maxlength?: number
  autoResize?: boolean
  // 驗證相關
  error?: boolean
  errorMessage?: string
  // 字數統計
  showCount?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  disabled: false,
  readonly: false,
  rows: 4,
  maxlength: undefined,
  autoResize: false,
  error: false,
  errorMessage: '',
  showCount: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
    emit('change', val)
  }
})

const status = computed(() => {
  if (props.error || props.errorMessage) return 'error'
  return ''
})

const autoSize = computed(() => {
  if (props.autoResize) return { minRows: props.rows }
  return false
})
</script>

<template>
  <div class="i-textarea-container">
    <label
      v-if="label"
      class="text-[0.875rem] font-bold text-slate-700 tracking-tight ml-1 mb-1.5 block"
    >
      {{ label }}
    </label>
    <ATextarea
      v-model:value="internalValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :rows="rows"
      :maxlength="maxlength"
      :show-count="showCount"
      :status="status"
      :auto-size="autoSize"
      class="i-textarea-wrapper"
      @blur="emit('blur', $event)"
      @focus="emit('focus', $event)"
    />

    <!-- 錯誤訊息 -->
    <div
      v-if="errorMessage"
      class="mt-1.5 ml-1 text-[0.85rem] font-semibold text-red-500"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.i-textarea-container {
  width: 100%;
}

:deep(.i-textarea-wrapper) {
  // Ant Design 啟用 show-count 時會包一層 .ant-input-textarea-show-count
  // 需要同時處理有無 show-count 的情況

  // 直接是 textarea 的情況
  &.ant-input {
    padding: 12px 16px;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    background-color: white;
    transition: all 0.3s ease;
    font-weight: 500;
    font-size: 0.95rem;
    color: #1e293b;
    resize: vertical;
  }

  // 有 show-count 外層容器的情況
  &.ant-input-textarea-show-count {
    .ant-input {
      padding: 12px 16px;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      background-color: white;
      transition: all 0.3s ease;
      font-weight: 500;
      font-size: 0.95rem;
      color: #1e293b;
      resize: vertical;

      &:hover {
        border-color: #cbd5e1;
      }

      &:focus {
        border-color: #6366f1;
        box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
      }
    }

    &.ant-input-textarea-in-form-item .ant-input-data-count,
    .ant-input-data-count {
      font-size: 0.75rem;
      font-weight: 600;
      color: #94a3b8;
      margin-top: 4px;
    }
  }

  &::placeholder,
  .ant-input::placeholder {
    color: #94a3b8;
    font-weight: 400;
  }

  &:hover {
    border-color: #cbd5e1;
  }

  &.ant-input-focused,
  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
  }

  &.ant-input-status-error,
  &.ant-input-status-error .ant-input {
    border-color: #f87171;
    &:focus,
    &.ant-input-focused {
      box-shadow: 0 0 0 4px rgba(248, 113, 113, 0.1);
    }
  }

  &.ant-input-disabled,
  &.ant-input-disabled .ant-input {
    background-color: #f8fafc;
    color: #94a3b8;
    cursor: not-allowed;
  }
}
</style>
