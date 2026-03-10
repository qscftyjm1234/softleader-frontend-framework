/**
 * 訂單工廠 (Order Factory)
 *
 * 使用簡單的手寫邏輯生成符合 Schema 的 Mock Order 資料
 */

import type { Order, OrderItem, OrderStatus } from '../types/order'

// 預定義的假資料池
const PRODUCT_NAMES = [
  '無線藍牙耳機',
  '智能手環',
  '筆記型電腦',
  '機械鍵盤',
  '滑鼠墊',
  '顯示器',
  '充電線',
  'USB 隨身碟',
  '行動電源',
  '手機殼'
]

const ORDER_STATUSES: OrderStatus[] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']

/**
 * 生成隨機整數
 *
 * @param min - 最小值
 * @param max - 最大值
 * @returns 隨機整數
 */
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * 生成隨機浮點數
 *
 * @param min - 最小值
 * @param max - 最大值
 * @param decimals - 小數位數，預設 2
 * @returns 隨機浮點數
 */
function getRandomFloat(min: number, max: number, decimals: number = 2): number {
  const value = Math.random() * (max - min) + min
  return Number(value.toFixed(decimals))
}

/**
 * 從陣列中隨機選擇一個元素
 *
 * @param array - 來源陣列
 * @returns 隨機選擇的元素
 */
function getRandomElement<T>(array: readonly T[]): T {
  return array[getRandomInt(0, array.length - 1)]!
}

/**
 * 生成隨機日期字串
 *
 * @param daysAgo - 過去幾天內，預設 365 天
 * @returns ISO 格式的日期字串
 */
function getRandomDate(daysAgo: number = 365): string {
  const now = new Date()
  const past = new Date(now.getTime() - getRandomInt(0, daysAgo) * 24 * 60 * 60 * 1000)
  return past.toISOString()
}

/**
 * 生成隨機字母數字字串
 *
 * @param length - 字串長度
 * @returns 隨機字母數字字串
 */
function getRandomAlphanumeric(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(getRandomInt(0, chars.length - 1))
  }
  return result
}

/**
 * 生成單一 Mock Order Item
 *
 * @param overrides - 可選的覆蓋屬性
 * @returns Mock OrderItem 物件
 */
export function createMockOrderItem(overrides?: Partial<OrderItem>): OrderItem {
  const quantity = getRandomInt(1, 5)
  const price = getRandomFloat(10, 1000, 2)

  return {
    id: getRandomInt(1, 10000),
    productId: getRandomInt(1, 1000),
    productName: getRandomElement(PRODUCT_NAMES),
    quantity,
    price,
    subtotal: Number((quantity * price).toFixed(2)),
    ...overrides
  }
}

/**
 * 生成單一 Mock Order
 *
 * @param overrides - 可選的覆蓋屬性
 * @returns Mock Order 物件
 */
export function createMockOrder(overrides?: Partial<Order>): Order {
  const items = Array.from({ length: getRandomInt(1, 5) }, () => createMockOrderItem())
  const total = Number(items.reduce((sum, item) => sum + item.subtotal, 0).toFixed(2))

  return {
    id: getRandomInt(1, 10000),
    orderNumber: `ORD-${getRandomAlphanumeric(8)}`,
    userId: getRandomInt(1, 1000),
    status: getRandomElement(ORDER_STATUSES),
    items,
    total,
    createdAt: getRandomDate(365),
    updatedAt: getRandomDate(30),
    ...overrides
  }
}

/**
 * 批量生成 Mock Orders
 *
 * @param count - 要生成的數量
 * @returns Mock Order 陣列
 */
export function createMockOrders(count: number): Order[] {
  return Array.from({ length: count }, (_, index) => createMockOrder({ id: index + 1 }))
}

/**
 * 生成特定狀態的 Mock Order
 *
 * @param status - 訂單狀態
 * @returns Mock Order 物件
 */
export function createMockOrderByStatus(status: OrderStatus): Order {
  return createMockOrder({ status })
}
