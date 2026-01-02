<script setup lang="ts">
/**
 * @功能 資安防護展示頁面
 * @description 展示所有前端資安防護機制與設定
 */
import { ref, computed } from 'vue'
import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'

// 從 runtime config 讀取資安設定
const config = useRuntimeConfig()
const isSecurityEnabled = computed(
  () => config.public.enableSecurityMode === true || config.public.enableSecurityMode === 'true'
)

// 資安功能分類
interface SecurityFeature {
  id: string
  name: string
  description: string
  enabled: boolean
  level: 'high' | 'medium' | 'low'
  category: string
  implementation: string
  impact: string
}

// 所有資安功能清單
const securityFeatures = ref<SecurityFeature[]>([
  // 基礎防護
  {
    id: 'contextMenu',
    name: '禁用右鍵選單',
    description: '防止使用者透過右鍵選單檢視原始碼或複製內容',
    enabled: true,
    level: 'medium',
    category: '基礎防護',
    implementation: 'document.addEventListener("contextmenu")',
    impact: '阻止右鍵選單彈出'
  },
  {
    id: 'devTools',
    name: '禁用開發者工具快捷鍵',
    description: '阻止 F12、Ctrl+Shift+I、Ctrl+U 等開發者工具快捷鍵',
    enabled: true,
    level: 'high',
    category: '基礎防護',
    implementation: 'keydown event listener',
    impact: '無法使用快捷鍵開啟 DevTools'
  },
  {
    id: 'textSelection',
    name: '禁用文字選取',
    description: '防止使用者選取並複製頁面文字',
    enabled: false,
    level: 'low',
    category: '基礎防護',
    implementation: 'CSS user-select: none',
    impact: '無法選取文字（依需求開啟）'
  },
  {
    id: 'dragDrop',
    name: '禁用拖曳',
    description: '防止拖曳圖片或連結到其他應用程式',
    enabled: true,
    level: 'medium',
    category: '基礎防護',
    implementation: 'dragstart/drop event prevention',
    impact: '無法拖曳元素'
  },
  {
    id: 'console',
    name: '生產環境移除 Console',
    description: '在正式環境中禁用所有 console 輸出',
    enabled: true,
    level: 'medium',
    category: '基礎防護',
    implementation: 'console.log = noop (production only)',
    impact: '正式環境無 console 輸出'
  },

  // 截圖防護
  {
    id: 'printScreen',
    name: 'Print Screen 偵測',
    description: '偵測 PrintScreen 按鍵並立即模糊畫面',
    enabled: true,
    level: 'high',
    category: '截圖防護',
    implementation: 'keydown/keyup event + blur overlay',
    impact: '按下截圖鍵時畫面模糊'
  },
  {
    id: 'screenshotTools',
    name: 'Windows 截圖工具偵測',
    description: '偵測 Win+Shift+S 並先發制人模糊',
    enabled: true,
    level: 'high',
    category: '截圖防護',
    implementation: 'Shift key preemptive blur',
    impact: '截圖工具啟動前模糊'
  },
  {
    id: 'macScreenshot',
    name: 'MacOS 截圖偵測',
    description: '偵測 Cmd+Shift+3/4/5 截圖快捷鍵',
    enabled: true,
    level: 'high',
    category: '截圖防護',
    implementation: 'metaKey + shiftKey detection',
    impact: 'Mac 截圖時模糊'
  },
  {
    id: 'visibilityBlur',
    name: '視窗失焦模糊',
    description: '切換視窗或分頁時自動模糊畫面',
    enabled: true,
    level: 'high',
    category: '截圖防護',
    implementation: 'visibilitychange + blur/focus events',
    impact: '離開頁面時模糊'
  },
  {
    id: 'screenCapture',
    name: '螢幕錄影偵測',
    description: '偵測 getDisplayMedia API 呼叫（螢幕分享/錄影）',
    enabled: true,
    level: 'high',
    category: '截圖防護',
    implementation: 'getDisplayMedia API interception',
    impact: '螢幕錄影時模糊並警告'
  },
  {
    id: 'canvasCapture',
    name: '防止 Canvas 截圖',
    description: '攔截 canvas.toDataURL 和 toBlob 方法',
    enabled: true,
    level: 'high',
    category: '截圖防護',
    implementation: 'HTMLCanvasElement prototype override',
    impact: 'Canvas 截圖回傳空白圖片'
  },

  // 進階防護
  {
    id: 'devToolsDetection',
    name: '開發者工具開啟偵測',
    description: '偵測開發者工具是否被開啟（視窗尺寸差異）',
    enabled: true,
    level: 'medium',
    category: '進階防護',
    implementation: 'window size threshold check',
    impact: '正式環境偵測 DevTools'
  },
  {
    id: 'printProtection',
    name: '列印保護',
    description: '列印時隱藏所有內容',
    enabled: true,
    level: 'medium',
    category: '進階防護',
    implementation: '@media print CSS',
    impact: '列印時顯示警告訊息'
  },
  {
    id: 'navigation',
    name: '禁用導航快捷鍵',
    description: '禁用上一頁、重新整理、新分頁等快捷鍵',
    enabled: true,
    level: 'medium',
    category: '進階防護',
    implementation: 'keydown event prevention',
    impact: '無法使用瀏覽器導航鍵'
  },
  {
    id: 'backNavigation',
    name: '防止上一頁',
    description: '防止使用者返回上一頁',
    enabled: true,
    level: 'low',
    category: '進階防護',
    implementation: 'history.pushState + popstate',
    impact: '無法返回上一頁'
  },
  {
    id: 'idleTimeout',
    name: '閒置超時鎖定',
    description: '閒置 3 分鐘後自動模糊並鎖定畫面',
    enabled: true,
    level: 'high',
    category: '進階防護',
    implementation: 'activity events + timeout',
    impact: '閒置後自動鎖定'
  },
  {
    id: 'kioskMode',
    name: 'Kiosk 模式',
    description: '全螢幕模式，隱藏網址列和瀏覽器控制項',
    enabled: false,
    level: 'high',
    category: '進階防護',
    implementation: 'requestFullscreen API',
    impact: '強制全螢幕（依需求開啟）'
  }
])

// HTTP 安全標頭
const securityHeaders = ref([
  {
    name: 'X-Frame-Options',
    value: 'SAMEORIGIN',
    description: '防止 Clickjacking 攻擊，只允許同源網站嵌入 iframe'
  },
  {
    name: 'X-Content-Type-Options',
    value: 'nosniff',
    description: '防止 MIME Type Sniffing，瀏覽器不會自動偵測檔案類型'
  },
  {
    name: 'X-XSS-Protection',
    value: '1; mode=block',
    description: 'XSS 過濾器，阻擋偵測到的 XSS 攻擊'
  },
  {
    name: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
    description: '控制 Referrer 資訊傳送，跨域時只傳送 origin'
  },
  {
    name: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
    description: '強制 HTTPS 連線 (HSTS)，有效期 1 年'
  },
  {
    name: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=()',
    description: '限制瀏覽器 API 使用，禁用相機、麥克風、地理位置等'
  },
  {
    name: 'Content-Security-Policy',
    value: 'Report-Only Mode',
    description: '內容安全策略（目前為報告模式，不阻擋）'
  }
])

// 統計資料
const stats = computed(() => {
  const total = securityFeatures.value.length
  const enabled = securityFeatures.value.filter((f) => f.enabled).length
  const highLevel = securityFeatures.value.filter((f) => f.level === 'high' && f.enabled).length

  return {
    total,
    enabled,
    disabled: total - enabled,
    highLevel,
    coverage: Math.round((enabled / total) * 100)
  }
})

// 按分類分組
const categorizedFeatures = computed(() => {
  const categories = ['基礎防護', '截圖防護', '進階防護']
  return categories.map((category) => ({
    name: category,
    features: securityFeatures.value.filter((f) => f.category === category)
  }))
})

// 測試功能（僅開發環境）
const testScreenshotProtection = () => {
  alert('請嘗試按下 PrintScreen 或 Win+Shift+S 來測試截圖防護')
}

const testIdleTimeout = () => {
  alert('請保持 3 分鐘不操作來測試閒置鎖定功能')
}

definePageMeta({
  title: '資安防護 (Security)',
  icon: 'mdi-shield-lock',
  layout: 'portal'
})
</script>

<template>
  <ShowcasePage
    title="前端資安防護系統 (Security System)"
    description="企業級前端安全防護機制 - 完整的資料保護與防洩漏方案。"
  >
    <!-- 核心特色 -->
    <ShowcaseSection title="核心特色 (Core Features)">
      <ShowcaseCard
        title="全方位防護機制"
        description="企業級前端資安解決方案"
        full-width
      >
        <ul class="benefit-list">
          <li>
            <strong>基礎防護:</strong>
            或是禁用右鍵、選取、複製與拖曳，防止資料被輕易竊取
          </li>
          <li>
            <strong>防截圖機制:</strong>
            智能偵測 PrintScreen 與截圖工具，自動模糊畫面保護敏感資訊
          </li>
          <li>
            <strong>開發者限制:</strong>
            禁用 F12 與開發者工具快捷鍵，並偵測 DevTools 開啟狀態
          </li>
          <li>
            <strong>企業級控管:</strong>
            支援閒置自動鎖定、浮水印與 Kiosk 模式，符合高規格資安要求
          </li>
        </ul>
      </ShowcaseCard>
    </ShowcaseSection>

    <!-- 資安狀態總覽 -->
    <ShowcaseSection
      title="Security Status (資安狀態)"
      icon="📊"
    >
      <div class="component-grid">
        <!-- Mode Status -->
        <ShowcaseCard
          title="Security Mode"
          :description="isSecurityEnabled ? '已啟用 (Enabled)' : '已關閉 (Disabled)'"
        >
          <div class="flex items-center justify-center p-4">
            <div
              class="text-6xl"
              :class="isSecurityEnabled ? 'text-green-400' : 'text-yellow-400'"
            >
              {{ isSecurityEnabled ? '✅' : '⚠️' }}
            </div>
          </div>
        </ShowcaseCard>

        <!-- Stats -->
        <ShowcaseCard
          title="Overview Stats"
          description="防護功能統計"
          full-width
        >
          <div class="stats-container grid grid-cols-2 md:grid-cols-4 gap-4 p-4 text-center">
            <div class="stat-item p-4 bg-slate-800 rounded-lg">
              <div class="text-3xl font-bold text-white mb-2">
                {{ stats.total }}
              </div>
              <div class="text-slate-400 text-sm">總功能數</div>
            </div>
            <div class="stat-item p-4 bg-slate-800 rounded-lg">
              <div class="text-3xl font-bold text-green-400 mb-2">
                {{ stats.enabled }}
              </div>
              <div class="text-slate-400 text-sm">已啟用</div>
            </div>
            <div class="stat-item p-4 bg-slate-800 rounded-lg">
              <div class="text-3xl font-bold text-red-400 mb-2">
                {{ stats.highLevel }}
              </div>
              <div class="text-slate-400 text-sm">高級防護</div>
            </div>
            <div class="stat-item p-4 bg-slate-800 rounded-lg">
              <div class="text-3xl font-bold text-blue-400 mb-2">{{ stats.coverage }}%</div>
              <div class="text-slate-400 text-sm">覆蓋率</div>
            </div>
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- 功能分類展示 -->
    <ShowcaseSection
      v-for="category in categorizedFeatures"
      :key="category.name"
      :title="category.name"
      icon="🛡️"
    >
      <div class="component-grid">
        <ShowcaseCard
          v-for="feature in category.features"
          :key="feature.id"
          :title="feature.name"
          :description="feature.description"
        >
          <!-- Status Badges -->
          <div class="flex gap-2 mb-4">
            <span
              class="px-2 py-1 rounded text-xs font-bold"
              :class="
                feature.enabled ? 'bg-green-900/50 text-green-400' : 'bg-slate-700 text-slate-400'
              "
            >
              {{ feature.enabled ? '啟用' : '停用' }}
            </span>
            <span
              class="px-2 py-1 rounded text-xs font-bold"
              :class="{
                'bg-red-900/50 text-red-300': feature.level === 'high',
                'bg-orange-900/50 text-orange-300': feature.level === 'medium',
                'bg-blue-900/50 text-blue-300': feature.level === 'low'
              }"
            >
              {{ feature.level === 'high' ? '高' : feature.level === 'medium' ? '中' : '低' }}
            </span>
          </div>

          <!-- Details -->
          <div class="space-y-2 text-sm">
            <div class="flex gap-2">
              <span class="text-slate-500 w-16 text-right shrink-0">實作:</span>
              <code class="text-pink-300 bg-slate-800 px-1 rounded break-all">
                {{ feature.implementation }}
              </code>
            </div>
            <div class="flex gap-2">
              <span class="text-slate-500 w-16 text-right shrink-0">影響:</span>
              <span class="text-slate-300">{{ feature.impact }}</span>
            </div>
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- HTTP 安全標頭 -->
    <ShowcaseSection
      title="HTTP Headers (安全標頭)"
      icon="🔒"
    >
      <div class="component-grid">
        <ShowcaseCard
          v-for="header in securityHeaders"
          :key="header.name"
          :title="header.name"
          :description="header.description"
          full-width
        >
          <div class="result-display w-full">
            {{ header.value }}
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- 測試區域 -->
    <ShowcaseSection
      v-if="isSecurityEnabled"
      title="Test Playground (功能測試)"
      icon="🧪"
    >
      <div class="component-grid">
        <ShowcaseCard
          title="互動測試"
          description="手動觸發安全機制測試"
          full-width
        >
          <div class="flex flex-wrap gap-4 mb-6">
            <button
              class="glass-btn primary"
              @click="testScreenshotProtection"
            >
              測試截圖防護
            </button>
            <button
              class="glass-btn primary"
              @click="testIdleTimeout"
            >
              測試閒置鎖定
            </button>
          </div>

          <div class="instructions p-4 bg-slate-800/50 rounded-lg text-slate-300 text-sm">
            <h3 class="font-bold text-white mb-2">測試說明：</h3>
            <ul class="list-disc pl-5 space-y-1">
              <li>
                按下
                <kbd>PrintScreen</kbd>
                或
                <kbd>Win</kbd>
                +
                <kbd>Shift</kbd>
                +
                <kbd>S</kbd>
                測試截圖防護
              </li>
              <li>
                按下
                <kbd>F12</kbd>
                測試開發者工具禁用
              </li>
              <li>嘗試右鍵點擊測試右鍵選單禁用</li>
              <li>切換視窗測試失焦模糊</li>
              <li>閒置 3 分鐘測試自動鎖定</li>
            </ul>
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- 設定與檔案 -->
    <ShowcaseSection
      title="Configuration & References"
      icon="⚙️"
    >
      <div class="component-grid">
        <ShowcaseCard
          title="How to Enable"
          description="啟用資安模式 (.env)"
        >
          <ShowcaseCodeBlock
            code="NUXT_PUBLIC_ENABLE_SECURITY_MODE=true"
            language="bash"
            label=".env"
          />
        </ShowcaseCard>

        <ShowcaseCard
          title="Feature Toggles"
          description="調整功能開關 (plugins/security.client.ts)"
        >
          <ShowcaseCodeBlock
            code="const securityOptions = {
  disableContextMenu: true,
  disableDevTools: true,
  disableTextSelection: false,
  // ... 更多選項
}"
            label="security.client.ts"
          />
        </ShowcaseCard>

        <ShowcaseCard
          title="Related Files"
          description="相關檔案路徑參考"
          full-width
        >
          <div class="space-y-3">
            <div
              class="flex items-center justify-between p-3 bg-slate-800 rounded border border-slate-700"
            >
              <code class="text-blue-400">plugins/security.client.ts</code>
              <span class="text-slate-400 text-sm">客戶端資安防護主程式</span>
            </div>
            <div
              class="flex items-center justify-between p-3 bg-slate-800 rounded border border-slate-700"
            >
              <code class="text-blue-400">core/config/security.ts</code>
              <span class="text-slate-400 text-sm">HTTP 安全標頭設定</span>
            </div>
            <div
              class="flex items-center justify-between p-3 bg-slate-800 rounded border border-slate-700"
            >
              <code class="text-blue-400">docs/TOKEN_SECURITY.md</code>
              <span class="text-slate-400 text-sm">Token 安全管理文件</span>
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
</style>
