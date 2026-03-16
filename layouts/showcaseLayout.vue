<script setup lang="ts">
import IIcon from '~/components/uiInterface/IIcon.vue'
import { useBreadcrumbs } from '~/composables/useBreadcrumbs'

const { breadcrumbs } = useBreadcrumbs()
</script>

<template>
  <div
    class="min-h-screen bg-slate-50 text-slate-900 font-sans flex selection:bg-blue-500/20 font-['Inter',sans-serif]"
  >
    <!-- Permanent App Sidebar (Desktop) -->
    <aside
      class="w-64 border-r border-slate-200/60 bg-white flex-col hidden lg:flex shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-30 relative"
    >
      <div class="h-16 flex items-center px-6 border-b border-slate-100 relative">
        <div class="flex items-center gap-3">
          <div
            class="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30"
          >
            <IIcon
              icon="mdi-hexagon-multiple-outline"
              size="18"
              class="text-white"
            />
          </div>
          <div>
            <span class="font-black text-sm tracking-tight text-slate-900 block leading-tight">
              Vue前端開發包系統
            </span>
            <span class="text-[10px] text-slate-400 font-black tracking-widest uppercase">
              DevTraining Pro
            </span>
          </div>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto px-4 py-8 space-y-8 sidebar-scroll">
        <div>
          <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2 mb-4">
            開發包系統導航
          </div>
          <nav class="space-y-1">
            <NuxtLink
              to="/showcase/dashboard"
              class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-blue-600 font-medium text-sm transition-colors group"
              active-class="bg-blue-50/80 text-blue-700 font-semibold border-blue-100 shadow-sm"
            >
              <IIcon
                icon="mdi-view-dashboard-outline"
                size="18"
                class="text-slate-500 group-hover:text-blue-600 group-[.router-link-active]:text-blue-600"
              />
              總覽儀表板
            </NuxtLink>
            <NuxtLink
              to="/showcase"
              class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-blue-600 font-medium text-sm transition-colors group"
              active-class="bg-blue-50/80 text-blue-700 font-semibold border-blue-100 shadow-sm"
            >
              <IIcon
                icon="mdi-book-open-page-variant-outline"
                size="18"
                class="text-slate-500 group-hover:text-blue-500 group-[.router-link-active]:text-blue-600"
              />
              核心課程模組
            </NuxtLink>
            <a
              href="#"
              class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-blue-600 font-medium text-sm transition-colors group"
            >
              <IIcon
                icon="mdi-certificate-outline"
                size="18"
                class="group-hover:text-blue-500 transition-colors"
              />
              能力認證
            </a>
          </nav>
        </div>

        <div>
          <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2 mb-4">
            內部開發工具
          </div>
          <nav class="space-y-1">
            <NuxtLink
              to="/showcase/component-course"
              class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-blue-600 font-medium text-sm transition-colors group"
            >
              <IIcon
                icon="mdi-puzzle-outline"
                size="18"
                class="group-hover:text-blue-500 transition-colors"
              />
              UI 組件大廳
            </NuxtLink>
            <a
              href="#"
              class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-blue-600 font-medium text-sm transition-colors group"
            >
              <IIcon
                icon="mdi-github"
                size="18"
                class="group-hover:text-blue-500 transition-colors"
              />
              Git 原始碼庫
            </a>
            <a
              href="#"
              class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-blue-600 font-medium text-sm transition-colors group"
            >
              <IIcon
                icon="mdi-api"
                size="18"
                class="group-hover:text-blue-500 transition-colors"
              />
              API 介接文件
            </a>
          </nav>
        </div>
      </div>

      <div class="p-4 border-t border-slate-100 bg-slate-50/50">
        <div
          class="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white border border-transparent hover:border-slate-200 hover:shadow-sm cursor-pointer transition-all group"
        >
          <div
            class="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center"
          >
            <span class="text-[11px] font-black text-slate-600 tracking-wider">繁中</span>
          </div>
          <div class="flex-1 min-w-0">
            <div
              class="text-sm font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors"
            >
              管理員登入中
            </div>
            <div class="text-[11px] text-slate-500 truncate font-medium">系統架構師權限</div>
          </div>
          <IIcon
            icon="mdi-unfold-more-vertical"
            size="16"
            class="text-slate-400 group-hover:text-slate-700 transition-colors"
          />
        </div>
      </div>
    </aside>

    <!-- Main Workspace Area -->
    <main class="flex-1 flex flex-col h-screen overflow-hidden bg-slate-50 relative">
      <!-- Ambient Background Glows -->
      <div
        class="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"
      ></div>
      <div
        class="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none"
      ></div>

      <!-- App Header -->
      <header
        class="h-16 flex items-center justify-between px-6 md:px-10 border-b border-slate-200/60 bg-white/80 backdrop-blur-md sticky top-0 z-20 shadow-sm"
      >
        <!-- Breadcrumbs -->
        <div class="flex items-center gap-2 text-sm text-slate-500 font-medium">
          <template
            v-for="(crumb, index) in breadcrumbs"
            :key="crumb.to"
          >
            <!-- Separator (shown before items except the first one) -->
            <IIcon
              v-if="index > 0"
              icon="mdi-chevron-right"
              size="16"
              class="text-slate-300"
            />

            <!-- Last item (Current Page) -->
            <span
              v-if="crumb.current"
              class="text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200/60 font-semibold shadow-sm"
            >
              {{ crumb.label }}
            </span>

            <!-- Home Icon for the first item if it's "Home" -->
            <NuxtLink
              v-else-if="index === 0"
              :to="crumb.to"
              class="hover:text-slate-800 transition-colors flex items-center"
            >
              <IIcon
                icon="mdi-home-outline"
                size="16"
              />
            </NuxtLink>

            <!-- Regular Link items -->
            <NuxtLink
              v-else
              :to="crumb.to"
              class="hover:text-slate-800 cursor-pointer transition-colors"
            >
              {{ crumb.label }}
            </NuxtLink>
          </template>
        </div>

        <div class="flex items-center gap-5">
          <!-- Command Palette Mock -->
          <div class="relative hidden md:block group">
            <IIcon
              icon="mdi-magnify"
              size="16"
              class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
            />
            <input
              type="text"
              placeholder="搜尋全站課程與模組 (AI 驅動)..."
              class="bg-slate-50 border border-slate-200/80 rounded-full pl-10 pr-4 py-2 text-sm font-medium text-slate-700 focus:outline-none focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all w-[320px] placeholder:text-slate-400 shadow-inner"
            />
            <div
              class="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-60 group-focus-within:opacity-0 transition-opacity"
            >
              <span
                class="text-[10px] font-black uppercase tracking-widest border border-slate-200 text-slate-500 px-1.5 py-0.5 rounded bg-white shadow-sm"
              >
                Ctrl
              </span>
              <span
                class="text-[10px] font-black uppercase tracking-widest border border-slate-200 text-slate-500 px-1.5 py-0.5 rounded bg-white shadow-sm"
              >
                K
              </span>
            </div>
          </div>

          <div class="flex items-center gap-2 border-l border-slate-200 pl-5">
            <button
              class="w-9 h-9 rounded-full border border-transparent hover:border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:shadow-sm transition-all active:scale-95"
            >
              <IIcon
                icon="mdi-help-circle-outline"
                size="18"
              />
            </button>
            <button
              class="w-9 h-9 rounded-full border border-transparent hover:border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:shadow-sm transition-all active:scale-95 relative"
            >
              <IIcon
                icon="mdi-bell-outline"
                size="18"
              />
              <span
                class="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-white"
              ></span>
            </button>
          </div>
        </div>
      </header>

      <!-- Viewport Slot -->
      <div
        class="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 relative z-10 custom-scrollbar flex flex-col justify-between h-auto min-h-full"
      >
        <div>
          <slot />
        </div>

        <!-- Global Minimal Footer -->
        <footer class="pt-20 pb-4 text-center mt-auto">
          <div class="text-[11px] font-medium text-slate-400">
            Copyright &copy; 2026 Softleader. All rights reserved.
          </div>
        </footer>
      </div>
    </main>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.sidebar-scroll::-webkit-scrollbar {
  width: 4px;
}
.sidebar-scroll::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
</style>
