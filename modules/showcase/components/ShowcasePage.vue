<script setup lang="ts">
/**
 * ShowcasePage
 * 業務邏輯層元件 (Business Layer)
 * 頁面標準佈局，使用 IButton 處理返回導航
 */
import IButton from '@/components/uiInterface/IButton.vue'

interface Props {
  title: string
  description?: string
  backTo?: string
  backText?: string
}

withDefaults(defineProps<Props>(), {
  description: '',
  backTo: '/showcase',
  backText: '← 返回'
})
</script>

<template>
  <div class="showcase-page">
    <div class="page-header">
      <div class="header-main">
        <NuxtLink
          v-slot="{ navigate }"
          :to="backTo"
          custom
        >
          <IButton
            variant="text"
            class="back-btn"
            @click="navigate"
          >
            {{ backText }}
          </IButton>
        </NuxtLink>
        <h1 class="page-title">{{ title }}</h1>
      </div>

      <p
        v-if="description"
        class="page-desc"
      >
        {{ description }}
      </p>

      <div
        v-if="$slots['header-extra']"
        class="header-extra"
      >
        <slot name="header-extra" />
      </div>
    </div>

    <div class="page-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.showcase-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
  color: #333;
}

.page-header {
  margin-bottom: 2rem;
}

.header-main {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.back-btn {
  margin-right: 0.5rem;
  color: #666;
}

.page-title {
  font-size: 2rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
}

.page-desc {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  margin: 0.5rem 0 0;
}

.header-extra {
  margin-top: 1rem;
}
</style>
