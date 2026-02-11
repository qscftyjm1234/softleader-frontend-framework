import { scanModulePages } from './router/routes-scanner'
import { productConfig } from './scripts/product-loader'
import { runtimeConfig as projectRuntimeConfig } from './core/config/runtime'
import { i18nConfig } from './core/config/i18n'
import { appConfig } from './core/config/app'
import { securityConfig } from './core/config/security'
import { buildConfig } from './core/config/build'
import { importsConfig } from './core/config/imports'
import { componentsConfig } from './core/config/components'
import { modulesConfig } from './core/config/modules'
import { cssConfig } from './core/config/css'
import { typescriptConfig } from './core/config/typescript'
import { viteConfig } from './core/config/vite'

// Force reload for new routes
// 強制重新載入 Nuxt 設定以修復自動導入 (Auto-imports)
import { nitroConfig } from './core/config/nitro'

console.table({
  專案名稱: productConfig.meta?.title || 'N/A',
  執行環境: process.env.NODE_ENV || 'development',
  產品設定: process.env.PRODUCT_CONFIG || 'default',
  'API 基礎網址': process.env.VITE_API_BASE_URL || 'N/A',
  啟用模組: productConfig.modules.join(', ')
})

/**
 * @功能 建置、編譯 nuxt3 專案時，所使用之參數和模式
 * */
export default defineNuxtConfig({
  /**
   * @功能 是否需要 SSR
   * */

  ssr: false,

  /**
   * @功能 控制專案編譯、打包 (build) 過程的設定
   * */
  build: buildConfig,

  /**
   * @功能 標題、meta 預設設定
   * */
  app: appConfig,

  /**
   * @功能 全域 `css` 設定
   * */
  css: cssConfig,

  /**
   * @功能 Nuxt 官方和社群模組
   * */
  modules: modulesConfig,

  /**
   * @功能 使用 @nuxtjs/i18n 語系相關設定
   * */
  i18n: modulesConfig?.includes('@nuxtjs/i18n') ? i18nConfig : undefined,

  /**
   * @功能 設定可自動導入 (auto import) 的資料夾
   * */
  imports: importsConfig,

  /**
   * @功能 /components 資料夾，將裡面的 .vue 元件自動註冊為全域元件
   * */
  components: componentsConfig,

  /**
   * @功能 執行時設定 (Runtime Config)
   * @description 注入環境變數與公開設定 (public)
   */
  runtimeConfig: projectRuntimeConfig,

  /**
   * @功能 路由規則與安全性 Header 設定
   */
  routeRules: securityConfig,

  /**
   * @功能 TypeScript 設定
   * @description 包含嚴格模式與型別檢查
   */
  typescript: typescriptConfig,

  /**
   * @功能 Vite 建置優化
   * @description 包含預熱與 CSS 編譯器設定
   */
  vite: viteConfig,

  /**
   * @功能 Nitro (Server) 優化
   * @description 包含資源壓縮設定
   */
  nitro: nitroConfig,

  hooks: {
    // 這是 Nuxt 的 Hook，讓我們可以在 Nuxt 建立路由表之前，動態插入自定義的頁面
    async 'pages:extend'(pages) {
      // 根據設定檔中啟用的 modules 進行掃描
      const enabledModules = productConfig.modules || []

      // 呼叫外部函式進行掃描與路由產生
      scanModulePages(pages, enabledModules, __dirname)
    }
  },

  experimental: {
    appManifest: false
  },

  compatibilityDate: '2026-02-04'
})
