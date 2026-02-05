/**
 * Mock API Configuration
 *
 * This file contains the configuration for all mock API routes.
 * Developers should add or modify mock routes here.
 */

// 定義 Mock 路由規則介面
export interface MockRoute {
  // API 路徑，支援字串 (includes) 或 RegExp
  url: string | RegExp
  // HTTP 方法
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  // 回傳的資料 (或是動態函式)
  response: any | ((context: { query: any; body: any; url: string }) => any)
  // 固定延遲 (毫秒)，若不設定則使用全域預設值
  delay?: number
}

// =============================================================================
// Mock 資料設定檔 (MOCK_ROUTES)
// 新增 API 時，請直接在此陣列加入設定即可
// =============================================================================
export const MOCK_ROUTES: MockRoute[] = [


  // ---------------------------------------------------------------------------
  // User API
  // ---------------------------------------------------------------------------
  {
    url: '/users',
    method: 'GET',
    delay: 3000,
    response: {
      // 假資料: 使用者列表
      data: [
        { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'admin' },
        { id: 2, name: 'Demo User', email: 'demo@example.com', role: 'user' },
        { id: 3, name: 'Test User', email: 'test@example.com', role: 'editor' }
      ],
      total: 3,
      page: 1,
      limit: 10
    }
  },
  {
    url: /\/users\/\d+/, // Regex 匹配 /users/123
    method: 'GET',
    response: (context) => {
      const id = Number(context.url.match(/\/users\/(\d+)/)?.[1] || 1)
      return {
        data: { id, name: 'Admin User', email: 'admin@example.com', role: 'admin' }
      }
    }
  },
  {
    url: '/users',
    method: 'POST',
    response: (context) => ({
      data: {
        id: Math.floor(Math.random() * 10000),
        name: context.body.name || 'New User',
        email: context.body.email || 'new@example.com',
        role: context.body.role || 'user'
      }
    })
  },
  {
    url: /\/users\/\d+/,
    method: 'PUT',
    response: (context) => ({
      data: { id: 1, ...context.body }
    })
  },
  {
    url: /\/users\/\d+/,
    method: 'DELETE',
    response: {
      data: { message: 'User deleted successfully' }
    }
  },

  // ---------------------------------------------------------------------------
  // Order API
  // ---------------------------------------------------------------------------
  {
    url: '/orders',
    method: 'GET',
    delay: 4500,
    response: {
      data: [
        { id: 101, customer: 'Customer A', amount: 1200, status: 'completed' },
        { id: 102, customer: 'Customer B', amount: 850, status: 'pending' },
        { id: 103, customer: 'Customer C', amount: 2300, status: 'shipping' }
      ],
      total: 3,
      page: 1,
      limit: 10
    }
  },
  {
    url: /\/orders\/\d+/,
    method: 'GET',
    response: (context) => {
      // 從 URL 提取 ID (例如 /orders/123 -> 123)
      const id = Number(context.url.match(/\/orders\/(\d+)/)?.[1] || 101)
      return {
        data: { id, customer: 'Customer A', amount: 1200, status: 'completed', items: [] }
      }
    }
  },

  // ---------------------------------------------------------------------------
  // Dashboard API
  // ---------------------------------------------------------------------------
  {
    url: '/dashboard/stats',
    method: 'GET',
    response: {
      data: [
        {
          title: '總會員數',
          value: '1,250',
          icon: 'mdi-account-group',
          color: 'primary',
          trend: '+12%'
        },
        {
          title: '本月營收',
          value: '$158,000',
          icon: 'mdi-currency-usd',
          color: 'success',
          trend: '+8.5%'
        },
        {
          title: '待處理訂單',
          value: '32',
          icon: 'mdi-clipboard-alert',
          color: 'warning',
          trend: '-2%'
        },
        {
          title: '系統負載',
          value: '45%',
          icon: 'mdi-server-network',
          color: 'info',
          trend: '穩定'
        }
      ]
    }
  },
  {
    url: '/dashboard/activities',
    method: 'GET',
    delay: 5000,
    response: {
      data: [
        {
          id: 1,
          user: 'User A',
          action: '登入系統',
          time: '10:00 AM',
          icon: 'mdi-login',
          color: 'primary'
        },
        {
          id: 2,
          user: 'User B',
          action: '新增了一筆訂單',
          time: '10:30 AM',
          icon: 'mdi-cart-plus',
          color: 'success'
        },
        {
          id: 3,
          user: 'User C',
          action: '修改了個人資料',
          time: '11:00 AM',
          icon: 'mdi-account-edit',
          color: 'grey'
        }
      ]
    }
  },

  // ---------------------------------------------------------------------------
  // Upload API
  // ---------------------------------------------------------------------------
  {
    url: '/api/upload', // 單檔
    method: 'POST',
    delay: 1000,
    response: {
      success: true,
      message: '檔案上傳成功 (Mock)',
      data: {
        filename: 'mock-file.jpg',
        size: 1024,
        url: '/uploads/mock-file.jpg',
        uploadedAt: new Date().toISOString()
      }
    }
  },
  {
    url: '/api/upload/multiple', // 多檔
    method: 'POST',
    delay: 1500,
    response: {
      success: true,
      message: '批次上傳成功 (Mock)',
      data: {
        files: [
          { filename: 'file-1.jpg', size: 1024, url: '/uploads/file-1.jpg' },
          { filename: 'file-2.pdf', size: 2048, url: '/uploads/file-2.pdf' }
        ],
        uploadedAt: new Date().toISOString()
      }
    }
  },

  // ---------------------------------------------------------------------------
  // Files API (Export/Download)
  // ---------------------------------------------------------------------------
  {
    url: '/api/files/export',
    method: 'GET',
    response: (context) => {
      const format = context.query.format || 'csv'
      if (format === 'json') {
        return JSON.stringify([{ name: 'A' }, { name: 'B' }])
      }
      return 'Name,Email\nUser A,a@example.com\nUser B,b@example.com'
    }
  },
  {
    url: '/api/file',
    method: 'GET',
    response: 'Mock File Content'
  },

  // ---------------------------------------------------------------------------
  // Reports API
  // ---------------------------------------------------------------------------
  {
    url: '/api/reports/generate',
    method: 'POST',
    delay: 1200,
    response: {
      success: true,
      message: '報表生成成功',
      data: {
        reportId: 'RPT-MOCK-001',
        status: 'ready',
        downloadUrl: '/api/reports/download/RPT-MOCK-001'
      }
    }
  },

  // ---------------------------------------------------------------------------
  // Misc APIs
  // ---------------------------------------------------------------------------
  {
    url: '/api/error',
    method: 'GET',
    response: (context) => {
      const code = Number(context.query.code || 500)
      // 丟出錯誤
      throw {
        statusCode: code,
        message: `Mock Error ${code}`,
        data: { message: 'This is a mock error' }
      }
    }
  },
  {
    url: '/api/stats',
    method: 'GET',
    response: {
      code: 200,
      message: 'Success',
      data: {
        sales: 999,
        activeUsers: 888,
        visits: 777,
        trend: 'up'
      }
    }
  }
]
