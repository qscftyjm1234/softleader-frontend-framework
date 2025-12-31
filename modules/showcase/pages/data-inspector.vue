<script setup lang="ts">
import DataPreview from '../components/DataPreview.vue'
import { useUserStore } from '~/stores/user'
import { useFeatureStore } from '~/stores/features'
import { useAppDevice } from '~/composables/useAppDevice'

// --- 1. 平台與裝置資訊 (即時) ---
const device = useAppDevice()
// 將 device 的響應式物件轉換為純物件以便展示
const deviceInfo = computed(() => ({
  deviceName: device.deviceName.value,
  isMobile: device.isMobile.value,
  isDesktop: device.isDesktop.value,
  isApp: device.isApp.value,
  isIOS: device.isIOS.value,
  isAndroid: device.isAndroid.value,
  userAgent: device.userAgent
}))

// --- 2. i18n 多語系資訊 (即時) ---
const { locale, locales, strategy } = useI18n()
const i18nInfo = computed(() => ({
  currentLocale: locale.value,
  strategy: strategy,
  availableLocales: locales.value
}))

// --- 3. Pinia Stores 狀態 (即時) ---
const userStore = useUserStore()
const featuresStore = useFeatureStore()

// --- 4. 模擬資料 ---
// Auth 模組模擬資料
const authMockData = {
  id: 'USER_001',
  username: 'demo_developer',
  roles: ['admin', 'developer'],
  metadata: { department: 'Frontend', level: 3 }
}

// Insurance 保險模組資料結構
const policySchema = {
  policyNo: { type: 'string', required: true, label: '保單號碼' },
  status: { type: 'enum', options: ['active', 'expired'], label: '狀態' },
  insured: { name: { type: 'string' }, dob: { type: 'date' } },
  premium: { type: 'number', currency: 'TWD' }
}

// --- 5. 執行時設定 (即時) ---
const config = useRuntimeConfig()
const configData = computed(() => config.public)

// --- 6. UI 控制 ---
const devicePreview = ref()
const i18nPreview = ref()
const configPreview = ref()
const userStorePreview = ref()
const featuresStorePreview = ref()
const authMockPreview = ref()
const policyPreview = ref()

const allPreviews = computed(() =>
  [
    devicePreview.value,
    i18nPreview.value,
    configPreview.value,
    userStorePreview.value,
    featuresStorePreview.value,
    authMockPreview.value,
    policyPreview.value
  ].filter(Boolean)
)

const expandAll = () => {
  allPreviews.value.forEach((p: any) => p?.setExpanded(true))
}

const collapseAll = () => {
  allPreviews.value.forEach((p: any) => p?.setExpanded(false))
}

definePageMeta({
  title: '資料檢視器',
  icon: 'mdi-database-search'
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
        <h1 class="page-title">資料檢視器 (Data Inspector)</h1>
      </div>
      <div class="header-actions">
        <p class="page-desc">
          展示系統即時狀態 (Environment, Stores) 與各模組的資料結構 (Schema, Mock)。
        </p>
        <div class="action-buttons">
          <button
            class="btn-action"
            @click="expandAll"
          >
            展開全部
          </button>
          <button
            class="btn-action"
            @click="collapseAll"
          >
            收合全部
          </button>
        </div>
      </div>
    </div>

    <div class="inspector-content">
      <!-- 系統環境區塊 (Environment) -->
      <section class="module-section env-section">
        <h2 class="section-title">
          <span class="icon">⚙️</span>
          Environment & System (環境資訊)
        </h2>
        <div class="card-content">
          <DataPreview
            ref="devicePreview"
            title="Device Info (裝置資訊)"
            :data="deviceInfo"
          />
          <div class="divider"></div>
          <DataPreview
            ref="i18nPreview"
            title="i18n Settings (多語系設定)"
            :data="i18nInfo"
          />
          <div class="divider"></div>
          <DataPreview
            ref="configPreview"
            title="Runtime Config (Public) (執行時參數)"
            :data="configData"
          />
        </div>
      </section>

      <!-- 全域狀態區塊 (State) -->
      <section class="module-section state-section">
        <h2 class="section-title">
          <span class="icon">📦</span>
          Global State (全域狀態 - Pinia)
        </h2>
        <div class="card-content">
          <DataPreview
            ref="userStorePreview"
            title="User Store State ($state)"
            :data="userStore.$state"
          />
          <div class="divider"></div>
          <DataPreview
            ref="featuresStorePreview"
            title="Features Store State ($state)"
            :data="featuresStore.$state"
          />
        </div>
      </section>

      <!-- 模組資料結構區塊 (Modules Mock) -->
      <section class="module-section mock-section">
        <h2 class="section-title">
          <span class="icon">🧩</span>
          Module Data Structures (模組資料結構)
        </h2>
        <div class="card-content">
          <p class="section-desc">以下展示各業務模組 API 預期的回傳格式範例</p>
          >
          <DataPreview
            ref="authMockPreview"
            title="Auth Module - User Profile (Mock)"
            :data="authMockData"
          />
          <div class="divider"></div>
          <DataPreview
            ref="policyPreview"
            title="Insurance Module - Policy Schema"
            :data="policySchema"
          />
        </div>
      </section>
    </div>
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

/* Header */
.page-header {
  margin-bottom: 2.5rem;
}
.header-main {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}
.back-link {
  text-decoration: none;
  color: #666;
  margin-right: 1.5rem;
  font-weight: 500;
  padding: 0.5rem;
  border-radius: 4px;
  background: #f5f5f5;
  transition: all 0.2s;
}
.back-link:hover {
  background: #e0e0e0;
  color: #333;
}
.page-title {
  font-size: 2rem;
  font-weight: 400;
  margin: 0;
}
.page-desc {
  color: #666;
  font-size: 1.05rem;
  margin-left: 0.5rem;
}

/* Content */
.inspector-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.module-section {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.section-title {
  padding: 1rem 1.5rem;
  margin: 0;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  background: #fafafa;
}
.icon {
  margin-right: 0.75rem;
}

/* Section Colors */
.env-section .section-title {
  color: #5c6bc0;
} /* Indigo */
.state-section .section-title {
  color: #ef5350;
} /* Red */
.mock-section .section-title {
  color: #66bb6a;
} /* Green */

.card-content {
  padding: 1.5rem;
}
.section-desc {
  margin-bottom: 1rem;
  color: #666;
  font-size: 0.9rem;
}
.divider {
  height: 1px;
  background-color: #eee;
  margin: 0.8rem 0;
}

.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 1rem;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.btn-action {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.btn-action:hover {
  background: #f0f0f0;
  border-color: #bbb;
}

.btn-action:active {
  background: #e0e0e0;
}
</style>
