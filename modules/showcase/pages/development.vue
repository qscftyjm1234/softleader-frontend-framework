<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import IIcon from '~/components/uiInterface/IIcon.vue'
import IBreadcrumbs from '~/components/uiInterface/layout/IBreadcrumbs.vue'
import { useBreadcrumbs } from '~/composables/useBreadcrumbs'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'
const { breadcrumbs: breadcrumbItems } = useBreadcrumbs()

definePageMeta({
  title: '課程 1：環境建置指南',
  layout: 'portal'
})

const units = ref([
  {
    id: 'prerequisites',
    title: '第一階段：基礎必備 (Step 0)',
    description: '在開始開發之前，你的電腦需要具備的基礎環境。',
    useCase: '確保所有開發者的電腦都有相同且穩定的運作基底。'
  },
  {
    id: 'eco',
    title: '第二階段：核心技術說明 (Stack)',
    description: '認識並安裝專案所引用的核心框架與套件。',
    useCase: '了解這個開發包是如何用 Nuxt 3 與 Ant Design 組建而成的。'
  },
  {
    id: 'tools',
    title: '第三階段：推薦工具 (Tools)',
    description: ' VS Code 必裝的擴充套件，提升團隊開發效率與程式碼品質。',
    useCase: '建立舒適的開發輔助環境。'
  },
  {
    id: 'startup',
    title: '第四階段：啟動專案 (Startup)',
    description: '從 Clone 專案到啟動 Dev Server 的完整步驟。',
    useCase: '每天都要使用的開發指令與 Git 基本操作。'
  },
  {
    id: 'packages',
    title: '第五階段：套件管理 (Packages)',
    description: '如何在專案中新增、更新與移除套件。',
    useCase: '日常開發中維護專案依賴的必要操作。'
  },
  {
    id: 'git',
    title: '第六階段：Git 版本控制 (Standards)',
    description: '統一的 Git Commit 語意規範，讓提交紀錄一目瞭然。',
    useCase: '讓團隊的程式碼管理有一致的標準。'
  }
])

const activeUnitIndex = ref(0)
const activeUnit = computed(() => units.value[activeUnitIndex.value])

const scrollContainer = ref<HTMLElement | null>(null)
watch(activeUnitIndex, () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollTo({ top: 0, behavior: 'smooth' })
  }
})
</script>

<template>
  <div class="vue-course-layout min-h-screen bg-white">
    <!-- Premium SaaS Header -->
    <header
      class="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-slate-100 px-8 py-4"
    >
      <div class="max-w-[1400px] mx-auto flex items-center justify-between">
        <div class="flex items-center gap-5">
          <NuxtLink
            to="/"
            class="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-100 transition-all hover:bg-blue-50 group"
            title="回到首頁"
          >
            <IIcon
              icon="mdi-home-outline"
              size="22"
              class="group-hover:scale-110 transition-transform"
            />
          </NuxtLink>
          <div class="h-8 w-px bg-slate-200 mx-1"></div>
          <IBreadcrumbs :items="breadcrumbItems" />
        </div>

        <div class="flex items-center gap-6">
          <div class="flex flex-col items-end">
            <span class="text-[10px] font-black text-blue-500 uppercase">目前進度</span>
            <div class="text-sm font-mono font-bold text-slate-600">
              {{ activeUnitIndex + 1 }} / {{ units.length }}
            </div>
          </div>
          <div class="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              class="h-full bg-blue-500 transition-all duration-500"
              :style="{ width: `${((activeUnitIndex + 1) / units.length) * 100}%` }"
            ></div>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-73px)]">
      <!-- Sidebar Nav (Left Column) -->
      <aside class="lg:col-span-3 border-r border-slate-50 p-6 space-y-2 bg-slate-50/30">
        <div
          class="px-4 py-2 mb-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]"
        >
          單元列表
        </div>
        <button
          v-for="(unit, index) in units"
          :key="unit.id"
          class="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden"
          :class="
            activeUnitIndex === index
              ? 'bg-white shadow-[0_4px_20px_rgba(37,99,235,0.08)] text-blue-600 ring-1 ring-blue-50'
              : 'text-slate-500 hover:bg-slate-100/50 hover:text-slate-900'
          "
          @click="activeUnitIndex = index"
        >
          <div
            class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-colors"
            :class="
              activeUnitIndex === index
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
            "
          >
            {{ index + 1 }}
          </div>
          <div class="flex-1 text-left">
            <div class="text-sm font-black tracking-tight">{{ unit.title }}</div>
          </div>
          <IIcon
            v-if="activeUnitIndex === index"
            icon="mdi-chevron-right"
            size="18"
          />
        </button>
      </aside>

      <!-- Integrated Content Area (Right Column) -->
      <div
        ref="scrollContainer"
        class="lg:col-span-9 h-full flex flex-col overflow-y-auto bg-slate-50/10"
      >
        <!-- Vertical Content Stack -->
        <main class="w-full max-w-4xl mx-auto p-10 space-y-12 pb-32">
          <!-- Course Header (Independent) -->
          <div class="mb-10 pb-10 border-b border-slate-100/60">
            <div class="flex items-center gap-4 mb-4">
              <div
                class="px-2.5 py-1 rounded bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100"
              >
                Course Module 01
              </div>
              <div class="h-4 w-px bg-slate-200"></div>
              <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                環境建置
              </div>
            </div>
            <h1 class="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
              環境建置指南 (Environment Setup)
            </h1>
            <p class="text-lg text-slate-500 font-medium leading-relaxed">
              • 本指南將引導你從零開始，依照本系統實際的技術規格與開發規範，在本機端成功跑起專案。
            </p>
          </div>

          <div class="space-y-4 animate-fadeIn">
            <h2 class="text-3xl font-black text-slate-900 tracking-tight leading-tight">
              {{ activeUnit.title }}
            </h2>
            <p class="text-slate-500 text-lg leading-relaxed">{{ activeUnit.description }}</p>

            <!-- Real-world Case Callout -->
            <div
              class="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 flex items-start gap-4"
            >
              <div
                class="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-500 shrink-0"
              >
                <IIcon
                  icon="mdi-lightbulb-on-outline"
                  size="24"
                />
              </div>
              <div class="space-y-1">
                <div class="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                  目標與用途
                </div>
                <p class="text-sm font-bold text-slate-600 leading-normal">
                  {{ activeUnit.useCase }}
                </p>
              </div>
            </div>
          </div>

          <!-- Dynamic Content based on Selection -->
          <div class="space-y-8 animate-fadeIn">
            <!-- Phase 1: Prerequisites -->
            <template v-if="activeUnit.id === 'prerequisites'">
              <ShowcaseCard
                title="基礎環境要求 (Runtime)"
                description="在執行任何指令前，請確保電腦已安裝以下軟體"
                full-width
              >
                <div class="packages-grid">
                  <!-- Node.js -->
                  <div class="package-card">
                    <div class="package-header">
                      <div class="package-name">Node.js</div>
                      <div class="package-version">v20.0.0+</div>
                    </div>
                    <div class="package-desc">JavaScript 執行環境 (Recommended v20)。</div>
                    <div class="package-install">
                      <ShowcaseCodeBlock
                        code="node --version"
                        language="bash"
                      />
                      <a
                        href="https://nodejs.org/"
                        target="_blank"
                        class="download-link"
                      >
                        👉 下載 Node.js
                      </a>
                    </div>
                  </div>

                  <!-- Git -->
                  <div class="package-card">
                    <div class="package-header">
                      <div class="package-name">Git</div>
                      <div class="package-version">Latest</div>
                    </div>
                    <div class="package-desc">版本控制系統。</div>
                    <div class="package-install">
                      <ShowcaseCodeBlock
                        code="git --version"
                        language="bash"
                      />
                    </div>
                  </div>

                  <!-- PNPM / NPM -->
                  <div class="package-card">
                    <div class="package-header">
                      <div class="package-name">Package Manager</div>
                      <div class="package-version">NPM / PNPM</div>
                    </div>
                    <div class="package-desc">用於安裝與管理專案套件。</div>
                    <div class="package-install">
                      <ShowcaseCodeBlock
                        code="npm --version"
                        language="bash"
                      />
                    </div>
                  </div>
                </div>
              </ShowcaseCard>
            </template>

            <!-- Phase 2: Tech Stack -->
            <template v-if="activeUnit.id === 'eco'">
              <ShowcaseCard
                title="專案完整套件清單 (Full Dependencies List)"
                description="以下為 package.json 中完整收錄的所有框架、套件與開發工具。我們將其分為四大類別供您參考。"
                full-width
              >
                <div class="space-y-12">
                  <!-- 1. Frontend Core -->
                  <div>
                    <div class="table-group-header">
                      <IIcon
                        icon="mdi-web"
                        size="18"
                        class="text-emerald-500"
                      />
                      <span>核心開發框架與 UI 介面 (Dependencies)</span>
                    </div>
                    <table class="dependency-table">
                      <thead>
                        <tr>
                          <th width="30%">套件名稱 (Package)</th>
                          <th width="15%">版本</th>
                          <th>用途說明 (What it does)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><code class="p-code">nuxt</code></td>
                          <td><span class="v-tag">3.15.4</span></td>
                          <td>基於 Vue 3 的應用框架。處理 SSR、自動路由、佈局系統與效能優化。</td>
                        </tr>
                        <tr>
                          <td><code class="p-code">ant-design-vue</code></td>
                          <td><span class="v-tag">4.2.1</span></td>
                          <td>企業級 UI 組件庫。提供彈窗、表格、輸入框等各種現成的高規格組件。</td>
                        </tr>
                        <tr>
                          <td><code class="p-code">tailwindcss</code></td>
                          <td><span class="v-tag">6.13.1</span></td>
                          <td>原子化 CSS 框架。透過 Class 直接在模板中快速調整 UI 細節排版。</td>
                        </tr>
                        <tr>
                          <td><code class="p-code">@ant-design-vue/nuxt</code></td>
                          <td><span class="v-tag">1.0.0</span></td>
                          <td>Nuxt 模組，負責自動載入 Ant Design Vue 元件並優化其 Bundle Size。</td>
                        </tr>
                        <tr>
                          <td><code class="p-code">@nuxtjs/tailwindcss</code></td>
                          <td><span class="v-tag">6.13.1</span></td>
                          <td>Nuxt 模組，處理 Tailwind CSS 與專案的自動熱重載與編譯配置。</td>
                        </tr>
                        <tr>
                          <td><code class="p-code">@nuxt/fonts</code></td>
                          <td><span class="v-tag">0.11.0</span></td>
                          <td>
                            管理專案使用的字體。自動下載並託管 Web Fonts，避免載入外部字體過慢。
                          </td>
                        </tr>
                        <tr>
                          <td><code class="p-code">@nuxt/icon</code></td>
                          <td><span class="v-tag">1.11.0</span></td>
                          <td>全域圖示管理。整合 MDI、SVG，提供高性能且極其方便的圖示呼叫方式。</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <!-- 2. Logic & Utils -->
                  <div>
                    <div class="table-group-header">
                      <IIcon
                        icon="mdi-database-cog-outline"
                        size="18"
                        class="text-blue-500"
                      />
                      <span>資料狀態、時間與工具 (Dependencies)</span>
                    </div>
                    <table class="dependency-table">
                      <thead>
                        <tr>
                          <th width="30%">套件名稱 (Package)</th>
                          <th width="15%">版本</th>
                          <th>用途說明</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><code class="p-code">pinia</code></td>
                          <td><span class="v-tag">3.0.1</span></td>
                          <td>前端核心狀態管理 Store。儲存使用者資訊、全域參數等共用資料。</td>
                        </tr>
                        <tr>
                          <td><code class="p-code">@pinia/nuxt</code></td>
                          <td><span class="v-tag">0.10.1</span></td>
                          <td>Nuxt 模組，解決 Pinia 在伺服器端渲染 (SSR) 時的狀態同步問題。</td>
                        </tr>
                        <tr>
                          <td><code class="p-code">@vueuse/core</code></td>
                          <td><span class="v-tag">10.11.1</span></td>
                          <td>
                            Vue 組合式函數庫。提供偵測捲動、滑鼠、剪貼簿等各種常用的底層封裝。
                          </td>
                        </tr>
                        <tr>
                          <td><code class="p-code">dayjs</code></td>
                          <td><span class="v-tag">1.11.13</span></td>
                          <td>時間日期處理工具。負責日期的格式化、運算與多語系顯示。</td>
                        </tr>
                        <tr>
                          <td><code class="p-code">lodash.clonedeep</code></td>
                          <td><span class="v-tag">4.5.0</span></td>
                          <td>專注於物件深拷貝。確保在處理巢狀複雜結構資料時不會產生引用錯誤。</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <!-- 3. Build & Styles -->
                  <div>
                    <div class="table-group-header">
                      <IIcon
                        icon="mdi-cogs"
                        size="18"
                        class="text-amber-500"
                      />
                      <span>工程建置與品質檢查 (DevDependencies)</span>
                    </div>
                    <table class="dependency-table">
                      <thead>
                        <tr>
                          <th width="30%">套件名稱 (Package)</th>
                          <th width="15%">版本</th>
                          <th>用途說明</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><code class="p-code">typescript</code></td>
                          <td><span class="v-tag">5.7.3</span></td>
                          <td>提供程式碼型別定義與靜態檢查。確保在開發期就攔截變數型別錯誤。</td>
                        </tr>
                        <tr>
                          <td>
                            <code class="p-code">eslint</code>
                            /
                            <code class="p-code">@nuxt/eslint</code>
                          </td>
                          <td><span class="v-tag">9.22.0</span></td>
                          <td>程式碼邏輯檢查工具。自動找出未定義變數或不規範的語法。</td>
                        </tr>
                        <tr>
                          <td><code class="p-code">prettier</code></td>
                          <td><span class="v-tag">3.5.3</span></td>
                          <td>程式碼格式化工具。自動修正縮排、換行、引號樣式至團隊統一風格。</td>
                        </tr>
                        <tr>
                          <td><code class="p-code">sass</code></td>
                          <td><span class="v-tag">1.85.0</span></td>
                          <td>CSS 預處理器。支援變數、嵌套與複雜排版邏輯。</td>
                        </tr>
                        <tr>
                          <td><code class="p-code">vue-tsc</code></td>
                          <td><span class="v-tag">2.2.8</span></td>
                          <td>專屬 Vue 模板的 TS 檢查工具。能幫您抓出 Template 裡的型別錯誤。</td>
                        </tr>
                        <tr>
                          <td><code class="p-code">cross-env</code></td>
                          <td><span class="v-tag">7.0.3</span></td>
                          <td>
                            跨平台環境變數設定。確保 Windows 與 Mac/Linux 使用相同的執行腳本。
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <!-- 4. Git & Commits -->
                  <div>
                    <div class="table-group-header">
                      <IIcon
                        icon="mdi-git"
                        size="18"
                        class="text-pink-500"
                      />
                      <span>Git 控制與提交規範 (DevDependencies)</span>
                    </div>
                    <table class="dependency-table">
                      <thead>
                        <tr>
                          <th width="30%">套件名稱 (Package)</th>
                          <th width="15%">版本</th>
                          <th>用途說明</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><code class="p-code">husky</code></td>
                          <td><span class="v-tag">9.0.11</span></td>
                          <td>Git 勾子 (Hooks) 管理。在 Git Commit 前自動觸發檢查腳本。</td>
                        </tr>
                        <tr>
                          <td><code class="p-code">lint-staged</code></td>
                          <td><span class="v-tag">15.2.2</span></td>
                          <td>過濾器。確保 Lint 檢查只針對本次「修改過的文件」執行，提升效率。</td>
                        </tr>
                        <tr>
                          <td>
                            <code class="p-code">commitizen</code>
                            /
                            <code class="p-code">cz-customizable</code>
                          </td>
                          <td><span class="v-tag">4.3.1</span></td>
                          <td>引導式 Commit 工具。彈出選單讓您選擇 feat/fix 並輸入標準訊息。</td>
                        </tr>
                        <tr>
                          <td><code class="p-code">@commitlint/cli</code></td>
                          <td><span class="v-tag">20.2.0</span></td>
                          <td>
                            嚴格限制 Commit 訊息格式。若訊息不符 Conventional 規範將禁止提交。
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </ShowcaseCard>
            </template>

            <!-- Phase 3: Tools -->
            <template v-if="activeUnit.id === 'tools'">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Vue Official -->
                <div class="tool-card group">
                  <div class="tool-icon bg-emerald-500/10 text-emerald-500">
                    <IIcon
                      size="24"
                      icon="mdi-vuejs"
                    />
                  </div>
                  <div class="tool-content">
                    <div class="tool-name">Vue - Official (Volar)</div>
                    <div class="tool-desc">Vue 官方提供的 TypeScript 與語法支援。</div>
                    <div class="tool-idtext">ID: Vue.volar</div>
                  </div>
                </div>

                <!-- Ant Design Vue Helper -->
                <div class="tool-card group">
                  <div class="tool-icon bg-blue-500/10 text-blue-500">
                    <IIcon
                      size="24"
                      icon="mdi-puzzle"
                    />
                  </div>
                  <div class="tool-content">
                    <div class="tool-name">Ant Design Vue Helper</div>
                    <div class="tool-desc">組件語法提示與自動補全。</div>
                  </div>
                </div>

                <!-- ESLint -->
                <div class="tool-card group">
                  <div class="tool-icon bg-indigo-500/10 text-indigo-500">
                    <IIcon
                      size="24"
                      icon="mdi-eslint"
                    />
                  </div>
                  <div class="tool-content">
                    <div class="tool-name">ESLint</div>
                    <div class="tool-desc">即時標示程式碼風格錯誤。</div>
                  </div>
                </div>

                <!-- Prettier -->
                <div class="tool-card group">
                  <div class="tool-icon bg-pink-500/10 text-pink-500">
                    <IIcon
                      size="24"
                      icon="mdi-format-align-left"
                    />
                  </div>
                  <div class="tool-content">
                    <div class="tool-name">Prettier</div>
                    <div class="tool-desc">自動排版程式碼格式。</div>
                  </div>
                </div>
              </div>
            </template>

            <!-- Phase 4: Startup -->
            <template v-if="activeUnit.id === 'startup'">
              <div class="space-y-6">
                <div class="flex items-start gap-4">
                  <div
                    class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center shrink-0 mt-1"
                  >
                    1
                  </div>
                  <div class="flex-1">
                    <h4 class="font-bold text-slate-800 text-lg">拉取原始碼</h4>
                    <ShowcaseCodeBlock
                      code="git clone [your-repo-url]"
                      language="bash"
                    />
                  </div>
                </div>

                <div class="flex items-start gap-4 border-t border-slate-100 pt-6">
                  <div
                    class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center shrink-0 mt-1"
                  >
                    2
                  </div>
                  <div class="flex-1">
                    <h4 class="font-bold text-slate-800 text-lg">安裝專案依賴 (Dependencies)</h4>
                    <p class="text-slate-500 text-sm mb-3">安裝 package.json 中列出的所有套件。</p>
                    <ShowcaseCodeBlock
                      code="npm install"
                      language="bash"
                    />
                  </div>
                </div>

                <div class="flex items-start gap-4 border-t border-slate-100 pt-6">
                  <div
                    class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center shrink-0 mt-1"
                  >
                    3
                  </div>
                  <div class="flex-1">
                    <h4 class="font-bold text-slate-800 text-lg">啟動開發模式</h4>
                    <p class="text-slate-500 text-sm mb-3">啟動 Vite 開發伺服器，並開啟熱重載。</p>
                    <ShowcaseCodeBlock
                      code="npm run dev"
                      language="bash"
                    />
                    <div class="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-3">
                      <IIcon
                        icon="mdi-information-outline"
                        class="text-amber-500 shrink-0"
                      />
                      <p class="text-sm text-amber-700 font-medium">
                        預設會啟動在
                        <strong>http://localhost:3000</strong>
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Startup Tips -->
                <div class="bg-blue-50/50 border border-blue-100 rounded-xl p-5 mt-4">
                  <h5 class="text-blue-700 font-bold text-sm mb-2 flex items-center gap-2">
                    <IIcon
                      icon="mdi-information-outline"
                      size="16"
                    />
                    啟動注意事項 (Tips & Precautions)
                  </h5>
                  <ul class="text-xs text-blue-600 space-y-2 list-disc pl-4">
                    <li>
                      <strong>目錄路徑：</strong>
                      請確保在終端機 (Terminal) 的路徑位於專案根目錄（包含 `package.json`
                      的資料夾）下執行指令。
                    </li>
                    <li>
                      <strong>Node.js 版本：</strong>
                      建議使用 Node.js v20 以上版本，以確保與 Nuxt 3 的最佳相容性。
                    </li>
                    <li>
                      <strong>埠號衝突：</strong>
                      若 3000 埠號已被佔用，系統會自動嘗試 3001，請注意終端機輸出的實際 URL。
                    </li>
                    <li>
                      <strong>疑難排解：</strong>
                      若遇到奇怪的編譯錯誤，可嘗試執行 `npm run reinstall` 清除快取並重新安裝。
                    </li>
                  </ul>
                </div>
              </div>
            </template>

            <!-- Phase 5: Packages -->
            <template v-if="activeUnit.id === 'packages'">
              <ShowcaseCard
                title="套件管理指令 (Package Management)"
                description="掌握如何新增、移除以及管理專案依賴。本專案統一建議使用 npm 進行操作。"
                full-width
              >
                <div class="space-y-10">
                  <!-- 1. Add Package -->
                  <div>
                    <div class="table-group-header">
                      <IIcon
                        icon="mdi-plus-box"
                        size="18"
                        class="text-emerald-500"
                      />
                      <span>新增套件 (Add Dependencies)</span>
                    </div>
                    <table class="dependency-table">
                      <thead>
                        <tr>
                          <th width="35%">指令類型</th>
                          <th>指令範例 (Command)</th>
                          <th>用途說明</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><strong>一般套件 (Runtime)</strong></td>
                          <td><code class="p-code">npm install [package-name]</code></td>
                          <td>新增程式碼運作時需要的套件。例如：`dayjs`、`axios`。</td>
                        </tr>
                        <tr>
                          <td><strong>開發套件 (Dev)</strong></td>
                          <td><code class="p-code">npm install -D [package-name]</code></td>
                          <td>新增僅在開發或建置時需要的工具。例如：`eslint`、`sass`。</td>
                        </tr>
                        <tr>
                          <td><strong>安裝特定版本</strong></td>
                          <td><code class="p-code">npm install [name]@[version]</code></td>
                          <td>當需要指定特定版本時使用。例如：`lodash@4.17.21`。</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <!-- 2. Remove Package -->
                  <div>
                    <div class="table-group-header">
                      <IIcon
                        icon="mdi-minus-box"
                        size="18"
                        class="text-pink-500"
                      />
                      <span>移除套件 (Remove Dependencies)</span>
                    </div>
                    <div class="p-4 bg-slate-50 rounded-xl border border-slate-100 mb-4">
                      <p class="text-sm text-slate-600 mb-3">
                        若某個套件不再需要，請務必將其從專案中移除，以維持目錄整潔並減少 Bundle
                        Size。
                      </p>
                      <ShowcaseCodeBlock
                        code="npm uninstall [package-name]"
                        language="bash"
                      />
                    </div>
                  </div>

                  <!-- 3. Tips -->
                  <div class="bg-blue-50/50 border border-blue-100 rounded-xl p-5">
                    <h5 class="text-blue-700 font-bold text-sm mb-2 flex items-center gap-2">
                      <IIcon
                        icon="mdi-information-outline"
                        size="16"
                      />
                      注意事項
                    </h5>
                    <ul class="text-xs text-blue-600 space-y-2 list-disc pl-4">
                      <li>
                        移除套件後，`package.json` 會自動更新，請記得一併提交 (Commit) 此變更。
                      </li>
                      <li>
                        如果移除後出現編譯錯誤，通常是因為程式碼中仍有 `import`
                        該套件的地方，請手動清理。
                      </li>
                      <li>
                        多人協作時，若夥伴更新了套件，請執行 `npm install` 同步本地的
                        `node_modules`。
                      </li>
                    </ul>
                  </div>
                </div>
              </ShowcaseCard>
            </template>

            <!-- Phase 6: Git -->
            <template v-if="activeUnit.id === 'git'">
              <div class="space-y-8">
                <!-- 1. Git Workflow -->
                <ShowcaseCard
                  title="Git 工作流程 (Development Flow)"
                  description="在開始開發前，請確保遵循標準的 Git 操作流程，以減少衝突並維持專案穩定。"
                >
                  <div class="space-y-2">
                    <!-- Step 1 -->
                    <div
                      class="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100"
                    >
                      <div
                        class="w-8 h-8 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center font-bold shrink-0 text-sm"
                      >
                        1
                      </div>
                      <div class="flex-1">
                        <div class="font-bold text-slate-700 text-sm">同步代碼</div>
                        <code class="text-[11px] text-slate-500">git pull origin master</code>
                      </div>
                    </div>
                    <!-- Step 2 -->
                    <div
                      class="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100"
                    >
                      <div
                        class="w-8 h-8 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center font-bold shrink-0 text-sm"
                      >
                        2
                      </div>
                      <div class="flex-1">
                        <div class="font-bold text-slate-700 text-sm">暫存變更</div>
                        <code class="text-[11px] text-slate-500">git add .</code>
                      </div>
                    </div>
                    <!-- Step 3 -->
                    <div
                      class="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 ring-1 ring-slate-200"
                    >
                      <div
                        class="w-8 h-8 rounded-lg bg-slate-700 text-white flex items-center justify-center font-bold shrink-0 text-sm"
                      >
                        3
                      </div>
                      <div class="flex-1">
                        <div class="font-bold text-slate-900 text-sm">語意化提交 (標準做法)</div>
                        <code class="text-[11px] text-blue-600 font-bold">npm run commit</code>
                      </div>
                    </div>
                    <!-- Step 4 -->
                    <div
                      class="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100"
                    >
                      <div
                        class="w-8 h-8 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center font-bold shrink-0 text-sm"
                      >
                        4
                      </div>
                      <div class="flex-1">
                        <div class="font-bold text-slate-700 text-sm">推送到遠端</div>
                        <code class="text-[11px] text-slate-500">git push</code>
                      </div>
                    </div>
                  </div>
                </ShowcaseCard>

                <!-- 2. Commit Standards -->
                <ShowcaseCard
                  title="Commit 訊息規範 (Conventional Commits)"
                  description="本專案強制執行語意化 Commit。訊息必須包含標頭 (Type, Scope) 與主旨。"
                  full-width
                >
                  <div class="space-y-6">
                    <!-- Commit Structure Breakdown -->
                    <div class="bg-slate-900 rounded-xl p-5 font-mono text-sm">
                      <div class="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
                        <IIcon
                          icon="mdi-code-braces"
                          class="text-blue-400"
                        />
                        <span class="text-slate-400 text-xs uppercase tracking-widest">
                          Commit Structure
                        </span>
                      </div>
                      <div class="flex flex-wrap gap-y-2 text-lg">
                        <span class="text-pink-400">&lt;type&gt;</span>
                        <span class="text-slate-500">(</span>
                        <span class="text-amber-400">&lt;scope&gt;</span>
                        <span class="text-slate-500">):</span>
                        <span class="text-emerald-400 ml-2">&lt;subject&gt;</span>
                      </div>
                      <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="space-y-1">
                          <div class="text-slate-500 text-[10px] uppercase font-bold">
                            1. Type (類型)
                          </div>
                          <div class="text-slate-300 text-xs">此次變更的性質 (feat, fix...)</div>
                        </div>
                        <div class="space-y-1">
                          <div class="text-slate-500 text-[10px] uppercase font-bold">
                            2. Scope (範圍)
                          </div>
                          <div class="text-slate-300 text-xs">
                            影響的模組或組件 (auth, layout...)
                          </div>
                        </div>
                        <div class="space-y-1">
                          <div class="text-slate-500 text-[10px] uppercase font-bold">
                            3. Subject (主旨)
                          </div>
                          <div class="text-slate-300 text-xs">簡短說明做了什麼</div>
                        </div>
                      </div>
                    </div>

                    <!-- Type Table -->
                    <table class="dependency-table">
                      <thead>
                        <tr>
                          <th width="20%">Type (類型)</th>
                          <th width="30%">代表意義</th>
                          <th>什麼時候使用？</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><span class="text-blue-600 font-bold">feat</span></td>
                          <td>新增功能</td>
                          <td>增加新組件、新 API 或新的頁面邏輯時。</td>
                        </tr>
                        <tr>
                          <td><span class="text-emerald-600 font-bold">fix</span></td>
                          <td>修復 Bug</td>
                          <td>修正錯誤、處理 Edge cases 或 Runtime 錯誤。</td>
                        </tr>
                        <tr>
                          <td><span class="text-purple-600 font-bold">refactor</span></td>
                          <td>重構代碼</td>
                          <td>不改功能、不修 Bug，僅優化現有程式碼結構。</td>
                        </tr>
                        <tr>
                          <td><span class="text-amber-600 font-bold">style</span></td>
                          <td>格式修改</td>
                          <td>純 CSS 調整、字體修改、顏色更換等不涉及邏輯的異動。</td>
                        </tr>
                        <tr>
                          <td><span class="text-indigo-600 font-bold">docs</span></td>
                          <td>文件說明</td>
                          <td>更新 README、README 或開發導覽頁面。</td>
                        </tr>
                      </tbody>
                    </table>

                    <!-- Guided Tool -->
                    <div
                      class="bg-emerald-50 border border-emerald-100 rounded-xl p-5 flex items-center gap-4"
                    >
                      <div
                        class="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0"
                      >
                        <IIcon
                          icon="mdi-head-cog-outline"
                          size="24"
                        />
                      </div>
                      <div>
                        <h6 class="font-bold text-emerald-900 text-sm mb-1">
                          使用引導式提交工具 (Commitizen)
                        </h6>
                        <p class="text-xs text-emerald-700 leading-relaxed">
                          若不確定格式，請執行
                          <code
                            class="bg-emerald-100 px-1.5 py-0.5 rounded font-bold border border-emerald-200"
                          >
                            npm run commit
                          </code>
                          。 系統會彈出視覺化選單協助您完成符合規範的 Commit 訊息。
                        </p>
                      </div>
                    </div>
                  </div>
                </ShowcaseCard>
              </div>
            </template>
          </div>

          <!-- Bottom Navigation (Next Phase) -->
          <div
            class="mt-8 mb-8 border-t border-slate-200/60 pt-6 flex justify-between items-center bg-white/50 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-slate-100"
          >
            <button
              v-if="activeUnitIndex > 0"
              class="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white shadow-sm transition-all text-sm font-bold"
              @click="activeUnitIndex--"
            >
              <IIcon
                icon="mdi-arrow-left"
                size="18"
              />
              上個單元
            </button>
            <div v-else></div>

            <NuxtLink
              v-if="activeUnitIndex === units.length - 1"
              to="/showcase/vue-tutorial"
            >
              <button
                class="flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all text-sm font-bold active:scale-95"
              >
                前往【課程二】Vue 3 基礎教學
                <IIcon
                  icon="mdi-chevron-right"
                  size="18"
                />
              </button>
            </NuxtLink>
            <button
              v-else
              class="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1976D2] text-white hover:bg-[#1565C0] shadow-md transition-all text-sm font-bold active:scale-95"
              @click="activeUnitIndex++"
            >
              下個單元
              <IIcon
                icon="mdi-arrow-right"
                size="18"
              />
            </button>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.package-category {
  margin-bottom: 2rem;
}
.category-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
.category-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.category-icon-emerald {
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
}
.table-group-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: 800;
  color: #0f172a;
}

.dependency-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: white;
  border: 1px solid #f1f5f9;
  border-radius: 12px;
  overflow: hidden;
  font-size: 0.875rem;
}

.dependency-table th {
  background: #f8fafc;
  padding: 1rem;
  text-align: left;
  font-weight: 700;
  color: #64748b;
  border-bottom: 1px solid #f1f5f9;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.75rem;
}

.dependency-table td {
  padding: 1rem;
  border-bottom: 1px solid #f1f5f9;
  color: #334155;
  line-height: 1.6;
}

.dependency-table tr:last-child td {
  border-bottom: none;
}

.dependency-table tr:hover td {
  background: #fcfdfe;
}

.p-code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  background: #eff6ff;
  color: #2563eb;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.85rem;
  border: 1px solid #dbeafe;
}

.v-tag {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  background: #f1f5f9;
  color: #475569;
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.75rem;
  border: 1px solid #e2e8f0;
}

.tool-card {
  display: flex;
  gap: 1.25rem;
  padding: 1.5rem;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
}
.tool-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
}
.tool-name {
  font-weight: 700;
  color: #0f172a;
  font-size: 1.05rem;
  margin-bottom: 0.25rem;
}
.tool-desc {
  font-size: 0.85rem;
  color: #64748b;
  line-height: 1.5;
  margin-bottom: 0.75rem;
}
.tool-idtext {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.7rem;
  color: #94a3b8;
  background: #f1f5f9;
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  display: inline-block;
  border: 1px solid #e2e8f0;
}

.download-link {
  display: inline-flex;
  align-items: center;
  font-size: 0.8rem;
  color: #38bdf8;
  margin-top: 0.5rem;
  text-decoration: none;
  transition: color 0.2s;
}
.download-link:hover {
  color: #7dd3fc;
  text-decoration: underline;
}

/* Restored Card Styles for Step 0 */
.packages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
}

.package-card {
  background: white;
  border: 1px solid #f1f5f9;
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: all 0.2s;
}

.package-card:hover {
  border-color: #3b82f6;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

.package-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.package-name {
  font-weight: 800;
  color: #0f172a;
  font-size: 1.1rem;
}

.package-version {
  font-size: 0.7rem;
  font-weight: 600;
  color: #3b82f6;
  background: #eff6ff;
  padding: 2px 8px;
  border-radius: 20px;
  border: 1px solid #bfdbfe;
}

.package-desc {
  font-size: 0.85rem;
  color: #64748b;
  line-height: 1.5;
}

.package-install {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px dashed #f1f5f9;
}
</style>
