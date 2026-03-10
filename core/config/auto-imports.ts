import type { NuxtConfig } from 'nuxt/schema'

/**
 * 自動導入設定 (Auto-imports Config)
 *
 * 整合了以往分散的 components.ts 與 imports.ts。
 * 統一管理全域元件自動註冊與函式自動導入路徑。
 */

// 1. Components Config (全域元件自動註冊)
export const componentsConfig: NuxtConfig['components'] = [
  {
    path: '~/components/uiInterface',
    pathPrefix: false
  },
  {
    path: '~/components/uiBusiness',
    pathPrefix: false
  },
  {
    path: '~/components/layout',
    pathPrefix: false
  }
]

// 2. Imports Config (函式自動導入)
export const importsConfig: NuxtConfig['imports'] = {
  dirs: ['composables/**', 'stores/**', 'utils/**', 'repositories/**', 'core/options/**']
}
