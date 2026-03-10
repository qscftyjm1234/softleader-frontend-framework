import type { NuxtConfig } from 'nuxt/schema'
import { API_PROJECTS } from './api'

/**
 * 編譯與伺服器引擎設定 (Compiler & Server Engine Config)
 *
 * 整合了以往分散的 build.ts, vite.ts 與 nitro.ts。
 * 統一管理 Nuxt 的建置行為、Vite 優化以及 Nitro 伺服器配置。
 */

// 1. Build Config
export const buildConfig: NuxtConfig['build'] = {
  transpile: []
}

// 2. Vite Config
export const viteConfig: NuxtConfig['vite'] = {
  warmup: {
    clientFiles: ['./app.vue', './pages/**/*.vue']
  },
  optimizeDeps: {
    include: ['ant-design-vue', 'dayjs', 'lodash.clonedeep']
  }
}

// 3. Nitro Config
export const nitroConfig: NuxtConfig['nitro'] = {
  compressPublicAssets: true,
  typescript: {
    tsConfig: {
      compilerOptions: {
        composite: true,
        emitDeclarationOnly: true,
        noEmit: false
      }
    }
  },
  devProxy: API_PROJECTS.reduce(
    (acc, project) => {
      acc[project.prefix] = {
        target: project.devTarget,
        changeOrigin: true,
        secure: true
      }
      return acc
    },
    {} as Record<string, any>
  )
}
