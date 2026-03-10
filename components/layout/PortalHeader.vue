<script setup lang="ts">
import HeaderUserMenu from '~/components/layout/header/HeaderUserMenu.vue'
import IIcon from '@/components/uiInterface/IIcon.vue'

const config = useRuntimeConfig()
const appName = config.public.app.productConfig?.meta?.title || 'Vue前端開發包系統'

// 簡單導航
const navItems = [
  { label: '首頁', to: '/' },
  { label: '組件遊樂場', to: '/showcase/component-playground' },
  { label: '開發指南', to: '/showcase/development' },
  { label: '模組', to: '/showcase' }
]
</script>

<template>
  <header
    class="fixed top-0 left-0 w-full h-14 z-[100] bg-white/70 backdrop-blur-xl border-b border-slate-200/50 transition-all duration-300 shadow-sm"
  >
    <div class="max-w-[1500px] mx-auto h-full px-8 flex items-center justify-between">
      <div class="flex items-center gap-10">
        <!-- Logo / 品牌 -->
        <NuxtLink
          to="/"
          class="flex items-center gap-2.5 group transition-all"
        >
          <div
            class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform"
          >
            <IIcon
              size="18"
              color="white"
              icon="mdi-hexagon-multiple"
            />
          </div>
          <span class="text-lg font-black tracking-tight text-slate-900">{{ appName }}</span>
        </NuxtLink>

        <!-- 導覽 -->
        <nav class="hidden md:flex items-center gap-1">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="px-4 py-1.5 rounded-lg text-[13px] font-bold text-slate-500 hover:text-blue-600 hover:bg-slate-50 transition-all"
            active-class="text-blue-600 bg-blue-50/50 shadow-sm"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
      </div>

      <!-- 右側操作區 -->
      <div class="flex items-center gap-5">
        <div class="h-4 w-px bg-slate-200"></div>
        <div class="flex items-center">
          <a
            href="https://github.com/example/repo"
            target="_blank"
            class="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all"
          >
            <IIcon
              icon="mdi-github"
              size="20"
            />
          </a>
        </div>

        <!-- 使用者選單 -->
        <div class="flex items-center shrink-0">
          <HeaderUserMenu />
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Scoped styles are largely replaced by Tailwind classes above */
</style>
