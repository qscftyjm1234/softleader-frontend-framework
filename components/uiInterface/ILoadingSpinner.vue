<script setup lang="ts">
import { Spin as ASpin } from 'ant-design-vue'

/**
 * ILoadingSpinner - 介面層
 * 基底更換為 Ant Design Vue (a-spin)
 */

interface Props {
  size?: 'small' | 'default' | 'large' | number
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'default',
  color: '#6366f1'
})
</script>

<template>
  <div class="i-loading-spinner">
    <ASpin
      :size="typeof size === 'string' ? size : 'default'"
      class="i-spin-wrapper"
    />
  </div>
</template>

<style scoped lang="scss">
.i-loading-spinner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

:deep(.i-spin-wrapper) {
  .ant-spin-dot-item {
    background-color: v-bind(color);
  }
}
</style>
