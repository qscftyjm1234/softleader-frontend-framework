<script setup lang="ts">
import IStack from '@/components/uiInterface/IStack.vue'
import ICard from '@/components/uiInterface/ICard.vue'
import IButton from '@/components/uiInterface/IButton.vue'

const modules = [
  {
    title: '元件模組',
    description: '一覽所有元件、功能模組與範例程式碼，包含 UI 元件與業務邏輯展示。',
    icon: 'mdi-view-dashboard',
    to: '/showcase',
    color: '#00E5FF',
    gradient: 'linear-gradient(135deg, #00E5FF 0%, #2979FF 100%)'
  },
  {
    title: 'API 整合範例',
    description: '示範標準 API 請求模式、錯誤處理攔截器與 Mock API 模擬資料流。',
    icon: 'mdi-api',
    to: '/showcase/api-demo',
    color: '#FFB74D',
    gradient: 'linear-gradient(135deg, #FFB74D 0%, #FF6D00 100%)'
  }
]

const features = [
  {
    title: '日期時間',
    subtitle: '日期時間處理',
    icon: 'mdi-calendar-clock',
    to: '/showcase/datetime',
    color: '#00E676'
  },
  {
    title: '檔案處理',
    subtitle: '檔案操作整合',
    icon: 'mdi-file-swap-outline',
    to: '/showcase/file-upload',
    color: '#29B6F6'
  },
  {
    title: '資料檢測器',
    subtitle: '資料開發工具',
    icon: 'mdi-bug-outline',
    to: '/showcase/data-inspector',
    color: '#AA00FF'
  },
  {
    title: '更多功能',
    subtitle: '通用工具函式',
    icon: 'mdi-toolbox-outline',
    to: '/showcase',
    color: '#78909C'
  }
]
</script>

<template>
  <div class="portal-container">
    <div class="background-decoration"></div>

    <IStack
      direction="column"
      gap="4"
      align="center"
      class="portal-content"
    >
      <!-- Hero Section -->
      <div class="hero-section">
        <div class="hero-badge">前端開發套件</div>
        <h1 class="hero-title">
          企業級前端
          <br />
          <span class="gradient-text">標準化架構系統</span>
        </h1>
        <p class="hero-desc">
          前端標準化開發套件，整合 UI 介面、業務邏輯與核心工具。
          <br />
          加速專案開發效率，確保程式碼品質與一致性。
        </p>

        <IStack
          gap="1"
          justify="center"
          class="mt-6"
        >
          <NuxtLink
            v-slot="{ navigate }"
            to="/showcase"
            custom
          >
            <IButton
              size="large"
              prepend-icon="mdi-rocket-launch"
              class="cta-button"
              @click="navigate"
            >
              開始使用
            </IButton>
          </NuxtLink>
          <NuxtLink
            v-slot="{ navigate }"
            to="https://github.com/example/repo"
            target="_blank"
            custom
          >
            <IButton
              variant="outlined"
              size="large"
              prepend-icon="mdi-github"
              class="github-button"
              @click="navigate"
            >
              專案原始碼
            </IButton>
          </NuxtLink>
        </IStack>
      </div>

      <!-- Main Modules -->
      <div class="modules-grid">
        <NuxtLink
          v-for="mod in modules"
          :key="mod.title"
          :to="mod.to"
          class="module-link"
        >
          <ICard class="module-card">
            <template #header>
              <div class="module-header">
                <div
                  class="icon-wrapper"
                  :style="{ background: mod.gradient }"
                >
                  <v-icon
                    :icon="mod.icon"
                    size="28"
                    color="white"
                  />
                </div>
                <h3 class="module-title">{{ mod.title }}</h3>
              </div>
            </template>
            <p class="module-desc">{{ mod.description }}</p>
            <div class="module-action">
              <span>查看詳情</span>
              <v-icon
                icon="mdi-arrow-right"
                size="small"
              />
            </div>
          </ICard>
        </NuxtLink>
      </div>

      <!-- Feature Badges -->
      <div class="features-section">
        <h2 class="section-label">核心模組</h2>
        <div class="features-grid">
          <NuxtLink
            v-for="feat in features"
            :key="feat.title"
            :to="feat.to"
            class="feature-link"
          >
            <div class="feature-item">
              <div
                class="feature-icon"
                :style="{ color: feat.color, backgroundColor: `${feat.color}15` }"
              >
                <v-icon
                  :icon="feat.icon"
                  size="20"
                />
              </div>
              <div class="feature-info">
                <div class="feature-title">{{ feat.title }}</div>
                <div class="feature-subtitle">{{ feat.subtitle }}</div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </IStack>
  </div>
</template>

<style scoped>
.portal-container {
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background: #0f172a;
  overflow: hidden;
  font-family:
    'Inter',
    system-ui,
    -apple-system,
    sans-serif;
  color: white;
}

/* Background Effects */
.background-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 15% 50%, rgba(56, 189, 248, 0.1), transparent 25%),
    radial-gradient(circle at 85% 30%, rgba(139, 92, 246, 0.1), transparent 25%);
  z-index: 1;
  pointer-events: none;
}

.portal-content {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1000px;
}

/* Hero Section */
.hero-section {
  text-align: center;
  margin-bottom: 2rem;
  max-width: 800px;
}

.hero-badge {
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 100px;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #94a3b8;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(4px);
}

.hero-title {
  font-size: 4.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
}

.gradient-text {
  background: linear-gradient(135deg, #38bdf8 0%, #818cf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-desc {
  font-size: 1.25rem;
  color: #94a3b8;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}

.cta-button {
  background: white !important;
  color: #0f172a !important;
  font-weight: 600;
}

.github-button {
  border-color: rgba(255, 255, 255, 0.2) !important;
  color: white !important;
}

.github-button:hover {
  background: rgba(255, 255, 255, 0.1) !important;
}

/* Modules Grid */
.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  width: 100%;
}

.module-link {
  text-decoration: none;
  display: block;
}

.module-card {
  height: 100%;
  background: rgba(30, 41, 59, 0.5) !important;
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(12px);
  padding: 1.75rem;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.module-link:hover .module-card {
  transform: translateY(-5px);
  background: rgba(30, 41, 59, 0.8) !important;
  border-color: rgba(56, 189, 248, 0.3) !important;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.module-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.module-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin: 0;
}

.module-desc {
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.module-action {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #38bdf8;
  font-weight: 600;
  font-size: 0.9rem;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.module-link:hover .module-action {
  opacity: 1;
}

/* Features Section */
.features-section {
  width: 100%;
  text-align: center;
  margin-top: 1rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.section-label {
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  color: #475569;
  margin-bottom: 1.5rem;
  font-weight: 700;
}

.features-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.feature-link {
  text-decoration: none;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  transition: all 0.2s;
}

.feature-link:hover .feature-item {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
}

.feature-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-info {
  text-align: left;
}

.feature-title {
  color: #e2e8f0;
  font-weight: 600;
  font-size: 0.9rem;
}

.feature-subtitle {
  color: #64748b;
  font-size: 0.75rem;
}

/* Responsive */
@media (max-width: 640px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .portal-container {
    padding: 2rem 1rem;
  }

  .modules-grid {
    grid-template-columns: 1fr;
  }
}
</style>
