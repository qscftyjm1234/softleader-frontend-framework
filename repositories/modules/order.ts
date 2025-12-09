import { useApi } from '~/composables/useApi'
import type { OrderListResponse, OrderDetailResponse } from '~/types/api'

// 輔助型別：允許傳入一般值或 Ref (響應式變數)
type MaybeRef<T> = T | Ref<T>

// 定義查詢參數介面
interface OrderQueryParams {
  page?: MaybeRef<number>
  itemsPerPage?: MaybeRef<number>
  status?: MaybeRef<string>
  q?: MaybeRef<string>
}

export default {
  /**
   * 取得訂單列表
   * @param params - 查詢參數
   */
  getOrders(params: OrderQueryParams = {}) {
    return useApi<OrderListResponse>('/orders', {
      method: 'GET',
      query: params,
    })
  },

  /**
   * 根據 ID 取得訂單詳情
   * @param id - 訂單 ID
   */
  getOrderById(id: MaybeRef<string | number>) {
    return useApi<OrderDetailResponse>(() => `/orders/${unref(id)}`, {
      method: 'GET'
    })
  },

  /**
   * 建立新訂單
   * @param orderData - 訂單資料
   */
  createOrder(orderData: any) {
    return useApi('/orders', {
      method: 'POST',
      body: orderData
    })
  }
}
