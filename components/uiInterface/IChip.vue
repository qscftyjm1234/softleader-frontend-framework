<script setup lang="ts">
import { computed } from 'vue'
import { Tag as ATag } from 'ant-design-vue'

/**
 * IChip - UI 介面層標籤
 * 基底更換為 Ant Design Vue (a-tag)
 */

interface Props {
  label?: string
  color?: string
  size?: 'small' | 'medium' | 'large'
  variant?: 'filled' | 'outlined' | 'elevated'
  closable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  color: '#3b82f6',
  size: 'medium',
  variant: 'filled',
  closable: false
})

const emit = defineEmits<{
  close: []
}>()

const tagColor = computed(() => {
  if (props.variant === 'outlined') return undefined
  return props.color
})
</script>

<template>
  <ATag
    :closable="closable"
    :color="tagColor"
    :class="['i-chip-wrapper', `variant-${variant}`, `size-${size}`]"
    @close="emit('close')"
  >
    <slot>{{ label }}</slot>
  </ATag>
</template>

<style scoped lang="scss">
.i-chip-wrapper {
  margin: 0;
  border-radius: 999px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;

  &.size-small {
    padding: 0 10px;
    font-size: 0.7rem;
    height: 22px;
    line-height: 22px;
  }
  &.size-medium {
    padding: 0 14px;
    font-size: 0.8rem;
    height: 30px;
    line-height: 30px;
  }
  &.size-large {
    padding: 0 18px;
    font-size: 0.9rem;
    height: 38px;
    line-height: 38px;
  }

  &.variant-outlined {
    background: transparent;
    border: 1.5px solid v-bind(color);
    color: v-bind(color);
  }

  &.variant-elevated {
    box-shadow: 0 4px 6px -1px v-bind('color + "40"');
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 15px -3px v-bind('color + "60"');
    }
  }

  :deep(.ant-tag-close-icon) {
    margin-left: 8px;
    font-size: 10px;
  }
}
</style>
