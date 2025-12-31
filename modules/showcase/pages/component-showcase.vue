<script setup lang="ts">
/**
 * 組件架構展示頁面
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

// 業務元件示範數據
const email = ref('')
const phone = ref('')
const password = ref('')
const city = ref('')
const country = ref('')
const gender = ref('')
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

// 介面元件示範數據
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

definePageMeta({
  title: '元件展示 (Component Showcase)',
  icon: 'mdi-layers'
})

// Tab 狀態管理
const activeTab = ref('migration') // architecture, business, interface
const tabOptions = [
  { label: '如何替換框架', value: 'migration' },
  { label: '業務元件 (7個)', value: 'business' },
  { label: '介面元件 (12個)', value: 'interface' }
]
</script>

<template>
  <ShowcasePage
    title="元件展示 (Component Showcase)"
    description="展示三層架構設計：uiInterface 層（可替換 UI 框架）、uiBusiness 層（穩定業務邏輯）、頁面層（簡潔使用）"
  >
    <!-- 架構說明 -->
    <ShowcaseSection title="架構說明">
      <ShowcaseArchitecture />

      <ShowcaseAlert
        title="核心優勢"
        type="info"
      >
        <ul>
          <li>換 UI 框架時，只需修改 uiInterface 層</li>
          <li>業務邏輯集中管理，不會散落各處</li>
          <li>頁面程式碼極簡，開發效率高</li>
        </ul>
      </ShowcaseAlert>
    </ShowcaseSection>

    <!-- Tab 導航 -->
    <ShowcaseTabs
      v-model="activeTab"
      :options="tabOptions"
    />

    <!-- 業務邏輯層展示 -->
    <ShowcaseSection
      v-show="activeTab === 'business'"
      title="業務邏輯層元件（推薦使用）"
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
          <template #code>
            <code>&lt;EmailInput v-model="email" required /&gt;</code>
          </template>
          <template #result>值: {{ email || '(空)' }}</template>
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
          <template #code>
            <code>&lt;PhoneInput v-model="phone" required /&gt;</code>
          </template>
          <template #result>值: {{ phone || '(空)' }}</template>
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
          <template #code>
            <code>&lt;PasswordInput v-model="password" required /&gt;</code>
          </template>
          <template #result>值: {{ password ? '***' : '(空)' }}</template>
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
          <template #code>
            <code>&lt;GenderRadio v-model="gender" required /&gt;</code>
          </template>
          <template #result>值: {{ gender || '(空)' }}</template>
        </ShowcaseCard>

        <!-- CitySelect -->
        <ShowcaseCard
          title="CitySelect"
          description="城市選擇，自動載入數據"
        >
          <div class="demo-area">
            <CitySelect v-model="city" />
          </div>
          <template #code>
            <code>&lt;CitySelect v-model="city" /&gt;</code>
          </template>
          <template #result>值: {{ city || '(空)' }}</template>
        </ShowcaseCard>

        <!-- CountrySelect -->
        <ShowcaseCard
          title="CountrySelect"
          description="國家選擇，支援搜尋"
        >
          <div class="demo-area">
            <CountrySelect v-model="country" />
          </div>
          <template #code>
            <code>&lt;CountrySelect v-model="country" /&gt;</code>
          </template>
          <template #result>值: {{ country || '(空)' }}</template>
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
          <template #code>
            <code>&lt;DateRangePicker v-model="dateRange" /&gt;</code>
          </template>
          <template #result>
            開始: {{ dateRange.start || '(空)' }} | 結束: {{ dateRange.end || '(空)' }}
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
              style="border: 1px solid #eee"
            />
          </div>
          <template #code>
            <code>&lt;SmartCard title="標題" text="內容" /&gt;</code>
          </template>
        </ShowcaseCard>

        <!-- SmartComplexWidget -->
        <ShowcaseCard
          title="SmartComplexWidget"
          description="複雜業務組件，包含內部狀態與互動"
          full-width
        >
          <div class="demo-area">
            <SmartComplexWidget />
          </div>
          <template #code>
            <code>&lt;SmartComplexWidget /&gt;</code>
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
          <template #code>
            <code>&lt;SmartTable :columns="cols" :data="data" /&gt;</code>
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
          <template #code>
            <code>&lt;ApiLoadingButton label="測試" /&gt;</code>
          </template>
        </ShowcaseCard>

        <!-- Global Components -->
        <ShowcaseCard
          title="全域組件 (Global)"
          description="測試 GlobalLoading 與 GlobalSnackbar"
        >
          <div class="demo-area">
            <div style="display: flex; gap: 0.5rem">
              <IButton
                variant="primary"
                @click="testGlobalLoading"
              >
                測試 Loading (2秒)
              </IButton>
              <IButton
                variant="success"
                @click="testGlobalSnackbar"
              >
                測試 Snackbar
              </IButton>
            </div>
            <!-- 這裡放置 Global 元件以便在此頁面展示效果，實際專案應放在 App.vue 或 Layout -->
            <GlobalLoading />
            <GlobalSnackbar />
          </div>
          <template #code>
            <code>useLoading().start() / useNotify().show()</code>
          </template>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- 介面適配層展示 -->
    <ShowcaseSection
      v-show="activeTab === 'interface'"
      title="介面適配層元件（基礎元件）"
    >
      <p class="section-desc">
        這些是基礎 UI 元件，可替換內部實作（原生 HTML / Vuetify / Element UI）
      </p>

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
          <template #code>
            <code>&lt;IInput v-model="value" clearable /&gt;</code>
          </template>
        </ShowcaseCard>

        <!-- IButton -->
        <ShowcaseCard
          title="IButton"
          description="按鈕元件"
        >
          <div class="demo-area">
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap">
              <IButton variant="primary">主要按鈕</IButton>
              <IButton variant="secondary">次要按鈕</IButton>
              <IButton variant="success">成功</IButton>
              <IButton variant="danger">危險</IButton>
            </div>
          </div>
          <template #code>
            <code>&lt;IButton variant="primary"&gt;按鈕&lt;/IButton&gt;</code>
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
              <ICheckbox
                v-model="checkboxArray"
                value="C"
                label="選項 C"
              />
            </div>
          </div>
          <template #code>
            <code>&lt;ICheckbox v-model="value" label="選項" /&gt;</code>
          </template>
          <template #result>
            單選: {{ checkboxValue }} | 多選: {{ checkboxArray.join(', ') || '(空)' }}
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
            <IRadio
              v-model="radioValue"
              value="3"
              label="選項 3"
              name="demo"
            />
          </div>
          <template #code>
            <code>&lt;IRadio v-model="value" value="1" label="選項 1" /&gt;</code>
          </template>
          <template #result>值: {{ radioValue || '(空)' }}</template>
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
          <template #code>
            <code>&lt;ISwitch v-model="value" label="開關" /&gt;</code>
          </template>
          <template #result>值: {{ switchValue }}</template>
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
              show-count
              :maxlength="200"
            />
          </div>
          <template #code>
            <code>&lt;ITextarea v-model="value" show-count /&gt;</code>
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
          <template #code>
            <code>&lt;IDatePicker v-model="value" clearable /&gt;</code>
          </template>
          <template #result>值: {{ dateValue || '(空)' }}</template>
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
          <template #code>
            <code>&lt;ISelect v-model="value" :options="options" /&gt;</code>
          </template>
          <template #result>值: {{ selectValue || '(空)' }}</template>
        </ShowcaseCard>

        <!-- ICard -->
        <ShowcaseCard
          title="ICard"
          description="卡片容器"
        >
          <div class="demo-area">
            <ICard
              title="卡片標題"
              subtitle="卡片副標題"
              :elevation="2"
            >
              <p>這是卡片內容</p>
            </ICard>
          </div>
          <template #code>
            <code>&lt;ICard title="標題" subtitle="副標題"&gt;內容&lt;/ICard&gt;</code>
          </template>
        </ShowcaseCard>

        <!-- IChip -->
        <ShowcaseCard
          title="IChip"
          description="標籤/徽章"
        >
          <div class="demo-area">
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap">
              <IChip label="預設" />
              <IChip
                label="成功"
                color="#4caf50"
              />
              <IChip
                label="警告"
                color="#ff9800"
              />
              <IChip
                label="外框"
                color="#3498db"
                variant="outlined"
              />
            </div>
          </div>
          <template #code>
            <code>&lt;IChip label="標籤" color="#3498db" /&gt;</code>
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
              prepend-icon="🔍"
              clearable
            />
          </div>
          <template #code>
            <code>&lt;ITextField v-model="value" label="標籤" clearable /&gt;</code>
          </template>
          <template #result>值: {{ textFieldValue || '(空)' }}</template>
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
          <template #code>
            <code>&lt;IDataTable :columns="columns" :items="data" /&gt;</code>
          </template>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- 如何替換 UI 框架 -->
    <ShowcaseSection
      v-show="activeTab === 'migration'"
      title="如何替換 UI 框架"
    >
      <div class="migration-guide">
        <div class="step">
          <div class="step-number">1</div>
          <div class="step-content">
            <h3>只需修改 uiInterface 層</h3>
            <p>
              打開任一 uiInterface 元件，例如
              <code>IInput.vue</code>
            </p>
          </div>
        </div>

        <div class="step">
          <div class="step-number">2</div>
          <div class="step-content">
            <h3>替換內部實作</h3>
            <div class="code-example">
              <div class="code-label">從原生 HTML:</div>
              <code>&lt;input v-model="value" /&gt;</code>

              <div class="code-label">改成 Vuetify:</div>
              <code>&lt;VTextField v-model="value" /&gt;</code>

              <div class="code-label">或改成 Element UI:</div>
              <code>&lt;ElInput v-model="value" /&gt;</code>
            </div>
          </div>
        </div>

        <div class="step">
          <div class="step-number">3</div>
          <div class="step-content">
            <h3>完成！</h3>
            <ShowcaseAlert
              type="success"
              style="margin-top: 0.5rem"
            >
              所有頁面自動使用新的 UI 框架
              <br />
              業務元件不用改
              <br />
              頁面程式碼不用改
            </ShowcaseAlert>
          </div>
        </div>
      </div>
    </ShowcaseSection>
  </ShowcasePage>
</template>

<style scoped>
/* 元件網格 */
.component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.demo-area {
  background: white;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  margin-bottom: 0.75rem;
}

.section-desc {
  color: #666;
  margin-bottom: 1.5rem;
}

/* 遷移指南 */
.migration-guide {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.step {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.step-number {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  background: #3498db;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.5rem;
}

.step-content {
  flex: 1;
}

.step-content h3 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
}

.step-content p {
  margin: 0;
  color: #666;
}

.step-content code {
  background: #f0f0f0;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
}

.code-example {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.code-label {
  font-size: 0.85rem;
  color: #888;
  font-weight: 500;
}

.code-example code {
  display: block;
  background: #282c34;
  color: #61dafb;
  padding: 0.5rem;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
}
</style>
