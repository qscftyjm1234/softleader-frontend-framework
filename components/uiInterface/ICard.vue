<script setup lang="ts">
/**
 * ICard - UI 介面層卡片
 *
 * 用途：統一的 Card 介面，內部可使用原生 HTML 或 UI 框架
 * 未來要換 UI 框架，只需要修改這個檔案
 */

interface Props {
  title?: string
  subtitle?: string
  elevation?: number
  color?: string
  variant?: 'elevated' | 'flat' | 'outlined'
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  subtitle: '',
  elevation: 1,
  color: 'white',
  variant: 'elevated'
})

const cardClass = computed(() => ({
  [`variant-${props.variant}`]: true
}))

const cardStyle = computed(() => ({
  backgroundColor: props.color,
  boxShadow:
    props.variant === 'elevated' && props.elevation > 0
      ? `0 ${props.elevation}px ${props.elevation * 2}px rgba(0, 0, 0, 0.1)`
      : 'none'
}))
</script>

<template>
  <!-- 目前使用原生 HTML -->
  <div
    class="ui-card"
    :class="cardClass"
    :style="cardStyle"
  >
    <div
      v-if="title || subtitle || $slots.header"
      class="card-header"
    >
      <slot name="header">
        <h3
          v-if="title"
          class="card-title"
        >
          {{ title }}
        </h3>
        <p
          v-if="subtitle"
          class="card-subtitle"
        >
          {{ subtitle }}
        </p>
      </slot>
    </div>
    <div class="card-content">
      <slot />
    </div>
  </div>

  <!-- 未來換成 Vuetify 的範例 -->
  <!--
  <VCard
    :title="title"
    :subtitle="subtitle"
    :elevation="elevation"
    :color="color"
    :variant="variant"
  >
    <slot />
  </VCard>
  -->
</template>

<style scoped>
.ui-card {
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.ui-card.variant-outlined {
  border: 1px solid #e0e0e0;
  box-shadow: none !important;
}

.ui-card.variant-flat {
  box-shadow: none !important;
}

.card-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f0f0f0;
}

.card-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
}

.card-subtitle {
  margin: 0.25rem 0 0 0;
  font-size: 0.875rem;
  color: #7f8c8d;
}

.card-content {
  padding: 1.5rem;
}
</style>
