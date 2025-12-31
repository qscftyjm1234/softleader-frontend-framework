<script setup lang="ts">
/**
 * CountrySelect - 國家選擇（業務元件）
 *
 * 用途：封裝國家選擇的業務邏輯
 * 特點：
 * - 自動從 useOptions 載入國家資料
 * - 支援搜尋
 * - 顯示國旗 emoji
 */

import ISelect from '@/components/uiInterface/ISelect.vue'
import { useOptions } from '@/composables/useOptions'

interface Props {
  modelValue: string
  placeholder?: string
  disabled?: boolean
  showAllOption?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '請選擇國家',
  disabled: false,
  showAllOption: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
}>()

// 業務邏輯：從 useOptions 取得國家資料
const options = useOptions()
const countryOptions = computed(() => {
  const opts = options.countries.get()
  console.log(opts)
  // 如果需要「全部」選項
  if (props.showAllOption) {
    return opts.withAll()
  }

  return opts
})

// 取得載入狀態
const isLoading = computed(() => options.countries.isLoading)

// 業務邏輯：選擇處理
const handleChange = (value: string) => {
  emit('update:modelValue', value)
  emit('change', value)

  console.log('國家已選擇:', value)
}
</script>

<template>
  <ISelect
    :model-value="modelValue"
    :options="countryOptions"
    :placeholder="isLoading ? '載入中...' : placeholder"
    :disabled="disabled || isLoading"
    searchable
    @update:model-value="handleChange"
  />
</template>
