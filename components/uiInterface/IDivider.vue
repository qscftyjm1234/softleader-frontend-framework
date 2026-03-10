<script setup lang="ts">
import { computed } from 'vue'
import { Divider as ADivider } from 'ant-design-vue'

/**
 * IDivider - UI 介面層分隔線
 * 基底更換為 Ant Design Vue (a-divider)
 */

interface Props {
  color?: string
  thickness?: number
  vertical?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  color: '#f1f5f9',
  thickness: 1,
  vertical: false
})
</script>

<template>
  <ADivider
    :type="vertical ? 'vertical' : 'horizontal'"
    class="i-divider-wrapper"
    :style="{ backgroundColor: color, [vertical ? 'width' : 'height']: `${thickness}px` }"
  />
</template>

<style scoped lang="scss">
.i-divider-wrapper {
  margin: 0;
  border: none;
  opacity: 0.8;

  &.ant-divider-vertical {
    top: 0;
    margin: 0 12px;
  }
}
</style>
