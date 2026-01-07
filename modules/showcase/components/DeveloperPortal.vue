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
      :gap="4"
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
          :gap="1"
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

/* Background Effects - Cleaned up */
.background-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 15% 20%, rgba(56, 189, 248, 0.08), transparent 40%),
    radial-gradient(circle at 85% 60%, rgba(139, 92, 246, 0.08), transparent 40%);
  z-index: 1;
  pointer-events: none;
}

@keyframes pulseBg {
  0% {
    opacity: 0.8;
  }
  100% {
    opacity: 1;
  }
}

.portal-content {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1200px; /* Increased max-width for breathing room */
  padding: 0 1rem;
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

/* Hero Section */
.hero-section {
  text-align: center;
  margin-bottom: 5rem; /* Increased separation */
  max-width: 800px;
  position: relative;
}

/* Visual Divider */
.hero-section::after {
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
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.25rem;
  background: rgba(255, 255, 255, 0.1); /* More solid */
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 100px;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #e2e8f0;
  margin-bottom: 2rem;
  backdrop-filter: blur(8px);
}

.hero-badge:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
  box-shadow: 0 0 25px rgba(139, 92, 246, 0.4);
  border-color: rgba(255, 255, 255, 0.3);
}

.hero-title {
  font-size: 4.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 2rem;
  letter-spacing: -0.02em;
  color: white;
}

.gradient-text {
  background: linear-gradient(135deg, #38bdf8 0%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% auto;
  animation: gradientFlow 5s linear infinite;
}

@keyframes gradientFlow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.hero-desc {
  font-size: 1.25rem;
  color: #e2e8f0; /* Brighter text */
  line-height: 1.8;
  max-width: 650px;
  margin: 0 auto;
  font-weight: 400;
}

/* Buttons */
.cta-button {
  background: white !important;
  color: #0f172a !important;
  font-weight: 700 !important;
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.3);
  transition:
    transform 0.2s,
    box-shadow 0.2s !important;
  border-radius: 50px !important;
  padding: 0 2rem !important;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.4);
}

.github-button {
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  color: white !important;
  backdrop-filter: blur(4px);
  background: rgba(255, 255, 255, 0.05) !important;
  border-radius: 50px !important;
  padding: 0 2rem !important;
}

.github-button:hover {
  background: rgba(255, 255, 255, 0.15) !important;
  border-color: rgba(255, 255, 255, 0.4) !important;
}

/* Modules Grid */
.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 2.5rem; /* Consistent large gap */
  width: 100%;
  margin-bottom: 4rem;
}

.module-link {
  text-decoration: none;
  display: block;
}

.module-card {
  height: 100%;
  /* Higher opacity for better contrast */
  background: rgba(30, 41, 59, 0.7) !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important; /* Brighter border */
  backdrop-filter: blur(20px);
  padding: 2.5rem;
  border-radius: 20px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.module-link:hover .module-card {
  transform: translateY(-8px);
  background: rgba(30, 41, 59, 0.9) !important;
  border-color: rgba(56, 189, 248, 0.5) !important;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.module-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.icon-wrapper {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.2) !important;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.module-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: white; /* Pure white */
  margin: 0;
  letter-spacing: -0.01em;
}

.module-desc {
  color: #cbd5e1; /* Lighter grey */
  line-height: 1.75;
  margin-bottom: 2rem;
  font-size: 1.05rem;
}

.module-action {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0.75rem 1.5rem;
  border-radius: 100px;
  background: rgba(56, 189, 248, 0.8); /* Solid Pill Button */
  transition: all 0.2s;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.module-link:hover .module-action {
  background: #0284c7;
  padding-right: 1.75rem; /* Slight expansion interaction */
}

/* Features Section */
.features-section {
  width: 100%;
  text-align: center;
  margin-top: 2rem;
  padding-top: 4rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.section-label {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #94a3b8;
  margin-bottom: 2.5rem;
  font-weight: 700;
}

.features-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.feature-link {
  text-decoration: none;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  transition: all 0.2s;
}

.feature-link:hover .feature-item {
  background: rgba(30, 41, 59, 0.8);
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.3);
}

.feature-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-title {
  color: #f1f5f9;
  font-weight: 600;
  font-size: 0.95rem;
}

.feature-subtitle {
  color: #94a3b8;
  font-size: 0.8rem;
  margin-top: 2px;
}

/* Responsive */
@media (max-width: 640px) {
  .hero-title {
    font-size: 3rem;
  }

  .portal-container {
    padding: 2rem 1rem;
  }

  .modules-grid {
    grid-template-columns: 1fr;
  }
}
</style>
