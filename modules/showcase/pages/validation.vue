<script setup lang="ts">
import { ref, computed } from 'vue'
import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'

const {
  required,
  email,
  phone,
  url,
  taiwanId,
  number,
  minLength,
  maxLength,
  range,
  sameAs,
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
  title: '資料驗證 (Validation)',
  icon: 'mdi-check-all',
  layout: 'portal'
})
</script>

<template>
  <ShowcasePage
    title="表單驗證系統 (Validation System)"
    description="完整的表單驗證模組，提供常用驗證規則與自訂驗證功能。核心特色包含台灣本地化驗證、批次驗證、自訂規則。"
  >
    <!-- Interactive Form Demo -->
    <ShowcaseSection
      title="Interactive Form Demo (互動式表單演示)"
      icon="🎮"
    >
      <div class="component-grid">
        <ShowcaseCard
          title="Validation Form"
          description="填寫表單以測試驗證規則"
          full-width
        >
          <div class="max-w-2xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <!-- Username -->
              <div class="flex flex-col gap-1">
                <label class="block text-slate-300 mb-1 text-sm font-bold">使用者名稱 *</label>
                <input
                  v-model="formData.username"
                  type="text"
                  class="glass-input w-full"
                  placeholder="3-20 個字元"
                />
                <span
                  v-if="validationResults.username && !validationResults.username.valid"
                  class="text-red-400 text-xs mt-1 block"
                >
                  {{ validationResults.username.message }}
                </span>
              </div>

              <!-- Email -->
              <div class="flex flex-col gap-1">
                <label class="block text-slate-300 mb-1 text-sm font-bold">Email *</label>
                <input
                  v-model="formData.email"
                  type="email"
                  class="glass-input w-full"
                  placeholder="example@email.com"
                />
                <div class="flex justify-between items-start mt-1">
                  <span
                    v-if="validationResults.email && !validationResults.email.valid"
                    class="text-red-400 text-xs block"
                  >
                    {{ validationResults.email.message }}
                  </span>
                  <span
                    class="text-xs ml-auto"
                    :class="emailResult.valid ? 'text-green-400' : 'text-slate-500'"
                  >
                    即時: {{ emailResult.valid ? '✓ 有效' : 'Checking...' }}
                  </span>
                </div>
              </div>

              <!-- Phone -->
              <div class="flex flex-col gap-1">
                <label class="block text-slate-300 mb-1 text-sm font-bold">手機號碼</label>
                <input
                  v-model="formData.phone"
                  type="tel"
                  class="glass-input w-full"
                  placeholder="0912-345678"
                />
                <span
                  class="text-xs block mt-1 text-right"
                  :class="phoneResult.valid ? 'text-green-400' : 'text-slate-500'"
                >
                  即時: {{ phoneResult.valid ? '✓ 有效' : phoneResult.message || '格式檢查中' }}
                </span>
              </div>

              <!-- Taiwan ID -->
              <div class="flex flex-col gap-1">
                <label class="block text-slate-300 mb-1 text-sm font-bold">身分證字號</label>
                <input
                  v-model="formData.taiwanId"
                  type="text"
                  class="glass-input w-full"
                  placeholder="A123456789"
                />
                <span
                  class="text-xs block mt-1 text-right"
                  :class="taiwanIdResult.valid ? 'text-green-400' : 'text-slate-500'"
                >
                  即時:
                  {{ taiwanIdResult.valid ? '✓ 有效' : taiwanIdResult.message || '格式檢查中' }}
                </span>
              </div>

              <!-- Age -->
              <div class="flex flex-col gap-1">
                <label class="block text-slate-300 mb-1 text-sm font-bold">年齡</label>
                <input
                  v-model="formData.age"
                  type="number"
                  class="glass-input w-full"
                  placeholder="18-100"
                />
                <span
                  v-if="validationResults.age && !validationResults.age.valid"
                  class="text-red-400 text-xs mt-1 block"
                >
                  {{ validationResults.age.message }}
                </span>
              </div>

              <!-- Website -->
              <div class="flex flex-col gap-1">
                <label class="block text-slate-300 mb-1 text-sm font-bold">網站</label>
                <input
                  v-model="formData.website"
                  type="url"
                  class="glass-input w-full"
                  placeholder="https://example.com"
                />
                <span
                  class="text-xs block mt-1 text-right"
                  :class="urlResult.valid ? 'text-green-400' : 'text-slate-500'"
                >
                  即時: {{ urlResult.valid ? '✓ 有效' : urlResult.message || '格式檢查中' }}
                </span>
              </div>

              <!-- Password -->
              <div class="flex flex-col gap-1">
                <label class="block text-slate-300 mb-1 text-sm font-bold">密碼 *</label>
                <input
                  v-model="formData.password"
                  type="password"
                  class="glass-input w-full"
                  placeholder="至少 6 個字元"
                />
                <span
                  v-if="validationResults.password && !validationResults.password.valid"
                  class="text-red-400 text-xs mt-1 block"
                >
                  {{ validationResults.password.message }}
                </span>
              </div>

              <!-- Confirm Password -->
              <div class="flex flex-col gap-1">
                <label class="block text-slate-300 mb-1 text-sm font-bold">確認密碼 *</label>
                <input
                  v-model="formData.confirmPassword"
                  type="password"
                  class="glass-input w-full"
                />
                <span
                  v-if="
                    validationResults.confirmPassword && !validationResults.confirmPassword.valid
                  "
                  class="text-red-400 text-xs mt-1 block"
                >
                  {{ validationResults.confirmPassword.message }}
                </span>
              </div>
            </div>

            <div class="flex items-center gap-4 mb-6">
              <button
                class="glass-btn primary"
                @click="handleValidateForm"
              >
                驗證表單
              </button>
              <div
                v-if="Object.keys(validationResults).length > 0"
                class="px-4 py-2 rounded font-medium text-sm transition-colors"
                :class="
                  isFormValid
                    ? 'bg-green-900/40 text-green-400 border border-green-800'
                    : 'bg-red-900/40 text-red-400 border border-red-800'
                "
              >
                {{ isFormValid ? '✓ 表單驗證通過' : '✗ 表單驗證失敗' }}
              </div>
            </div>

            <div v-if="Object.keys(validationResults).length > 0">
              <ShowcaseCodeBlock
                :code="JSON.stringify(validationResults, null, 2)"
                language="json"
                label="Validation Results"
              />
            </div>
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- API Methods -->
    <ShowcaseSection
      title="Validation Rules (驗證規則)"
      icon="📋"
    >
      <div class="component-grid">
        <ShowcaseCard
          title="Basic Validation"
          description="基本驗證規則範例"
        >
          <ShowcaseCodeBlock
            code="// 必填
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
positive(value, '必須為正數')"
            label="Example Code"
          />
        </ShowcaseCard>

        <ShowcaseCard
          title="Length & Range"
          description="長度與範圍驗證"
        >
          <ShowcaseCodeBlock
            code="// 最小長度
minLength(6)(value)  // 至少 6 個字元

// 最大長度
maxLength(20)(value)  // 最多 20 個字元

// 數字範圍
range(18, 100)(value)  // 18 到 100 之間"
            label="Example Code"
          />
        </ShowcaseCard>

        <ShowcaseCard
          title="Advanced"
          description="進階驗證與批次處理"
          full-width
        >
          <ShowcaseCodeBlock
            code="// 正則表達式
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
const allValid = isAllValid(results)"
            label="Example Code"
          />
        </ShowcaseCard>
      </div>
    </ShowcaseSection>
  </ShowcasePage>
</template>

<style scoped>
.glass-input {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.3);
  color: #f1f5f9;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  outline: none;
  font-size: 0.95rem;
  transition: all 0.2s;
}

.glass-input:focus {
  border-color: #38bdf8;
  background: rgba(15, 23, 42, 0.8);
  box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.2);
}

.glass-btn {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.3);
  color: #e2e8f0;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.95rem;
  font-weight: 600;
}

.glass-btn:hover {
  background: rgba(51, 65, 85, 0.8);
  border-color: #94a3b8;
}

.glass-btn.primary {
  background: rgba(56, 189, 248, 0.2);
  border-color: rgba(56, 189, 248, 0.5);
  color: #38bdf8;
}

.glass-btn.primary:hover {
  background: rgba(56, 189, 248, 0.3);
  box-shadow: 0 0 10px rgba(56, 189, 248, 0.2);
}
</style>
