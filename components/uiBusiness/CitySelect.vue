<script setup lang="ts">
/**
 * 業務組件 - 城市選擇器
 *
 * 用途：封裝城市選擇的業務邏輯
 * 特點：
 * - 自動從 useOptions 載入城市資料
 * - 封裝選擇後的業務邏輯
 * - 頁面只需要 v-model，不用關心內部實作
 *
 * 未來維護：
 * - 要改 UI 框架 → 只需要改 UiSelect.vue
 * - 要改業務邏輯 → 只需要改這個檔案
 * - 頁面完全不用動！
 */

import ISelect from '@/components/uiInterface/ISelect.vue'
import { useOptions } from '@/composables/useOptions'

interface Props {
  modelValue: string
  placeholder?: string
  disabled?: boolean
  // 業務相關的 props
  showAllOption?: boolean // 是否顯示「全部」選項
  excludeCities?: string[] // 排除特定城市
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '請選擇城市',
  disabled: false,
  showAllOption: false,
  excludeCities: () => []
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
}>()

// 業務邏輯：從 useOptions 取得城市資料
const options = useOptions()

// 業務邏輯：處理選項
const cityOptions = computed(() => {
  let opts: OptionItem[] = options.cities.get()
  console.log(opts)
  // 如果需要排除特定城市
  if (props.excludeCities.length > 0) {
    opts = opts.exclude(props.excludeCities)
  }

  // 如果需要「全部」選項
  if (props.showAllOption) {
    return opts.withAll
  }

  return opts
})

// 業務邏輯：選擇處理
const handleChange = (value: string) => {
  emit('update:modelValue', value)
  emit('change', value)

  // 業務邏輯：可以在這裡加入其他邏輯
  // 例如：記錄到最近選擇、載入相關資料等
  console.log('城市已選擇:', value)
}
</script>

<template>
  <ISelect
    :model-value="modelValue"
    :options="cityOptions"
    :placeholder="placeholder"
    :disabled="disabled"
    @update:model-value="handleChange"
  />
</template>
