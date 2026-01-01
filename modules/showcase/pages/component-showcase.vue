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
  title: '基礎元件展示',
  icon: 'mdi-cube-outline',
  layout: 'portal'
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
        class="mt-6"
      >
        <ul class="benefit-list">
          <li>
            <strong class="text-sky-400">彈性適配</strong>
            - 換 UI 框架時，只需修改 uiInterface 層
          </li>
          <li>
            <strong class="text-sky-400">邏輯統一</strong>
            - 業務邏輯集中管理，不會散落各處
          </li>
          <li>
            <strong class="text-sky-400">開發極速</strong>
            - 頁面程式碼極簡，開發效率高
          </li>
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
          <template #footer>
            <ShowcaseCodeBlock
              code='<EmailInput v-model="email" required />'
              label="Usage"
            />
            <div class="result-text">
              值:
              <span class="value">{{ email || '(空)' }}</span>
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
              label="Usage"
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
              label="Usage"
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
              label="Usage"
            />
            <div class="result-text">
              值:
              <span class="value">{{ gender || '(空)' }}</span>
            </div>
          </template>
        </ShowcaseCard>

        <!-- CitySelect -->
        <ShowcaseCard
          title="CitySelect"
          description="城市選擇，自動載入數據"
        >
          <div class="demo-area">
            <CitySelect v-model="city" />
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code='<CitySelect v-model="city" />'
              label="Usage"
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
              label="Usage"
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
              label="Usage"
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
              label="Usage"
            />
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
          <template #footer>
            <ShowcaseCodeBlock
              code="<SmartComplexWidget />"
              label="Usage"
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
              label="Usage"
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
              label="Usage"
            />
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
              label="Usage"
            />
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
          <template #footer>
            <ShowcaseCodeBlock
              code='<IInput v-model="value" clearable />'
              label="Usage"
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
              label="Usage"
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
              label="Usage"
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
              label="Usage"
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
              label="Usage"
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
              label="Usage"
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
              label="Usage"
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
              label="Usage"
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
              label="Usage"
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
              label="Usage"
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
              label="Usage"
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
              label="Usage"
            />
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
</style>
