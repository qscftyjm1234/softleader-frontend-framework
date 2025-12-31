<script setup lang="ts">
/**
 * PhoneInput - 電話號碼輸入（業務元件）
 *
 * 用途：封裝電話號碼輸入的業務邏輯
 * 特點：
 * - 自動格式化電話號碼
 * - 驗證台灣手機號碼格式
 * - 自動移除非數字字元
 */

import IInput from '@/components/uiInterface/IInput.vue'

interface Props {
  modelValue: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  countryCode?: string // 國碼，預設台灣
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '請輸入手機號碼',
  disabled: false,
  required: false,
  countryCode: '+886'
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
}>()

// 業務邏輯：台灣手機號碼驗證 (09xx-xxx-xxx)
const phoneRegex = /^09\d{8}$/
const isValid = computed(() => {
  if (!props.modelValue) return !props.required
  // 移除所有非數字字元後驗證
  const cleanPhone = props.modelValue.replace(/\D/g, '')
  return phoneRegex.test(cleanPhone)
})

const errorMessage = computed(() => {
  if (!props.modelValue && props.required) {
    return '手機號碼必填'
  }
  if (props.modelValue && !isValid.value) {
    return '請輸入正確的手機號碼格式 (09xx-xxx-xxx)'
  }
  return ''
})

// 業務邏輯：格式化電話號碼 (0912-345-678)
const formatPhone = (value: string): string => {
  const cleaned = value.replace(/\D/g, '')

  if (cleaned.length <= 4) {
    return cleaned
  } else if (cleaned.length <= 7) {
    return `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`
  } else {
    return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 7)}-${cleaned.slice(7, 10)}`
  }
}

// 處理輸入變更
const handleChange = (value: string | number) => {
  const formatted = formatPhone(String(value))
  emit('update:modelValue', formatted)
  emit('change', formatted)
}
</script>

<template>
  <IInput
    :model-value="modelValue"
    type="tel"
    :placeholder="placeholder"
    :disabled="disabled"
    :error="!isValid"
    :error-message="errorMessage"
    clearable
    prefix-icon="📱"
    autocomplete="tel"
    maxlength="12"
    @update:model-value="handleChange"
  />
</template>
