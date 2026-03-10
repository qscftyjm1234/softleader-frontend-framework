<script setup lang="ts">
import { ref, computed } from 'vue'
import IBreadcrumbs from '~/components/uiInterface/layout/IBreadcrumbs.vue'
import IIcon from '~/components/uiInterface/IIcon.vue'
import { useBreadcrumbs } from '~/composables/useBreadcrumbs'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'

definePageMeta({
  title: '開發規矩',
  icon: 'mdi-ruler-square',
  layout: 'portal'
})

const { breadcrumbs: breadcrumbItems } = useBreadcrumbs()

const categories = ref([
  {
    id: 'naming',
    name: '命名規則',
    icon: 'mdi-format-letter-case',
    color: 'blue'
  },
  {
    id: 'folders',
    name: '資料夾功能',
    icon: 'mdi-folder-outline',
    color: 'emerald'
  },
  {
    id: 'architecture',
    name: '架構規範 (Architecture)',
    icon: 'mdi-domain',
    color: 'amber'
  },
  {
    id: 'typescript',
    name: 'TypeScript 使用規則',
    icon: 'mdi-language-typescript',
    color: 'indigo'
  },
  {
    id: 'eslint',
    name: 'ESLint / Prettier 須知',
    icon: 'mdi-check-all',
    color: 'purple'
  },
  {
    id: 'git',
    name: 'Git 提交規範',
    icon: 'mdi-source-commit-local',
    color: 'emerald'
  },
  {
    id: 'pinia',
    name: 'Vue / Pinia 常見地雷',
    icon: 'mdi-mine',
    color: 'rose'
  }
])

const activeCategoryIndex = ref(0)
// unused const activeCategory = computed(() => categories.value[activeCategoryIndex.value])

const scrollToItem = (id: string, index: number) => {
  activeCategoryIndex.value = index
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<template>
  <div class="logic-showcase-layout min-h-screen bg-white">
    <!-- Premium SaaS Header -->
    <header
      class="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-slate-100 px-8 py-4"
    >
      <div class="max-w-[1400px] mx-auto flex items-center justify-between">
        <div class="flex items-center gap-5">
          <NuxtLink
            to="/"
            class="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all hover:bg-indigo-50 group"
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
        <div class="hidden md:flex items-center gap-2">
          <span
            class="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-lg border border-indigo-100 shadow-sm"
          >
            v3.4.x Coding Standards
          </span>
        </div>
      </div>
    </header>

    <div class="max-w-[1400px] mx-auto lg:grid lg:grid-cols-12 min-h-[calc(100vh-73px)]">
      <!-- Left Sidebar: Categories Navigation -->
      <aside
        class="lg:col-span-3 border-r border-slate-50 p-6 space-y-2 bg-slate-50/30 overflow-y-auto sticky top-[73px]"
        style="height: calc(100vh - 73px)"
      >
        <div
          class="px-4 py-2 mb-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]"
        >
          開發規範模塊
        </div>

        <div class="space-y-4">
          <div
            v-for="(cat, index) in categories"
            :key="cat.id"
            class="space-y-1"
          >
            <button
              class="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden"
              :class="
                activeCategoryIndex === index
                  ? 'bg-white shadow-[0_4px_20px_rgba(79,70,229,0.08)] text-indigo-600 ring-1 ring-indigo-50'
                  : 'text-slate-500 hover:bg-slate-100/50 hover:text-slate-900'
              "
              @click="scrollToItem(cat.id, index)"
            >
              <div
                class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-colors"
                :class="
                  activeCategoryIndex === index
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                "
              >
                <IIcon
                  :icon="cat.icon"
                  size="18"
                />
              </div>
              <div class="flex-1 text-left">
                <div class="text-sm font-black tracking-tight">{{ cat.name }}</div>
              </div>
            </button>
          </div>
        </div>
      </aside>

      <!-- Main Content: Documentation Area -->
      <main class="lg:col-span-9 p-8 lg:p-12 overflow-y-auto">
        <div class="max-w-5xl mx-auto">
          <!-- Intro Section -->
          <div class="mb-16">
            <div
              class="inline-flex items-center justify-center p-3 sm:p-4 rounded-[1.5rem] sm:rounded-[2rem] bg-indigo-50 mb-6 shadow-inner border border-indigo-100/50"
            >
              <IIcon
                icon="mdi-book-open-page-variant-outline"
                class="text-indigo-600 text-3xl sm:text-5xl"
              />
            </div>
            <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-4">
              開發規矩 (Development Rules)
            </h1>
            <p class="text-lg text-slate-500 leading-relaxed">
              統一的開發規範，讓團隊協作更順暢。所有寫法皆有其脈絡，遵循規則能獲得最好的開發者體驗
              (DX)。
            </p>
          </div>

          <!-- Documentation Blocks by Category -->
          <div class="space-y-24">
            <div
              id="naming"
              class="scroll-mt-24 relative"
            >
              <div class="flex items-center gap-4 mb-10 pb-4 border-b border-slate-200">
                <div
                  class="w-12 h-12 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center border border-slate-100"
                >
                  <IIcon
                    icon="mdi-format-letter-case"
                    size="24"
                  />
                </div>
                <h2 class="text-2xl font-black text-slate-800">命名規則</h2>
              </div>

              <div class="space-y-8">
                <ShowcaseCard
                  title="變數與函式命名"
                  description="請跟著這樣寫，不然 ESLint 會報錯喔。"
                  full-width
                >
                  <!-- Dev Context Block -->
                  <div class="dev-context mb-6">
                    <div class="context-item">
                      <span class="label">設定檔案:</span>
                      <code class="value">eslint.config.mjs</code>
                    </div>
                    <div class="context-item">
                      <span class="label">執行檢查:</span>
                      <code class="value">npm run lint</code>
                    </div>
                    <div class="context-item">
                      <span class="label">規則名稱:</span>
                      <code class="value">@typescript-eslint/naming-convention</code>
                    </div>
                  </div>

                  <div class="naming-rules">
                    <!-- Rule 1: Boolean -->
                    <div class="rule-item">
                      <div class="rule-meta">
                        <span class="rule-type">Boolean</span>
                        <span class="rule-desc">如果是 Yes/No</span>
                        <div class="config-source">
                          <IIcon
                            size="12"
                            class="text-slate-400"
                            icon="mdi-target"
                          />
                          <span>selector: 'variable' (types: boolean)</span>
                        </div>
                      </div>
                      <div class="rule-content">
                        <div class="rule-syntax">
                          <span class="keyword">is</span>
                          <span class="divider">/</span>
                          <span class="keyword">should</span>
                          <span class="divider">/</span>
                          <span class="keyword">has</span>
                          <span class="divider">/</span>
                          <span class="keyword">can</span>
                          <span class="divider">/</span>
                          <span class="keyword">did</span>
                          <span class="divider">/</span>
                          <span class="keyword">will</span>
                        </div>
                        <div class="rule-examples">
                          <span class="good">isValid</span>
                          <span class="good">hasPermission</span>
                          <span class="bad">valid</span>
                          <span class="bad">permission</span>
                        </div>
                      </div>
                    </div>

                    <!-- Rule 2: Class / Interface -->
                    <div class="rule-item">
                      <div class="rule-meta">
                        <span class="rule-type">Class / Interface</span>
                        <span class="rule-desc">類別與介面</span>
                        <div class="config-source">
                          <IIcon
                            size="12"
                            class="text-slate-400"
                            icon="mdi-file-cog"
                          />
                          <span>eslint: naming-convention</span>
                        </div>
                      </div>
                      <div class="rule-content">
                        <div class="rule-syntax">
                          <span class="keyword">PascalCase</span>
                          <p class="text-xs text-slate-400 mt-1 font-sans font-normal">
                            (大寫開頭)
                          </p>
                        </div>
                        <div class="rule-examples">
                          <span class="good">UserInterface</span>
                          <span class="bad">userInterface</span>
                        </div>
                      </div>
                    </div>

                    <!-- Rule 3: Function -->
                    <div class="rule-item">
                      <div class="rule-meta">
                        <span class="rule-type">Function</span>
                        <span class="rule-desc">函式命名</span>
                        <div class="config-source">
                          <IIcon
                            size="12"
                            class="text-slate-400"
                            icon="mdi-target"
                          />
                          <span>selector: 'function'</span>
                        </div>
                      </div>
                      <div class="rule-content">
                        <div class="rule-syntax">
                          <span class="keyword">動詞開頭</span>
                          <p class="text-xs text-slate-400 mt-1 font-sans font-normal">
                            單一動作: get / set / fetch / handle / click / submit / validate /
                            create / update / delete / toggle / show / hide / open / close / add /
                            remove / clear / reset
                          </p>
                          <p class="text-xs text-emerald-400 mt-2 font-sans font-normal">
                            流程性: initialize / init / process / execute / perform / complete /
                            setup / run / check / verify / on
                          </p>
                        </div>
                        <div class="rule-examples">
                          <span class="good">getUserData</span>
                          <span class="good">handleClick</span>
                          <span class="good">processPayment</span>
                          <span class="good">initializeApp</span>
                          <span class="bad">userData</span>
                          <span class="bad">payment</span>
                        </div>
                      </div>
                    </div>

                    <!-- Rule 4: Constants -->
                    <div class="rule-item">
                      <div class="rule-meta">
                        <span class="rule-type">Constants</span>
                        <span class="rule-desc">常數</span>
                        <div class="config-source">
                          <IIcon
                            size="12"
                            class="text-slate-400"
                            icon="mdi-file-cog"
                          />
                          <span>eslint: naming-convention</span>
                        </div>
                      </div>
                      <div class="rule-content">
                        <div class="rule-syntax">
                          <span class="keyword">UPPER_SNAKE_CASE</span>
                          <p class="text-xs text-slate-400 mt-1 font-sans font-normal">
                            (全大寫 + 底線)
                          </p>
                        </div>
                        <div class="rule-examples">
                          <span class="good">MAX_COUNT</span>
                          <span class="good">API_BASE_URL</span>
                          <span class="bad">maxCount</span>
                          <span class="bad">apiBaseUrl</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Function Naming Cheat Sheet -->
                  <div class="naming-cheatsheet mt-8">
                    <div class="cheatsheet-title">
                      <IIcon
                        class="mr-2 text-amber-400"
                        size="20"
                        icon="mdi-lightbulb-on"
                      />
                      函式命名動詞速查表 (Cheat Sheet)
                    </div>
                    <div class="cheatsheet-grid">
                      <!-- Actions -->
                      <div class="verb-category action-category">
                        <div class="verb-header">
                          <span class="verb-type">單一動作 (Actions)</span>
                          <span class="verb-desc">單純的 CRUD 或狀態改變</span>
                        </div>
                        <div class="verb-list">
                          <span class="verb-badge">get</span>
                          <span class="verb-badge">set</span>
                          <span class="verb-badge">fetch</span>
                          <span class="verb-badge">create</span>
                          <span class="verb-badge">update</span>
                          <span class="verb-badge">delete</span>
                          <span class="verb-badge">add</span>
                          <span class="verb-badge">remove</span>
                          <span class="verb-badge">show</span>
                          <span class="verb-badge">hide</span>
                          <span class="verb-badge">open</span>
                          <span class="verb-badge">close</span>
                          <span class="verb-badge">toggle</span>
                          <span class="verb-badge">clear</span>
                          <span class="verb-badge">reset</span>
                        </div>
                      </div>

                      <!-- Handlers -->
                      <div class="verb-category handler-category">
                        <div class="verb-header">
                          <span class="verb-type">流程與事件 (Process)</span>
                          <span class="verb-desc">多步驟處理或事件監聽</span>
                        </div>
                        <div class="verb-list">
                          <span class="verb-badge">handle</span>
                          <span class="verb-badge">on</span>
                          <span class="verb-badge">init</span>
                          <span class="verb-badge">initialize</span>
                          <span class="verb-badge">process</span>
                          <span class="verb-badge">execute</span>
                          <span class="verb-badge">perform</span>
                          <span class="verb-badge">compute</span>
                          <span class="verb-badge">setup</span>
                          <span class="verb-badge">run</span>
                        </div>
                      </div>

                      <!-- Checks -->
                      <div class="verb-category check-category">
                        <div class="verb-header">
                          <span class="verb-type">狀態判斷 (Checks)</span>
                          <span class="verb-desc">回傳 Boolean 值</span>
                        </div>
                        <div class="verb-list">
                          <span class="verb-badge">is</span>
                          <span class="verb-badge">has</span>
                          <span class="verb-badge">should</span>
                          <span class="verb-badge">can</span>
                          <span class="verb-badge">did</span>
                          <span class="verb-badge">will</span>
                          <span class="verb-badge">check</span>
                          <span class="verb-badge">verify</span>
                          <span class="verb-badge">validate</span>
                        </div>
                      </div>

                      <!-- System / Data -->
                      <div class="verb-category system-category">
                        <div class="verb-header">
                          <span class="verb-type">System & Data</span>
                          <span class="verb-desc">composables, format, build...</span>
                        </div>
                        <div class="verb-list">
                          <span class="verb-badge">use</span>
                          <span class="verb-badge">format</span>
                          <span class="verb-badge">mask</span>
                          <span class="verb-badge">parse</span>
                          <span class="verb-badge">build</span>
                          <span class="verb-badge">register</span>
                          <span class="verb-badge">scan</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </ShowcaseCard>
              </div>
            </div>

            <div
              id="folders"
              class="scroll-mt-24 relative"
            >
              <div class="flex items-center gap-4 mb-10 pb-4 border-b border-slate-200">
                <div
                  class="w-12 h-12 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center border border-slate-100"
                >
                  <IIcon
                    icon="mdi-folder-outline"
                    size="24"
                  />
                </div>
                <h2 class="text-2xl font-black text-slate-800">資料夾功能</h2>
              </div>

              <div class="space-y-8">
                <div class="folder-grid">
                  <!-- Pages -->
                  <div class="folder-card">
                    <div class="folder-header">
                      <div class="folder-identity">
                        <IIcon
                          class="folder-icon text-blue-400"
                          size="24"
                          icon="mdi-file-document-multiple"
                        />
                        <span class="folder-name">pages/</span>
                      </div>
                      <span class="naming-badge">kebab-case</span>
                    </div>
                    <div class="folder-body">
                      <p class="folder-desc">頁面路由 - Nuxt 自動生成</p>
                      <div class="folder-examples">
                        <div class="example-row valid">
                          <IIcon
                            size="14"
                            class="text-emerald-400"
                            icon="mdi-check"
                          />
                          <span>user-profile.vue</span>
                        </div>
                        <div class="example-row invalid">
                          <IIcon
                            size="14"
                            class="text-red-400"
                            icon="mdi-close"
                          />
                          <span>UserProfile.vue</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Layouts -->
                  <div class="folder-card">
                    <div class="folder-header">
                      <div class="folder-identity">
                        <IIcon
                          class="folder-icon text-purple-400"
                          size="24"
                          icon="mdi-page-layout-header"
                        />
                        <span class="folder-name">layouts/</span>
                      </div>
                      <span class="naming-badge">kebab-case</span>
                    </div>
                    <div class="folder-body">
                      <p class="folder-desc">共用的頁面與版型框架</p>
                      <div class="folder-examples">
                        <div class="example-row valid">
                          <IIcon
                            size="14"
                            class="text-emerald-400"
                            icon="mdi-check"
                          />
                          <span>default.vue</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Components (Special Card) -->
                  <div class="folder-card">
                    <div class="folder-header">
                      <div class="folder-identity">
                        <IIcon
                          class="folder-icon text-green-400"
                          size="24"
                          icon="mdi-puzzle"
                        />
                        <span class="folder-name">components/</span>
                      </div>
                      <span class="naming-badge mixed">Mixed</span>
                    </div>
                    <div class="folder-body">
                      <p class="folder-desc mb-4">UI 元件庫 - 依類型區分資料夾</p>
                      <div class="sub-folders">
                        <div class="sub-folder-item">
                          <div class="sub-folder-head">
                            <span class="sub-name">uiInterface/</span>
                            <span class="naming-badge sm">I + PascalCase</span>
                          </div>
                          <div class="sub-desc">純 UI 元件 (IButton.vue)</div>
                        </div>
                        <div class="sub-folder-item">
                          <div class="sub-folder-head">
                            <span class="sub-name">uiBusiness/</span>
                            <span class="naming-badge sm">PascalCase</span>
                          </div>
                          <div class="sub-desc">業務 UI 元件 (UserCard.vue)</div>
                        </div>
                        <div class="sub-folder-item">
                          <div class="sub-folder-head">
                            <span class="sub-name">business/</span>
                            <span class="naming-badge sm">PascalCase</span>
                          </div>
                          <div class="sub-desc">業務邏輯元件 (GlobalSnackbar)</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Composables -->
                  <div class="folder-card">
                    <div class="folder-header">
                      <div class="folder-identity">
                        <IIcon
                          class="folder-icon text-blue-400"
                          size="24"
                          icon="mdi-function-variant"
                        />
                        <span class="folder-name">composables/</span>
                      </div>
                      <span class="naming-badge">camelCase</span>
                    </div>
                    <div class="folder-body">
                      <p class="folder-desc">共用邏輯 (Composition API)</p>
                      <div class="folder-examples">
                        <div class="example-row valid">
                          <IIcon
                            size="14"
                            class="text-emerald-400"
                            icon="mdi-check"
                          />
                          <span>useAuth.ts</span>
                        </div>
                        <div class="example-row invalid">
                          <IIcon
                            size="14"
                            class="text-red-400"
                            icon="mdi-close"
                          />
                          <span>auth.ts</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Stores -->
                  <div class="folder-card">
                    <div class="folder-header">
                      <div class="folder-identity">
                        <IIcon
                          class="folder-icon text-pink-400"
                          size="24"
                          icon="mdi-database"
                        />
                        <span class="folder-name">stores/</span>
                      </div>
                      <span class="naming-badge">camelCase</span>
                    </div>
                    <div class="folder-body">
                      <p class="folder-desc">全域狀態管理 (Pinia)</p>
                      <div class="folder-examples">
                        <div class="example-row valid">
                          <IIcon
                            size="14"
                            class="text-emerald-400"
                            icon="mdi-check"
                          />
                          <span>user.ts</span>
                        </div>
                        <div class="example-row invalid">
                          <IIcon
                            size="14"
                            class="text-red-400"
                            icon="mdi-close"
                          />
                          <span>userStore.ts</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Core -->
                  <div class="folder-card">
                    <div class="folder-header">
                      <div class="folder-identity">
                        <IIcon
                          class="folder-icon text-orange-400"
                          size="24"
                          icon="mdi-cog"
                        />
                        <span class="folder-name">core/</span>
                      </div>
                      <span class="naming-badge">camelCase</span>
                    </div>
                    <div class="folder-body">
                      <p class="folder-desc">系統核心功能與設定</p>
                      <div class="folder-examples">
                        <div class="example-row valid">
                          <IIcon
                            size="14"
                            class="text-emerald-400"
                            icon="mdi-check"
                          />
                          <span>client.ts</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Repositories -->
                  <div class="folder-card">
                    <div class="folder-header">
                      <div class="folder-identity">
                        <IIcon
                          class="folder-icon text-teal-400"
                          size="24"
                          icon="mdi-source-repository"
                        />
                        <span class="folder-name">repositories/</span>
                      </div>
                      <span class="naming-badge">camelCase</span>
                    </div>
                    <div class="folder-body">
                      <p class="folder-desc">API 資料層封裝 (+Repo)</p>
                      <div class="folder-examples">
                        <div class="example-row valid">
                          <IIcon
                            size="14"
                            class="text-emerald-400"
                            icon="mdi-check"
                          />
                          <span>userRepo.ts</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Modules -->
                  <div class="folder-card">
                    <div class="folder-header">
                      <div class="folder-identity">
                        <IIcon
                          class="folder-icon text-amber-400"
                          size="24"
                          icon="mdi-folder-open"
                        />
                        <span class="folder-name">modules/</span>
                      </div>
                      <span class="naming-badge">kebab-case</span>
                    </div>
                    <div class="folder-body">
                      <p class="folder-desc">獨立功能模組分類</p>
                      <div class="folder-examples">
                        <div class="example-row valid">
                          <IIcon
                            size="14"
                            class="text-emerald-400"
                            icon="mdi-check"
                          />
                          <span>showcase/</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Utils -->
                  <div class="folder-card">
                    <div class="folder-header">
                      <div class="folder-identity">
                        <IIcon
                          class="folder-icon text-cyan-400"
                          size="24"
                          icon="mdi-toolbox"
                        />
                        <span class="folder-name">utils/</span>
                      </div>
                      <span class="naming-badge">camelCase</span>
                    </div>
                    <div class="folder-body">
                      <p class="folder-desc">純共用工具函式</p>
                      <div class="folder-examples">
                        <div class="example-row valid">
                          <IIcon
                            size="14"
                            class="text-emerald-400"
                            icon="mdi-check"
                          />
                          <span>formatDate.ts</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Types -->
                  <div class="folder-card">
                    <div class="folder-header">
                      <div class="folder-identity">
                        <IIcon
                          class="folder-icon text-indigo-400"
                          size="24"
                          icon="mdi-code-braces"
                        />
                        <span class="folder-name">types/</span>
                      </div>
                      <span class="naming-badge">PascalCase</span>
                    </div>
                    <div class="folder-body">
                      <p class="folder-desc">TypeScript 型別定義</p>
                      <div class="folder-examples">
                        <div class="example-row valid">
                          <IIcon
                            size="14"
                            class="text-emerald-400"
                            icon="mdi-check"
                          />
                          <span>UserData.ts</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Assets -->
                  <div class="folder-card">
                    <div class="folder-header">
                      <div class="folder-identity">
                        <IIcon
                          class="folder-icon text-lime-400"
                          size="24"
                          icon="mdi-image-multiple"
                        />
                        <span class="folder-name">assets/</span>
                      </div>
                      <span class="naming-badge">kebab-case</span>
                    </div>
                    <div class="folder-body">
                      <p class="folder-desc">靜態資源 (SCSS, Images)</p>
                    </div>
                  </div>

                  <!-- Public -->
                  <div class="folder-card">
                    <div class="folder-header">
                      <div class="folder-identity">
                        <IIcon
                          class="folder-icon text-grey-400"
                          size="24"
                          icon="mdi-folder-open-outline"
                        />
                        <span class="folder-name">public/</span>
                      </div>
                      <span class="naming-badge gray">Original</span>
                    </div>
                    <div class="folder-body">
                      <p class="folder-desc">公開資源 (favicon.ico)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              id="architecture"
              class="scroll-mt-24 relative"
            >
              <div class="flex items-center gap-4 mb-10 pb-4 border-b border-slate-200">
                <div
                  class="w-12 h-12 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center border border-slate-100"
                >
                  <IIcon
                    icon="mdi-domain"
                    size="24"
                  />
                </div>
                <h2 class="text-2xl font-black text-slate-800">架構規範 (Architecture)</h2>
              </div>

              <div class="space-y-8">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <!-- API Layer -->
                  <ShowcaseCard
                    title="API 資料層 (Repository Pattern)"
                    description="資料請求必須封裝，禁止 Component 直接呼叫。"
                    full-width
                  >
                    <div class="arch-card-content">
                      <div class="arch-do-dont">
                        <div class="arch-block valid">
                          <div class="arch-badge">
                            <IIcon
                              size="14"
                              class="mr-1"
                              icon="mdi-check"
                            />
                            Do (Repository)
                          </div>
                          <ShowcaseCodeBlock
                            code="// services/userRepo.ts
export const userRepo = {
  getProfile() {
    return client.get('/me')
  }
}

// In Component
const { data } = await userRepo.getProfile()"
                            language="typescript"
                            class="mt-2"
                          />
                        </div>
                        <div class="arch-block invalid">
                          <div class="arch-badge">
                            <IIcon
                              size="14"
                              class="mr-1"
                              icon="mdi-close"
                            />
                            Don't (Direct Call)
                          </div>
                          <ShowcaseCodeBlock
                            code="// ❌ 禁止在 Component 寫 URL
const { data } = await useFetch('/api/me')

// ❌ 禁止直接用 axios
axios.get('https://api.com/me')"
                            language="typescript"
                            class="mt-2"
                          />
                        </div>
                      </div>
                    </div>
                  </ShowcaseCard>

                  <!-- Composables -->
                  <ShowcaseCard
                    title="Composables 設計規範"
                    description="邏輯複用 (Hooks) 的標準寫法。"
                    full-width
                  >
                    <div class="arch-card-content">
                      <ul class="arch-rules-list">
                        <li>
                          <span class="rule-key">命名慣例</span>
                          <span class="rule-val">
                            必須以
                            <code>use</code>
                            開頭 (camelCase)
                          </span>
                        </li>
                        <li>
                          <span class="rule-key">回傳格式</span>
                          <span class="rule-val">
                            必須回傳
                            <code>Object</code>
                            以利解構
                          </span>
                        </li>
                        <li>
                          <span class="rule-key">狀態管理</span>
                          <span class="rule-val">區分 Pinia (Global) 與 Ref (Local)</span>
                        </li>
                      </ul>
                      <ShowcaseCodeBlock
                        code="// composables/useCounter.ts
export function useCounter() {
  const count = ref(0)
  const double = computed(() => count.value * 2)
  
  function increment() {
    count.value++
  }

  // ✅ Return Object
  return {
    count,
    double,
    increment
  }
}"
                        language="typescript"
                        class="mt-4"
                      />
                    </div>
                  </ShowcaseCard>
                </div>
              </div>
            </div>

            <div
              id="typescript"
              class="scroll-mt-24 relative"
            >
              <div class="flex items-center gap-4 mb-10 pb-4 border-b border-slate-200">
                <div
                  class="w-12 h-12 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center border border-slate-100"
                >
                  <IIcon
                    icon="mdi-language-typescript"
                    size="24"
                  />
                </div>
                <h2 class="text-2xl font-black text-slate-800">TypeScript 使用規則</h2>
              </div>

              <div class="space-y-8">
                <ShowcaseCard
                  title="型別標註規範"
                  description="什麼時候要寫型別,什麼時候可以省略"
                  full-width
                >
                  <div class="ts-rules-grid">
                    <div class="ts-rule-card">
                      <div class="ts-rule-header">
                        <IIcon
                          size="20"
                          class="text-emerald-400"
                          icon="mdi-check-circle"
                        />
                        <span class="ts-rule-title">必須明確標註型別</span>
                      </div>
                      <ul class="ts-rule-list">
                        <li>函式參數</li>
                        <li>函式回傳值 (除非是 void)</li>
                        <li>公開的 API 介面</li>
                        <li>複雜的物件結構</li>
                      </ul>
                      <ShowcaseCodeBlock
                        code="// ✅ 正確
function getUser(id: number): Promise<User> {
  return api.get(`/users/${id}`)
}

// ✅ 正確
const handleSubmit = (data: FormData): void => {
  console.log(data)
}"
                        language="typescript"
                      />
                    </div>

                    <div class="ts-rule-card">
                      <div class="ts-rule-header">
                        <IIcon
                          size="20"
                          class="text-blue-400"
                          icon="mdi-information"
                        />
                        <span class="ts-rule-title">可以省略型別</span>
                      </div>
                      <ul class="ts-rule-list">
                        <li>變數初始化時 (型別推斷)</li>
                        <li>簡單的箭頭函式</li>
                        <li>迴圈變數</li>
                      </ul>
                      <ShowcaseCodeBlock
                        code="// ✅ 正確 (型別推斷)
const count = 0  // number
const name = 'John'  // string
const isActive = true  // boolean

// ✅ 正確
const double = (n: number) => n * 2"
                        language="typescript"
                      />
                    </div>

                    <div class="ts-rule-card">
                      <div class="ts-rule-header">
                        <IIcon
                          size="20"
                          class="text-red-400"
                          icon="mdi-close-circle"
                        />
                        <span class="ts-rule-title">禁止使用</span>
                        <div class="config-source ml-2">
                          <span>eslint: no-explicit-any</span>
                        </div>
                      </div>
                      <ul class="ts-rule-list">
                        <li>
                          <code>any</code>
                          型別 (除非必要)
                        </li>
                        <li>
                          <code>@ts-ignore</code>
                          註解
                        </li>
                        <li>
                          型別斷言
                          <code>as any</code>
                        </li>
                      </ul>
                      <ShowcaseCodeBlock
                        code="// ❌ 錯誤
function process(data: any) {
  return data
}

// ✅ 正確
function process(data: unknown) {
  if (typeof data === 'string') {
    return data.toUpperCase()
  }
}"
                        language="typescript"
                      />
                    </div>
                  </div>
                </ShowcaseCard>

                <ShowcaseCard
                  title="介面與型別定義"
                  description="Interface vs Type 的使用時機"
                  full-width
                >
                  <div class="ts-comparison">
                    <div class="ts-comparison-item">
                      <div class="ts-comparison-header">
                        <IIcon
                          size="20"
                          class="text-purple-400"
                          icon="mdi-code-braces"
                        />
                        <span class="ts-comparison-title">使用 Interface</span>
                      </div>
                      <div class="ts-comparison-when">
                        <IIcon
                          size="16"
                          class="text-purple-300"
                          icon="mdi-arrow-right"
                        />
                        <span>適用於: 物件結構、類別、可擴展的定義</span>
                      </div>
                      <ShowcaseCodeBlock
                        code="// ✅ 使用 Interface
interface User {
  id: number
  name: string
  email: string
}

// 可以擴展
interface AdminUser extends User {
  role: 'admin'
  permissions: string[]
}"
                        language="typescript"
                      />
                    </div>

                    <div class="ts-comparison-item">
                      <div class="ts-comparison-header">
                        <IIcon
                          size="20"
                          class="text-amber-400"
                          icon="mdi-format-letter-case"
                        />
                        <span class="ts-comparison-title">使用 Type</span>
                      </div>
                      <div class="ts-comparison-when">
                        <IIcon
                          size="16"
                          class="text-amber-300"
                          icon="mdi-arrow-right"
                        />
                        <span>適用於: 聯合型別、交集型別、工具型別</span>
                      </div>
                      <ShowcaseCodeBlock
                        code="// ✅ 使用 Type
type Status = 'pending' | 'success' | 'error'

type ID = string | number

type ApiResponse<T> = {
  data: T
  status: number
  message: string
}"
                        language="typescript"
                      />
                    </div>
                  </div>
                </ShowcaseCard>
              </div>
            </div>

            <div
              id="eslint"
              class="scroll-mt-24 relative"
            >
              <div class="flex items-center gap-4 mb-10 pb-4 border-b border-slate-200">
                <div
                  class="w-12 h-12 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center border border-slate-100"
                >
                  <IIcon
                    icon="mdi-git"
                    size="24"
                  />
                </div>
                <h2 class="text-2xl font-black text-slate-800">Git 提交規範 (Commit)</h2>
              </div>

              <div class="space-y-8">
                <div class="git-section-grid">
                  <!-- Left: Structure & Types -->
                  <div class="git-col-left">
                    <ShowcaseCard
                      title="Commit Message 格式"
                      icon="mdi-format-align-left"
                      class="h-full"
                    >
                      <div class="commit-structure">
                        <div class="structure-row">
                          <span class="structure-tag type">type</span>
                          <span class="structure-bracket">(</span>
                          <span class="structure-tag scope">scope</span>
                          <span class="structure-bracket">):</span>
                          <span class="structure-tag subject">subject</span>
                        </div>
                        <div class="structure-row optional">
                          <span class="structure-tag body">body</span>
                        </div>
                        <div class="structure-row optional">
                          <span class="structure-tag footer">footer</span>
                        </div>
                      </div>

                      <div class="types-grid">
                        <div class="type-item type-feat">
                          <span class="type-name">feat</span>
                          <span class="type-desc">新功能</span>
                        </div>
                        <div class="type-item type-fix">
                          <span class="type-name">fix</span>
                          <span class="type-desc">修復 Bug</span>
                        </div>
                        <div class="type-item type-refactor">
                          <span class="type-name">refactor</span>
                          <span class="type-desc">重構程式碼</span>
                        </div>
                        <div class="type-item type-docs">
                          <span class="type-name">docs</span>
                          <span class="type-desc">文件更新</span>
                        </div>
                        <div class="type-item type-style">
                          <span class="type-name">style</span>
                          <span class="type-desc">格式調整</span>
                        </div>
                        <div class="type-item type-test">
                          <span class="type-name">test</span>
                          <span class="type-desc">測試相關</span>
                        </div>
                        <div class="type-item type-chore">
                          <span class="type-name">chore</span>
                          <span class="type-desc">雜項處理</span>
                        </div>
                        <div class="type-item type-perf">
                          <span class="type-name">perf</span>
                          <span class="type-desc">效能優化</span>
                        </div>
                      </div>
                    </ShowcaseCard>
                  </div>

                  <!-- Right: Examples -->
                  <div class="git-col-right">
                    <ShowcaseCard
                      title="範例展示"
                      icon="mdi-code-tags"
                      class="h-full"
                    >
                      <div class="examples-list">
                        <div class="example-item">
                          <div class="example-header">
                            <IIcon
                              size="16"
                              class="text-emerald-400"
                              icon="mdi-check-circle"
                            />
                            <span class="example-title">新增功能</span>
                          </div>
                          <div class="example-code">
                            <span class="code-type feat">feat</span>
                            <span class="code-scope">(auth)</span>
                            :
                            <span class="code-subject">新增 Google 登入功能</span>
                          </div>
                        </div>

                        <div class="example-item">
                          <div class="example-header">
                            <IIcon
                              size="14"
                              class="mr-1 text-blue-400"
                              icon="mdi-check"
                            />
                            <span class="example-title">修復錯誤</span>
                          </div>
                          <div class="example-code">
                            <span class="code-type fix">fix</span>
                            <span class="code-scope">(api)</span>
                            :
                            <span class="code-subject">修復用戶資料取得失敗的問題</span>
                          </div>
                        </div>

                        <div class="example-item">
                          <div class="example-header">
                            <IIcon
                              size="14"
                              class="mr-1 text-purple-400"
                              icon="mdi-check"
                            />
                            <span class="example-title">程式碼重構</span>
                          </div>
                          <div class="example-code">
                            <span class="code-type refactor">refactor</span>
                            <span class="code-scope">(components)</span>
                            :
                            <span class="code-subject">優化按鈕元件結構</span>
                          </div>
                        </div>

                        <div class="example-item">
                          <div class="example-header">
                            <IIcon
                              size="14"
                              class="mr-1 text-orange-400"
                              icon="mdi-check"
                            />
                            <span class="example-title">文件更新</span>
                          </div>
                          <div class="example-code">
                            <span class="code-type docs">docs</span>
                            <span class="code-scope">(readme)</span>
                            :
                            <span class="code-subject">更新安裝說明文件</span>
                          </div>
                        </div>
                      </div>
                    </ShowcaseCard>
                  </div>
                </div>

                <!-- Git Flow Diagram -->
                <ShowcaseCard
                  title="標準開發流程 (Git Flow)"
                  description="從更新程式碼到提交推送的完整步驟。"
                  full-width
                  class="mt-6"
                >
                  <div class="git-flow">
                    <!-- Step 1 -->
                    <div class="flow-step">
                      <div class="step-num">1</div>
                      <div class="step-content">
                        <span class="step-label">Update</span>
                        <code class="step-cmd">git pull</code>
                      </div>
                    </div>

                    <div class="flow-arrow">
                      <IIcon
                        class="text-slate-500"
                        icon="mdi-arrow-right"
                      />
                    </div>

                    <!-- Step 2 -->
                    <div class="flow-step">
                      <div class="step-num">2</div>
                      <div class="step-content">
                        <span class="step-label">Branch</span>
                        <code class="step-cmd">git checkout -b...</code>
                      </div>
                    </div>

                    <div class="flow-arrow">
                      <IIcon
                        class="text-slate-500"
                        icon="mdi-arrow-right"
                      />
                    </div>

                    <!-- Step 3 -->
                    <div class="flow-step">
                      <div class="step-num">3</div>
                      <div class="step-content">
                        <span class="step-label">Develop</span>
                        <div class="step-desc">Coding...</div>
                      </div>
                    </div>

                    <div class="flow-arrow">
                      <IIcon
                        class="text-slate-500"
                        icon="mdi-arrow-right"
                      />
                    </div>

                    <!-- Step 4 -->
                    <div class="flow-step">
                      <div class="step-num">4</div>
                      <div class="step-content">
                        <span class="step-label">Stage</span>
                        <code class="step-cmd">git add .</code>
                      </div>
                    </div>

                    <div class="flow-arrow">
                      <IIcon
                        class="text-slate-500"
                        icon="mdi-arrow-right"
                      />
                    </div>

                    <!-- Step 5 -->
                    <div class="flow-step interact">
                      <div class="step-num">5</div>
                      <div class="step-content">
                        <span class="step-label">Commit</span>
                        <code class="step-cmd highlight">npm run commit</code>
                      </div>
                    </div>

                    <div class="flow-arrow">
                      <IIcon
                        class="text-slate-500"
                        icon="mdi-arrow-right"
                      />
                    </div>

                    <!-- Step 6 -->
                    <div class="flow-step">
                      <div class="step-num">6</div>
                      <div class="step-content">
                        <span class="step-label">Push</span>
                        <code class="step-cmd">git push</code>
                      </div>
                    </div>
                  </div>
                </ShowcaseCard>
              </div>
            </div>

            <div
              id="git"
              class="scroll-mt-24 relative"
            >
              <div class="flex items-center gap-4 mb-10 pb-4 border-b border-slate-200">
                <div
                  class="w-12 h-12 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center border border-slate-100"
                >
                  <IIcon
                    icon="mdi-shield-check"
                    size="24"
                  />
                </div>
                <h2 class="text-2xl font-black text-slate-800">品質檢查工具</h2>
              </div>

              <div class="space-y-8">
                <div class="packages-grid">
                  <!-- ESLint -->
                  <div class="package-card">
                    <div class="package-header">
                      <IIcon
                        size="24"
                        class="text-purple-400"
                        icon="mdi-eslint"
                      />
                      <div class="package-name">ESLint 檢查</div>
                    </div>
                    <div class="package-desc">程式碼風格與品質檢查</div>
                    <div class="package-install">
                      <ShowcaseCodeBlock
                        code="npm run lint"
                        language="bash"
                      />
                    </div>
                  </div>

                  <!-- Git Hooks -->
                  <div class="package-card">
                    <div class="package-header">
                      <IIcon
                        size="24"
                        class="text-emerald-400"
                        icon="mdi-git"
                      />
                      <div class="package-name">Git Hooks</div>
                    </div>
                    <div class="package-desc">Commit 前自動執行檢查</div>
                    <div class="package-install">
                      <ShowcaseCodeBlock
                        code="npm run prepare"
                        language="bash"
                      />
                    </div>
                  </div>

                  <!-- Emergency Skip -->
                  <div class="package-card">
                    <div class="package-header">
                      <IIcon
                        size="24"
                        class="text-amber-400"
                        icon="mdi-alert"
                      />
                      <div class="package-name">緊急跳過</div>
                    </div>
                    <div class="package-desc">僅在緊急情況使用</div>
                    <div class="package-install">
                      <ShowcaseCodeBlock
                        code="git commit -n -m 'message'"
                        language="bash"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              id="pinia"
              class="scroll-mt-24 relative"
            >
              <div class="flex items-center gap-4 mb-10 pb-4 border-b border-slate-200">
                <div
                  class="w-12 h-12 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center border border-slate-100"
                >
                  <IIcon
                    icon="mdi-shield-check"
                    size="24"
                  />
                </div>
                <h2 class="text-2xl font-black text-slate-800">程式碼品質 (QA)</h2>
              </div>

              <div class="space-y-8">
                <!-- ESLint Checks -->
                <div class="package-category">
                  <div class="category-header">
                    <div class="category-icon category-icon-emerald">
                      <IIcon
                        size="20"
                        class="text-emerald-400"
                        icon="mdi-shield-check-outline"
                      />
                    </div>
                    <h3 class="category-title">自動檢查工具 (ESLint)</h3>
                  </div>
                  <div class="packages-grid">
                    <!-- TypeScript Check -->
                    <div class="package-card">
                      <div class="package-header">
                        <div class="package-name">TypeScript 檢查</div>
                        <IIcon
                          class="folder-icon text-teal-400"
                          size="24"
                          icon="mdi-language-typescript"
                        />
                      </div>
                      <div class="config-badge">
                        <span>@typescript-eslint/no-unused-vars</span>
                      </div>
                      <div class="package-desc">避免型別錯誤</div>
                      <div class="package-install">
                        <ShowcaseCodeBlock
                          code="// ✓ 正確
const user: User = {
  id: 1,
  name: 'John'
}"
                          language="typescript"
                        />
                      </div>
                    </div>

                    <!-- Prettier Format -->
                    <div class="package-card">
                      <div class="package-header">
                        <div class="package-name">Prettier 排版</div>
                        <IIcon
                          size="20"
                          class="text-pink-400"
                          icon="mdi-format-paint"
                        />
                      </div>
                      <div class="config-badge">
                        <span>prettier/prettier</span>
                      </div>
                      <div class="package-desc">幫你把程式碼排整齊</div>
                      <div class="package-install">
                        <ShowcaseCodeBlock
                          code="// 存檔時自動格式化
// 統一縮排、引號、分號"
                          language="javascript"
                        />
                      </div>
                    </div>

                    <!-- JSDoc Comments -->
                    <div class="package-card">
                      <div class="package-header">
                        <div class="package-name">JSDoc 註解</div>
                        <IIcon
                          size="20"
                          class="text-amber-400"
                          icon="mdi-comment-text-outline"
                        />
                      </div>
                      <div class="config-badge">
                        <span>eslint.config.mjs</span>
                      </div>
                      <div class="package-desc">
                        <p>強制 ESLint 檢查規則：</p>
                        <ul class="text-xs text-slate-400 mt-2 list-disc pl-4 space-y-1">
                          <li>Function / Class / Method 必須有 JSDoc</li>
                          <li>
                            必須包含
                            <code>@param</code>
                            與
                            <code>@returns</code>
                          </li>
                          <li>參數與回傳值都「必須」要有描述說明</li>
                        </ul>
                      </div>
                      <div class="package-install">
                        <ShowcaseCodeBlock
                          code="/**
 * 取得使用者資料
 * @param {number} id
 * @returns {Promise<User>}
 */"
                          language="javascript"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Git Workflow Tools -->
                <div class="package-category">
                  <div class="category-header">
                    <div class="category-icon category-icon-blue">
                      <IIcon
                        size="20"
                        class="text-blue-400"
                        icon="mdi-git"
                      />
                    </div>
                    <h3 class="category-title">Git 工作流工具 (Workflow)</h3>
                  </div>
                  <div class="packages-grid">
                    <!-- Husky -->
                    <div class="package-card">
                      <div class="package-header">
                        <div class="package-name">Husky</div>
                        <div class="package-version">^9.1.7</div>
                      </div>
                      <div class="package-desc">Git Hooks - Commit 前自動檢查</div>
                      <div class="package-install">
                        <ShowcaseCodeBlock
                          code="# 自動攔截並檢查
git commit -m 'feat: 新功能'"
                          language="bash"
                        />
                      </div>
                    </div>

                    <!-- Lint Staged -->
                    <div class="package-card">
                      <div class="package-header">
                        <div class="package-name">Lint Staged</div>
                        <div class="package-version">^16.2.7</div>
                      </div>
                      <div class="package-desc">只檢查這次修改的檔案</div>
                      <div class="package-install">
                        <ShowcaseCodeBlock
                          code="# 速度很快
# 只檢查暫存區的檔案"
                          language="bash"
                        />
                      </div>
                    </div>

                    <!-- Commitizen -->
                    <div class="package-card">
                      <div class="package-header">
                        <div class="package-name">Commitizen</div>
                        <div class="package-version">^4.3.1</div>
                      </div>
                      <div class="package-desc">協助撰寫標準 Commit 訊息</div>
                      <div class="package-install">
                        <ShowcaseCodeBlock
                          code="# 互動式選單
npm run commit"
                          language="bash"
                        />
                      </div>
                    </div>

                    <!-- Commitlint -->
                    <div class="package-card">
                      <div class="package-header">
                        <div class="package-name">Commitlint</div>
                        <div class="package-version">^19.x</div>
                      </div>
                      <div class="package-desc">檢查 Commit 訊息格式</div>
                      <div class="package-install">
                        <ShowcaseCodeBlock
                          code="# 必須符合規範
feat: 新增功能
fix: 修正錯誤"
                          language="bash"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Skip Checks (Emergency) -->
                <div class="package-category">
                  <div class="category-header">
                    <div class="category-icon category-icon-amber">
                      <IIcon
                        size="20"
                        class="text-amber-400"
                        icon="mdi-alert"
                      />
                    </div>
                    <h3 class="category-title">緊急略過檢查 (盡量少用)</h3>
                  </div>
                  <div class="qa-warning-note">
                    <IIcon
                      size="20"
                      class="text-amber-400"
                      icon="mdi-alert-circle-outline"
                    />
                    <span>注意:僅在緊急情況使用,跳過檢查可能導致程式碼品質問題。</span>
                  </div>
                  <div class="packages-grid">
                    <!-- Skip Commit Check -->
                    <div class="package-card qa-warning-card">
                      <div class="package-header">
                        <div class="package-name">Commit 時跳過</div>
                        <IIcon
                          size="20"
                          class="text-amber-400"
                          icon="mdi-close-circle-outline"
                        />
                      </div>
                      <div class="package-desc">跳過所有 Git Hooks 檢查</div>
                      <div class="package-install">
                        <ShowcaseCodeBlock
                          code="git commit -n -m '急件處理'"
                          language="bash"
                        />
                      </div>
                    </div>

                    <!-- Skip Line Check -->
                    <div class="package-card qa-warning-card">
                      <div class="package-header">
                        <div class="package-name">某一行跳過</div>
                        <IIcon
                          size="20"
                          class="text-amber-400"
                          icon="mdi-code-not-equal-variant"
                        />
                      </div>
                      <div class="package-desc">跳過特定行的 ESLint 檢查</div>
                      <div class="package-install">
                        <ShowcaseCodeBlock
                          code="// eslint-disable-next-line
console.log('debug')"
                          language="javascript"
                        />
                      </div>
                    </div>

                    <!-- Skip File Check -->
                    <div class="package-card qa-warning-card">
                      <div class="package-header">
                        <div class="package-name">整個檔案跳過</div>
                        <IIcon
                          size="20"
                          class="text-amber-400"
                          icon="mdi-file-cancel-outline"
                        />
                      </div>
                      <div class="package-desc">跳過整個檔案的檢查</div>
                      <div class="package-install">
                        <ShowcaseCodeBlock
                          code="/* eslint-disable */
// 整個檔案都不檢查"
                          language="javascript"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              id="section-7"
              class="scroll-mt-24 relative"
            >
              <div class="flex items-center gap-4 mb-10 pb-4 border-b border-slate-200">
                <div
                  class="w-12 h-12 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center border border-slate-100"
                >
                  <IIcon
                    icon="mdi-language-javascript"
                    size="24"
                  />
                </div>
                <h2 class="text-2xl font-black text-slate-800">JavaScript / TypeScript 核心規範</h2>
              </div>

              <div class="space-y-8">
                <ShowcaseCard
                  title="語法與邏輯限制"
                  description="最基礎的程式碼品質守門員。"
                  full-width
                >
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- eqeqeq -->
                    <div class="config-rule-item">
                      <div class="rule-info">
                        <span class="rule-name">eqeqeq</span>
                        <span class="rule-desc">強制全等 (===)</span>
                        <span class="rule-badge error">Error</span>
                      </div>
                      <ShowcaseCodeBlock
                        code="// ✅ 正確
if (a === b) {}

// ❌ 錯誤
if (a == b) {}"
                        language="javascript"
                      />
                    </div>

                    <!-- no-var -->
                    <div class="config-rule-item">
                      <div class="rule-info">
                        <span class="rule-name">no-var</span>
                        <span class="rule-desc">禁止使用 var</span>
                        <span class="rule-badge error">Error</span>
                      </div>
                      <ShowcaseCodeBlock
                        code="// ✅ 正確
const name = 'John'

// ❌ 錯誤
var name = 'John'"
                        language="javascript"
                      />
                    </div>

                    <!-- prefer-const -->
                    <div class="config-rule-item">
                      <div class="rule-info">
                        <span class="rule-name">prefer-const</span>
                        <span class="rule-desc">優先使用 const</span>
                        <span class="rule-badge error">Error</span>
                      </div>
                      <ShowcaseCodeBlock
                        code="// ✅ 正確
const tax = 0.05

// ❌ 錯誤
let tax = 0.05 // 未修改"
                        language="javascript"
                      />
                    </div>

                    <!-- curly -->
                    <div class="config-rule-item">
                      <div class="rule-info">
                        <span class="rule-name">curly</span>
                        <span class="rule-desc">強制大括號</span>
                        <span class="rule-badge error">Error</span>
                      </div>
                      <ShowcaseCodeBlock
                        code="// ✅ 正確
if (a) { return }

// ❌ 錯誤
if (a) return"
                        language="javascript"
                      />
                    </div>

                    <!-- prefer-template -->
                    <div class="config-rule-item">
                      <div class="rule-info">
                        <span class="rule-name">prefer-template</span>
                        <span class="rule-desc">優先使用樣板字串</span>
                        <span class="rule-badge error">Error</span>
                      </div>
                      <ShowcaseCodeBlock
                        code="// ✅ 正確
const msg = `Hi ${name}`

// ❌ 錯誤
const msg = 'Hi ' + name"
                        language="javascript"
                      />
                    </div>

                    <!-- object-shorthand -->
                    <div class="config-rule-item">
                      <div class="rule-info">
                        <span class="rule-name">object-shorthand</span>
                        <span class="rule-desc">物件屬性簡寫</span>
                        <span class="rule-badge error">Error</span>
                      </div>
                      <ShowcaseCodeBlock
                        code="// ✅ 正確
const obj = { x, y }

// ❌ 錯誤
const obj = { x: x, y: y }"
                        language="javascript"
                      />
                    </div>

                    <!-- arrow-body-style -->
                    <div class="config-rule-item">
                      <div class="rule-info">
                        <span class="rule-name">arrow-body-style</span>
                        <span class="rule-desc">簡化箭頭函式</span>
                        <span class="rule-badge error">Error</span>
                      </div>
                      <ShowcaseCodeBlock
                        code="// ✅ 正確
const get = () => 'value'

// ❌ 錯誤
const get = () => { return 'value' }"
                        language="javascript"
                      />
                    </div>

                    <!-- no-console -->
                    <div class="config-rule-item">
                      <div class="rule-info">
                        <span class="rule-name">no-console</span>
                        <span class="rule-desc">Production 禁用</span>
                        <span class="rule-badge warn">Warn</span>
                      </div>
                      <ShowcaseCodeBlock
                        code="console.log('debug')"
                        language="javascript"
                      />
                    </div>
                  </div>
                </ShowcaseCard>
              </div>
            </div>

            <div
              id="section-8"
              class="scroll-mt-24 relative"
            >
              <div class="flex items-center gap-4 mb-10 pb-4 border-b border-slate-200">
                <div
                  class="w-12 h-12 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center border border-slate-100"
                >
                  <IIcon
                    icon="mdi-vuejs"
                    size="24"
                  />
                </div>
                <h2 class="text-2xl font-black text-slate-800">Vue 模板規範</h2>
              </div>

              <div class="space-y-8">
                <ShowcaseCard
                  title="Template 最佳實踐"
                  description="讓 Vue 程式碼看起來一致且專業。"
                  full-width
                >
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- component-name -->
                    <div class="config-rule-item">
                      <div class="rule-info">
                        <span class="rule-name">component-name-in-template-casing</span>
                        <span class="rule-desc">元件大駝峰</span>
                        <span class="rule-badge error">Error</span>
                      </div>
                      <ShowcaseCodeBlock
                        code="<!-- ✅ -->
<UserCard />

<!-- ❌ -->
<user-card />"
                        language="html"
                      />
                    </div>

                    <!-- no-useless-v-bind -->
                    <div class="config-rule-item">
                      <div class="rule-info">
                        <span class="rule-name">no-useless-v-bind</span>
                        <span class="rule-desc">禁止多餘綁定</span>
                        <span class="rule-badge error">Error</span>
                      </div>
                      <ShowcaseCodeBlock
                        code="<!-- ✅ -->
<Input text='hi' />

<!-- ❌ -->
<Input :text='&quot;hi&quot;' />"
                        language="html"
                      />
                    </div>

                    <!-- prefer-true-attribute-shorthand -->
                    <div class="config-rule-item">
                      <div class="rule-info">
                        <span class="rule-name">prefer-true-attribute-shorthand</span>
                        <span class="rule-desc">Boolean 簡寫</span>
                        <span class="rule-badge error">Error</span>
                      </div>
                      <ShowcaseCodeBlock
                        code="<!-- ✅ -->
<Modal is-open />

<!-- ❌ -->
<Modal :is-open='true' />"
                        language="html"
                      />
                    </div>

                    <!-- no-v-html -->
                    <div class="config-rule-item">
                      <div class="rule-info">
                        <span class="rule-name">no-v-html</span>
                        <span class="rule-desc">禁止 v-html</span>
                        <span class="rule-badge error">Error</span>
                      </div>
                      <ShowcaseCodeBlock
                        code="<div v-html='content'></div>"
                        language="html"
                      />
                    </div>

                    <!-- attributes-order -->
                    <div class="config-rule-item">
                      <div class="rule-info">
                        <span class="rule-name">attributes-order</span>
                        <span class="rule-desc">屬性順序強制</span>
                        <span class="rule-badge error">Error</span>
                      </div>
                      <ShowcaseCodeBlock
                        code="<!-- ✅ -->
<div
  ref='el'
  v-if='show'
  @click='fn'
>

<!-- ❌ -->
<div
  @click='fn'
  ref='el'
  v-if='show'
>"
                        language="html"
                      />
                    </div>

                    <!-- block-lang -->
                    <div class="config-rule-item">
                      <div class="rule-info">
                        <span class="rule-name">block-lang</span>
                        <span class="rule-desc">Script Lang TS</span>
                        <span class="rule-badge warn">Warn</span>
                      </div>
                      <ShowcaseCodeBlock
                        code="<script lang='ts'>"
                        language="html"
                      />
                    </div>

                    <!-- max-attributes-per-line -->
                    <div class="config-rule-item">
                      <div class="rule-info">
                        <span class="rule-name">max-attributes-per-line</span>
                        <span class="rule-desc">多屬性換行</span>
                        <div class="config-source">
                          <span>單行: 1 / 多行: 1</span>
                        </div>
                        <span class="rule-badge error">Error</span>
                      </div>
                      <ShowcaseCodeBlock
                        code="<!-- ✅ Correct -->
<MyComponent
  prop-a='1'
  prop-b='2'
/>

<!-- ❌ Wrong -->
<MyComponent prop-a='1' prop-b='2' />"
                        language="html"
                      />
                    </div>

                    <!-- max-len -->
                    <div class="config-rule-item">
                      <div class="rule-info">
                        <span class="rule-name">max-len</span>
                        <span class="rule-desc">單行長度限制</span>
                        <div class="config-source">
                          <span>120 字元</span>
                        </div>
                        <span class="rule-badge error">Error</span>
                      </div>
                      <div class="text-xs text-slate-400 mt-2 px-3 mb-2">
                        包含 HTML Template 與 Script 程式碼，超過 120 字元必須換行。
                      </div>
                    </div>
                  </div>
                </ShowcaseCard>

                <!-- Allowed Patterns (Rules set to 'off') -->
                <ShowcaseCard
                  title="允許的開發模式 (Allowed Patterns)"
                  description="列出專案中已關閉的 ESLint 規則與其例外原因。"
                  full-width
                  class="mt-6"
                >
                  <div class="allowed-grid-pro">
                    <!-- multi-word-component-names -->
                    <div class="allowed-card">
                      <div class="allowed-icon-wrapper">
                        <IIcon
                          size="24"
                          class="text-emerald-400"
                          icon="mdi-check-decagram"
                        />
                      </div>
                      <div class="allowed-content">
                        <div class="allowed-head">
                          <span class="allowed-title">multi-word-component-names</span>
                          <span class="allowed-tag">Permitted</span>
                        </div>
                        <p class="allowed-text">
                          允許單字元件名稱 (如
                          <code>Login.vue</code>
                          )，無需強制使用複合字 (如
                          <code>LoginPage.vue</code>
                          )。
                        </p>
                      </div>
                    </div>

                    <!-- no-multiple-template-root -->
                    <div class="allowed-card">
                      <div class="allowed-icon-wrapper">
                        <IIcon
                          size="24"
                          class="text-emerald-400"
                          icon="mdi-layers-triple-outline"
                        />
                      </div>
                      <div class="allowed-content">
                        <div class="allowed-head">
                          <span class="allowed-title">no-multiple-template-root</span>
                          <span class="allowed-tag">Permitted</span>
                        </div>
                        <p class="allowed-text">
                          Vue 3 原生支援 Fragment，Template 中可擁有多個根節點，無需外層包裹
                          <code>div</code>
                          。
                        </p>
                      </div>
                    </div>

                    <!-- html-self-closing -->
                    <div class="allowed-card">
                      <div class="allowed-icon-wrapper">
                        <IIcon
                          class="folder-icon text-indigo-400"
                          size="24"
                          icon="mdi-code-json"
                        />
                      </div>
                      <div class="allowed-content">
                        <div class="allowed-head">
                          <span class="allowed-title">html-self-closing</span>
                          <span class="allowed-tag">Permitted</span>
                        </div>
                        <p class="allowed-text">
                          HTML 標籤不強制自閉合，保持 HTML 原生寫法彈性 (如
                          <code>&lt;div&gt;&lt;/div&gt;</code>
                          )。
                        </p>
                      </div>
                    </div>

                    <!-- no-empty-alt -->
                    <div class="allowed-card">
                      <div class="allowed-icon-wrapper">
                        <IIcon
                          size="24"
                          class="text-emerald-400"
                          icon="mdi-image-off-outline"
                        />
                      </div>
                      <div class="allowed-content">
                        <div class="allowed-head">
                          <span class="allowed-title">no-empty-alt</span>
                          <span class="allowed-tag">Permitted</span>
                        </div>
                        <p class="allowed-text">
                          允許裝飾性圖片使用空
                          <code>alt=""</code>
                          屬性，避免螢幕閱讀器讀取多餘資訊。
                        </p>
                      </div>
                    </div>

                    <!-- valid-v-slot -->
                    <div class="allowed-card">
                      <div class="allowed-icon-wrapper">
                        <IIcon
                          class="folder-icon text-blue-400"
                          size="24"
                          icon="mdi-api"
                        />
                      </div>
                      <div class="allowed-content">
                        <div class="allowed-head">
                          <span class="allowed-title">valid-v-slot</span>
                          <span class="allowed-tag">Permitted</span>
                        </div>
                        <p class="allowed-text">
                          關閉
                          <code>v-slot</code>
                          語法強制檢查，允許使用動態插槽名稱與更靈活的 Slot 寫法。
                        </p>
                      </div>
                    </div>
                  </div>
                </ShowcaseCard>
              </div>
            </div>

            <div
              id="section-9"
              class="scroll-mt-24 relative"
            >
              <div class="flex items-center gap-4 mb-10 pb-4 border-b border-slate-200">
                <div
                  class="w-12 h-12 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center border border-slate-100"
                >
                  <IIcon
                    icon="mdi-shield-check"
                    size="24"
                  />
                </div>
                <h2 class="text-2xl font-black text-slate-800">程式碼品質與排版</h2>
              </div>

              <div class="space-y-8">
                <ShowcaseCard
                  title="格式化與文件"
                  description="自動化排版與註解要求。"
                  full-width
                >
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- Prettier -->
                    <div class="config-rule-item">
                      <div class="rule-info">
                        <span class="rule-name">prettier/prettier</span>
                        <span class="rule-desc">Prettier 排版整合</span>
                        <span class="rule-badge error">Error</span>
                      </div>
                      <div class="text-sm text-slate-400">
                        任何排版錯誤 (縮排、引號、分號) 都會被視為 ESLint 錯誤，必須修正才能
                        Commit。
                      </div>
                    </div>

                    <!-- JSDoc -->
                    <div class="config-rule-item">
                      <div class="rule-info">
                        <span class="rule-name">jsdoc/*</span>
                        <span class="rule-desc">JSDoc 註解強制</span>
                        <span class="rule-badge error">Error</span>
                      </div>
                      <div class="text-sm text-slate-400">
                        所有函式 (Function/Method/Class) 都必須撰寫 JSDoc，並包含 @param 與 @returns
                        說明。
                      </div>
                    </div>

                    <!-- Max Attributes -->
                    <div class="config-rule-item">
                      <div class="rule-info">
                        <span class="rule-name">vue/max-attributes-per-line</span>
                        <span class="rule-desc">屬性換行</span>
                        <span class="rule-badge error">Error</span>
                      </div>
                      <div class="text-sm text-slate-400">
                        單行最多允許 1 個屬性，超過 1 個屬性時，每個屬性必須獨立一行。
                      </div>
                    </div>

                    <!-- Max Len -->
                    <div class="config-rule-item">
                      <div class="rule-info">
                        <span class="rule-name">vue/max-len</span>
                        <span class="rule-desc">長度限制 120</span>
                        <span class="rule-badge error">Error</span>
                      </div>
                      <div class="text-sm text-slate-400">
                        單行程式碼或模板內容不可超過 120 字元 (已排除字串長度與網址)。
                      </div>
                    </div>
                  </div>
                </ShowcaseCard>
              </div>
            </div>

            <div
              id="section-10"
              class="scroll-mt-24 relative"
            >
              <div class="flex items-center gap-4 mb-10 pb-4 border-b border-slate-200">
                <div
                  class="w-12 h-12 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center border border-slate-100"
                >
                  <IIcon
                    icon="mdi-check-circle-outline"
                    size="24"
                  />
                </div>
                <h2 class="text-2xl font-black text-slate-800">
                  允許的開發模式 (Allowed Patterns)
                </h2>
              </div>

              <div class="space-y-8">
                <ShowcaseCard
                  title="系統白名單 (Disabled Rules)"
                  description="雖然 ESLint 預設可能禁止，但我們明確允許與接受的寫法。"
                  full-width
                >
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="config-rule-item allowed">
                      <div class="rule-info">
                        <span class="rule-name">vue/multi-word-component-names</span>
                        <span class="rule-badge pass">Off</span>
                      </div>
                      <div class="text-sm text-slate-300 font-bold mb-2">允許單字元件名稱</div>
                      <div class="text-xs text-slate-400">
                        可以使用
                        <code class="text-emerald-400">Content.vue</code>
                        ，不強制
                        <code class="text-emerald-400">AppContent.vue</code>
                        。
                      </div>
                    </div>

                    <div class="config-rule-item allowed">
                      <div class="rule-info">
                        <span class="rule-name">vue/no-multiple-template-root</span>
                        <span class="rule-badge pass">Off</span>
                      </div>
                      <div class="text-sm text-slate-300 font-bold mb-2">允許多重根節點</div>
                      <div class="text-xs text-slate-400">
                        Vue 3 支援 Fragment，Template 不需要只有一個頂層 div。
                      </div>
                    </div>

                    <div class="config-rule-item allowed">
                      <div class="rule-info">
                        <span class="rule-name">no-undef</span>
                        <span class="rule-badge pass">Off</span>
                      </div>
                      <div class="text-sm text-slate-300 font-bold mb-2">支援 Nuxt 自動導入</div>
                      <div class="text-xs text-slate-400">
                        Nuxt 的 composables 與 utils 會自動 import，關閉此規則以避免誤判。
                      </div>
                    </div>

                    <div class="config-rule-item allowed">
                      <div class="rule-info">
                        <span class="rule-name">vue/html-self-closing</span>
                        <span class="rule-badge pass">Off</span>
                      </div>
                      <div class="text-sm text-slate-300 font-bold mb-2">標籤自閉合不強制</div>
                      <div class="text-xs text-slate-400">
                        允許
                        <code class="text-emerald-400">&lt;div /&gt;</code>
                        或
                        <code class="text-emerald-400">&lt;div&gt;&lt;/div&gt;</code>
                        自由混用。
                      </div>
                    </div>

                    <div class="config-rule-item allowed">
                      <div class="rule-info">
                        <span class="rule-name">vue/no-empty-alt</span>
                        <span class="rule-badge pass">Off</span>
                      </div>
                      <div class="text-sm text-slate-300 font-bold mb-2">允許空 alt 屬性</div>
                      <div class="text-xs text-slate-400">
                        裝飾性圖片允許
                        <code class="text-emerald-400">alt=""</code>
                        。
                      </div>
                    </div>

                    <div class="config-rule-item allowed">
                      <div class="rule-info">
                        <span class="rule-name">vue/script-setup-uses-vars</span>
                        <span class="rule-badge pass">Off</span>
                      </div>
                      <div class="text-sm text-slate-300 font-bold mb-2">支援 Script Setup</div>
                      <div class="text-xs text-slate-400">
                        配合 Vue 3 Script Setup 語法，防止變數被誤判為未使用。
                      </div>
                    </div>
                  </div>
                </ShowcaseCard>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
html {
  scroll-behavior: smooth;
}
/* Re-include scoped styles from original rules.vue */
.dev-context {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px;
  background-color: #f8fafc;
  border-radius: 12px;
  border: 1px dashed #cbd5e1;
}

.context-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.context-item .label {
  color: #64748b;
  font-weight: 600;
}

.context-item .value {
  background-color: #fff;
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  color: #0f172a;
  font-weight: 500;
}

/* 命名規則樣式 */
.naming-rules {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.rule-item {
  display: flex;
  flex-direction: column;
  border: 1px solid #f1f5f9;
  border-radius: 12px;
  overflow: hidden;
}

.rule-meta {
  background-color: #f8fafc;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid #f1f5f9;
}

.rule-type {
  font-weight: 700;
  color: #334155;
  font-size: 14px;
}

.rule-desc {
  color: #64748b;
  font-size: 13px;
}

.config-source {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: #94a3b8;
  font-family: monospace;
  background-color: #fff;
  padding: 2px 8px;
  border-radius: 4px;
  border: 1px solid #e2e8f0;
}

.rule-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.rule-syntax {
  font-family: monospace;
  font-size: 14px;
  color: #475569;
}

.rule-syntax .keyword {
  color: #6366f1;
  font-weight: 700;
}

.rule-syntax .divider {
  color: #cbd5e1;
  margin: 0 4px;
}

.rule-examples {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.good,
.bad {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 13px;
  font-family: monospace;
  display: flex;
  align-items: center;
}

.good::before {
  content: '✓';
  margin-right: 6px;
  font-weight: border;
}

.bad::before {
  content: '✗';
  margin-right: 6px;
  font-weight: bold;
}

.good {
  background-color: #ecfdf5;
  color: #059669;
  border: 1px solid #a7f3d0;
}

.bad {
  background-color: #fff1f2;
  color: #e11d48;
  border: 1px solid #fecdd3;
  text-decoration: line-through;
  opacity: 0.8;
}

/* 速查表 */
.cheatsheet-title {
  font-size: 15px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
}

.cheatsheet-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.verb-category {
  background-color: #f8fafc;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid #f1f5f9;
}

.verb-header {
  margin-bottom: 12px;
}

.verb-type {
  display: block;
  font-weight: 700;
  color: #334155;
  font-size: 14px;
}

.verb-desc {
  display: block;
  color: #64748b;
  font-size: 12px;
  margin-top: 2px;
}

.verb-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.verb-badge {
  font-family: monospace;
  font-size: 12px;
  padding: 3px 8px;
  background-color: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  color: #475569;
}

/* 資料夾結構 */
.folder-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.folder-card {
  background-color: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.2s ease;
}

.folder-card:hover {
  border-color: #cbd5e1;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.05),
    0 2px 4px -2px rgb(0 0 0 / 0.05);
  transform: translateY(-2px);
}

.folder-header {
  padding: 12px 16px;
  background-color: #f8fafc;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.folder-identity {
  display: flex;
  align-items: center;
  gap: 8px;
}

.folder-name {
  font-family: monospace;
  font-weight: 700;
  font-size: 15px;
  color: #1e293b;
}

.naming-badge {
  font-size: 10px;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background-color: #e0e7ff;
  color: #4338ca;
}
.naming-badge.mixed {
  background-color: #fce7f3;
  color: #be185d;
}
.naming-badge.gray {
  background-color: #f1f5f9;
  color: #64748b;
}
.naming-badge.sm {
  font-size: 9px;
  padding: 1px 4px;
}

.folder-body {
  padding: 16px;
}

.folder-desc {
  font-size: 13px;
  color: #475569;
  margin-bottom: 12px;
}

.example-row {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: monospace;
  font-size: 12px;
  margin-top: 4px;
}
.example-row.valid {
  color: #059669;
}
.example-row.invalid {
  color: #e11d48;
  text-decoration: line-through;
  opacity: 0.8;
}

.sub-folders {
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-top: 1px dashed #e2e8f0;
  padding-top: 12px;
}

.sub-folder-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.sub-folder-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sub-name {
  font-family: monospace;
  font-size: 13px;
  font-weight: 600;
  color: #334155;
  background-color: #f1f5f9;
  padding: 2px 6px;
  border-radius: 4px;
}

.sub-desc {
  font-size: 12px;
  color: #64748b;
  margin-left: 2px;
}

/* 架構規範 */
.arch-card-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.arch-do-dont {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.arch-block {
  border-radius: 12px;
  padding: 16px;
  border: 1px solid;
}

.arch-block.valid {
  background-color: #f0fdf4;
  border-color: #bbf7d0;
}

.arch-block.invalid {
  background-color: #fff1f2;
  border-color: #fecdd3;
}

.arch-badge {
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 6px;
  margin-bottom: 12px;
}

.arch-block.valid .arch-badge {
  background-color: #dcfce7;
  color: #166534;
}

.arch-block.invalid .arch-badge {
  background-color: #ffe4e6;
  color: #9f1239;
}

.arch-rules-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.arch-rules-list li {
  display: flex;
  align-items: baseline;
  font-size: 14px;
}

.rule-key {
  font-weight: 600;
  color: #334155;
  width: 80px;
  flex-shrink: 0;
}

.rule-val {
  color: #64748b;
}

.rule-val code {
  background-color: #f1f5f9;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
  color: #475569;
}

/* TypeScript 規則 */
.ts-rules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
}

.ts-rule-card {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px;
}

.ts-rule-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.ts-rule-title {
  font-weight: 700;
  color: #1e293b;
  font-size: 15px;
}

.ts-rule-list {
  padding-left: 20px;
  color: #475569;
  font-size: 14px;
  margin-bottom: 16px;
}

.ts-rule-list li {
  margin-bottom: 6px;
}

.ts-rule-list li::marker {
  color: #94a3b8;
}

/* Git 規範 */
.git-card-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.git-format {
  background-color: #0f172a;
  border-radius: 12px;
  padding: 16px;
  color: #e2e8f0;
  font-family: monospace;
  font-size: 14px;
  line-height: 1.6;
}

.format-type {
  color: #1aedb8; /* fix, feat */
  font-weight: 700;
}

.format-scope {
  color: #cbd5e1;
}

.format-icon {
  margin: 0 4px;
}

.format-desc {
  color: #94a3b8;
}

.git-types {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 8px;
}

.git-type-item {
  display: flex;
  flex-direction: column;
  background-color: #f8fafc;
  border: 1px solid #f1f5f9;
  padding: 10px 12px;
  border-radius: 8px;
}

.type-name {
  font-family: monospace;
  font-weight: 700;
  color: #334155;
  font-size: 13px;
}

.type-desc {
  font-size: 12px;
  color: #64748b;
  margin-top: 2px;
}
</style>
