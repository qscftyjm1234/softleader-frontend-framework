import fs from 'node:fs'
import path from 'node:path'
import type { NuxtConfig } from 'nuxt/schema'

/**
 * 檢查套件是否已安裝 (存在於 package.json)
 * @param name
 */
const isInstalled = (name: string) => {
  try {
    const pkgPath = path.resolve(process.cwd(), 'package.json')
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
    return !!(pkg.dependencies?.[name] || pkg.devDependencies?.[name])
  } catch {
    return false
  }
}

/**
 * Nuxt 模組設定
 *
 * 定義專案中「全域通用」的第三方模組
 * 這些模組無論在哪個產品 (Product) 都會被載入
 */
export const modulesConfig: NuxtConfig['modules'] = [
  // 裝置偵測 (手機/平板/桌機)
  isInstalled('@nuxtjs/device') && '@nuxtjs/device',

  // 國際化多語系支援
  isInstalled('@nuxtjs/i18n') && '@nuxtjs/i18n',

  // 狀態管理工具 (取代 Vuex)
  isInstalled('@pinia/nuxt') && '@pinia/nuxt',

  // ESLint 整合 (程式碼品質檢查)
  isInstalled('@nuxt/eslint') && '@nuxt/eslint',

  // Ant Design Vue 整合
  isInstalled('@ant-design-vue/nuxt') && '@ant-design-vue/nuxt',

  // Tailwind CSS 整合
  isInstalled('@nuxtjs/tailwindcss') && '@nuxtjs/tailwindcss',

  // 圖示模組
  isInstalled('@nuxt/icon') && '@nuxt/icon',

  // 字體模組
  isInstalled('@nuxt/fonts') && '@nuxt/fonts'
].filter(Boolean) as string[]
