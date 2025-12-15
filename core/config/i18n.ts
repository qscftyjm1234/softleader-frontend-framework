import type { NuxtConfig } from 'nuxt/schema'

export const i18nConfig: NuxtConfig['i18n'] = {
  // 基本語言清單
  locales: [
    { code: 'en', name: 'English', iso: 'en-US', file: 'en-US.json' },
    { code: 'zh', name: '中文', iso: 'zh-TW', file: 'zh-TW.json' }
  ],
  defaultLocale: 'zh',
  langDir: 'locales/' // 語言檔放置資料夾（放在專案根目錄)
}
