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

// 引入所有業務元件
import EmailInput from '@/components/uiBusiness/EmailInput.vue'
import PhoneInput from '@/components/uiBusiness/PhoneInput.vue'
import PasswordInput from '@/components/uiBusiness/PasswordInput.vue'
import CitySelect from '@/components/uiBusiness/CitySelect.vue'
import CountrySelect from '@/components/uiBusiness/CountrySelect.vue'
import GenderRadio from '@/components/uiBusiness/GenderRadio.vue'
import DateRangePicker from '@/components/uiBusiness/DateRangePicker.vue'

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
const activeTab = ref('architecture') // architecture, business, interface
</script>

<template>
  <div class="architecture-page">
    <!-- 頁面標題 -->
    <div class="page-header">
      <router-link
        to="/showcase"
        class="back-link"
      >
        ← 返回
      </router-link>
      <h1 class="page-title">元件展示 (Component Showcase)</h1>
      <p class="page-desc">
        展示三層架構設計：uiInterface 層（可替換 UI 框架）、uiBusiness
        層（穩定業務邏輯）、頁面層（簡潔使用）
      </p>
    </div>

    <!-- 架構說明 -->
    <section class="section">
      <h2 class="section-title">📐 架構說明</h2>
      <div class="architecture-diagram">
        <div class="layer layer-page">
          <div class="layer-number">3</div>
          <div class="layer-content">
            <h3>頁面層 (Page Layer)</h3>
            <p>直接使用業務元件，程式碼最簡潔</p>
            <code>&lt;EmailInput v-model="email" /&gt;</code>
          </div>
        </div>

        <div class="arrow">↓ 使用</div>

        <div class="layer layer-business">
          <div class="layer-number">2</div>
          <div class="layer-content">
            <h3>uiBusiness 層 (Business Layer)</h3>
            <p>封裝業務邏輯（驗證、格式化、數據處理）</p>
            <code>components/uiBusiness/EmailInput.vue</code>
          </div>
        </div>

        <div class="arrow">↓ 使用</div>

        <div class="layer layer-interface">
          <div class="layer-number">1</div>
          <div class="layer-content">
            <h3>uiInterface 層 (Interface Layer)</h3>
            <p>UI 框架適配層，可替換（原生 HTML / Vuetify / Element UI）</p>
            <code>components/uiInterface/IInput.vue</code>
          </div>
        </div>
      </div>

      <div class="highlight-box">
        <strong>🎯 核心優勢：</strong>
        <ul>
          <li>換 UI 框架時，只需修改 uiInterface 層</li>
          <li>業務邏輯集中管理，不會散落各處</li>
          <li>頁面程式碼極簡，開發效率高</li>
        </ul>
      </div>
    </section>

    <!-- Tab 導航 -->
    <div class="tabs-container">
      <div class="tabs">
        <button
          class="tab"
          :class="{ active: activeTab === 'business' }"
          @click="activeTab = 'business'"
        >
          業務元件 (7個)
        </button>
        <button
          class="tab"
          :class="{ active: activeTab === 'interface' }"
          @click="activeTab = 'interface'"
        >
          介面元件 (12個)
        </button>
        <button
          class="tab"
          :class="{ active: activeTab === 'migration' }"
          @click="activeTab = 'migration'"
        >
          如何替換框架
        </button>
      </div>
    </div>

    <!-- uiBusiness 層展示 -->
    <section
      v-show="activeTab === 'business'"
      class="section"
    >
      <h2 class="section-title">uiBusiness 層元件（推薦使用）</h2>
      <p class="section-desc">這些元件已封裝好業務邏輯，直接使用即可</p>

      <div class="component-grid">
        <!-- EmailInput -->
        <div class="component-card">
          <h3>EmailInput</h3>
          <p class="component-desc">自動驗證 Email 格式、轉小寫</p>
          <div class="demo-area">
            <EmailInput
              v-model="email"
              required
            />
          </div>
          <div class="code-block">
            <code>&lt;EmailInput v-model="email" required /&gt;</code>
          </div>
          <div class="result">值: {{ email || '(空)' }}</div>
        </div>

        <!-- PhoneInput -->
        <div class="component-card">
          <h3>PhoneInput</h3>
          <p class="component-desc">自動格式化台灣手機號碼</p>
          <div class="demo-area">
            <PhoneInput
              v-model="phone"
              required
            />
          </div>
          <div class="code-block">
            <code>&lt;PhoneInput v-model="phone" required /&gt;</code>
          </div>
          <div class="result">值: {{ phone || '(空)' }}</div>
        </div>

        <!-- PasswordInput -->
        <div class="component-card">
          <h3>PasswordInput</h3>
          <p class="component-desc">密碼強度檢測、顯示/隱藏切換</p>
          <div class="demo-area">
            <PasswordInput
              v-model="password"
              required
            />
          </div>
          <div class="code-block">
            <code>&lt;PasswordInput v-model="password" required /&gt;</code>
          </div>
          <div class="result">值: {{ password ? '***' : '(空)' }}</div>
        </div>

        <!-- GenderRadio -->
        <div class="component-card">
          <h3>GenderRadio</h3>
          <p class="component-desc">性別選擇，自動載入選項</p>
          <div class="demo-area">
            <GenderRadio
              v-model="gender"
              required
            />
          </div>
          <div class="code-block">
            <code>&lt;GenderRadio v-model="gender" required /&gt;</code>
          </div>
          <div class="result">值: {{ gender || '(空)' }}</div>
        </div>

        <!-- CitySelect -->
        <div class="component-card">
          <h3>CitySelect</h3>
          <p class="component-desc">城市選擇，自動載入數據</p>
          <div class="demo-area">
            <CitySelect v-model="city" />
          </div>
          <div class="code-block">
            <code>&lt;CitySelect v-model="city" /&gt;</code>
          </div>
          <div class="result">值: {{ city || '(空)' }}</div>
        </div>

        <!-- CountrySelect -->
        <div class="component-card">
          <h3>CountrySelect</h3>
          <p class="component-desc">國家選擇，支援搜尋</p>
          <div class="demo-area">
            <CountrySelect v-model="country" />
          </div>
          <div class="code-block">
            <code>&lt;CountrySelect v-model="country" /&gt;</code>
          </div>
          <div class="result">值: {{ country || '(空)' }}</div>
        </div>

        <!-- DateRangePicker -->
        <div class="component-card full-width">
          <h3>DateRangePicker</h3>
          <p class="component-desc">日期範圍選擇，含快速選項</p>
          <div class="demo-area">
            <DateRangePicker v-model="dateRange" />
          </div>
          <div class="code-block">
            <code>&lt;DateRangePicker v-model="dateRange" /&gt;</code>
          </div>
          <div class="result">
            開始: {{ dateRange.start || '(空)' }} | 結束: {{ dateRange.end || '(空)' }}
          </div>
        </div>
      </div>
    </section>

    <!-- uiInterface 層展示 -->
    <section
      v-show="activeTab === 'interface'"
      class="section"
    >
      <h2 class="section-title">uiInterface 層元件（基礎元件）</h2>
      <p class="section-desc">
        這些是基礎 UI 元件，可替換內部實作（原生 HTML / Vuetify / Element UI）
      </p>

      <div class="component-grid">
        <!-- IInput -->
        <div class="component-card">
          <h3>IInput</h3>
          <p class="component-desc">基礎輸入框</p>
          <div class="demo-area">
            <IInput
              v-model="inputValue"
              placeholder="請輸入文字"
              clearable
            />
          </div>
          <div class="code-block">
            <code>&lt;IInput v-model="value" clearable /&gt;</code>
          </div>
        </div>

        <!-- IButton -->
        <div class="component-card">
          <h3>IButton</h3>
          <p class="component-desc">按鈕元件</p>
          <div class="demo-area">
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap">
              <IButton variant="primary">主要按鈕</IButton>
              <IButton variant="secondary">次要按鈕</IButton>
              <IButton variant="success">成功</IButton>
              <IButton variant="danger">危險</IButton>
            </div>
          </div>
          <div class="code-block">
            <code>&lt;IButton variant="primary"&gt;按鈕&lt;/IButton&gt;</code>
          </div>
        </div>

        <!-- ICheckbox -->
        <div class="component-card">
          <h3>ICheckbox</h3>
          <p class="component-desc">核取方塊</p>
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
          <div class="code-block">
            <code>&lt;ICheckbox v-model="value" label="選項" /&gt;</code>
          </div>
          <div class="result">
            單選: {{ checkboxValue }} | 多選: {{ checkboxArray.join(', ') || '(空)' }}
          </div>
        </div>

        <!-- IRadio -->
        <div class="component-card">
          <h3>IRadio</h3>
          <p class="component-desc">單選按鈕</p>
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
          <div class="code-block">
            <code>&lt;IRadio v-model="value" value="1" label="選項 1" /&gt;</code>
          </div>
          <div class="result">值: {{ radioValue || '(空)' }}</div>
        </div>

        <!-- ISwitch -->
        <div class="component-card">
          <h3>ISwitch</h3>
          <p class="component-desc">開關切換</p>
          <div class="demo-area">
            <ISwitch
              v-model="switchValue"
              label="開關"
            />
          </div>
          <div class="code-block">
            <code>&lt;ISwitch v-model="value" label="開關" /&gt;</code>
          </div>
          <div class="result">值: {{ switchValue }}</div>
        </div>

        <!-- ITextarea -->
        <div class="component-card">
          <h3>ITextarea</h3>
          <p class="component-desc">多行文字輸入</p>
          <div class="demo-area">
            <ITextarea
              v-model="textareaValue"
              placeholder="請輸入多行文字"
              :rows="3"
              show-count
              :maxlength="200"
            />
          </div>
          <div class="code-block">
            <code>&lt;ITextarea v-model="value" show-count /&gt;</code>
          </div>
        </div>

        <!-- IDatePicker -->
        <div class="component-card">
          <h3>IDatePicker</h3>
          <p class="component-desc">日期選擇器</p>
          <div class="demo-area">
            <IDatePicker
              v-model="dateValue"
              clearable
            />
          </div>
          <div class="code-block">
            <code>&lt;IDatePicker v-model="value" clearable /&gt;</code>
          </div>
          <div class="result">值: {{ dateValue || '(空)' }}</div>
        </div>

        <!-- ISelect -->
        <div class="component-card">
          <h3>ISelect</h3>
          <p class="component-desc">下拉選擇器</p>
          <div class="demo-area">
            <ISelect
              v-model="selectValue"
              :options="sampleOptions"
              placeholder="請選擇"
            />
          </div>
          <div class="code-block">
            <code>&lt;ISelect v-model="value" :options="options" /&gt;</code>
          </div>
          <div class="result">值: {{ selectValue || '(空)' }}</div>
        </div>

        <!-- ICard -->
        <div class="component-card">
          <h3>ICard</h3>
          <p class="component-desc">卡片容器</p>
          <div class="demo-area">
            <ICard
              title="卡片標題"
              subtitle="卡片副標題"
              :elevation="2"
            >
              <p>這是卡片內容</p>
            </ICard>
          </div>
          <div class="code-block">
            <code>&lt;ICard title="標題" subtitle="副標題"&gt;內容&lt;/ICard&gt;</code>
          </div>
        </div>

        <!-- IChip -->
        <div class="component-card">
          <h3>IChip</h3>
          <p class="component-desc">標籤/徽章</p>
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
          <div class="code-block">
            <code>&lt;IChip label="標籤" color="#3498db" /&gt;</code>
          </div>
        </div>

        <!-- ITextField -->
        <div class="component-card">
          <h3>ITextField</h3>
          <p class="component-desc">文字輸入框</p>
          <div class="demo-area">
            <ITextField
              v-model="textFieldValue"
              label="標籤"
              placeholder="請輸入文字"
              prepend-icon="🔍"
              clearable
            />
          </div>
          <div class="code-block">
            <code>&lt;ITextField v-model="value" label="標籤" clearable /&gt;</code>
          </div>
          <div class="result">值: {{ textFieldValue || '(空)' }}</div>
        </div>

        <!-- IDataTable -->
        <div class="component-card full-width">
          <h3>IDataTable</h3>
          <p class="component-desc">資料表格</p>
          <div class="demo-area">
            <IDataTable
              :columns="tableColumns"
              :items="tableData"
              :hover="true"
            />
          </div>
          <div class="code-block">
            <code>&lt;IDataTable :columns="columns" :items="data" /&gt;</code>
          </div>
        </div>
      </div>
    </section>

    <!-- 如何替換 UI 框架 -->
    <section
      v-show="activeTab === 'migration'"
      class="section"
    >
      <h2 class="section-title">如何替換 UI 框架</h2>
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
            <div class="success-box">
              ✅ 所有頁面自動使用新的 UI 框架
              <br />
              ✅ 業務元件不用改
              <br />
              ✅ 頁面程式碼不用改
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.architecture-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
}

/* 頁面標題 */
.page-header {
  margin-bottom: 2rem;
}

.back-link {
  display: inline-block;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  background: #f0f0f0;
  border-radius: 4px;
  text-decoration: none;
  color: #666;
  transition: all 0.2s;
}

.back-link:hover {
  background: #e0e0e0;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
}

.page-desc {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
}

/* Section */
.section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
}

.section-desc {
  color: #666;
  margin-bottom: 1.5rem;
}

/* 架構圖 */
.architecture-diagram {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 1.5rem;
}

.layer {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 8px;
  border: 2px solid;
}

.layer-page {
  background: #e8f5e9;
  border-color: #4caf50;
}

.layer-business {
  background: #e3f2fd;
  border-color: #2196f3;
}

.layer-interface {
  background: #fff3e0;
  border-color: #ff9800;
}

.layer-number {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
}

.layer-content {
  flex: 1;
}

.layer-content h3 {
  margin: 0 0 0.25rem 0;
  font-size: 1.1rem;
}

.layer-content p {
  margin: 0 0 0.5rem 0;
  color: #666;
  font-size: 0.9rem;
}

.layer-content code {
  background: rgba(0, 0, 0, 0.05);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
}

.arrow {
  text-align: center;
  padding: 0.5rem;
  color: #3498db;
  font-weight: bold;
  font-size: 1.2rem;
}

.highlight-box {
  background: #f0f7ff;
  border-left: 4px solid #2196f3;
  padding: 1rem 1.5rem;
  border-radius: 4px;
}

.highlight-box ul {
  margin: 0.5rem 0 0 0;
  padding-left: 1.5rem;
}

.highlight-box li {
  margin: 0.25rem 0;
}

/* 元件網格 */
.component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.component-card {
  background: #fafafa;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
}

.component-card.full-width {
  grid-column: 1 / -1;
}

.component-card h3 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
  font-size: 1.2rem;
}

.component-desc {
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
}

.demo-area {
  background: white;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  margin-bottom: 0.75rem;
}

.code-block {
  background: #282c34;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
  line-height: 1.5;
}

.code-block pre {
  margin: 0;
}

.code-block code {
  color: #abb2bf;
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
}

.result {
  padding: 0.5rem;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  font-size: 0.9rem;
  color: #666;
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

.success-box {
  background: #e8f5e9;
  border-left: 4px solid #4caf50;
  padding: 1rem;
  border-radius: 4px;
  color: #2e7d32;
  font-weight: 500;
  line-height: 1.8;
  margin-top: 0.5rem;
}

/* Tab 樣式 */
.tabs-container {
  margin: 2rem 0;
}

.tabs {
  display: flex;
  gap: 0.5rem;
  border-bottom: 2px solid #e0e0e0;
  padding: 0 1rem;
}

.tab {
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  color: #666;
  transition: all 0.3s ease;
  position: relative;
  bottom: -2px;
}

.tab:hover {
  color: #3498db;
  background: #f5f5f5;
}

.tab.active {
  color: #3498db;
  border-bottom-color: #3498db;
}
</style>
