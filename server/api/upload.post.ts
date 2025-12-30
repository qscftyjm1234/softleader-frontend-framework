/**
 * Mock API: 檔案上傳
 *
 * 用途: 模擬檔案上傳功能
 * 路徑: POST /api/upload
 */

export default defineEventHandler(async (event) => {
  // 模擬上傳延遲
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // 模擬成功回應
  return {
    success: true,
    message: '檔案上傳成功',
    data: {
      filename: 'uploaded-file.jpg',
      size: 1024000,
      url: '/uploads/uploaded-file.jpg',
      uploadedAt: new Date().toISOString()
    }
  }
})
