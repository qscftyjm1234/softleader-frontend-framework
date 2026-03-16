/**
 * Feature Flag Composable
 *
 * 提供簡單的 API 來檢查功能是否啟用
 *
 * @example
 * ```typescript
 * const { isEnabled } = useFeatureFlag()
 *
 * if (isEnabled('devTools.historyGeneration')) {
 *   // 執行歷史文件生成
 * }
 * ```
 */

import { defaultFeatures, type FeatureConfig } from '~/core/config/features'
import { useAppStore } from '~/stores/app'

type FeaturePath = `devTools.${keyof typeof defaultFeatures.devTools}`

/**
 * 從環境變數或設定中獲取功能狀態
 *
 * @param config - 功能設定物件
 * @returns 功能是否啟用
 */
function getFeatureValue(config: FeatureConfig): boolean {
  // 優先使用環境變數
  if (config.envKey) {
    const envValue = process.env[config.envKey]
    if (envValue !== undefined) {
      return envValue === 'true' || envValue === '1'
    }
  }

  // 檢查環境限制
  if (config.environments && config.environments.length > 0) {
    const currentEnv = process.env.NODE_ENV || 'development'
    const isAllEnvironments = config.environments.includes('all')
    const isCurrentEnvironment = config.environments.includes(
      currentEnv as 'development' | 'staging' | 'production'
    )

    // 如果不在允許的環境中,則停用
    if (!isAllEnvironments && !isCurrentEnvironment) {
      return false
    }
  }

  // 使用預設值
  return config.enabled
}

/**
 * 從路徑字串獲取功能設定
 *
 * @param path - 功能路徑,格式: 'category.featureName'
 * @param features - 功能設定物件
 * @returns 功能設定物件或 null
 */
function getConfigByPath(
  path: FeaturePath,
  features: typeof defaultFeatures
): FeatureConfig | null {
  const [category, feature] = path.split('.') as [keyof typeof defaultFeatures, string]

  if (!category || !feature) {
    console.warn(`[useFeatureFlag] Invalid feature path: ${path}`)
    return null
  }

  const categoryConfig = features[category]
  if (!categoryConfig) {
    console.warn(`[useFeatureFlag] Unknown category: ${category}`)
    return null
  }

  const featureConfig = categoryConfig[feature as keyof typeof categoryConfig]
  if (!featureConfig) {
    console.warn(`[useFeatureFlag] Unknown feature: ${feature} in category: ${category}`)
    return null
  }

  return featureConfig as FeatureConfig
}

/**
 * Feature Flag Composable
 *
 * @returns 功能開關相關方法
 */
export function useFeatureFlag() {
  // 使用 App Store 中的 features
  const appStore = useAppStore()
  const features = appStore.features

  /**
   * 檢查功能是否啟用
   *
   * @param featurePath - 功能路徑,格式: 'category.featureName'
   * @returns 功能是否啟用
   *
   * @example
   * ```typescript
   * isEnabled('devTools.historyGeneration') // true/false
   * isEnabled('logging.apiLog') // true/false
   * ```
   */
  const isEnabled = (featurePath: FeaturePath): boolean => {
    const config = getConfigByPath(featurePath, features)
    if (!config) {
      return false
    }

    return getFeatureValue(config)
  }

  /**
   * 獲取功能的完整設定
   *
   * @param featurePath - 功能路徑
   * @returns 功能設定物件
   */
  const getFeatureConfig = (featurePath: FeaturePath): FeatureConfig | null =>
    getConfigByPath(featurePath, features)

  /**
   * 獲取所有功能清單及其狀態
   *
   * @returns 所有功能的狀態物件
   */
  const getAllFeatures = () => {
    const status: Record<string, boolean> = {}

    Object.entries(features).forEach(([category, categoryFeatures]) => {
      Object.entries(categoryFeatures as Record<string, unknown>).forEach(
        ([featureName, config]) => {
          const path = `${category}.${featureName}` as FeaturePath
          status[path] = getFeatureValue(config as FeatureConfig)
        }
      )
    })

    return status
  }

  /**
   * 獲取特定分類的所有功能狀態
   *
   * @param category - 功能分類
   * @returns 該分類下所有功能的狀態
   */
  const getCategoryFeatures = (category: keyof typeof defaultFeatures) => {
    const categoryConfig = features[category]
    if (!categoryConfig) {
      console.warn(`[useFeatureFlag] Unknown category: ${category}`)
      return {}
    }

    const status: Record<string, boolean> = {}
    Object.entries(categoryConfig).forEach(([featureName, config]) => {
      status[featureName] = getFeatureValue(config as FeatureConfig)
    })

    return status
  }

  return {
    isEnabled,
    getFeatureConfig,
    getAllFeatures,
    getCategoryFeatures
  }
}
