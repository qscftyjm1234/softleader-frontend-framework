<script setup lang="ts">
import { Space as ASpace } from 'ant-design-vue'

/**
 * IStack - UI 介面層佈局元件
 * 基底採用 Ant Design Vue (a-space) 理念，實現 Flexbox 佈局
 */
interface Props {
  direction?: 'horizontal' | 'vertical'
  gap?: 'small' | 'middle' | 'large' | number | [number, number]
  align?: 'start' | 'end' | 'center' | 'baseline'
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between'
  wrap?: boolean
  block?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'horizontal',
  gap: 'middle',
  align: 'center',
  wrap: false,
  block: false
})

const stackStyle = computed(() => ({
  justifyContent: props.justify
}))
</script>

<template>
  <ASpace
    :direction="direction"
    :size="gap"
    :align="align"
    :wrap="wrap"
    :class="['i-stack-wrapper', { 'is-block': block }]"
    :style="stackStyle"
  >
    <slot />
  </ASpace>
</template>

<style scoped lang="scss">
.i-stack-wrapper {
  display: flex;

  &.is-block {
    width: 100%;
    :deep(.ant-space-item) {
      width: 100%;
    }
  }
}
</style>
