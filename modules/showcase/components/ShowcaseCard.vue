<script setup lang="ts">
/**
 * ShowcaseCard
 * 業務邏輯層元件 (Business Layer)
 * 用於展示個別元件 Demo
 */
import ICard from '@/components/uiInterface/ICard.vue'

interface Props {
  title: string
  description?: string
  fullWidth?: boolean
}

withDefaults(defineProps<Props>(), {
  description: '',
  fullWidth: false
})
</script>

<template>
  <div
    class="showcase-card-wrapper"
    :class="{ 'full-width': fullWidth }"
  >
    <ICard
      :title="title"
      :subtitle="description"
      variant="outlined"
      class="component-card"
    >
      <div class="demo-area">
        <slot />
      </div>

      <div
        v-if="$slots.code"
        class="code-block"
      >
        <slot name="code" />
      </div>

      <div
        v-if="$slots.result"
        class="result-area"
      >
        <slot name="result" />
      </div>
    </ICard>
  </div>
</template>

<style scoped>
.showcase-card-wrapper {
  display: flex;
  flex-direction: column;
}

.showcase-card-wrapper.full-width {
  grid-column: 1 / -1;
}

.component-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.component-card :deep(.card-content) {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.demo-area {
  background: white;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #eee;
  margin-bottom: 0.75rem;
}

.code-block {
  background: #282c34;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
  line-height: 1.5;
}

.code-block :deep(pre) {
  margin: 0;
}

.code-block :deep(code) {
  color: #abb2bf;
  font-family: 'Fira Code', monospace;
}

.result-area {
  padding: 0.5rem;
  background: #f8f9fa;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  font-size: 0.9rem;
  color: #666;
  margin-top: auto;
}
</style>
