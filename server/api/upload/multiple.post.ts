/**
 * Mock API: 多檔案上傳
 *
 * 用途: 模擬多檔案上傳功能
 * 路徑: POST /api/upload/multiple
 */

export default defineEventHandler(async (event) => {
  // 模擬上傳延遲
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // 模擬成功回應
  return {
    success: true,
    message: '檔案批次上傳成功',
    data: {
      files: [
        {
          filename: 'file-1.jpg',
          size: 1024000,
          url: '/uploads/file-1.jpg'
        },
        {
          filename: 'file-2.pdf',
          size: 2048000,
          url: '/uploads/file-2.pdf'
        }
      ],
      uploadedAt: new Date().toISOString()
    }
  }
})
