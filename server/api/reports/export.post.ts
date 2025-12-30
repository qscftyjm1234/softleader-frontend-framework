/**
 * Mock API: 報表匯出
 *
 * 用途: 模擬報表匯出功能
 * 路徑: POST /api/reports/export
 */

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // 模擬報表生成延遲
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // 模擬 PDF 報表內容
  const content = `Report Generated
Date: ${new Date().toLocaleDateString()}
Type: ${body.type || 'General Report'}
Period: ${body.startDate || 'N/A'} - ${body.endDate || 'N/A'}

This is a mock PDF report content.`

  setResponseHeaders(event, {
    'Content-Type': 'application/pdf',
    'Content-Disposition': 'attachment; filename="report.pdf"'
  })

  return content
})
