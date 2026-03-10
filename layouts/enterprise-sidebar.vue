<script setup lang="ts">
/**
 * 企業級側邊欄佈局範本
 *
 * 整合了核心側邊欄資料流 (core/sidebar)
 * 具備高品質的視覺效果、響應式設計與全域通知系統
 */
import IDrawer from '~/components/uiInterface/layout/IDrawer.vue'
import AppSidebarItem from '~/components/layout/AppSidebarItem.vue'
import PortalHeader from '~/components/layout/PortalHeader.vue'
import GlobalSnackbar from '~/components/uiBusiness/GlobalSnackbar.vue'
import GlobalModal from '~/components/uiBusiness/GlobalModal.vue'
import IApp from '~/components/uiInterface/IApp.vue'
import { useSidebarStore } from '~/stores/sidebar'
import { useUserStore } from '~/stores/user'

const sidebarStore = useSidebarStore()
const userStore = useUserStore()

const drawer = ref(true)

// 監聽權限變化以重新產生側邊欄
watch(
  () => userStore.permissions,
  (newPermissions) => {
    sidebarStore.generate(newPermissions)
  },
  { immediate: true }
)
</script>

<template>
  <IApp
    class="enterprise-layout bg-slate-50 min-h-screen text-slate-800 font-sans relative overflow-x-hidden"
  >
    <!-- Ambient Lighting Decorations -->
    <div
      class="fixed top-0 right-0 w-[500px] h-[500px] bg-blue-50/40 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none z-0"
    ></div>
    <div
      class="fixed bottom-0 left-0 w-[400px] h-[400px] bg-white/40 rounded-full blur-[80px] -ml-20 -mb-20 pointer-events-none z-0"
    ></div>

    <div class="relative z-10 flex min-h-screen">
      <!-- 側邊欄元件 (模擬 Vuetify Navigation Drawer) -->
      <IDrawer
        v-model="drawer"
        permanent
        width="280px"
        class="border-r border-slate-200/50 bg-white/80 backdrop-blur-xl"
      >
        <div class="flex flex-col h-full">
          <!-- Logo 區區 -->
          <div class="h-20 flex items-center px-8 border-b border-slate-100/50">
            <div
              class="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20"
            >
              <span class="text-white font-black text-xl">S</span>
            </div>
            <div class="ml-4">
              <h1 class="text-lg font-black text-slate-900 leading-tight tracking-tight">
                後台管理系統
              </h1>
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">
                Enterprise Suite
              </p>
            </div>
          </div>

          <!-- 選單內容 -->
          <nav class="flex-1 px-4 py-8 overflow-y-auto space-y-1 custom-scrollbar">
            <div class="px-4 mb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              系統導覽
            </div>
            <AppSidebarItem
              v-for="item in sidebarStore.items"
              :key="item.label"
              :item="item"
            />
          </nav>

          <!-- 底部資訊 -->
          <div class="p-6 border-t border-slate-100/50">
            <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p class="text-[11px] text-slate-400 font-bold mb-1">目前版本</p>
              <p class="text-xs text-slate-600 font-black">v2.0.4-Build</p>
            </div>
          </div>
        </div>
      </IDrawer>

      <div class="flex-1 flex flex-col min-w-0">
        <!-- 頁首元件 (模擬 Vuetify App Bar) -->
        <PortalHeader
          class="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-slate-200/50"
        />

        <!-- 主要內容區區 (模擬 Vuetify Main) -->
        <main class="flex-1 p-6 md:p-10">
          <slot />
        </main>

        <!-- 頁尾 -->
        <footer class="py-10 px-6 border-t border-slate-100/50 text-center">
          <p class="text-xs text-slate-400 font-bold tracking-tight">
            Copyright © 2026 Softleader Enterprise Desktop. All rights reserved.
          </p>
        </footer>
      </div>
    </div>

    <!-- 全域元件 -->
    <GlobalSnackbar />
    <GlobalModal />
  </IApp>
</template>

<style scoped>
.enterprise-layout {
  display: flex;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}
</style>
