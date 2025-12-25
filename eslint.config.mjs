// 引入 ESLint 相關套件
import js from '@eslint/js' // JavaScript 基礎規則
import vue from 'eslint-plugin-vue' // Vue 規則
import jsdoc from 'eslint-plugin-jsdoc' // JSDoc 註解檢查
import vueParser from 'vue-eslint-parser' // Vue 檔案解析器
import tsParser from '@typescript-eslint/parser' // TypeScript 解析器
import prettierConfig from 'eslint-config-prettier' // 避免與 Prettier 衝突
import prettierPlugin from 'eslint-plugin-prettier' // 整合 Prettier

// ESLint 規則等級說明：
// 'off' (或 0)   = 關閉規則
// 'warn' (或 1)  = 警告（黃色提示，不阻止執行）
// 'error' (或 2) = 錯誤（紅色提示，阻止提交）

export default [
  // 使用官方推薦規則
  js.configs.recommended,
  ...vue.configs['flat/recommended'],

  {
    // 要檢查的檔案類型
    files: ['**/*.{js,mjs,cjs,ts,vue}'],

    // 解析器設定
    languageOptions: {
      parser: vueParser, // 用來解析 .vue 檔案
      parserOptions: {
        parser: tsParser, // <script> 區塊用 TypeScript 解析
        extraFileExtensions: ['.vue'], // 支援 .vue 檔案
        ecmaVersion: 'latest', // 使用最新 JS 語法
        sourceType: 'module' // 使用 ES 模組
      }
    },

    // 啟用的插件
    plugins: {
      vue,
      jsdoc,
      prettier: prettierPlugin
    },

    // 規則設定
    rules: {
      // Prettier 整合：格式不對就報錯
      'prettier/prettier': ['error', {}, { usePrettierrc: true }],

      // Vue 規則
      'vue/no-v-html': 'error', // 允許 v-html（TODO: 注意 XSS 風險）
      'vue/no-empty-alt': 'off', // 允許空的 alt
      'vue/multi-word-component-names': 'off', // 允許單字元件名
      'vue/script-setup-uses-vars': 'off', // 關閉（Nuxt 自動導入會誤判）
      'vue/no-multiple-template-root': 'off', // 允許多個根元素（Vue 3 支援）
      'vue/valid-v-slot': 'off', // 關閉 v-slot 檢查
      'vue/html-self-closing': 'off', // 允許非自閉合標籤

      // 建議 <script> 使用 TypeScript（警告）
      'vue/block-lang': [
        'warn',
        {
          script: {
            lang: 'ts' // 建議 <script lang="ts">
          }
        }
      ],

      // 強制屬性換行：2 個以上屬性必須換行
      // singleline: 1 表示單行模式最多 1 個屬性（超過就必須換行）
      // multiline: 1 表示多行模式每行最多 1 個屬性
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: 1, // 單行最多 1 個屬性
          multiline: 1 // 多行每行 1 個屬性
        }
      ],

      // 限制每行最大長度（包含原生 HTML 標籤）
      // 超過 120 字元就會報錯，強制換行
      'vue/max-len': [
        'error',
        {
          code: 120, // 程式碼最多 120 字元
          template: 120, // 模板最多 120 字元
          ignoreComments: true, // 忽略註解
          ignoreUrls: true, // 忽略 URL
          ignoreStrings: true // 忽略字串
        }
      ],

      // JavaScript 規則
      'no-undef': 'off', // 關閉未定義變數檢查（Nuxt 有自動導入）
      'no-unused-vars': 'warn', // 未使用的變數改為警告
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 正式環境警告 console
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 正式環境警告 debugger

      // JSDoc 規則：強制寫註解
      // ✅ 正確範例：
      // /**
      //  * 計算兩個數字的總和
      //  * @param {number} a - 第一個數字
      //  * @param {number} b - 第二個數字
      //  * @returns {number} 兩數之和
      //  */
      // function add(a, b) {
      //   return a + b
      // }
      'jsdoc/require-jsdoc': [
        'error',
        {
          require: {
            FunctionDeclaration: true, // 一般函式要寫
            MethodDefinition: true, // 類別方法要寫
            ClassDeclaration: true, // 類別要寫
            ArrowFunctionExpression: false, // 箭頭函式不用
            FunctionExpression: false // 函式表達式不用
          },
          contexts: [
            'ExportNamedDeclaration > FunctionDeclaration', // 匯出的 function foo() {}
            'ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > ArrowFunctionExpression', // 匯出的 const foo = () => {}
            'ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > FunctionExpression', // 匯出的 const foo = function() {}
            'ExportDefaultDeclaration > FunctionDeclaration', // export default function() {}
            'ExportDefaultDeclaration > ArrowFunctionExpression', // export default () => {}
            'ExportDefaultDeclaration > FunctionExpression' // export default function() {}
          ]
        }
      ],
      'jsdoc/require-param': 'warn', // 要寫 @param（警告）
      'jsdoc/require-param-description': 'warn', // @param 要有說明（警告）
      'jsdoc/require-returns': 'warn', // 要寫 @returns（警告）
      'jsdoc/require-returns-description': 'warn', // @returns 要有說明（警告）
      'jsdoc/check-tag-names': ['warn', { definedTags: ['history', 'historyId', '功能', '用法'] }] // 檢查標籤名稱（警告），允許自訂標籤
    }
  },

  // 關閉與 Prettier 衝突的規則（必須放最後）
  prettierConfig,

  // 不檢查的檔案/目錄
  {
    ignores: [
      'tests/', // 測試檔案
      'playwright/', // E2E 測試
      'node_modules/', // 套件
      'dist/', // 編譯輸出
      '.nuxt', // Nuxt 快取
      '.config/', // 配置檔
      'tsconfig.json', // TS 配置
      'plugins/', // 插件
      'generate/', // 生成檔案
      'public/js/hanlinks/', // 第三方 JS
      '**/*-test.{js,ts,vue}', // 忽略所有結尾是 -test 的檔案
      '**/*.test.{js,ts,vue}', // 忽略所有 .test. 的檔案
      '**/*.ignore.{js,ts,vue}' // 忽略所有 .ignore. 的檔案
    ]
  }
]
