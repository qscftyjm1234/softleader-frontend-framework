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
