<script setup lang="ts">
import { computed } from 'vue'
import { Button as AButton } from 'ant-design-vue'
import IIcon from './IIcon.vue'

/**
 * Component: IButton (按鈕元件)
 *
 * 介面層 (Interface Layer) 標準元件。
 * 基底更換為 Ant Design Vue (a-button)，並保留企業級 SaaS 視覺封裝。
 */

interface Props {
  // 文字
  label?: string
  // 樣式變體
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'text'
    | 'outlined'
  // 尺寸
  size?: 'small' | 'medium' | 'large'
  // 狀態與行為
  block?: boolean
  loading?: boolean
  disabled?: boolean
  // 連結
  href?: string
  to?: string // Nuxt 路由路徑
  target?: string
  color?: string // 自訂顏色
  // 圖示
  icon?: string // 僅圖示模式 (Icon-only mode)
  prependIcon?: string
  appendIcon?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: undefined,
  variant: 'primary',
  size: 'medium',
  block: false,
  loading: false,
  disabled: false,
  target: undefined,
  color: undefined,
  href: undefined,
  to: undefined,
  icon: undefined,
  prependIcon: undefined,
  appendIcon: undefined
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    if (props.to) {
      navigateTo(props.to)
    } else {
      emit('click', event)
    }
  }
}

// 映射 Ant Design 的 Type
const antdVariant = computed(() => {
  if (props.variant === 'outlined') return 'dashed'
  if (props.variant === 'text') return 'text'
  if (props.variant === 'secondary') return 'default'
  if (['success', 'danger', 'warning', 'info'].includes(props.variant || '')) return 'primary'
  return props.variant as any
})

// 映射 Ant Design 的 Size
const antdSize = computed(() => {
  if (props.size === 'large') return 'large'
  if (props.size === 'small') return 'small'
  return 'middle'
})

// 語義化顏色 Class 映射 (Tailwind)
const colorClasses = computed(() => {
  if (props.variant === 'success') return 'antd-btn-success'
  if (props.variant === 'danger') return 'antd-btn-danger'
  if (props.variant === 'warning') return 'antd-btn-warning'
  if (props.variant === 'info') return 'antd-btn-info'
  if (props.variant === 'secondary') return 'antd-btn-secondary'
  return ''
})
</script>

<template>
  <AButton
    :type="antdVariant"
    :size="antdSize"
    :block="block"
    :loading="loading"
    :disabled="disabled"
    :danger="variant === 'danger'"
    :class="[
      'i-button-wrapper',
      colorClasses,
      { 'is-icon-only': icon && !$slots.default && !label }
    ]"
    @click="handleClick"
  >
    <template
      v-if="prependIcon || icon"
      #icon
    >
      <IIcon :icon="prependIcon || icon" />
    </template>

    <span v-if="label || $slots.default">
      <slot>{{ label }}</slot>
    </span>

    <template
      v-if="appendIcon"
      #append
    >
      <IIcon
        :icon="appendIcon"
        class="ml-1"
      />
    </template>
  </AButton>
</template>

<style scoped lang="scss">
.i-button-wrapper {
  height: auto;
  padding: 10px 20px;
  border-radius: 12px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &.ant-btn-lg {
    padding: 14px 28px;
    font-size: 16px;
  }

  &.ant-btn-sm {
    padding: 6px 12px;
    font-size: 12px;
    border-radius: 8px;
  }

  &.is-icon-only {
    padding: 0;
    width: 42px;
    height: 42px;

    &.ant-btn-sm {
      width: 32px;
      height: 32px;
    }
    &.ant-btn-lg {
      width: 52px;
      height: 52px;
    }
  }
}

// 擴展 Ant Design 語義化顏色 (透過範例代碼中的企業藍與高級灰)
.antd-btn-success {
  background-color: #10b981 !important;
  border-color: #10b981 !important;
  color: white !important;
  &:hover {
    background-color: #059669 !important;
    border-color: #059669 !important;
  }
}

.antd-btn-warning {
  background-color: #f59e0b !important;
  border-color: #f59e0b !important;
  color: white !important;
  &:hover {
    background-color: #d97706 !important;
    border-color: #d97706 !important;
  }
}

.antd-btn-info {
  background-color: #0ea5e9 !important;
  border-color: #0ea5e9 !important;
  color: white !important;
  &:hover {
    background-color: #0284c7 !important;
    border-color: #0284c7 !important;
  }
}

.antd-btn-danger {
  // Antd 已經有 danger 變體，但我們希望使用自定義的 rose-600 顏色
  background-color: #e11d48 !important;
  border-color: #e11d48 !important;
  color: white !important;
  &:hover {
    background-color: #be123c !important;
    border-color: #be123c !important;
  }
}

.antd-btn-secondary {
  background-color: #475569 !important;
  border-color: #475569 !important;
  color: white !important;
  &:hover {
    background-color: #334155 !important;
    border-color: #334155 !important;
  }
}
</style>
