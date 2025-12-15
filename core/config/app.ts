import type { NuxtConfig } from 'nuxt/schema'
import { productConfig } from './loader'

export const appConfig: NuxtConfig['app'] = {
  head: {
    // 設定網頁的標題，會顯示在瀏覽器的分頁上
    title: productConfig.meta?.title || '松凌科技前端架構系統',
    // 設定 meta 標籤，這裡是用來描述網站的內容，對 SEO（搜尋引擎優化）
    meta: [
      { name: 'description', content: productConfig.meta?.description || '松凌科技前端架構系統' },
      { name: 'theme-color', content: productConfig.meta?.themeColor || '#ffffff' }
    ],
    // 分頁小圖示
    link: [{ rel: 'icon', type: 'image/x-icon', href: productConfig.meta?.favicon || '/favicon.ico' }]
  }
}
