<script setup lang="ts">
import { computed } from 'vue'
import { Switch as ASwitch } from 'ant-design-vue'

/**
 * ISwitch - 開關切換介面層
 * 基底更換為 Ant Design Vue (a-switch)
 */

interface Props {
  modelValue: boolean | any
  trueValue?: any
  falseValue?: any
  label?: string
  disabled?: boolean
  loading?: boolean
  size?: 'small' | 'medium' | 'large'
}

const props = withDefaults(defineProps<Props>(), {
  trueValue: true,
  falseValue: false,
  label: '',
  disabled: false,
  loading: false,
  size: 'medium'
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean | any]
  change: [value: boolean | any]
}>()

const isChecked = computed({
  get: () => props.modelValue === props.trueValue,
  set: (val) => {
    const newValue = val ? props.trueValue : props.falseValue
    emit('update:modelValue', newValue)
    emit('change', newValue)
  }
})

const antdSize = computed(() => {
  if (props.size === 'small') return 'small'
  return 'default'
})
</script>

<template>
  <div class="i-switch-container">
    <ASwitch
      v-model:checked="isChecked"
      :disabled="disabled"
      :loading="loading"
      :size="antdSize"
      class="i-switch-wrapper"
    />
    <span
      v-if="label || $slots.default"
      class="text-[0.95rem] font-medium text-slate-700 ml-2"
    >
      <slot>{{ label }}</slot>
    </span>
  </div>
</template>

<style scoped lang="scss">
.i-switch-container {
  display: inline-flex;
  align-items: center;
}

:deep(.i-switch-wrapper) {
  background-color: #cbd5e1;

  &.ant-switch-checked {
    background-color: #6366f1;
  }

  &.ant-switch-small {
    min-width: 32px;
  }

  &:not(.ant-switch-disabled):hover {
    background-color: #94a3b8;
    &.ant-switch-checked {
      background-color: #4f46e5;
    }
  }
}
</style>
