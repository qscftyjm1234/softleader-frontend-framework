// API 相關常數
const PERFORMANCE_THRESHOLD = 5000
const STATUS_UNAUTHORIZED = 401
const HEADER_AUTH = 'Authorization'
const TOKEN_PREFIX = 'Bearer '

/**
 * 效能監控：開發環境下若請求超過閾值則警告
 */
export function checkPerformance(response: any, options: any) {
  const startTime = (options as any)._startTime || 0
  const duration = Date.now() - startTime
  if (import.meta.dev && duration > PERFORMANCE_THRESHOLD) {
    console.warn(`[Slow API] ${response.url} took ${duration}ms`)
  }
}

/**
 * 全域登出：401 Unauthorized 時清除 Token 並導回登入頁
 */
export function checkAuth(response: any, config: any) {
  if (response.status === STATUS_UNAUTHORIZED) {
    const token = useCookie(config.public.tokenKey as string)
    token.value = null
    if (import.meta.client) {
      navigateTo('/login')
    }
  }
}

/**
 * 錯誤處理：檢查後端自定義錯誤碼
 */
export function checkApiError(response: any) {
  const data = response._data
  // 假設後端回傳格式為 { code: 200, message: '...', data: ... }
  if (data && typeof data === 'object' && 'code' in data && data.code !== 200) {
    // throw new Error(data.message || 'API Error')
  }
}

/**
 * Token 更新：若 Header 包含新 Token 則自動更新 Cookie
 */
export function checkRefreshToken(response: any, config: any) {
  const newToken = response.headers.get(HEADER_AUTH)
  if (newToken) {
    const token = useCookie(config.public.tokenKey as string)
    token.value = newToken.replace(TOKEN_PREFIX, '')
  }
}
