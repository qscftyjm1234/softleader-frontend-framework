<script setup lang="ts">
/**
 * IInput - 輸入框介面層
 *
 * 用途：統一的 Input 介面，內部可替換 UI 框架
 *
 * 設計原則：
 * - 只定義 props 和 events
 * - 不含業務邏輯
 * - 可替換內部實作（原生 HTML / Vuetify / Element UI）
 */

interface Props {
  modelValue: string | number
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url'
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  maxlength?: number
  autocomplete?: string
  // 驗證相關
  error?: boolean
  errorMessage?: string
  // 樣式相關
  clearable?: boolean
  prefixIcon?: string
  suffixIcon?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  disabled: false,
  readonly: false,
  error: false,
  clearable: false,
  maxlength: undefined,
  autocomplete: 'off',
  errorMessage: '',
  prefixIcon: '',
  suffixIcon: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [value: string | number]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
  clear: []
}>()

// 內部值管理
const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
    emit('change', val)
  }
})

// 清除輸入
const handleClear = () => {
  internalValue.value = ''
  emit('clear')
}

defineOptions({
  inheritAttrs: false
})
</script>

<template>
  <div class="i-input">
    <!-- 目前使用原生 HTML -->
    <!-- 未來可以換成 Vuetify / Element UI / Ant Design -->

    <div
      class="input-wrapper"
      :class="{ 'has-error': error, 'is-disabled': disabled }"
    >
      <!-- 前綴圖示 -->
      <span
        v-if="prefixIcon"
        class="prefix-icon"
      >
        {{ prefixIcon }}
      </span>

      <!-- 輸入框 -->
      <input
        v-model="internalValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :autocomplete="autocomplete"
        class="input-field"
        @blur="emit('blur', $event)"
        @focus="emit('focus', $event)"
      />

      <!-- 清除按鈕 -->
      <button
        v-if="clearable && internalValue"
        type="button"
        class="clear-btn"
        @click="handleClear"
      >
        ✕
      </button>

      <!-- 後綴圖示 -->
      <span
        v-if="suffixIcon"
        class="suffix-icon"
      >
        {{ suffixIcon }}
      </span>
    </div>

    <!-- 錯誤訊息 -->
    <div
      v-if="error && errorMessage"
      class="error-message"
    >
      {{ errorMessage }}
    </div>
  </div>

  <!-- 未來換成 Vuetify 的範例 -->
  <!--
  <VTextField
    v-model="internalValue"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :maxlength="maxlength"
    :error="error"
    :error-messages="errorMessage"
    :clearable="clearable"
    @blur="emit('blur', $event)"
    @focus="emit('focus', $event)"
  />
  -->

  <!-- 未來換成 Element UI 的範例 -->
  <!--
  <ElInput
    v-model="internalValue"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :maxlength="maxlength"
    :clearable="clearable"
    @blur="emit('blur', $event)"
    @focus="emit('focus', $event)"
  >
    <template v-if="prefixIcon" #prefix>{{ prefixIcon }}</template>
    <template v-if="suffixIcon" #suffix>{{ suffixIcon }}</template>
  </ElInput>
  -->
</template>

<style scoped>
.i-input {
  width: 100%;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background: rgba(15, 23, 42, 0.4);
  transition: all 0.2s;
}

.input-wrapper:hover:not(.is-disabled) {
  border-color: rgba(56, 189, 248, 0.5);
  background: rgba(15, 23, 42, 0.6);
}

.input-wrapper:focus-within {
  border-color: #38bdf8;
  box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.2);
  background: rgba(15, 23, 42, 0.8);
}

.input-wrapper.has-error {
  border-color: #ef4444;
}

.input-wrapper.has-error:focus-within {
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
}

.input-wrapper.is-disabled {
  background: rgba(255, 255, 255, 0.05);
  cursor: not-allowed;
  opacity: 0.6;
}

.input-field {
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  outline: none;
  font-size: 0.95rem;
  background: transparent;
  color: #e2e8f0;
}

.input-field::placeholder {
  color: #64748b;
}

.input-field:disabled {
  cursor: not-allowed;
}

.prefix-icon,
.suffix-icon {
  padding: 0 0.75rem;
  color: #94a3b8;
  display: flex;
  align-items: center;
}

.clear-btn {
  padding: 0 0.5rem;
  border: none;
  background: transparent;
  color: #64748b;
  cursor: pointer;
  transition: color 0.2s;
  display: flex;
  align-items: center;
}

.clear-btn:hover {
  color: #e2e8f0;
}

.error-message {
  margin-top: 0.4rem;
  font-size: 0.85rem;
  color: #ef4444;
  margin-left: 0.25rem;
}
</style>
