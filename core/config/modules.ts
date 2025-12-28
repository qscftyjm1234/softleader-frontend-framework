import type { NuxtConfig } from 'nuxt/schema'

/**
 * Nuxt 模組設定
 *
 * 定義專案中「全域通用」的第三方模組
 * 這些模組無論在哪個產品 (Product) 都會被載入
 */
export const modulesConfig: NuxtConfig['modules'] = [
  // 裝置偵測 (手機/平板/桌機)
  '@nuxtjs/device',

  // 國際化多語系支援
  '@nuxtjs/i18n',

  // Vue Composition API 工具庫 (提供 useWindowSize, useStorage 等)
  '@vueuse/nuxt',

  // 狀態管理工具 (取代 Vuex)
  '@pinia/nuxt',

  // ESLint 整合 (程式碼品質檢查)
  '@nuxt/eslint'
]
