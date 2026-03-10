<script setup lang="ts">
import { computed } from 'vue'
import { Select as ASelect } from 'ant-design-vue'

/**
 * UI 適配層 - Select 元件
 * 基底更換為 Ant Design Vue (a-select)
 */

interface SelectOption {
  value: any
  label: string
  disabled?: boolean
}

interface Props {
  modelValue: any
  options: SelectOption[]
  label?: string
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  multiple?: boolean
  searchable?: boolean
  error?: boolean
  errorMessage?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '請選擇',
  disabled: false,
  clearable: false,
  multiple: false,
  searchable: false,
  error: false,
  errorMessage: undefined
})

const emit = defineEmits<{
  'update:modelValue': [value: any]
  change: [value: any]
  search: [query: string]
}>()

// 內部值管理
const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
    emit('change', val)
  }
})

const mode = computed(() => (props.multiple ? 'multiple' : undefined))

const status = computed(() => {
  if (props.error || props.errorMessage) return 'error'
  return ''
})
</script>

<template>
  <div class="i-select-container group">
    <label
      v-if="label"
      class="text-[0.875rem] font-bold text-slate-700 tracking-tight ml-1 mb-1.5 block"
    >
      {{ label }}
    </label>
    <ASelect
      v-model:value="internalValue"
      :options="options"
      :placeholder="placeholder"
      :disabled="disabled"
      :allow-clear="clearable"
      :mode="mode"
      :show-search="searchable"
      :status="status"
      class="i-select-wrapper"
      @search="emit('search', $event)"
    >
      <template
        v-if="!multiple"
        #suffixIcon
      >
        <div class="text-slate-400 group-focus-within:text-indigo-500 transition-colors">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </template>
    </ASelect>

    <!-- 錯誤訊息 -->
    <div
      v-if="errorMessage"
      class="mt-1.5 ml-1 flex items-center gap-1.5 text-[0.85rem] font-semibold text-red-500"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.i-select-container {
  width: 100%;
}

:deep(.i-select-wrapper) {
  width: 100%;

  .ant-select-selector {
    padding: 6px 16px !important;
    height: auto !important;
    min-height: 48px;
    border-radius: 12px !important;
    border: 1px solid #e2e8f0 !important;
    background-color: white !important;
    transition: all 0.3s ease !important;
    display: flex;
    align-items: center;

    &:hover {
      border-color: #cbd5e1 !important;
    }
  }

  &.ant-select-focused .ant-select-selector {
    border-color: #6366f1 !important;
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1) !important;
  }

  &.ant-select-disabled .ant-select-selector {
    background-color: #f8fafc !important;
    color: #94a3b8 !important;
  }

  .ant-select-selection-item,
  .ant-select-selection-placeholder {
    font-weight: 500;
    line-height: normal !important;
  }
}
</style>
