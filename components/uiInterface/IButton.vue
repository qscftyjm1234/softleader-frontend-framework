<script setup lang="ts">
import { computed } from 'vue'
import IIcon from './IIcon.vue' // 原生實作需要引入 Icon

/**
 * Component: IButton (按鈕元件)
 *
 * 介面層 (Interface Layer) 標準元件。
 * 負責將統一的 Props 轉換為底層 UI 框架 (Vuetify) 的屬性。
 * 內部保留了「與 UI 框架解耦」的能力，可隨時切換回原生或其他框架。
 *
 * @example
 * <IButton variant="danger" size="large" loading>刪除</IButton>
 */

// ====================================================
// 框架切換開關 (DEMO USE ONLY)
// true = 使用 Vuetify 實作
// false = 使用 原生 HTML/CSS 實作
// ====================================================
const USE_FRAMEWORK = true

// 1. 定義標準 Props (20% 核心)
interface Props {
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
  href?: string
  target?: string
  color?: string // 自訂顏色
  // 圖示
  prependIcon?: string
  appendIcon?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium',
  block: false,
  loading: false,
  disabled: false,
  target: undefined,
  color: undefined,
  href: undefined,
  prependIcon: undefined,
  appendIcon: undefined
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// ====================================================
// 2. 屬性對照表 (把我們的標準轉成 Vuetify 看得懂的樣子)
// ====================================================
const vuetifyBindings = computed(() => {
  const bindings: Record<string, any> = {}

  // [Size Mapping]
  const sizeMap: Record<string, string> = {
    small: 'x-small',
    medium: 'default',
    large: 'large'
  }
  bindings.size = sizeMap[props.size] || 'default'

  // [Variant & Color Mapping]
  const colorMap: Record<string, string> = {
    danger: 'error',
    primary: 'primary',
    secondary: 'secondary',
    success: 'success',
    warning: 'warning',
    info: 'info'
  }

  if (props.variant === 'text') {
    bindings.variant = 'text'
    bindings.color = props.color
  } else if (props.variant === 'outlined') {
    bindings.variant = 'outlined'
    bindings.color = props.color || 'primary'
  } else {
    // 預設實心
    bindings.variant = 'elevated'
    bindings.color = props.color || colorMap[props.variant] || props.variant
  }

  return bindings
})

// ====================================================
// 3. 原生實作邏輯 (Native Logic)
// ====================================================
const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}

const isLink = computed(() => !!props.href)
const componentTag = computed(() => (isLink.value ? 'a' : 'button'))

const buttonStyle = computed(() => {
  if (!props.color) return {}
  const colorValue =
    props.color.startsWith('var(') || props.color.startsWith('#') || props.color.startsWith('rgb')
      ? props.color
      : `var(--color-${props.color}, ${props.color})`
  return {
    color: props.variant === 'text' ? colorValue : undefined,
    backgroundColor: props.variant !== 'text' ? colorValue : undefined
  }
})
</script>

<template>
  <!-- 
    實作 A: 底層框架 (Vuetify)
    原則：屬性透傳 ($attrs) 讓 Vue 自動處理剩下的 80% 屬性
  -->
  <v-btn
    v-if="USE_FRAMEWORK"
    v-bind="{ ...vuetifyBindings, ...$attrs }"
    :block="block"
    :loading="loading"
    :disabled="disabled"
    :href="href"
    :target="target"
    @click="handleClick"
  >
    <!-- 使用 slot 搭配 IIcon 以支援所有圖示類型 (包含 svg-softleader) -->
    <template
      v-if="prependIcon"
      #prepend
    >
      <IIcon :icon="prependIcon" />
    </template>

    <slot />

    <template
      v-if="appendIcon"
      #append
    >
      <IIcon :icon="appendIcon" />
    </template>
  </v-btn>

  <!-- 
    實作 B: 原生 HTML/CSS
    完全不依賴任何第三方 UI 庫，證明介面層解耦能力
  -->
  <component
    :is="componentTag"
    v-else
    :type="isLink ? undefined : 'button'"
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
        'i-button--disabled': disabled
      }
    ]"
    :style="buttonStyle"
    @click="handleClick"
  >
    <!-- Loading -->
    <span
      v-if="loading"
      class="i-button__loading"
    >
      ⏳
    </span>

    <!-- Icons -->
    <IIcon
      v-if="!loading && prependIcon"
      :icon="prependIcon"
      class="i-button__icon mr-2"
    />

    <slot />

    <IIcon
      v-if="!loading && appendIcon"
      :icon="appendIcon"
      class="i-button__icon ml-2"
    />
  </component>
</template>

<style scoped>
/* 
 注意：這些樣式僅在使用「原生實作」時才會生效
 當切換到 Vuetify 時，這些樣式完全不會被載入 (因為 v-btn 有自己的樣式)
*/
.i-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  line-height: 1.5;
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

/* Variants (Simplified for demo) */
.i-button--primary {
  background: #1976d2;
  color: white;
}
.i-button--secondary {
  background: #9e9e9e;
  color: white;
}
.i-button--danger {
  background: #f44336;
  color: white;
}
.i-button--text {
  background: transparent;
  color: inherit;
}
.i-button--outlined {
  background: transparent;
  border: 1px solid currentColor;
  color: inherit;
}

/* States */
.i-button--block {
  width: 100%;
  display: flex;
}
.i-button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}
.i-button__loading {
  animation: spin 1s linear infinite;
  margin-right: 0.5rem;
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
