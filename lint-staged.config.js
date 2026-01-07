/**
 * Lint-staged 設定
 * 在 git commit 前自動檢查和修復即將提交的檔案
 *
 * 主要功能：
 * 1. 只檢查「暫存區 (Staged)」的檔案：只針對本次 `git add` 的檔案進行檢查，避免掃描全專案，大幅提升速度。
 * 2. 解決部份提交問題：確保只修復本次要提交的程式碼，不會誤修或提交未 `add` 的內容。
 * 3. 作為 Git 與 ESLint/Prettier 的橋樑：負責將 Git 暫存區的檔案列表傳遞給檢查工具執行。
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
