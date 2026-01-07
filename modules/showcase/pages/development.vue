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
</script>

<template>
  <ShowcasePage
    title="開發指南 (Development Guide)"
    description="這裡記錄了專案的架構、規矩、用了哪些工具，以及如何把專案跑起來。"
    class="fade-in-up"
  >
    <!-- 1. System Architecture -->
    <ShowcaseSection
      title="系統架構 (Architecture)"
      icon="mdi-sitemap"
      class="stagger-1"
    >
      <ShowcaseArchitecture />

      <div class="mt-6">
        <ShowcaseCard
          title="為什麼要分層？"
          description="各司其職，讓程式碼更好維護"
          full-width
        >
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div class="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <strong class="text-orange-400 block mb-2">UI Interface (純皮)</strong>
              <div class="text-slate-400">
                只管「長相」，不管功能。
                <br />
                像是單純的積木，任何人都能拿去用。
              </div>
            </div>
            <div class="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <strong class="text-blue-400 block mb-2">UI Business (有腦)</strong>
              <div class="text-slate-400">
                負責「功能」與「資料」。
                <br />
                這層會呼叫 API、處理驗證邏輯。
              </div>
            </div>
            <div class="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <strong class="text-emerald-400 block mb-2">Pages (組裝)</strong>
              <div class="text-slate-400">
                負責「排版」。
                <br />
                把上面兩種元件組裝起來，變成使用者看到的頁面。
              </div>
            </div>
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- 2. Tech Stack -->
    <ShowcaseSection
      title="我們用了什麼 (Tech Stack)"
      icon="mdi-layers-triple"
      class="stagger-2"
    >
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <ShowcaseCard title="地基 (Core)">
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2 text-slate-300">
              <v-icon
                icon="mdi-nuxt"
                color="green"
              />
              Nuxt 3
            </div>
            <div class="flex items-center gap-2 text-slate-300">
              <v-icon
                icon="mdi-vuejs"
                color="green"
              />
              Vue 3.4+
            </div>
            <div class="flex items-center gap-2 text-slate-300">
              <v-icon
                icon="mdi-language-typescript"
                color="blue"
              />
              TypeScript
            </div>
          </div>
        </ShowcaseCard>

        <ShowcaseCard title="資料與邏輯">
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2 text-slate-300">
              <v-icon
                icon="mdi-fruit-pineapple"
                color="yellow"
              />
              Pinia (狀態)
            </div>
            <div class="flex items-center gap-2 text-slate-300">
              <v-icon
                icon="mdi-api"
                color="orange"
              />
              Ofetch (API)
            </div>
            <div class="flex items-center gap-2 text-slate-300">
              <v-icon
                icon="mdi-link-variant"
                color="cyan"
              />
              VueUse (工具)
            </div>
          </div>
        </ShowcaseCard>

        <ShowcaseCard title="樣式與圖標">
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2 text-slate-300">
              <v-icon
                icon="mdi-tailwind"
                color="cyan"
              />
              Tailwind CSS
            </div>
            <div class="flex items-center gap-2 text-slate-300">
              <v-icon
                icon="mdi-sass"
                color="pink"
              />
              SCSS / Sass
            </div>
            <div class="flex items-center gap-2 text-slate-300">
              <v-icon
                icon="mdi-material-design"
                color="blue"
              />
              MDI Icons
            </div>
          </div>
        </ShowcaseCard>

        <ShowcaseCard title="小幫手">
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2 text-slate-300">
              <v-icon
                icon="mdi-eslint"
                color="purple"
              />
              ESLint (檢查)
            </div>
            <div class="flex items-center gap-2 text-slate-300">
              <v-icon
                icon="mdi-format-align-left"
                color="orange"
              />
              Prettier (排版)
            </div>
            <div class="flex items-center gap-2 text-slate-300">
              <v-icon
                icon="mdi-git"
                color="red"
              />
              Husky (Git)
            </div>
          </div>
        </ShowcaseCard>
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
              <div class="text-sm font-bold text-slate-200 mb-1">打包 (上線用)</div>
              <ShowcaseCodeBlock
                code="npm run build"
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

    <!-- 4. Development Rules -->
    <ShowcaseSection
      title="開發規矩 (Rules)"
      icon="mdi-ruler-square"
      class="stagger-4"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ShowcaseCard
          title="命名怎麼寫？"
          description="請跟著這樣寫，不然 ESLint 會報錯喔。"
        >
          <div class="naming-rules">
            <!-- Rule 1 -->
            <div class="rule-item">
              <div class="rule-meta">
                <span class="rule-type">Boolean</span>
                <span class="rule-desc">如果是 Yes/No</span>
              </div>
              <div class="rule-content">
                <div class="rule-syntax">
                  <span class="keyword">is</span>
                  <span class="divider">/</span>
                  <span class="keyword">should</span>
                  <span class="divider">/</span>
                  <span class="keyword">has</span>
                </div>
                <div class="rule-examples">
                  <span class="good">isValid</span>
                  <span class="good">hasPermission</span>
                  <span class="bad">valid</span>
                  <span class="bad">permission</span>
                </div>
              </div>
            </div>

            <!-- Rule 2 -->
            <div class="rule-item">
              <div class="rule-meta">
                <span class="rule-type">Class / Interface</span>
                <span class="rule-desc">類別與介面</span>
              </div>
              <div class="rule-content">
                <div class="rule-syntax">
                  <span class="keyword">PascalCase</span>
                  <p class="text-xs text-slate-400 mt-1 font-sans font-normal">(大寫開頭)</p>
                </div>
                <div class="rule-examples">
                  <span class="good">UserInterface</span>
                  <span class="bad">userInterface</span>
                </div>
              </div>
            </div>
          </div>
        </ShowcaseCard>

        <ShowcaseCard
          title="檔案放哪裡？"
          description="每個資料夾都有它的用途，別放錯囉。"
        >
          <ul class="dir-list">
            <li>
              <div class="dir-name">
                <v-icon
                  icon="mdi-folder"
                  color="blue"
                  size="small"
                />
                <span>composables/</span>
              </div>
              <div class="dir-desc">共用的邏輯 (Hooks)</div>
            </li>
            <li>
              <div class="dir-name">
                <v-icon
                  icon="mdi-folder"
                  color="purple"
                  size="small"
                />
                <span>stores/</span>
              </div>
              <div class="dir-desc">大家的資料狀態 (Pinia)</div>
            </li>
            <li>
              <div class="dir-name">
                <v-icon
                  icon="mdi-folder-open"
                  color="orange"
                  size="small"
                />
                <span>modules/</span>
              </div>
              <div class="dir-desc">依功能分類的模組</div>
              <ul class="sub-list">
                <li><span>showcase/ (範例)</span></li>
                <li><span>auth/ (登入相關)</span></li>
              </ul>
            </li>
            <li>
              <div class="dir-name">
                <v-icon
                  icon="mdi-folder-table"
                  color="green"
                  size="small"
                />
                <span>components/</span>
              </div>
              <div class="dir-desc">UI 元件</div>
              <ul class="sub-list">
                <li><span>uiInterface/ (純外觀)</span></li>
                <li><span>uiBusiness/ (含邏輯)</span></li>
              </ul>
            </li>
          </ul>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- 5. Quality Control -->
    <ShowcaseSection
      title="品質守門員 (QA)"
      icon="mdi-shield-check"
      class="stagger-5"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- ESLint -->
        <ShowcaseCard
          title="幫你抓錯 (ESLint)"
          description="存檔時會自動修正格式，也會提醒你寫錯的地方。"
        >
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="p-3 bg-slate-800/50 rounded border border-slate-700">
              <strong class="text-emerald-400 block mb-1">Vue 最佳實踐</strong>
              <div class="text-xs text-slate-400">用官方推薦的寫法</div>
            </div>
            <div class="p-3 bg-slate-800/50 rounded border border-slate-700">
              <strong class="text-blue-400 block mb-1">TypeScript 檢查</strong>
              <div class="text-xs text-slate-400">避免型別錯誤</div>
            </div>
            <div class="p-3 bg-slate-800/50 rounded border border-slate-700">
              <strong class="text-pink-400 block mb-1">Prettier 排版</strong>
              <div class="text-xs text-slate-400">幫你把程式碼排整齊</div>
            </div>
            <div class="p-3 bg-slate-800/50 rounded border border-slate-700">
              <strong class="text-amber-400 block mb-1">JSDoc 註解</strong>
              <div class="text-xs text-slate-400">重要的地方要寫說明</div>
            </div>
          </div>
        </ShowcaseCard>

        <!-- Git Hooks -->
        <ShowcaseCard
          title="上傳前檢查 (Git Hooks)"
          description="Commit 的時候會自動檢查，有錯就不能上傳。"
        >
          <div class="flow-container">
            <div class="flow-step">
              <div class="step-num">01</div>
              <div class="step-info">
                <div class="step-title">Commit</div>
              </div>
            </div>
            <div class="flow-connector"></div>
            <div class="flow-step">
              <div class="step-num">02</div>
              <div class="step-info">
                <div class="step-title">攔截</div>
              </div>
            </div>
            <div class="flow-connector"></div>
            <div class="flow-step">
              <div class="step-num">03</div>
              <div class="step-info">
                <div class="step-title">檢查</div>
              </div>
            </div>
            <div class="flow-connector"></div>
            <div class="flow-step success">
              <div class="step-num">OK</div>
              <div class="step-info">
                <div class="step-title">過關</div>
              </div>
            </div>
          </div>
          <div
            class="mt-4 text-xs text-slate-400 p-3 bg-slate-800/50 rounded border border-slate-700"
          >
            只會檢查
            <strong>這次修改的檔案</strong>
            ，速度很快，不用擔心。
          </div>
        </ShowcaseCard>
      </div>

      <div class="mt-6">
        <ShowcaseCard
          title="緊急略過檢查 (盡量少用)"
          icon="mdi-alert"
          class="border-amber-500/20 bg-amber-500/5"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div class="text-sm font-bold text-amber-300 mb-2">Commit 時跳過</div>
              <ShowcaseCodeBlock
                code="git commit -n -m '急件處理'"
                language="bash"
              />
            </div>
            <div>
              <div class="text-sm font-bold text-amber-300 mb-2">某一行跳過</div>
              <ShowcaseCodeBlock
                code="// eslint-disable-next-line
console.log('debug')"
                language="javascript"
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
