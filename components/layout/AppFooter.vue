<script setup lang="ts">
/**
 * App Footer - Framework Agnostic
 * 框架無關的頁尾
 */
import { useAppStore } from '~/stores/app'

const appStore = useAppStore()
</script>

<template>
  <footer
    v-if="appStore.config.footer.visible"
    class="app-footer"
  >
    {{ appStore.config.footer.content }}
  </footer>
</template>
