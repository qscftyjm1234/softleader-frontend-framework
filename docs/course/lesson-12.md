<!-- Author: cindy -->

# 第十二課:進階表單處理

本課程教您如何使用 `IInput` 和表單驗證。

## 1. 使用 IForm

本專案封裝了 Ant Design Form。

### 基本範例

```vue
<script setup lang="ts">
const formState = reactive({
  username: '',
  password: ''
})

const rules = {
  username: [{ required: true, message: '請輸入帳號' }],
  password: [{ required: true, message: '請輸入密碼' }]
}

async function handleSubmit() {
  // 驗證並送出
  console.log(formState)
}
</script>

<template>
  <a-form
    :model="formState"
    :rules="rules"
    @finish="handleSubmit"
  >
    <a-form-item
      label="帳號"
      name="username"
    >
      <IInput v-model="formState.username" />
    </a-form-item>

    <a-form-item
      label="密碼"
      name="password"
    >
      <IInput
        v-model="formState.password"
        type="password"
      />
    </a-form-item>

    <IButton html-type="submit">登入</IButton>
  </a-form>
</template>
```

---

## 2. 表單驗證規則

### 常用規則

- `required`: 必填
- `type`: 類型 (email, number 等)
- `min`, `max`: 長度限制
- `pattern`: 正規表達式

### 自訂驗證

```typescript
const validatePass = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('請輸入密碼')
  } else {
    return Promise.resolve()
  }
}
```

---

## 3. 小結

1. **表單**: 使用 `a-form` 包裹
2. **輸入**: 使用 `IInput`
3. **驗證**: 設定 `rules` 物件

---

[上一課:環境變數設定](./lesson-11.md) | [下一課:複雜對話框處理](./lesson-13.md) | [回首頁](../../README.md)
