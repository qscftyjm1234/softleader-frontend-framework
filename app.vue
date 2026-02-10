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
