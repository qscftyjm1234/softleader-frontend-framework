/**
 * Mock 資料攔截器
 *
 * 在 useApi 的請求攔截器中使用，判斷是否回傳 Mock 資料
 */

import { createMockUsers, createMockUser } from '~/mock/factories/user.factory'
import { createMockOrders, createMockOrder } from '~/mock/factories/order.factory'
import {
  createMockDashboardStats,
  createMockDashboardActivities
} from '~/mock/factories/dashboard.factory'

/**
 * 檢查是否需要回傳 Mock 資料
 *
 * @param url - 請求的 URL
 * @param options - 請求選項
 * @returns Mock 資料或 null（null 表示繼續發送真實請求）
 */
export async function checkMockData(url: string, options: any): Promise<any> {
  const config = useRuntimeConfig()

  // 🔍 Debug: 顯示實際的 URL
  console.log('🔍 Mock 攔截器檢查 URL:', url)

  // 🎯 細粒度控制：針對每個 API 模組分別判斷

  // User API - 檢查是否啟用 Mock
  if (url.includes('/users')) {
    if (config.public.mockUserApi !== 'true' && config.public.mockUserApi !== true) {
      return null // User API 不使用 Mock，發送真實請求
    }
    console.log('Mock API 攔截 [User]:', url)
    await delay(config)
    return getMockDataByUrl(url, options)
  }

  // Order API - 檢查是否啟用 Mock
  if (url.includes('/orders')) {
    if (config.public.mockOrderApi !== 'true' && config.public.mockOrderApi !== true) {
      return null // Order API 不使用 Mock，發送真實請求
    }
    console.log('Mock API 攔截 [Order]:', url)
    await delay(config)
    return getMockDataByUrl(url, options)
  }

  // Dashboard API - 檢查是否啟用 Mock
  if (url.includes('/dashboard')) {
    if (config.public.mockDashboardApi !== 'true' && config.public.mockDashboardApi !== true) {
      return null // Dashboard API 不使用 Mock，發送真實請求
    }
    console.log('✅ Mock API 攔截 [Dashboard]:', url)
    await delay(config)
    return getMockDataByUrl(url, options)
  }

  // 其他 API - 使用全域設定
  if (config.public.featureApiMock === 'true' || config.public.featureApiMock === true) {
    console.log('Mock API 攔截 [Other]:', url)
    await delay(config)
    return getMockDataByUrl(url, options)
  }

  // 預設：不使用 Mock
  console.log('❌ 不使用 Mock，發送真實請求:', url)
  return null
}

/**
 * 模擬網路延遲
 * @param config
 */
async function delay(config: any) {
  const delayTime = parseInt(config.public.mockDelay as string) || 500
  await new Promise((resolve) => setTimeout(resolve, delayTime))
}

/**
 * 根據 URL 回傳對應的 Mock 資料
 * @param url
 * @param options
 */
function getMockDataByUrl(url: string, options: any): any {
  const method = options.method || 'GET'

  // ========================================
  // User API
  // ========================================

  // GET /api/users - 使用者列表
  if (method === 'GET' && url.includes('/users') && !url.match(/\/users\/\d+/)) {
    const params = extractQueryParams(url)
    const page = parseInt(params.page || '1')
    const limit = parseInt(params.limit || '10')
    const search = params.search || ''

    let users = createMockUsers(100)

    // 搜尋過濾
    if (search) {
      users = users.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      )
    }

    // 分頁
    const start = (page - 1) * limit
    const end = start + limit

    return {
      data: users.slice(start, end),
      total: users.length,
      page,
      limit
    }
  }

  // GET /api/users/:id - 使用者詳細
  if (method === 'GET' && url.match(/\/users\/\d+/)) {
    const id = parseInt(url.match(/\/users\/(\d+)/)?.[1] || '1')
    return {
      data: createMockUser({ id })
    }
  }

  // POST /api/users - 建立使用者
  if (method === 'POST' && url.includes('/users')) {
    const body = options.body || {}
    return {
      data: createMockUser({
        id: Math.floor(Math.random() * 10000),
        name: body.name,
        email: body.email,
        role: body.role || 'user'
      })
    }
  }

  // PUT /api/users/:id - 更新使用者
  if (method === 'PUT' && url.match(/\/users\/\d+/)) {
    const id = parseInt(url.match(/\/users\/(\d+)/)?.[1] || '1')
    const body = options.body || {}
    return {
      data: createMockUser({
        id,
        ...body
      })
    }
  }

  // DELETE /api/users/:id - 刪除使用者
  if (method === 'DELETE' && url.match(/\/users\/\d+/)) {
    return {
      data: { message: 'User deleted successfully' }
    }
  }

  // ========================================
  // Order API
  // ========================================

  // GET /api/orders - 訂單列表
  if (method === 'GET' && url.includes('/orders') && !url.match(/\/orders\/\d+/)) {
    const params = extractQueryParams(url)
    const page = parseInt(params.page || '1')
    const limit = parseInt(params.limit || '10')

    const orders = createMockOrders(50)
    const start = (page - 1) * limit
    const end = start + limit

    return {
      data: orders.slice(start, end),
      total: orders.length,
      page,
      limit
    }
  }

  // GET /api/orders/:id - 訂單詳細
  if (method === 'GET' && url.match(/\/orders\/\d+/)) {
    const id = parseInt(url.match(/\/orders\/(\d+)/)?.[1] || '1')
    return {
      data: createMockOrder({ id })
    }
  }

  // ========================================
  // Dashboard API
  // ========================================

  // GET /dashboard/stats - 統計資料
  if (method === 'GET' && url.includes('/dashboard/stats')) {
    console.log('📊 回傳 Dashboard Stats Mock 資料')
    return {
      data: createMockDashboardStats()
    }
  }

  // GET /dashboard/activities - 近期活動
  if (method === 'GET' && url.includes('/dashboard/activities')) {
    const params = extractQueryParams(url)
    const limit = parseInt(params.limit || '10')

    console.log('📋 回傳 Dashboard Activities Mock 資料, limit:', limit)
    return {
      data: createMockDashboardActivities(limit)
    }
  }

  // ========================================
  // 未匹配的 API
  // ========================================

  console.warn('⚠️ 未找到對應的 Mock 資料:', url)
  return null // 回傳 null，讓請求繼續發送到真實 API
}

/**
 * 從 URL 中提取查詢參數
 * @param url
 */
function extractQueryParams(url: string): Record<string, string> {
  const params: Record<string, string> = {}
  const queryString = url.split('?')[1]

  if (!queryString) {
    return params
  }

  queryString.split('&').forEach((param) => {
    const [key, value] = param.split('=')
    if (key) {
      params[key] = decodeURIComponent(value || '')
    }
  })

  return params
}
