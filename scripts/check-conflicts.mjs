import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')

/**
 * 檢查父目錄是否存在衝突的 node_modules
 */
function checkParentModules() {
  let currentDir = projectRoot
  let foundConflict = false

  // 檢查專案根目錄上方最多 3 層
  for (let i = 0; i < 3; i++) {
    const parentDir = path.dirname(currentDir)
    if (parentDir === currentDir) break // 已到達根目錄

    const nodeModulesPath = path.join(parentDir, 'node_modules')
    const packageJsonPath = path.join(parentDir, 'package.json')

    if (fs.existsSync(nodeModulesPath)) {
      console.error(`\x1b[31m[偵測到衝突]\x1b[0m 在父目錄發現 node_modules: ${parentDir}`)
      console.error(`這通常會導致 Nuxt 3 出現 "builder" 未定義的錯誤。`)
      foundConflict = true
    }

    if (fs.existsSync(packageJsonPath)) {
      console.warn(`\x1b[33m[警告]\x1b[0m 在父目錄發現 package.json: ${parentDir}`)
    }

    currentDir = parentDir
  }

  if (!foundConflict) {
    console.log('\x1b[32m[正常]\x1b[0m 未偵測到衝突的父目錄 node_modules。')
  } else {
    process.exit(1)
  }
}

checkParentModules()
