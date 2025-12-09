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
    baseURL: config.public.apiBase as string,
    // 請求超時時間 (ms)
    timeout: Number(config.public.apiTimeout),
    // 失敗重試次數
    retry: Number(config.public.apiRetryCount),
    // 預設開啟全域 Loading
    globalLoading: (config.public.apiGlobalLoading as boolean) ?? true,

    // 請求攔截器：在發送請求前執行
    onRequest({ request, options }) {
      // 紀錄請求開始時間
      (options as any)._startTime = Date.now()

      // 處理 Loading
      if ((options as any).globalLoading) {
        loadingStore.startLoading()
      }

      // 1. 初始化 Headers
      options.headers = options.headers || {}
      const headers = options.headers as Record<string, string>

      // 2. 設定 Headers
      setAuthHeader(headers, config)
      setCsrfHeader(headers)
      setI18nHeader(headers)
      setRequestIdHeader(headers)
      
      // Log 方便除錯
      // console.log(`[API] ${options.method || 'GET'} ${request}`)
    },
    // ... (rest of the file) ...

    // 回應攔截器：在收到回應後執行
    onResponse({ response, options }) {
      // 處理 Loading
      if ((options as any).globalLoading) {
        loadingStore.finishLoading()
      }

      // 1. 效能監控
      checkPerformance(response, options)

      // 2. 全域登出
      checkAuth(response, config)

      // 3. 錯誤處理
      checkApiError(response)

      // 4. Token 更新 (預留)
      // checkRefreshToken(response, config)
    },

    // 錯誤攔截器：當請求失敗時執行
    onResponseError(context) {
      // 處理 Loading
      if ((context.options as any).globalLoading) {
        loadingStore.finishLoading()
      }

      // 呼叫 utils/api/error.ts 中的統一錯誤處理函式
      handleApiError(context)
    }
  }

  // 合併選項 (使用 defu 進行深層合併，比手動 spread 更安全漂亮)
  const params = defu(options, defaults)

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
