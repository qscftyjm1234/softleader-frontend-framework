<script setup lang="ts">
/**
 * ShowcaseAlert
 * 業務邏輯層元件 (Business Layer)
 * 封裝 IAlert 用於特定展示用途
 */
import IAlert from '@/components/uiInterface/IAlert.vue'

interface Props {
  title?: string
  type?: 'info' | 'success' | 'warning' | 'error'
}

withDefaults(defineProps<Props>(), {
  title: '',
  type: 'info'
})
</script>

<template>
  <IAlert
    :title="title"
    :type="type"
    variant="tonal"
  >
    <slot />
  </IAlert>
</template>
