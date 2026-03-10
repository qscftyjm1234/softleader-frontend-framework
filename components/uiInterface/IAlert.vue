<script setup lang="ts">
import { computed } from 'vue'
import { Alert as AAlert } from 'ant-design-vue'
import IIcon from './IIcon.vue'

/**
 * IAlert - UI 介面層警示框
 * 基底更換為 Ant Design Vue (a-alert)
 */
interface Props {
  title?: string
  text?: string
  type?: 'info' | 'success' | 'warning' | 'error'
  variant?: 'tonal' | 'outlined' | 'flat'
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  text: '',
  type: 'info',
  variant: 'tonal',
  icon: ''
})

const antdType = computed(() => {
  if (props.type === 'error') return 'error'
  if (props.type === 'warning') return 'warning'
  if (props.type === 'success') return 'success'
  return 'info'
})

const defaultIcon = computed(() => {
  if (props.icon) return props.icon
  switch (props.type) {
    case 'info':
      return 'mdi-information-outline'
    case 'success':
      return 'mdi-check-circle-outline'
    case 'warning':
      return 'mdi-alert-outline'
    case 'error':
      return 'mdi-alert-circle-outline'
    default:
      return 'mdi-information-outline'
  }
})
</script>

<template>
  <AAlert
    :message="title || undefined"
    :description="text || $slots.default ? text || undefined : undefined"
    :type="antdType"
    show-icon
    :class="['i-alert-wrapper', `variant-${variant}`]"
  >
    <template #icon>
      <IIcon
        :icon="defaultIcon"
        size="22"
      />
    </template>
    <template
      v-if="$slots.default"
      #description
    >
      <slot />
    </template>
  </AAlert>
</template>

<style scoped lang="scss">
.i-alert-wrapper {
  padding: 16px 20px;
  border-radius: 16px;
  border: none;
  font-weight: 500;

  &.ant-alert-with-description {
    .ant-alert-message {
      font-weight: 800;
      font-size: 1.05rem;
      margin-bottom: 4px;
    }
  }

  &.variant-tonal {
    &.ant-alert-info {
      background-color: #eff6ff;
      color: #1e40af;
    }
    &.ant-alert-success {
      background-color: #ecfdf5;
      color: #065f46;
    }
    &.ant-alert-warning {
      background-color: #fffbeb;
      color: #92400e;
    }
    &.ant-alert-error {
      background-color: #fff1f2;
      color: #9f1239;
    }
  }

  &.variant-outlined {
    background-color: white;
    border: 1px solid currentColor;
    opacity: 0.8;
  }

  &.variant-flat {
    color: white;
    &.ant-alert-info {
      background-color: #3b82f6;
    }
    &.ant-alert-success {
      background-color: #10b981;
    }
    &.ant-alert-warning {
      background-color: #f59e0b;
    }
    &.ant-alert-error {
      background-color: #e11d48;
    }

    :deep(.ant-alert-message),
    :deep(.ant-alert-description) {
      color: white;
    }
  }
}
</style>
