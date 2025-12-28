import { defineStore } from 'pinia'
import { defaultFeatures } from '~/core/config/features'

/**
 * Feature Store - 管理功能開關配置
 *
 * 提供集中式的功能開關管理，支援熱重載
 */
export const useFeatureStore = defineStore('features', () => {
  // State
  const config = ref({ ...defaultFeatures })

  /**
   * 重新載入配置（用於熱重載）
   * @param newConfig - 新的配置物件
   */
  function reloadConfig(newConfig?: typeof defaultFeatures) {
    if (newConfig) {
      // 使用新模組的配置
      Object.assign(config.value, newConfig)
    } else {
      // 使用當前的 defaultFeatures（用於手動重載）
      Object.assign(config.value, defaultFeatures)
    }
    console.log('🔄 Features config reloaded:', config.value)
  }

  // 🔥 開發模式下啟用熱重載
  // {import.meta.hot.accept}如果有人改了我裡面的 code，直接把我的新邏輯「塞」進去就好，不准重新整理網頁
  if (import.meta.hot) {
    import.meta.hot.accept('~/core/config/features', (newModule) => {
      if (newModule && newModule.defaultFeatures) {
        // 使用新模組的配置資料
        reloadConfig(newModule.defaultFeatures)
      }
    })
  }

  return {
    config,
    reloadConfig
  }
})
