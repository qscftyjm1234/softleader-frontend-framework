import type { NuxtConfig } from 'nuxt/schema'

export const buildConfig: NuxtConfig['build'] = {
  transpile: ['vuetify']
}

export const importsConfig: NuxtConfig['imports'] = {
  dirs: ['utils/global']
  // `utils/global`：全域工具，自動引入 (無需 import)
  // `utils` 根目錄：Nuxt 預設強制自動引入
  // `utils/xxx` (子目錄)：預設不會引入，需手動 import
}

export const componentsConfig: NuxtConfig['components'] = [
  // 1. 一般元件：去前綴
  // 讓 `components/user/Profile.vue` 變成 `<Profile />` 而不是 `<UserProfile />`
  // 優點：名稱簡短；缺點：需注意不同資料夾下的同名檔案衝突
  { path: '~/components', pathPrefix: false },

  // 2. 表單元件：強制前綴 Form
  // 讓 `components/form/Input.vue` 變成 `<FormInput />`
  // 優點：避免與 HTML 原生標籤衝突，且語意明確
  { path: '~/components/form/', prefix: 'Form' }
]
