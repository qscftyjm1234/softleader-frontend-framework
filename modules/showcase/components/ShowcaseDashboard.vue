<script setup lang="ts">
const componentsList = [
  {
    title: '元件架構',
    desc: '三層架構設計與基礎元件總覽',
    icon: 'mdi-view-dashboard',
    to: '/showcase/component-showcase',
    color: '#2979FF'
  },
  {
    title: 'Icon',
    desc: 'MDI 圖示整合與自定義 SVG 支援',
    icon: 'mdi-emoticon-happy-outline',
    to: '/showcase/icon',
    color: '#F50057'
  },
  {
    title: '檔案上傳',
    desc: '拖曳上傳、預覽與驗證機制',
    icon: 'mdi-upload',
    to: '/showcase/file-upload',
    color: '#00B0FF'
  },
  {
    title: '檔案下載',
    desc: '多格式檔案下載與匯出',
    icon: 'mdi-download',
    to: '/showcase/file-download',
    color: '#00E5FF'
  },
  {
    title: '彈窗管理',
    desc: '統一的彈窗與對話框控制',
    icon: 'mdi-window-maximize',
    to: '/showcase/modal',
    color: '#AB47BC'
  },
  {
    title: '業務表單',
    desc: 'Email、手機與日期選擇等業務元件',
    icon: 'mdi-form-textbox',
    to: '/showcase/business-form',
    color: '#43a047'
  },
  {
    title: '載入狀態',
    desc: '全域 Loading Queue 管理',
    icon: 'mdi-progress-clock',
    to: '/showcase/loading',
    color: '#EC407A'
  },
  {
    title: '狀態檢視工具',
    desc: '狀態檢視工具',
    icon: 'mdi-eye-outline',
    to: '/showcase/data-inspector',
    color: '#7E57C2'
  },
  {
    title: '通知系統',
    desc: '全域 Snackbar 通知管理',
    icon: 'mdi-bell-ring-outline',
    to: '/showcase/notify',
    color: '#FF7043'
  }
]

const functionsList = [
  {
    title: 'API 管理',
    desc: 'Repository 模式與攔截器',
    icon: 'mdi-api',
    to: '/showcase/api-demo',
    color: '#FFA726'
  },
  {
    title: 'Mock API',
    desc: '前端模擬資料伺服器',
    icon: 'mdi-server-network',
    to: '/showcase/mock-api',
    color: '#FFCA28'
  },
  {
    title: '日期時間',
    desc: '格式化、計算與時區處理',
    icon: 'mdi-calendar-clock',
    to: '/showcase/datetime',
    color: '#66BB6A'
  },
  {
    title: '表單驗證',
    desc: '常用規則與客製化驗證',
    icon: 'mdi-checkbox-marked-circle-outline',
    to: '/showcase/validation',
    color: '#9CCC65'
  },
  {
    title: '格式化工具',
    desc: '數字、貨幣與字串格式化',
    icon: 'mdi-format-text',
    to: '/showcase/formatter',
    color: '#26A69A'
  },
  {
    title: '選項系統',
    desc: '集中式枚舉資料管理',
    icon: 'mdi-form-select',
    to: '/showcase/options',
    color: '#26C6DA'
  },
  {
    title: '本地儲存',
    desc: 'LocalStorage / Session 封裝',
    icon: 'mdi-database-outline',
    to: '/showcase/storage',
    color: '#8D6E63'
  },
  {
    title: '防抖節流',
    desc: '效能最佳化與執行控制',
    icon: 'mdi-timer-sand',
    to: '/showcase/debounce',
    color: '#78909C'
  },
  {
    title: '分頁管理',
    desc: '資料分頁邏輯與計算',
    icon: 'mdi-book-open-page-variant',
    to: '/showcase/pagination',
    color: '#5C6BC0'
  },

  {
    title: '加解密',
    desc: 'AES、Base64 與雜湊',
    icon: 'mdi-lock-outline',
    to: '/showcase/encryption',
    color: '#42A5F5'
  },

  {
    title: '錯誤處理',
    desc: '全域錯誤捕捉與回報',
    icon: 'mdi-alert-circle-outline',
    to: '/showcase/error-handler',
    color: '#E53935'
  },
  {
    title: '網路監控',
    desc: '連線狀態與速度偵測',
    icon: 'mdi-wifi',
    to: '/showcase/network',
    color: '#4DD0E1'
  },
  {
    title: '閒置偵測',
    desc: '使用者活動監控',
    icon: 'mdi-sleep',
    to: '/showcase/idle',
    color: '#90A4AE'
  },
  {
    title: '資安防護',
    desc: 'XSS、Headers 與安全機制',
    icon: 'mdi-security',

    to: '/showcase/security',
    color: '#D32F2F'
  },
  {
    title: '多語系',
    desc: '系統語系管理與切換',
    icon: 'mdi-translate',
    to: '/showcase/language',
    color: '#AB47BC'
  }
]

const guidesList = [
  {
    title: '開發指南',
    desc: 'ESLint、Git Hooks 與系統設定說明',
    icon: 'mdi-book-open-page-variant',
    to: '/showcase/development',
    color: '#607D8B'
  },
  {
    title: '開發規矩',
    desc: '命名規則、程式碼風格與最佳實踐',
    icon: 'mdi-ruler-square',
    to: '/showcase/rules',
    color: '#FF6F00'
  }
]
</script>

<template>
  <div class="dashboard-container">
    <div class="bg-decoration"></div>

    <div class="content-wrapper">
      <!-- Header -->
      <div class="header-section">
        <div class="hero-badge">前端開發套件</div>
        <h1 class="page-title">
          元件模組
          <span class="subtitle">Showcase</span>
        </h1>
        <p class="page-desc">
          前端開發套件的功能演練與操作手冊，分為「介面元件」與「核心功能」兩大類別。
        </p>
      </div>

      <!-- Section 1: Documentation (Moved to Top) -->
      <section class="group-section">
        <div class="section-header">
          <div class="header-icon doc-icon">
            <v-icon icon="mdi-book-open-variant" />
          </div>
          <h2 class="section-title">專案文件 (Documentation)</h2>
        </div>

        <div class="grid-layout">
          <NuxtLink
            v-for="item in guidesList"
            :key="item.to"
            :to="item.to"
            class="card-link"
          >
            <div class="feature-card">
              <div class="card-header">
                <div
                  class="icon-box"
                  :style="{ background: `${item.color}20`, color: item.color }"
                >
                  <v-icon
                    :icon="item.icon"
                    size="24"
                  />
                </div>
                <h3 class="card-title">{{ item.title }}</h3>
              </div>
              <p class="card-desc">{{ item.desc }}</p>
              <div class="card-action">
                <span>前往</span>
                <v-icon
                  icon="mdi-arrow-right"
                  size="14"
                />
              </div>
            </div>
          </NuxtLink>
        </div>
      </section>

      <!-- Section 2: Components -->
      <section class="group-section">
        <div class="section-header">
          <div class="header-icon comp-icon">
            <v-icon icon="mdi-puzzle-outline" />
          </div>
          <h2 class="section-title">介面元件 (UI Components)</h2>
        </div>

        <div class="grid-layout">
          <NuxtLink
            v-for="item in componentsList"
            :key="item.to"
            :to="item.to"
            class="card-link"
          >
            <div class="feature-card">
              <div class="card-header">
                <div
                  class="icon-box"
                  :style="{ background: `${item.color}20`, color: item.color }"
                >
                  <v-icon
                    :icon="item.icon"
                    size="24"
                  />
                </div>
                <h3 class="card-title">{{ item.title }}</h3>
              </div>
              <p class="card-desc">{{ item.desc }}</p>
              <div class="card-action">
                <span>前往</span>
                <v-icon
                  icon="mdi-arrow-right"
                  size="14"
                />
              </div>
            </div>
          </NuxtLink>
        </div>
      </section>

      <!-- Section 2: Functions -->
      <section class="group-section">
        <div class="section-header">
          <div class="header-icon func-icon">
            <v-icon icon="mdi-cogs" />
          </div>
          <h2 class="section-title">核心功能 (Core Functions)</h2>
        </div>

        <div class="grid-layout">
          <NuxtLink
            v-for="item in functionsList"
            :key="item.to"
            :to="item.to"
            class="card-link"
          >
            <div class="feature-card">
              <div class="card-header">
                <div
                  class="icon-box"
                  :style="{ background: `${item.color}20`, color: item.color }"
                >
                  <v-icon
                    :icon="item.icon"
                    size="24"
                  />
                </div>
                <h3 class="card-title">{{ item.title }}</h3>
              </div>
              <p class="card-desc">{{ item.desc }}</p>
              <div class="card-action">
                <span>前往</span>
                <v-icon
                  icon="mdi-arrow-right"
                  size="14"
                />
              </div>
            </div>
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  background: #0f172a; /* Deep Slate */
  color: white;
  padding: 4rem 2rem;
  position: relative;
  overflow: hidden;
  font-family: 'Inter', system-ui, sans-serif;
}

.bg-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    radial-gradient(circle at 15% 20%, rgba(56, 189, 248, 0.08), transparent 40%),
    radial-gradient(circle at 85% 60%, rgba(139, 92, 246, 0.08), transparent 40%);
  pointer-events: none;
  z-index: 1;
}

.dashboard-container > * {
  position: relative;
  z-index: 2;
}

.content-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Header */
.header-section {
  text-align: center;
  margin-bottom: 5rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
}

.header-section::after {
  content: '';
  position: absolute;
  bottom: -2.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

.hero-badge {
  display: inline-flex;
  padding: 0.5rem 1.25rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 100px;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #e2e8f0;
  margin-bottom: 2rem;
  backdrop-filter: blur(8px);
}

.page-title {
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: white;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.page-title .subtitle {
  font-size: 1.5rem;
  color: #94a3b8;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  background: linear-gradient(to right, #94a3b8, #cbd5e1);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.page-desc {
  color: #e2e8f0;
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.8;
}

/* Sections */
.group-section {
  margin-bottom: 5rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.header-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.comp-icon {
  background: rgba(41, 121, 255, 0.2);
  color: #2979ff;
  box-shadow: 0 0 20px rgba(41, 121, 255, 0.2);
}

.func-icon {
  background: rgba(255, 167, 38, 0.2);
  color: #ffa726;
  box-shadow: 0 0 20px rgba(255, 167, 38, 0.2);
}

.doc-icon {
  background: rgba(96, 125, 139, 0.2);
  color: #607d8b;
  box-shadow: 0 0 20px rgba(96, 125, 139, 0.2);
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #f1f5f9;
}

/* Grid Layout */
.grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.card-link {
  text-decoration: none;
  display: block;
}

.feature-card {
  height: 100%;
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  padding: 1.75rem;
  border-radius: 20px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
}

.card-link:hover .feature-card {
  transform: translateY(-8px);
  background: rgba(30, 41, 59, 0.85);
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 20px 40px -4px rgba(0, 0, 0, 0.4);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.icon-box {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin: 0;
  line-height: 1.3;
}

.card-desc {
  color: #cbd5e1;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  min-height: 3.2em; /* Ensure consistent height */
}

.card-action {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #38bdf8;
  font-weight: 600;
  font-size: 0.9rem;
  opacity: 0.8;
  transition: all 0.2s;
}

.card-link:hover .card-action {
  opacity: 1;
  transform: translateX(4px);
  color: #7dd3fc;
}
</style>
