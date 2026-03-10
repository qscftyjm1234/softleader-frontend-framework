/**
 * Git Staged 檔案檢查設定檔
 * 當執行 `git commit` 時，自動檢查並修復即將提交的檔案。
 *
 * @see {@link https://github.com/lint-staged/lint-staged|Lint-staged 官方文件}
 *
 * @author Gino Huang
 * @since 2024-12-24
 * @version 1.0.0
 *
 * @changelog
 * - 2024-12-24 v1.0.0 [Gino] 初始版本
 */

export default {
  /**
   * 1. 檢查程式邏輯：JavaScript, TypeScript, JSX, TSX
   * 動作：先用 ESLint 自動修復語法問題，再用 Prettier 排版
   */
  '*.{js,jsx,ts,tsx,mjs,cjs}': ['eslint --fix', 'prettier --write'],

  /**
   * 2. 檢查 Vue 組件
   * 動作：同樣執行 ESLint 修復與 Prettier 排版
   */
  '*.vue': ['eslint --fix', 'prettier --write'],

  /**
   * 3. 檢查文件類檔案：JSON, YAML, Markdown
   * 動作：僅執行 Prettier 排版（因為這類檔案通常不涉及程式邏輯錯誤）
   */
  '*.{json,yaml,yml,md}': ['prettier --write'],

  /**
   * 4. 檢查樣式檔案：CSS, SCSS, SASS
   * 動作：僅執行 Prettier 排版
   */
  '*.{css,scss,sass}': ['prettier --write']

  /**
   * 【未來如何彈性擴充？】
   *
   * - 想增加新工具？
   *   例如：加上單元測試，確認沒寫壞。
   *   '*.ts': ['eslint --fix', 'vitest related --run']
   *
   * - 想排除特定檔案？
   *   可以使用 `!` 開頭。
   *   '!src/legacy/*.js': ['eslint --fix']
   */
}
