<script setup lang="ts">
/**
 * IButton - 按鈕介面層
 *
 * 用途：統一的 Button 介面，內部可替換 UI 框架
 *
 * 設計原則：
 * - 只定義 props 和 events
 * - 不含業務邏輯
 * - 可替換內部實作（原生 HTML / Vuetify / Element UI）
 */

interface Props {
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'text'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
  block?: boolean // 全寬按鈕
  icon?: string
  iconPosition?: 'left' | 'right'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'primary',
  size: 'medium',
  disabled: false,
  loading: false,
  block: false,
  iconPosition: 'left'
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'i-button',
      `i-button--${variant}`,
      `i-button--${size}`,
      {
        'i-button--block': block,
        'i-button--loading': loading,
        'i-button--disabled': disabled
      }
    ]"
    @click="handleClick"
  >
    <!-- Loading 圖示 -->
    <span
      v-if="loading"
      class="i-button__loading"
    >
      ⏳
    </span>

    <!-- 左側圖示 -->
    <span
      v-if="icon && iconPosition === 'left' && !loading"
      class="i-button__icon"
    >
      {{ icon }}
    </span>

    <!-- 按鈕文字 -->
    <span class="i-button__text">
      <slot />
    </span>

    <!-- 右側圖示 -->
    <span
      v-if="icon && iconPosition === 'right' && !loading"
      class="i-button__icon"
    >
      {{ icon }}
    </span>
  </button>

  <!-- 未來換成 Vuetify 的範例 -->
  <!--
  <VBtn
    :type="type"
    :color="variant"
    :size="size"
    :disabled="disabled"
    :loading="loading"
    :block="block"
    :prepend-icon="iconPosition === 'left' ? icon : undefined"
    :append-icon="iconPosition === 'right' ? icon : undefined"
    @click="emit('click', $event)"
  >
    <slot />
  </VBtn>
  -->
</template>

<style scoped>
.i-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

/* Sizes */
.i-button--small {
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
}

.i-button--medium {
  padding: 0.5rem 1rem;
  font-size: 1rem;
}

.i-button--large {
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
}

/* Variants */
.i-button--primary {
  background: #3498db;
  color: white;
}

.i-button--primary:hover:not(:disabled) {
  background: #2980b9;
}

.i-button--secondary {
  background: #95a5a6;
  color: white;
}

.i-button--secondary:hover:not(:disabled) {
  background: #7f8c8d;
}

.i-button--success {
  background: #2ecc71;
  color: white;
}

.i-button--success:hover:not(:disabled) {
  background: #27ae60;
}

.i-button--danger {
  background: #e74c3c;
  color: white;
}

.i-button--danger:hover:not(:disabled) {
  background: #c0392b;
}

.i-button--warning {
  background: #f39c12;
  color: white;
}

.i-button--warning:hover:not(:disabled) {
  background: #e67e22;
}

.i-button--info {
  background: #3498db;
  color: white;
}

.i-button--info:hover:not(:disabled) {
  background: #2980b9;
}

.i-button--text {
  background: transparent;
  color: #3498db;
}

.i-button--text:hover:not(:disabled) {
  background: rgba(52, 152, 219, 0.1);
}

/* States */
.i-button--block {
  width: 100%;
}

.i-button--loading,
.i-button--disabled,
.i-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.i-button__loading {
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
</style>
