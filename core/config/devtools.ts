import type { NuxtConfig } from 'nuxt/schema'

/**
 * Nuxt DevTools 設定
 *
 * Nuxt DevTools 是官方的開發工具，提供：
 * - 路由檢視器
 * - 元件樹狀圖
 * - 模組管理
 * - 狀態管理檢視
 *
 * 目前狀態：已啟用
 * 版本：Nuxt 3.20.2 + @nuxt/devtools 3.1.1（相容）
 *
 * @see https://devtools.nuxt.com
 */
export const devtoolsConfig: NuxtConfig['devtools'] = {
  /**
   * 是否啟用 DevTools
   *
   * - true: 開發時會顯示 DevTools 面板
   * - false: 關閉 DevTools
   */
  enabled: true // Nuxt 3 可以正常使用
}
