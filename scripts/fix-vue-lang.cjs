/**
 * 批量為 Vue 文件添加 lang="ts" 屬性
 */

const fs = require('fs')
const path = require('path')

// 需要修復的文件列表
const files = [
  'pages/other/clone/index.vue',
  'pages/other/modules/index.vue',
  'pages/other/tryMiddleware/index.vue',
  'pages/other/runtimeConfig/index.vue',
  'pages/other/router/index.vue',
  'pages/other/router/[id].vue',
  'pages/other/router/child-router/index.vue',
  'pages/other/plugins/index.vue',
  'pages/other/composable/index.vue',
  'pages/other/layout/index.vue',
  'app.vue'
]

console.log(`開始批量修復 ${files.length} 個文件...\n`)

let fixedCount = 0

files.forEach((filePath) => {
  const fullPath = path.join(process.cwd(), filePath)

  if (!fs.existsSync(fullPath)) {
    console.log(`⏭️  文件不存在: ${filePath}`)
    return
  }

  let content = fs.readFileSync(fullPath, 'utf-8')

  // 替換 <script setup> 為 <script setup lang="ts">
  if (content.includes('<script setup>')) {
    content = content.replace(/<script setup>/g, '<script setup lang="ts">')
    fs.writeFileSync(fullPath, content, 'utf-8')
    console.log(`✅ 已修復: ${filePath}`)
    fixedCount++
  } else {
    console.log(`⏭️  已經有 lang 屬性: ${filePath}`)
  }
})

console.log(`\n✅ 批量修復完成! 共修復 ${fixedCount} 個文件`)
