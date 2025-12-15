import type { FetchContext } from 'ofetch'

/**
 * 處理 API 錯誤的統一入口
 * 這裡集中管理所有 HTTP 錯誤狀態碼的邏輯
 * 
 * @param context - ofetch 的錯誤上下文
 */
export const handleApiError = (context: FetchContext, autoError: boolean = true) => {
  const { response } = context
  const status = response?.status
  
  // 自動顯示錯誤訊息
  if (autoError) {
    const msg = response?._data?.message || `請求失敗 (${status})`
    useNotify().error(msg)
  }

  // 根據狀態碼做不同處理
  switch (status) {
    case 401:
      // 未授權 (Token 過期或無效)
      console.warn('[API Error] 401 Unauthorized - 請重新登入')
      // TODO: 執行登出邏輯或導向登入頁
      // const auth = useAuthStore()
      // auth.logout()
      break
      
    case 403:
      // 禁止訪問 (權限不足)
      console.warn('[API Error] 403 Forbidden - 權限不足')
      break
      
    case 404:
      // 找不到資源
      console.warn('[API Error] 404 Not Found - 找不到資源')
      break
      
    case 500:
      // 伺服器內部錯誤
      console.error('[API Error] 500 Internal Server Error - 伺服器出錯')
      break
      
    default:
      // 其他錯誤
      console.error(`[API Error] ${status} - 未知錯誤`, response?.statusText)
  }
}
