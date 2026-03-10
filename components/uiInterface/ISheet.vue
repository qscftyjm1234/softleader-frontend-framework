<script setup lang="ts">
/**
 * ISheet - UI 介面層容器
 *
 * 用途：統一的 Sheet/Container 介面，採用 Tailwind CSS 實作
 */

interface Props {
  color?: string
  rounded?: boolean | string
  elevation?: number
  border?: boolean
  padding?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  color: 'white',
  rounded: false,
  elevation: 0,
  border: false,
  padding: '1rem'
})

const sheetClasses = computed(() => {
  const baseParams = 'transition-all duration-300 ease-in-out'
  const roundedParams = props.rounded === true ? 'rounded-2xl' : '' // 若為 true，預設為 rounded-2xl
  const borderParams = props.border ? 'border border-slate-100' : ''
  const elevationParams = props.elevation > 0 ? 'shadow-[0_8px_30px_rgb(0,0,0,0.04)]' : ''

  return `${baseParams} ${roundedParams} ${borderParams} ${elevationParams}`
})

const sheetStyle = computed(() => {
  const dynamicStyle: any = {
    backgroundColor: props.color,
    padding: typeof props.padding === 'number' ? `${props.padding}px` : props.padding
  }
  if (typeof props.rounded === 'string') {
    dynamicStyle.borderRadius = props.rounded
  }
  // 上方已透過 Tailwind 套用柔和的複合陰影，標準化任意的海拔高度 (elevation) 效果
  return dynamicStyle
})
</script>

<template>
  <div
    :class="sheetClasses"
    :style="sheetStyle"
  >
    <slot />
  </div>
</template>

<style scoped>
/* Scoped 樣式已替換為 Tailwind CSS */
</style>
