/**
 * Mock API: 報表生成
 *
 * 用途: 模擬報表生成功能
 * 路徑: POST /api/reports/generate
 */

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // 模擬報表生成延遲
  await new Promise((resolve) => setTimeout(resolve, 1500))

  return {
    success: true,
    message: '報表生成成功',
    data: {
      reportId: 'RPT-' + Date.now(),
      type: body.type || 'monthly',
      generatedAt: new Date().toISOString(),
      downloadUrl: '/api/reports/download/RPT-' + Date.now()
    }
  }
})
