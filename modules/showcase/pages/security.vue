<script setup lang="ts">
/**
 * @功能 資安防護展示頁面
 * @description 展示所有前端資安防護機制與配置
 */

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
</script>

<template>
  <div class="security-showcase">
    <!-- 頁面標題 -->
    <div class="page-header">
      <h1>🔒 前端資安防護系統</h1>
      <p class="subtitle">企業級前端安全防護機制 - 完整的資料保護與防洩漏方案</p>
    </div>

    <!-- 資安狀態總覽 -->
    <div class="security-status">
      <div class="status-card">
        <div class="status-icon">
          {{ isSecurityEnabled ? '✅' : '⚠️' }}
        </div>
        <div class="status-info">
          <div class="status-label">資安模式</div>
          <div class="status-value">
            {{ isSecurityEnabled ? '已啟用' : '已關閉' }}
          </div>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-value">{{ stats.total }}</div>
          <div class="stat-label">總功能數</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ stats.enabled }}</div>
          <div class="stat-label">已啟用</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ stats.highLevel }}</div>
          <div class="stat-label">高級防護</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ stats.coverage }}%</div>
          <div class="stat-label">覆蓋率</div>
        </div>
      </div>
    </div>

    <!-- 功能分類展示 -->
    <div
      v-for="category in categorizedFeatures"
      :key="category.name"
      class="category-section"
    >
      <h2 class="category-title">{{ category.name }}</h2>
      <div class="features-grid">
        <div
          v-for="feature in category.features"
          :key="feature.id"
          class="feature-card"
          :class="{ enabled: feature.enabled, disabled: !feature.enabled }"
        >
          <div class="feature-header">
            <div class="feature-status">
              <span
                class="status-badge"
                :class="feature.enabled ? 'active' : 'inactive'"
              >
                {{ feature.enabled ? '啟用' : '停用' }}
              </span>
              <span
                class="level-badge"
                :class="`level-${feature.level}`"
              >
                {{ feature.level === 'high' ? '高' : feature.level === 'medium' ? '中' : '低' }}
              </span>
            </div>
            <h3 class="feature-name">{{ feature.name }}</h3>
          </div>

          <p class="feature-description">{{ feature.description }}</p>

          <div class="feature-details">
            <div class="detail-row">
              <span class="detail-label">實作方式:</span>
              <code class="detail-value">{{ feature.implementation }}</code>
            </div>
            <div class="detail-row">
              <span class="detail-label">影響範圍:</span>
              <span class="detail-value">{{ feature.impact }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- HTTP 安全標頭 -->
    <div class="category-section">
      <h2 class="category-title">HTTP 安全標頭</h2>
      <div class="headers-list">
        <div
          v-for="header in securityHeaders"
          :key="header.name"
          class="header-item"
        >
          <div class="header-name">{{ header.name }}</div>
          <div class="header-value">{{ header.value }}</div>
          <div class="header-description">{{ header.description }}</div>
        </div>
      </div>
    </div>

    <!-- 測試區域 -->
    <div
      v-if="isSecurityEnabled"
      class="category-section"
    >
      <h2 class="category-title">功能測試</h2>
      <div class="test-buttons">
        <button
          class="test-btn"
          @click="testScreenshotProtection"
        >
          測試截圖防護
        </button>
        <button
          class="test-btn"
          @click="testIdleTimeout"
        >
          測試閒置鎖定
        </button>
      </div>
      <div class="test-instructions">
        <h3>測試說明：</h3>
        <ul>
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
    </div>

    <!-- 配置說明 -->
    <div class="category-section">
      <h2 class="category-title">配置說明</h2>
      <div class="config-info">
        <div class="config-item">
          <h3>啟用資安模式</h3>
          <p>
            在
            <code>.env</code>
            檔案中設定：
          </p>
          <pre><code>NUXT_PUBLIC_ENABLE_SECURITY_MODE=true</code></pre>
        </div>

        <div class="config-item">
          <h3>調整功能開關</h3>
          <p>
            編輯
            <code>plugins/security.client.ts</code>
            中的
            <code>securityOptions</code>
            ：
          </p>
          <pre><code>const securityOptions = {
  disableContextMenu: true,
  disableDevTools: true,
  disableTextSelection: false,
  // ... 更多選項
}</code></pre>
        </div>

        <div class="config-item">
          <h3>HTTP 標頭配置</h3>
          <p>
            編輯
            <code>core/config/security.ts</code>
            設定安全標頭
          </p>
        </div>
      </div>
    </div>

    <!-- 檔案路徑參考 -->
    <div class="category-section">
      <h2 class="category-title">相關檔案</h2>
      <div class="file-list">
        <div class="file-item">
          <code>plugins/security.client.ts</code>
          <span class="file-desc">客戶端資安防護主程式（785 行）</span>
        </div>
        <div class="file-item">
          <code>core/config/security.ts</code>
          <span class="file-desc">HTTP 安全標頭配置</span>
        </div>
        <div class="file-item">
          <code>docs/TOKEN_SECURITY.md</code>
          <span class="file-desc">Token 安全管理文檔</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 頁面容器 */
.security-showcase {
  max-width: 1400px;
  margin: 0 auto;
  padding: 32px;
  font-family:
    'Microsoft JhengHei',
    -apple-system,
    sans-serif;
}

/* 頁面標題 */
.page-header {
  text-align: center;
  margin-bottom: 48px;
}

.page-header h1 {
  font-size: 36px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 12px;
}

.subtitle {
  font-size: 16px;
  color: #666;
  margin: 0;
}

/* 資安狀態 */
.security-status {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 48px;
  color: white;
}

.status-card {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.status-icon {
  font-size: 48px;
}

.status-label {
  font-size: 14px;
  opacity: 0.9;
}

.status-value {
  font-size: 24px;
  font-weight: 700;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
}

.stat-item {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  opacity: 0.9;
}

/* 分類區塊 */
.category-section {
  margin-bottom: 48px;
}

.category-title {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 3px solid #667eea;
}

/* 功能卡片網格 */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.feature-card {
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 24px;
  transition: all 0.3s ease;
}

.feature-card.enabled {
  border-color: #4caf50;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.1);
}

.feature-card.disabled {
  opacity: 0.6;
  border-color: #ccc;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.feature-header {
  margin-bottom: 16px;
}

.feature-status {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.status-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.status-badge.active {
  background: #e8f5e9;
  color: #2e7d32;
}

.status-badge.inactive {
  background: #f5f5f5;
  color: #757575;
}

.level-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.level-badge.level-high {
  background: #ffebee;
  color: #c62828;
}

.level-badge.level-medium {
  background: #fff3e0;
  color: #ef6c00;
}

.level-badge.level-low {
  background: #e3f2fd;
  color: #1565c0;
}

.feature-name {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.feature-description {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 16px;
}

.feature-details {
  border-top: 1px solid #e0e0e0;
  padding-top: 16px;
}

.detail-row {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 13px;
}

.detail-label {
  color: #999;
  min-width: 80px;
}

.detail-value {
  color: #333;
  flex: 1;
}

.detail-value code {
  background: #f5f5f5;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
}

/* HTTP 標頭列表 */
.headers-list {
  display: grid;
  gap: 16px;
}

.header-item {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
}

.header-name {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.header-value {
  font-size: 14px;
  color: #667eea;
  font-family: 'Courier New', monospace;
  margin-bottom: 8px;
}

.header-description {
  font-size: 13px;
  color: #666;
  line-height: 1.6;
}

/* 測試區域 */
.test-buttons {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.test-btn {
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.test-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.test-instructions {
  background: #f8f9fa;
  border-left: 4px solid #667eea;
  padding: 20px;
  border-radius: 8px;
}

.test-instructions h3 {
  margin-top: 0;
  margin-bottom: 12px;
  font-size: 16px;
}

.test-instructions ul {
  margin: 0;
  padding-left: 24px;
}

.test-instructions li {
  margin-bottom: 8px;
  line-height: 1.6;
}

.test-instructions kbd {
  display: inline-block;
  padding: 2px 6px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 12px;
  font-family: monospace;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* 配置說明 */
.config-info {
  display: grid;
  gap: 24px;
}

.config-item {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 24px;
}

.config-item h3 {
  margin-top: 0;
  margin-bottom: 12px;
  font-size: 18px;
  color: #1a1a1a;
}

.config-item p {
  margin-bottom: 12px;
  color: #666;
}

.config-item pre {
  background: #1e1e1e;
  color: #d4d4d4;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 0;
}

.config-item code {
  font-family: 'Courier New', monospace;
  font-size: 13px;
}

/* 檔案列表 */
.file-list {
  display: grid;
  gap: 12px;
}

.file-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
}

.file-item code {
  background: #f5f5f5;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 13px;
  color: #667eea;
  font-weight: 600;
}

.file-desc {
  font-size: 13px;
  color: #999;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .security-showcase {
    padding: 16px;
  }

  .page-header h1 {
    font-size: 28px;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .test-buttons {
    flex-direction: column;
  }

  .file-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>
