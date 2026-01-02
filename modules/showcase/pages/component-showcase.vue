<script setup lang="ts">
/**
 * 元件架構展示頁面
 *
 * 展示三層架構：
 * 1. uiInterface 層（UI 框架適配層）
 * 2. uiBusiness 層（業務邏輯層）
 * 3. 頁面層（直接使用業務元件）
 */

import { ref } from 'vue'
import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseArchitecture from '../components/ShowcaseArchitecture.vue'
import ShowcaseAlert from '../components/ShowcaseAlert.vue'
import ShowcaseTabs from '../components/ShowcaseTabs.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'

// 引入所有業務元件
import EmailInput from '@/components/uiBusiness/EmailInput.vue'
import PhoneInput from '@/components/uiBusiness/PhoneInput.vue'
import PasswordInput from '@/components/uiBusiness/PasswordInput.vue'
import CitySelect from '@/components/uiBusiness/CitySelect.vue'
import CountrySelect from '@/components/uiBusiness/CountrySelect.vue'
import GenderRadio from '@/components/uiBusiness/GenderRadio.vue'
import DateRangePicker from '@/components/uiBusiness/DateRangePicker.vue'
import SmartCard from '@/components/uiBusiness/SmartCard.vue'
import SmartTable from '@/components/uiBusiness/SmartTable.vue'
import SmartComplexWidget from '@/components/uiBusiness/SmartComplexWidget.vue'
import ApiLoadingButton from '@/components/uiBusiness/ApiLoadingButton.vue'
import GlobalLoading from '@/components/uiBusiness/GlobalLoading.vue'
import GlobalSnackbar from '@/components/uiBusiness/GlobalSnackbar.vue'
import OptionSelect from '@/components/uiBusiness/OptionSelect.vue'

// 引入所有介面元件
import IInput from '@/components/uiInterface/IInput.vue'
import IButton from '@/components/uiInterface/IButton.vue'
import ICheckbox from '@/components/uiInterface/ICheckbox.vue'
import IRadio from '@/components/uiInterface/IRadio.vue'
import ITextarea from '@/components/uiInterface/ITextarea.vue'
import ISwitch from '@/components/uiInterface/ISwitch.vue'
import IDatePicker from '@/components/uiInterface/IDatePicker.vue'
import ISelect from '@/components/uiInterface/ISelect.vue'
import ICard from '@/components/uiInterface/ICard.vue'
import IChip from '@/components/uiInterface/IChip.vue'
import ITextField from '@/components/uiInterface/ITextField.vue'
import IDataTable from '@/components/uiInterface/IDataTable.vue'

definePageMeta({
  title: '基礎元件展示',
  icon: 'mdi-cube-outline',
  layout: 'portal'
})

// 業務元件示範資料
const email = ref('')
const corporateEmail = ref('')
const personalEmail = ref('')
const phone = ref('')
const password = ref('')
const gender = ref('')
const job = ref('')
const interest = ref('')
const city = ref('')
const country = ref('')
const dateRange = ref({ start: null, end: null })

// SmartTable 範例資料
const smartTableColumns = [
  { label: '姓名', field: 'name', sortable: true },
  { label: '角色', field: 'role', type: 'tag' as const },
  { label: '部門', field: 'dept' }
]

const smartTableData = [
  { name: '陳曉明', role: '管理員', dept: '技術部' },
  { name: '林美華', role: '編輯者', dept: '行銷部' },
  { name: '王大衛', role: '檢視者', dept: '客服部' }
]

// 全域元件測試
const { show: showToast } = useNotify()
const { start: startLoading, finish: finishLoading } = useLoading()

const testGlobalLoading = () => {
  startLoading()
  setTimeout(() => {
    finishLoading()
  }, 2000)
}

const testGlobalSnackbar = () => {
  showToast('這是一則全域通知訊息！', 'success')
}

// 介面元件示範資料
const inputValue = ref('')
const textareaValue = ref('')
const checkboxValue = ref(false)
const checkboxArray = ref([])
const radioValue = ref('')
const switchValue = ref(false)
const dateValue = ref(null)
const selectValue = ref('')
const textFieldValue = ref('')

const sampleOptions = [
  { value: 'option1', label: '選項 1' },
  { value: 'option2', label: '選項 2' },
  { value: 'option3', label: '選項 3' }
]

const tableColumns = [
  { key: 'name', label: '姓名', sortable: true },
  { key: 'role', label: '角色', sortable: true },
  { key: 'status', label: '狀態', sortable: false }
]

const tableData = [
  { name: '張三', role: 'Admin', status: '啟用' },
  { name: '李四', role: 'Editor', status: '啟用' },
  { name: '王五', role: 'Viewer', status: '停用' }
]

// Tab 狀態管理
const activeTab = ref('migration') // architecture, business, interface
const tabOptions = [
  { label: '架構與框架替換', value: 'migration' },
  { label: '開發原則', value: 'principles' },
  { label: '業務邏輯層展示', value: 'business' },
  { label: '介面層展示', value: 'interface' }
]
</script>

<template>
  <ShowcasePage
    title="元件展示"
    description="本專案採用「三層式前端架構」，將業務邏輯與 UI 實作完全分離。當需要更換 UI 框架（如從 Vuetify 換到 Element Plus）時，僅需替換最底層的介面元件，完全不影響業務邏輯與頁面結構。"
  >
    <!-- Tab 導航 -->
    <ShowcaseTabs
      v-model="activeTab"
      :options="tabOptions"
      class="mb-8"
    />

    <!-- 架構說明 -->
    <ShowcaseSection
      v-show="activeTab === 'migration'"
      title="架構與框架替換展示"
    >
      <ShowcaseArchitecture />

      <ShowcaseAlert
        title="核心優勢"
        type="info"
        class="mt-6"
      >
        <ul class="benefit-list">
          <li>
            <strong class="text-sky-400">無痛框架替換</strong>
            - 抽換 UI 框架 (如 Vuetify 換 Element) 完全不動業務邏輯，輕鬆適應不同專案風格
          </li>
          <li>
            <strong class="text-sky-400">跨專案共用</strong>
            - 核心業務組件可直接複製到新專案，僅需替換 UI 層即可運作
          </li>
          <li>
            <strong class="text-sky-400">開發極速</strong>
            - 頁面程式碼極簡，無需重複撰寫驗證與處理邏輯
          </li>
        </ul>
      </ShowcaseAlert>

      <!-- 實戰範例 -->
      <div class="mt-12 pt-8 border-t border-slate-700/50">
        <h3 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
          範例：如何實作「會員狀態標籤」？
        </h3>

        <div class="example-container">
          <!-- Top Row: Code Flow (Horizontal) -->
          <div class="code-flow">
            <!-- Step 1: Page Layer -->
            <div class="example-card">
              <div class="layer-badge page">頁面層</div>
              <p class="role-desc">
                「不管顏色或邏輯，
                <br />
                直接把資料丟進去就好。」
              </p>
              <ShowcaseCodeBlock
                language="vue"
                code='<!-- UserList.vue -->
<script setup lang="ts">
// 乾淨的頁面，沒有複雜邏輯
const users = ref([
  { name: "John", status: "active" },
  { name: "Bob", status: "inactive" }
])
</script>

<template>
  <div v-for="user in users" :key="user.name">
    <span>{{ user.name }}</span>
    <!-- 只要傳入 status，其他交給業務層 -->
    <UserStatusChip :status="user.status" />
  </div>
</template>'
                :show-copy="false"
              />
            </div>

            <!-- Arrow Right -->
            <div class="flow-arrow horizontal">
              <v-icon
                icon="mdi-arrow-right"
                size="32"
                color="rgba(255,255,255,0.2)"
              />
              <span class="text-xs text-slate-500 mt-1">使用</span>
            </div>

            <!-- Step 2: Business Layer -->
            <div class="example-card featured">
              <div class="layer-badge business">業務邏輯層</div>
              <p class="role-desc">
                「我負責判斷
                <span class="text-green-400">啟用=綠色</span>
                <br />
                要把邏輯封裝在這裡。」
              </p>
              <ShowcaseCodeBlock
                language="vue"
                code='<!-- UserStatusChip.vue -->
<script setup lang="ts">
// 1. 定義明確的介面
interface Props {
  status: "active" | "inactive" | "banned"
}
const props = defineProps<Props>()

// 2. 集中管理業務邏輯 (狀態 -> 顏色/文字)
const color = computed(() => {
  switch (props.status) {
    case "active": return "success"
    case "inactive": return "grey"
    case "banned": return "error"
  }
})

const label = computed(() => {
  // 可以整合 i18n
  return props.status === "active" ? "啟用" : "停用"
})
</script>

<template>
  <!-- 3. 將處理好的資料傳給 UI -->
  <IChip :label="label" :color="color" />
</template>'
                :show-copy="false"
              />
            </div>

            <!-- Arrow Right -->
            <div class="flow-arrow horizontal">
              <v-icon
                icon="mdi-arrow-right"
                size="32"
                color="rgba(255,255,255,0.2)"
              />
              <span class="text-xs text-slate-500 mt-1">渲染</span>
            </div>

            <!-- Step 3: Interface Layer -->
            <div class="example-card">
              <div class="layer-badge interface">介面層</div>
              <p class="role-desc">
                「我只管畫出顏色，
                <br />
                不知道什麼是會員。」
              </p>
              <ShowcaseCodeBlock
                language="vue"
                code='<!-- IChip.vue -->
<script setup lang="ts">
// 純粹的 UI 定義，不包含業務邏輯
defineProps<{
  label?: string
  color: "success" | "error" | "grey"
}>()
</script>

<template>
  <!-- [方案 A] 原生 CSS 實作 -->
  <div class="chip" :class="`bg-${color}-500`">
    <!-- 支援 Slot，讓內容更彈性 -->
    <slot>{{ label }}</slot>
  </div>

  <!-- [Option B] 想換成 Vuetify? 直接替換 Template 即可！ -->
  <!--
  <v-chip :color="color">
    <slot>{{ label }}</slot>
  </v-chip>
  -->
</template>'
                :show-copy="false"
              />
            </div>
          </div>

          <!-- Result Flow (Vertical) -->
          <div class="result-flow">
            <div class="flow-arrow vertical">
              <v-icon
                icon="mdi-arrow-down"
                size="32"
                color="rgba(255,255,255,0.2)"
              />
              <span class="text-xs text-slate-500 mt-1">輸出</span>
            </div>

            <!-- Final Result (Visual) -->
            <div class="example-card result-card">
              <div class="layer-badge result">最終畫面</div>
              <p class="role-desc">
                「使用者看到的樣子。
                <br />
                漂亮的 UI 與正確的狀態。」
              </p>

              <div class="browser-mockup">
                <div class="mockup-header">
                  <div class="dot red"></div>
                  <div class="dot yellow"></div>
                  <div class="dot green"></div>
                </div>
                <div class="mockup-content">
                  <!-- John: Active -->
                  <div class="flex items-center justify-between p-2 border-b border-slate-700/50">
                    <span class="text-slate-300">John</span>
                    <div
                      class="px-3 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30"
                    >
                      啟用
                    </div>
                  </div>
                  <!-- Bob: Inactive -->
                  <div class="flex items-center justify-between p-2">
                    <span class="text-slate-300">Bob</span>
                    <div
                      class="px-3 py-1 rounded-full text-xs font-bold bg-slate-500/20 text-slate-400 border border-slate-500/30"
                    >
                      停用
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-4 text-xs text-slate-400 text-center">(實際瀏覽器算繪結果)</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Example 2: Slot Penetration -->
      <div class="mt-12 pt-8 border-t border-slate-700/50">
        <h3 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
          範例：Slot 內容穿透 (Card 元件)
        </h3>

        <div class="example-container">
          <!-- Top Row: Code Flow -->
          <div class="code-flow">
            <!-- Step 1: Page Layer -->
            <div class="example-card">
              <div class="layer-badge page">頁面層</div>
              <p class="role-desc">
                「我要在卡片裡放按鈕，
                <br />
                內容由我決定！」
              </p>
              <ShowcaseCodeBlock
                language="vue"
                code='<!-- UserDetail.vue -->
<template>
  <!-- 直接傳入 Slot 內容 -->
  <UserCard title="個人資料">
    <div class="actions">
      <button>編輯</button>
      <button>刪除</button>
    </div>
  </UserCard>
</template>'
                :show-copy="false"
              />
            </div>

            <div class="flow-arrow horizontal">
              <v-icon
                icon="mdi-arrow-right"
                size="32"
                color="rgba(255,255,255,0.2)"
              />
              <span class="text-xs text-slate-500 mt-1">傳入</span>
            </div>

            <!-- Step 2: Business Layer -->
            <div class="example-card featured">
              <div class="layer-badge business">業務邏輯層</div>
              <p class="role-desc">
                「我不關心內容是什麼，
                <br />
                只負責幫忙傳給 UI。」
              </p>
              <ShowcaseCodeBlock
                language="vue"
                code='<!-- UserCard.vue -->
<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <ICard :title="title">
    <!-- 接收頁面內容，轉傳給介面層 -->
    <slot />
  </ICard>
</template>'
                :show-copy="false"
              />
            </div>

            <div class="flow-arrow horizontal">
              <v-icon
                icon="mdi-arrow-right"
                size="32"
                color="rgba(255,255,255,0.2)"
              />
              <span class="text-xs text-slate-500 mt-1">透傳</span>
            </div>

            <!-- Step 3: Interface Layer -->
            <div class="example-card">
              <div class="layer-badge interface">介面層</div>
              <p class="role-desc">
                「我準備好位置 (Slot)，
                <br />
                你們塞什麼我就畫什麼。」
              </p>
              <ShowcaseCodeBlock
                language="vue"
                code='<!-- ICard.vue -->
<template>
  <div class="card-root">
    <div class="card-header">{{ title }}</div>
    <div class="card-body">
      <!-- 內容最終會出現在這 -->
      <slot />
    </div>
  </div>
</template>'
                :show-copy="false"
              />
            </div>
          </div>

          <!-- Result Flow -->
          <div class="result-flow">
            <div class="flow-arrow vertical">
              <v-icon
                icon="mdi-arrow-down"
                size="32"
                color="rgba(255,255,255,0.2)"
              />
              <span class="text-xs text-slate-500 mt-1">組合</span>
            </div>

            <div class="example-card result-card">
              <div class="layer-badge result">最終畫面</div>
              <p class="role-desc">
                「標題來自屬性，
                <br />
                按鈕來自 Slot。」
              </p>

              <div class="browser-mockup">
                <div class="mockup-header">
                  <div class="dot red"></div>
                  <div class="dot yellow"></div>
                  <div class="dot green"></div>
                </div>
                <div class="mockup-content p-4">
                  <div class="bg-slate-800 rounded border border-slate-700 p-4">
                    <div class="text-lg font-bold text-white mb-2">個人資料</div>
                    <div class="flex gap-2">
                      <button class="px-3 py-1 bg-blue-600 text-white text-xs rounded">編輯</button>
                      <button class="px-3 py-1 bg-red-600 text-white text-xs rounded">刪除</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-12 pt-8 border-t border-slate-700/50">
        <div class="section-header mt-16 mb-8">
          <h2 class="section-title">
            <span class="title-text">如何替換 UI 框架？</span>
          </h2>
          <div class="title-decoration"></div>
        </div>

        <div class="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-200">
          <div class="flex items-start gap-3">
            <v-icon
              icon="mdi-information-outline"
              class="mt-1"
            />
            <div>
              <h4 class="font-bold mb-1">為什麼這很重要？</h4>
              <p class="text-sm opacity-90">
                一般專案如果想換掉 UI 框架，你得一個一個頁面慢慢改，改到懷疑人生。
                但在這個架構下，你只需要修改
                <strong>12 個設定檔</strong>
                ，全站幾百個頁面就會瞬間自動換新！
              </p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Native Implementation -->
          <div class="border border-slate-700 rounded-lg overflow-hidden">
            <div
              class="bg-slate-800 p-3 border-b border-slate-700 flex justify-between items-center"
            >
              <span class="font-bold text-green-400">方案 A：原生 CSS (目前)</span>
              <span class="text-xs bg-slate-700 px-2 py-1 rounded">IButton.vue</span>
            </div>
            <div class="p-4 bg-slate-900 h-full">
              <ShowcaseCodeBlock
                language="vue"
                code='<template>
  <!-- 使用標準 HTML button -->
  <button
    class="btn"
    :class="`btn-${variant}`"
    @click="$emit(&apos;click&apos;)"
  >
    <!-- Slot 讓文字/Icon 可以傳入 -->
    <slot />
  </button>
</template>

<style scoped>
.btn {
  padding: 8px 16px;
  border-radius: 4px;
  /* ... 手刻樣式 ... */
}
</style>'
                :show-copy="false"
              />
            </div>
          </div>

          <!-- Vuetify Implementation -->
          <div class="border border-slate-700 rounded-lg overflow-hidden">
            <div
              class="bg-slate-800 p-3 border-b border-slate-700 flex justify-between items-center"
            >
              <span class="font-bold text-pink-400">方案 B：Vuetify (替換後)</span>
              <span class="text-xs bg-slate-700 px-2 py-1 rounded">IButton.vue</span>
            </div>
            <div class="p-4 bg-slate-900 h-full">
              <ShowcaseCodeBlock
                language="vue"
                code='<template>
  <!-- 直接改用 Vuetify 元件 -->
  <v-btn
    :color="variant"
    variant="elevated"
    @click="$emit(&apos;click&apos;)"
  >
    <!-- 結構完全對應，外層無感 -->
    <slot />
  </v-btn>
</template>

<!-- 樣式直接委託給 Vuetify -->
<!-- 不再需要手寫 CSS --> '
                :show-copy="false"
              />
            </div>
          </div>
        </div>

        <div class="mt-8 text-center">
          <v-icon
            icon="mdi-arrow-down"
            size="large"
            color="white"
            class="animate-bounce"
          />
          <p class="text-xl font-bold text-white mt-4">
            「發現了嗎？不管選方案 A 還是 B，
            <br />
            <span class="text-amber-400">外面的 Page Layer 完全不用改 code！</span>
            」
          </p>
        </div>

        <!-- Migration Steps Guide -->
        <div class="mt-12 pt-8 border-t border-slate-700/50">
          <h3 class="text-xl font-bold text-white mb-6">實作步驟：真的只要 3 步</h3>
          <div class="migration-guide">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>只需修改 介面層</h3>
                <p>
                  打開任一 介面層 元件，例如
                  <code>IInput.vue</code>
                </p>
              </div>
            </div>

            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>替換內部實作</h3>
                <ShowcaseCodeBlock
                  code='<!-- 範例：將原生 input 替換為 Vuetify -->
<template>
  <VTextField v-model="value" v-bind="$attrs" />
</template>'
                  label="IInput.vue"
                  language="vue"
                />
              </div>
            </div>

            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>完成！</h3>
                <ShowcaseAlert
                  type="success"
                  style="margin-top: 1rem"
                >
                  所有頁面自動使用新的 UI 框架，業務邏輯完全不用改！
                </ShowcaseAlert>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ShowcaseSection>

    <!-- 開發原則展示 -->
    <ShowcaseSection
      v-show="activeTab === 'principles'"
      title="開發原則與心法"
    >
      <p class="section-desc">
        關於如何在介面層 (Interface Layer) 與不同 UI 框架之間取得平衡的核心觀念。
      </p>

      <div class="flex flex-col gap-12">
        <!-- 原則 1: 介面層 Props 設計 -->
        <ShowcaseCard
          title="1. 介面層 Props 怎麼定？"
          description="核心概念：只管長相，不管身分"
        >
          <div class="text-sm text-slate-300 leading-relaxed my-10">
            介面層元件要夠
            <strong>「笨」</strong>
            ，它只負責畫畫面，完全不知道業務邏輯。
            <br />
            <strong>口訣：</strong>
            如果屬性叫 `isVip` 就錯了！因為介面層不該知道什麼是 VIP，它只知道 `borderColor="gold"`。
          </div>

          <div class="grid grid-cols-2 gap-4">
            <!-- 錯誤示範 -->
            <div class="bg-red-900/20 border border-red-500/30 rounded p-4 mb-4">
              <div class="flex items-center gap-2 text-red-400 font-bold mb-2">
                <v-icon icon="mdi-close-circle" />
                錯誤 (跟業務綁死)
              </div>
              <ShowcaseCodeBlock
                language="typescript"
                code="// IAvatar.vue
interface Props {
  isVip: boolean // ❌ 介面層不用知道是不是 VIP
  role: string   // ❌ 業務邏輯滲透
}"
                :show-copy="false"
              />
            </div>

            <!-- 正確示範 -->
            <div class="bg-green-900/20 border border-green-500/30 rounded p-4">
              <div class="flex items-center gap-2 text-green-400 font-bold mb-2">
                <v-icon icon="mdi-check-circle" />
                正確 (只管外觀)
              </div>
              <ShowcaseCodeBlock
                language="typescript"
                code="// IAvatar.vue
interface Props {
  borderColor: string // ✅ 讓業務層決定傳什麼顏色
  badgeStatus: string // ✅ 通用的狀態燈
}"
                :show-copy="false"
              />
            </div>
          </div>
        </ShowcaseCard>

        <!-- 原則 2: 跨框架介接策略 -->
        <ShowcaseCard
          title="2. 怎麼讓底層框架「聽懂」我們的標準？"
          description="核心概念：講我們的話 + 內部偷翻譯"
        >
          <div class="text-sm text-slate-300 leading-relaxed my-10">
            不要被框架牽著鼻子走。我們定義一套自己的
            <strong>「標準」</strong>
            ，然後在元件肚子裡
            <strong>「偷偷翻譯」</strong>
            給底層框架聽。
            <br />
            這樣以後換框架，只要改這裡的翻譯邏輯，外面幾百個頁面完全不用動！
          </div>

          <div class="bg-slate-800 rounded-lg p-4 mb-4">
            <div class="text-xs text-slate-400 mb-2 font-mono">
              components/uiInterface/IButton.vue
            </div>
            <ShowcaseCodeBlock
              language="vue"
              code='<script setup>
// 1. 定義我們自己的標準 (對外只支援這三種)
const props = defineProps({
  size: "small" | "medium" | "large"
})

// 2. 內部翻譯機 (Mapping)
const frameworkSize = computed(() => {
  // 建立翻譯對照表
  const map = {
    "small": "x-small",   // 我們叫 small，Vuetify 覺得這叫 x-small
    "medium": "default",  // 我們叫 medium，Vuetify 叫 default
    "large": "large"      // 我們叫 large，剛好他也叫 large
  }
  // 查表翻譯
  return map[props.size] || "default"
})
</script>

<template>
  <v-btn :size="frameworkSize">
    <slot />
  </v-btn>
</template>'
              :show-copy="false"
            />
          </div>
        </ShowcaseCard>

        <!-- 原則 3: 功能對等與取捨 -->
        <ShowcaseCard
          title="3. 每個框架功能都不一樣怎麼辦？"
          description="核心概念：太花俏的不要，為了以後好搬家"
        >
          <div class="text-sm text-slate-300 leading-relaxed my-10">
            我們只做「大家都有」的
            <strong>『最大公約數』</strong>
            。
            <br />
            那些只有某個框架才有的
            <strong>『獨門絕技』</strong>
            (例如超炫水波紋)，雖然很帥，但用了你就被框架綁架了。 為了以後想搬家時可以
            <strong>「說走就走」</strong>
            ，這些花俏功能我們
            <strong>一律不碰</strong>
            。
          </div>

          <ShowcaseAlert type="warning">
            <template #title>
              <div class="font-bold flex items-center gap-2">
                <v-icon icon="mdi-alert" />
                給團隊的決策 SOP
              </div>
            </template>
            <ul class="list-disc list-inside text-sm mt-2 space-y-1 text-slate-200">
              <li>
                如果是
                <strong>純裝飾</strong>
                (如水波紋) ➔ 忽略它 (有就有，沒有就算了)。
              </li>
              <li>
                如果是
                <strong>一定要有的</strong>
                (如 Loading) ➔ 一定要做 (框架沒有就自己用 CSS 補)。
              </li>
              <li>
                如果是
                <strong>太複雜的功能</strong>
                (如複雜表格排版) ➔ 不要塞進通用元件，另外寫個專用的。
              </li>
            </ul>
          </ShowcaseAlert>
        </ShowcaseCard>

        <!-- 原則 4: 那剩下 80% 的屬性跟事件怎麼辦？ -->
        <ShowcaseCard
          title="4. 那剩下 80% 的屬性跟事件怎麼辦？"
          description="核心概念：別忙了，讓它自己過"
        >
          <div class="text-sm text-slate-300 leading-relaxed my-10">
            我們只定義 20% 最常用的屬性 (Core Props)。剩下的 80% (如 `aria-label`, `data-test`,
            `@mouseover`, `&lt;v-btn&gt;` 獨有的 `elevation`)， 我們使用 Vue 的
            <code>$attrs</code>
            讓它自己
            <strong>「穿透」</strong>
            過去。
            <br />
            這樣既保持介面乾淨，又保留了底層框架的靈活性。
          </div>

          <div class="bg-slate-800 rounded-lg p-4">
            <ShowcaseCodeBlock
              language="vue"
              code='<!-- IButton.vue -->
<template>
  <!-- 
    v-bind="$attrs" 就像開了一扇任意門
    外層傳進來的所有未知屬性和事件 (@click, @hover)，
    都會自動穿過這扇門，貼到底層元件上。
  -->
  <v-btn v-bind="$attrs">
    <slot />
  </v-btn>
</template>'
              :show-copy="false"
            />
          </div>
        </ShowcaseCard>

        <!-- 原則 5: 介面層膨脹限制 -->
        <ShowcaseCard
          title="5. 介面層會一直膨脹嗎？"
          description="核心概念：有門禁卡的，不是什麼都能進"
        >
          <div class="text-sm text-slate-300 leading-relaxed my-10">
            介面層會隨時間
            <strong>「橫向長大」</strong>
            (變更多樣式)，但絕對不能
            <strong>「縱向長大」</strong>
            (變複雜)。我們有嚴格的門禁：
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="bg-green-900/20 border border-green-500/30 rounded p-4">
              <div class="flex items-center gap-2 text-green-400 font-bold mb-2">
                <v-icon icon="mdi-check-circle" />
                歡迎光臨 (准入標準)
              </div>
              <ul class="list-disc list-inside text-sm text-slate-300 space-y-1">
                <li>
                  <strong>全站標準 (Must Have)</strong>
                  ：設計師下令「全站按鈕都要有毛玻璃效果」，這種就可以進來。
                </li>
                <li>
                  <strong>懶人共識 (High Frequency)</strong>
                  ：發現工程師 80% 的時間都在手寫
                  <code>elevation="0"</code>
                  ，那就乾脆做成
                  <code>flat</code>
                  屬性，讓大家早點下班。
                </li>
              </ul>
            </div>

            <div class="bg-red-900/20 border border-red-500/30 rounded p-4">
              <div class="flex items-center gap-2 text-red-400 font-bold mb-2">
                <v-icon icon="mdi-cancel" />
                禁止進入 (滾去業務層)
              </div>
              <ul class="list-disc list-inside text-sm text-slate-300 space-y-1">
                <li>
                  <strong>業務資料</strong>
                  ：看到
                  <code>userId</code>
                  ,
                  <code>orderStatus</code>
                  這種變數與屬性，請立刻踢出去。
                </li>
                <li>
                  <strong>一次性特效</strong>
                  ：只在「雙11活動頁」出現一次的煙火，為了它改全域元件不划算。
                </li>
                <li>
                  <strong>API 邏輯</strong>
                  ：在介面層裡面寫
                  <code>fetchData</code>
                  是死罪。
                </li>
              </ul>
            </div>
          </div>

          <ShowcaseAlert
            type="success"
            class="mt-4"
          >
            結論：介面層永遠都要保持
            <strong>「無腦」</strong>
            ，它只是化妝師，把你畫漂亮就好，管你是要去相親還是面試。
          </ShowcaseAlert>
        </ShowcaseCard>

        <!-- 原則 6: 翻譯官 (Event Translation) -->
        <ShowcaseCard
          title="6. 如果底層框架事件名稱很奇怪？"
          description="核心概念：介面層就是翻譯官"
        >
          <div class="text-sm text-slate-300 leading-relaxed my-10">
            如果底層框架不講武德，不叫 `blur` 偏偏要叫 `lost-focus` 怎麼辦？
            <br />
            <strong>千萬不要</strong>
            去改你的業務邏輯！請在介面層 (UI Interface) 裡把它
            <strong>「翻譯」</strong>
            成標準的 HTML 事件。
          </div>

          <div class="grid grid-cols-2 gap-4">
            <!-- 業務層 -->
            <div class="bg-slate-800 rounded p-4 border border-slate-700">
              <div class="text-xs text-slate-400 mb-2 font-mono">Business Layer (老闆)</div>
              <div class="text-sm text-white mb-2">「我只會講標準英語 `blur`，其他我不管。」</div>
              <ShowcaseCodeBlock
                language="vue"
                code='<IInput @blur="validate" />'
                :show-copy="false"
              />
            </div>

            <!-- 介面層 -->
            <div class="bg-indigo-900/20 rounded p-4 border border-indigo-500/30">
              <div class="text-xs text-indigo-300 mb-2 font-mono">Interface Layer (翻譯官)</div>
              <div class="text-sm text-white mb-2">「沒問題，我來幫你轉接！」</div>
              <ShowcaseCodeBlock
                language="vue"
                code='<template>
  <!-- 遇到怪框架，手動接起來轉發 -->
  <WeirdInput 
    @lost-focus="emit("blur", $event)" 
  />
</template>'
                :show-copy="false"
              />
            </div>
          </div>
        </ShowcaseCard>

        <!-- 原則 7: 邏輯元件怎麼設計？ -->
        <ShowcaseCard
          title="7. 邏輯元件怎麼設計？(Disabled 為例)"
          description="核心概念：資料整包丟進去，邏輯關門自己算"
        >
          <div class="text-sm text-slate-300 leading-relaxed my-10">
            不要讓頁面層 (Page) 去煩惱「餘額不足要不要鎖按鈕」。
            <br />
            <strong>錯誤寫法：</strong>
            頁面層寫了一堆 `if (money &lt; 0 || isFrozen)`，又髒又難維護。
            <br />
            <strong>正確寫法：</strong>
            直接把整包 `User` 資料丟給元件，讓元件自己算出 `disabled` 狀態。
          </div>

          <div class="grid grid-cols-2 gap-4">
            <!-- 錯誤示範 -->
            <div class="bg-red-900/20 border border-red-500/30 rounded p-4 mb-4">
              <div class="flex items-center gap-2 text-red-400 font-bold mb-2">
                <v-icon icon="mdi-close-circle" />
                錯誤 (頁面邏輯管太多)
              </div>
              <ShowcaseCodeBlock
                language="html"
                code='<!-- Page.vue -->
<PayButton 
  :disabled="user.money <= 0 || user.isFrozen" 
/>'
                :show-copy="false"
              />
            </div>

            <!-- 正確示範 -->
            <div class="bg-green-900/20 border border-green-500/30 rounded p-4">
              <div class="flex items-center gap-2 text-green-400 font-bold mb-2">
                <v-icon icon="mdi-check-circle" />
                正確 (元件自己算)
              </div>
              <ShowcaseCodeBlock
                language="html"
                code='<!-- Page.vue -->
<PayButton :user="user" />'
                :show-copy="false"
              />
            </div>
          </div>

          <!-- override -->
          <div class="mt-6 bg-slate-800 rounded p-4 border border-slate-700">
            <div class="flex items-center gap-2 text-sky-400 font-bold mb-2">
              <v-icon icon="mdi-lightbulb-on" />
              進階技巧：預留後路 (Override Pattern)
            </div>
            <div class="text-sm text-slate-300 mb-2">
              <strong>緊急狀況專用：</strong>
              <br />
              有時候頁面就是想強制介入 (例如整頁卡住 Loading 時)，我們留一個
              <code>disabled</code>
              開孔，讓外部可以強制覆蓋 (Override) 內部邏輯。
            </div>
            <ShowcaseCodeBlock
              language="javascript"
              code='// PayButton.vue (業務層)
const props = defineProps(["user", "disabled"])

// 1. 內部邏輯：沒錢就鎖
const isNoMoney = computed(() => props.user.money <= 0)

// 2. 最終結果：(內部沒錢) OR (外部強制鎖)
const finalDisabled = computed(() => isNoMoney.value || props.disabled)'
              :show-copy="false"
            />
          </div>

          <!-- Q: API 欄位改名怎麼辦？ -->
          <ShowcaseAlert
            type="warning"
            class="mt-6"
          >
            <template #title>
              <div class="font-bold flex items-center gap-2">
                <v-icon icon="mdi-help-circle" />
                Q: 萬一 API 欄位從 `disabled` 改成 `disableds` 怎麼辦？
              </div>
            </template>
            <div class="text-sm text-slate-200 mt-2">
              <strong>A: 請在門口 (API 層) 就把它擋下來！</strong>
              <br />
              元件不該配合髒資料。請使用
              <strong>Adapter Pattern (資料轉接器)</strong>
              ， 在拿到 API 資料的第一時間，就把它「清洗」成標準格式。
            </div>
            <ShowcaseCodeBlock
              language="javascript"
              class="mt-2"
              code='// useUserApi.ts (API 層)
const fetchUser = async () => {
  const { data } = await api.get("/user")
  return {
    ...data,
    // 這裡就先洗乾淨，元件永遠只看到標準的 disabled
    disabled: data.disableds || data.disabled
  }
}'
              :show-copy="false"
            />
          </ShowcaseAlert>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- 業務邏輯層展示 -->
    <ShowcaseSection
      v-show="activeTab === 'business'"
      title="業務邏輯層展示"
    >
      <p class="section-desc">這些元件已封裝好業務邏輯，直接使用即可</p>

      <div class="component-grid">
        <!-- EmailInput -->
        <ShowcaseCard
          title="EmailInput"
          description="自動驗證 Email 格式、轉小寫"
        >
          <div class="demo-area">
            <EmailInput
              v-model="email"
              required
            />
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code='<EmailInput v-model="email" required />'
              label="使用範例"
            />
            <div class="result-text">
              值:
              <span class="value">{{ email || '(空)' }}</span>
            </div>
          </template>
        </ShowcaseCard>

        <!-- EmailInput Variants -->
        <ShowcaseCard
          title="EmailInput (業務變體)"
          description="透過 Props 啟用特定的業務規則"
        >
          <div class="demo-area flex flex-col gap-4">
            <!-- 1. 公司信箱限制 -->
            <div>
              <div class="text-sm text-slate-400 mb-2">1. 限制公司信箱 (corporate-only)</div>
              <EmailInput
                v-model="corporateEmail"
                placeholder="請輸入 @mycompany.com"
                corporate-only
              />
            </div>

            <!-- 2. 指定網域清單 -->
            <div>
              <div class="text-sm text-slate-400 mb-2">2. 指定網域 (gmail, outlook)</div>
              <EmailInput
                v-model="personalEmail"
                placeholder="只允許 gmail 或 outlook"
                :allowed-domains="['gmail.com', 'outlook.com']"
              />
            </div>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code='<!-- 變體 1: 公司信箱 -->
<EmailInput v-model="email" corporate-only />

<!-- 變體 2: 指定網域 -->
<EmailInput 
  v-model="email" 
  :allowed-domains="[&apos;gmail.com&apos;, &apos;outlook.com&apos;]" 
/>'
              label="使用範例"
            />
            <div class="result-text">
              公司:
              <span class="value">{{ corporateEmail || '(空)' }}</span>
              | 個人:
              <span class="value">{{ personalEmail || '(空)' }}</span>
            </div>
          </template>
        </ShowcaseCard>

        <!-- PhoneInput -->
        <ShowcaseCard
          title="PhoneInput"
          description="自動格式化台灣手機號碼"
        >
          <div class="demo-area">
            <PhoneInput
              v-model="phone"
              required
            />
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code='<PhoneInput v-model="phone" required />'
              label="使用範例"
            />
            <div class="result-text">
              值:
              <span class="value">{{ phone || '(空)' }}</span>
            </div>
          </template>
        </ShowcaseCard>

        <!-- PasswordInput -->
        <ShowcaseCard
          title="PasswordInput"
          description="密碼強度檢測、顯示/隱藏切換"
        >
          <div class="demo-area">
            <PasswordInput
              v-model="password"
              required
            />
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code='<PasswordInput v-model="password" required />'
              label="使用範例"
            />
            <div class="result-text">
              值:
              <span class="value">{{ password ? '***' : '(空)' }}</span>
            </div>
          </template>
        </ShowcaseCard>

        <!-- GenderRadio -->
        <ShowcaseCard
          title="GenderRadio"
          description="性別選擇，自動載入選項"
        >
          <div class="demo-area">
            <GenderRadio
              v-model="gender"
              required
            />
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code='<GenderRadio v-model="gender" required />'
              label="使用範例"
            />
            <div class="result-text">
              值:
              <span class="value">{{ gender || '(空)' }}</span>
            </div>
          </template>
        </ShowcaseCard>

        <ShowcaseCard
          title="OptionSelect (進階)"
          description="通用選項選擇器，傳入 code 即可自動載入選項"
          full-width
        >
          <div class="demo-area flex gap-4">
            <div class="flex-1">
              <OptionSelect
                v-model="job"
                code="job"
                label="職業 (code='job')"
              />
            </div>
            <div class="flex-1">
              <OptionSelect
                v-model="interest"
                code="interest"
                label="興趣 (code='interest')"
              />
            </div>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code='<!-- 同一個元件，不同 code -->
<OptionSelect v-model="job" code="job" />
<OptionSelect v-model="interest" code="interest" />'
              label="使用範例"
            />
            <div class="result-text">
              職業:
              <span class="value">{{ job || '(空)' }}</span>
              | 興趣:
              <span class="value">{{ interest || '(空)' }}</span>
            </div>
          </template>
        </ShowcaseCard>

        <!-- CitySelect -->
        <ShowcaseCard
          title="CitySelect"
          description="城市選擇，自動載入資料"
        >
          <div class="demo-area">
            <CitySelect v-model="city" />
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code='<CitySelect v-model="city" />'
              label="使用範例"
            />
            <div class="result-text">
              值:
              <span class="value">{{ city || '(空)' }}</span>
            </div>
          </template>
        </ShowcaseCard>

        <!-- CountrySelect -->
        <ShowcaseCard
          title="CountrySelect"
          description="國家選擇，支援搜尋"
        >
          <div class="demo-area">
            <CountrySelect v-model="country" />
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code='<CountrySelect v-model="country" />'
              label="使用範例"
            />
            <div class="result-text">
              值:
              <span class="value">{{ country || '(空)' }}</span>
            </div>
          </template>
        </ShowcaseCard>

        <!-- DateRangePicker -->
        <ShowcaseCard
          title="DateRangePicker"
          description="日期範圍選擇，含快速選項"
          full-width
        >
          <div class="demo-area">
            <DateRangePicker v-model="dateRange" />
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code='<DateRangePicker v-model="dateRange" />'
              label="使用範例"
            />
            <div class="result-text">
              開始:
              <span class="value">{{ dateRange.start || '(空)' }}</span>
              | 結束:
              <span class="value">{{ dateRange.end || '(空)' }}</span>
            </div>
          </template>
        </ShowcaseCard>

        <!-- SmartCard -->
        <ShowcaseCard
          title="SmartCard"
          description="智慧卡片，封裝 Icon 與標題"
        >
          <div class="demo-area">
            <SmartCard
              title="專案進度"
              subtitle="2024 Q1"
              text="目前進度良好，預計下週完成第一階段。"
              :elevation="0"
              icon="mdi-rocket-launch"
            />
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code='<SmartCard title="標題" text="內容" icon="mdi-rocket" />'
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <!-- SmartComplexWidget -->
        <ShowcaseCard
          title="SmartComplexWidget"
          description="複雜業務元件，包含內部狀態與互動"
          full-width
        >
          <div class="demo-area">
            <SmartComplexWidget />
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="<SmartComplexWidget />"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <!-- SmartTable -->
        <ShowcaseCard
          title="SmartTable"
          description="智慧表格，整合搜尋與分頁"
          full-width
        >
          <div class="demo-area">
            <SmartTable
              title="員工列表"
              :columns="smartTableColumns"
              :data="smartTableData"
            />
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code='<SmartTable :columns="cols" :data="data" />'
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <!-- ApiLoadingButton -->
        <ShowcaseCard
          title="ApiLoadingButton"
          description="自動處理 API Loading 狀態"
        >
          <div class="demo-area">
            <ApiLoadingButton label="測試 API 請求" />
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code='<ApiLoadingButton label="測試" />'
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <!-- Global Components -->
        <ShowcaseCard
          title="全域元件"
          description="測試 GlobalLoading 與 GlobalSnackbar"
        >
          <div class="demo-area">
            <div style="display: flex; gap: 0.5rem">
              <IButton
                variant="primary"
                @click="testGlobalLoading"
              >
                測試 Loading
              </IButton>
              <IButton
                variant="outlined"
                @click="testGlobalSnackbar"
              >
                測試 Snackbar
              </IButton>
            </div>
            <!-- Global 元件展示 -->
            <GlobalLoading />
            <GlobalSnackbar />
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="useLoading().start() / useNotify().show()"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- 介面層展示 -->
    <ShowcaseSection
      v-show="activeTab === 'interface'"
      title="介面層展示"
    >
      <p class="section-desc">
        這些是基礎 UI 元件，可替換內部實作（原生 HTML / Vuetify / Element UI）
      </p>

      <!-- Component Grid -->
      <div class="component-grid">
        <!-- IInput -->
        <ShowcaseCard
          title="IInput"
          description="基礎輸入框"
        >
          <div class="demo-area">
            <IInput
              v-model="inputValue"
              placeholder="請輸入文字"
              clearable
            />
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code='<IInput v-model="value" clearable />'
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <!-- IButton -->
        <ShowcaseCard
          title="IButton"
          description="按鈕元件"
        >
          <div class="demo-area">
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap">
              <IButton variant="primary">Primary</IButton>
              <IButton variant="secondary">Secondary</IButton>
              <IButton variant="success">Success</IButton>
              <IButton variant="danger">Danger</IButton>
            </div>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code='<IButton variant="primary">按鈕</IButton>'
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <!-- ICheckbox -->
        <ShowcaseCard
          title="ICheckbox"
          description="核取方塊"
        >
          <div class="demo-area">
            <ICheckbox
              v-model="checkboxValue"
              label="單一選項"
            />
            <div style="margin-top: 0.5rem">
              <ICheckbox
                v-model="checkboxArray"
                value="A"
                label="選項 A"
              />
              <ICheckbox
                v-model="checkboxArray"
                value="B"
                label="選項 B"
              />
            </div>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code='<ICheckbox v-model="value" label="選項" />'
              label="使用範例"
            />
            <div class="result-text">
              單選:
              <span class="value">{{ checkboxValue }}</span>
              | 多選:
              <span class="value">{{ checkboxArray.join(', ') || '(空)' }}</span>
            </div>
          </template>
        </ShowcaseCard>

        <!-- IRadio -->
        <ShowcaseCard
          title="IRadio"
          description="單選按鈕"
        >
          <div class="demo-area">
            <IRadio
              v-model="radioValue"
              value="1"
              label="選項 1"
              name="demo"
            />
            <IRadio
              v-model="radioValue"
              value="2"
              label="選項 2"
              name="demo"
            />
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code='<IRadio v-model="value" value="1" label="選項 1" />'
              label="使用範例"
            />
            <div class="result-text">
              值:
              <span class="value">{{ radioValue || '(空)' }}</span>
            </div>
          </template>
        </ShowcaseCard>

        <!-- ISwitch -->
        <ShowcaseCard
          title="ISwitch"
          description="開關切換"
        >
          <div class="demo-area">
            <ISwitch
              v-model="switchValue"
              label="開關"
            />
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code='<ISwitch v-model="value" label="開關" />'
              label="使用範例"
            />
            <div class="result-text">
              值:
              <span class="value">{{ switchValue }}</span>
            </div>
          </template>
        </ShowcaseCard>

        <!-- ITextarea -->
        <ShowcaseCard
          title="ITextarea"
          description="多行文字輸入"
        >
          <div class="demo-area">
            <ITextarea
              v-model="textareaValue"
              placeholder="請輸入多行文字"
              :rows="3"
            />
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code='<ITextarea v-model="value" :rows="3" />'
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <!-- IDatePicker -->
        <ShowcaseCard
          title="IDatePicker"
          description="日期選擇器"
        >
          <div class="demo-area">
            <IDatePicker
              v-model="dateValue"
              clearable
            />
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code='<IDatePicker v-model="value" clearable />'
              label="使用範例"
            />
            <div class="result-text">
              值:
              <span class="value">{{ dateValue || '(空)' }}</span>
            </div>
          </template>
        </ShowcaseCard>

        <!-- ISelect -->
        <ShowcaseCard
          title="ISelect"
          description="下拉選擇器"
        >
          <div class="demo-area">
            <ISelect
              v-model="selectValue"
              :options="sampleOptions"
              placeholder="請選擇"
            />
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code='<ISelect v-model="value" :options="options" />'
              label="使用範例"
            />
            <div class="result-text">
              值:
              <span class="value">{{ selectValue || '(空)' }}</span>
            </div>
          </template>
        </ShowcaseCard>

        <!-- ICard -->
        <ShowcaseCard
          title="ICard"
          description="卡片容器"
        >
          <div class="demo-area">
            <ICard
              title="卡片標題"
              subtitle="此為無陰影模式"
              :elevation="0"
              variant="outlined"
            >
              <p>這是卡片內容</p>
            </ICard>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code='<ICard title="標題" variant="outlined">內容</ICard>'
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <!-- IChip -->
        <ShowcaseCard
          title="IChip"
          description="標籤/徽章"
        >
          <div class="demo-area">
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap">
              <IChip label="Default" />
              <IChip
                label="Primary"
                color="#38bdf8"
              />
              <IChip
                label="Outlined"
                variant="outlined"
                color="#94a3b8"
              />
            </div>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code='<IChip label="標籤" color="#38bdf8" />'
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <!-- ITextField -->
        <ShowcaseCard
          title="ITextField"
          description="文字輸入框"
        >
          <div class="demo-area">
            <ITextField
              v-model="textFieldValue"
              label="標籤"
              placeholder="請輸入文字"
              prepend-icon="mdi-magnify"
              clearable
            />
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code='<ITextField v-model="value" prepend-icon="mdi-magnify" />'
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <!-- IDataTable -->
        <ShowcaseCard
          title="IDataTable"
          description="資料表格"
          full-width
        >
          <div class="demo-area">
            <IDataTable
              :columns="tableColumns"
              :items="tableData"
              :hover="true"
            />
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code='<IDataTable :columns="columns" :items="data" />'
              label="使用範例"
            />
          </template>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>
  </ShowcasePage>
</template>

<style scoped>
/* 元件網格 */
.component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 24px;
}

/* Demo Area - Enterprise Clean Look */
.demo-area {
  background: transparent; /* Remove inner box background */
  padding: 0.5rem 0.5rem 2rem 0.5rem; /* Add breathing room bottom */
  border-radius: 0;
  border: none;
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* Centering demo content for better presentation */
  min-height: 120px;
}

/* Result Text */
.result-text {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.8rem;
  color: #94a3b8;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.result-text .value {
  color: #38bdf8; /* Sky 400 */
  font-weight: 600;
}

/* Section Description */
.section-desc {
  color: #cbd5e1;
  margin-bottom: 32px;
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 800px;
  font-weight: 300;
}

/* Benefit List */
.benefit-list {
  padding-left: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 1rem;
}

.benefit-list li {
  background: rgba(255, 255, 255, 0.03);
  padding: 1rem 1.5rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  flex: 1;
  min-width: 250px;
  color: #e2e8f0;
  font-size: 0.95rem;
}

.text-sky-400 {
  color: #38bdf8;
  display: block;
  margin-bottom: 0.25rem;
  font-size: 1.1em;
}

/* Migration Guide */
.migration-guide {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.step {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: rgba(30, 41, 59, 0.4);
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  height: 100%;
}

.step-number {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  background: rgba(56, 189, 248, 0.1);
  color: #38bdf8;
  font-family: 'Inter', sans-serif;
  border-radius: 8px; /* Slightly squarer for tech feel */
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.25rem;
  border: 1px solid rgba(56, 189, 248, 0.2);
}

.step-content {
  flex: 1;
}

.step-content h3 {
  margin: 0 0 1rem 0;
  color: #f1f5f9;
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.step-content p {
  margin: 0;
  color: #94a3b8;
  line-height: 1.6;
  font-size: 1rem;
}

.step-content code {
  color: #e2e8f0;
  background: rgba(0, 0, 0, 0.2);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9em;
}

/* Example Layout Styles */
.example-container {
  margin: 0 auto;
}

.code-flow {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
}

.result-flow {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center the result card */
  margin-top: 1rem;
}

.flow-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  flex-shrink: 0;
}

.flow-arrow.horizontal {
  padding-top: 5rem; /* Optical alignment with card center */
}

.example-card {
  flex: 1;
  min-width: 280px;
  width: 100%;

  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  flex-shrink: 0; /* Prevent compression */
}

.example-card.featured {
  background: rgba(56, 189, 248, 0.05);
  border-color: rgba(56, 189, 248, 0.2);
  box-shadow: 0 0 20px rgba(56, 189, 248, 0.05);
}

.layer-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
}

.layer-badge.interface {
  background: rgba(245, 158, 11, 0.1);
  color: #fbbf24;
  border: 1px solid rgba(245, 158, 11, 0.2);
}

.layer-badge.business {
  background: rgba(56, 189, 248, 0.1);
  color: #38bdf8;
  border: 1px solid rgba(56, 189, 248, 0.2);
}

.layer-badge.page {
  background: rgba(16, 185, 129, 0.1);
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.layer-badge.result {
  background: rgba(236, 72, 153, 0.1);
  color: #f472b6;
  border: 1px solid rgba(236, 72, 153, 0.2);
}

.role-desc {
  color: #e2e8f0;
  font-weight: 500;
  margin-bottom: 1rem;
  line-height: 1.6;
  min-height: 3.2em; /* Align cards */
}

/* Browser Mockup */
.browser-mockup {
  background: rgba(15, 23, 42, 0.6);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.mockup-header {
  background: rgba(255, 255, 255, 0.05);
  padding: 8px 12px;
  display: flex;
  gap: 6px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.mockup-header .dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.mockup-header .dot.red {
  background: #ef4444;
}
.mockup-header .dot.yellow {
  background: #eab308;
}
.mockup-header .dot.green {
  background: #22c55e;
}

.mockup-content {
  padding: 12px;
}

/* Section Header Manual Style */
.section-header {
  margin-bottom: 2rem;
  position: relative;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: #f8fafc;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  letter-spacing: -0.02em;
}

.title-decoration {
  height: 1px;
  background: linear-gradient(90deg, #38bdf8 0%, rgba(56, 189, 248, 0) 100%);
  width: 100%;
  max-width: 300px;
  position: relative;
}

.title-decoration::after {
  content: '';
  position: absolute;
  top: -1px;
  left: 0;
  width: 32px;
  height: 3px;
  background: #38bdf8;
  border-radius: 2px;
}
</style>
