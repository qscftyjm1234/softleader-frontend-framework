<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import IButton from '~/components/uiInterface/IButton.vue'
import IInput from '~/components/uiInterface/IInput.vue'
import ITextarea from '~/components/uiInterface/ITextarea.vue'
import ISelect from '~/components/uiInterface/ISelect.vue'
import ICheckbox from '~/components/uiInterface/ICheckbox.vue'
import ISwitch from '~/components/uiInterface/ISwitch.vue'
import IDatePicker from '~/components/uiInterface/IDatePicker.vue'
import IModal from '~/components/uiInterface/IModal.vue'
import IAlert from '~/components/uiInterface/IAlert.vue'
import IAvatar from '~/components/uiInterface/IAvatar.vue'
import ICard from '~/components/uiInterface/ICard.vue'
import IRadio from '~/components/uiInterface/IRadio.vue'
import IDataTable from '~/components/uiInterface/IDataTable.vue'
import ITabs from '~/components/uiInterface/ITabs.vue'
import IChip from '~/components/uiInterface/IChip.vue'
import IChipGroup from '~/components/uiInterface/IChipGroup.vue'
import IStack from '~/components/uiInterface/IStack.vue'
import ILoadingSpinner from '~/components/uiInterface/ILoadingSpinner.vue'
import IDivider from '~/components/uiInterface/IDivider.vue'
import IIcon from '~/components/uiInterface/IIcon.vue'
import IBreadcrumbs from '~/components/uiInterface/layout/IBreadcrumbs.vue'
import EmailInput from '~/components/uiBusiness/EmailInput.vue'
import PasswordInput from '~/components/uiBusiness/PasswordInput.vue'
import PhoneInput from '~/components/uiBusiness/PhoneInput.vue'
import GenderRadio from '~/components/uiBusiness/GenderRadio.vue'
import DateRangePicker from '~/components/uiBusiness/DateRangePicker.vue'
import CitySelect from '~/components/uiBusiness/CitySelect.vue'
import { useBreadcrumbs } from '~/composables/useBreadcrumbs'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'
import ShowcasePropsTable from '../components/ShowcasePropsTable.vue'

const { breadcrumbs: breadcrumbItems } = useBreadcrumbs()

definePageMeta({
  title: '元件範例',
  layout: 'portal'
})

// ... units definition (shortened for brevity in this replace call, will keep the original)
const units = [
  {
    id: 'button',
    title: 'IButton (按鈕)',
    icon: 'mdi-gesture-tap',
    desc: '標準化互動元件，支持多種顏色、大小與載入狀態。'
  },
  {
    id: 'textfield',
    title: 'IInput (單行輸入)',
    icon: 'mdi-form-textbox',
    desc: '最通用的輸入元件，支援圖示、清除按鈕與自動驗證。'
  },
  {
    id: 'textarea',
    title: 'ITextarea (多行輸入)',
    icon: 'mdi-form-textarea',
    desc: '用於長文本輸入，支持自動增高與字數統計。'
  },
  {
    id: 'select',
    title: 'ISelect (選擇器)',
    icon: 'mdi-form-select',
    desc: '下拉選單，支持搜尋、多選與標籤模式。'
  },
  {
    id: 'checkbox',
    title: 'ICheckbox (複選框)',
    icon: 'mdi-checkbox-marked-outline',
    desc: '用於二選一或多選場景。'
  },
  {
    id: 'radio',
    title: 'IRadio (單選框)',
    icon: 'mdi-radiobox-marked',
    desc: '用於多選一的場景。'
  },
  {
    id: 'switch',
    title: 'ISwitch (開關)',
    icon: 'mdi-toggle-switch-outline',
    desc: '直觀的狀態切換元件。'
  },
  {
    id: 'datepicker',
    title: 'IDatePicker (日期選擇)',
    icon: 'mdi-calendar-range',
    desc: '支援日期與時間選擇，符合台灣日期格式。'
  },
  {
    id: 'datatable',
    title: 'IDataTable (數據表格)',
    icon: 'mdi-table',
    desc: '高效能大型數據展示元件，支持排序與分頁。'
  },
  {
    id: 'card',
    title: 'ICard (卡片)',
    icon: 'mdi-card-outline',
    desc: '資訊容器，支持陰影、邊框與毛玻璃質感。'
  },
  { id: 'tabs', title: 'ITabs (標籤頁)', icon: 'mdi-tab', desc: '頁面內容分區切換。' },
  {
    id: 'alert',
    title: 'IAlert (提示框)',
    icon: 'mdi-alert-circle-outline',
    desc: '用於顯示各種反饋訊息。'
  },
  { id: 'avatar', title: 'IAvatar (頭像)', icon: 'mdi-account-circle', desc: '使用者識別圖示。' },
  {
    id: 'chip',
    title: 'IChip (標籤/晶片)',
    icon: 'mdi-tag-outline',
    desc: '精簡的展示與操作元件。'
  },
  {
    id: 'modal',
    title: 'IModal (對話框)',
    icon: 'mdi-window-maximize',
    desc: '模態視窗，用於承載重要操作或詳情。'
  },
  {
    id: 'snackbar',
    title: 'ISnackbar (消息提示)',
    icon: 'mdi-bell-ring-outline',
    desc: '非同步提醒元件。'
  },
  { id: 'loading', title: 'ILoading (載入中)', icon: 'mdi-loading', desc: '異步操作中的反饋。' },
  {
    id: 'stack',
    title: 'IStack (佈局容器)',
    icon: 'mdi-view-quilt',
    desc: '基於 Flexbox 的通用佈局工具。'
  },
  { id: 'divider', title: 'IDivider (分隔線)', icon: 'mdi-minus', desc: '內容區隔工具。' },
  // uiBusiness
  {
    id: 'email-input',
    title: 'EmailInput (信箱輸入)',
    icon: 'mdi-email-outline',
    desc: '業務型信箱輸入元件，包含格式驗證。'
  },
  {
    id: 'password-input',
    title: 'PasswordInput (密碼輸入)',
    icon: 'mdi-lock-outline',
    desc: '業務型密碼輸入元件，支援顯示切換。'
  },
  {
    id: 'phone-input',
    title: 'PhoneInput (電話號碼)',
    icon: 'mdi-phone-outline',
    desc: '業務型電話輸入元件。'
  },
  {
    id: 'gender-radio',
    title: 'GenderRadio (性別單選)',
    icon: 'mdi-gender-male-female',
    desc: '業務型性別選擇元件。'
  },
  {
    id: 'daterange-picker',
    title: 'DateRangePicker (日期區間)',
    icon: 'mdi-calendar-start-end',
    desc: '業務型日期範圍選擇元件。'
  },
  {
    id: 'city-select',
    title: 'CitySelect (縣市選擇器)',
    icon: 'mdi-map-marker-outline',
    desc: '綁定台灣縣市資料的下拉選單。'
  }
]

const activeIndex = ref(0)
const activeUnit = computed(() => units[activeIndex.value])

// --- Knobs Theory: States that control component previews ---
const knobStates = ref({
  button: {
    label: '點擊我',
    variant: 'primary',
    size: 'default',
    loading: false,
    block: false,
    disabled: false,
    icon: ''
  },
  textfield: {
    label: '使用者名稱',
    placeholder: '請輸入內容...',
    variant: 'default',
    clearable: true,
    disabled: false,
    readonly: false,
    prefixIcon: 'mdi-account',
    suffixIcon: ''
  },
  textarea: {
    label: '詳細描述',
    placeholder: '請輸入長文本...',
    rows: 4,
    autoResize: true,
    showCount: true,
    maxlength: 200,
    disabled: false,
    readonly: false
  },
  select: {
    label: '水果選擇',
    placeholder: '請選擇一個...',
    variant: 'default',
    searchable: true,
    disabled: false,
    clearable: true
  },
  checkbox: { label: '我同意服務條款', disabled: false, indeterminate: false },
  radio: { label: '樣選項', disabled: false },
  switch: { label: '啟用系統通知', disabled: false, loading: false },
  datepicker: { label: '會議日期', placeholder: '請選擇日期...', block: true, disabled: false },
  datatable: { size: 'default', loading: false, pagination: true },
  tabs: { type: 'line' },
  card: {
    title: '卡片標題',
    subtitle: '卡片副標題',
    variant: 'default',
    bordered: true,
    hoverable: true
  },
  alert: {
    title: '提示標題',
    text: '這是一則細節描述內容。',
    type: 'info',
    variant: 'flat',
    closable: false,
    showIcon: true
  },
  avatar: { size: 'default', src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' },
  chip: { label: '標籤文字', color: 'primary', variant: 'default', closable: false },
  modal: { title: '對話框標題' },
  loading: { size: 'default' },
  stack: { direction: 'vertical', gap: 'middle', block: true },
  divider: { text: '分隔線文字', textPlacement: 'center' },

  // uiBusiness states
  'email-input': {
    label: '電子信箱',
    placeholder: '請輸入電子信箱',
    readonly: false,
    disabled: false,
    error: false,
    defaultRules: true
  },
  'password-input': {
    label: '密碼',
    placeholder: '請輸入密碼',
    readonly: false,
    disabled: false,
    error: false,
    showStrength: false
  },
  'phone-input': {
    label: '手機號碼',
    placeholder: '請輸入手機號碼',
    readonly: false,
    disabled: false,
    error: false
  },
  'gender-radio': { disabled: false, readonly: false, inline: true },
  'daterange-picker': { label: '日期區間', disabled: false, required: false },
  'city-select': { disabled: false, readonly: false }
})

const getKnob = (id: string) => knobStates.value[id] || {}

// --- API Metadata: Documentation for props table ---
const componentProps = {
  button: [
    { name: 'label', description: '按鈕顯示文字', type: 'string', default: "''" },
    {
      name: 'variant',
      description: '按鈕風格 (primary, secondary, success, danger, warning, ghost)',
      type: 'string',
      default: "'primary'"
    },
    {
      name: 'size',
      description: '按鈕大小 (small, default, large)',
      type: 'string',
      default: "'default'"
    },
    { name: 'loading', description: '是否顯示載入中狀態', type: 'boolean', default: 'false' },
    { name: 'disabled', description: '是否禁用按鈕', type: 'boolean', default: 'false' },
    {
      name: 'block',
      description: '是否將按鈕寬度設為父容器的 100%',
      type: 'boolean',
      default: 'false'
    },
    { name: 'icon', description: '按鈕圖示 (MDI 指定名稱)', type: 'string', default: "''" }
  ],
  textfield: [
    { name: 'v-model', description: '輸入框綁定的數值', type: 'string', default: "''" },
    { name: 'label', description: '輸入框上方的標籤文字', type: 'string', default: "''" },
    { name: 'placeholder', description: '輸入框內的提示文字', type: 'string', default: "''" },
    { name: 'clearable', description: '是否顯示清除按鈕', type: 'boolean', default: 'false' },
    { name: 'disabled', description: '是否禁用輸入框', type: 'boolean', default: 'false' },
    { name: 'readonly', description: '是否設為唯讀模式', type: 'boolean', default: 'false' },
    { name: 'prepend-icon', description: '前置圖示', type: 'string', default: "''" },
    { name: 'append-icon', description: '後置圖示', type: 'string', default: "''" }
  ],
  textarea: [
    { name: 'v-model', description: '文本區綁定的數值', type: 'string', default: "''" },
    { name: 'label', description: '標籤文字', type: 'string', default: "''" },
    { name: 'placeholder', description: '提示文字', type: 'string', default: "''" },
    { name: 'rows', description: '默認顯示行數', type: 'number', default: '3' },
    {
      name: 'auto-resize',
      description: '是否根據內容自動調整高度',
      type: 'boolean',
      default: 'false'
    },
    { name: 'show-count', description: '是否顯示字數統計', type: 'boolean', default: 'false' },
    { name: 'maxlength', description: '最大輸入長度', type: 'number', default: 'undefined' }
  ],
  select: [
    { name: 'v-model', description: '選中的值', type: 'any', default: 'undefined' },
    { name: 'options', description: '可選項列表 [{label, value}]', type: 'array', default: '[]' },
    { name: 'label', description: '標籤文字', type: 'string', default: "''" },
    { name: 'searchable', description: '是否支持搜尋過濾', type: 'boolean', default: 'false' },
    { name: 'clearable', description: '是否可以清除選擇', type: 'boolean', default: 'false' }
  ],
  checkbox: [
    { name: 'v-model', description: '勾選狀態', type: 'boolean', default: 'false' },
    { name: 'label', description: '描述文字', type: 'string', default: "''" },
    { name: 'disabled', description: '是否禁用', type: 'boolean', default: 'false' },
    { name: 'indeterminate', description: '半選狀態', type: 'boolean', default: 'false' }
  ],
  radio: [
    { name: 'v-model', description: '選中的值', type: 'any', default: 'undefined' },
    { name: 'value', description: '當前選項的值', type: 'any', default: 'undefined' },
    { name: 'label', description: '描述文字', type: 'string', default: "''" }
  ],
  switch: [{ name: 'loading', description: '顯示載入狀態', type: 'boolean', default: 'false' }],
  datepicker: [
    { name: 'v-model', description: '選中的日期字符串', type: 'string', default: "''" },
    { name: 'label', description: '標籤文字', type: 'string', default: "''" },
    { name: 'placeholder', description: '提示文字', type: 'string', default: "''" },
    { name: 'block', description: '是否寬度 100%', type: 'boolean', default: 'false' },
    { name: 'disabled', description: '是否禁用', type: 'boolean', default: 'false' }
  ],
  datatable: [
    { name: 'columns', description: '表頭定義列表', type: 'array', default: '[]' },
    { name: 'data-source', description: '數據源列表', type: 'array', default: '[]' },
    { name: 'loading', description: '是否顯示載入狀態', type: 'boolean', default: 'false' },
    {
      name: 'size',
      description: '表格尺寸 (small, middle, default)',
      type: 'string',
      default: "'default'"
    },
    {
      name: 'pagination',
      description: '分頁配置，設為 false 則隱藏',
      type: 'object | boolean',
      default: 'true'
    }
  ],
  tabs: [
    {
      name: 'v-model',
      description: '目前選中的標籤值',
      type: 'string | number',
      default: 'undefined'
    },
    { name: 'options', description: '標籤列表 [{label, value}]', type: 'array', default: '[]' },
    { name: 'type', description: '標籤樣式 (line, card)', type: 'string', default: "'line'" }
  ],
  card: [
    { name: 'title', description: '卡片標題', type: 'string', default: "''" },
    { name: 'subtitle', description: '卡片副標題', type: 'string', default: "''" },
    {
      name: 'variant',
      description: '渲染風格 (default, glass, elevated, flat)',
      type: 'string',
      default: "'default'"
    },
    { name: 'bordered', description: '是否顯示邊框', type: 'boolean', default: 'true' },
    { name: 'hoverable', description: '滑鼠懸停效果', type: 'boolean', default: 'false' }
  ],
  alert: [
    { name: 'title', description: '提示標題', type: 'string', default: "''" },
    { name: 'text', description: '詳細描述', type: 'string', default: "''" },
    {
      name: 'type',
      description: '提示類型 (success, info, warning, error)',
      type: 'string',
      default: "'info'"
    },
    {
      name: 'variant',
      description: '顯示樣式 (flat, outlined, ghost)',
      type: 'string',
      default: "'flat'"
    },
    { name: 'closable', description: '是否可關閉', type: 'boolean', default: 'false' },
    { name: 'show-icon', description: '是否顯示類型圖示', type: 'boolean', default: 'true' }
  ],
  avatar: [
    { name: 'src', description: '頭像圖片地址', type: 'string', default: "''" },
    {
      name: 'size',
      description: '頭像尺寸 (small, default, large) 或數字',
      type: 'string | number',
      default: "'default'"
    },
    { name: 'shape', description: '頭像形狀 (circle, square)', type: 'string', default: "'circle'" }
  ],
  chip: [
    { name: 'label', description: '標籤文字', type: 'string', default: "''" },
    {
      name: 'color',
      description: '標籤顏色 (primary, success, warning, error, info)',
      type: 'string',
      default: "'primary'"
    },
    {
      name: 'variant',
      description: '顯示樣式 (default, outlined)',
      type: 'string',
      default: "'default'"
    },
    { name: 'closable', description: '是否可關閉', type: 'boolean', default: 'false' }
  ],
  modal: [
    { name: 'title', description: '對話框標題', type: 'string', default: "''" },
    { name: 'width', description: '對話框寬度', type: 'string | number', default: '520' },
    { name: 'visible', description: '是否顯示', type: 'boolean', default: 'false' }
  ],
  loading: [
    {
      name: 'size',
      description: '圖示尺寸 (small, default, large)',
      type: 'string',
      default: "'default'"
    },
    { name: 'tip', description: '載入文字', type: 'string', default: "''" }
  ],
  stack: [
    {
      name: 'direction',
      description: '佈局方向 (horizontal, vertical)',
      type: 'string',
      default: "'horizontal'"
    },
    {
      name: 'gap',
      description: '間距大小 (small, middle, large) 或數字',
      type: 'string | number',
      default: "'middle'"
    },
    { name: 'align', description: '垂直對齊方式', type: 'string', default: "'start'" },
    { name: 'justify', description: '水平對齊方式', type: 'string', default: "'start'" },
    { name: 'block', description: '是否佔滿容器寬度', type: 'boolean', default: 'false' }
  ],
  divider: [
    { name: 'text', description: '分隔線文字內容', type: 'string', default: "''" },
    {
      name: 'text-placement',
      description: '文字位置 (left, center, right)',
      type: 'string',
      default: "'center'"
    },
    { name: 'dashed', description: '是否為虛線', type: 'boolean', default: 'false' }
  ],
  // uiBusiness components
  'email-input': [
    { name: 'v-model', description: '綁定的信箱數值', type: 'string', default: "''" },
    { name: 'label', description: '標籤文字', type: 'string', default: "'電子信箱'" },
    { name: 'placeholder', description: '提示文字', type: 'string', default: "'請輸入電子信箱'" },
    { name: 'readonly', description: '是否唯讀', type: 'boolean', default: 'false' },
    { name: 'disabled', description: '是否禁用', type: 'boolean', default: 'false' },
    { name: 'error', description: '手動控制錯誤狀態', type: 'boolean', default: 'false' },
    {
      name: 'defaultRules',
      description: '是否使用內建 E-mail 驗證規則',
      type: 'boolean',
      default: 'true'
    }
  ],
  'password-input': [
    { name: 'v-model', description: '綁定的密碼數值', type: 'string', default: "''" },
    { name: 'label', description: '標籤文字', type: 'string', default: "'密碼'" },
    { name: 'placeholder', description: '提示文字', type: 'string', default: "'請輸入密碼'" },
    { name: 'readonly', description: '是否唯讀', type: 'boolean', default: 'false' },
    { name: 'disabled', description: '是否禁用', type: 'boolean', default: 'false' },
    { name: 'error', description: '手動控制錯誤狀態', type: 'boolean', default: 'false' },
    { name: 'showStrength', description: '是否顯示密碼強度條', type: 'boolean', default: 'false' }
  ],
  'phone-input': [
    { name: 'v-model', description: '綁定的電話號碼', type: 'string', default: "''" },
    { name: 'label', description: '標籤文字', type: 'string', default: "'手機號碼'" },
    { name: 'placeholder', description: '提示文字', type: 'string', default: "'請輸入手機號碼'" },
    { name: 'readonly', description: '是否唯讀', type: 'boolean', default: 'false' },
    { name: 'disabled', description: '是否禁用', type: 'boolean', default: 'false' },
    { name: 'error', description: '手動控制錯誤狀態', type: 'boolean', default: 'false' }
  ],
  'gender-radio': [
    { name: 'v-model', description: '綁定的性別 (M 或 F)', type: 'string', default: "''" },
    { name: 'disabled', description: '是否禁用', type: 'boolean', default: 'false' },
    { name: 'readonly', description: '是否唯讀', type: 'boolean', default: 'false' },
    { name: 'inline', description: '是否水平排列', type: 'boolean', default: 'true' }
  ],
  'daterange-picker': [
    {
      name: 'v-model',
      description: '綁定的日期區間物件 ({ start, end })',
      type: 'object',
      default: 'null'
    },
    { name: 'label', description: '標籤文字', type: 'string', default: "'日期區間'" },
    { name: 'required', description: '是否必填', type: 'boolean', default: 'false' },
    { name: 'disabled', description: '是否禁用', type: 'boolean', default: 'false' }
  ],
  'city-select': [
    { name: 'v-model', description: '綁定的縣市代碼', type: 'string', default: "''" },
    { name: 'disabled', description: '是否禁用', type: 'boolean', default: 'false' },
    { name: 'readonly', description: '是否唯讀', type: 'boolean', default: 'false' }
  ]
}

// States for Playground values
const inputVal = ref('')
const textareaVal = ref('')
const selectVal = ref('orange')
const checkboxVal = ref(true)
const switchVal = ref(false)
const radioVal = ref('1')
const dateVal = ref(null)

const scrollContainer = ref<HTMLElement | null>(null)
watch(activeIndex, () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollTo({ top: 0, behavior: 'smooth' })
  }
})

// Snippets
const getSnippet = (id: string) => {
  const k = getKnob(id)
  switch (id) {
    case 'button':
      return `<IButton \n  label="${k.label}" \n  variant="${k.variant}" \n  size="${k.size}" \n  :loading="${k.loading}" \n  :block="${k.block}" \n  :disabled="${k.disabled}" \n/>`
    case 'textfield':
      return `<IInput \n  v-model="val" \n  label="${k.label}" \n  placeholder="${k.placeholder}" \n  :clearable="${k.clearable}" \n  :disabled="${k.disabled}" \n  :readonly="${k.readonly}" \n  prepend-icon="${k.prefixIcon}"\n/>`
    case 'textarea':
      return `<ITextarea \n  v-model="val" \n  label="${k.label}" \n  placeholder="${k.placeholder}" \n  :rows="${k.rows}" \n  :auto-resize="${k.autoResize}" \n  :show-count="${k.showCount}" \n  :maxlength="${k.maxlength}" \n/>`
    case 'select':
      return `<ISelect \n  v-model="val" \n  label="${k.label}" \n  :options="options" \n  :searchable="${k.searchable}" \n  :clearable="${k.clearable}" \n/>`
    case 'checkbox':
      return `<ICheckbox v-model="val" label="${k.label}" :disabled="${k.disabled}" :indeterminate="${k.indeterminate}" />`
    case 'radio':
      return `<IRadio v-model="val" value="1" label="${k.label}" :disabled="${k.disabled}" />`
    case 'switch':
      return `<ISwitch v-model="val" label="${k.label}" :disabled="${k.disabled}" :loading="${k.loading}" />`
    case 'datepicker':
      return `<IDatePicker \n  v-model="val" \n  label="${k.label}" \n  placeholder="${k.placeholder}" \n  :block="${k.block}" \n  :disabled="${k.disabled}" \n/>`
    case 'datatable':
      return `<IDataTable \n  :columns="columns" \n  :data-source="data" \n  size="${k.size}" \n  :loading="${k.loading}" \n  :pagination="${k.pagination}" \n/>`
    case 'tabs':
      return `<ITabs \n  v-model="active" \n  :options="options" \n  type="${k.type}" \n/>`
    case 'card':
      return `<ICard \n  title="${k.title}" \n  subtitle="${k.subtitle}" \n  variant="${k.variant}" \n  :bordered="${k.bordered}" \n  :hoverable="${k.hoverable}" \n> \n  內容區塊... \n</ICard>`
    case 'alert':
      return `<IAlert \n  title="${k.title}" \n  text="${k.text}" \n  type="${k.type}" \n  variant="${k.variant}" \n  :closable="${k.closable}" \n  :show-icon="${k.showIcon}" \n/>`
    case 'avatar':
      return `<IAvatar \n  src="${k.src}" \n  size="${k.size}" \n/>`
    case 'chip':
      return `<IChip \n  label="${k.label}" \n  color="${k.color}" \n  variant="${k.variant}" \n  :closable="${k.closable}" \n/>`
    case 'modal':
      return `// 透過 useModal(ModalComponent).open() 開啟 \n// 屬性定義於元件內`
    case 'loading':
      return `<ILoadingSpinner size="${k.size}" />`
    case 'stack':
      return `<IStack \n  direction="${k.direction}" \n  gap="${k.gap}" \n  :block="${k.block}" \n> \n  <div /> <div /> \n</IStack>`
    case 'divider':
      return `<IDivider \n  text="${k.text}" \n  text-placement="${k.textPlacement}" \n/>`
    case 'email-input':
      return `<EmailInput \n  v-model="val" \n  label="${k.label}" \n  placeholder="${k.placeholder}" \n  :disabled="${k.disabled}" \n  :readonly="${k.readonly}" \n  :error="${k.error}" \n  :default-rules="${k.defaultRules}" \n/>`
    case 'password-input':
      return `<PasswordInput \n  v-model="val" \n  label="${k.label}" \n  placeholder="${k.placeholder}" \n  :disabled="${k.disabled}" \n  :readonly="${k.readonly}" \n  :error="${k.error}" \n  :show-strength="${k.showStrength}" \n/>`
    case 'phone-input':
      return `<PhoneInput \n  v-model="val" \n  label="${k.label}" \n  placeholder="${k.placeholder}" \n  :disabled="${k.disabled}" \n  :readonly="${k.readonly}" \n  :error="${k.error}" \n/>`
    case 'gender-radio':
      return `<GenderRadio \n  v-model="val" \n  :disabled="${k.disabled}" \n  :readonly="${k.readonly}" \n  :inline="${k.inline}" \n/>`
    case 'daterange-picker':
      return `<DateRangePicker \n  v-model="val" \n  label="${k.label}" \n  :disabled="${k.disabled}" \n  :required="${k.required}" \n/>`
    case 'city-select':
      return `<CitySelect \n  v-model="val" \n  :disabled="${k.disabled}" \n  :readonly="${k.readonly}" \n/>`
    default:
      return '在此展示組件用法'
  }
}
</script>

<template>
  <div class="vue-course-layout min-h-screen bg-white">
    <!-- Header -->
    <header
      class="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-slate-100 px-8 py-4"
    >
      <div class="max-w-[1400px] mx-auto flex items-center justify-between">
        <div class="flex items-center gap-5">
          <NuxtLink
            to="/"
            class="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-all group"
          >
            <IIcon
              icon="mdi-home-outline"
              size="22"
              class="group-hover:scale-110 transition-transform"
            />
          </NuxtLink>
          <div class="h-8 w-px bg-slate-200 mx-1"></div>
          <IBreadcrumbs :items="breadcrumbItems" />
        </div>
        <div
          class="px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-widest"
        >
          UI 元件總覽
        </div>
      </div>
    </header>

    <div class="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-73px)]">
      <!-- Sidebar Nav -->
      <aside
        class="lg:col-span-3 border-r border-slate-50 p-6 space-y-2 bg-slate-50/30 overflow-y-auto max-h-[calc(100vh-73px)] custom-scrollbar"
      >
        <div
          class="px-4 py-2 mb-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]"
        >
          元件目錄
        </div>
        <button
          v-for="(unit, index) in units"
          :key="unit.id"
          class="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group"
          :class="
            activeIndex === index
              ? 'bg-white shadow-sm text-indigo-600 ring-1 ring-indigo-50'
              : 'text-slate-500 hover:bg-slate-100/50'
          "
          @click="activeIndex = index"
        >
          <div
            class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-colors"
            :class="
              activeIndex === index ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'
            "
          >
            {{ index + 1 }}
          </div>
          <span class="text-sm font-black tracking-tight">{{ unit.title }}</span>
        </button>
      </aside>

      <!-- Main Content -->
      <div
        ref="scrollContainer"
        class="lg:col-span-9 h-full overflow-y-auto bg-slate-50/10"
      >
        <main class="max-w-4xl mx-auto p-10 space-y-12 pb-32">
          <!-- Intro Section -->
          <div class="space-y-6">
            <div class="flex items-center gap-4">
              <div
                class="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 shadow-sm"
              >
                <IIcon
                  :icon="activeUnit.icon"
                  size="28"
                />
              </div>
              <div>
                <h1 class="text-4xl font-black text-slate-900 tracking-tight">
                  {{ activeUnit.title }}
                </h1>
                <p class="text-lg text-slate-500 font-medium mt-1">{{ activeUnit.desc }}</p>
              </div>
            </div>
          </div>

          <!-- Unit Content -->
          <div class="space-y-12 animate-fadeIn">
            <!-- Button Section -->
            <template v-if="activeUnit.id === 'button'">
              <div class="space-y-12">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  <!-- Studio View (Preview + Code) -->
                  <div class="lg:col-span-8 space-y-8">
                    <ShowcaseCard title="元件實體預覽 (Live Preview)">
                      <div
                        class="min-h-[240px] flex items-center justify-center bg-slate-50/50 rounded-3xl border border-dashed border-slate-200 p-12"
                      >
                        <IButton
                          v-bind="getKnob('button')"
                          @click="
                            () => {
                              if (!getKnob('button').loading) {
                                knobStates.button.loading = true
                                setTimeout(() => (knobStates.button.loading = false), 2000)
                              }
                            }
                          "
                        />
                      </div>
                    </ShowcaseCard>

                    <div class="space-y-4">
                      <div class="flex items-center gap-2 px-2">
                        <div class="w-1.5 h-4 bg-indigo-500 rounded-full"></div>
                        <h4 class="text-xs font-black text-slate-500 uppercase tracking-widest">
                          實作代碼 (Code Snippet)
                        </h4>
                      </div>
                      <ShowcaseCodeBlock :code="getSnippet('button')" />
                    </div>
                  </div>

                  <!-- Side Controls (Knobs) -->
                  <div class="lg:col-span-4 space-y-8 lg:sticky lg:top-8">
                    <ShowcaseCard title="屬性控制 (Knobs)">
                      <IStack
                        direction="vertical"
                        gap="large"
                        block
                      >
                        <IInput
                          v-model="knobStates.button.label"
                          label="按鈕文字 (Label)"
                          placeholder="輸入文字..."
                        />
                        <ISelect
                          v-model="knobStates.button.variant"
                          label="風格 (Variant)"
                          :options="
                            ['primary', 'secondary', 'success', 'danger', 'warning', 'ghost'].map(
                              (v) => ({ label: v, value: v })
                            )
                          "
                        />
                        <ISelect
                          v-model="knobStates.button.size"
                          label="尺寸 (Size)"
                          :options="
                            ['small', 'default', 'large'].map((v) => ({ label: v, value: v }))
                          "
                        />
                        <IInput
                          v-model="knobStates.button.icon"
                          label="圖示名稱 (Icon)"
                          placeholder="mdi-heart"
                        />

                        <div class="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                          <ISwitch
                            v-model="knobStates.button.loading"
                            label="載入中"
                          />
                          <ISwitch
                            v-model="knobStates.button.disabled"
                            label="停用"
                          />
                          <ISwitch
                            v-model="knobStates.button.block"
                            label="佔滿寬度"
                          />
                        </div>
                      </IStack>
                    </ShowcaseCard>
                  </div>
                </div>

                <ShowcasePropsTable :props-data="componentProps.button" />
              </div>
            </template>

            <!-- TextField Section -->
            <template v-if="activeUnit.id === 'textfield'">
              <div class="space-y-12">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  <!-- Studio View -->
                  <div class="lg:col-span-8 space-y-8">
                    <ShowcaseCard title="元件實體預覽 (Live Preview)">
                      <div
                        class="min-h-[240px] flex flex-col justify-center bg-slate-50/50 rounded-3xl border border-dashed border-slate-200 p-12 space-y-4"
                      >
                        <IInput
                          v-model="inputVal"
                          v-bind="getKnob('textfield')"
                        />
                        <div
                          class="text-xs font-mono text-indigo-600 bg-white p-3 rounded-xl border border-slate-100 self-start"
                        >
                          綁定數值 (Value): {{ inputVal || '(空)' }}
                        </div>
                      </div>
                    </ShowcaseCard>

                    <div class="space-y-4">
                      <div class="flex items-center gap-2 px-2">
                        <div class="w-1.5 h-4 bg-indigo-500 rounded-full"></div>
                        <h4 class="text-xs font-black text-slate-500 uppercase tracking-widest">
                          實作代碼 (Code Snippet)
                        </h4>
                      </div>
                      <ShowcaseCodeBlock :code="getSnippet('textfield')" />
                    </div>
                  </div>

                  <!-- Side Controls -->
                  <div class="lg:col-span-4 space-y-8 lg:sticky lg:top-8">
                    <ShowcaseCard title="屬性控制 (Knobs)">
                      <IStack
                        direction="vertical"
                        gap="large"
                        block
                      >
                        <IInput
                          v-model="knobStates.textfield.label"
                          label="標籤文字 (Label)"
                        />
                        <IInput
                          v-model="knobStates.textfield.placeholder"
                          label="提示文字 (Placeholder)"
                        />
                        <IInput
                          v-model="knobStates.textfield.prefixIcon"
                          label="前置圖示"
                          placeholder="e.g. mdi-account"
                        />

                        <div class="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                          <ISwitch
                            v-model="knobStates.textfield.clearable"
                            label="可清除"
                          />
                          <ISwitch
                            v-model="knobStates.textfield.disabled"
                            label="停用"
                          />
                          <ISwitch
                            v-model="knobStates.textfield.readonly"
                            label="唯讀"
                          />
                        </div>
                      </IStack>
                    </ShowcaseCard>
                  </div>
                </div>

                <ShowcasePropsTable :props-data="componentProps.textfield" />
              </div>
            </template>

            <!-- Textarea Section -->
            <template v-if="activeUnit.id === 'textarea'">
              <div class="space-y-12">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  <!-- Studio View -->
                  <div class="lg:col-span-8 space-y-8">
                    <ShowcaseCard title="元件實體預覽 (Live Preview)">
                      <div
                        class="min-h-[240px] flex flex-col justify-center bg-slate-50/50 rounded-3xl border border-dashed border-slate-200 p-12 space-y-4"
                      >
                        <ITextarea
                          v-model="textareaVal"
                          v-bind="getKnob('textarea')"
                        />
                        <div
                          class="text-xs font-mono text-indigo-600 bg-white p-3 rounded-xl border border-slate-100 self-start"
                        >
                          綁定數值 (Value): {{ textareaVal || '(空)' }}
                        </div>
                      </div>
                    </ShowcaseCard>

                    <div class="space-y-4">
                      <div class="flex items-center gap-2 px-2">
                        <div class="w-1.5 h-4 bg-indigo-500 rounded-full"></div>
                        <h4 class="text-xs font-black text-slate-500 uppercase tracking-widest">
                          實作代碼 (Code Snippet)
                        </h4>
                      </div>
                      <ShowcaseCodeBlock :code="getSnippet('textarea')" />
                    </div>
                  </div>

                  <!-- Side Controls -->
                  <div class="lg:col-span-4 space-y-8 lg:sticky lg:top-8">
                    <ShowcaseCard title="屬性控制 (Knobs)">
                      <IStack
                        direction="vertical"
                        gap="large"
                        block
                      >
                        <IInput
                          v-model="knobStates.textarea.label"
                          label="標籤文字 (Label)"
                        />
                        <IInput
                          v-model="knobStates.textarea.placeholder"
                          label="提示文字 (Placeholder)"
                        />
                        <div class="grid grid-cols-2 gap-4">
                          <IInput
                            v-model.number="knobStates.textarea.rows"
                            type="number"
                            label="顯示行數"
                          />
                          <IInput
                            v-model.number="knobStates.textarea.maxlength"
                            type="number"
                            label="最大長度"
                          />
                        </div>
                        <div class="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                          <ISwitch
                            v-model="knobStates.textarea.autoResize"
                            label="自動增高"
                          />
                          <ISwitch
                            v-model="knobStates.textarea.showCount"
                            label="字數統計"
                          />
                        </div>
                      </IStack>
                    </ShowcaseCard>
                  </div>
                </div>
                <ShowcasePropsTable :props-data="componentProps.textarea" />
              </div>
            </template>

            <!-- Select Section -->
            <template v-if="activeUnit.id === 'select'">
              <div class="space-y-12">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  <!-- Studio View -->
                  <div class="lg:col-span-8 space-y-8">
                    <ShowcaseCard title="元件實體預覽 (Live Preview)">
                      <div
                        class="min-h-[240px] flex flex-col justify-center bg-slate-50/50 rounded-3xl border border-dashed border-slate-200 p-12"
                      >
                        <ISelect
                          v-model="selectVal"
                          v-bind="getKnob('select')"
                          :options="[
                            { label: '蘋果 (Apple)', value: 'apple' },
                            { label: '香蕉 (Banana)', value: 'banana' },
                            { label: '橘子 (Orange)', value: 'orange' }
                          ]"
                        />
                      </div>
                    </ShowcaseCard>

                    <div class="space-y-4">
                      <div class="flex items-center gap-2 px-2">
                        <div class="w-1.5 h-4 bg-indigo-500 rounded-full"></div>
                        <h4 class="text-xs font-black text-slate-500 uppercase tracking-widest">
                          實作代碼 (Code Snippet)
                        </h4>
                      </div>
                      <ShowcaseCodeBlock :code="getSnippet('select')" />
                    </div>
                  </div>

                  <!-- Side Controls -->
                  <div class="lg:col-span-4 space-y-8 lg:sticky lg:top-8">
                    <ShowcaseCard title="屬性控制 (Knobs)">
                      <IStack
                        direction="vertical"
                        gap="large"
                        block
                      >
                        <IInput
                          v-model="knobStates.select.label"
                          label="標籤文字 (Label)"
                        />
                        <IInput
                          v-model="knobStates.select.placeholder"
                          label="提示文字 (Placeholder)"
                        />
                        <div class="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                          <ISwitch
                            v-model="knobStates.select.searchable"
                            label="開啟搜尋"
                          />
                          <ISwitch
                            v-model="knobStates.select.clearable"
                            label="可清除"
                          />
                        </div>
                      </IStack>
                    </ShowcaseCard>
                  </div>
                </div>
                <ShowcasePropsTable :props-data="componentProps.select" />
              </div>
            </template>

            <!-- Checkbox, Radio, Switch Section -->
            <template v-if="['checkbox', 'radio', 'switch'].includes(activeUnit.id)">
              <div class="space-y-12">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  <!-- Studio View -->
                  <div class="lg:col-span-8 space-y-8">
                    <ShowcaseCard title="元件實體預覽 (Live Preview)">
                      <div
                        class="min-h-[240px] flex flex-col justify-center bg-slate-50/50 rounded-3xl border border-dashed border-slate-200 p-12 space-y-8"
                      >
                        <div
                          v-if="activeUnit.id === 'checkbox'"
                          class="space-y-4"
                        >
                          <ICheckbox
                            v-model="checkboxVal"
                            v-bind="getKnob('checkbox')"
                          />
                          <div
                            class="text-xs font-mono text-indigo-600 bg-white p-3 rounded-xl border border-slate-100 self-start"
                          >
                            綁定狀態: {{ checkboxVal ? 'Checked' : 'Unchecked' }}
                          </div>
                        </div>

                        <div
                          v-if="activeUnit.id === 'radio'"
                          class="space-y-4"
                        >
                          <IStack gap="large">
                            <IRadio
                              v-model="radioVal"
                              value="1"
                              v-bind="getKnob('radio')"
                              label="選項 A"
                            />
                            <IRadio
                              v-model="radioVal"
                              value="2"
                              v-bind="getKnob('radio')"
                              label="選項 B"
                            />
                          </IStack>
                          <div
                            class="text-xs font-mono text-indigo-600 bg-white p-3 rounded-xl border border-slate-100 self-start"
                          >
                            目前選擇: {{ radioVal }}
                          </div>
                        </div>

                        <div
                          v-if="activeUnit.id === 'switch'"
                          class="space-y-4"
                        >
                          <ISwitch
                            v-model="switchVal"
                            v-bind="getKnob('switch')"
                          />
                          <div
                            class="text-xs font-mono text-indigo-600 bg-white p-3 rounded-xl border border-slate-100 self-start"
                          >
                            開關狀態: {{ switchVal ? 'ON' : 'OFF' }}
                          </div>
                        </div>
                      </div>
                    </ShowcaseCard>

                    <div class="space-y-4">
                      <div class="flex items-center gap-2 px-2">
                        <div class="w-1.5 h-4 bg-indigo-500 rounded-full"></div>
                        <h4 class="text-xs font-black text-slate-500 uppercase tracking-widest">
                          實作代碼 (Code Snippet)
                        </h4>
                      </div>
                      <ShowcaseCodeBlock :code="getSnippet(activeUnit.id)" />
                    </div>
                  </div>

                  <!-- Side Controls -->
                  <div class="lg:col-span-4 space-y-8 lg:sticky lg:top-8">
                    <ShowcaseCard title="屬性控制 (Knobs)">
                      <div v-if="activeUnit.id === 'checkbox'">
                        <IStack
                          direction="vertical"
                          gap="large"
                          block
                        >
                          <IInput
                            v-model="knobStates.checkbox.label"
                            label="標籤文字"
                          />
                          <div class="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                            <ISwitch
                              v-model="knobStates.checkbox.disabled"
                              label="停用"
                            />
                            <ISwitch
                              v-model="knobStates.checkbox.indeterminate"
                              label="半選狀態"
                            />
                          </div>
                        </IStack>
                      </div>
                      <div v-if="activeUnit.id === 'radio'">
                        <IStack
                          direction="vertical"
                          gap="large"
                          block
                        >
                          <IInput
                            v-model="knobStates.radio.label"
                            label="標籤預設文字"
                          />
                          <div class="pt-4 border-t border-slate-100">
                            <ISwitch
                              v-model="knobStates.radio.disabled"
                              label="停用"
                            />
                          </div>
                        </IStack>
                      </div>
                      <div v-if="activeUnit.id === 'switch'">
                        <IStack
                          direction="vertical"
                          gap="large"
                          block
                        >
                          <IInput
                            v-model="knobStates.switch.label"
                            label="標籤文字"
                          />
                          <div class="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                            <ISwitch
                              v-model="knobStates.switch.disabled"
                              label="停用"
                            />
                            <ISwitch
                              v-model="knobStates.switch.loading"
                              label="載入中"
                            />
                          </div>
                        </IStack>
                      </div>
                    </ShowcaseCard>
                  </div>
                </div>
                <ShowcasePropsTable :props-data="componentProps[activeUnit.id]" />
              </div>
            </template>

            <!-- DatePicker Section -->
            <template v-if="activeUnit.id === 'datepicker'">
              <div class="space-y-12">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  <!-- Studio View -->
                  <div class="lg:col-span-8 space-y-8">
                    <ShowcaseCard title="元件實體預覽 (Live Preview)">
                      <div
                        class="min-h-[240px] flex flex-col justify-center bg-slate-50/50 rounded-3xl border border-dashed border-slate-200 p-12 space-y-4"
                      >
                        <IDatePicker
                          v-model="dateVal"
                          v-bind="getKnob('datepicker')"
                        />
                        <div
                          class="text-xs font-mono text-indigo-600 bg-white p-3 rounded-xl border border-slate-100 self-start"
                        >
                          目前選擇 (Value): {{ dateVal || '尚未選擇' }}
                        </div>
                      </div>
                    </ShowcaseCard>

                    <div class="space-y-4">
                      <div class="flex items-center gap-2 px-2">
                        <div class="w-1.5 h-4 bg-indigo-500 rounded-full"></div>
                        <h4 class="text-xs font-black text-slate-500 uppercase tracking-widest">
                          實作代碼 (Code Snippet)
                        </h4>
                      </div>
                      <ShowcaseCodeBlock :code="getSnippet('datepicker')" />
                    </div>
                  </div>

                  <!-- Side Controls -->
                  <div class="lg:col-span-4 space-y-8 lg:sticky lg:top-8">
                    <ShowcaseCard title="屬性控制 (Knobs)">
                      <IStack
                        direction="vertical"
                        gap="large"
                        block
                      >
                        <IInput
                          v-model="knobStates.datepicker.label"
                          label="標籤文字 (Label)"
                        />
                        <IInput
                          v-model="knobStates.datepicker.placeholder"
                          label="提示文字 (Placeholder)"
                        />
                        <div class="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                          <ISwitch
                            v-model="knobStates.datepicker.block"
                            label="寬度 100%"
                          />
                          <ISwitch
                            v-model="knobStates.datepicker.disabled"
                            label="停用"
                          />
                        </div>
                      </IStack>
                    </ShowcaseCard>
                  </div>
                </div>
                <ShowcasePropsTable :props-data="componentProps.datepicker" />
              </div>
            </template>

            <!-- DataTable Section -->
            <template v-if="activeUnit.id === 'datatable'">
              <div class="space-y-12">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  <!-- Studio View -->
                  <div class="lg:col-span-8 space-y-8">
                    <ShowcaseCard title="元件實體預覽 (Live Preview)">
                      <div
                        class="min-h-[320px] bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm"
                      >
                        <IDataTable
                          v-bind="getKnob('datatable')"
                          :columns="[
                            { title: '姓名', dataIndex: 'name', key: 'name' },
                            { title: '職位', dataIndex: 'role', key: 'role' },
                            { title: '狀態', dataIndex: 'status', key: 'status' }
                          ]"
                          :data-source="[
                            { id: 1, name: '王小明', role: '前端工程師', status: '在職' },
                            { id: 2, name: '李漂亮', role: '產品經理', status: '遠端' },
                            { id: 3, name: '張偉', role: '設計師', status: '面試中' }
                          ]"
                        />
                      </div>
                    </ShowcaseCard>

                    <div class="space-y-4">
                      <div class="flex items-center gap-2 px-2">
                        <div class="w-1.5 h-4 bg-indigo-500 rounded-full"></div>
                        <h4 class="text-xs font-black text-slate-500 uppercase tracking-widest">
                          實作代碼 (Code Snippet)
                        </h4>
                      </div>
                      <ShowcaseCodeBlock :code="getSnippet('datatable')" />
                    </div>
                  </div>

                  <!-- Side Controls -->
                  <div class="lg:col-span-4 space-y-8 lg:sticky lg:top-8">
                    <ShowcaseCard title="屬性控制 (Knobs)">
                      <IStack
                        direction="vertical"
                        gap="large"
                        block
                      >
                        <ISelect
                          v-model="knobStates.datatable.size"
                          label="表格尺寸 (Size)"
                          :options="
                            ['small', 'middle', 'default'].map((v) => ({ label: v, value: v }))
                          "
                        />
                        <div class="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                          <ISwitch
                            v-model="knobStates.datatable.loading"
                            label="載入中"
                          />
                          <ISwitch
                            v-model="knobStates.datatable.pagination"
                            label="啟用分頁"
                          />
                        </div>
                      </IStack>
                    </ShowcaseCard>
                  </div>
                </div>
                <ShowcasePropsTable :props-data="componentProps.datatable" />
              </div>
            </template>

            <!-- Tabs Section -->
            <template v-if="activeUnit.id === 'tabs'">
              <div class="space-y-12">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  <!-- Studio View -->
                  <div class="lg:col-span-8 space-y-8">
                    <ShowcaseCard title="元件實體預覽 (Live Preview)">
                      <div
                        class="min-h-[240px] flex flex-col justify-center bg-slate-50/50 rounded-3xl border border-dashed border-slate-200 p-12 space-y-8"
                      >
                        <ITabs
                          v-model="radioVal"
                          v-bind="getKnob('tabs')"
                          :options="[
                            { label: '基本資訊', value: '1' },
                            { label: '安全性', value: '2' },
                            { label: '通知設定', value: '3' }
                          ]"
                        />
                        <div
                          class="p-8 bg-white rounded-2xl border border-slate-100 text-slate-500 text-sm shadow-sm"
                        >
                          <div class="flex items-center gap-3 mb-4">
                            <div
                              class="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600"
                            >
                              <IIcon
                                :icon="
                                  radioVal === '1'
                                    ? 'mdi-account'
                                    : radioVal === '2'
                                      ? 'mdi-shield-check'
                                      : 'mdi-bell'
                                "
                                size="18"
                              />
                            </div>
                            <span class="font-black text-slate-700">
                              {{
                                radioVal === '1'
                                  ? '基本資訊'
                                  : radioVal === '2'
                                    ? '安全性設定'
                                    : '通知設定'
                              }}
                            </span>
                          </div>
                          {{
                            radioVal === '1'
                              ? '這裡是基本資訊內容展示區區塊...'
                              : '其他分頁相關設定內容展示...'
                          }}
                        </div>
                      </div>
                    </ShowcaseCard>

                    <div class="space-y-4">
                      <div class="flex items-center gap-2 px-2">
                        <div class="w-1.5 h-4 bg-indigo-500 rounded-full"></div>
                        <h4 class="text-xs font-black text-slate-500 uppercase tracking-widest">
                          實作代碼 (Code Snippet)
                        </h4>
                      </div>
                      <ShowcaseCodeBlock :code="getSnippet('tabs')" />
                    </div>
                  </div>

                  <!-- Side Controls -->
                  <div class="lg:col-span-4 space-y-8 lg:sticky lg:top-8">
                    <ShowcaseCard title="屬性控制 (Knobs)">
                      <IStack
                        direction="vertical"
                        gap="large"
                        block
                      >
                        <ISelect
                          v-model="knobStates.tabs.type"
                          label="標籤樣式 (Type)"
                          :options="['line', 'card'].map((v) => ({ label: v, value: v }))"
                        />
                      </IStack>
                    </ShowcaseCard>
                  </div>
                </div>
                <ShowcasePropsTable :props-data="componentProps.tabs" />
              </div>
            </template>

            <!-- Card Section -->
            <template v-if="activeUnit.id === 'card'">
              <div class="space-y-12">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  <!-- Studio View -->
                  <div class="lg:col-span-8 space-y-8">
                    <ShowcaseCard title="元件實體預覽 (Live Preview)">
                      <div
                        class="min-h-[320px] flex items-center justify-center bg-slate-50/50 rounded-3xl border border-dashed border-slate-200 p-12"
                      >
                        <ICard
                          v-bind="getKnob('card')"
                          class="max-w-md w-full"
                        >
                          <div class="py-4 space-y-4">
                            <p class="text-sm text-slate-600 leading-relaxed">
                              這是一個高品質的卡片組件實體展示。您可以透過右側控制台調整標題、副標題以及各種風格變體，觀察陰影與邊框的細微變化。
                            </p>
                            <div class="flex items-center gap-2">
                              <IButton
                                label="查看詳情"
                                size="small"
                                variant="ghost"
                              />
                              <IButton
                                label="立即行動"
                                size="small"
                              />
                            </div>
                          </div>
                        </ICard>
                      </div>
                    </ShowcaseCard>

                    <div class="space-y-4">
                      <div class="flex items-center gap-2 px-2">
                        <div class="w-1.5 h-4 bg-indigo-500 rounded-full"></div>
                        <h4 class="text-xs font-black text-slate-500 uppercase tracking-widest">
                          實作代碼 (Code Snippet)
                        </h4>
                      </div>
                      <ShowcaseCodeBlock :code="getSnippet('card')" />
                    </div>
                  </div>

                  <!-- Side Controls -->
                  <div class="lg:col-span-4 space-y-8 lg:sticky lg:top-8">
                    <ShowcaseCard title="屬性控制 (Knobs)">
                      <IStack
                        direction="vertical"
                        gap="large"
                        block
                      >
                        <IInput
                          v-model="knobStates.card.title"
                          label="標題 (Title)"
                        />
                        <IInput
                          v-model="knobStates.card.subtitle"
                          label="副標題 (Subtitle)"
                        />
                        <ISelect
                          v-model="knobStates.card.variant"
                          label="風格 (Variant)"
                          :options="
                            ['default', 'glass', 'elevated', 'flat'].map((v) => ({
                              label: v,
                              value: v
                            }))
                          "
                        />
                        <div class="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                          <ISwitch
                            v-model="knobStates.card.bordered"
                            label="顯示邊框"
                          />
                          <ISwitch
                            v-model="knobStates.card.hoverable"
                            label="懸停效果"
                          />
                        </div>
                      </IStack>
                    </ShowcaseCard>
                  </div>
                </div>
                <ShowcasePropsTable :props-data="componentProps.card" />
              </div>
            </template>

            <!-- Alert Section -->
            <template v-if="activeUnit.id === 'alert'">
              <div class="space-y-12">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  <!-- Studio View -->
                  <div class="lg:col-span-8 space-y-8">
                    <ShowcaseCard title="元件實體預覽 (Live Preview)">
                      <div
                        class="min-h-[240px] flex flex-col justify-center bg-slate-50/50 rounded-3xl border border-dashed border-slate-200 p-12"
                      >
                        <IAlert
                          v-bind="getKnob('alert')"
                          class="max-w-2xl"
                        />
                      </div>
                    </ShowcaseCard>

                    <div class="space-y-4">
                      <div class="flex items-center gap-2 px-2">
                        <div class="w-1.5 h-4 bg-indigo-500 rounded-full"></div>
                        <h4 class="text-xs font-black text-slate-500 uppercase tracking-widest">
                          實作代碼 (Code Snippet)
                        </h4>
                      </div>
                      <ShowcaseCodeBlock :code="getSnippet('alert')" />
                    </div>
                  </div>

                  <!-- Side Controls -->
                  <div class="lg:col-span-4 space-y-8 lg:sticky lg:top-8">
                    <ShowcaseCard title="屬性控制 (Knobs)">
                      <IStack
                        direction="vertical"
                        gap="large"
                        block
                      >
                        <IInput
                          v-model="knobStates.alert.title"
                          label="提示標題 (Title)"
                        />
                        <ITextarea
                          v-model="knobStates.alert.text"
                          label="詳細描述 (Text)"
                          :rows="2"
                        />
                        <div class="grid grid-cols-2 gap-4">
                          <ISelect
                            v-model="knobStates.alert.type"
                            label="類型"
                            :options="
                              ['success', 'info', 'warning', 'error'].map((v) => ({
                                label: v,
                                value: v
                              }))
                            "
                          />
                          <ISelect
                            v-model="knobStates.alert.variant"
                            label="風格"
                            :options="
                              ['flat', 'outlined', 'ghost'].map((v) => ({ label: v, value: v }))
                            "
                          />
                        </div>
                        <div class="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                          <ISwitch
                            v-model="knobStates.alert.closable"
                            label="可關閉"
                          />
                          <ISwitch
                            v-model="knobStates.alert.showIcon"
                            label="顯示圖示"
                          />
                        </div>
                      </IStack>
                    </ShowcaseCard>
                  </div>
                </div>
                <ShowcasePropsTable :props-data="componentProps.alert" />
              </div>
            </template>

            <!-- Avatar Section -->
            <template v-if="activeUnit.id === 'avatar'">
              <div class="space-y-12">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  <!-- Studio View -->
                  <div class="lg:col-span-8 space-y-8">
                    <ShowcaseCard title="元件實體預覽 (Live Preview)">
                      <div
                        class="min-h-[240px] flex items-center justify-center bg-slate-50/50 rounded-3xl border border-dashed border-slate-200 p-12"
                      >
                        <IAvatar
                          v-bind="getKnob('avatar')"
                          class="scale-125"
                        />
                      </div>
                    </ShowcaseCard>

                    <div class="space-y-4">
                      <div class="flex items-center gap-2 px-2">
                        <div class="w-1.5 h-4 bg-indigo-500 rounded-full"></div>
                        <h4 class="text-xs font-black text-slate-500 uppercase tracking-widest">
                          實作代碼 (Code Snippet)
                        </h4>
                      </div>
                      <ShowcaseCodeBlock :code="getSnippet('avatar')" />
                    </div>
                  </div>

                  <!-- Side Controls -->
                  <div class="lg:col-span-4 space-y-8 lg:sticky lg:top-8">
                    <ShowcaseCard title="屬性控制 (Knobs)">
                      <IStack
                        direction="vertical"
                        gap="large"
                        block
                      >
                        <IInput
                          v-model="knobStates.avatar.src"
                          label="圖片連結 (URL)"
                        />
                        <ISelect
                          v-model="knobStates.avatar.size"
                          label="尺寸"
                          :options="
                            ['small', 'default', 'large'].map((v) => ({
                              label: v,
                              value: v
                            }))
                          "
                        />
                        <ISelect
                          v-model="knobStates.avatar.shape"
                          label="形狀"
                          :options="
                            ['circle', 'square'].map((v) => ({
                              label: v,
                              value: v
                            }))
                          "
                        />
                      </IStack>
                    </ShowcaseCard>
                  </div>
                </div>
                <ShowcasePropsTable :props-data="componentProps.avatar" />
              </div>
            </template>

            <!-- Chip Section -->
            <template v-if="activeUnit.id === 'chip'">
              <div class="space-y-12">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  <!-- Studio View -->
                  <div class="lg:col-span-8 space-y-8">
                    <ShowcaseCard title="元件實體預覽 (Live Preview)">
                      <div
                        class="min-h-[240px] flex items-center justify-center bg-slate-50/50 rounded-3xl border border-dashed border-slate-200 p-12"
                      >
                        <IChip
                          v-bind="getKnob('chip')"
                          class="scale-125 transition-all"
                          @close="() => {}"
                        />
                      </div>
                    </ShowcaseCard>

                    <div class="space-y-4">
                      <div class="flex items-center gap-2 px-2">
                        <div class="w-1.5 h-4 bg-indigo-500 rounded-full"></div>
                        <h4 class="text-xs font-black text-slate-500 uppercase tracking-widest">
                          實作代碼 (Code Snippet)
                        </h4>
                      </div>
                      <ShowcaseCodeBlock :code="getSnippet('chip')" />
                    </div>
                  </div>

                  <!-- Side Controls -->
                  <div class="lg:col-span-4 space-y-8 lg:sticky lg:top-8">
                    <ShowcaseCard title="屬性控制 (Knobs)">
                      <IStack
                        direction="vertical"
                        gap="large"
                        block
                      >
                        <IInput
                          v-model="knobStates.chip.label"
                          label="標籤文字"
                        />
                        <div class="grid grid-cols-2 gap-4">
                          <ISelect
                            v-model="knobStates.chip.color"
                            label="顏色"
                            :options="
                              ['primary', 'success', 'warning', 'error', 'info'].map((v) => ({
                                label: v,
                                value: v
                              }))
                            "
                          />
                          <ISelect
                            v-model="knobStates.chip.variant"
                            label="風格"
                            :options="['default', 'outlined'].map((v) => ({ label: v, value: v }))"
                          />
                        </div>
                        <div class="pt-4 border-t border-slate-100">
                          <ISwitch
                            v-model="knobStates.chip.closable"
                            label="可關閉"
                          />
                        </div>
                      </IStack>
                    </ShowcaseCard>
                  </div>
                </div>
                <ShowcasePropsTable :props-data="componentProps.chip" />
              </div>
            </template>

            <!-- Modal Section -->
            <template v-if="activeUnit.id === 'modal'">
              <div class="space-y-12">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  <!-- Studio View -->
                  <div class="lg:col-span-8 space-y-8">
                    <ShowcaseCard title="元件實體預覽 (Live Preview)">
                      <div
                        class="min-h-[240px] flex flex-col items-center justify-center bg-slate-50/50 rounded-3xl border border-dashed border-slate-200 p-12 space-y-6"
                      >
                        <div
                          class="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-indigo-500 scale-125"
                        >
                          <IIcon
                            icon="mdi-window-maximize"
                            size="32"
                          />
                        </div>
                        <IButton
                          label="開啟範例對話框 (Launch Modal)"
                          @click="() => {}"
                        />
                        <p class="text-xs text-slate-500 font-medium">
                          範例展示點擊後開啟對話框的效果
                        </p>
                      </div>
                    </ShowcaseCard>

                    <div class="space-y-4">
                      <div class="flex items-center gap-2 px-2">
                        <div class="w-1.5 h-4 bg-indigo-500 rounded-full"></div>
                        <h4 class="text-xs font-black text-slate-500 uppercase tracking-widest">
                          實作代碼 (Code Snippet)
                        </h4>
                      </div>
                      <ShowcaseCodeBlock :code="getSnippet('modal')" />
                    </div>
                  </div>

                  <!-- Side Controls -->
                  <div class="lg:col-span-4 space-y-8 lg:sticky lg:top-8">
                    <ShowcaseCard title="屬性控制 (Knobs)">
                      <IStack
                        direction="vertical"
                        gap="large"
                        block
                      >
                        <IInput
                          v-model="knobStates.modal.title"
                          label="標題內容"
                        />
                      </IStack>
                    </ShowcaseCard>
                  </div>
                </div>
                <ShowcasePropsTable :props-data="componentProps.modal" />
              </div>
            </template>

            <!-- Loading & Spinner Section -->
            <template v-if="activeUnit.id === 'loading'">
              <div class="space-y-12">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  <!-- Studio View -->
                  <div class="lg:col-span-8 space-y-8">
                    <ShowcaseCard title="元件實體預覽 (Live Preview)">
                      <div
                        class="min-h-[240px] flex flex-col items-center justify-center bg-slate-50/50 rounded-3xl border border-dashed border-slate-200 p-12 space-y-6"
                      >
                        <ILoadingSpinner
                          v-bind="getKnob('loading')"
                          class="scale-150"
                        />
                        <div class="text-slate-500 font-medium animate-pulse">
                          正在處理您的請求...
                        </div>
                      </div>
                    </ShowcaseCard>

                    <div class="space-y-4">
                      <div class="flex items-center gap-2 px-2">
                        <div class="w-1.5 h-4 bg-indigo-500 rounded-full"></div>
                        <h4 class="text-xs font-black text-slate-500 uppercase tracking-widest">
                          實作代碼 (Code Snippet)
                        </h4>
                      </div>
                      <ShowcaseCodeBlock :code="getSnippet('loading')" />
                    </div>
                  </div>

                  <!-- Side Controls -->
                  <div class="lg:col-span-4 space-y-8 lg:sticky lg:top-8">
                    <ShowcaseCard title="屬性控制 (Knobs)">
                      <IStack
                        direction="vertical"
                        gap="large"
                        block
                      >
                        <ISelect
                          v-model="knobStates.loading.size"
                          label="尺寸"
                          :options="
                            ['small', 'default', 'large'].map((v) => ({
                              label: v,
                              value: v
                            }))
                          "
                        />
                      </IStack>
                    </ShowcaseCard>
                  </div>
                </div>
                <ShowcasePropsTable :props-data="componentProps.loading" />
              </div>
            </template>

            <!-- Layout: Stack & Divider Section -->
            <template v-if="['stack', 'divider'].includes(activeUnit.id)">
              <div class="space-y-12">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  <!-- Studio View -->
                  <div class="lg:col-span-8 space-y-8">
                    <ShowcaseCard title="元件實體預覽 (Live Preview)">
                      <div
                        class="min-h-[240px] flex items-center justify-center bg-slate-50/50 rounded-3xl border border-dashed border-slate-200 p-12"
                      >
                        <IStack
                          v-if="activeUnit.id === 'stack'"
                          v-bind="getKnob('stack')"
                        >
                          <div
                            class="w-16 h-16 bg-indigo-100 rounded-xl border-2 border-indigo-200 flex items-center justify-center text-indigo-500 font-bold shadow-sm"
                          >
                            1
                          </div>
                          <div
                            class="w-16 h-16 bg-rose-100 rounded-xl border-2 border-rose-200 flex items-center justify-center text-rose-500 font-bold shadow-sm"
                          >
                            2
                          </div>
                          <div
                            class="w-16 h-16 bg-emerald-100 rounded-xl border-2 border-emerald-200 flex items-center justify-center text-emerald-500 font-bold shadow-sm"
                          >
                            3
                          </div>
                        </IStack>
                        <div
                          v-else-if="activeUnit.id === 'divider'"
                          class="w-full max-w-md bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
                        >
                          <p class="text-slate-500 text-sm mb-4">
                            這是一段測試文本，用於展示分隔線的效果。
                          </p>
                          <IDivider v-bind="getKnob('divider')" />
                          <p class="text-slate-500 text-sm mt-4">
                            這是分隔線下方的另一段測試文本。
                          </p>
                        </div>
                      </div>
                    </ShowcaseCard>

                    <div class="space-y-4">
                      <div class="flex items-center gap-2 px-2">
                        <div class="w-1.5 h-4 bg-indigo-500 rounded-full"></div>
                        <h4 class="text-xs font-black text-slate-500 uppercase tracking-widest">
                          實作代碼 (Code Snippet)
                        </h4>
                      </div>
                      <ShowcaseCodeBlock :code="getSnippet(activeUnit.id)" />
                    </div>
                  </div>

                  <!-- Side Controls -->
                  <div class="lg:col-span-4 space-y-8 lg:sticky lg:top-8">
                    <ShowcaseCard title="屬性控制 (Knobs)">
                      <IStack
                        v-if="activeUnit.id === 'stack'"
                        direction="vertical"
                        gap="large"
                        block
                      >
                        <ISelect
                          v-model="knobStates.stack.direction"
                          label="方向"
                          :options="
                            ['horizontal', 'vertical'].map((v) => ({
                              label: v,
                              value: v
                            }))
                          "
                        />
                        <ISelect
                          v-model="knobStates.stack.gap"
                          label="間距"
                          :options="
                            ['small', 'middle', 'large'].map((v) => ({
                              label: v,
                              value: v
                            }))
                          "
                        />
                        <ICheckbox v-model="knobStates.stack.block">佔滿寬度 (Block)</ICheckbox>
                      </IStack>

                      <IStack
                        v-else-if="activeUnit.id === 'divider'"
                        direction="vertical"
                        gap="large"
                        block
                      >
                        <IInput
                          v-model="knobStates.divider.text"
                          label="文字"
                        />
                        <ISelect
                          v-model="knobStates.divider.textPlacement"
                          label="文字位置"
                          :options="
                            ['left', 'center', 'right'].map((v) => ({
                              label: v,
                              value: v
                            }))
                          "
                        />
                        <ICheckbox v-model="knobStates.divider.dashed">虛線 (Dashed)</ICheckbox>
                      </IStack>
                    </ShowcaseCard>
                  </div>
                </div>
                <ShowcasePropsTable :props-data="componentProps[activeUnit.id]" />
              </div>
            </template>

            <!-- uiBusiness: EmailInput Section -->
            <template v-if="activeUnit.id === 'email-input'">
              <div class="space-y-12">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  <div class="lg:col-span-8 space-y-8">
                    <ShowcaseCard title="元件實體預覽 (Live Preview)">
                      <div
                        class="min-h-[240px] flex items-center justify-center bg-slate-50/50 rounded-3xl border border-dashed border-slate-200 p-12"
                      >
                        <div class="w-full max-w-sm">
                          <EmailInput
                            v-model="inputVal"
                            v-bind="getKnob('email-input')"
                          />
                        </div>
                      </div>
                    </ShowcaseCard>
                    <div class="space-y-4">
                      <div class="flex items-center gap-2 px-2">
                        <div class="w-1.5 h-4 bg-indigo-500 rounded-full"></div>
                        <h4 class="text-xs font-black text-slate-500 uppercase tracking-widest">
                          實作代碼 (Code Snippet)
                        </h4>
                      </div>
                      <ShowcaseCodeBlock :code="getSnippet('email-input')" />
                    </div>
                  </div>
                  <div class="lg:col-span-4 space-y-8 lg:sticky lg:top-8">
                    <ShowcaseCard title="屬性控制 (Knobs)">
                      <IStack
                        direction="vertical"
                        gap="large"
                        block
                      >
                        <IInput
                          v-model="knobStates['email-input'].label"
                          label="標籤 (Label)"
                        />
                        <IInput
                          v-model="knobStates['email-input'].placeholder"
                          label="提示 (Placeholder)"
                        />
                        <ICheckbox v-model="knobStates['email-input'].disabled">
                          禁用 (Disabled)
                        </ICheckbox>
                        <ICheckbox v-model="knobStates['email-input'].readonly">
                          唯讀 (Readonly)
                        </ICheckbox>
                        <ICheckbox v-model="knobStates['email-input'].error">
                          顯示錯誤 (Error)
                        </ICheckbox>
                        <ICheckbox v-model="knobStates['email-input'].defaultRules">
                          內建驗證 (Default Rules)
                        </ICheckbox>
                      </IStack>
                    </ShowcaseCard>
                  </div>
                </div>
                <ShowcasePropsTable :props-data="componentProps['email-input']" />
              </div>
            </template>

            <!-- uiBusiness: PasswordInput Section -->
            <template v-if="activeUnit.id === 'password-input'">
              <div class="space-y-12">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  <div class="lg:col-span-8 space-y-8">
                    <ShowcaseCard title="元件實體預覽 (Live Preview)">
                      <div
                        class="min-h-[240px] flex items-center justify-center bg-slate-50/50 rounded-3xl border border-dashed border-slate-200 p-12"
                      >
                        <div class="w-full max-w-sm">
                          <PasswordInput
                            v-model="inputVal"
                            v-bind="getKnob('password-input')"
                          />
                        </div>
                      </div>
                    </ShowcaseCard>
                    <div class="space-y-4">
                      <div class="flex items-center gap-2 px-2">
                        <div class="w-1.5 h-4 bg-indigo-500 rounded-full"></div>
                        <h4 class="text-xs font-black text-slate-500 uppercase tracking-widest">
                          實作代碼 (Code Snippet)
                        </h4>
                      </div>
                      <ShowcaseCodeBlock :code="getSnippet('password-input')" />
                    </div>
                  </div>
                  <div class="lg:col-span-4 space-y-8 lg:sticky lg:top-8">
                    <ShowcaseCard title="屬性控制 (Knobs)">
                      <IStack
                        direction="vertical"
                        gap="large"
                        block
                      >
                        <IInput
                          v-model="knobStates['password-input'].label"
                          label="標籤 (Label)"
                        />
                        <IInput
                          v-model="knobStates['password-input'].placeholder"
                          label="提示 (Placeholder)"
                        />
                        <ICheckbox v-model="knobStates['password-input'].disabled">
                          禁用 (Disabled)
                        </ICheckbox>
                        <ICheckbox v-model="knobStates['password-input'].readonly">
                          唯讀 (Readonly)
                        </ICheckbox>
                        <ICheckbox v-model="knobStates['password-input'].error">
                          顯示錯誤 (Error)
                        </ICheckbox>
                        <ICheckbox v-model="knobStates['password-input'].showStrength">
                          密碼強度 (Show Strength)
                        </ICheckbox>
                      </IStack>
                    </ShowcaseCard>
                  </div>
                </div>
                <ShowcasePropsTable :props-data="componentProps['password-input']" />
              </div>
            </template>

            <!-- uiBusiness: PhoneInput Section -->
            <template v-if="activeUnit.id === 'phone-input'">
              <div class="space-y-12">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  <div class="lg:col-span-8 space-y-8">
                    <ShowcaseCard title="元件實體預覽 (Live Preview)">
                      <div
                        class="min-h-[240px] flex items-center justify-center bg-slate-50/50 rounded-3xl border border-dashed border-slate-200 p-12"
                      >
                        <div class="w-full max-w-sm">
                          <PhoneInput
                            v-model="inputVal"
                            v-bind="getKnob('phone-input')"
                          />
                        </div>
                      </div>
                    </ShowcaseCard>
                    <div class="space-y-4">
                      <div class="flex items-center gap-2 px-2">
                        <div class="w-1.5 h-4 bg-indigo-500 rounded-full"></div>
                        <h4 class="text-xs font-black text-slate-500 uppercase tracking-widest">
                          實作代碼 (Code Snippet)
                        </h4>
                      </div>
                      <ShowcaseCodeBlock :code="getSnippet('phone-input')" />
                    </div>
                  </div>
                  <div class="lg:col-span-4 space-y-8 lg:sticky lg:top-8">
                    <ShowcaseCard title="屬性控制 (Knobs)">
                      <IStack
                        direction="vertical"
                        gap="large"
                        block
                      >
                        <IInput
                          v-model="knobStates['phone-input'].label"
                          label="標籤 (Label)"
                        />
                        <IInput
                          v-model="knobStates['phone-input'].placeholder"
                          label="提示 (Placeholder)"
                        />
                        <ICheckbox v-model="knobStates['phone-input'].disabled">
                          禁用 (Disabled)
                        </ICheckbox>
                        <ICheckbox v-model="knobStates['phone-input'].readonly">
                          唯讀 (Readonly)
                        </ICheckbox>
                        <ICheckbox v-model="knobStates['phone-input'].error">
                          顯示錯誤 (Error)
                        </ICheckbox>
                      </IStack>
                    </ShowcaseCard>
                  </div>
                </div>
                <ShowcasePropsTable :props-data="componentProps['phone-input']" />
              </div>
            </template>

            <!-- uiBusiness: GenderRadio Section -->
            <template v-if="activeUnit.id === 'gender-radio'">
              <div class="space-y-12">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  <div class="lg:col-span-8 space-y-8">
                    <ShowcaseCard title="元件實體預覽 (Live Preview)">
                      <div
                        class="min-h-[240px] flex items-center justify-center bg-slate-50/50 rounded-3xl border border-dashed border-slate-200 p-12"
                      >
                        <div class="w-full max-w-sm flex justify-center">
                          <GenderRadio
                            v-model="inputVal"
                            v-bind="getKnob('gender-radio')"
                          />
                        </div>
                      </div>
                    </ShowcaseCard>
                    <div class="space-y-4">
                      <div class="flex items-center gap-2 px-2">
                        <div class="w-1.5 h-4 bg-indigo-500 rounded-full"></div>
                        <h4 class="text-xs font-black text-slate-500 uppercase tracking-widest">
                          實作代碼 (Code Snippet)
                        </h4>
                      </div>
                      <ShowcaseCodeBlock :code="getSnippet('gender-radio')" />
                    </div>
                  </div>
                  <div class="lg:col-span-4 space-y-8 lg:sticky lg:top-8">
                    <ShowcaseCard title="屬性控制 (Knobs)">
                      <IStack
                        direction="vertical"
                        gap="large"
                        block
                      >
                        <ICheckbox v-model="knobStates['gender-radio'].disabled">
                          禁用 (Disabled)
                        </ICheckbox>
                        <ICheckbox v-model="knobStates['gender-radio'].readonly">
                          唯讀 (Readonly)
                        </ICheckbox>
                        <ICheckbox v-model="knobStates['gender-radio'].inline">
                          水平排列 (Inline)
                        </ICheckbox>
                      </IStack>
                    </ShowcaseCard>
                  </div>
                </div>
                <ShowcasePropsTable :props-data="componentProps['gender-radio']" />
              </div>
            </template>

            <!-- uiBusiness: DateRangePicker Section -->
            <template v-if="activeUnit.id === 'daterange-picker'">
              <div class="space-y-12">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  <div class="lg:col-span-8 space-y-8">
                    <ShowcaseCard title="元件實體預覽 (Live Preview)">
                      <div
                        class="min-h-[240px] flex items-center justify-center bg-slate-50/50 rounded-3xl border border-dashed border-slate-200 p-12"
                      >
                        <div class="w-full max-w-sm">
                          <DateRangePicker
                            v-model="dateVal"
                            v-bind="getKnob('daterange-picker')"
                          />
                        </div>
                      </div>
                    </ShowcaseCard>
                    <div class="space-y-4">
                      <div class="flex items-center gap-2 px-2">
                        <div class="w-1.5 h-4 bg-indigo-500 rounded-full"></div>
                        <h4 class="text-xs font-black text-slate-500 uppercase tracking-widest">
                          實作代碼 (Code Snippet)
                        </h4>
                      </div>
                      <ShowcaseCodeBlock :code="getSnippet('daterange-picker')" />
                    </div>
                  </div>
                  <div class="lg:col-span-4 space-y-8 lg:sticky lg:top-8">
                    <ShowcaseCard title="屬性控制 (Knobs)">
                      <IStack
                        direction="vertical"
                        gap="large"
                        block
                      >
                        <IInput
                          v-model="knobStates['daterange-picker'].label"
                          label="標籤 (Label)"
                        />
                        <ICheckbox v-model="knobStates['daterange-picker'].required">
                          必填 (Required)
                        </ICheckbox>
                        <ICheckbox v-model="knobStates['daterange-picker'].disabled">
                          禁用 (Disabled)
                        </ICheckbox>
                      </IStack>
                    </ShowcaseCard>
                  </div>
                </div>
                <ShowcasePropsTable :props-data="componentProps['daterange-picker']" />
              </div>
            </template>

            <!-- uiBusiness: CitySelect Section -->
            <template v-if="activeUnit.id === 'city-select'">
              <div class="space-y-12">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  <div class="lg:col-span-8 space-y-8">
                    <ShowcaseCard title="元件實體預覽 (Live Preview)">
                      <div
                        class="min-h-[240px] flex items-center justify-center bg-slate-50/50 rounded-3xl border border-dashed border-slate-200 p-12"
                      >
                        <div class="w-full max-w-sm">
                          <CitySelect
                            v-model="inputVal"
                            v-bind="getKnob('city-select')"
                          />
                        </div>
                      </div>
                    </ShowcaseCard>
                    <div class="space-y-4">
                      <div class="flex items-center gap-2 px-2">
                        <div class="w-1.5 h-4 bg-indigo-500 rounded-full"></div>
                        <h4 class="text-xs font-black text-slate-500 uppercase tracking-widest">
                          實作代碼 (Code Snippet)
                        </h4>
                      </div>
                      <ShowcaseCodeBlock :code="getSnippet('city-select')" />
                    </div>
                  </div>
                  <div class="lg:col-span-4 space-y-8 lg:sticky lg:top-8">
                    <ShowcaseCard title="屬性控制 (Knobs)">
                      <IStack
                        direction="vertical"
                        gap="large"
                        block
                      >
                        <ICheckbox v-model="knobStates['city-select'].disabled">
                          禁用 (Disabled)
                        </ICheckbox>
                        <ICheckbox v-model="knobStates['city-select'].readonly">
                          唯讀 (Readonly)
                        </ICheckbox>
                      </IStack>
                    </ShowcaseCard>
                  </div>
                </div>
                <ShowcasePropsTable :props-data="componentProps['city-select']" />
              </div>
            </template>

            <!-- Placeholder for other units -->
            <template
              v-else-if="
                ![
                  'button',
                  'textfield',
                  'textarea',
                  'select',
                  'checkbox',
                  'radio',
                  'switch',
                  'datepicker',
                  'datatable',
                  'tabs',
                  'card',
                  'alert',
                  'avatar',
                  'chip',
                  'modal',
                  'loading',
                  'stack',
                  'divider'
                ].includes(activeUnit.id)
              "
            >
              <div
                class="p-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 text-center"
              >
                <IIcon
                  :icon="activeUnit.icon"
                  size="48"
                  class="text-slate-300 mb-4"
                />
                <h3 class="text-xl font-bold text-slate-400">目前元件頁面開發中...</h3>
                <p class="text-slate-400 mt-2">我們正在為 {{ activeUnit.title }} 準備專屬範例</p>
              </div>
            </template>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.animate-fadeIn {
  animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.custom-scrollbar {
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 10px;
  }
}

:deep(.ant-space) {
  display: flex !important;
}
</style>
