<script setup lang="ts">
/**
 * IRadio - 單選按鈕介面層
 *
 * 用途：統一的 Radio 介面，內部可替換 UI 框架
 *
 * 設計原則：
 * - 只定義 props 和 events
 * - 支援單選組
 */

interface Props {
  modelValue: any
  value: any
  label?: string
  name?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: any]
  change: [value: any]
}>()

const isChecked = computed(() => props.modelValue === props.value)

const handleChange = () => {
  if (!props.disabled) {
    emit('update:modelValue', props.value)
    emit('change', props.value)
  }
}
</script>

<template>
  <label
    class="i-radio"
    :class="{ 'i-radio--disabled': disabled }"
  >
    <input
      type="radio"
      :name="name"
      :value="value"
      :checked="isChecked"
      :disabled="disabled"
      class="i-radio__input"
      @change="handleChange"
    />
    <span class="i-radio__circle" />
    <span
      v-if="label || $slots.default"
      class="i-radio__label"
    >
      <slot>{{ label }}</slot>
    </span>
  </label>

  <!-- 未來換成 Vuetify 的範例 -->
  <!--
  <VRadio
    :model-value="modelValue"
    :value="value"
    :label="label"
    :disabled="disabled"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <template v-if="$slots.default" #label>
      <slot />
    </template>
  </VRadio>
  -->
</template>

<style scoped>
.i-radio {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
}

.i-radio--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.i-radio__input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.i-radio__circle {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #ddd;
  border-radius: 50%;
  background: white;
  transition: all 0.2s;
}

.i-radio:hover .i-radio__circle {
  border-color: #3498db;
}

.i-radio__input:checked ~ .i-radio__circle {
  border-color: #3498db;
}

.i-radio__input:checked ~ .i-radio__circle::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #3498db;
}

.i-radio__label {
  font-size: 1rem;
  color: #333;
}

.i-radio--disabled .i-radio__label {
  color: #999;
}
</style>
