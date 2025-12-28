/**
 * Dashboard Stats API - Mock Endpoint
 *
 * 這個 server route 會在開發環境中提供 Mock 資料
 */

import { createMockDashboardStats } from '~/mock/factories/dashboard.factory'

export default defineEventHandler(() => {
  console.log('📊 Server Route: 返回 Dashboard Stats Mock 資料')

  return {
    data: createMockDashboardStats()
  }
})
