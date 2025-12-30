<script setup lang="ts">
/**
 * ITextField - UI 介面層文字輸入框
 *
 * 用途：統一的 TextField 介面，內部可使用原生 HTML 或 UI 框架
 * 未來要換 UI 框架，只需要修改這個檔案
 */

interface Props {
  modelValue: string | number
  label?: string
  placeholder?: string
  type?: string
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
  prependIcon?: string
  appendIcon?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  placeholder: '',
  type: 'text',
  disabled: false,
  readonly: false,
  clearable: false,
  prependIcon: '',
  appendIcon: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  clear: []
}>()

const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
}
</script>

<template>
  <!-- 目前使用原生 HTML -->
  <div class="ui-text-field">
    <label
      v-if="label"
      class="field-label"
    >
      {{ label }}
    </label>
    <div class="field-wrapper">
      <span
        v-if="prependIcon"
        class="field-icon prepend"
      >
        {{ prependIcon }}
      </span>
      <input
        v-model="internalValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        class="field-input"
      />
      <button
        v-if="clearable && internalValue"
        class="field-icon append clickable"
        @click="handleClear"
      >
        ×
      </button>
      <span
        v-else-if="appendIcon"
        class="field-icon append"
      >
        {{ appendIcon }}
      </span>
    </div>
  </div>

  <!-- 未來換成 Vuetify 的範例 -->
  <!--
  <VTextField
    v-model="internalValue"
    :label="label"
    :placeholder="placeholder"
    :type="type"
    :disabled="disabled"
    :readonly="readonly"
    :clearable="clearable"
    :prepend-inner-icon="prependIcon"
    :append-inner-icon="appendIcon"
  />
  -->
</template>

<style scoped>
.ui-text-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.field-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #555;
}

.field-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  transition: all 0.2s;
}

.field-wrapper:focus-within {
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.field-input {
  flex: 1;
  padding: 0.625rem 0.75rem;
  border: none;
  outline: none;
  font-size: 1rem;
  background: transparent;
}

.field-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.field-icon {
  padding: 0 0.75rem;
  color: #999;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
}

.field-icon.clickable {
  cursor: pointer;
  background: none;
  border: none;
  transition: color 0.2s;
}

.field-icon.clickable:hover {
  color: #666;
}
</style>
