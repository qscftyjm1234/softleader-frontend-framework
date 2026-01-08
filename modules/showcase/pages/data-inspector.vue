<script setup lang="ts">
import { computed, ref } from 'vue'
import { useUserStore } from '~/stores/user'
import { useFeatureStore } from '~/stores/features'
import { useAppDevice } from '~/composables/useAppDevice'

// Components
import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'
import IStack from '@/components/uiInterface/IStack.vue'
import ITabs from '@/components/uiInterface/ITabs.vue'
import ShowcaseAlert from '../components/ShowcaseAlert.vue'

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
  strategy,
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

// Helper: Format Data for Display
const formatData = (data: any) => {
  try {
    return JSON.stringify(data, null, 2)
  } catch {
    return String(data)
  }
}

// --- 6. 應用範例 (Usage Examples) ---
const activeUsageTab = ref('composables')
const usageTabs = [
  { label: 'Composables (i18n)', value: 'composables' },
  { label: 'Pinia Stores (User)', value: 'pinia' },
  { label: 'Runtime Config', value: 'config' }
]

// Interactive Actions
const setLang = (lang: string) => {
  locale.value = lang
}

const toggleLogin = () => {
  if (userStore.isLoggedIn) {
    userStore.logout()
  } else {
    userStore.login({
      id: 'DEMO_USER',
      username: 'demo_user',
      roles: ['user']
    })
  }
}

const codeExamples = {
  composables: computed(
    () => `// 目前語系: \${locale.value}
const { locale } = useI18n()

// 切換語系
locale.value = 'en'
locale.value = 'zh-TW'`
  ),
  pinia: computed(
    () => `// 目前狀態: \${userStore.isLoggedIn ? '已登入' : '未登入'}
const userStore = useUserStore()

// 登入
userStore.login({ username: 'demo' })

// 登出
userStore.logout()`
  ),
  config: computed(
    () => `// 取得執行時設定
const config = useRuntimeConfig()

// 讀取設定值
console.log(config.public.apiBase)
// Output: \${configData.value.apiBase || '(undefined)'}`
  )
}

definePageMeta({
  title: '資料檢測器 (Data Inspector)',
  icon: 'mdi-eye-check-outline',
  layout: 'portal'
})
</script>

<template>
  <ShowcasePage
    title="資料檢視器 (Data Inspector)"
    description="開發專用的即時狀態檢測工具，整合環境變數、Pinia 狀態與模擬資料預覽。"
  >
    <!-- 使用說明 -->
    <ShowcaseSection title="這是什麼？ (Usage)">
      <ShowcaseAlert
        type="info"
        title="開發輔助工具 (DevTool)"
      >
        <div class="text-sm leading-relaxed text-slate-200">
          這是一個
          <strong>「除錯儀表板」</strong>
          ，
          <strong class="text-amber-300">不需要在程式碼中引入</strong>
          。
          <br />
          當您在開發過程中遇到以下疑問時，請直接打開此頁面查看：
          <ul class="list-disc list-inside mt-2 space-y-1 text-slate-300">
            <li>「現在環境變數 (Runtime Config) 到底吃到什麼值？」</li>
            <li>「手機版判斷 (isMobile) 為什麼沒生效？UserAgent 是什麼？」</li>
            <li>「Pinia 的 User Store 現在裡面存了什麼資料？」</li>
            <li>「i18n 目前是切換到哪一個語系？」</li>
          </ul>
        </div>
      </ShowcaseAlert>
    </ShowcaseSection>

    <!-- 檢測範圍 -->
    <ShowcaseSection title="功能總覽">
      <ShowcaseCard
        title="監控範圍"
        description="本工具自動整合並監控以下與全域相關的開發資訊"
        full-width
      >
        <div class="demo-area">
          <ShowcaseCodeBlock
            code="// 自動監控以下來源 (唯讀):
1. useAppDevice()    // 裝置環境 (Mobile/Desktop/App)
2. useI18n()         // 語系狀態
3. useRuntimeConfig() // 公開環境變數
4. Pinia Stores      // 全域狀態 (User, Features)
5. Mock Data         // 開發用模擬資料"
            label="監控來源清單"
          />

          <p
            class="method-desc"
            style="margin-top: 1.5rem; margin-bottom: 1rem"
          >
            <strong>核心效益：</strong>
          </p>
          <ul class="benefit-list">
            <li>
              <strong>環境感知:</strong>
              即時檢視 UserAgent、裝置類型 (Mobile/Desktop) 與 i18n 設定
            </li>
            <li>
              <strong>狀態監控:</strong>
              直接觀察 Pinia Store ($state) 的即時變化，無需 DevTools
            </li>
            <li>
              <strong>資料預覽:</strong>
              提供結構化的 Mock Data 與 Schema 展示，方便對照開發
            </li>
            <li>
              <strong>開發友善:</strong>
              所有資料皆以 JSON 樹狀結構呈現，方便複製與比對
            </li>
          </ul>
        </div>
      </ShowcaseCard>
    </ShowcaseSection>

    <!-- 1. 環境與系統資訊 -->
    <ShowcaseSection title="環境與系統資訊 (Environment)">
      <div class="component-grid">
        <ShowcaseCard
          title="裝置資訊 (Device)"
          description="裝置資訊"
        >
          <div class="demo-area">
            <ShowcaseCodeBlock
              :code="formatData(deviceInfo)"
              language="json"
              label="詳細資訊"
            />
          </div>
        </ShowcaseCard>

        <ShowcaseCard
          title="多語系設定 (i18n)"
          description="多語系設定"
        >
          <div class="demo-area">
            <ShowcaseCodeBlock
              :code="formatData(i18nInfo)"
              language="json"
              label="詳細資訊"
            />
          </div>
        </ShowcaseCard>

        <ShowcaseCard
          title="執行環境設定 (Runtime Config)"
          description="執行時參數"
          full-width
        >
          <div class="demo-area">
            <ShowcaseCodeBlock
              :code="formatData(configData)"
              language="json"
              label="公開設定 (Public)"
            />
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- 2. 全域狀態管理 (Pinia) -->
    <ShowcaseSection title="全域狀態管理 (Pinia)">
      <IStack
        direction="column"
        gap="1"
        class="state-container"
      >
        <ShowcaseCodeBlock
          :code="formatData(userStore.$state)"
          language="json"
          label="使用者狀態 ($state)"
        />
        <ShowcaseCodeBlock
          :code="formatData(featuresStore.$state)"
          language="json"
          label="功能開關 ($state)"
        />
      </IStack>
    </ShowcaseSection>

    <!-- 3. 模組資料結構 (Mock Data) -->
    <ShowcaseSection title="模組資料結構 (Mock Data)">
      <IStack
        direction="column"
        gap="1"
        class="state-container"
      >
        <p class="method-desc mb-2">以下展示各業務模組 API 預期的回傳格式範例</p>

        <ShowcaseCodeBlock
          :code="formatData(authMockData)"
          language="json"
          label="會員模組 - 使用者資料 (模擬)"
        />
        <ShowcaseCodeBlock
          :code="formatData(policySchema)"
          language="json"
          label="保險模組 - 保單結構"
        />
      </IStack>
    </ShowcaseSection>

    <!-- 應用範例 -->
    <ShowcaseSection
      title="互動式範例 (Interactive Playground)"
      icon="🎮"
    >
      <div class="flex flex-col gap-4">
        <ITabs
          v-model="activeUsageTab"
          :options="usageTabs"
        />

        <ShowcaseCard
          :title="usageTabs.find((t) => t.value === activeUsageTab)?.label"
          description="試著操作以下按鈕，觀察右側或下方的即時變化"
          full-width
        >
          <div class="demo-grid">
            <!-- Left: Method / Control -->
            <div class="control-panel">
              <h4 class="panel-title">操作 (Method)</h4>

              <!-- Composable: i18n -->
              <div
                v-if="activeUsageTab === 'composables'"
                class="flex gap-2"
              >
                <button
                  class="glass-btn"
                  :class="{ active: locale === 'zh-TW' }"
                  @click="setLang('zh-TW')"
                >
                  🇹🇼 Set zh-TW
                </button>
                <button
                  class="glass-btn"
                  :class="{ active: locale === 'en' }"
                  @click="setLang('en')"
                >
                  🇺🇸 Set en
                </button>
              </div>

              <!-- Pinia: User -->
              <div
                v-if="activeUsageTab === 'pinia'"
                class="flex gap-2"
              >
                <button
                  class="glass-btn"
                  @click="toggleLogin"
                >
                  {{ userStore.isLoggedIn ? '登出 (Logout)' : '模擬登入 (Login)' }}
                </button>
              </div>

              <!-- Config -->
              <div
                v-if="activeUsageTab === 'config'"
                class="text-slate-400 text-sm"
              >
                設定檔為唯讀屬性，僅供讀取。
              </div>

              <div class="mt-4">
                <ShowcaseCodeBlock
                  :code="codeExamples[activeUsageTab as keyof typeof codeExamples]"
                  language="typescript"
                  label="程式碼範例"
                />
              </div>
            </div>

            <!-- Right: Live Output -->
            <div class="output-panel">
              <h4 class="panel-title">即時輸出 (Live Output)</h4>

              <ShowcaseCodeBlock
                v-if="activeUsageTab === 'composables'"
                :code="formatData(i18nInfo)"
                language="json"
                label="i18n State"
              />

              <ShowcaseCodeBlock
                v-if="activeUsageTab === 'pinia'"
                :code="formatData(userStore.$state)"
                language="json"
                label="User Store State"
              />

              <ShowcaseCodeBlock
                v-if="activeUsageTab === 'config'"
                :code="formatData(configData)"
                language="json"
                label="Runtime Config"
              />
            </div>
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>
  </ShowcasePage>
</template>

<style scoped>
/* Benefit List */
.benefit-list {
  padding-left: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  margin: 0;
}

.benefit-list li {
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.05) 0%, rgba(99, 102, 241, 0.05) 100%);
  padding: 1.25rem 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(56, 189, 248, 0.15);
  color: #e2e8f0;
  font-size: 0.95rem;
  line-height: 1.7;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.benefit-list li::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background: linear-gradient(180deg, #38bdf8 0%, #6366f1 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.benefit-list li:hover {
  border-color: rgba(56, 189, 248, 0.3);
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.08) 0%, rgba(99, 102, 241, 0.08) 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(56, 189, 248, 0.15);
}

.benefit-list li:hover::before {
  opacity: 1;
}

.benefit-list li strong {
  color: #38bdf8;
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1.05em;
  font-weight: 600;
  letter-spacing: 0.3px;
}

/* Method Description */
.method-desc {
  color: #cbd5e1;
  font-size: 0.95rem;
  line-height: 1.7;
  margin: 0;
}

.glass-btn {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.3);
  color: #94a3b8;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.85rem;
  font-weight: 500;
}

.glass-btn:hover {
  background: rgba(56, 189, 248, 0.1);
  border-color: #38bdf8;
  color: #38bdf8;
}

.state-container {
  background: rgba(30, 41, 59, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
}

/* Demo Grid */
.demo-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .demo-grid {
    grid-template-columns: 1fr;
  }
}

.control-panel,
.output-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.panel-title {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
}
</style>
