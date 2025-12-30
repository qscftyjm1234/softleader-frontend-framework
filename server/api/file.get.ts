/**
 * Mock API: 通用檔案下載
 *
 * 用途: 模擬通用檔案下載功能
 * 路徑: GET /api/file
 */

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // 模擬下載延遲
  await new Promise((resolve) => setTimeout(resolve, 500))

  const filename = query.filename || 'download.txt'
  const content =
    query.content || 'This is a mock file content.\nGenerated at: ' + new Date().toISOString()

  setResponseHeaders(event, {
    'Content-Type': 'application/octet-stream',
    'Content-Disposition': `attachment; filename="${filename}"`
  })

  return content
})
