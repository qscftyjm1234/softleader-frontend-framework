<script setup lang="ts">
import { computed } from 'vue'
import IIcon from './IIcon.vue'
import type { Component } from 'vue'

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
  color?: string // 自訂顏色 (CSS color value 或 theme color name)
  disabled?: boolean
  loading?: boolean
  block?: boolean // 全寬按鈕
  href?: string // 連結模式：提供 href 時渲染為 <a> 標籤
  target?: '_blank' | '_self' | '_parent' | '_top' // 連結目標
  icon?: string | Component // @deprecated: 用 prependIcon 或 appendIcon
  prependIcon?: string | Component
  appendIcon?: string | Component
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'primary',
  size: 'medium',
  color: undefined,
  disabled: false,
  loading: false,
  block: false,
  href: undefined,
  target: undefined,
  icon: undefined,
  prependIcon: undefined,
  appendIcon: undefined
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}

// 計算動態樣式
const buttonStyle = computed(() => {
  if (!props.color) return {}

  // 支援 CSS 變數或直接顏色值
  const colorValue = props.color.startsWith('var(')
    ? props.color
    : props.color.startsWith('#') || props.color.startsWith('rgb')
      ? props.color
      : `var(--color-${props.color}, ${props.color})`

  return {
    color: colorValue
  }
})

// 判斷是否為連結模式
const isLink = computed(() => !!props.href)

// 動態元件標籤
const componentTag = computed(() => (isLink.value ? 'a' : 'button'))
</script>

<template>
  <component
    :is="componentTag"
    :type="isLink ? undefined : type"
    :href="isLink ? href : undefined"
    :target="isLink ? target : undefined"
    :disabled="isLink ? undefined : disabled || loading"
    :class="[
      'i-button',
      `i-button--${variant}`,
      `i-button--${size}`,
      {
        'i-button--block': block,
        'i-button--loading': loading,
        'i-button--disabled': disabled,
        'i-button--icon-only': icon && !prependIcon && !appendIcon && !$slots.default
      }
    ]"
    :style="buttonStyle"
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
    <IIcon
      v-if="!loading && (prependIcon || icon)"
      :icon="prependIcon || icon"
      class="i-button__icon i-button__icon--start"
    />

    <!-- 按鈕文字 (如果有的話) -->
    <span
      v-if="$slots.default"
      class="i-button__text"
    >
      <slot />
    </span>

    <!-- 右側圖示 -->
    <IIcon
      v-if="!loading && appendIcon"
      :icon="appendIcon"
      class="i-button__icon i-button__icon--end"
    />
  </component>
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
  text-decoration: none; /* 移除連結底線 */
}

/* Sizes */
.i-button--small {
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  gap: 0.375rem;
}

.i-button--medium {
  padding: 0.5rem 1rem;
  font-size: 1rem;
}

.i-button--large {
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
  gap: 0.625rem;
}

/* Variants */
.i-button--primary {
  background: var(--color-primary, #1976d2);
  color: white;
}
.i-button--primary:hover:not(:disabled) {
  filter: brightness(1.1);
}

.i-button--secondary {
  background: var(--color-gray-500, #9e9e9e);
  color: white;
}
.i-button--secondary:hover:not(:disabled) {
  filter: brightness(1.1);
}

.i-button--success {
  background: var(--color-success, #4caf50);
  color: white;
}
.i-button--success:hover:not(:disabled) {
  filter: brightness(1.1);
}

.i-button--danger {
  background: var(--color-error, #f44336);
  color: white;
}
.i-button--danger:hover:not(:disabled) {
  filter: brightness(1.1);
}

.i-button--warning {
  background: var(--color-warning, #ff9800);
  color: white;
}
.i-button--warning:hover:not(:disabled) {
  filter: brightness(1.1);
}

.i-button--info {
  background: var(--color-info, #2196f3);
  color: white;
}
.i-button--info:hover:not(:disabled) {
  filter: brightness(1.1);
}

.i-button--text {
  background: transparent;
  color: var(--color-primary, #1976d2);
}
.i-button--text:hover:not(:disabled) {
  background: rgba(25, 118, 210, 0.1);
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
  pointer-events: none;
}

.i-button__loading {
  animation: spin 1s linear infinite;
  display: inline-block;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Icons */
.i-button :deep(.ui-icon) {
  font-size: 1.25em; /* 相對於按鈕字體大小 */
}
</style>
