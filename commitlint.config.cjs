module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // ----------------------------
    // Commit Message 相關設定
    // 規則格式: [Level, Applicable, Value]
    // Level: 0 = 關閉 (Disable), 1 = 警告 (Warning), 2 = 錯誤 (Error)
    // Applicable: 'always' (必需) / 'never' (必需不)
    // ----------------------------

    // type-enum: 限制 type 必須是以下清單之一
    // [2, 'always', [...]] => 2=錯誤, 'always'=必須遵守
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能 (feature)
        'fix', // 修補 bug
        'docs', // 文件修改 (documentation)
        'style', // 格式 (不影響程式碼運行的變動，如空格、分號等)
        'refactor', // 重構 (既不是新增功能，也不是修補 bug 的程式碼變動)
        'perf', // 改進效能 (performance)
        'test', // 增加或修改測試
        'chore', // 其他不修改 src 或 test 檔案的更改 (雜務)
        'revert' // 回退版本
        // ... 其他定義
      ]
    ],

    // type-case: type 的大小寫限制
    // 'lower-case' = 小寫
    'type-case': [2, 'always', 'lower-case'],

    // type-empty: type 是否可以為空
    // never = 不能為空
    'type-empty': [2, 'never'],

    // ----------------------------
    // Scope (範圍) 相關設定
    // 格式範例: type(scope): subject
    // 例如: feat(auth): add login function
    // 這裡的 'auth' 就是 scope，用來說明影響的範圍 (如 components, utils, core 等)
    // ----------------------------

    // scope-case: scope 的大小寫限制
    'scope-case': [2, 'always', 'lower-case'],

    // scope-empty: scope 是否可以為空
    // 0 = 關閉檢查 (允許為空，也允許不為空)
    'scope-empty': [0, 'never'],

    // ----------------------------
    // Subject (主旨/描述) 相關設定
    // ----------------------------

    // subject-case: subject 的大小寫限制
    // ['sentence-case', 'start-case', 'pascal-case', 'upper-case']
    // 這裡通常不強制，或設為 'sentence-case'
    'subject-case': [
      0,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case']
    ],

    // subject-empty: subject 是否可以為空
    'subject-empty': [2, 'never'],

    // subject-full-stop: subject 結尾是否要有句號
    // never = 不要有句號
    'subject-full-stop': [2, 'never', '.'],

    // header-max-length: header (第一行) 的最大長度
    // 72 字元是 GitHub 等工具的最佳顯示長度
    'header-max-length': [2, 'always', 72],

    // ----------------------------
    // Body (內文) 與 Footer 相關設定
    // 完整 Commit 結構範例:
    // --------------------------------------------
    // feat(core): add new feature           <-- Header (Type + Scope + Subject)
    //                                       <-- 空行 (Body Leading Blank)
    // This is the detailed description...   <-- Body (內文: 詳細說明，解釋為什麼要這樣做)
    // It can have multiple lines.
    //                                       <-- 空行 (Footer Leading Blank)
    // Fixes #123                            <-- Footer (頁尾: 通常用於關聯 Issue 或宣告 Breaking Change)
    // --------------------------------------------

    // body-leading-blank: header 與 body 之間是否要有空行
    'body-leading-blank': [1, 'always'], // 1 = 警告

    // body-max-line-length: body 每一行的最大長度
    'body-max-line-length': [2, 'always', 100],

    // footer-leading-blank: body 與 footer 之間是否要有空行
    'footer-leading-blank': [1, 'always']
  }
}
