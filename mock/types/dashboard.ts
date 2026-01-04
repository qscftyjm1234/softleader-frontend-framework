/**
 * Dashboard Schema 定義
 *
 * 使用 Zod 定義 Dashboard 相關的 API Schema
 * 確保 Mock 資料與真實 API 型別一致
 */

import { z } from 'zod'

/**
 * 統計卡片 Schema
 */
export const DashboardStatSchema = z.object({
  title: z.string(),
  value: z.string(),
  icon: z.string(),
  color: z.string(),
  trend: z.string()
})

/**
 * 近期活動 Schema
 */
export const DashboardActivitySchema = z.object({
  user: z.string(),
  action: z.string(),
  time: z.string(),
  icon: z.string(),
  color: z.string()
})

/**
 * 統計資料響應 Schema - 直接返回陣列
 */
export const DashboardStatsResponseSchema = z.array(DashboardStatSchema)

/**
 * 近期活動響應 Schema - 直接返回陣列
 */
export const DashboardActivitiesResponseSchema = z.array(DashboardActivitySchema)

// 匯出型別
export type DashboardStat = z.infer<typeof DashboardStatSchema>
export type DashboardActivity = z.infer<typeof DashboardActivitySchema>
export type DashboardStatsResponse = z.infer<typeof DashboardStatsResponseSchema>
export type DashboardActivitiesResponse = z.infer<typeof DashboardActivitiesResponseSchema>
