<script setup lang="ts">
import { ref } from 'vue'
import IIcon from '@/components/uiInterface/IIcon.vue'

definePageMeta({
  title: '開發包導讀與介面理念',
  layout: 'portal'
})

const activeTab = ref('intro')
const tabs = [
  { id: 'intro', label: '核心導讀' },
  { id: 'setup', label: '模組建置' },
  { id: 'config', label: '啟用設定' },
  { id: 'design', label: '設計理念' }
]
</script>

<template>
  <div class="min-h-screen bg-slate-50 relative font-sans text-slate-800 pb-20 overflow-hidden">
    <!-- 環境光美化裝飾 -->
    <div
      class="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/60 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none z-0"
    ></div>
    <div
      class="absolute top-60 left-0 w-[400px] h-[400px] bg-indigo-50/50 rounded-full blur-[80px] -ml-20 pointer-events-none z-0"
    ></div>

    <!-- 標題區塊 -->
    <div class="relative z-10 pt-20 pb-16 px-6">
      <div class="max-w-5xl mx-auto flex flex-col items-center text-center">
        <h1 class="text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">
          開發包導讀與介面理念
        </h1>
        <p class="text-xl text-slate-500 max-w-2xl leading-relaxed">
          本頁將帶領您了解專案的地基：核心開發包。我們追求的不僅是功能，更是對細節與質感的極致堅持。
        </p>
      </div>
    </div>

    <!-- 主內容區塊 -->
    <div class="relative z-10 max-w-5xl mx-auto px-6">
      <!-- 頁籤導覽 -->
      <div
        class="flex space-x-2 bg-white/60 backdrop-blur-xl border border-slate-200/60 p-1.5 rounded-2xl mb-12 shadow-sm overflow-x-auto"
      >
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="flex-1 min-w-[140px] px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 relative group"
          :class="
            activeTab === tab.id
              ? 'bg-white text-blue-600 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-slate-100'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50/80 transparent border border-transparent'
          "
          @click="activeTab = tab.id"
        >
          <span class="relative z-10 flex items-center justify-center gap-2">
            {{ tab.label }}
          </span>
        </button>
      </div>

      <!-- 頁籤內容：核心導讀 -->
      <div
        v-show="activeTab === 'intro'"
        class="animate-fade-in-up"
      >
        <h2 class="text-3xl font-black text-slate-800 tracking-tight mb-8 flex items-center gap-3">
          <span class="p-2 rounded-xl bg-blue-50 text-blue-500">
            <IIcon
              icon="mdi-book-open-variant"
              size="24"
            />
          </span>
          第零課：認識核心
        </h2>

        <div
          class="bg-white border border-slate-100 rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 mb-8 relative overflow-hidden group"
        >
          <div class="relative z-10">
            <p class="text-[1.1rem] text-slate-600 leading-relaxed mb-6">
              開發包是整個系統的核心，所有的模組、組件與業務邏輯都建立在這個穩固的地基之上。
              在這個章節中，我們將從環境配置開始，逐步教您如何建立第一個模組與頁面。
            </p>
            <div
              class="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 text-slate-500 text-sm"
            >
              <IIcon
                icon="mdi-shield-check-outline"
                class="text-blue-500"
              />
              <span>
                <strong>企業級設計規範</strong>
                ：我們對美感有著絕對的堅持。
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 頁籤內容：模組建置 -->
      <div
        v-show="activeTab === 'setup'"
        class="animate-fade-in-up"
      >
        <h2 class="text-3xl font-black text-slate-800 tracking-tight mb-8 flex items-center gap-3">
          <span class="p-2 rounded-xl bg-indigo-50 text-indigo-500">
            <IIcon
              icon="mdi-folder-plus-outline"
              size="24"
            />
          </span>
          建立模組與頁面
        </h2>

        <div class="space-y-6">
          <div
            class="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <h3 class="text-xl font-bold text-slate-800 mb-4">步驟 1：建立模組資料夾</h3>
            <ul class="space-y-3 text-slate-500">
              <li class="flex items-center gap-2">
                <span
                  class="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600"
                >
                  1
                </span>
                建立
                <code>modules/</code>
                資料夾。
              </li>
              <li class="flex items-center gap-2">
                <span
                  class="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600"
                >
                  2
                </span>
                在
                <code>modules/</code>
                下建立新模組目錄（例如
                <code>my-project/</code>
                ）。
              </li>
              <li class="flex items-center gap-2">
                <span
                  class="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600"
                >
                  3
                </span>
                在目錄下建立
                <code>pages/</code>
                子目錄。
              </li>
            </ul>
          </div>

          <div
            class="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <h3 class="text-xl font-bold text-slate-800 mb-4">步驟 2：引入程式碼</h3>
            <p class="text-slate-500 mb-6">
              在
              <code>modules/my-project/pages/index.vue</code>
              中貼入以下內容：
            </p>

            <div class="bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-800">
              <div
                class="flex items-center gap-2 px-4 py-3 bg-slate-800/80 border-b border-slate-700/50"
              >
                <div class="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                <div class="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                <div class="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                <span class="ml-2 text-slate-400 text-xs font-mono">index.vue</span>
              </div>
              <div class="p-5 overflow-x-auto text-[13px] font-mono leading-relaxed">
                <pre class="m-0 text-slate-300"><code>&lt;template&gt;
  &lt;div class="p-10"&gt;
    &lt;h1 class="text-4xl font-black"&gt;我的第一個頁面&lt;/h1&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
definePageMeta({
  title: '初探開發包',
  layout: 'portal'
})
&lt;/script&gt;</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 頁籤內容：啟用設定 -->
      <div
        v-show="activeTab === 'config'"
        class="animate-fade-in-up"
      >
        <h2 class="text-3xl font-black text-slate-800 tracking-tight mb-8 flex items-center gap-3">
          <span class="p-2 rounded-xl bg-amber-50 text-amber-500">
            <IIcon
              icon="mdi-cog-outline"
              size="24"
            />
          </span>
          啟用產品設定
        </h2>

        <div
          class="bg-white border border-slate-100 rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
        >
          <p class="text-slate-600 mb-6">
            最後，在
            <code>configs/default.json</code>
            中宣告新模組：
          </p>

          <div
            class="bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-800 mb-8"
          >
            <div
              class="flex items-center gap-2 px-4 py-3 bg-slate-800/80 border-b border-slate-700/50"
            >
              <div class="w-2.5 h-2.5 rounded-full bg-red-400"></div>
              <div class="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
              <div class="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
              <span class="ml-2 text-slate-400 text-xs font-mono">default.json</span>
            </div>
            <div class="p-5 overflow-x-auto text-[13px] font-mono leading-relaxed">
              <pre class="m-0 text-slate-300"><code>{
  "name": "Vue前端開發包系統",
  "modules": ["showcase", "my-project"]
}</code></pre>
            </div>
          </div>

          <div class="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
            <IIcon
              icon="mdi-alert-circle-outline"
              class="text-amber-500 text-xl shrink-0 mt-0.5"
            />
            <p class="text-sm text-amber-800 m-0">
              模組清單決定了路由的啟動順序與範圍，請確保名稱與資料夾一致。
            </p>
          </div>
        </div>
      </div>

      <!-- 頁籤內容：設計理念 -->
      <div
        v-show="activeTab === 'design'"
        class="animate-fade-in-up"
      >
        <h2 class="text-3xl font-black text-slate-800 tracking-tight mb-8 flex items-center gap-3">
          <span class="p-2 rounded-xl bg-emerald-50 text-emerald-500">
            <IIcon
              icon="mdi-palette-outline"
              size="24"
            />
          </span>
          介面設計理念
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div
            class="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
          >
            <div
              class="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform"
            >
              <IIcon
                icon="mdi-white-balance-sunny"
                size="24"
              />
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-3">清爽大氣</h3>
            <p class="text-slate-500 leading-relaxed text-sm">
              強調適當的留白與比例分配，讓資訊不再顯得擁擠。透過明亮的色調與俐落的間距，打造具備呼吸感的版面。
            </p>
          </div>

          <div
            class="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
          >
            <div
              class="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform"
            >
              <IIcon
                icon="mdi-translate"
                size="24"
              />
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-3">在地化守則</h3>
            <p class="text-slate-500 leading-relaxed text-sm">
              堅持使用台灣繁體中文，並去除所有不必要的括號與外文註釋。讓溝通回歸最純粹的語言，減少認知負擔。
            </p>
          </div>

          <div
            class="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
          >
            <div
              class="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-500 mb-6 group-hover:scale-110 transition-transform"
            >
              <IIcon
                icon="mdi-code-not-equal-variant"
                size="24"
              />
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-3">去符號化</h3>
            <p class="text-slate-500 leading-relaxed text-sm">
              除非是程式語法需要，否則不使用額外的裝飾符號。保持介面的極簡與專業感。
            </p>
          </div>

          <div
            class="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
          >
            <div
              class="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 transition-transform"
            >
              <IIcon
                icon="mdi-rocket-launch-outline"
                size="24"
              />
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-3">卓越品質</h3>
            <p class="text-slate-500 leading-relaxed text-sm">
              開發包透過自動化掃描，大幅減少了手動改設定的時間。隨時保持對美感的追求，讓系統一致。
            </p>
          </div>
        </div>
      </div>

      <!-- 導覽頁腳 -->
      <div
        class="mt-20 pt-8 border-t border-slate-200/60 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <NuxtLink
          to="/"
          class="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-colors group"
        >
          <IIcon
            icon="mdi-arrow-left"
            size="20"
            class="group-hover:-translate-x-1 transition-transform"
          />
          回課程中心
        </NuxtLink>

        <NuxtLink
          to="/showcase/rules"
          class="flex items-center gap-3 px-8 py-4 bg-white border border-slate-200 rounded-2xl text-slate-800 font-black shadow-sm hover:shadow-md hover:border-blue-200 hover:text-blue-600 transition-all active:scale-95 group"
        >
          下一課：開發規矩
          <IIcon
            icon="mdi-arrow-right"
            size="20"
            class="group-hover:translate-x-1 transition-transform"
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
