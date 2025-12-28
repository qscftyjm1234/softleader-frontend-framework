/**
 * Dashboard Factory
 *
 * 生成符合 Schema 的 Mock Dashboard 資料
 */

import type { DashboardStat, DashboardActivity } from '../schemas/dashboard'

/**
 * 生成隨機整數
 *
 * @param min - 最小值
 * @param max - 最大值
 * @returns 隨機整數
 */
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * 從陣列中隨機選擇一個元素
 *
 * @param array - 來源陣列
 * @returns 隨機選擇的元素
 */
function randomElement<T>(array: readonly T[]): T {
  return array[randomInt(0, array.length - 1)]!
}

/**
 * 生成隨機時間描述
 *
 * @returns 時間描述字串
 */
function randomTimeAgo(): string {
  const types = ['分鐘前', '小時前', '天前']
  const type = randomElement(types)

  if (type === '分鐘前') {
    return `${randomInt(1, 59)} ${type}`
  } else if (type === '小時前') {
    return `${randomInt(1, 23)} ${type}`
  } else {
    return `${randomInt(1, 7)} ${type}`
  }
}

/**
 * 生成 Dashboard 統計資料
 *
 * @returns 4 個統計卡片資料
 */
export function createMockDashboardStats(): DashboardStat[] {
  const memberCount = randomInt(1000, 5000)
  const revenue = randomInt(30000, 80000)
  const pendingOrders = randomInt(10, 50)
  const systemLoad = randomInt(20, 80)

  return [
    {
      title: '總會員數',
      value: memberCount.toLocaleString(),
      icon: 'mdi-account-group',
      color: 'primary',
      trend: `+${randomInt(5, 20)}%`
    },
    {
      title: '本月營收',
      value: `$${revenue.toLocaleString()}`,
      icon: 'mdi-currency-usd',
      color: 'success',
      trend: `+${randomInt(3, 15)}.${randomInt(0, 9)}%`
    },
    {
      title: '待處理訂單',
      value: pendingOrders.toString(),
      icon: 'mdi-clipboard-alert',
      color: 'warning',
      trend: randomInt(0, 1) === 0 ? `-${randomInt(1, 5)}%` : `+${randomInt(1, 5)}%`
    },
    {
      title: '系統負載',
      value: `${systemLoad}%`,
      icon: 'mdi-server-network',
      color: 'info',
      trend: systemLoad < 50 ? '穩定' : '偏高'
    }
  ]
}

// 活動資料池
const USERS = ['Admin', '王小明', '李大華', '張美麗', '陳建國', '林雅婷', 'System', 'Manager']

const ACTIONS = [
  { action: '更新了系統設定', icon: 'mdi-cog', color: 'grey' },
  { action: '新增了一筆訂單', icon: 'mdi-cart-plus', color: 'success' },
  { action: '申請了退款', icon: 'mdi-cash-refund', color: 'error' },
  { action: '自動備份完成', icon: 'mdi-database-check', color: 'info' },
  { action: '登入系統', icon: 'mdi-login', color: 'primary' },
  { action: '修改了個人資料', icon: 'mdi-account-edit', color: 'grey' },
  { action: '上傳了新檔案', icon: 'mdi-file-upload', color: 'success' },
  { action: '刪除了舊資料', icon: 'mdi-delete', color: 'error' },
  { action: '發送了通知', icon: 'mdi-bell-ring', color: 'warning' },
  { action: '建立了新專案', icon: 'mdi-folder-plus', color: 'primary' }
] as const

/**
 * 生成單一近期活動
 *
 * @returns Mock Activity 物件
 */
export function createMockDashboardActivity(): DashboardActivity {
  const user = randomElement(USERS)
  const actionData = randomElement(ACTIONS)
  const time = randomTimeAgo()

  // 如果是訂單相關，加上訂單編號
  let action: string = actionData.action
  if (action.includes('訂單')) {
    action = `${action} #${randomInt(2023000, 2023999)}`
  }

  return {
    user,
    action,
    time,
    icon: actionData.icon,
    color: actionData.color
  }
}

/**
 * 批量生成近期活動
 *
 * @param count - 要生成的數量，預設 10
 * @returns Mock Activity 陣列
 */
export function createMockDashboardActivities(count: number = 10): DashboardActivity[] {
  return Array.from({ length: count }, () => createMockDashboardActivity())
}
