<script setup lang="ts">
import { computed } from 'vue'
import { Card as ACard } from 'ant-design-vue'

/**
 * ICard - UI 介面層卡片
 * 基底更換為 Ant Design Vue (a-card)
 */

interface Props {
  title?: string
  subtitle?: string
  elevation?: number
  color?: string
  variant?: 'elevated' | 'flat' | 'outlined' | 'glass'
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  subtitle: '',
  elevation: 1,
  color: '#ffffff',
  variant: 'elevated'
})

const cardStyle = computed(() => {
  const styles: any = {}
  if (props.color && props.variant !== 'glass') {
    styles.backgroundColor = props.color
  }
  return styles
})
</script>

<template>
  <ACard
    :bordered="variant === 'outlined'"
    :class="['i-card-wrapper', `variant-${variant}`]"
    :style="cardStyle"
  >
    <template
      v-if="title || subtitle || $slots.header"
      #title
    >
      <slot name="header">
        <div class="flex flex-col">
          <span class="text-lg font-black text-slate-900 tracking-tight">{{ title }}</span>
          <span
            v-if="subtitle"
            class="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1"
          >
            {{ subtitle }}
          </span>
        </div>
      </slot>
    </template>

    <div class="i-card-body">
      <slot />
    </div>

    <template
      v-if="$slots.footer"
      #actions
    >
      <div class="px-6 py-4 w-full text-left">
        <slot name="footer" />
      </div>
    </template>
  </ACard>
</template>

<style scoped lang="scss">
:deep(.i-card-wrapper) {
  border-radius: 24px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  .ant-card-head {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    padding: 20px 24px;
  }

  .ant-card-body {
    padding: 24px;
  }

  &.variant-elevated {
    border: 1px solid rgba(0, 0, 0, 0.05);
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.05),
      0 4px 6px -2px rgba(0, 0, 0, 0.02);
    &:hover {
      transform: translateY(-4px);
      box-shadow:
        0 20px 25px -5px rgba(0, 0, 0, 0.1),
        0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }
  }

  &.variant-glass {
    background: rgba(255, 255, 255, 0.7) !important;
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.4);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
  }

  &.variant-flat {
    background-color: #f8fafc !important;
    border: none;
    box-shadow: none;
  }
}
</style>
