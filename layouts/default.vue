<script setup lang="ts">
/**
 * Default Layout - Framework Agnostic
 * 框架無關的預設佈局
 *
 * 此佈局不依賴任何 UI 框架,使用純 HTML + CSS 實現
 */
import AppHeader from '~/components/layout/AppHeader.vue'
import AppFooter from '~/components/layout/AppFooter.vue'
import AppSidebar from '~/components/layout/AppSidebar.vue'
import GlobalSnackbar from '~/components/business/GlobalSnackbar.vue'
import { useAppStore } from '~/stores/app'

const appStore = useAppStore()

// Initialize app (load config)
onMounted(() => {
  appStore.initApp()
})
</script>

<template>
  <div
    class="app-layout"
    :class="{ 'has-sidebar': appStore.config.sidebar.visible }"
  >
    <!-- Header -->
    <AppHeader />

    <!-- Sidebar -->
    <AppSidebar v-model="appStore.drawer" />

    <!-- Backdrop for mobile -->
    <div
      class="backdrop"
      :class="{ 'is-visible': appStore.drawer }"
      @click="appStore.drawer = false"
    />

    <!-- Main Content -->
    <main class="app-main">
      <slot />
    </main>

    <!-- Footer -->
    <AppFooter />

    <!-- Global Snackbar -->
    <GlobalSnackbar />
  </div>
</template>
