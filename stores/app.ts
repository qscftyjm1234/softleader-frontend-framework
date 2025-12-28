import { defineStore } from 'pinia'
import { defaultLayoutConfig, type LayoutConfig } from '~/core/config/layout'

export const useAppStore = defineStore('app', () => {
  // State
  const config = ref<LayoutConfig>({ ...defaultLayoutConfig })
  const drawer = ref(true)
  const loading = ref(false)

  // Actions
  /**
   *
   */
  function toggleDrawer() {
    drawer.value = !drawer.value
  }

  /**
   * 設定主題
   * @param newTheme - 新的主題 ('light' 或 'dark')
   */
  function setTheme(newTheme: 'light' | 'dark') {
    config.value.theme.defaultTheme = newTheme
  }

  /**
   * 更新配置
   * @param newConfig - 部分配置物件
   */
  function updateConfig(newConfig: Partial<LayoutConfig>) {
    // Deep merge logic could be added here for more complex updates
    Object.assign(config.value, newConfig)
  }

  /**
   * 重新載入配置（用於熱重載）
   * @param newConfig - 新的配置物件
   */
  function reloadConfig(newConfig?: typeof defaultLayoutConfig) {
    if (newConfig) {
      // 使用新模組的配置
      Object.assign(config.value, newConfig)
    } else {
      // 使用當前的 defaultLayoutConfig（用於手動重載）
      Object.assign(config.value, defaultLayoutConfig)
    }
    console.log('🔄 Layout config reloaded:', config.value)
  }

  // Initialize (Simulate fetching from backend)
  /**
   *
   */
  async function initApp() {
    loading.value = true
    try {
      console.log('App initialized with config:', config.value)
    } finally {
      loading.value = false
    }
  }

  // 開發模式下啟用熱重載
  if (import.meta.hot) {
    console.log('1414')
    // {import.meta.hot.accept}如果有人改了我裡面的 code，直接把我的新邏輯「塞」進去就好，不准重新整理網頁
    import.meta.hot.accept('~/core/config/layout', (newModule) => {
      if (newModule && newModule.defaultLayoutConfig) {
        // 使用新模組的配置資料
        reloadConfig(newModule.defaultLayoutConfig)
      }
    })
  }

  return {
    config,
    drawer,
    loading,
    toggleDrawer,
    setTheme,
    updateConfig,
    reloadConfig,
    initApp
  }
})
