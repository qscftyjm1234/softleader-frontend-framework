import type { NuxtConfig } from 'nuxt/schema'
import { productConfig } from '../../scripts/product-loader'

/**
 * App 設定檔案
 *
 * 主要用途：
 * - 定義 APP 的基本資訊（標題、描述、圖示等）
 * - 設定 HTML <head> 標籤內容
 * - 設定 SEO 相關的 meta 標籤
 *
 * @see https://nuxt.com/docs/api/nuxt-config#app
 */
export const appConfig: NuxtConfig['app'] = {
  head: {
    /** 網頁標題 - 顯示在瀏覽器分頁上 */
    title: productConfig.meta?.title || 'Vue前端開發包系統',

    /** 標題模板 - 用於動態設定頁面標題，%s 會被替換成頁面標題
     * @example 產品列表 - Vue前端開發包系統
     */
    titleTemplate: '%s - Vue前端開發包系統',

    /** HTML 語言屬性 */
    htmlAttrs: {
      lang: 'zh-TW'
    },

    // Meta 標籤
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'description',
        content: productConfig.meta?.description || 'Vue前端開發包系統'
      },
      { name: 'author', content: 'Vue前端開發包系統' },
      { name: 'robots', content: 'index, follow' }, // SEO：允許搜尋引擎索引
      { name: 'format-detection', content: 'telephone=no' }
    ],

    // 網站圖示
    link: [
      { rel: 'icon', type: 'image/x-icon', href: productConfig.meta?.favicon || '/favicon.ico' }
    ]
  },
  /** 頁面切換動畫 */
  pageTransition: { name: 'page', mode: 'out-in' }
}
