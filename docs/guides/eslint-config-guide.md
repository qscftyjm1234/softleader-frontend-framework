[← 返回 README.md](../../README.md)

# ESLint 設定修改指南

本文件提供完整的 ESLint 設定修改教學，包含如何調整規則、新增規則、關閉規則等。

## 設定檔位置

ESLint 設定檔位於專案根目錄：

```
nuxt3-test/
└── eslint.config.mjs  ← ESLint 主設定檔
```

---

## 基本結構說明

打開 `eslint.config.mjs`，你會看到以下結構：

```javascript
export default [
  // 1. 官方推薦規則
  js.configs.recommended,
  ...vue.configs['flat/recommended'],

  // 2. 自訂規則
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    languageOptions: { ... },
    plugins: { ... },
    rules: {
      // 這裡是所有規則設定
    }
  },

  // 3. Prettier 整合
  prettierConfig,

  // 4. 忽略檔案
  {
    ignores: [ ... ]
  }
]
```

---

## 修改規則嚴格度

### 規則等級

每個規則可以設定三種等級：

```javascript
rules: {
  'rule-name': 'off',    // 關閉規則
  'rule-name': 'warn',   // 警告（黃色提示）
  'rule-name': 'error',  // 錯誤（紅色提示，阻止提交）
}
```

### 範例：將錯誤改為警告

**情境**: `no-console` 目前在正式環境是警告，想改成錯誤

**步驟**:

1. 打開 `eslint.config.mjs`
2. 找到 `rules` 區塊
3. 找到這一行：

```javascript
'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
```

4. 改為：

```javascript
'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
```

5. 存檔後執行測試：

```bash
npm run lint
```

---

## 關閉特定規則

### 完全關閉規則

**情境**: 不想檢查 `no-debugger`

**步驟**:

1. 找到規則：

```javascript
'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
```

2. 改為：

```javascript
'no-debugger': 'off',
```

### 暫時關閉規則（在程式碼中）

**方法 1: 單行忽略**

```javascript
// eslint-disable-next-line no-console
console.log('這行不會被檢查')
```

**方法 2: 多行忽略**

```javascript
/* eslint-disable no-console */
console.log('這段')
console.log('都不會')
console.log('被檢查')
/* eslint-enable no-console */
```

**方法 3: 整個檔案忽略**

在檔案最上方加入：

```javascript
/* eslint-disable no-console */
```

---

## 暫時停用命名規則

### 完全停用命名檢查

**情境**: 需要暫時停用函式命名限制,讓程式碼可以通過 commit 檢核

**步驟**:

1. 打開 `eslint.config.mjs`
2. 找到 `@typescript-eslint/naming-convention` 規則(約在第 156 行)
3. 將整個規則改為 `'off'`:

```javascript
// TypeScript 命名規則 (暫時停用)
'@typescript-eslint/naming-convention': 'off'
```

4. 存檔後測試:

```bash
npm run lint
```

**效果**:

- ✅ 停用所有命名檢查(函式、變數、類別等)
- ✅ 可以使用任何函式名稱(例如 `extractQueryParams`)
- ✅ commit 可以通過 ESLint 檢核

### 恢復命名規則

當需要重新啟用命名規則時:

1. 將 `'off'` 改回 `'error'`
2. 加回完整的命名規則配置(參考下方「修改命名規則」章節)

> [!WARNING]
> 停用命名規則會讓團隊失去命名一致性保護,建議只在必要時暫時停用,並盡快恢復。

---

## 修改命名規則

### 新增允許的函式動詞

**情境**: 想允許 `extract` 作為函式前綴

**步驟**:

1. 找到 `@typescript-eslint/naming-convention` 規則
2. 找到函式的 `prefix` 陣列：

```javascript
{
  selector: 'function',
  format: ['camelCase', 'PascalCase'],
  prefix: [
    'get', 'set', 'fetch', // ... 其他動詞
  ]
}
```

3. 加入新動詞：

```javascript
{
  selector: 'function',
  format: ['camelCase', 'PascalCase'],
  prefix: [
    'get', 'set', 'fetch',
    'extract',  // ← 新增這行
    // ... 其他動詞
  ]
}
```

4. 存檔測試：

```bash
npm run lint
```

### 新增布林值前綴

**情境**: 想允許 `will` 作為布林值前綴

**步驟**:

1. 找到布林值規則：

```javascript
{
  selector: 'variable',
  types: ['boolean'],
  format: ['PascalCase'],
  prefix: ['is', 'should', 'has', 'can', 'did', 'will']
}
```

2. 確認 `will` 已在清單中（如果沒有就加入）

### 修改布林值格式

**情境**: 想將布林值從 `PascalCase` 改為 `camelCase`

**步驟**:

1. 找到布林值規則：

```javascript
{
  selector: 'variable',
  types: ['boolean'],
  format: ['PascalCase'],  // ← 這裡
  prefix: ['is', 'should', 'has', 'can', 'did', 'will']
}
```

2. 改為：

```javascript
{
  selector: 'variable',
  types: ['boolean'],
  format: ['camelCase'],  // ← 改成 camelCase
  prefix: ['is', 'should', 'has', 'can', 'did', 'will']
}
```

---

## 修改 Vue 規則

### 允許 kebab-case 元件名稱

**情境**: 想在模板中使用 `<user-card>` 而非 `<UserCard>`

**步驟**:

1. 找到規則：

```javascript
'vue/component-name-in-template-casing': ['error', 'PascalCase'],
```

2. 改為：

```javascript
'vue/component-name-in-template-casing': ['error', 'kebab-case'],
```

### 調整屬性換行規則

**情境**: 想允許單行最多 3 個屬性

**步驟**:

1. 找到規則：

```javascript
'vue/max-attributes-per-line': [
  'error',
  {
    singleline: 1,  // ← 單行最多 1 個
    multiline: 1
  }
]
```

2. 改為：

```javascript
'vue/max-attributes-per-line': [
  'error',
  {
    singleline: 3,  // ← 改為 3 個
    multiline: 1
  }
]
```

### 調整行長度限制

**情境**: 想將 120 字元改為 100 字元

**步驟**:

1. 找到規則：

```javascript
'vue/max-len': [
  'error',
  {
    code: 120,      // ← 這裡
    template: 120,  // ← 這裡
    ignoreComments: true,
    ignoreUrls: true,
    ignoreStrings: true
  }
]
```

2. 改為：

```javascript
'vue/max-len': [
  'error',
  {
    code: 100,      // ← 改為 100
    template: 100,  // ← 改為 100
    ignoreComments: true,
    ignoreUrls: true,
    ignoreStrings: true
  }
]
```

---

## 修改 JSDoc 規則

### 關閉 JSDoc 強制檢查

**情境**: 不想強制要求 JSDoc 註解

**步驟**:

1. 找到規則：

```javascript
'jsdoc/require-jsdoc': [
  'error',
  { ... }
]
```

2. 改為：

```javascript
'jsdoc/require-jsdoc': 'off',
```

### 將 JSDoc 改為警告

**情境**: JSDoc 缺失時只警告，不報錯

**步驟**:

```javascript
'jsdoc/require-jsdoc': 'warn',        // 改為 warn
'jsdoc/require-param': 'warn',
'jsdoc/require-returns': 'warn',
```

---

## 新增忽略檔案

### 忽略特定目錄

**情境**: 想忽略 `scripts/` 目錄

**步驟**:

1. 找到 `ignores` 區塊：

```javascript
{
  ignores: [
    'tests/',
    'playwright/',
    'node_modules/'
    // ... 其他
  ]
}
```

2. 加入新目錄：

```javascript
{
  ignores: [
    'tests/',
    'playwright/',
    'node_modules/',
    'scripts/' // ← 新增這行
    // ... 其他
  ]
}
```

### 忽略特定檔案模式

**情境**: 想忽略所有 `.config.js` 檔案

**步驟**:

```javascript
{
  ignores: [
    // ... 其他
    '**/*.config.js' // ← 新增這行
  ]
}
```

---

## 新增自訂規則

### 新增 ESLint 規則

**情境**: 想禁止使用 `alert()`

**步驟**:

1. 在 `rules` 區塊中加入：

```javascript
rules: {
  // ... 其他規則
  'no-alert': 'error',  // ← 新增這行
}
```

### 新增 Vue 規則

**情境**: 想強制 `<template>` 必須有根元素

**步驟**:

```javascript
rules: {
  // ... 其他規則
  'vue/no-multiple-template-root': 'error',  // ← 新增這行
}
```

---

## 測試與驗證

### 測試設定是否正確

```bash
# 檢查語法是否正確
npm run lint

# 查看特定檔案的 lint 結果
npx eslint path/to/file.vue

# 查看所有錯誤（不自動修正）
npx eslint . --max-warnings 0
```

### 自動修正

```bash
# 自動修正可修正的錯誤
npm run lint

# 或手動執行
npx eslint . --fix
```

---

## 常見問題排除

### Q1: 修改後沒有生效

**解決方法**:

1. 重新啟動 VS Code
2. 清除 ESLint 快取：

```bash
rm -rf node_modules/.cache
```

3. 重新執行 lint：

```bash
npm run lint
```

### Q2: 規則衝突

**症狀**: 兩個規則互相衝突

**解決方法**:

1. 檢查是否有重複的規則定義
2. 確保 Prettier 設定在最後（避免與 ESLint 衝突）：

```javascript
export default [
  // ... 其他設定
  prettierConfig // ← 必須在最後
]
```

### Q3: TypeScript 規則不生效

**解決方法**:

確認 `parserOptions` 設定正確：

```javascript
languageOptions: {
  parser: vueParser,
  parserOptions: {
    parser: tsParser,
    projectService: true,  // ← 這個很重要
    tsconfigRootDir: import.meta.dirname
  }
}
```

---

## 完整範例：自訂專案規則

假設你想做以下調整：

1. 允許 `extract` 函式前綴
2. 單行最多 2 個屬性
3. 忽略 `scripts/` 目錄
4. JSDoc 改為警告

**完整步驟**:

```javascript
export default [
  // ... 官方推薦規則

  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    languageOptions: { ... },
    plugins: { ... },
    rules: {
      // 1. 允許 extract 前綴
      '@typescript-eslint/naming-convention': [
        'error',
        // ... 其他規則
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
          prefix: [
            'get', 'set', 'fetch',
            'extract',  // ← 新增
            // ... 其他
          ]
        }
      ],

      // 2. 單行最多 2 個屬性
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: 2,  // ← 修改
          multiline: 1
        }
      ],

      // 4. JSDoc 改為警告
      'jsdoc/require-jsdoc': 'warn',  // ← 修改
      'jsdoc/require-param': 'warn',
      'jsdoc/require-returns': 'warn',
    }
  },

  prettierConfig,

  // 3. 忽略 scripts/
  {
    ignores: [
      'tests/',
      'scripts/',  // ← 新增
      // ... 其他
    ]
  }
]
```

---

## 延伸閱讀

- [ESLint 開發規範](./eslint-rules.md) - 完整規則說明
- [ESLint 官方文件](https://eslint.org/docs/latest/) - 官方規則參考
- [Vue ESLint 規則](https://eslint.vuejs.org/rules/) - Vue 專用規則
- [TypeScript ESLint](https://typescript-eslint.io/rules/) - TypeScript 規則

---

## 快速參考

### 規則等級

| 值               | 說明 | 效果               |
| ---------------- | ---- | ------------------ |
| `'off'` 或 `0`   | 關閉 | 不檢查             |
| `'warn'` 或 `1`  | 警告 | 黃色提示           |
| `'error'` 或 `2` | 錯誤 | 紅色提示，阻止提交 |

### 常用指令

```bash
# 執行 lint 檢查
npm run lint

# 檢查特定檔案
npx eslint path/to/file.vue

# 自動修正
npx eslint . --fix

# 查看設定
cat eslint.config.mjs
```
