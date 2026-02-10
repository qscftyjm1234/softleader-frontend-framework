import type { NuxtConfig } from 'nuxt/schema'

/**
 * CSS 設定
 *
 * 定義全域 CSS 檔案的載入順序
 * 這些 CSS 會在所有頁面中自動載入
 *
 * 載入順序很重要：
 * 1. 先載入框架樣式（Vuetify）
 * 2. 再載入自訂樣式（main.css）
 *
 * 這樣可以確保自訂樣式能覆蓋框架的預設樣式
 *
 * @see https://nuxt.com/docs/api/nuxt-config#css
 */
export const cssConfig: NuxtConfig['css'] = [
  // 'vuetify/styles', // Vuetify 框架樣式（必須在前）
  '~/assets/css/main.css' // 自訂全域樣式（可覆蓋 Vuetify）
]
