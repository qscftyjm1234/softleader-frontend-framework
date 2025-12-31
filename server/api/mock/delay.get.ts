export default defineEventHandler(async (event) => {
  // 模擬網路延遲 2秒
  await new Promise((resolve) => setTimeout(resolve, 2000))

  return {
    code: 200,
    message: 'success',
    data: {
      timestamp: Date.now()
    }
  }
})
