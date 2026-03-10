<!-- Author: antigravity -->

# 第十五課：表單處理與驗證

本課教您如何使用專案元件建立表單，以及如何透過集中管理的驗證規則進行表單驗證。

---

## 1. 表單元件總覽

所有表單元件都內建 `label` 和 `errorMessage` 屬性：

| 元件          | 用途                  | 用法                                                    |
| ------------- | --------------------- | ------------------------------------------------------- |
| `IInput`      | 單行文字、Email、密碼 | `<IInput v-model="..." label="姓名" />`                 |
| `ITextarea`   | 多行文字              | `<ITextarea v-model="..." label="備註" />`              |
| `ISelect`     | 下拉選單              | `<ISelect v-model="..." label="城市" :options="..." />` |
| `IDatePicker` | 日期/時間選擇         | `<IDatePicker v-model="..." label="日期" />`            |
| `ICheckbox`   | 核取方塊              | `<ICheckbox v-model="..." label="同意條款" />`          |
| `IRadio`      | 單選按鈕              | `<IRadio v-model="..." value="male" label="男" />`      |
| `ISwitch`     | 開關切換              | `<ISwitch v-model="..." label="通知" />`                |

> `label` 由元件自己渲染，不需要在外面寫 `<label>`。`errorMessage` 傳入字串即自動顯示紅框＋錯誤文字。

---

## 2. 驗證架構

驗證邏輯分為兩層，全系統共用：

```
utils/
  validators.ts              ← 規則工廠（required、email、minLength...）

composables/
  useFormValidation.ts       ← 驗證 Composable（每個頁面引入使用）

pages/
  submit-form.vue            ← 頁面只需定義「哪個欄位用哪條規則」
```

### 2.1 規則工廠 (`utils/validators.ts`)

每條規則是一個函式，回傳一個 `{ validate(value) }` 物件：

```typescript
import { required, minLength, email, mustBeTrue } from '~/utils/validators'
```

**可用規則一覽：**

| 規則                          | 用法                                   | 說明                       |
| ----------------------------- | -------------------------------------- | -------------------------- |
| `required(msg?)`              | `required('請填寫')`                   | 必填                       |
| `minLength(n, msg?)`          | `minLength(2)`                         | 最少 n 個字                |
| `maxLength(n, msg?)`          | `maxLength(50)`                        | 最多 n 個字                |
| `email(msg?)`                 | `email()`                              | Email 格式                 |
| `phone(msg?)`                 | `phone()`                              | 台灣手機號碼（09xxxxxxxx） |
| `password(min?, msg?)`        | `password(8)`                          | 密碼最少 n 碼              |
| `confirmPassword(fn, msg?)`   | `confirmPassword(() => form.password)` | 確認密碼                   |
| `numberRange(min, max, msg?)` | `numberRange(0, 100)`                  | 數字範圍                   |
| `pattern(regex, msg?)`        | `pattern(/^[A-Z]/, '需大寫開頭')`      | 自訂正則                   |
| `mustBeTrue(msg?)`            | `mustBeTrue('請勾選')`                 | 必須為 true                |

### 2.2 驗證 Composable (`composables/useFormValidation.ts`)

```typescript
const { errors, validate, validateField, clearErrors } = useFormValidation(formData, {
  name: [required('請填寫姓名'), minLength(2)],
  email: [required('請填寫信箱'), email()]
})
```

| 回傳值                 | 型態                          | 說明                       |
| ---------------------- | ----------------------------- | -------------------------- |
| `errors`               | `Ref<Record<string, string>>` | 各欄位的錯誤訊息           |
| `validate()`           | `() => boolean`               | 驗證全部欄位，回傳是否通過 |
| `validateField(field)` | `(string) => void`            | 驗證單一欄位（即時驗證用） |
| `clearErrors()`        | `() => void`                  | 清除所有錯誤               |

---

## 3. 完整範例

(1.) 在 `pages/` 資料夾下建立 `submit-form.vue`。
(2.) 貼入以下完整程式碼：

```vue
<template>
  <div class="p-10 min-h-screen bg-slate-50 flex items-center justify-center">
    <div class="max-w-xl w-full bg-white border border-slate-100 p-10 rounded-[2.5rem] shadow-sm">
      <h1 class="text-3xl font-black text-slate-900 mb-2">會員註冊表單</h1>
      <p class="text-slate-400 mb-10">請填寫下方資訊以完成帳號建立</p>

      <form
        class="space-y-6"
        @submit.prevent="handleSubmit"
      >
        <!-- 姓名 -->
        <IInput
          v-model="formData.name"
          label="真實姓名"
          placeholder="例如：王小明"
          prepend-icon="mdi-account"
          :error-message="errors.name"
        />

        <!-- 電子郵件 -->
        <IInput
          v-model="formData.email"
          label="電子郵件"
          type="email"
          placeholder="hello@example.com"
          prepend-icon="mdi-email"
          :error-message="errors.email"
        />

        <!-- 居住城市 -->
        <ISelect
          v-model="formData.city"
          label="居住城市"
          placeholder="請選擇您的城市"
          :options="cityOptions"
          :error-message="errors.city"
          clearable
        />

        <!-- 出生日期 -->
        <IDatePicker
          v-model="formData.birthday"
          label="出生日期"
          placeholder="請選擇日期"
          :error-message="errors.birthday"
        />

        <!-- 性別 -->
        <div>
          <label class="text-[0.875rem] font-bold text-slate-700 tracking-tight ml-1 mb-1.5 block">
            性別
          </label>
          <div class="flex gap-6">
            <IRadio
              v-model="formData.gender"
              value="male"
              label="男性"
              name="gender"
            />
            <IRadio
              v-model="formData.gender"
              value="female"
              label="女性"
              name="gender"
            />
            <IRadio
              v-model="formData.gender"
              value="other"
              label="其他"
              name="gender"
              :error-message="errors.gender"
            />
          </div>
        </div>

        <!-- 備註 -->
        <ITextarea
          v-model="formData.remark"
          label="自我介紹"
          placeholder="簡單介紹一下自己..."
          :rows="3"
          :maxlength="200"
          show-count
        />

        <!-- 接收通知 -->
        <ISwitch
          v-model="formData.receiveNotify"
          label="接收電子郵件通知"
        />

        <!-- 同意條款 -->
        <ICheckbox
          v-model="formData.agreeTerms"
          label="我已閱讀並同意服務條款"
          :error-message="errors.agreeTerms"
        />

        <!-- 提交按鈕 -->
        <IButton
          html-type="submit"
          variant="primary"
          class="w-full !bg-blue-600 !text-white !border-blue-600 hover:!bg-blue-700"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? '正在處理中...' : '確認提交註冊' }}
        </IButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { required, minLength, email, mustBeTrue } from '~/utils/validators'

// 表單資料
const formData = reactive({
  name: '',
  email: '',
  city: null as string | null,
  birthday: null as any,
  gender: '',
  remark: '',
  receiveNotify: true,
  agreeTerms: false
})

// 驗證規則（使用全域共用規則）
const { errors, validate } = useFormValidation(formData, {
  name: [required('請填寫您的真實姓名'), minLength(2)],
  email: [required('請填寫電子郵件'), email()],
  city: [required('請選擇居住城市')],
  birthday: [required('請選擇出生日期')],
  gender: [required('請選擇性別')],
  agreeTerms: [mustBeTrue('請勾選同意服務條款')]
})

// 選項資料
const cityOptions = [
  { value: 'taipei', label: '台北市' },
  { value: 'taichung', label: '台中市' },
  { value: 'kaohsiung', label: '高雄市' },
  { value: 'tainan', label: '台南市' }
]

// 提交
const isSubmitting = ref(false)

async function handleSubmit() {
  if (!validate()) return

  isSubmitting.value = true
  await new Promise((resolve) => setTimeout(resolve, 1500))
  isSubmitting.value = false

  alert('提交成功！')
  console.log('表單資料：', formData)
}

definePageMeta({
  title: '表單驗證範例',
  layout: 'portal'
})
</script>
```

---

## 4. 如何新增自訂規則

在 `utils/validators.ts` 中新增即可，全系統所有表單都能使用：

```typescript
/** 身分證字號 */
export const taiwanId = (msg = '身分證字號格式不正確'): ValidationRule => ({
  validate: (value: any) => {
    if (!value) return ''
    return /^[A-Z][12]\d{8}$/.test(String(value)) ? '' : msg
  }
})
```

使用：

```typescript
import { required, taiwanId } from '~/utils/validators'

const { errors, validate } = useFormValidation(formData, {
  idNumber: [required('請填寫身分證'), taiwanId()]
})
```

---

## 5. 小結

一
所有表單元件內建 `label` 和 `errorMessage`，不需要在外面寫 `<label>` 或錯誤提示 HTML。
二
驗證規則集中在 `utils/validators.ts`，全系統共用，新增規則只改一個檔案。
三
頁面透過 `useFormValidation(formData, schema)` 使用，只需定義「哪個欄位用哪條規則」。
四
不依賴 Ant Design 的表單驗證機制，保持 `I-` 元件的封裝完整性。

---

[上一課 第十四課：搜尋與防抖](./lesson-14.md) | [下一課 第十六課：複雜對話框處理](./lesson-16.md) | [回首頁](../../README.md)
