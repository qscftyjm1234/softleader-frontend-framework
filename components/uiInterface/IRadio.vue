<script setup lang="ts">
import { computed } from 'vue'
import { Radio as ARadio } from 'ant-design-vue'

/**
 * IRadio - 單選按鈕介面層
 * 基底更換為 Ant Design Vue (a-radio)
 */

interface Props {
  modelValue: any
  value: any
  label?: string
  name?: string
  disabled?: boolean
  error?: boolean
  errorMessage?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  name: '',
  disabled: false,
  error: false,
  errorMessage: undefined
})

const emit = defineEmits<{
  'update:modelValue': [value: any]
  change: [value: any]
}>()

const isChecked = computed(() => props.modelValue === props.value)

const onChange = (e: any) => {
  const val = e.target.value
  emit('update:modelValue', val)
  emit('change', val)
}
</script>

<template>
  <ARadio
    :value="value"
    :checked="isChecked"
    :disabled="disabled"
    :name="name"
    class="i-radio-wrapper"
    @change="onChange"
  >
    <span
      v-if="label || $slots.default"
      class="text-slate-700 font-medium ml-1"
    >
      <slot>{{ label }}</slot>
    </span>
  </ARadio>

  <!-- 錯誤訊息 -->
  <div
    v-if="errorMessage"
    class="mt-1.5 ml-1 flex items-center gap-1.5 text-[0.85rem] font-semibold text-red-500"
  >
    {{ errorMessage }}
  </div>
</template>

<style scoped lang="scss">
:deep(.i-radio-wrapper) {
  display: inline-flex;
  align-items: center;

  .ant-radio {
    top: 0;

    .ant-radio-inner {
      width: 20px;
      height: 20px;
      border: 2px solid #cbd5e1;
      transition: all 0.3s;

      &::after {
        width: 10px;
        height: 10px;
        background-color: #10b981;
      }
    }

    &.ant-radio-checked .ant-radio-inner {
      border-color: #10b981;
    }
  }

  &:hover .ant-radio-inner {
    border-color: #10b981;
  }
}
</style>
