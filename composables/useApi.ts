import type { UseFetchOptions } from 'nuxt/app'
import { defu } from 'defu'
import type { ApiResponse } from '~/types/api'
import {
  setAuthHeader,
  setI18nHeader,
  setRequestIdHeader,
  setCsrfHeader
} from '~/utils/api/interceptors/request'
import { checkPerformance, checkAuth, checkApiError } from '~/utils/api/interceptors/response'
import { checkMockData } from '~/mock/core'
import { useErrorHandler } from '~/composables/useErrorHandler'

// 擴充 UseFetchOptions 以包含自定義選項
type UseApiOptions<T> = UseFetchOptions<T> & {
  globalLoading?: boolean
  autoError?: boolean
  autoSuccess?: boolean | string
  loadingRef?: Ref<boolean>
  auth?: boolean
  /** 動態路徑前綴 */
  prefix?: string
}

/**
 * 封裝 Nuxt 的 useFetch，提供統一的 API 呼叫介面
 *
 * @template T - 回傳資料的型別 (拆包後的資料型別)
 * @param url - API 路徑或回傳路徑的函式
 * @param options - useFetch 的選項
 * @returns Nuxt useFetch 的非同步資料物件
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
    // 權限檢查 (預設開啟)
    auth: true,

    // 請求攔截器
    async onRequest({ request, options }) {
      ;(options as any)._startTime = Date.now()

      if ((options as any).globalLoading) {
        loading.start()
      }

      if ((options as any).loadingRef) {
        ;(options as any).loadingRef.value = true
      }

      options.headers = options.headers || {}
      const headers = options.headers as any

      setAuthHeader(headers, config)
      setCsrfHeader(headers)
      setI18nHeader(headers)
      setRequestIdHeader(headers)

      console.log(`[API Request] ${options.method || 'GET'} ${request}`)
    },

    // 回應攔截器
    onResponse({ response, options }) {
      const opts = options as any
      if (opts.globalLoading) {
        loading.finish()
      }
      if (opts.loadingRef) {
        opts.loadingRef.value = false
      }

      if (response.ok && opts.autoSuccess) {
        const msg = typeof opts.autoSuccess === 'string' ? opts.autoSuccess : '操作成功'
        useNotify().success(msg)
      }

      checkPerformance(response, options)
      checkAuth(response, config, opts.auth)
      checkApiError(response)
    },

    // 錯誤攔截器
    onResponseError(context) {
      const opts = context.options as any
      if (opts.globalLoading) {
        loading.finish()
      }
      if (opts.loadingRef) {
        opts.loadingRef.value = false
      }

      // 使用 useErrorHandler 的全域錯誤處理
      const { handleApiError } = useErrorHandler()
      handleApiError(context, opts.autoError)
    }
  }

  // 合併選項
  const params = defu(options, defaults)

  if (options.loadingRef) {
    ;(params as any).loadingRef = options.loadingRef
  }

  const key = computed(() => {
    const _url = typeof url === 'function' ? url() : unref(url)
    return `api-${_url}-${JSON.stringify(params)}`
  })

  return useAsyncData<T, Error>(
    key.value,
    async () => {
      const _url = typeof url === 'function' ? url() : unref(url)

      let finalUrl = _url
      if (params.prefix) {
        const pre = params.prefix.startsWith('/') ? params.prefix : `/${params.prefix}`
        finalUrl = _url.startsWith('http') ? _url : `${pre}${_url}`
      }

      // Mock 檢查
      const mockResult = await checkMockData(finalUrl, {
        ...params,
        body: isRef(params.body) ? params.body.value : params.body
      })

      if (mockResult) {
        if (params.onRequest) {
          await params.onRequest({ request: finalUrl, options: params } as any)
        }

        if (mockResult.delay > 0) {
          await new Promise((resolve) => setTimeout(resolve, mockResult.delay))
        }

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

      // 真實請求
      const fetchOptions = { ...params }
      if (fetchOptions.prefix) {
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

      return response
    },
    {
      server: params.server,
      lazy: params.lazy,
      immediate: params.immediate,
      watch: params.watch,
      transform: (response: any) => {
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
 * Smart Client: 建立具備特定 Prefix 的 API 客戶端
 * @param prefix
 */
export const useClient = (prefix: string) => {
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
