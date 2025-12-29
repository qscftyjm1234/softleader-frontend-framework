/**
 * Commit Types 共用設定
 * 這個檔案是 commitlint.config.cjs 和 .cz-config.cjs 的單一來源
 */

module.exports = {
  // Commit 類型定義
  types: [
    { value: 'feat', name: 'feat:     新功能', description: '新功能 (feature)' },
    { value: 'fix', name: 'fix:      修補 bug', description: '修補 bug' },
    { value: 'docs', name: 'docs:     文件修改', description: '文件修改 (documentation)' },
    {
      value: 'style',
      name: 'style:    格式調整 (不影響程式碼運行)',
      description: '格式 (不影響程式碼運行的變動，如空格、分號等)'
    },
    {
      value: 'refactor',
      name: 'refactor: 重構 (不是新增功能也不是修 bug)',
      description: '重構 (既不是新增功能，也不是修補 bug 的程式碼變動)'
    },
    { value: 'perf', name: 'perf:     效能改進', description: '改進效能 (performance)' },
    { value: 'test', name: 'test:     測試相關', description: '增加或修改測試' },
    {
      value: 'chore',
      name: 'chore:    雜務 (不修改 src 或 test)',
      description: '其他不修改 src 或 test 檔案的更改 (雜務)'
    },
    { value: 'revert', name: 'revert:   回退版本', description: '回退版本' }
  ],

  // 最大長度限制
  maxHeaderLength: 72,
  maxLineLength: 100
}
