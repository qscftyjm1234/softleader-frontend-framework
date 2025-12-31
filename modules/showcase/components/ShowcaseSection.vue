<script setup lang="ts">
/**
 * ShowcaseSection
 * 業務邏輯層元件 (Business Layer)
 * 使用 ICard 封裝展示區塊
 */
import ICard from '@/components/uiInterface/ICard.vue'

interface Props {
  title?: string
  icon?: string
}

defineProps<Props>()
</script>

<template>
  <div class="showcase-section-wrapper">
    <ICard
      :title="title"
      :subtitle="icon ? undefined : undefined"
      variant="outlined"
      class="section-card"
    >
      <slot />
    </ICard>
  </div>
</template>

<style scoped>
.showcase-section-wrapper {
  margin-bottom: 2rem;
}

/* 覆寫 ICard 標題樣式以符合設計 */
.section-card :deep(.card-header) {
  background: #fafafa;
  border-bottom: 1px solid #e0e0e0;
}

.section-card :deep(.card-title) {
  font-size: 1.25rem;
  color: #2c3e50;
}
</style>
