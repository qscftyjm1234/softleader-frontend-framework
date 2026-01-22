import { type H3Error } from 'h3'

/**
 * Mock Data Interceptor (Simplified)
 *
 * 管理所有 Mock API 的設定與回傳資料。
 * 採用 "Configuration over Code" 模式，方便快速新增。
 */

// 定義 Mock 路由規則介面
import { MOCK_ROUTES } from '~/mock/routes'

// =============================================================================
// 核心邏輯 (無須頻繁修改)
// =============================================================================

/**
 * 檢查是否需要回傳 Mock 資料
 *
 * @param url - 請求的 URL (含 query string)
 * @param options - 請求選項 (method, body 等)
 * @returns Mock 資料或 null
 */
export async function checkMockData(url: string, options: any): Promise<any> {
  const config = useRuntimeConfig()

  // 1. 全域 Mock 開關檢查 (若依賴 config)
  // 這裡保留您原本的設計，針對不同模組做開關檢查
  // 如果想更簡化，可以只檢查 featureApiMock 或甚至移除
  if (!isMockEnabled(url, config)) {
    return null
  }

  // 2. 尋找匹配的規則
  const method = options.method || 'GET'
  // 移除 query string 進行匹配
  const pureUrl = url.split('?')[0]

  const route = MOCK_ROUTES.find((r) => {
    // 檢查 Method
    if (r.method !== method) return false

    // 檢查 URL
    if (r.url instanceof RegExp) {
      return r.url.test(pureUrl)
    }
    return r.url === pureUrl || pureUrl.includes(r.url as string) // 兼容 includes 以防萬一
  })

  if (!route) {
    console.log('No Mock Route found for:', url)
    return null
  }

  console.log('Mock Hit:', url)

  // 3. 模擬延遲
  // 3. 模擬延遲 (與前版不同，這裡只計算延遲時間，不實際等待，交由 useApi 決定等待時機)
  const delayTime = route.delay ?? (parseInt(config.public.mockDelay as string) || 500)

  // 4. 產生回應
  let responseData
  if (typeof route.response === 'function') {
    const query = parseQueryParams(url)
    const body = options.body || {}
    responseData = route.response({ query, body, url })
  } else {
    responseData = route.response
  }

  return {
    data: responseData,
    delay: delayTime
  }
}

/**
 * 輔助：判斷 Mock 開關
 * @param url - 請求路徑
 * @param config - Runtime Config
 */
function isMockEnabled(url: string, config: any): boolean {
  // 簡化邏輯：只檢查全域開關
  // 若未來需要個別開關，再由此處擴充
  return config.public.featureApiMock === 'true' || config.public.featureApiMock === true
}

/**
 * 輔助：解析 Query Params
 * @param url - 完整請求路徑
 */
function parseQueryParams(url: string): Record<string, string> {
  const params: Record<string, string> = {}
  const queryString = url.split('?')[1]
  if (!queryString) return params

  queryString.split('&').forEach((param) => {
    const [key, value] = param.split('=')
    if (key) params[key] = decodeURIComponent(value || '')
  })
  return params
}
