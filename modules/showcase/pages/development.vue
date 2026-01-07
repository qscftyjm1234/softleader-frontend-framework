<script setup lang="ts">
import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'
import ShowcaseArchitecture from '../components/ShowcaseArchitecture.vue'

definePageMeta({
  title: '開發指南',
  icon: 'mdi-book-open-page-variant',
  layout: 'portal'
})

const router = useRouter()

const navigateToShowcase = () => {
  router.push('/showcase')
}

const navigateToRules = () => {
  router.push('/showcase/rules')
}
</script>

<template>
  <ShowcasePage
    title="開發指南 (Development Guide)"
    description="這裡記錄了專案的架構、規矩、用了哪些工具，以及如何把專案跑起來。"
    class="fade-in-up"
  >
    <!-- Quick Navigation -->
    <div class="mb-16 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        class="nav-card group"
        @click="navigateToShowcase"
      >
        <div class="nav-card-glow nav-card-glow-blue" />
        <div class="nav-card-content">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="nav-icon nav-icon-blue">
                <v-icon
                  color="blue-400"
                  size="28"
                >
                  mdi-view-grid-outline
                </v-icon>
              </div>
              <div>
                <div class="nav-title text-blue-400">瀏覽所有範例頁面</div>
                <div class="nav-desc">查看 26 個功能展示頁面</div>
              </div>
            </div>
            <v-icon
              color="blue-400"
              class="nav-arrow"
            >
              mdi-arrow-right
            </v-icon>
          </div>
        </div>
      </div>

      <div
        class="nav-card group"
        @click="navigateToRules"
      >
        <div class="nav-card-glow nav-card-glow-orange" />
        <div class="nav-card-content">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="nav-icon nav-icon-orange">
                <v-icon
                  color="orange-400"
                  size="28"
                >
                  mdi-ruler-square
                </v-icon>
              </div>
              <div>
                <div class="nav-title text-orange-400">查看開發規矩</div>
                <div class="nav-desc">完整的開發規範與最佳實踐</div>
              </div>
            </div>
            <v-icon
              color="orange-400"
              class="nav-arrow"
            >
              mdi-arrow-right
            </v-icon>
          </div>
        </div>
      </div>
    </div>

    <!-- 1. Environment Requirements -->
    <ShowcaseSection
      title="環境需求"
      icon="mdi-cog-outline"
      class="stagger-1"
    >
      <!-- Runtime Environment -->
      <ShowcaseCard
        title="執行環境 (Runtime)"
        description="專案運行所需的基礎環境"
        full-width
      >
        <div class="runtime-grid">
          <!-- Node.js -->
          <div class="runtime-card runtime-card-node">
            <div class="runtime-header">
              <div class="runtime-icon">
                <v-icon
                  color="emerald-400"
                  size="32"
                >
                  mdi-nodejs
                </v-icon>
              </div>
              <div class="runtime-info">
                <div class="runtime-name">Node.js</div>
                <div class="runtime-desc">JavaScript 執行環境</div>
              </div>
              <div class="runtime-version">v18.x / v20.x</div>
            </div>
            <div class="runtime-check">
              <div class="runtime-check-label">檢查版本</div>
              <ShowcaseCodeBlock
                code="node --version"
                language="bash"
              />
            </div>
          </div>

          <!-- npm / pnpm -->
          <div class="runtime-card runtime-card-npm">
            <div class="runtime-header">
              <div class="runtime-icon">
                <v-icon
                  color="emerald-400"
                  size="32"
                >
                  mdi-package-variant
                </v-icon>
              </div>
              <div class="runtime-info">
                <div class="runtime-name">npm / pnpm</div>
                <div class="runtime-desc">套件管理工具</div>
              </div>
              <div class="runtime-version">v9.x+ / v8.x+</div>
            </div>
            <div class="runtime-check">
              <div class="runtime-check-label">檢查版本</div>
              <ShowcaseCodeBlock
                code="npm --version"
                language="bash"
              />
            </div>
          </div>
        </div>
      </ShowcaseCard>
    </ShowcaseSection>

    <!-- 2. System Dependencies -->
    <ShowcaseSection
      title="系統套件"
      icon="mdi-package-variant-closed"
      class="stagger-2"
    >
      <!-- Framework & UI -->
      <div class="package-category">
        <div class="category-header">
          <div class="category-icon category-icon-emerald">
            <v-icon
              size="20"
              color="emerald-400"
            >
              mdi-vuejs
            </v-icon>
          </div>
          <h3 class="category-title">核心與介面 (Framework & UI)</h3>
        </div>
        <div class="packages-grid">
          <!-- Nuxt -->
          <div class="package-card">
            <div class="package-header">
              <div class="package-name">nuxt</div>
              <div class="package-version">^3.14.0</div>
            </div>
            <div class="package-desc">專案核心框架 (SSR, Route)</div>
            <div class="package-install">
              <ShowcaseCodeBlock
                code="npm install nuxt@3.14.0"
                language="bash"
              />
            </div>
          </div>

          <!-- Vuetify -->
          <div class="package-card">
            <div class="package-header">
              <div class="package-name">vuetify</div>
              <div class="package-version">^3.9.3</div>
            </div>
            <div class="package-desc">UI 元件庫 (Button, Input...)</div>
            <div class="package-install">
              <ShowcaseCodeBlock
                code="npm install vuetify@3.9.3"
                language="bash"
              />
            </div>
          </div>

          <!-- MDI Font -->
          <div class="package-card">
            <div class="package-header">
              <div class="package-name">@mdi/font</div>
              <div class="package-version">^7.4.47</div>
            </div>
            <div class="package-desc">Material Design 圖示集</div>
            <div class="package-install">
              <ShowcaseCodeBlock
                code="npm install @mdi/font@7.4.47"
                language="bash"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Logic & State -->
      <div class="package-category">
        <div class="category-header">
          <div class="category-icon category-icon-blue">
            <v-icon
              size="20"
              color="blue-400"
            >
              mdi-state-machine
            </v-icon>
          </div>
          <h3 class="category-title">邏輯與狀態 (Logic & State)</h3>
        </div>
        <div class="packages-grid">
          <!-- Pinia -->
          <div class="package-card">
            <div class="package-header">
              <div class="package-name">@pinia/nuxt</div>
              <div class="package-version">^0.11.2</div>
            </div>
            <div class="package-desc">全域狀態管理 (Store)</div>
            <div class="package-install">
              <ShowcaseCodeBlock
                code="npm install @pinia/nuxt@0.11.2"
                language="bash"
              />
            </div>
          </div>

          <!-- VueUse -->
          <div class="package-card">
            <div class="package-header">
              <div class="package-name">@vueuse/nuxt</div>
              <div class="package-version">^13.6.0</div>
            </div>
            <div class="package-desc">Vue 實用工具庫 (Hooks)</div>
            <div class="package-install">
              <ShowcaseCodeBlock
                code="npm install @vueuse/nuxt@13.6.0"
                language="bash"
              />
            </div>
          </div>

          <!-- i18n -->
          <div class="package-card">
            <div class="package-header">
              <div class="package-name">@nuxtjs/i18n</div>
              <div class="package-version">^10.0.3</div>
            </div>
            <div class="package-desc">多國語系支援</div>
            <div class="package-install">
              <ShowcaseCodeBlock
                code="npm install @nuxtjs/i18n@10.0.3"
                language="bash"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Utilities -->
      <div class="package-category">
        <div class="category-header">
          <div class="category-icon category-icon-orange">
            <v-icon
              size="20"
              color="orange-400"
            >
              mdi-toolbox-outline
            </v-icon>
          </div>
          <h3 class="category-title">工具函式 (Utilities)</h3>
        </div>
        <div class="packages-grid">
          <!-- DayJS -->
          <div class="package-card">
            <div class="package-header">
              <div class="package-name">dayjs</div>
              <div class="package-version">^1.11.13</div>
            </div>
            <div class="package-desc">輕量級日期格式化工具</div>
            <div class="package-install">
              <ShowcaseCodeBlock
                code="npm install dayjs@1.11.13"
                language="bash"
              />
            </div>
          </div>

          <!-- Lodash CloneDeep -->
          <div class="package-card">
            <div class="package-header">
              <div class="package-name">lodash.clonedeep</div>
              <div class="package-version">^4.5.0</div>
            </div>
            <div class="package-desc">深層複製 (Deep Clone) 工具</div>
            <div class="package-install">
              <ShowcaseCodeBlock
                code="npm install lodash.clonedeep@4.5.0"
                language="bash"
              />
            </div>
          </div>

          <!-- Nuxt Device -->
          <div class="package-card">
            <div class="package-header">
              <div class="package-name">@nuxtjs/device</div>
              <div class="package-version">^3.2.4</div>
            </div>
            <div class="package-desc">裝置偵測 (手機/電腦)</div>
            <div class="package-install">
              <ShowcaseCodeBlock
                code="npm install @nuxtjs/device@3.2.4"
                language="bash"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Code Quality -->
      <div class="package-category">
        <div class="category-header">
          <div class="category-icon category-icon-purple">
            <v-icon
              size="20"
              color="purple-400"
            >
              mdi-shield-check
            </v-icon>
          </div>
          <h3 class="category-title">品質確保 (Code Quality)</h3>
        </div>
        <div class="packages-grid">
          <!-- TypeScript -->
          <div class="package-card">
            <div class="package-header">
              <div class="package-name">typescript</div>
              <div class="package-version">^5.9.3</div>
            </div>
            <div class="package-desc">強型別語言支援</div>
            <div class="package-install">
              <ShowcaseCodeBlock
                code="npm install -D typescript@5.9.3"
                language="bash"
              />
            </div>
          </div>

          <!-- ESLint -->
          <div class="package-card">
            <div class="package-header">
              <div class="package-name">eslint</div>
              <div class="package-version">^9.39.2</div>
            </div>
            <div class="package-desc">程式碼檢查與規範</div>
            <div class="package-install">
              <ShowcaseCodeBlock
                code="npm install -D eslint@9.39.2"
                language="bash"
              />
            </div>
          </div>

          <!-- Prettier -->
          <div class="package-card">
            <div class="package-header">
              <div class="package-name">prettier</div>
              <div class="package-version">^3.6.2</div>
            </div>
            <div class="package-desc">程式碼自動排版工具</div>
            <div class="package-install">
              <ShowcaseCodeBlock
                code="npm install -D prettier@3.6.2"
                language="bash"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Git Workflow -->
      <div class="package-category">
        <div class="category-header">
          <div class="category-icon category-icon-red">
            <v-icon
              size="20"
              color="red-400"
            >
              mdi-git
            </v-icon>
          </div>
          <h3 class="category-title">Git 工作流 (Workflow)</h3>
        </div>
        <div class="packages-grid">
          <!-- Husky -->
          <div class="package-card">
            <div class="package-header">
              <div class="package-name">husky</div>
              <div class="package-version">^9.1.7</div>
            </div>
            <div class="package-desc">Git Hooks (Commit 前檢查)</div>
            <div class="package-install">
              <ShowcaseCodeBlock
                code="npm install -D husky@9.1.7"
                language="bash"
              />
            </div>
          </div>

          <!-- Commitizen -->
          <div class="package-card">
            <div class="package-header">
              <div class="package-name">commitizen</div>
              <div class="package-version">^4.3.1</div>
            </div>
            <div class="package-desc">協助撰寫標準 Commit 訊息</div>
            <div class="package-install">
              <ShowcaseCodeBlock
                code="npm install -D commitizen@4.3.1"
                language="bash"
              />
            </div>
          </div>

          <!-- Lint Staged -->
          <div class="package-card">
            <div class="package-header">
              <div class="package-name">lint-staged</div>
              <div class="package-version">^16.2.7</div>
            </div>
            <div class="package-desc">只對暫存區檔案執行檢查</div>
            <div class="package-install">
              <ShowcaseCodeBlock
                code="npm install -D lint-staged@16.2.7"
                language="bash"
              />
            </div>
          </div>

          <!-- Standard Version -->
          <div class="package-card">
            <div class="package-header">
              <div class="package-name">standard-version</div>
              <div class="package-version">^9.5.0</div>
            </div>
            <div class="package-desc">自動產生版號與 Changelog</div>
            <div class="package-install">
              <ShowcaseCodeBlock
                code="npm install -D standard-version@9.5.0"
                language="bash"
              />
            </div>
          </div>
        </div>
      </div>
    </ShowcaseSection>

    <!-- 3. Initialization -->
    <ShowcaseSection
      title="把專案跑起來 (Init)"
      icon="mdi-rocket-launch"
      class="stagger-3"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ShowcaseCard
          title="安裝步驟"
          full-width
        >
          <div class="steps-list">
            <div class="step-item">
              <div class="step-badge">1</div>
              <div class="step-content">
                <strong>裝套件</strong>
                <ShowcaseCodeBlock
                  code="npm install"
                  language="bash"
                  class="mt-2"
                />
              </div>
            </div>
            <div class="step-item">
              <div class="step-badge">2</div>
              <div class="step-content">
                <strong>設定環境變數</strong>
                <p class="text-slate-400 text-sm mt-1 mb-2">從範例檔複製一份，填入你的設定</p>
                <ShowcaseCodeBlock
                  code="cp .env.example .env"
                  language="bash"
                />
              </div>
            </div>
            <div class="step-item">
              <div class="step-badge">3</div>
              <div class="step-content">
                <strong>啟動！</strong>
                <ShowcaseCodeBlock
                  code="npm run dev"
                  language="bash"
                  class="mt-2"
                />
              </div>
            </div>
          </div>
        </ShowcaseCard>

        <ShowcaseCard
          title="常用指令"
          full-width
        >
          <div class="space-y-4">
            <div>
              <div class="text-sm font-bold text-slate-200 mb-1">產生靜態檔案 (上線用)</div>
              <ShowcaseCodeBlock
                code="npm run generate"
                language="bash"
              />
            </div>
            <div>
              <div class="text-sm font-bold text-slate-200 mb-1">檢查程式碼</div>
              <ShowcaseCodeBlock
                code="npm run lint"
                language="bash"
              />
            </div>
            <div>
              <div class="text-sm font-bold text-slate-200 mb-1">檢查型別</div>
              <ShowcaseCodeBlock
                code="npx nuxi typecheck"
                language="bash"
              />
            </div>
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>
  </ShowcasePage>
</template>

<style scoped>
/* Animations */
.fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.stagger-1 {
  animation-delay: 0.1s;
}
.stagger-2 {
  animation-delay: 0.2s;
}
.stagger-3 {
  animation-delay: 0.3s;
}
.stagger-4 {
  animation-delay: 0.4s;
}
.stagger-5 {
  animation-delay: 0.5s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Naming Rules */
.naming-rules {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.rule-item {
  display: flex;
  align-items: stretch;
  background: rgba(15, 23, 42, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  overflow: hidden;
}

.rule-meta {
  width: 140px;
  background: rgba(30, 41, 59, 0.6);
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
}

.rule-type {
  font-size: 0.7rem;
  font-weight: 800;
  color: #94a3b8;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}

.rule-desc {
  color: #e2e8f0;
  font-size: 0.9rem;
  font-weight: 600;
}

.rule-content {
  flex: 1;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.75rem;
}

.rule-syntax {
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.1rem;
  font-weight: 700;
  color: white;
}

.rule-syntax .keyword {
  color: #38bdf8;
}
.rule-syntax .divider {
  color: #475569;
  margin: 0 0.5rem;
}

.rule-examples {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.rule-examples span {
  font-size: 0.85rem;
  font-family: 'JetBrains Mono', monospace;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.good {
  background: rgba(34, 197, 94, 0.1);
  color: #4ade80;
  border: 1px solid rgba(34, 197, 94, 0.2);
}
.bad {
  background: rgba(239, 68, 68, 0.1);
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.2);
  text-decoration: line-through;
  opacity: 0.8;
}

/* Initialization Steps */
.steps-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.step-item {
  display: flex;
  gap: 1rem;
}

.step-badge {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #3b82f6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.step-content {
  flex: 1;
}

/* Navigation Cards */
.nav-card {
  position: relative;
  padding: 2rem;
  border-radius: 1.25rem;
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  cursor: pointer;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.nav-card:hover {
  transform: translateY(-4px);
  background: rgba(30, 41, 59, 0.85);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 40px -4px rgba(0, 0, 0, 0.4);
}

.nav-card-glow {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.4s;
  pointer-events: none;
  border-radius: 1.25rem;
}

.nav-card:hover .nav-card-glow {
  opacity: 1;
}

.nav-card-glow-blue {
  background: radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.15), transparent 70%);
}

.nav-card-glow-orange {
  background: radial-gradient(circle at 50% 0%, rgba(251, 146, 60, 0.15), transparent 70%);
}

.nav-card-content {
  position: relative;
  z-index: 1;
}

.nav-icon {
  width: 64px;
  height: 64px;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.nav-icon-blue {
  background: rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.nav-card:hover .nav-icon-blue {
  background: rgba(59, 130, 246, 0.25);
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
}

.nav-icon-orange {
  background: rgba(251, 146, 60, 0.15);
  border: 1px solid rgba(251, 146, 60, 0.3);
}

.nav-card:hover .nav-icon-orange {
  background: rgba(251, 146, 60, 0.25);
  box-shadow: 0 0 20px rgba(251, 146, 60, 0.3);
}

.nav-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  letter-spacing: -0.01em;
}

.nav-desc {
  font-size: 0.9375rem;
  color: #94a3b8;
  line-height: 1.5;
}

.nav-arrow {
  transition: transform 0.3s;
}

.nav-card:hover .nav-arrow {
  transform: translateX(6px);
}

/* Runtime Environment Cards */
.runtime-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}

.runtime-card {
  position: relative;
  padding: 1.75rem;
  border-radius: 1rem;
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s;
  overflow: hidden;
}

.runtime-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, rgba(16, 185, 129, 0.5), rgba(52, 211, 153, 0.5));
  opacity: 0;
  transition: opacity 0.3s;
}

.runtime-card:hover {
  background: rgba(30, 41, 59, 0.6);
  border-color: rgba(16, 185, 129, 0.3);
  transform: translateY(-2px);
}

.runtime-card:hover::before {
  opacity: 1;
}

.runtime-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.runtime-icon {
  width: 56px;
  height: 56px;
  border-radius: 0.875rem;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s;
}

.runtime-card:hover .runtime-icon {
  background: rgba(16, 185, 129, 0.15);
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.2);
}

.runtime-info {
  flex: 1;
  min-width: 0;
}

.runtime-name {
  font-size: 1.125rem;
  font-weight: 700;
  color: #e2e8f0;
  font-family: 'JetBrains Mono', monospace;
  margin-bottom: 0.25rem;
}

.runtime-desc {
  font-size: 0.8125rem;
  color: #94a3b8;
  line-height: 1.4;
}

.runtime-version {
  padding: 0.375rem 0.875rem;
  border-radius: 9999px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.25);
  color: #6ee7b7;
  font-size: 0.8125rem;
  font-weight: 600;
  font-family: 'JetBrains Mono', monospace;
  white-space: nowrap;
}

.runtime-check {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.runtime-check-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Package Categories */
.package-category {
  margin-bottom: 3rem;
}

.category-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.category-icon {
  width: 40px;
  height: 40px;
  border-radius: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.category-icon-emerald {
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.category-icon-blue {
  background: rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.category-icon-orange {
  background: rgba(251, 146, 60, 0.15);
  border: 1px solid rgba(251, 146, 60, 0.3);
}

.category-icon-purple {
  background: rgba(168, 85, 247, 0.15);
  border: 1px solid rgba(168, 85, 247, 0.3);
}

.category-icon-red {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.category-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #e2e8f0;
  margin: 0;
  letter-spacing: -0.01em;
}

/* Packages Grid */
.packages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
}

.package-card {
  position: relative;
  padding: 1.5rem;
  border-radius: 0.875rem;
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.package-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, rgba(59, 130, 246, 0.5), rgba(139, 92, 246, 0.5));
  opacity: 0;
  transition: opacity 0.3s;
}

.package-card:hover {
  background: rgba(30, 41, 59, 0.6);
  border-color: rgba(59, 130, 246, 0.3);
  transform: translateY(-2px);
}

.package-card:hover::before {
  opacity: 1;
}

.package-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.package-name {
  font-size: 1rem;
  font-weight: 700;
  color: #e2e8f0;
  font-family: 'JetBrains Mono', monospace;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.package-version {
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.25);
  color: #93c5fd;
  font-size: 0.75rem;
  font-weight: 600;
  font-family: 'JetBrains Mono', monospace;
  white-space: nowrap;
  flex-shrink: 0;
}

.package-desc {
  font-size: 0.875rem;
  color: #94a3b8;
  line-height: 1.5;
  min-height: 2.625rem;
}

.package-install {
  margin-top: auto;
}

/* Directory List */
.dir-list {
  list-style: none;
  padding: 0;
  margin: 0;
  color: #cbd5e1;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
}

.dir-list > li {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.dir-list > li:last-child {
  border-bottom: none;
}

.dir-name {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #e2e8f0;
  margin-bottom: 0.25rem;
}

.dir-desc {
  padding-left: 1.75rem;
  font-size: 0.85rem;
  color: #64748b;
  font-family: sans-serif;
}

.sub-list {
  list-style: none;
  padding-left: 1.75rem;
  margin-top: 0.5rem;
}

.sub-list li {
  position: relative;
  padding-left: 1rem;
  color: #94a3b8;
  font-size: 0.85rem;
  margin-bottom: 0.25rem;
}

.sub-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 6px;
  height: 1px;
  background: #475569;
}

/* Git Flow Simple */
.flow-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 0.5rem;
  overflow-x: auto;
}

.flow-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.step-num {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(30, 41, 59, 1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  font-size: 0.8rem;
  font-weight: bold;
}

.success .step-num {
  background: rgba(16, 185, 129, 0.1);
  border-color: #10b981;
  color: #10b981;
}

.step-title {
  font-size: 0.8rem;
  color: #cbd5e1;
  font-weight: 600;
}

.flow-connector {
  flex: 1;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  margin: 0 1rem;
  margin-bottom: 1.5rem;
}

/* Response */
@media (max-width: 768px) {
  .naming-rules .rule-item {
    flex-direction: column;
  }
  .naming-rules .rule-meta {
    width: 100%;
    flex-direction: row;
    gap: 1rem;
    padding: 0.75rem 1rem;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
}
</style>
