<script setup lang="ts">
/**
 * 應用程式頁首 - 使用三層架構
 * 業務層：整合 Store、子元件
 * UI 層：使用 IAppBar (可替換 UI 框架)
 */
import { useAppStore } from '~/stores/app'
import HeaderBreadcrumbs from '~/components/layout/header/HeaderBreadcrumbs.vue'
import HeaderSearch from '~/components/layout/header/HeaderSearch.vue'
import HeaderNotifications from '~/components/layout/header/HeaderNotifications.vue'
import HeaderUserMenu from '~/components/layout/header/HeaderUserMenu.vue'
import HeaderActions from '~/components/layout/header/HeaderActions.vue'
import IIcon from '~/components/uiInterface/IIcon.vue'

const appStore = useAppStore()
</script>

<template>
  <header
    v-if="appStore.config.header.visible"
    class="fixed top-0 right-0 left-0 lg:left-64 h-14 z-[40] bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.02)] transition-all duration-300"
  >
    <div class="flex items-center h-full px-4 gap-4">
      <!-- 手機版選單切換 -->
      <button
        class="lg:hidden p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 active:scale-95 transition-all duration-300"
        aria-label="Toggle navigation"
        @click="appStore.toggleDrawer"
      >
        <IIcon
          icon="mdi-menu"
          size="24"
        />
      </button>

      <div class="flex-1 flex items-center justify-between">
        <!-- 麵包屑導航 -->
        <HeaderBreadcrumbs class="hidden sm:block" />

        <div class="flex-1" />

        <!-- 右側操作區 -->
        <div class="flex items-center gap-1 sm:gap-2">
          <!-- 全域搜尋 -->
          <HeaderSearch />

          <!-- 通用頁首動作 -->
          <HeaderActions />

          <!-- 通知中心 -->
          <HeaderNotifications />

          <div class="w-px h-6 bg-slate-200 mx-2 hidden sm:block"></div>

          <!-- 使用者選單 -->
          <HeaderUserMenu />
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Scoped styles replaced by Tailwind CSS */
</style>
