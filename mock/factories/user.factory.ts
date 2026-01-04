/**
 * User Factory
 *
 * 使用簡單的手寫邏輯生成符合 Schema 的 Mock User 資料
 */

import type { User } from '../types/user'

// 預定義的假資料池
const FIRST_NAMES = [
  '張',
  '李',
  '王',
  '陳',
  '林',
  '黃',
  '吳',
  '劉',
  'John',
  'Mary',
  'David',
  'Sarah'
]
const LAST_NAMES = [
  '明',
  '華',
  '偉',
  '強',
  '芳',
  '麗',
  'Smith',
  'Johnson',
  'Williams',
  'Brown'
] as const
const ROLES = ['admin', 'user', 'guest'] as const

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
 * 生成隨機日期字串
 *
 * @param daysAgo - 過去幾天內，預設 365 天
 * @returns ISO 格式的日期字串
 */
function randomDate(daysAgo: number = 365): string {
  const now = new Date()
  const past = new Date(now.getTime() - randomInt(0, daysAgo) * 24 * 60 * 60 * 1000)
  return past.toISOString()
}

/**
 * 生成單一 Mock User
 *
 * @param overrides - 可選的覆蓋屬性
 * @returns Mock User 物件
 */
export function createMockUser(overrides?: Partial<User>): User {
  const id = overrides?.id !== undefined ? overrides.id : randomInt(1, 10000)
  const firstName = randomElement(FIRST_NAMES)
  const lastName = randomElement(LAST_NAMES)
  const name = `${firstName}${lastName}`
  const email = `${firstName.toLowerCase()}${lastName.toLowerCase()}${id}@example.com`

  return {
    id,
    name,
    email,
    role: randomElement(ROLES),
    avatar: `https://i.pravatar.cc/150?img=${randomInt(1, 70)}`,
    createdAt: randomDate(365),
    updatedAt: randomDate(30),
    ...overrides
  }
}

/**
 * 批量生成 Mock Users
 *
 * @param count - 要生成的數量
 * @returns Mock User 陣列
 */
export function createMockUsers(count: number): User[] {
  return Array.from({ length: count }, (_, index) => createMockUser({ id: index + 1 }))
}

/**
 * 生成特定角色的 Mock User
 *
 * @param role - 使用者角色
 * @returns Mock User 物件
 */
export function createMockUserByRole(role: 'admin' | 'user' | 'guest'): User {
  return createMockUser({ role })
}
