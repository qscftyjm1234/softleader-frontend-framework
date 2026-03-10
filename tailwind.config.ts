/**
 * Tailwind CSS 樣式設定檔
 * 定義內容掃描範圍、自定義主題顏色與設計規範。
 *
 * @author Gino Huang
 * @since 2024-12-24
 * @version 1.0.0
 *
 * @changelog
 * - 2024-12-24 v1.0.0 [Gino] 初始版本
 */
import type { Config } from 'tailwindcss'
import { themeConfig } from './core/config/theme-tokens'

export default <Config>{
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './modules/**/*.{vue,js,ts}',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      colors: {
        primary: themeConfig.token.colorPrimary,
        success: themeConfig.token.colorSuccess,
        warning: themeConfig.token.colorWarning,
        error: themeConfig.token.colorError,
        info: themeConfig.token.colorInfo,
        business: themeConfig.token.colorBusiness
      }
    }
  },
  plugins: []
}
