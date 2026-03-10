<script setup lang="ts">
import { Space as ASpace } from 'ant-design-vue'

/**
 * IChipGroup - UI 介面層 Chip 群組容器
 * 基底更換為 Ant Design Vue (a-space)
 */

interface Props {
  gap?: string | number
  wrap?: boolean
}

withDefaults(defineProps<Props>(), {
  gap: 8,
  wrap: true
})
</script>

<template>
  <ASpace
    :size="gap"
    :wrap="wrap"
    class="i-chip-group-wrapper"
  >
    <slot />
  </ASpace>
</template>

<style scoped lang="scss">
.i-chip-group-wrapper {
  max-width: 100%;
}
</style>
