import type { UseFetchOptions } from 'nuxt/app'
import type { UserListResponse } from '~/types/api'

type MaybeRef<T> = T | Ref<T>

interface UserQueryParams {
  page?: MaybeRef<number>
  itemsPerPage?: MaybeRef<number>
  q?: MaybeRef<string>
}

// 1. 定義 Client
const api = useClient('/users')

export default {
  /**
   * 取得使用者列表
   * @param params - 查詢參數 (如分頁、搜尋關鍵字)
   * @param options - 其他 Fetch 選項
   * @returns List of users
   */
  getUsers(params: UserQueryParams = {}, options: UseFetchOptions<UserListResponse> = {}) {
    return api.get<UserListResponse>('/', {
      query: params,
      ...options
    })
  },

  /**
   * 根據 ID 取得單一使用者
   * @param id - 使用者 ID
   * @returns User detail
   */
  getUserById(id: MaybeRef<number>) {
    return api.get<any>(`/${unref(id)}`)
  },

  /**
   * 建立使用者
   * @param userData
   */
  createUser(userData: any) {
    return api.post('/', userData)
  },

  /**
   * 更新使用者
   * @param id
   * @param userData
   */
  updateUser(id: number, userData: any) {
    return api.put(`/${id}`, userData)
  },

  /**
   * 刪除使用者
   * @param id
   */
  deleteUser(id: number) {
    return api.delete(`/${id}`)
  }
}
