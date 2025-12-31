<script setup lang="ts">
/**
 * 預設佈局 - 框架無關
 *
 * 此佈局不依賴任何 UI 框架，使用純 HTML + CSS 實現
 */
import AppHeader from '~/components/layout/AppHeader.vue'
import AppFooter from '~/components/layout/AppFooter.vue'
import AppSidebar from '~/components/layout/AppSidebar.vue'
import GlobalSnackbar from '~/components/uiBusiness/GlobalSnackbar.vue'
import { useAppStore } from '~/stores/app'

const appStore = useAppStore()

// 初始化應用程式 (載入設定)
onMounted(() => {
  appStore.initApp()
})
</script>

<template>
  <div
    class="app-layout"
    :class="{ 'has-sidebar': appStore.config.sidebar.visible }"
  >
    <!-- 頁首 -->
    <AppHeader />

    <!-- 側邊欄 -->
    <AppSidebar v-model="appStore.drawer" />

    <!-- 手機版遮罩 -->
    <div
      class="backdrop"
      :class="{ 'is-visible': appStore.drawer }"
      @click="appStore.drawer = false"
    />

    <!-- 主要內容 -->
    <main class="app-main">
      <slot />
    </main>

    <!-- 頁尾 -->
    <AppFooter />

    <!-- 全域通知 Snackbar -->
    <GlobalSnackbar />
  </div>
</template>
