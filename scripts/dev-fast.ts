import { spawn } from 'child_process'

/**
 * 快速啟動腳本 - 跳過模組生成，直接啟動 Nuxt
 *
 * 使用方式：
 * npm run dev:fast
 *
 * 或在 package.json 添加：
 * "dev:fast": "node scripts/dev-fast.js"
 */

console.log('\x1b[32m🚀 快速啟動 Nuxt 開發伺服器...\x1b[0m\n')
console.log('\x1b[33m⚠️  注意：此模式不會監聽模組變更\x1b[0m')
console.log('\x1b[33m   如需更新模組，請執行: npm run gen:all\x1b[0m\n')

// 直接啟動 Nuxt Dev Server
const nuxt = spawn('nuxt', ['dev'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, FORCE_COLOR: 'true' }
})

// Handle termination
const cleanup = () => {
  console.log('\n\x1b[33m🛑 Shutting down...\x1b[0m')
  nuxt.kill()
  process.exit()
}

process.on('SIGINT', cleanup)
process.on('SIGTERM', cleanup)
process.on('exit', cleanup)
