/**
 * Dashboard Activities API - Mock Endpoint
 *
 * 這個 server route 會在開發環境中提供 Mock 資料
 */

import { createMockDashboardActivities } from '~/mock/factories/dashboard.factory'

export default defineEventHandler((event) => {
  // 從查詢參數獲取 limit
  const query = getQuery(event)
  const limit = parseInt(query.limit as string) || 10

  console.log('📋 Server Route: 返回 Dashboard Activities Mock 資料, limit:', limit)

  return {
    data: createMockDashboardActivities(limit)
  }
})
