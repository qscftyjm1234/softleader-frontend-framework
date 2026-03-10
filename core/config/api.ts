/**
 * API 註冊表 (Central API Registry)
 *
 * 這裡定義了系統中所有的後端微服務及其對應的路徑與預設目標。
 */

export interface ApiProject {
  /** 專案識別標籤 (例如: 'api', 'auth') */
  key: string
  /** 路由 Prefix (例如: '/api') */
  prefix: string
  /** 本地開發環境對應的 Target (用於 devProxy) */
  devTarget: string
  /** 描述與註記 */
  description?: string
}

export const API_PROJECTS: ApiProject[] = [
  {
    key: 'api',
    prefix: '/api',
    devTarget: process.env.NUXT_PROXY_API_TARGET || 'http://localhost:8080',
    description: '預設後端 API'
  }
]

/** 取得所有專案的關鍵字列表 */
export const API_KEYS = API_PROJECTS.map((p) => p.key)

/**
 * 根據 Key 取得專案設定
 * @param key
 */
export const getApiProject = (key: string) => API_PROJECTS.find((p) => p.key === key)
