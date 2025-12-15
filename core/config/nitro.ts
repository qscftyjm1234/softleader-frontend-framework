import type { NuxtConfig } from 'nuxt/schema'

export const nitroConfig: NuxtConfig['nitro'] = {
  compressPublicAssets: true // 壓縮 public 資源 (gzip/brotli)
}
