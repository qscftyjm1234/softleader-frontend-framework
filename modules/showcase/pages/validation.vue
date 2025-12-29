<script setup lang="ts">
import { ref, computed } from 'vue'
import DataPreview from '../components/DataPreview.vue'

const {
  required,
  email,
  phone,
  url,
  taiwanId,
  number,
  integer,
  positive,
  minLength,
  maxLength,
  range,
  pattern,
  sameAs,
  validate,
  validateFields,
  isAllValid
} = useValidation()

// Demo form data
const formData = ref({
  username: '',
  email: '',
  phone: '',
  taiwanId: '',
  age: '',
  password: '',
  confirmPassword: '',
  website: ''
})

// Validation results
const validationResults = ref<Record<string, any>>({})

// Individual validation demos
const emailResult = computed(() => email(formData.value.email))
const phoneResult = computed(() => phone(formData.value.phone))
const taiwanIdResult = computed(() => taiwanId(formData.value.taiwanId))
const urlResult = computed(() => url(formData.value.website))

// Batch validation
const handleValidateForm = () => {
  const rules = {
    username: [required, minLength(3), maxLength(20)],
    email: [required, email],
    phone: [phone],
    age: [number, range(18, 100)],
    password: [required, minLength(6)],
    confirmPassword: [required, sameAs(formData.value.password, '密碼不一致')],
    website: [url]
  }

  validationResults.value = validateFields(formData.value, rules)
}

const isFormValid = computed(() => {
  return Object.keys(validationResults.value).length > 0 && isAllValid(validationResults.value)
})

definePageMeta({
  title: '表單驗證 (Validation)',
  icon: 'mdi-check-circle'
})
</script>

<template>
  <div class="inspector-container">
    <div class="page-header">
      <div class="header-main">
        <router-link
          to="/showcase"
          class="back-link"
        >
          返回
        </router-link>
        <h1 class="page-title">表單驗證系統 (Validation System)</h1>
      </div>
      <p class="page-desc">
        完整的表單驗證模組，提供常用驗證規則與自訂驗證功能。
        <br />
        核心特色：台灣本地化驗證、批次驗證、自訂規則。
      </p>
    </div>

    <!-- Interactive Form Demo -->
    <section class="module-section">
      <h2 class="section-title">
        <span class="icon">🎮</span>
        Interactive Form Demo (互動式表單演示)
      </h2>
      <div class="card-content">
        <div class="form-demo">
          <div class="form-row">
            <label>使用者名稱 *</label>
            <input
              v-model="formData.username"
              type="text"
              class="input-field"
              placeholder="3-20 個字元"
            />
            <span
              v-if="validationResults.username && !validationResults.username.valid"
              class="error-msg"
            >
              {{ validationResults.username.message }}
            </span>
          </div>

          <div class="form-row">
            <label>Email *</label>
            <input
              v-model="formData.email"
              type="email"
              class="input-field"
              placeholder="example@email.com"
            />
            <span
              v-if="validationResults.email && !validationResults.email.valid"
              class="error-msg"
            >
              {{ validationResults.email.message }}
            </span>
            <span class="live-result">
              即時驗證: {{ emailResult.valid ? '✓ 有效' : '✗ ' + emailResult.message }}
            </span>
          </div>

          <div class="form-row">
            <label>手機號碼</label>
            <input
              v-model="formData.phone"
              type="tel"
              class="input-field"
              placeholder="0912-345678"
            />
            <span class="live-result">
              即時驗證: {{ phoneResult.valid ? '✓ 有效' : '✗ ' + phoneResult.message }}
            </span>
          </div>

          <div class="form-row">
            <label>身分證字號</label>
            <input
              v-model="formData.taiwanId"
              type="text"
              class="input-field"
              placeholder="A123456789"
            />
            <span class="live-result">
              即時驗證: {{ taiwanIdResult.valid ? '✓ 有效' : '✗ ' + taiwanIdResult.message }}
            </span>
          </div>

          <div class="form-row">
            <label>年齡</label>
            <input
              v-model="formData.age"
              type="number"
              class="input-field"
              placeholder="18-100"
            />
            <span
              v-if="validationResults.age && !validationResults.age.valid"
              class="error-msg"
            >
              {{ validationResults.age.message }}
            </span>
          </div>

          <div class="form-row">
            <label>密碼 *</label>
            <input
              v-model="formData.password"
              type="password"
              class="input-field"
              placeholder="至少 6 個字元"
            />
            <span
              v-if="validationResults.password && !validationResults.password.valid"
              class="error-msg"
            >
              {{ validationResults.password.message }}
            </span>
          </div>

          <div class="form-row">
            <label>確認密碼 *</label>
            <input
              v-model="formData.confirmPassword"
              type="password"
              class="input-field"
            />
            <span
              v-if="validationResults.confirmPassword && !validationResults.confirmPassword.valid"
              class="error-msg"
            >
              {{ validationResults.confirmPassword.message }}
            </span>
          </div>

          <div class="form-row">
            <label>網站</label>
            <input
              v-model="formData.website"
              type="url"
              class="input-field"
              placeholder="https://example.com"
            />
            <span class="live-result">
              即時驗證: {{ urlResult.valid ? '✓ 有效' : '✗ ' + urlResult.message }}
            </span>
          </div>

          <div class="form-actions">
            <button
              class="action-btn"
              @click="handleValidateForm"
            >
              驗證表單
            </button>
            <span
              v-if="Object.keys(validationResults).length > 0"
              :class="['validation-status', { valid: isFormValid, invalid: !isFormValid }]"
            >
              {{ isFormValid ? '✓ 表單驗證通過' : '✗ 表單驗證失敗' }}
            </span>
          </div>

          <div
            v-if="Object.keys(validationResults).length > 0"
            class="results-section"
          >
            <DataPreview
              title="驗證結果"
              :data="validationResults"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- API Methods -->
    <section class="module-section mt-8">
      <h2 class="section-title">
        <span class="icon">📋</span>
        Validation Rules (驗證規則)
      </h2>
      <div class="card-content">
        <div class="method-demos">
          <div class="demo-card">
            <h3 class="demo-title">基本驗證</h3>
            <div class="code-content">
              <pre><code>// 必填
required(value, '此欄位為必填')

// Email
email(value, 'Email 格式不正確')

// 手機號碼（台灣）
phone(value, '手機號碼格式不正確')

// URL
url(value, 'URL 格式不正確')

// 身分證字號（台灣）
taiwanId(value, '身分證字號格式不正確')

// 數字
number(value, '必須為數字')

// 整數
integer(value, '必須為整數')

// 正數
positive(value, '必須為正數')</code></pre>
            </div>
          </div>

          <div class="demo-card">
            <h3 class="demo-title">長度與範圍驗證</h3>
            <div class="code-content">
              <pre><code>// 最小長度
minLength(6)(value)  // 至少 6 個字元

// 最大長度
maxLength(20)(value)  // 最多 20 個字元

// 數字範圍
range(18, 100)(value)  // 18 到 100 之間</code></pre>
            </div>
          </div>

          <div class="demo-card">
            <h3 class="demo-title">進階驗證</h3>
            <div class="code-content">
              <pre><code>// 正則表達式
pattern(/^[A-Z0-9]+$/)(value)

// 相同值驗證（確認密碼）
sameAs(password)(confirmPassword)

// 批次驗證
const result = validate(value, [
  required,
  minLength(6),
  maxLength(20)
])

// 驗證多個欄位
const results = validateFields(formData, {
  username: [required, minLength(3)],
  email: [required, email],
  age: [number, range(18, 100)]
})

// 檢查是否全部有效
const allValid = isAllValid(results)</code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.inspector-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
  color: #333;
}

.page-header {
  margin-bottom: 2rem;
}

.header-main {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.back-link {
  text-decoration: none;
  color: #666;
  margin-right: 1rem;
  padding: 0.5rem 1rem;
  background: #f0f0f0;
  border-radius: 4px;
  transition: all 0.2s;
}

.back-link:hover {
  background: #e0e0e0;
}

.page-title {
  font-size: 2rem;
  font-weight: 500;
  margin: 0;
}

.page-desc {
  color: #666;
  margin-left: 0.5rem;
  line-height: 1.5;
}

.module-section {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
}

.section-title {
  padding: 1rem 1.5rem;
  background: #fafafa;
  border-bottom: 1px solid #eee;
  margin: 0;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
}

.icon {
  margin-right: 0.5rem;
}

.card-content {
  padding: 1.5rem;
}

.form-demo {
  max-width: 600px;
}

.form-row {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-row label {
  font-weight: 500;
  color: #555;
}

.input-field {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.input-field:focus {
  outline: none;
  border-color: #0d6efd;
}

.error-msg {
  color: #dc3545;
  font-size: 0.875rem;
}

.live-result {
  font-size: 0.875rem;
  color: #666;
}

.form-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.action-btn {
  background: #0d6efd;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
}

.action-btn:hover {
  background: #0b5ed7;
}

.validation-status {
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

.validation-status.valid {
  background: #d1fae5;
  color: #065f46;
}

.validation-status.invalid {
  background: #fee2e2;
  color: #991b1b;
}

.results-section {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
}

.method-demos {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.demo-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0.75rem;
  background: #fff;
}

.demo-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  color: #2c3e50;
}

.demo-title::before {
  content: '';
  display: inline-block;
  width: 3px;
  height: 1.1em;
  background: #3498db;
  margin-right: 0.5rem;
  border-radius: 2px;
}

.code-content {
  background: #282c34;
  border-radius: 4px;
  padding: 0.5rem;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
  line-height: 1.5;
}

.code-content pre {
  margin: 0;
}

.code-content code {
  color: #abb2bf;
}

.mt-8 {
  margin-top: 2rem;
}
</style>
