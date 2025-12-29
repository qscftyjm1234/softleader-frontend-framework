/**
 * Lint-staged 配置
 * 在 git commit 前自動檢查和修復即將提交的檔案
 */
export default {
  // TypeScript/JavaScript 檔案
  '*.{js,jsx,ts,tsx,mjs,cjs}': ['eslint --fix', 'prettier --write'],

  // Vue 檔案
  '*.vue': ['eslint --fix', 'prettier --write'],

  // JSON, YAML, Markdown 等檔案
  '*.{json,yaml,yml,md}': ['prettier --write'],

  // CSS, SCSS 檔案
  '*.{css,scss,sass}': ['prettier --write']
}
