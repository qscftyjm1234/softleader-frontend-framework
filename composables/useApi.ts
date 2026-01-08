import type { UseFetchOptions } from 'nuxt/app'
import { defu } from 'defu'
import type { ApiResponse } from '~/types/api'
import { handleApiError } from '~/utils/api/error'
import {
  setAuthHeader,
  setI18nHeader,
  setRequestIdHeader,
  setCsrfHeader
} from '~/utils/api/interceptors/request'
import { checkPerformance, checkAuth, checkApiError } from '~/utils/api/interceptors/response'
import { checkMockData } from '~/mock/core'
// import { useLoadingStore } from '~/stores/loading' // Removed

// 擴充 UseFetchOptions 以包含自定義選項
type UseApiOptions<T> = UseFetchOptions<T> & {
  globalLoading?: boolean
  autoError?: boolean
  autoSuccess?: boolean | string
  loadingRef?: Ref<boolean>
  auth?: boolean
  /** 動態路徑前綴 */
  prefix?: string // [NEW] 支援動態路徑前綴
}

/**
 * 封裝 Nuxt 的 useFetch，提供統一的 API 呼叫介面
 *
 * @template T - 回傳資料的型別 (拆包後的資料型別)
 * @param url - API 路徑或回傳路徑的函式
 * @param options - useFetch 的選項 (包含自定義 globalLoading)
 * @returns Nuxt useFetch 的非同步資料物件，資料已自動拆包為型別 T
 */
export function useApi<T>(
  url: string | (() => string),
  options: UseApiOptions<T> = {}
): ReturnType<typeof useFetch<T>> {
  const config = useRuntimeConfig()
  const loading = useLoading()

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
    async onRequest({ request, options }) {
      // 紀錄請求開始時間
      ;(options as any)._startTime = Date.now()

      // 處理 Loading
      if ((options as any).globalLoading) {
        loading.start()
      }

      // 處理 Button Loading
      if ((options as any).loadingRef) {
        ;(options as any).loadingRef.value = true
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
      console.log(`[API Request] ${options.method || 'GET'} ${request}`)
    },

    // 回應攔截器：在收到回應後執行
    onResponse({ response, options }) {
      const opts = options as any
      // 處理 Loading
      if (opts.globalLoading) {
        loading.finish()
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
    },

    // 錯誤攔截器：當請求失敗時執行
    onResponseError(context) {
      const opts = context.options as any
      // 處理 Loading
      if (opts.globalLoading) {
        loading.finish()
      }
      if (opts.loadingRef) {
        opts.loadingRef.value = false
      }

      // 呼叫 utils/api/error.ts 中的統一錯誤處理函式
      handleApiError(context, opts.autoError)
    }
  }

  // 合併選項 (使用 defu 進行深層合併)
  const params = defu(options, defaults)

  // [Fix] defu 會 clone 物件導致 Ref 失去響應性，故需手動還原 loadingRef
  if (options.loadingRef) {
    ;(params as any).loadingRef = options.loadingRef
  }

  // 使用 useAsyncData 搭配 $fetch，以便在請求前攔截並處理 Mock
  // 這是為了滿足「純前端 Mock」需求，同時保留 useFetch 的 DX
  const key = computed(() => {
    const _url = typeof url === 'function' ? url() : unref(url)
    return `api-${_url}-${JSON.stringify(params)}`
  })

  return useAsyncData<T, Error>(
    key.value,
    async () => {
      const _url = typeof url === 'function' ? url() : unref(url)

      // 處理 Prefix
      let finalUrl = _url
      if (params.prefix) {
        // 使用 unref 確保安全
        const pre = params.prefix.startsWith('/') ? params.prefix : `/${params.prefix}`
        // 如果 url 是絕對路徑則不加 base
        if (_url.startsWith('http')) {
          finalUrl = _url
        } else {
          // 若 params.baseURL 有值，這裡其實 fetch 會自己組，但為了 Mock 我們手動組看看?
          // 簡化：交給 $fetch 處理 base，我們只處理 prefix
          finalUrl = `${pre}${_url}`
        }
      }

      // -------------------------------------------------------------
      // 1. Mock 檢查 (Client-side Mocking)
      // -------------------------------------------------------------
      // 我們在這裡手動執行 onRequest 邏輯的一部分 (如 Loading) 是比較困難的
      // 因為 $fetch 的 onRequest 是在內部執行的。
      // 但為了讓 Mock 看起來像真的，我們需要模擬這部分。

      // 呼叫 Mock 檢查器
      const mockResult = await checkMockData(finalUrl, {
        ...params,
        // 傳入 body 以便 Mock Factory 使用 (如 create user)
        body: isRef(params.body) ? params.body.value : params.body
      })

      if (mockResult) {
        // [模擬] 執行 onRequest 攔截器行為 (Loading Start)
        if (params.onRequest) {
          await params.onRequest({ request: finalUrl, options: params } as any)
        }

        // [模擬] 模擬網路延遲 (將等待移至 onRequest 之後，確保 Loading 狀態已顯示)
        if (mockResult.delay > 0) {
          await new Promise((resolve) => setTimeout(resolve, mockResult.delay))
        }

        // [模擬] 執行 onResponse 攔截器行為 (Loading Finish)
        // 構造一個假的 response context
        const mockContext: any = {
          response: {
            _data: mockResult.data,
            status: 200,
            ok: true,
            headers: new Headers()
          },
          options: params
        }

        if (params.onResponse) {
          await params.onResponse(mockContext)
        }

        return mockResult.data
      }

      // -------------------------------------------------------------
      // 2. 真實請求 (Real Request)
      // -------------------------------------------------------------

      // 調整 params 的 baseURL (因為上面 prefix 邏輯可能需要透過 baseURL 傳遞)
      // 這裡採用簡單策略：如果用了 prefix，就直接修改 URL，不依賴 axios-style baseURL 拼接
      // 但 $fetch 支援 baseURL。

      const fetchOptions = { ...params }
      if (fetchOptions.prefix) {
        // 把 prefix 拼進 baseURL，這樣 $fetch(url) 依然乾淨
        const base = String(fetchOptions.baseURL ?? '').replace(/\/$/, '')
        const pre = fetchOptions.prefix.startsWith('/')
          ? fetchOptions.prefix
          : `/${fetchOptions.prefix}`
        fetchOptions.baseURL = `${base}${pre}`
        delete fetchOptions.prefix
      }

      const response = await $fetch<ApiResponse<T>>(
        typeof url === 'function' ? url() : unref(url),
        {
          ...fetchOptions
        } as any
      )

      return response // $fetch 會自動拋出錯誤，進入 error 狀態
    },
    {
      // Pass useAsyncData options provided in params
      server: params.server,
      lazy: params.lazy,
      immediate: params.immediate,
      watch: params.watch,
      transform: (response: any) => {
        // 這裡 response 可能是 Mock Data (原本物件) 或 $fetch Response (ApiResponse)
        // 因為 Mock 我們直接回傳了 data，所以需統一結構

        // 如果是來自 $fetch 的 ApiResponse (通常有 data 屬性包裝)
        // 或是我們 Mock 直接回傳了 { data: ... }

        const data = response.data || response

        if (params.transform) {
          return (params.transform as any)(data)
        }
        return data
      },
      pick: params.pick
    }
  ) as any
}

/**
 * 💡 Smart Client: 建立具備特定 Prefix 的 API 客戶端
 * 這被認為是「最棒」的管理模式，因為它極度簡化了 Repository 的代碼
 *
 * @param prefix
 * @returns 包含常用 HTTP 方法 (get, post, put, patch, delete) 的物件
 * @example
 * const api = useClient('/jasmine-mar/policy')
 * api.get('/list') // 自動發送 GET /jasmine-mar/policy/list
 */
export const useClient = (prefix: string) => {
  // 核心 helper：統一處理 method 與 prefix 注入
  const call = <T>(method: string, url: string, body?: any, options: UseApiOptions<T> = {}) =>
    useApi<T>(url, {
      ...options,
      method: method as any,
      prefix,
      body
    })

  return {
    get: <T>(url: string, options: UseApiOptions<T> = {}) =>
      call<T>('GET', url, undefined, options),
    post: <T>(url: string, body?: any, options: UseApiOptions<T> = {}) =>
      call<T>('POST', url, body, options),
    put: <T>(url: string, body?: any, options: UseApiOptions<T> = {}) =>
      call<T>('PUT', url, body, options),
    patch: <T>(url: string, body?: any, options: UseApiOptions<T> = {}) =>
      call<T>('PATCH', url, body, options),
    delete: <T>(url: string, options: UseApiOptions<T> = {}) =>
      call<T>('DELETE', url, undefined, options)
  }
}
