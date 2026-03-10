<script setup lang="ts">
import { ref, computed } from 'vue'
import IIcon from '~/components/uiInterface/IIcon.vue'
import IBreadcrumbs from '~/components/uiInterface/layout/IBreadcrumbs.vue'
import { useBreadcrumbs } from '~/composables/useBreadcrumbs'

const { breadcrumbs: breadcrumbItems } = useBreadcrumbs()

definePageMeta({
  title: '元件與功能展現',
  layout: 'portal'
})

const guidesList = [
  {
    title: '開發指南',
    desc: 'ESLint、Git Hooks 與系統設定說明',
    icon: 'mdi-book-open-page-variant',
    to: '/showcase/development',
    color: '#475569'
  },
  {
    title: '介面設計概念',
    desc: '了解專案的視覺規範與設計思維',
    icon: 'mdi-palette-swatch',
    to: '/showcase/concept',
    color: '#14b8a6'
  },
  {
    title: '開發規矩',
    desc: '命名規則、程式碼風格與最佳實踐',
    icon: 'mdi-ruler-square',
    to: '/showcase/rules',
    color: '#f97316'
  }
]

const componentsList = [
  {
    title: '元件架構',
    desc: '三層架構設計與基礎元件總覽',
    icon: 'mdi-view-dashboard',
    to: '/showcase/component-course',
    color: '#3b82f6'
  },
  {
    title: '邏輯課程',
    desc: 'Composables 基礎：狀態、生命週期與封裝',
    icon: 'mdi-function-variant',
    to: '/showcase/composables-course',
    color: '#6366f1'
  },
  {
    title: 'Icon',
    desc: 'MDI 圖示整合與自定義 SVG 支援',
    icon: 'mdi-emoticon-happy-outline',
    to: '/showcase/icon',
    color: '#e21160'
  },
  {
    title: '檔案上傳',
    desc: '拖曳上傳、預覽與驗證機制',
    icon: 'mdi-upload',
    to: '/showcase/file-upload',
    color: '#0ea5e9'
  },
  {
    title: '檔案下載',
    desc: '多格式檔案下載與匯出',
    icon: 'mdi-download',
    to: '/showcase/file-download',
    color: '#06b6d4'
  },
  {
    title: '彈窗管理',
    desc: '統一的彈窗與對話框控制',
    icon: 'mdi-window-maximize',
    to: '/showcase/modal',
    color: '#a855f7'
  },
  {
    title: '業務表單',
    desc: 'Email、手機與日期選擇等業務元件',
    icon: 'mdi-form-textbox',
    to: '/showcase/business-form',
    color: '#10b981'
  },
  {
    title: '載入狀態',
    desc: '全域 Loading Queue 管理',
    icon: 'mdi-progress-clock',
    to: '/showcase/loading',
    color: '#f43f5e'
  },
  {
    title: '狀態檢視工具',
    desc: '即時監看與除錯工具',
    icon: 'mdi-eye-outline',
    to: '/showcase/data-inspector',
    color: '#8b5cf6'
  },
  {
    title: '通知系統',
    desc: '全域 Snackbar 通知管理',
    icon: 'mdi-bell-ring-outline',
    to: '/showcase/notify',
    color: '#f97316'
  },
  {
    title: '邏輯字典',
    desc: '內建 30+ 業務 Composables 完整參考',
    icon: 'mdi-folder-search-outline',
    to: '/showcase/logic-showcase',
    color: '#8b5cf6'
  }
]

const functionsList = [
  {
    title: 'API 管理',
    desc: 'Repository 模式與攔截器',
    icon: 'mdi-api',
    to: '/showcase/api-demo',
    color: '#f59e0b'
  },
  {
    title: 'Mock API',
    desc: '前端模擬資料伺服器',
    icon: 'mdi-server-network',
    to: '/showcase/mock-api',
    color: '#eab308'
  },
  {
    title: '日期時間',
    desc: '格式化、計算與時區處理',
    icon: 'mdi-calendar-clock',
    to: '/showcase/datetime',
    color: '#22c55e'
  },
  {
    title: '表單驗證',
    desc: '常用規則與客製化驗證',
    icon: 'mdi-checkbox-marked-circle-outline',
    to: '/showcase/validation',
    color: '#84cc16'
  },
  {
    title: '格式化工具',
    desc: '數字、貨幣與字串格式化',
    icon: 'mdi-format-text',
    to: '/showcase/formatter',
    color: '#14b8a6'
  },
  {
    title: '選項系統',
    desc: '集中式枚舉資料管理',
    icon: 'mdi-form-select',
    to: '/showcase/options',
    color: '#06b6d4'
  },
  {
    title: '本地儲存',
    desc: 'LocalStorage / Session 封裝',
    icon: 'mdi-database-outline',
    to: '/showcase/storage',
    color: '#8b5cf6'
  },
  {
    title: '防抖節流',
    desc: '效能最佳化與執行控制',
    icon: 'mdi-timer-sand',
    to: '/showcase/debounce',
    color: '#64748b'
  },
  {
    title: '分頁管理',
    desc: '資料分頁邏輯與計算',
    icon: 'mdi-book-open-page-variant',
    to: '/showcase/pagination',
    color: '#6366f1'
  },
  {
    title: '加解密',
    desc: 'AES、Base64 與雜湊',
    icon: 'mdi-lock-outline',
    to: '/showcase/encryption',
    color: '#0ea5e9'
  },
  {
    title: '錯誤處理',
    desc: '全域錯誤捕捉與回報',
    icon: 'mdi-alert-circle-outline',
    to: '/showcase/error-handler',
    color: '#ef4444'
  },
  {
    title: '網路監控',
    desc: '連線狀態與速度偵測',
    icon: 'mdi-wifi',
    to: '/showcase/network',
    color: '#06b6d4'
  },
  {
    title: '閒置偵測',
    desc: '使用者活動監控',
    icon: 'mdi-sleep',
    to: '/showcase/idle',
    color: '#64748b'
  },
  {
    title: '資安防護',
    desc: 'XSS、Headers 與安全機制',
    icon: 'mdi-security',
    to: '/showcase/security',
    color: '#dc2626'
  },
  {
    title: '多語系',
    desc: '系統語系管理與切換',
    icon: 'mdi-translate',
    to: '/showcase/language',
    color: '#a855f7'
  }
]

const categories = [
  {
    id: 'guides',
    title: '專案文件',
    items: guidesList,
    icon: 'mdi-book-open-variant',
    color: '#3b82f6'
  },
  {
    id: 'components',
    title: '介面元件',
    items: componentsList,
    icon: 'mdi-puzzle-outline',
    color: '#10b981'
  },
  { id: 'functions', title: '核心功能', items: functionsList, icon: 'mdi-cogs', color: '#8b5cf6' }
]

const activeCategoryIndex = ref(0)
const activeCategory = computed(() => categories[activeCategoryIndex.value])
</script>

<template>
  <div class="showcase-layout min-h-screen bg-white">
    <!-- Premium Header -->
    <header
      class="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-slate-100 px-8 py-4"
    >
      <div class="max-w-[1400px] mx-auto flex items-center justify-between">
        <div class="flex items-center gap-5">
          <NuxtLink
            to="/"
            class="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-100 transition-all hover:bg-blue-50 group"
          >
            <IIcon
              icon="mdi-view-dashboard"
              size="22"
              class="group-hover:scale-110 transition-transform"
            />
          </NuxtLink>
          <div class="h-8 w-px bg-slate-200 mx-1"></div>
          <IBreadcrumbs :items="breadcrumbItems" />
        </div>
      </div>
    </header>

    <div class="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-73px)]">
      <!-- Sidebar Nav -->
      <aside class="lg:col-span-3 border-r border-slate-50 p-6 space-y-2 bg-slate-50/30">
        <div
          class="px-4 py-2 mb-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]"
        >
          功能分類
        </div>
        <button
          v-for="(cat, index) in categories"
          :key="cat.id"
          class="w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden"
          :class="
            activeCategoryIndex === index
              ? 'bg-white shadow-[0_4px_20px_rgba(37,99,235,0.08)] text-blue-600 ring-1 ring-blue-50'
              : 'text-slate-500 hover:bg-slate-100/50 hover:text-slate-900'
          "
          @click="activeCategoryIndex = index"
        >
          <div
            class="w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-colors"
            :class="
              activeCategoryIndex === index
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
            "
            :style="activeCategoryIndex === index ? {} : { color: cat.color }"
          >
            <IIcon
              :icon="cat.icon"
              size="20"
            />
          </div>
          <div class="flex-1 text-left">
            <div class="text-sm font-black tracking-tight">{{ cat.title }}</div>
            <div class="text-[10px] text-slate-400 font-bold uppercase">
              {{ cat.items.length }} ITEMS
            </div>
          </div>
          <IIcon
            v-if="activeCategoryIndex === index"
            icon="mdi-chevron-right"
            size="18"
          />
        </button>
      </aside>

      <!-- Main Content -->
      <main class="lg:col-span-9 p-10 bg-slate-50/10 overflow-y-auto">
        <div class="max-w-6xl mx-auto space-y-12">
          <!-- Page Header -->
          <div class="pb-10 border-b border-slate-100/60">
            <div class="flex items-center gap-4 mb-4">
              <div
                class="px-2.5 py-1 rounded bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100"
              >
                Component Showcase
              </div>
              <div class="h-4 w-px bg-slate-200"></div>
              <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {{ activeCategory.title }}
              </div>
            </div>
            <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-4">元件模組展現</h1>
            <p class="text-lg text-slate-500 font-medium leading-relaxed">
              探索開發包提供的豐富元件與核心功能，點擊卡片查看詳細說明與範例。
            </p>
          </div>

          <!-- Cards Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            <NuxtLink
              v-for="item in activeCategory.items"
              :key="item.to"
              :to="item.to"
              class="group block h-full"
            >
              <div
                class="h-full bg-white border border-slate-100/60 rounded-3xl p-7 flex flex-col shadow-[0_4px_20px_rgb(0,0,0,0.03)] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] group-hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              >
                <div class="flex items-center gap-4 mb-4">
                  <div
                    class="w-12 h-12 rounded-2xl flex items-center justify-center border border-slate-50 bg-slate-50 transition-colors group-hover:bg-white"
                    :style="{ color: item.color }"
                  >
                    <IIcon
                      :icon="item.icon"
                      size="24"
                    />
                  </div>
                  <h3
                    class="text-lg font-bold text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors"
                  >
                    {{ item.title }}
                  </h3>
                </div>
                <p class="text-sm text-slate-500 leading-relaxed mb-6 flex-grow">
                  {{ item.desc }}
                </p>
                <div
                  class="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 group-hover:text-blue-600 transition-all"
                >
                  <span>查看詳情</span>
                  <IIcon
                    icon="mdi-arrow-right"
                    size="14"
                    class="group-hover:translate-x-1 transition-transform"
                  />
                </div>
                <!-- Ambient background color hint -->
                <div
                  class="absolute -right-4 -bottom-4 w-20 h-20 rounded-full opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500"
                  :style="{ backgroundColor: item.color }"
                ></div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </main>
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
</style>
