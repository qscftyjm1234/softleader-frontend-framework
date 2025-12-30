<script setup lang="ts">
/**
 * ISwitch - 開關切換介面層
 *
 * 用途：統一的 Switch 介面，內部可替換 UI 框架
 *
 * 設計原則：
 * - 只定義 props 和 events
 * - 支援自訂開關值
 */

interface Props {
  modelValue: boolean | any
  trueValue?: any // 開啟時的值
  falseValue?: any // 關閉時的值
  label?: string
  disabled?: boolean
  loading?: boolean
  size?: 'small' | 'medium' | 'large'
}

const props = withDefaults(defineProps<Props>(), {
  trueValue: true,
  falseValue: false,
  disabled: false,
  loading: false,
  size: 'medium'
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean | any]
  change: [value: boolean | any]
}>()

const isChecked = computed(() => props.modelValue === props.trueValue)

const handleToggle = () => {
  if (!props.disabled && !props.loading) {
    const newValue = isChecked.value ? props.falseValue : props.trueValue
    emit('update:modelValue', newValue)
    emit('change', newValue)
  }
}
</script>

<template>
  <label
    class="i-switch"
    :class="[
      `i-switch--${size}`,
      {
        'i-switch--disabled': disabled,
        'i-switch--loading': loading
      }
    ]"
  >
    <input
      type="checkbox"
      :checked="isChecked"
      :disabled="disabled || loading"
      class="i-switch__input"
      @change="handleToggle"
    />
    <span
      class="i-switch__track"
      :class="{ 'i-switch__track--checked': isChecked }"
    >
      <span class="i-switch__thumb">
        <span
          v-if="loading"
          class="i-switch__loading"
        >
          ⏳
        </span>
      </span>
    </span>
    <span
      v-if="label || $slots.default"
      class="i-switch__label"
    >
      <slot>{{ label }}</slot>
    </span>
  </label>

  <!-- 未來換成 Vuetify 的範例 -->
  <!--
  <VSwitch
    :model-value="isChecked"
    :label="label"
    :disabled="disabled"
    :loading="loading"
    :true-value="trueValue"
    :false-value="falseValue"
    @update:model-value="handleToggle"
  >
    <template v-if="$slots.default" #label>
      <slot />
    </template>
  </VSwitch>
  -->
</template>

<style scoped>
.i-switch {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
}

.i-switch--disabled,
.i-switch--loading {
  opacity: 0.6;
  cursor: not-allowed;
}

.i-switch__input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.i-switch__track {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  background: #ddd;
  border-radius: 12px;
  transition: all 0.3s;
}

.i-switch--small .i-switch__track {
  width: 36px;
  height: 20px;
  border-radius: 10px;
}

.i-switch--large .i-switch__track {
  width: 52px;
  height: 28px;
  border-radius: 14px;
}

.i-switch__track--checked {
  background: #3498db;
}

.i-switch__thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.i-switch--small .i-switch__thumb {
  width: 16px;
  height: 16px;
}

.i-switch--large .i-switch__thumb {
  width: 24px;
  height: 24px;
}

.i-switch__track--checked .i-switch__thumb {
  transform: translateX(20px);
}

.i-switch--small .i-switch__track--checked .i-switch__thumb {
  transform: translateX(16px);
}

.i-switch--large .i-switch__track--checked .i-switch__thumb {
  transform: translateX(24px);
}

.i-switch__loading {
  font-size: 0.75rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.i-switch__label {
  font-size: 1rem;
  color: #333;
}

.i-switch--disabled .i-switch__label {
  color: #999;
}
</style>
