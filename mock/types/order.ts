/**
 * Order Schema 定義
 *
 * 定義 Order 相關的 API Interface
 */

/**
 * 訂單狀態
 */
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

/**
 * 訂單項目 Interface
 */
export interface OrderItem {
  id: number
  productId: number
  productName: string
  quantity: number
  price: number
  subtotal: number
}

/**
 * 訂單 Interface
 */
export interface Order {
  id: number
  orderNumber: string
  userId: number
  status: OrderStatus
  items: OrderItem[]
  total: number
  createdAt: string
  updatedAt: string
}

/**
 * 訂單列表響應 Interface
 */
export interface OrderListResponse {
  data: Order[]
  total: number
  page: number
  limit: number
}

/**
 * 訂單詳情響應 Interface
 */
export type OrderDetailResponse = Order
