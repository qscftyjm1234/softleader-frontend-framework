/**
 * 批量修復 JSDoc 錯誤的腳本
 */

const fs = require('fs')
const path = require('path')

// 需要修復的文件列表
const filesToFix = [
  'utils/security/mask.ts',
  'utils/math.ts',
  'utils/global/logger.ts',
  'utils/api/error.ts',
  'utils/api/interceptors/request.ts',
  'utils/api/interceptors/response.ts',
  'stores/app.ts',
  'stores/user.ts',
  'scripts/dev.js',
  'scripts/generate-module.js',
  'repositories/modules/user.ts',
  'repositories/modules/order.ts'
]

/**
 * 修復文件中的 JSDoc 錯誤
 *
 * @param {string} filePath - 文件路徑
 */
function fixJSDocInFile(filePath) {
  const fullPath = path.join(process.cwd(), filePath)

  if (!fs.existsSync(fullPath)) {
    console.log(`⏭️  跳過不存在的文件: ${filePath}`)
    return
  }

  let content = fs.readFileSync(fullPath, 'utf-8')
  let modified = false

  // 修復 1: 替換無效的中文 JSDoc 標籤
  if (content.includes('@功能') || content.includes('@用法')) {
    content = content.replace(/@功能/g, '@description')
    content = content.replace(/@用法/g, '@example')
    modified = true
  }

  // 修復 2: 為缺少 @returns 的函數添加
  const functionPattern =
    /\/\*\*[\s\S]*?\*\/\s*(?:export\s+)?function\s+\w+\s*\([^)]*\)\s*:\s*(\w+)/g
  let match
  const fixes = []

  while ((match = functionPattern.exec(content)) !== null) {
    const jsdocStart = content.lastIndexOf('/**', match.index)
    const jsdocEnd = content.indexOf('*/', jsdocStart) + 2
    const jsdoc = content.substring(jsdocStart, jsdocEnd)

    // 檢查是否缺少 @returns 且返回類型不是 void
    if (!jsdoc.includes('@returns') && !jsdoc.includes('@return') && match[1] !== 'void') {
      fixes.push({
        position: jsdocEnd - 3, // 在 */ 之前插入
        text: ` * @returns ${match[1]} 返回值\n `
      })
    }
  }

  // 從後往前應用修復,避免位置偏移
  fixes.reverse().forEach((fix) => {
    content = content.substring(0, fix.position) + fix.text + content.substring(fix.position)
    modified = true
  })

  if (modified) {
    fs.writeFileSync(fullPath, content, 'utf-8')
    console.log(`✅ 已修復: ${filePath}`)
  } else {
    console.log(`⏭️  無需修復: ${filePath}`)
  }
}

// 執行修復
console.log('開始批量修復 JSDoc 錯誤...\n')
filesToFix.forEach(fixJSDocInFile)
console.log('\n✅ 批量修復完成!')
