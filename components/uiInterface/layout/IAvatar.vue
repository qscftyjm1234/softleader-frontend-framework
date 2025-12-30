<script setup lang="ts">
/**
 * IAvatar - UI 介面層頭像
 *
 * 用途：統一的 Avatar 介面，內部可使用原生 HTML 或 UI 框架
 * 未來要換 UI 框架，只需要修改這個檔案
 */

interface Props {
  src?: string
  alt?: string
  size?: 'small' | 'medium' | 'large'
  fallbackText?: string // 當沒有圖片時顯示的文字(通常是姓名首字母)
}

const props = withDefaults(defineProps<Props>(), {
  src: '',
  alt: 'Avatar',
  size: 'medium',
  fallbackText: ''
})

// 計算尺寸
const sizeMap = {
  small: '32px',
  medium: '40px',
  large: '56px'
}

const avatarSize = computed(() => sizeMap[props.size])

// 計算 fallback 文字
const displayText = computed(() => {
  if (props.fallbackText) return props.fallbackText
  if (props.alt) return props.alt.charAt(0).toUpperCase()
  return '?'
})
</script>

<template>
  <!-- 目前使用原生 HTML -->
  <div
    class="ui-avatar"
    :class="`size-${size}`"
    :style="{ width: avatarSize, height: avatarSize }"
  >
    <img
      v-if="src"
      :src="src"
      :alt="alt"
      class="avatar-image"
    />
    <span
      v-else
      class="avatar-fallback"
    >
      {{ displayText }}
    </span>
  </div>

  <!-- 未來換成 Vuetify 的範例 -->
  <!--
  <VAvatar
    :image="src"
    :size="size"
  >
    <span v-if="!src">{{ displayText }}</span>
  </VAvatar>
  -->
</template>

<style scoped>
.ui-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
  background: #e0e0e0;
  color: #666;
  font-weight: 500;
  flex-shrink: 0;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-fallback {
  font-size: 0.9em;
  user-select: none;
}

.ui-avatar.size-small .avatar-fallback {
  font-size: 0.75rem;
}

.ui-avatar.size-medium .avatar-fallback {
  font-size: 1rem;
}

.ui-avatar.size-large .avatar-fallback {
  font-size: 1.25rem;
}
</style>
