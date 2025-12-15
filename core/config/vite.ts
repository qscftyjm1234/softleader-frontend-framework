import type { NuxtConfig } from 'nuxt/schema'

export const viteConfig: NuxtConfig['vite'] = {
  warmup: {
    clientFiles: ['./app.vue', './pages/**/*.vue'] // 預熱常用檔案，加速啟動
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' // 使用新版編譯器
      }
    }
  }
} as any
