import { test, expect } from '@playwright/test'

test('首頁應該包含文字', async ({ page }) => {
  // 開啟目標頁面
  await page.goto('http://localhost:3000/')

  const h1 = page.locator('h1')
  await h1.waitFor({ timeout: 15000 }) // 等最多 15 秒
  console.log(await page.content())
  await expect(h1).toHaveText('歡迎光臨')
})
