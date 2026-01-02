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
    title: productConfig.meta?.title || '松凌科技前端開發包',

    /** 標題模板 - 用於動態設定頁面標題，%s 會被替換成頁面標題
     * @example 產品列表 - 松凌科技
     */
    titleTemplate: '%s - 松凌科技',

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
        content:
          productConfig.meta?.description || '松凌科技前端開發包 - 基於 Nuxt 3 的企業級開發框架'
      },
      { name: 'author', content: '松凌科技股份有限公司' },
      { name: 'robots', content: 'index, follow' }, // SEO：允許搜尋引擎索引
      { name: 'format-detection', content: 'telephone=no' }
    ],

    // 網站圖示
    link: [
      { rel: 'icon', type: 'image/x-icon', href: productConfig.meta?.favicon || '/favicon.ico' }
    ]
  }
}
