<script setup lang="ts">
/**
 * EmailInput - Email 輸入框（業務組件）
 *
 * 用途：封裝 Email 輸入的業務邏輯
 * 特點：
 * - 自動驗證 Email 格式
 * - 自動轉小寫
 * - 提供清除按鈕
 */

import IInput from '@/components/uiInterface/IInput.vue'

interface Props {
  modelValue: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '請輸入 Email',
  disabled: false,
  required: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
}>()

// 業務邏輯：Email 驗證
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const isValid = computed(() => {
  if (!props.modelValue) return !props.required
  return emailRegex.test(props.modelValue)
})

const errorMessage = computed(() => {
  if (!props.modelValue && props.required) {
    return 'Email 必填'
  }
  if (props.modelValue && !isValid.value) {
    return 'Email 格式錯誤'
  }
  return ''
})

// 業務邏輯：自動轉小寫
const handleChange = (value: string | number) => {
  const email = String(value).toLowerCase()
  emit('update:modelValue', email)
  emit('change', email)
}
</script>

<template>
  <IInput
    :model-value="modelValue"
    type="email"
    :placeholder="placeholder"
    :disabled="disabled"
    :error="!isValid"
    :error-message="errorMessage"
    clearable
    prefix-icon="📧"
    autocomplete="email"
    @update:model-value="handleChange"
  />
</template>
