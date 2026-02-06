<!-- Author: cindy -->

# 第十二課:進階表單處理

本課程教您如何結合 **Ant Design Form** 與專案內建的 **useValidation** 模組。

## 1. 使用 IForm 與 Rules

專案使用 `a-form` 配合 `a-form-item` 進行排版與錯誤顯示。

### 步驟 1: 定義表單資料

```typescript
const formState = reactive({
  username: '',
  password: '',
  email: '',
  phone: ''
})
```

### 步驟 2: 引入驗證模組 (useValidation)

我們不再手寫 Regex，而是使用專案統一的 `useValidation`。

```typescript
const { required, email, phone, minLength } = useValidation()
```

### 步驟 3: 設定 Rules (整合 AntD)

將 `useValidation` 的檢查邏輯整合進 Ant Design 的 `validator`。

```typescript
const rules = {
  // 1. 基本規則 (可直接用 AntD 原生)
  username: [{ required: true, message: '請輸入帳號' }],

  // 2. 自訂驗證 (使用 useValidation)
  email: [
    { required: true, message: '必填' },
    {
      validator: async (_rule, value) => {
        // 使用我們的模組檢查
        const res = email(value)
        if (!res.valid) return Promise.reject(res.message)
        return Promise.resolve()
      }
    }
  ],

  // 3. 組合驗證 (手機)
  phone: [
    { required: true, message: '必填' },
    {
      validator: async (_rule, value) => {
        const res = phone(value) // 內建台灣手機格式檢查
        if (!res.valid) return Promise.reject(res.message)
        return Promise.resolve()
      }
    }
  ]
}
```

---

## 2. 完整範例

```vue
<script setup lang="ts">
const { required, email } = useValidation()

const formState = reactive({
  account: '',
  mail: ''
})

const rules = {
  account: [{ required: true, message: '請輸入帳號' }],
  mail: [
    { required: true, message: '請輸入信箱' },
    {
      validator: async (_r, v) => {
        const res = email(v)
        return res.valid ? Promise.resolve() : Promise.reject(res.message)
      }
    }
  ]
}

const handleFinish = (values: any) => {
  console.log('Success:', values)
}
</script>

<template>
  <a-form
    :model="formState"
    :rules="rules"
    @finish="handleFinish"
  >
    <!-- 帳號 -->
    <a-form-item
      label="帳號"
      name="account"
    >
      <IInput v-model="formState.account" />
    </a-form-item>

    <!-- 信箱 -->
    <a-form-item
      label="信箱"
      name="mail"
    >
      <IInput v-model="formState.mail" />
    </a-form-item>

    <IButton html-type="submit">送出</IButton>
  </a-form>
</template>
```

---

## 3. useValidation 支援的功能

我們的驗證模組非常強大，支援以下功能：

- **required**: 必填
- **email**: Email 格式
- **phone**: 台灣手機 (09xx)
- **taiwanId**: 身分證字號 (含檢查碼邏輯)
- **url**:網址格式
- **number / integer**: 數字/整數
- **minLength(len) / maxLength(len)**: 長度限制
- **range(min, max)**: 數值範圍
- **sameAs(val)**: 確認密碼用

---

## 4. 小結

1.  **引入**: `const { ... } = useValidation()`
2.  **整合**: 在 `validator` 中呼叫驗證函式，失敗 `reject`，成功 `resolve`。
3.  **優點**: 全站統一驗證邏輯 (例如手機格式、身分證演算法)，不用每個人重寫 Regex。

---

[上一課:環境變數設定](./lesson-11.md) | [下一課:複雜對話框處理](./lesson-13.md) | [回首頁](../../README.md)
