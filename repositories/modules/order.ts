import { useClient } from '~/composables/useApi'
import type { OrderListResponse, OrderDetailResponse } from '~/types/api'

// 輔助型別
type MaybeRef<T> = T | Ref<T>

interface OrderQueryParams {
  page?: MaybeRef<number>
  itemsPerPage?: MaybeRef<number>
  status?: MaybeRef<string>
  q?: MaybeRef<string>
}

// 1. 定義 Client
const api = useClient('/orders')

export default {
  /**
   * 取得訂單列表
   */
  getOrders(params: OrderQueryParams = {}) {
    // GET /orders
    return api.get<OrderListResponse>('/', { query: params })
  },

  /**
   * 根據 ID 取得訂單詳情
   */
  getOrderById(id: MaybeRef<string | number>) {
    // GET /orders/:id
    return api.get<OrderDetailResponse>(`/${unref(id)}`)
  },

  /**
   * 建立新訂單
   */
  createOrder(orderData: any) {
    // POST /orders
    return api.post('/', orderData)
  }
}
