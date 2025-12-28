import { useClient } from '~/composables/useApi'
import type { DashboardStatsResponse, DashboardActivitiesResponse } from '~/mock/schemas/dashboard'

// 輔助型別
type MaybeRef<T> = T | Ref<T>

interface DashboardActivityQueryParams {
  limit?: MaybeRef<number>
}

// 定義 Client
const api = useClient('/dashboard')

export default {
  /**
   * 取得 Dashboard 統計資料
   *
   * @returns 統計卡片資料（總會員數、本月營收、待處理訂單、系統負載）
   */
  getStats() {
    // GET /dashboard/stats
    return api.get<DashboardStatsResponse>('/stats')
  },

  /**
   * 取得近期活動列表
   *
   * @param params - 查詢參數
   * @returns 近期活動資料
   */
  getActivities(params: DashboardActivityQueryParams = {}) {
    // GET /dashboard/activities
    return api.get<DashboardActivitiesResponse>('/activities', {
      query: params
    })
  }
}
