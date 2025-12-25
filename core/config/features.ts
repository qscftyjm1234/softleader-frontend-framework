/**
 * 功能開關配置
 *
 * 這個文件定義了系統中所有可用的功能開關。
 * 不同的前端項目或客戶可以根據需求啟用或停用特定功能。
 *
 * @module config/features
 */

export interface FeatureConfig {
  /** 功能是否啟用 */
  enabled: boolean
  /** 功能描述 */
  description: string
  /** 對應的環境變數名稱 (可選) */
  envKey?: string
  /** 建議使用的環境 (development, staging, production, all) */
  environments?: ('development' | 'staging' | 'production' | 'all')[]
}

export interface FeatureFlags {
  /** 開發工具相關功能 */
  devTools: {
    /** 自動生成函數歷史記錄文件 */
    historyGeneration: FeatureConfig
    /** API Mock 功能 */
    apiMock: FeatureConfig
    /** 開發環境日誌輸出 */
    devLogging: FeatureConfig
    /** 顯示開發工具面板 */
    devToolsPanel: FeatureConfig
  }

  /** 日誌系統相關功能 */
  logging: {
    /** Console 日誌輸出 */
    consoleLog: FeatureConfig
    /** API 請求日誌 */
    apiLog: FeatureConfig
    /** 業務邏輯日誌 */
    businessLog: FeatureConfig
    /** 錯誤日誌詳細資訊 */
    errorDetails: FeatureConfig
  }

  /** 監控與追蹤功能 */
  monitoring: {
    /** 性能監控 */
    performance: FeatureConfig
    /** 錯誤追蹤 */
    errorTracking: FeatureConfig
    /** 使用者行為分析 */
    analytics: FeatureConfig
    /** 頁面載入時間追蹤 */
    pageLoadTracking: FeatureConfig
  }

  /** 實驗性功能 */
  experimental: {
    /** Beta 功能 */
    betaFeatures: FeatureConfig
    /** A/B 測試 */
    abTesting: FeatureConfig
    /** 新版 UI */
    newUI: FeatureConfig
  }

  /** 第三方服務整合 */
  integrations: {
    /** Google Analytics */
    googleAnalytics: FeatureConfig
    /** Sentry 錯誤追蹤 */
    sentry: FeatureConfig
    /** Hotjar 使用者行為 */
    hotjar: FeatureConfig
  }
}

/**
 * 預設功能開關配置
 *
 * 可以透過環境變數覆蓋這些預設值
 * 環境變數格式: NUXT_PUBLIC_FEATURE_<CATEGORY>_<FEATURE_NAME>=true|false
 */
export const defaultFeatures: FeatureFlags = {
  devTools: {
    historyGeneration: {
      enabled: true,
      description: '自動生成函數歷史記錄文件,追蹤業務邏輯演進',
      envKey: 'NUXT_PUBLIC_FEATURE_HISTORY_GENERATION',
      environments: ['development', 'staging']
    },
    apiMock: {
      enabled: true,
      description: '開發環境使用 Mock API 數據',
      envKey: 'NUXT_PUBLIC_FEATURE_API_MOCK',
      environments: ['development']
    },
    devLogging: {
      enabled: true,
      description: '開發環境詳細日誌輸出',
      envKey: 'NUXT_PUBLIC_FEATURE_DEV_LOGGING',
      environments: ['development']
    },
    devToolsPanel: {
      enabled: true,
      description: '顯示開發工具面板',
      envKey: 'NUXT_PUBLIC_FEATURE_DEV_TOOLS_PANEL',
      environments: ['development']
    }
  },

  logging: {
    consoleLog: {
      enabled: true,
      description: 'Console 日誌輸出',
      envKey: 'NUXT_PUBLIC_FEATURE_CONSOLE_LOG',
      environments: ['all']
    },
    apiLog: {
      enabled: true,
      description: 'API 請求/響應日誌',
      envKey: 'NUXT_PUBLIC_FEATURE_API_LOG',
      environments: ['development', 'staging']
    },
    businessLog: {
      enabled: true,
      description: '業務邏輯執行日誌',
      envKey: 'NUXT_PUBLIC_FEATURE_BUSINESS_LOG',
      environments: ['development', 'staging']
    },
    errorDetails: {
      enabled: true,
      description: '錯誤詳細資訊和堆疊追蹤',
      envKey: 'NUXT_PUBLIC_FEATURE_ERROR_DETAILS',
      environments: ['all']
    }
  },

  monitoring: {
    performance: {
      enabled: false,
      description: '性能監控和指標收集',
      envKey: 'NUXT_PUBLIC_FEATURE_PERFORMANCE',
      environments: ['staging', 'production']
    },
    errorTracking: {
      enabled: false,
      description: '自動錯誤追蹤和報告',
      envKey: 'NUXT_PUBLIC_FEATURE_ERROR_TRACKING',
      environments: ['staging', 'production']
    },
    analytics: {
      enabled: false,
      description: '使用者行為分析',
      envKey: 'NUXT_PUBLIC_FEATURE_ANALYTICS',
      environments: ['production']
    },
    pageLoadTracking: {
      enabled: false,
      description: '頁面載入時間追蹤',
      envKey: 'NUXT_PUBLIC_FEATURE_PAGE_LOAD_TRACKING',
      environments: ['staging', 'production']
    }
  },

  experimental: {
    betaFeatures: {
      enabled: false,
      description: '啟用 Beta 測試功能',
      envKey: 'NUXT_PUBLIC_FEATURE_BETA',
      environments: ['development', 'staging']
    },
    abTesting: {
      enabled: false,
      description: 'A/B 測試功能',
      envKey: 'NUXT_PUBLIC_FEATURE_AB_TESTING',
      environments: ['staging', 'production']
    },
    newUI: {
      enabled: false,
      description: '新版使用者介面',
      envKey: 'NUXT_PUBLIC_FEATURE_NEW_UI',
      environments: ['development', 'staging']
    }
  },

  integrations: {
    googleAnalytics: {
      enabled: false,
      description: 'Google Analytics 整合',
      envKey: 'NUXT_PUBLIC_FEATURE_GOOGLE_ANALYTICS',
      environments: ['production']
    },
    sentry: {
      enabled: false,
      description: 'Sentry 錯誤追蹤整合',
      envKey: 'NUXT_PUBLIC_FEATURE_SENTRY',
      environments: ['staging', 'production']
    },
    hotjar: {
      enabled: false,
      description: 'Hotjar 使用者行為分析',
      envKey: 'NUXT_PUBLIC_FEATURE_HOTJAR',
      environments: ['production']
    }
  }
}
