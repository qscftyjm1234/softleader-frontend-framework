<script setup lang="ts">
import IIcon from '~/components/uiInterface/IIcon.vue'

// Premium SaaS Dashboard array removed per user request

const modules = [
  {
    id: 'm0',
    status: 'available',
    title: '【課程零】開發包概念',
    desc: '在開始寫程式之前，先透過烤蛋糕的比喻，了解為什麼企業需要一套標準化的前端開發包系統。',
    icon: 'mdi-lightbulb-on-outline',
    path: '/showcase/concept'
  },
  {
    id: 'm1',
    status: 'available',
    title: '【課程一】環境建置',
    desc: '從零開始搭建企業級開發環境，掌握目錄結構規範與技術棧核心配置。',
    icon: 'mdi-server-network',
    path: '/showcase/development'
  },
  {
    id: 'm2',
    status: 'in-progress',
    title: '【課程二】Vue 3 基礎教學',
    desc: '進階掌握 Vue 3 Composition API、響應式原理與核心指令，建立穩固的前端基礎。',
    icon: 'mdi-vuejs',
    path: '/showcase/vue-tutorial'
  },
  {
    id: 'm3',
    status: 'available',
    title: '【課程三】組件使用',
    desc: '深度解析原子化 Design System 組件庫的應用，掌握 Interface 視圖層級與版面配置技巧。',
    icon: 'mdi-puzzle-outline',
    path: '/showcase/component-course'
  },
  {
    id: 'm4',
    status: 'available',
    title: '【課程四】composables 介紹',
    desc: '深度整合企業級 Composables 核心開發包，掌握 30+ 種標準化業務工具（API 串接、驗證邏輯、全域狀態管理）的開發與應用。',
    icon: 'mdi-function-variant',
    path: '/showcase/composables-course'
  }
]
</script>

<template>
  <div class="max-w-[1300px] mx-auto space-y-10 pb-10">
    <!-- Hero Promo Banner -->
    <div
      class="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white p-8 md:p-14 lg:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group"
    >
      <!-- Deep Glow Effects under banner -->
      <div
        class="absolute -top-32 -right-32 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[80px] group-hover:bg-blue-100/60 transition-colors duration-700 pointer-events-none"
      ></div>

      <!-- Decorative diagonal grid lines -->
      <div
        class="absolute inset-0 opacity-[0.3]"
        style="
          background-image: repeating-linear-gradient(
            45deg,
            #f8fafc 0,
            #f8fafc 1px,
            transparent 0,
            transparent 40px
          );
          background-size: 56px 56px;
        "
      ></div>

      <div class="relative z-10 max-w-3xl">
        <div class="flex items-center gap-3 mb-6">
          <div
            class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-widest shadow-sm"
          >
            <span
              class="w-1.5 h-1.5 rounded-full bg-blue-500 animate-[pulse_2s_ease-in-out_infinite]"
            ></span>
            當前階段：架構設計
          </div>
          <div
            class="text-[10px] font-black uppercase tracking-widest text-slate-400 border border-slate-100 bg-slate-50 px-2.5 py-1.5 rounded-md hidden sm:block"
          >
            Nuxt v3.4.x 核心引擎
          </div>
        </div>

        <h1
          class="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-5 leading-[1.1]"
        >
          Vue前端開發包系統
          <br />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
            Vue 3 & Nuxt 3 實戰指南
          </span>
        </h1>

        <p class="text-slate-500 text-base md:text-lg mb-10 leading-relaxed max-w-2xl">
          歡迎回到企業級開發包系統。請依序完成下方的四大進階模組，以取得共用組件庫與業務邏輯模組的完整存取權限，並掌握專案最佳實踐。
        </p>
      </div>
    </div>

    <!-- Core Curriculum Modules -->
    <div class="pt-6">
      <div class="flex items-center justify-between mb-8 px-2">
        <div>
          <h2 class="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            核心學習路徑
            <span
              class="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest border border-slate-200/60 shadow-sm"
            >
              主線軌道
            </span>
          </h2>
          <p class="text-slate-500 text-sm mt-1 leading-relaxed">
            請依循架構師制定的標準學習順序，逐步完成所有里程碑。
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-2 gap-5 md:gap-7">
        <!-- Bento Card per Module -->
        <div
          v-for="(mod, idx) in modules"
          :key="mod.id"
          class="group relative"
        >
          <div
            class="bg-white border border-slate-100 hover:border-slate-200/80 rounded-3xl p-7 transition-all duration-300 relative overflow-hidden h-full flex flex-col shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1"
          >
            <div
              class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            ></div>

            <!-- Top Row: Icon + Meta -->
            <div class="flex items-start justify-between gap-4 mb-5">
              <div class="flex gap-4">
                <div
                  class="w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center border relative z-10 transition-all duration-300"
                  :class="
                    mod.status === 'completed'
                      ? 'bg-emerald-50 border-emerald-100 text-emerald-600 shadow-sm group-hover:shadow-emerald-200/50'
                      : mod.status === 'in-progress'
                        ? 'bg-blue-50 border-blue-100 text-blue-600 shadow-sm group-hover:shadow-blue-200/50'
                        : 'bg-slate-50 border-slate-100 text-slate-400 shadow-inner'
                  "
                >
                  <IIcon
                    v-if="mod.status === 'completed'"
                    icon="mdi-check"
                    size="22"
                  />
                  <IIcon
                    v-else-if="mod.status === 'in-progress'"
                    icon="mdi-play"
                    size="22"
                  />
                  <IIcon
                    v-else
                    icon="mdi-book-outline"
                    size="20"
                  />
                </div>
                <div>
                  <div
                    class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-2"
                  >
                    課程 0{{ idx + 1 }}
                    <span
                      v-if="mod.status === 'in-progress'"
                      class="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100 shadow-sm"
                    >
                      執行中
                    </span>
                  </div>
                  <h3
                    class="font-black text-lg leading-tight transition-colors tracking-tight"
                    :class="
                      mod.status === 'locked'
                        ? 'text-slate-400'
                        : 'text-slate-900 group-hover:text-blue-600'
                    "
                  >
                    {{ mod.title }}
                  </h3>
                </div>
              </div>
            </div>

            <p
              class="text-sm mb-8 leading-relaxed flex-1"
              :class="mod.status === 'locked' ? 'text-slate-400' : 'text-slate-500'"
            >
              {{ mod.desc }}
            </p>

            <!-- Bottom Row: Actions & Info -->
            <div class="flex items-center justify-between border-t border-slate-100 pt-5 mt-auto">
              <div class="hidden sm:flex items-center gap-2.5">
                <div
                  class="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 shadow-inner"
                >
                  <IIcon
                    :icon="mod.icon"
                    size="14"
                  />
                </div>
                <div class="flex flex-col">
                  <span class="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    系統路由
                  </span>
                  <span class="text-xs font-semibold text-slate-600">{{ mod.path }}</span>
                </div>
              </div>

              <div class="flex items-center w-full sm:w-auto mt-4 sm:mt-0">
                <NuxtLink
                  :to="mod.path"
                  class="w-full sm:w-auto"
                >
                  <button
                    class="w-full sm:w-auto flex justify-center items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm active:scale-95"
                    :class="
                      mod.status === 'locked'
                        ? 'bg-slate-50 text-slate-400 border border-slate-200 cursor-not-allowed hidden'
                        : mod.status === 'completed'
                          ? 'bg-white text-emerald-600 hover:bg-emerald-50 border border-emerald-200'
                          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30'
                    "
                  >
                    {{ mod.status === 'completed' ? '複習單元' : '開始上課' }}
                    <IIcon
                      :icon="mod.status === 'completed' ? 'mdi-refresh' : 'mdi-arrow-right'"
                      size="16"
                      :class="
                        mod.status === 'completed'
                          ? ''
                          : 'group-hover:translate-x-0.5 transition-transform'
                      "
                    />
                  </button>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Secondary Resources / Reference -->
    <div class="pt-10 border-t border-slate-100">
      <div class="mb-8 px-2">
        <h2 class="text-xl font-black text-slate-800 tracking-tight flex items-center gap-3">
          參考規範與指南
          <span
            class="px-2 py-0.5 rounded bg-amber-50 text-amber-600 text-[9px] font-black uppercase tracking-widest border border-amber-100"
          >
            文檔中心
          </span>
        </h2>
        <p class="text-slate-400 text-xs mt-1">
          除了核心課程，這裡還有開發時必備的命名規範與設計標準。
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Component Playground Highlight -->
        <NuxtLink
          to="/showcase/component-playground"
          class="group"
        >
          <div
            class="bg-white border border-slate-100 p-6 rounded-[2rem] flex items-center gap-6 hover:shadow-[0_20px_40px_rgba(99,102,241,0.08)] transition-all duration-500 group-hover:border-indigo-200 relative overflow-hidden h-full"
          >
            <div
              class="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity"
            >
              <IIcon
                icon="mdi-auto-fix"
                size="48"
              />
            </div>
            <div
              class="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
            >
              <IIcon
                icon="mdi-palette-swatch-outline"
                size="28"
              />
            </div>
            <div class="flex-1 relative z-10">
              <div class="flex items-center gap-2 mb-1">
                <h4
                  class="font-black text-slate-900 group-hover:text-indigo-600 transition-colors text-lg"
                >
                  組件遊樂場
                </h4>
                <span
                  class="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-600 text-[9px] font-black uppercase tracking-widest border border-indigo-100"
                >
                  NEW
                </span>
              </div>
              <p class="text-xs text-slate-500 font-medium leading-relaxed">
                一站式預覽、測試與複製 20+ 標準化 UI 元件
              </p>
            </div>
          </div>
        </NuxtLink>
        <NuxtLink
          to="/showcase/rules"
          class="group"
        >
          <div
            class="bg-white border border-slate-100 p-5 rounded-2xl flex items-center gap-5 hover:shadow-md transition-all group-hover:border-amber-200"
          >
            <div
              class="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center border border-amber-100 group-hover:scale-110 transition-transform"
            >
              <IIcon
                icon="mdi-ruler-square"
                size="24"
              />
            </div>
            <div class="flex-1">
              <h4 class="font-bold text-slate-800 group-hover:text-amber-600 transition-colors">
                命名與設計規範
              </h4>
              <p class="text-xs text-slate-400">了解跨部門約定的 Variable & Code Style</p>
            </div>
            <IIcon
              icon="mdi-chevron-right"
              class="text-slate-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-all"
            />
          </div>
        </NuxtLink>

        <!-- Logic SDK Highlight (Internal Link) -->
        <NuxtLink
          to="/showcase/logic-showcase"
          class="group"
        >
          <div
            class="bg-white border border-slate-100 p-5 rounded-2xl flex items-center gap-5 hover:shadow-md transition-all group-hover:border-indigo-200"
          >
            <div
              class="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center border border-indigo-100 group-hover:scale-110 transition-transform"
            >
              <IIcon
                icon="mdi-folder-search-outline"
                size="24"
              />
            </div>
            <div class="flex-1">
              <h4 class="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                核心邏輯大全 (Logic API)
              </h4>
              <p class="text-xs text-slate-400">一鍵複製 30+ 內建業務邏輯與 API 串接程式碼</p>
            </div>
            <IIcon
              icon="mdi-chevron-right"
              class="text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all"
            />
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.sidebar-scroll::-webkit-scrollbar {
  width: 4px;
}
.sidebar-scroll::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
</style>
