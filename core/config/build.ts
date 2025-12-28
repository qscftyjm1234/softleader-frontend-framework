import type { NuxtConfig } from 'nuxt/schema'

/**
 * 建置設定
 *
 * 控制 Nuxt 如何編譯和打包你的應用程式
 *
 * @see https://nuxt.com/docs/api/nuxt-config#build
 */
export const buildConfig: NuxtConfig['build'] = {
  /**
   * 需要轉譯的套件清單
   *
   * 某些第三方 UI 框架（如 Vuetify）需要特別處理才能在 Nuxt 中正常運作
   * 這裡指定的套件會被 Nuxt 重新編譯
   */
  transpile: ['vuetify']
}
