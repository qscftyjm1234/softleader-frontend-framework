/**
 * Mock API: 檔案匯出
 *
 * 用途: 模擬檔案匯出/下載功能
 * 路徑: GET /api/files/export
 */

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // 模擬處理延遲
  await new Promise((resolve) => setTimeout(resolve, 800))

  // 根據 format 參數返回不同類型的檔案
  const format = query.format || 'csv'

  let content = ''
  let contentType = ''
  let filename = ''

  switch (format) {
    case 'csv':
      content = 'Name,Email,Role\nJohn Doe,john@example.com,Admin\nJane Smith,jane@example.com,User'
      contentType = 'text/csv'
      filename = 'export.csv'
      break
    case 'json':
      content = JSON.stringify(
        [
          { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
          { name: 'Jane Smith', email: 'jane@example.com', role: 'User' }
        ],
        null,
        2
      )
      contentType = 'application/json'
      filename = 'export.json'
      break
    case 'xlsx':
      // 模擬 Excel 檔案 (實際應該返回二進制資料)
      content = 'Excel file content (binary)'
      contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      filename = 'export.xlsx'
      break
    default:
      content = 'Export data'
      contentType = 'text/plain'
      filename = 'export.txt'
  }

  // 設定下載標頭
  setResponseHeaders(event, {
    'Content-Type': contentType,
    'Content-Disposition': `attachment; filename="${filename}"`
  })

  return content
})
