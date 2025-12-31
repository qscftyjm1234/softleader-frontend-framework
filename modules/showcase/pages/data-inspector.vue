<script setup lang="ts">
import { computed, ref } from 'vue'
import { useUserStore } from '~/stores/user'
import { useFeatureStore } from '~/stores/features'
import { useAppDevice } from '~/composables/useAppDevice'

// Components
import DataPreview from '../components/DataPreview.vue'
import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import IButton from '@/components/uiInterface/IButton.vue'
import IStack from '@/components/uiInterface/IStack.vue'

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
  <ShowcasePage
    title="資料檢視器 (Data Inspector)"
    description="展示系統即時狀態 (Environment, Stores) 與各模組的資料結構 (Schema, Mock)。"
  >
    <template #header-extra>
      <IStack
        gap="0.5"
        class="mt-4"
      >
        <IButton
          variant="outlined"
          @click="expandAll"
        >
          展開全部
        </IButton>
        <IButton
          variant="outlined"
          @click="collapseAll"
        >
          收合全部
        </IButton>
      </IStack>
    </template>

    <!-- 系統環境區塊 (Environment) -->
    <ShowcaseSection
      title="Environment & System (環境資訊)"
      icon="⚙️"
    >
      <IStack
        direction="column"
        gap="1"
        style="padding: 1.5rem"
      >
        <DataPreview
          ref="devicePreview"
          title="Device Info (裝置資訊)"
          :data="deviceInfo"
        />
        <DataPreview
          ref="i18nPreview"
          title="i18n Settings (多語系設定)"
          :data="i18nInfo"
        />
        <DataPreview
          ref="configPreview"
          title="Runtime Config (Public) (執行時參數)"
          :data="configData"
        />
      </IStack>
    </ShowcaseSection>

    <!-- 全域狀態區塊 (State) -->
    <ShowcaseSection
      title="Global State (全域狀態 - Pinia)"
      icon="📦"
    >
      <IStack
        direction="column"
        gap="1"
        style="padding: 1.5rem"
      >
        <DataPreview
          ref="userStorePreview"
          title="User Store State ($state)"
          :data="userStore.$state"
        />
        <DataPreview
          ref="featuresStorePreview"
          title="Features Store State ($state)"
          :data="featuresStore.$state"
        />
      </IStack>
    </ShowcaseSection>

    <!-- 模組資料結構區塊 (Modules Mock) -->
    <ShowcaseSection
      title="Module Data Structures (模組資料結構)"
      icon="🧩"
    >
      <IStack
        direction="column"
        gap="1"
        style="padding: 1.5rem"
      >
        <p style="color: #666; font-size: 0.9rem">以下展示各業務模組 API 預期的回傳格式範例</p>

        <DataPreview
          ref="authMockPreview"
          title="Auth Module - User Profile (Mock)"
          :data="authMockData"
        />
        <DataPreview
          ref="policyPreview"
          title="Insurance Module - Policy Schema"
          :data="policySchema"
        />
      </IStack>
    </ShowcaseSection>
  </ShowcasePage>
</template>
