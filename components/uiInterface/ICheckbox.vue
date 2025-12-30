<script setup lang="ts">
/**
 * ICheckbox - 核取方塊介面層
 *
 * 用途：統一的 Checkbox 介面，內部可替換 UI 框架
 *
 * 設計原則：
 * - 支援單一值和多選陣列
 * - 可替換內部實作
 */

interface Props {
  modelValue: boolean | any[]
  value?: any // 用於多選時的值
  label?: string
  disabled?: boolean
  indeterminate?: boolean // 半選狀態
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  indeterminate: false
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
  return props.modelValue
})

// 處理變更
const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  let newValue: boolean | any[]

  if (Array.isArray(props.modelValue)) {
    // 多選模式
    if (target.checked) {
      newValue = [...props.modelValue, props.value]
    } else {
      newValue = props.modelValue.filter((v) => v !== props.value)
    }
  } else {
    // 單選模式
    newValue = target.checked
  }

  emit('update:modelValue', newValue)
  emit('change', newValue)
}
</script>

<template>
  <label
    class="i-checkbox"
    :class="{ 'i-checkbox--disabled': disabled }"
  >
    <input
      type="checkbox"
      :checked="isChecked"
      :disabled="disabled"
      :indeterminate="indeterminate"
      class="i-checkbox__input"
      @change="handleChange"
    />
    <span
      class="i-checkbox__checkmark"
      :class="{ 'i-checkbox__checkmark--indeterminate': indeterminate }"
    />
    <span
      v-if="label || $slots.default"
      class="i-checkbox__label"
    >
      <slot>{{ label }}</slot>
    </span>
  </label>

  <!-- 未來換成 Vuetify 的範例 -->
  <!--
  <VCheckbox
    :model-value="isChecked"
    :label="label"
    :disabled="disabled"
    :indeterminate="indeterminate"
    @update:model-value="handleChange"
  >
    <template v-if="$slots.default" #label>
      <slot />
    </template>
  </VCheckbox>
  -->
</template>

<style scoped>
.i-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
}

.i-checkbox--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.i-checkbox__input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.i-checkbox__checkmark {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #ddd;
  border-radius: 4px;
  background: white;
  transition: all 0.2s;
}

.i-checkbox:hover .i-checkbox__checkmark {
  border-color: #3498db;
}

.i-checkbox__input:checked ~ .i-checkbox__checkmark {
  background: #3498db;
  border-color: #3498db;
}

.i-checkbox__input:checked ~ .i-checkbox__checkmark::after {
  content: '';
  position: absolute;
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.i-checkbox__checkmark--indeterminate {
  background: #3498db;
  border-color: #3498db;
}

.i-checkbox__checkmark--indeterminate::after {
  content: '';
  position: absolute;
  left: 4px;
  top: 8px;
  width: 10px;
  height: 2px;
  background: white;
}

.i-checkbox__label {
  font-size: 1rem;
  color: #333;
}

.i-checkbox--disabled .i-checkbox__label {
  color: #999;
}
</style>
