import path from 'path' //
/**
 * @功能 建置、邊際nuxt3專案時，所使用之參數和模式
 * */
export default defineNuxtConfig({
  /**
   * @功能 是否需要SSR
   * */
  ssr: false,

  /**
   * @功能 直接使用此組件
   * */
  components: true,

  /**
   * @功能 控制專案編譯、打包（build）過程的設定
   * @transpile 告訴 Nuxt 哪些第三方套件需要轉譯成舊語法，避免瀏覽器不支持新語法報錯
   * */
  build: {
    transpile: ['vuetify']
  },

  /**
   * @功能 標題、meta 預設配置
   * */
  app: {
    head: {
      // # 設定網頁的標題，會顯示在瀏覽器的分頁上
      title: '全球人壽nuxt3教學網站',
      // # 設定 meta 標籤，這裡是用來描述網站的內容，對 SEO（搜尋引擎優化）
      meta: [
        { name: 'description', content: '全壽人壽，nuxt3教學網站，description' }
      ],
      // # 分頁小圖示
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.jpg' }]
    }
  },

  /**
   * @功能 全域`css`設定
   * */

  // # Nuxt 在啟動時就會把這段 CSS 插入到每個頁面裡
  css: ['vuetify/styles', '~/assets/css/main.css'],

  /**
   * @功能 Nuxt 官方和社群模組，直接掛載進vue app 實體內，全專案皆能使用無須引入
   * @device 設備類型檢測（手機、桌機、平板）
   * @i18n   國際語系控制
   * @vueuse 將VueUse整合進nuxt3中，在各頁直接無痛使用! (ueUse => 基於vue寫的一堆好用的功能 document:https://vueuse.org/functions.html#category=Browser)
   * */
  modules: [
    // `pnpm add @nuxtjs/device`
    '@nuxtjs/device', // `pnpm add @nuxtjs/i18n`
    '@nuxtjs/i18n', // `pnpm add @vueuse/nuxt`
    '@vueuse/nuxt', // `pnpm add pinia`
    // `pnpm add @pinia/nuxt`
    // 其他模組...
    '@pinia/nuxt'
    // '@nuxtjs/storybook'
  ],

  /**
   * @功能 使用@nuxtjs/i18n語系相關設置
   * @device 設備類型檢測（手機、桌機、平板）
   * */
  i18n: {
    // 基本語言清單
    locales: [
      { code: 'en', name: 'English', iso: 'en-US', file: 'en-US.json' },
      { code: 'zh', name: '中文', iso: 'zh-TW', file: 'zh-TW.json' }
    ],
    defaultLocale: 'zh',
    langDir: 'locales/' // 語言檔放置資料夾（放在專案根目錄)
  },

  /**
   * @功能 設置可auto import 資料夾
   * @注意 巢狀資料夾 (utils/string/stringToJson.ts)域設不會匯入
   * */
  imports: {
    dirs: ['utils', 'utils/string']
    // ['utils', 'utils/string'] => 針對特定資料夾
    // ['utils/**'] => 自動包含所有巢狀階層
  },

  /** 
   * @功能 /components 資料夾，將裡面的 .vue 元件自動註冊為全域元件，不需手動 import
   * @pathPrefix 是否自動將路徑資料夾名作為 prefix，預設為 true
   * @prefix 手動強制幫該資料夾內所有元件加上該名稱
   * @path 指定元件資料夾的路徑

   **/
  components: [
    { path: '~/components', pathPrefix: false },
    { path: '~/components/form/', prefix: 'Form' }
  ],

  /**
   * @功能 讓瀏覽器端也能讀到環境變數
   * @問題01 為什麼不直接在頁面用 process.env.LOG_DEBUG 就好？幹嘛還要搞 runtimeConfig？
   * @原因01 在 Nuxt 3 裡，process.env 只在「建構階段（build time）」有效，故在執行時無法改變狀態
   * @原因02 Nuxt 產生靜態網站（nuxt generate），部署到 S3、Vercel、Netlify。你部署後不能重新打包但你又想根據部署環境改用不同 API base（或某些 flag）
   * @NOTE 每次部署都重 build？	❌ 可不用
   * */
  runtimeConfig: {
    // 這裡的設定會 在瀏覽器端也能讀到（公開的）
    public: {
      logDebug: process.env.LOG_DEBUG,
      isDev: process.env.IS_DEV
    }
  },
  hooks: {
    async 'pages:extend'(pages) {
      const fs = await import('fs')
      const path = await import('path')
      
      const modulesDir = path.resolve(__dirname, 'modules')
      
      // 簡單掃描 modules 下所有 pages 資料夾
      // 這裡假設 modules/<module>/pages/<page>.vue
      if (fs.existsSync(modulesDir)) {
        const modules = fs.readdirSync(modulesDir)
        
        for (const moduleName of modules) {
          const pagesDir = path.join(modulesDir, moduleName, 'pages')
          if (fs.existsSync(pagesDir)) {
            // 遞迴掃描函式
            const scanFiles = (dir, baseDir) => {
              const files = fs.readdirSync(dir)
              for (const file of files) {
                const filePath = path.join(dir, file)
                const stat = fs.statSync(filePath)
                if (stat.isDirectory()) {
                  scanFiles(filePath, baseDir)
                } else if (file.endsWith('.vue')) {
                  // 計算相對路徑作為路由路徑
                  // e.g. /path/to/modules/auth/pages/user/list.vue -> user/list.vue
                  const relativePath = path.relative(baseDir, filePath)
                  // user/list.vue -> /user/list
                  // index.vue -> /
                  let routePath = '/' + relativePath.replace(/\\/g, '/').replace(/\.vue$/, '')
                  if (routePath.endsWith('/index')) {
                    routePath = routePath.slice(0, -6) // remove /index
                    if (routePath === '') routePath = '/'
                  }
                  
                  const name = relativePath.replace(/\\/g, '-').replace(/\//g, '-').replace(/\.vue$/, '')
                  
                  pages.push({
                    name: `${moduleName}-${name}`, // 加上 module prefix 避免衝突
                    path: routePath,
                    file: filePath
                  })
                }
              }
            }
            
            scanFiles(pagesDir, pagesDir)
          }
        }
      }
    }
  }
})
