# 如何讓組員記住函式命名規範

## 問題

組員在開發時常常忘記函式名稱的限制,例如不知道可以用哪些動詞開頭。

## 解決方案

### 1. **最簡單:把規範頁面加入書籤** ⭐ 推薦

- 讓組員把 `/showcase/rules` 加入瀏覽器書籤
- 忘記時隨時查閱「快速參考:允許的函式動詞」區塊

### 2. **團隊協作:在溝通工具釘選連結**

- 在 Slack / Discord / Teams 頻道釘選規範頁面連結
- 新人加入時第一件事就是看這個頁面

### 3. **編輯器提示:VS Code Snippets** (可選)

在 `.vscode/snippets.code-snippets` 加入:

```json
{
  "Function with verb": {
    "prefix": "func",
    "body": [
      "/**",
      " * ${1:description}",
      " * @param {${2:type}} ${3:param}",
      " * @returns {${4:type}}",
      " */",
      "function ${5|get,set,fetch,handle,click,submit,validate,create,update,delete,toggle,show,hide,initialize,process,execute,perform|}${6:Name}($3) {",
      "  $0",
      "}"
    ],
    "description": "Create function with approved verb prefix"
  }
}
```

輸入 `func` 後按 Tab,就會自動提示可用的動詞!

### 4. **Code Review 時提醒**

- PR 審查時,看到不符合規範的命名就留言提醒
- 附上規範頁面連結: `/showcase/rules`

### 5. **ESLint 自動檢查** (已實作)

專案中已經配置了強制檢查規則，如果不符合規範，會在編輯器中直接報錯（紅色波浪底線）。
設定檔位置：`eslint.config.mjs`

## 技術實作細節 (Technical Implementation)

以下是各項規則的設定檔位置與程式碼範例，複製貼上即可使用。

### 1. 函式命名規則 (Function Naming)

**設定檔**: `eslint.config.mjs`
**規則**: `@typescript-eslint/naming-convention`

```javascript
{
  // 3. 函式：必須以動詞開頭
  selector: 'function',
  format: ['camelCase', 'PascalCase'],
  prefix: [
    // 單一動作
    'get', 'set', 'fetch', 'handle', 'click', 'submit', 'validate',
    'create', 'update', 'delete', 'toggle', 'show', 'hide', 'open', 'close',
    'add', 'remove', 'clear', 'reset',
    // 流程性
    'initialize', 'init', 'process', 'execute', 'perform', 'complete', 'setup', 'run',
    // 判斷 (回傳 boolean)
    'is', 'has', 'should', 'can', 'will', 'check', 'verify',
    // 事件
    'on'
  ]
}
```

### 2. 布林值變數規則 (Boolean Naming)

**設定檔**: `eslint.config.mjs`
**規則**: `@typescript-eslint/naming-convention`

```javascript
{
  // 1. 布林值變數：必須以特定動詞開頭
  selector: 'variable',
  types: ['boolean'],
  format: ['PascalCase'],
  prefix: ['is', 'should', 'has', 'can', 'did', 'will']
}
```

### 3. JSDoc 註解強制規則

**設定檔**: `eslint.config.mjs`
**規則**: `jsdoc/require-jsdoc` 等

```javascript
'jsdoc/require-jsdoc': [
  'error',
  {
    require: {
      FunctionDeclaration: true, // 一般函式要寫
      MethodDefinition: true, // 類別方法要寫
      ClassDeclaration: true, // 類別要寫
      ArrowFunctionExpression: false, // 箭頭函式不用
      FunctionExpression: false // 函式表達式不用
    }
  }
],
'jsdoc/require-param': 'warn', // 要寫 @param
'jsdoc/require-param-description': 'warn', // @param 要有說明
'jsdoc/require-returns': 'warn', // 要寫 @returns
'jsdoc/require-returns-description': 'warn', // @returns 要有說明
```

### 4. Vue 模板整潔規則

**設定檔**: `eslint.config.mjs`
**規則**: `vue/max-attributes-per-line`, `vue/max-len`

```javascript
// 強制屬性換行：2 個以上屬性必須換行
'vue/max-attributes-per-line': [
  'error',
  {
    singleline: 1, // 單行最多 1 個屬性
    multiline: 1 // 多行每行 1 個屬性
  }
],

// 限制每行最大長度 120 字元
'vue/max-len': [
  'error',
  {
    code: 120,
    template: 120,
    ignoreComments: true,
    ignoreUrls: true,
    ignoreStrings: true
  }
]
```

## 允許的動詞快速參考

### 單一動作 (常用)

get, set, fetch, handle, click, submit, validate, create, update, delete, toggle, show, hide, open, close, add, remove, clear, reset

### 流程性 (多步驟)

initialize, init, process, execute, perform, complete, setup, run

### 判斷 (回傳 boolean)

is, has, should, can, will, check, verify

## 範例

✅ **正確**

```javascript
function getUserData() {}
function handleClick() {}
function processPayment() {}
function initializeApp() {}
function isValid() {}
```

❌ **錯誤**

```javascript
function userData() {} // 缺少動詞
function click() {} // 應該是 handleClick
function payment() {} // 應該是 processPayment
function valid() {} // 應該是 isValid
```
