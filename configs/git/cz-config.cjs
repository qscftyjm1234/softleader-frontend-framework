'use strict'

const { types, maxHeaderLength } = require('./commit-types.cjs')

module.exports = {
  // 可選擇的類型 (從 .commit-types.cjs 引入，與 commitlint 完全一致)
  types,

  // 可選擇的範圍 (可以留空，讓使用者自行輸入)
  scopes: [],

  // 是否允許自訂範圍
  allowCustomScopes: true,

  // 是否允許 Breaking Changes
  allowBreakingChanges: ['feat', 'fix'],

  // 跳過的問題
  skipQuestions: ['body', 'breaking', 'footer'],

  // subject 的最大長度 (從 .commit-types.cjs 引入，與 commitlint 一致)
  subjectLimit: maxHeaderLength,

  // 自訂問題
  messages: {
    type: '選擇提交類型:',
    scope: '影響範圍 (可留空):',
    customScope: '自訂範圍:',
    subject: '簡短描述:',
    body: '詳細描述 (可留空):\n',
    breaking: 'BREAKING CHANGES (可留空):\n',
    footer: '關閉的 ISSUES (可留空):\n',
    confirmCommit: '確認提交?'
  }
}
