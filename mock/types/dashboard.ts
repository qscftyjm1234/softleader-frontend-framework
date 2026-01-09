/**
 * Dashboard Schema 定義
 *
 * 定義 Dashboard 相關的 API Interface
 */

/**
 * 統計卡片 Interface
 */
export interface DashboardStat {
  title: string
  value: string
  icon: string
  color: string
  trend: string
}

/**
 * 近期活動 Interface
 */
export interface DashboardActivity {
  user: string
  action: string
  time: string
  icon: string
  color: string
}

/**
 * 統計資料響應 Interface - 直接返回陣列
 */
export type DashboardStatsResponse = DashboardStat[]

/**
 * 近期活動響應 Interface - 直接返回陣列
 */
export type DashboardActivitiesResponse = DashboardActivity[]
