/**
 * 註解範例檔案
 *
 * 此檔案展示各種註解的標準寫法
 *
 * @author Gino Huang
 * @since 2024-12-24
 * @version 1.0.0
 */

// ============================================
// 1. 函式註解範例
// ============================================

export function add(a: number, b: number) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('參數必須是數字')
  }
  return a + b
}

// ============================================
// 2. 標籤註解範例
// ============================================

function processOrder(order: {
  item: {
    price: number
    quantity: number
  }[]
}) {
  // TODO: [Gino] 加入訂單驗證邏輯 (2024-12-24)

  // FIXME: [Gino] 當訂單金額為 0 時會拋出錯誤 (2024-12-24)
  const total = order.items.reduce((sum, item) => sum + item.price, 0)

  // HACK: [Gino] 暫時使用 setTimeout 避免競態條件，待改用 Promise (2024-12-24)
  setTimeout(() => {
    saveOrder(order)
  }, 100)

  // NOTE: [Gino] 此處必須使用深拷貝以避免狀態污染 (2024-12-24)
  const orderCopy = JSON.parse(JSON.stringify(order))

  // OPTIMIZE: [Gino] 考慮使用 memoization 減少重複計算 (2024-12-24)
  return calculateDiscount(total)
}

// ============================================
// 3. 商業邏輯變更追蹤範例
// ============================================

/**
 * 計算訂單折扣
 *
 * @param {number} total - 訂單總金額
 * @param {Object} user - 使用者資訊
 * @returns {number} 折扣後金額
 *
 * @changelog
 * - 2024-12-24 v1.2.0 [Gino] 新增會員等級折扣邏輯
 * - 2024-11-15 v1.1.0 [Alice] 修改折扣計算公式
 * - 2024-10-01 v1.0.0 [Bob] 初始版本
 *
 * @author Gino Huang
 * @since 2024-10-01
 * @version 1.2.0
 */
function calculateDiscount(
  total: number,
  user: {
    memberLevel: string
  }
) {
  // v1.2.0: 新增會員等級判斷
  if (user.memberLevel === 'VIP') {
    return total * 0.8
  }

  // v1.1.0: 原有折扣邏輯
  return total * 0.9
}

// ============================================
// 4. 重要決策記錄範例
// ============================================

/**
 * 使用者資料快取策略
 *
 * @decision
 * 決策日期: 2024-12-24
 * 決策者: Gino Huang
 * 決策內容: 使用 localStorage 快取使用者資料，有效期 24 小時
 * 原因: 減少 API 呼叫次數，提升使用者體驗
 * 替代方案: SessionStorage (但會在關閉瀏覽器後失效)
 *
 * @author Gino Huang
 * @since 2024-12-24
 * @version 1.0.0
 */
function cacheUserData(user: string | number) {
  const cacheData = {
    user,
    timestamp: Date.now(),
    expiresIn: 24 * 60 * 60 * 1000 // 24 小時
  }

  localStorage.setItem('user_cache', JSON.stringify(cacheData))
}

// ============================================
// 5. 過時功能標記範例
// ============================================

/**
 * 舊版登入函式
 *
 * @deprecated 此函式已棄用，請使用 loginV2 替代
 * @see {@link loginV2}
 *
 * @author Gino Huang
 * @since 2024-01-01
 * @version 1.0.0
 */
function login(username: string, password: string | number) {
  // DEPRECATED: [Gino] 請使用 loginV2 替代 (2024-12-24)
  console.warn('login() is deprecated, use loginV2() instead')
  return loginV2({ username, password })
}
