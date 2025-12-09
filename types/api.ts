/**
 * 標準 API 回應格式
 * @template T - 資料內容的型別
 */
export interface ApiResponse<T> {
  code: number
  message: string
  data: T
}
