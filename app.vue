<script setup lang="ts">
import zhTW from 'ant-design-vue/es/locale/zh_TW'
import { useAppStore } from '~/stores/app'

import { themeConfig as defaultThemeConfig } from '~/core/config/theme-tokens'

const appStore = useAppStore()

// Ant Design Vue 主題設定
const themeConfig = computed(() => ({
  ...defaultThemeConfig,
  token: {
    ...defaultThemeConfig.token,
    colorPrimary: appStore.config.theme.primaryColor
  }
}))

console.log('App initialized')
</script>

<template>
  <a-config-provider
    :locale="zhTW"
    :theme="themeConfig"
  >
    <GlobalLoading />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </a-config-provider>
</template>

<style>
/* 全域頁面切換動畫 */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* 全域視覺美化 */
::selection {
  background-color: theme('colors.indigo.100');
  color: theme('colors.indigo.900');
}

/* 自定義細捲軸 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: theme('colors.slate.200');
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: theme('colors.slate.300');
}

/* 標準化 Body 樣式 */
body {
  @apply bg-slate-50/30 text-slate-800;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
