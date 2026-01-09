/**
 * User Schema 定義
 *
 * 定義 User 相關的 API Interface
 */

/**
 * 使用者 Interface
 */
export interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user' | 'guest'
  avatar?: string
  createdAt: string
  updatedAt: string
}

/**
 * 使用者列表響應 Interface
 */
export interface UserListResponse {
  data: User[]
  total: number
  page: number
  limit: number
}

/**
 * 使用者詳情響應 Interface
 */
export type UserDetailResponse = User

/**
 * 建立使用者請求 Interface
 */
export interface CreateUserRequest {
  name: string
  email: string
  password: string
  role?: 'admin' | 'user' | 'guest'
}

/**
 * 更新使用者請求 Interface
 */
export interface UpdateUserRequest extends Partial<CreateUserRequest> {}
