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
    class="app-layout bg-slate-50 min-h-screen text-slate-800 font-sans relative overflow-x-hidden"
    :class="{ 'has-sidebar': appStore.config.sidebar.visible }"
  >
    <!-- Ambient Lighting Decorations -->
    <div
      class="fixed top-0 right-0 w-[500px] h-[500px] bg-white/40 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none z-0"
    ></div>
    <div
      class="fixed top-60 left-0 w-[400px] h-[400px] bg-blue-50/50 rounded-full blur-[80px] -ml-20 pointer-events-none z-0"
    ></div>

    <div class="relative z-10 flex flex-col min-h-screen">
      <!-- 頁首 -->
      <AppHeader />

      <div class="flex flex-1 pt-14">
        <!-- 側邊欄 -->
        <AppSidebar v-model="appStore.drawer" />

        <!-- 手機版遮罩 -->
        <div
          class="backdrop"
          :class="{ 'is-visible': appStore.drawer }"
          @click="appStore.drawer = false"
        />

        <!-- 主要內容 -->
        <main class="app-main flex-1 w-full max-w-full overflow-hidden">
          <slot />
        </main>
      </div>

      <!-- 頁尾 -->
      <AppFooter />
    </div>

    <!-- 全域通知 Snackbar -->
    <GlobalSnackbar />
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 23, 42, 0.4); /* slate-900 with opacity */
  backdrop-filter: blur(4px);
  z-index: 40;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.backdrop.is-visible {
  opacity: 1;
  pointer-events: auto;
}

@media (min-width: 1024px) {
  .backdrop {
    display: none;
  }
}
</style>
