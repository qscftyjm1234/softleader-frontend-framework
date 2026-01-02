<script setup lang="ts">
import IStack from '@/components/uiInterface/IStack.vue'
import ICard from '@/components/uiInterface/ICard.vue'

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
    title: '假資料',
    desc: 'Mock Data 與狀態檢視工具',
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
    title: '權限管理',
    desc: '角色與功能權限控制',
    icon: 'mdi-shield-account',
    to: '/showcase/permission',
    color: '#EF5350'
  },
  {
    title: '加解密',
    desc: 'AES、Base64 與雜湊',
    icon: 'mdi-lock-outline',
    to: '/showcase/encryption',
    color: '#42A5F5'
  },
  {
    title: '日誌系統',
    desc: '分級日誌與除錯追蹤',
    icon: 'mdi-console',
    to: '/showcase/logger',
    color: '#546E7A'
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
  }
]
</script>

<template>
  <div class="dashboard-container">
    <div class="bg-decoration"></div>

    <IStack
      direction="column"
      gap="3"
      class="content-wrapper"
    >
      <!-- Header -->
      <div class="header-section">
        <h1 class="page-title">元件模組</h1>
        <p class="page-desc">
          前端開發套件的功能演練與操作手冊，分為「介面元件」與「核心功能」兩大類別。
        </p>
      </div>

      <!-- Section 1: Components -->
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
            <ICard class="feature-card">
              <template #header>
                <div class="card-header">
                  <div
                    class="icon-box"
                    :style="{ background: `${item.color}20`, color: item.color }"
                  >
                    <v-icon
                      :icon="item.icon"
                      size="20"
                    />
                  </div>
                  <div>
                    <h3 class="card-title">{{ item.title }}</h3>
                  </div>
                </div>
              </template>
              <p class="card-desc">{{ item.desc }}</p>
            </ICard>
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
            <ICard class="feature-card">
              <template #header>
                <div class="card-header">
                  <div
                    class="icon-box"
                    :style="{ background: `${item.color}20`, color: item.color }"
                  >
                    <v-icon
                      :icon="item.icon"
                      size="20"
                    />
                  </div>
                  <div>
                    <h3 class="card-title">{{ item.title }}</h3>
                  </div>
                </div>
              </template>
              <p class="card-desc">{{ item.desc }}</p>
            </ICard>
          </NuxtLink>
        </div>
      </section>
    </IStack>
  </div>
</template>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  background: #0f172a;
  color: white;
  padding: 2rem;
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
    radial-gradient(circle at 80% 10%, rgba(56, 189, 248, 0.08), transparent 30%),
    radial-gradient(circle at 20% 90%, rgba(139, 92, 246, 0.08), transparent 30%);
  pointer-events: none;
  z-index: 1;
}

.content-wrapper {
  position: relative;
  z-index: 2;
  max-width: 1400px;
  margin: 0 auto;
}

/* Header */
.header-section {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: baseline;
  gap: 1rem;
}

.page-title .subtitle {
  font-size: 1.25rem;
  color: #64748b;
  font-weight: 400;
}

.page-desc {
  color: #94a3b8;
  font-size: 1.1rem;
  max-width: 800px;
}

/* Sections */
.group-section {
  margin-bottom: 2rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.header-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.comp-icon {
  background: rgba(41, 121, 255, 0.15);
  color: #2979ff;
}

.func-icon {
  background: rgba(255, 167, 38, 0.15);
  color: #ffa726;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #e2e8f0;
}

/* Grid Layout */
.grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.card-link {
  text-decoration: none;
  display: block;
}

.feature-card {
  height: 100%;
  background: rgba(30, 41, 59, 0.4) !important;
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(8px);
  transition: all 0.2s ease;
  border-radius: 16px;
  padding: 1.25rem;
}

.card-link:hover .feature-card {
  transform: translateY(-4px);
  background: rgba(30, 41, 59, 0.7) !important;
  border-color: rgba(255, 255, 255, 0.15) !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.icon-box {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #f1f5f9;
  margin: 0;
}

.card-subtitle {
  font-size: 0.85rem;
  color: #64748b;
}

.card-desc {
  color: #94a3b8;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-top: 0.5rem;
}
</style>
