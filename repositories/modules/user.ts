import { useApi } from '~/composables/useApi'
import type { UseFetchOptions } from 'nuxt/app'
import type { UserListResponse } from '~/types/api'

// 輔助型別：允許傳入一般值或 Ref (響應式變數)
// 這樣 useFetch 就可以自動監聽變數變化並重新發送請求
type MaybeRef<T> = T | Ref<T>

// 定義查詢參數介面
interface UserQueryParams {
  page?: MaybeRef<number>
  itemsPerPage?: MaybeRef<number>
  q?: MaybeRef<string>
}

export default {
  /**
   * 取得使用者列表
   * @param params - 查詢參數 (支援響應式)
   * @param options - 額外的 useApi 選項 (例如 headers)
   */
  getUsers(params: UserQueryParams = {}, options: UseFetchOptions<UserListResponse> = {}) {
    return useApi<UserListResponse>('/users', {
      method: 'GET',
      query: params,
      ...options // 將外部傳入的選項合併進來
    })
  },
  
  /**
   * 根據 ID 取得單一使用者
   * @param id - 使用者 ID (支援響應式)
   */
  getUserById(id: MaybeRef<number>) {
    // 當 URL 路徑包含響應式變數時，必須傳入一個函式 (() => string)
    // 並使用 unref() 來取得實際數值
    return useApi<any>(() => `/users/${unref(id)}`, {
      method: 'GET'
    })
  },

  /**
   * [範例] 建立使用者 (POST 請求)
   * @param userData - 使用者資料物件
   */
  createUser(userData: any) {
    return useApi('/users', {
      method: 'POST',
      body: userData // useFetch 會自動將物件轉為 JSON
    })
  },

  /**
   * [範例] 搜尋使用者 (自動監聽變化)
   * @param keyword - 搜尋關鍵字 (Ref)
   */
  searchUsers(keyword: Ref<string>) {
    return useApi('/users/search', {
      method: 'GET',
      query: { q: keyword }, // 傳入 Ref，useFetch 會自動解包
      watch: [keyword],      // 明確指定：當 keyword 變更時自動重發請求
      // transform: (res: any) => res.items // 可選：只取回傳資料的某個欄位
    })
  },

  /**
   * [範例] 取得大量資料 (延遲載入)
   * 適用於非關鍵資料，避免阻塞頁面導航
   */
  getHeavyData() {
    return useApi('/heavy-report', {
      lazy: true // 開啟 Lazy 模式，頁面會先顯示，資料載入中狀態可由 pending 控制
    })
  }
}
