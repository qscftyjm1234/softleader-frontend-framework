/**
 * Order Schema 定義
 *
 * 使用 Zod 定義 Order 相關的 API Schema
 */

import { z } from 'zod'

/**
 * 訂單狀態
 */
export const OrderStatusSchema = z.enum([
  'pending',
  'processing',
  'shipped',
  'delivered',
  'cancelled'
])

/**
 * 訂單項目 Schema
 */
export const OrderItemSchema = z.object({
  id: z.number(),
  productId: z.number(),
  productName: z.string(),
  quantity: z.number().min(1),
  price: z.number().min(0),
  subtotal: z.number().min(0)
})

/**
 * 訂單 Schema
 */
export const OrderSchema = z.object({
  id: z.number(),
  orderNumber: z.string(),
  userId: z.number(),
  status: OrderStatusSchema,
  items: z.array(OrderItemSchema),
  total: z.number().min(0),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
})

/**
 * 訂單列表響應 Schema
 */
export const OrderListResponseSchema = z.object({
  data: z.array(OrderSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number()
})

/**
 * 訂單詳情響應 Schema
 */
export const OrderDetailResponseSchema = OrderSchema

// 匯出型別
export type OrderStatus = z.infer<typeof OrderStatusSchema>
export type OrderItem = z.infer<typeof OrderItemSchema>
export type Order = z.infer<typeof OrderSchema>
export type OrderListResponse = z.infer<typeof OrderListResponseSchema>
export type OrderDetailResponse = z.infer<typeof OrderDetailResponseSchema>
