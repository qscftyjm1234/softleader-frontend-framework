<script setup lang="ts">
import { computed } from 'vue'
import { Avatar as AAvatar } from 'ant-design-vue'
import IIcon from './IIcon.vue'

/**
 * IAvatar - UI 介面層頭像/圖示容器
 * 基底更換為 Ant Design Vue (a-avatar)
 */

interface Props {
  size?: number | string
  color?: string
  rounded?: boolean | string
  icon?: string
  image?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 40,
  color: '#e0e0e0',
  rounded: true,
  icon: '',
  image: ''
})

const shape = computed(() => {
  if (props.rounded === false) return 'square'
  return 'circle'
})

const avatarStyle = computed(() => {
  const styles: any = {}
  if (!props.image && props.color) {
    styles.backgroundColor = props.color
  }
  return styles
})
</script>

<template>
  <AAvatar
    :size="size"
    :src="image"
    :shape="shape"
    :style="avatarStyle"
    class="i-avatar-wrapper"
  >
    <template
      v-if="icon"
      #icon
    >
      <IIcon :icon="icon" />
    </template>
    <slot />
  </AAvatar>
</template>

<style scoped lang="scss">
.i-avatar-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);

  :deep(.ant-avatar-string) {
    font-weight: 700;
  }
}
</style>
