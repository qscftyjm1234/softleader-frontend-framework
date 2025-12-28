/**
 * Mock API 系統入口
 *
 * 已改用 Repository 層 Mock（在 useApi 中攔截）
 * 此檔案保留用於檢查 Mock 是否啟用
 */

/**
 * 檢查是否啟用 Mock API
 *
 * @returns 是否啟用 Mock
 */
export function isMockEnabled(): boolean {
  // 檢查功能開關
  const featureFlag = process.env.NUXT_PUBLIC_FEATURE_API_MOCK

  // 根據環境變數決定是否啟用 Mock
  // 'true' 或 '1' 都視為啟用
  return featureFlag === 'true' || featureFlag === '1'
}
