import type { NuxtConfig } from 'nuxt/schema'

export const experimentalConfig: NuxtConfig['experimental'] = {
  payloadExtraction: false, // 關閉 payload 提取 (視需求開啟)
  viewTransition: true, // 開啟 View Transitions API (頁面切換動畫)
  typedPages: true // 讓路由有型別提示 (navigateTo('/about') 會檢查)
}
