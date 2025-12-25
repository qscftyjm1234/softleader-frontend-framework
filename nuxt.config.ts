import { scanModulePages } from './build/routes'
import { productConfig } from './core/config/loader'
import { runtimeConfig as projectRuntimeConfig } from './core/config/runtime'
import { i18nConfig } from './core/config/i18n'
import { appConfig } from './core/config/app'
import { securityConfig } from './core/config/security'
import { buildConfig, importsConfig, componentsConfig } from './core/config/build'
import { modulesConfig } from './core/config/modules'
import { cssConfig } from './core/config/css'
import { typescriptConfig } from './core/config/typescript'
import { viteConfig } from './core/config/vite'
import { experimentalConfig } from './core/config/experimental'
import { devtoolsConfig, telemetryConfig } from './core/config/devtools'
import { nitroConfig } from './core/config/nitro'

console.table({
  'Project Name': productConfig.meta?.title || 'N/A',
  Environment: process.env.NODE_ENV || 'development',
  'Product Config': process.env.PRODUCT_CONFIG || 'default',
  'API Base URL': process.env.VITE_API_BASE_URL || 'N/A',
  'Enabled Modules': productConfig.modules.join(', ')
})

/**
 * @功能 建置、邊際nuxt3專案時，所使用之參數和模式
 * */
export default defineNuxtConfig({
  /**
   * @功能 是否需要SSR
   * */
  ssr: false,

  /**
   * @功能 控制專案編譯、打包（build）過程的設定
   * */
  build: buildConfig,

  /**
   * @功能 標題、meta 預設配置
   * */
  app: appConfig,

  /**
   * @功能 全域`css`設定
   * */
  css: cssConfig,

  /**
   * @功能 Nuxt 官方和社群模組
   * */
  modules: modulesConfig,

  /**
   * @功能 使用@nuxtjs/i18n語系相關設置
   * */
  i18n: i18nConfig,

  /**
   * @功能 設置可auto import 資料夾
   * */
  imports: importsConfig,

  /**
   * @功能 /components 資料夾，將裡面的 .vue 元件自動註冊為全域元件
   **/
  components: componentsConfig,

  /**
   * @功能 運行時配置
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
   * @功能 實驗性功能
   * @description 包含 Typed Pages 與 View Transitions
   */
  experimental: experimentalConfig,

  /**
   * @功能 開發工具設定
   */
  devtools: devtoolsConfig,

  /**
   * @功能 數據收集設定
   */
  telemetry: telemetryConfig,

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
  }
})
