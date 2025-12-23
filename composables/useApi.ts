import type { UseFetchOptions } from 'nuxt/app'
import { defu } from 'defu'
import type { ApiResponse } from '~/types/api'
import { handleApiError } from '~/utils/api/error'
import { setAuthHeader, setI18nHeader, setRequestIdHeader, setCsrfHeader } from '~/utils/api/interceptors/request'
import { checkPerformance, checkAuth, checkApiError, checkRefreshToken } from '~/utils/api/interceptors/response'
import { useLoadingStore } from '~/stores/loading'

// 擴充 UseFetchOptions 以包含自定義選項
type UseApiOptions<T> = UseFetchOptions<T> & {
  globalLoading?: boolean
  autoError?: boolean
  autoSuccess?: boolean | string
  loadingRef?: Ref<boolean>
  auth?: boolean
  prefix?: string // [NEW] 支援動態路徑前綴
}

/**
 * 封裝 Nuxt 的 useFetch，提供統一的 API 呼叫介面
 * 
 * @template T - 回傳資料的型別 (拆包後的資料型別)
 * @param url - API 路徑或回傳路徑的函式
 * @param options - useFetch 的選項 (包含自定義 globalLoading)
 */
export function useApi<T>(url: string | (() => string), options: UseApiOptions<T> = {}) {
  const config = useRuntimeConfig()
  const loadingStore = useLoadingStore()

  // 定義預設選項
  const defaults: UseApiOptions<ApiResponse<T>> = {
    // API 基礎路徑
    baseURL: config.public.api.baseUrl as string,
    // 請求超時時間 (ms)
    timeout: Number(config.public.api.timeout),
    // 失敗重試次數
    retry: Number(config.public.api.retry),
    // 預設開啟全域 Loading
    globalLoading: (config.public.api.globalLoading as boolean) ?? true,
    // 自動顯示錯誤訊息
    autoError: true,
    // 自動顯示成功訊息
    autoSuccess: false,
    // 權限檢查 (預設開啟)，避免無須auth的API導回login頁面
    auth: true,

    // 請求攔截器：在發送請求前執行
    onRequest({ request, options }) {
      // 紀錄請求開始時間
      (options as any)._startTime = Date.now()

      // 處理 Loading
      if ((options as any).globalLoading) {
        loadingStore.startLoading()
      }

      // 處理 Button Loading
      if ((options as any).loadingRef) {
        (options as any).loadingRef.value = true
      }

      // 1. 初始化 Headers
      options.headers = options.headers || {}
      const headers = options.headers as any

      // 2. 設定 Headers
      setAuthHeader(headers, config)
      setCsrfHeader(headers)
      setI18nHeader(headers)
      setRequestIdHeader(headers)
      
      // Log 方便除錯
      // console.log(`[API] ${options.method || 'GET'} ${request}`)
    },

    // 回應攔截器：在收到回應後執行
    onResponse({ response, options }) {
      const opts = options as any
      // 處理 Loading
      if (opts.globalLoading) {
        loadingStore.finishLoading()
      }
      if (opts.loadingRef) {
        opts.loadingRef.value = false
      }

      // 處理 Auto Success
      if (response.ok && opts.autoSuccess) {
        const msg = typeof opts.autoSuccess === 'string' ? opts.autoSuccess : '操作成功'
        useNotify().success(msg)
      }

      // 1. 效能監控
      checkPerformance(response, options)

      // 2. 全域登出 (傳入 auth 參數)
      checkAuth(response, config, opts.auth)

      // 3. 錯誤處理
      checkApiError(response)

      // 4. Token 更新 (預留)
      // checkRefreshToken(response, config)
    },

    // 錯誤攔截器：當請求失敗時執行
    onResponseError(context) {
      const opts = context.options as any
      // 處理 Loading
      if (opts.globalLoading) {
        loadingStore.finishLoading()
      }
      if (opts.loadingRef) {
        opts.loadingRef.value = false
      }

      // 呼叫 utils/api/error.ts 中的統一錯誤處理函式
      handleApiError(context, opts.autoError)
    }
  }

  // 合併選項 (使用 defu 進行深層合併，比手動 spread 更安全漂亮)
  const params = defu(options, defaults)

  // [NEW] 處理 Prefix: 自動將 prefix 接在 baseURL 後面
  // 範例：BaseURL(https://api.com) + Prefix(/jasmine) = https://api.com/jasmine
  if (params.prefix) {
    // 確保 baseURL 不會以 / 結尾且 prefix 以 / 開頭
    // 使用 unref 確保即使傳入 ref 也能正確處理
    const base = String(unref(params.baseURL) ?? '').replace(/\/$/, '')
    const pre = params.prefix.startsWith('/') ? params.prefix : `/${params.prefix}`
    
    // 注意：這裡將組合後的 URL 寫回 baseURL
    params.baseURL = `${base}${pre}`
  }

  // 回傳原生的 useFetch
  // 注意：這裡指定 useFetch 的回傳型別為 ApiResponse<T>，但透過 transform 轉成 T
  return useFetch<ApiResponse<T>>(url, {
    ...params,
    transform: (response) => {
      // 自動拆包：只回傳 data 部分，處理資料轉換
      return response.data as T
    }
  } as UseFetchOptions<ApiResponse<T>>)
}

/**
 * 💡 Smart Client: 建立具備特定 Prefix 的 API 客戶端
 * 這被認為是「最棒」的管理模式，因為它極度簡化了 Repository 的代碼
 * 
 * @example
 * const api = useClient('/jasmine-mar/policy')
 * api.get('/list') // 自動發送 GET /jasmine-mar/policy/list
 */
export const useClient = (prefix: string) => {
  // 核心 helper：統一處理 method 與 prefix 注入
  const call = <T>(method: string, url: string, body?: any, options: UseApiOptions<T> = {}) => {
    return useApi<T>(url, {
      ...options,
      method: method as any,
      prefix,
      body 
    })
  }

  return {
    get: <T>(url: string, options: UseApiOptions<T> = {}) => call<T>('GET', url, undefined, options),
    post: <T>(url: string, body?: any, options: UseApiOptions<T> = {}) => call<T>('POST', url, body, options),
    put: <T>(url: string, body?: any, options: UseApiOptions<T> = {}) => call<T>('PUT', url, body, options),
    patch: <T>(url: string, body?: any, options: UseApiOptions<T> = {}) => call<T>('PATCH', url, body, options),
    delete: <T>(url: string, options: UseApiOptions<T> = {}) => call<T>('DELETE', url, undefined, options)
  }
}
