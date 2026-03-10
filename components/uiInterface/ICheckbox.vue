<script setup lang="ts">
import { computed } from 'vue'
import { Checkbox as ACheckbox } from 'ant-design-vue'

/**
 * ICheckbox - 核取方塊介面層
 * 基底更換為 Ant Design Vue (a-checkbox)
 */

interface Props {
  modelValue: boolean | any[]
  value?: any
  label?: string
  disabled?: boolean
  indeterminate?: boolean
  error?: boolean
  errorMessage?: string
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  indeterminate: false,
  error: false,
  errorMessage: undefined
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean | any[]]
  change: [value: boolean | any[]]
}>()

// 計算是否被選中
const isChecked = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.value !== undefined && props.modelValue.includes(props.value)
  }
  return !!props.modelValue
})

// 處理變更
const onChange = (e: any) => {
  const checked = e.target.checked
  let newValue: boolean | any[]

  if (Array.isArray(props.modelValue)) {
    // 多選模式
    if (checked) {
      newValue = [...props.modelValue, props.value]
    } else {
      newValue = props.modelValue.filter((v) => v !== props.value)
    }
  } else {
    // 單選模式
    newValue = checked
  }

  emit('update:modelValue', newValue)
  emit('change', newValue)
}
</script>

<template>
  <ACheckbox
    :checked="isChecked"
    :disabled="disabled"
    :indeterminate="indeterminate"
    class="i-checkbox-wrapper"
    @change="onChange"
  >
    <span
      v-if="label || $slots.default"
      class="text-slate-700 font-medium ml-1"
    >
      <slot>{{ label }}</slot>
    </span>
  </ACheckbox>

  <!-- 錯誤訊息 -->
  <div
    v-if="errorMessage"
    class="mt-1.5 ml-1 flex items-center gap-1.5 text-[0.85rem] font-semibold text-red-500"
  >
    {{ errorMessage }}
  </div>
</template>

<style scoped lang="scss">
:deep(.i-checkbox-wrapper) {
  display: inline-flex;
  align-items: center;

  .ant-checkbox {
    top: 0;

    .ant-checkbox-inner {
      width: 20px;
      height: 20px;
      border-radius: 6px;
      border: 2px solid #cbd5e1;
      transition: all 0.3s;

      &::after {
        width: 6px;
        height: 10px;
        left: 5px;
        top: 2px;
      }
    }

    &.ant-checkbox-checked .ant-checkbox-inner {
      background-color: #10b981;
      border-color: #10b981;
    }

    &.ant-checkbox-indeterminate .ant-checkbox-inner::after {
      background-color: #10b981;
    }
  }

  &:hover .ant-checkbox-inner {
    border-color: #10b981;
  }
}
</style>
