import { defineStore } from 'pinia'
import { defaultLayoutConfig, type LayoutConfig } from '~/core/config/layout'
import { defaultFeatures, type FeatureFlags } from '~/core/config/features'

export const useAppStore = defineStore('app', () => {
  // 狀態
  const config = ref<LayoutConfig>({ ...defaultLayoutConfig })
  const features = ref<FeatureFlags>({ ...defaultFeatures })
  const drawer = ref(true)
  const loading = ref(false)

  // 動作
  /**
   *
   */
  function toggleDrawer() {
    drawer.value = !drawer.value
  }

  /**
   *
   * @param newTheme
   */
  function setTheme(newTheme: 'light' | 'dark') {
    config.value.theme.defaultTheme = newTheme
  }

  /**
   *
   * @param newConfig
   */
  function updateConfig(newConfig: Partial<LayoutConfig>) {
    Object.assign(config.value, newConfig)
  }

  /**
   * 重新載入設定（用於熱重載）
   * @param newConfig
   */
  function handleReloadConfig(newConfig?: LayoutConfig) {
    if (newConfig) {
      Object.assign(config.value, newConfig)
    } else {
      Object.assign(config.value, defaultLayoutConfig)
    }
    console.log('🔄 Layout config reloaded:', config.value)
  }

  /**
   *
   * @param newFeatures
   */
  function handleReloadFeatures(newFeatures?: FeatureFlags) {
    if (newFeatures) {
      Object.assign(features.value, newFeatures)
    } else {
      Object.assign(features.value, defaultFeatures)
    }
    console.log('🔄 Features config reloaded:', features.value)
  }

  // 初始化
  /**
   *
   */
  async function initApp() {
    loading.value = true
    try {
      console.log('App initialized')
    } finally {
      loading.value = false
    }
  }

  // 熱重載偵測
  if (import.meta.hot) {
    import.meta.hot.accept('~/core/config/layout', (newModule) => {
      if (newModule?.defaultLayoutConfig) {
        handleReloadConfig(newModule.defaultLayoutConfig)
      }
    })
    import.meta.hot.accept('~/core/config/features', (newModule) => {
      if (newModule?.defaultFeatures) {
        handleReloadFeatures(newModule.defaultFeatures)
      }
    })
  }

  return {
    config,
    features,
    drawer,
    loading,
    toggleDrawer,
    setTheme,
    updateConfig,
    handleReloadConfig,
    handleReloadFeatures,
    initApp
  }
})
