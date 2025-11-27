import { defineStore } from 'pinia'
import { defaultLayoutConfig, type LayoutConfig } from '~/core/config/layout'

export const useAppStore = defineStore('app', () => {
  // State
  const config = ref<LayoutConfig>({ ...defaultLayoutConfig })
  const drawer = ref(true)
  const loading = ref(false)

  // Actions
  function toggleDrawer() {
    drawer.value = !drawer.value
  }

  function setTheme(newTheme: 'light' | 'dark') {
    config.value.theme.defaultTheme = newTheme
  }

  function updateConfig(newConfig: Partial<LayoutConfig>) {
    // Deep merge logic could be added here for more complex updates
    Object.assign(config.value, newConfig)
  }

  // Initialize (Simulate fetching from backend)
  async function initApp() {
    loading.value = true
    try {
      // Simulate API call delay
      // await new Promise(resolve => setTimeout(resolve, 500))
      
      // In the future: const apiConfig = await fetch('/api/config')
      // updateConfig(apiConfig)
      
      console.log('App initialized with config:', config.value)
    } finally {
      loading.value = false
    }
  }

  return {
    config,
    drawer,
    loading,
    toggleDrawer,
    setTheme,
    updateConfig,
    initApp
  }
})
