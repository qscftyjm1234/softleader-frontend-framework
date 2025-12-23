// @ts-check

/**
 * lint-staged 設定檔
 * 這裡設定的任務只會針對「本次 Commit 有修改到的檔案」執行，速度較快。
 */
export default {
  // 針對所有 JS, TS, Vue 檔案
  // 1. 執行 ESLint 並嘗試自動修復 (--fix)
  // 2. 執行 Prettier 自動格式化
  '*.{js,ts,vue}': [
    'eslint --fix',
    'prettier --write'
  ],

  // 針對 JSON, Markdown, YAML, CSS, HTML 檔案
  // 1. 只執行 Prettier 自動格式化 (這些檔案通常不需要 ESLint)
  '*.{json,md,yml,yaml,css,html}': [
    'prettier --write'
  ]
}
