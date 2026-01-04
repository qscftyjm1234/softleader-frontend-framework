<script setup lang="ts">
import ITextField from '~/components/uiInterface/ITextField.vue'
import ISelect from '~/components/uiInterface/ISelect.vue'
import IDatePicker from '~/components/uiInterface/IDatePicker.vue'

interface Props {
  // 接收初始資料 (Pattern 2: 傳引用，Pattern 1: 傳初始值)
  // 為了相容兩種模式，這裡我們取名為 initialData，若為 Pattern 2 則雙向綁定 formData
  initialData?: {
    policyNo: string
    applicant: string
    planType: string
    effectiveDate: string
  }
  // 相容舊的 formData prop (Pattern 2)
  formData?: any
  // Pattern 1: 存檔成功後的回呼 (模擬刷新)
  onSaved?: (data: any) => void
}

const props = defineProps<Props>()

// 決定使用哪種資料模式
// 如果是 Pattern 1 (內聚)，我們複製一份到本地 ref
// 如果是 Pattern 2 (引用)，我們直接用 computed 代理
const isPattern2 = !!props.formData
const localForm = ref({
  policyNo: '',
  applicant: '',
  planType: '',
  effectiveDate: ''
})

// 初始化資料
if (isPattern2) {
  // Pattern 2: 直接修改外部物件 (不建議在 computed set 做 side effect，這裡只是簡化演示)
  // 實務上 Pattern 2 的 PolicyForm 可能會直接 v-model="props.formData.xx"
  // 為了統一 template 寫法，這裡不做複雜的切換，維持原樣
} else if (props.initialData) {
  // Pattern 1: 複製初始值 (Edit Mode)
  localForm.value = { ...props.initialData }
}

// 統一對外的 form 存取介面
const form = computed({
  get: () => (isPattern2 ? props.formData : localForm.value),
  set: (val) => {
    if (!isPattern2) localForm.value = val
  }
})

// 這就是 Pattern 1 的精髓：元件攔截確認事件
const onConfirm = async () => {
  console.log('[PolicyForm] Intercepted Confirm!')

  // 1. 檢核 (Internal Validation)
  // 這就在組件內部做！不需要父層介入
  const errors = []
  if (!form.value.policyNo) errors.push('保單號碼')
  if (!form.value.applicant) errors.push('要保人')
  if (!form.value.planType) errors.push('險種')

  if (errors.length > 0) {
    // 這裡可以呼叫 API 顯示錯誤，或是直接 alert
    // 為了演示簡單，我們先用 alert，實務上可以用 Toast 或上方錯誤訊息
    alert(`[內聚模式攔截]\n請檢查以下必填欄位：\n${errors.join(', ')}`)
    return false // 關鍵：回傳 false 會阻止彈窗關閉！
  }

  // 2. 模擬 API 呼叫 (Pattern 1 自行存檔)
  if (!isPattern2) {
    console.log('[PolicyForm] Saving to DB...', form.value)
    await new Promise((r) => setTimeout(r, 1000)) // 模擬延遲

    // 存檔成功，呼叫 callback 通知外部 (模擬刷新)
    if (props.onSaved) {
      props.onSaved({ ...form.value })
    }

    console.log('[PolicyForm] Saved!')
  }

  return true // 允許關閉
}

// 暴露給 GlobalModal
defineExpose({
  onConfirm
})

const planOptions = [
  { label: '人壽保險 (Life)', value: 'life' },
  { label: '醫療保險 (Medical)', value: 'medical' },
  { label: '意外保險 (Accident)', value: 'accident' },
  { label: '投資型保險 (Investment)', value: 'investment' }
]
</script>

<template>
  <div class="policy-form pa-2">
    <div class="text-body-2 text-slate-400 mb-4">
      請填寫以下保單資訊。此表單元件直接綁定傳入的資料物件。
    </div>

    <!-- 保單號碼 -->
    <ITextField
      v-model="form.policyNo"
      label="保單號碼"
      placeholder="例如: POL-2024001"
      class="mb-4"
    />

    <!-- 要保人 -->
    <ITextField
      v-model="form.applicant"
      label="要保人姓名"
      placeholder="請輸入姓名"
      class="mb-4"
    />

    <!-- 保單類型 -->
    <ISelect
      v-model="form.planType"
      :options="planOptions"
      label="保單類型"
      placeholder="請選擇類型"
      class="mb-4"
    />

    <!-- 生效日期 -->
    <!-- 注意：IDatePicker 用法可能依實作不同，這裡假設是標準 v-model -->
    <IDatePicker
      v-model="form.effectiveDate"
      label="生效日期"
      class="mb-4"
    />
  </div>
</template>

<style scoped>
.policy-form {
  /* 可以在這裡微調樣式 */
}
</style>
