<script setup lang="ts">
/**
 * IIcon - UI 介面層圖示
 *
 * 用途：統一的 Icon 介面，內部可使用原生 HTML 或 UI 框架
 * 未來要換 UI 框架，只需要修改這個檔案
 */

interface Props {
  icon?: string
  size?: number | string
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  icon: '',
  size: 24,
  color: 'currentColor'
})

const iconStyle = computed(() => ({
  fontSize: typeof props.size === 'number' ? `${props.size}px` : props.size,
  color: props.color
}))
</script>

<template>
  <!-- 目前使用原生 HTML / Emoji -->
  <span
    class="ui-icon"
    :style="iconStyle"
  >
    {{ icon }}
    <slot />
  </span>

  <!-- 未來換成 Vuetify 的範例 -->
  <!--
  <VIcon
    :icon="icon"
    :size="size"
    :color="color"
  >
    <slot />
  </VIcon>
  -->
</template>

<style scoped>
.ui-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}
</style>
