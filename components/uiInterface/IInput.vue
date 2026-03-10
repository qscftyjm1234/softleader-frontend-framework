<script setup lang="ts">
import { computed } from 'vue'
import { Input as AInput } from 'ant-design-vue'
import IIcon from './IIcon.vue'

/**
 * Component: IInput (輸入框元件)
 *
 * 介面層 (Interface Layer) 標準元件。
 * 基底更換為 Ant Design Vue (a-input)，遵循輕量、高級的 SaaS 設計規範。
 */

interface Props {
  modelValue?: string | number
  label?: string
  type?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  error?: boolean
  errorMessage?: string
  clearable?: boolean
  maxlength?: number
  autocomplete?: string
  prependIcon?: string
  appendIcon?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  label: undefined,
  type: 'text',
  placeholder: undefined,
  disabled: false,
  readonly: false,
  error: false,
  errorMessage: undefined,
  clearable: false,
  maxlength: undefined,
  autocomplete: 'off',
  prependIcon: undefined,
  appendIcon: undefined
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [value: string | number]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
  clear: []
}>()

const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val!)
    emit('change', val!)
  }
})

const status = computed(() => {
  if (props.error || props.errorMessage) return 'error'
  return ''
})

defineOptions({
  inheritAttrs: false
})
</script>

<template>
  <div class="i-input-container">
    <label
      v-if="label"
      class="text-[0.875rem] font-bold text-slate-700 tracking-tight ml-1 mb-1.5 block"
    >
      {{ label }}
    </label>
    <AInput
      v-model:value="internalValue"
      v-bind="$attrs"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      :allow-clear="clearable"
      :status="status"
      class="i-input-wrapper"
      @blur="emit('blur', $event)"
      @focus="emit('focus', $event)"
    >
      <template
        v-if="prependIcon"
        #prefix
      >
        <IIcon
          :icon="prependIcon"
          class="text-slate-400 mr-1"
        />
      </template>
      <template
        v-if="appendIcon"
        #suffix
      >
        <IIcon
          :icon="appendIcon"
          class="text-slate-400 ml-1"
        />
      </template>
    </AInput>

    <!-- 錯誤訊息 -->
    <div
      v-if="errorMessage"
      class="mt-1.5 ml-1 flex items-center gap-1.5 text-[0.85rem] font-semibold text-red-500"
    >
      <IIcon
        icon="mdi-alert-circle-outline"
        size="16"
      />
      {{ errorMessage }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.i-input-container {
  width: 100%;
}

:deep(.i-input-wrapper) {
  padding: 10px 16px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background-color: white;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    border-color: #cbd5e1;
  }

  &.ant-input-affix-wrapper-focused,
  &:focus-within {
    border-color: #6366f1;
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
  }

  &.ant-input-status-error {
    border-color: #f87171;
    &:focus-within {
      box-shadow: 0 0 0 4px rgba(248, 113, 113, 0.1);
    }
  }

  &.ant-input-disabled {
    background-color: #f8fafc;
    color: #94a3b8;
  }

  .ant-input {
    background: transparent;
    font-size: 0.95rem;
  }
}
</style>
