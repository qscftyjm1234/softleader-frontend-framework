import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e', // 你的測試檔案放這裡
  timeout: 30_000,
  use: {
    // headless: true, // 是否無頭模式
    // baseURL: 'http://localhost:3000/en', // Nuxt 3 本地伺服器 URL
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true
  }
})
