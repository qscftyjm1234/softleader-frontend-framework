<script setup lang="ts">
/**
 * SmartCard - 智能卡片組件
 *
 * 業務層：使用 uiInterface 層組件，提供便捷的卡片封裝
 * 遵循三層架構：不直接依賴 UI 框架
 */
import ICard from '~/components/uiInterface/ICard.vue'
import IIcon from '~/components/uiInterface/IIcon.vue'

interface Props {
  title?: string
  subtitle?: string
  text?: string
  icon?: string
  color?: string
  elevation?: number
}

withDefaults(defineProps<Props>(), {
  title: '',
  subtitle: '',
  text: '',
  icon: '📋',
  color: 'white',
  elevation: 1
})
</script>

<template>
  <ICard
    :title="title"
    :subtitle="subtitle"
    :color="color"
    :elevation="elevation"
    class="smart-card"
  >
    <!-- Icon Header -->
    <div
      v-if="icon"
      class="smart-card__icon"
    >
      <IIcon
        :icon="icon"
        :size="24"
      />
    </div>

    <!-- Text Content -->
    <p
      v-if="text"
      class="smart-card__text"
    >
      {{ text }}
    </p>

    <!-- 支援 Children 渲染 -->
    <div
      v-if="$slots.default"
      class="smart-card__content"
    >
      <slot />
    </div>
  </ICard>
</template>

<style scoped>
.smart-card {
  max-width: 600px;
  margin: 0 auto;
}

.smart-card__icon {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.smart-card__text {
  margin: 0;
  color: #555;
  line-height: 1.6;
}

.smart-card__content {
  margin-top: 1rem;
}
</style>
