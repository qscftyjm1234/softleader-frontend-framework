<script setup lang="ts">
import { ref } from 'vue'
import IIcon from '@/components/uiInterface/IIcon.vue'

definePageMeta({
  title: 'Vue 基礎教學',
  layout: 'portal'
})

const activeTab = ref('intro')
const tabs = [
  { id: 'intro', label: '基礎介紹' },
  { id: 'reactivity', label: '響應式狀態' },
  { id: 'directives', label: '模板語法與指令' },
  { id: 'playground', label: 'Playground 互動區' }
]

// Vue playground iframe 的網址。
const playgroundUrl = 'https://play.vuejs.org/'
</script>

<template>
  <div class="min-h-screen bg-slate-50 relative font-sans text-slate-800 pb-20 overflow-hidden">
    <!-- 環境光美化裝飾 (Ambient Lighting Decorations) -->
    <div
      class="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-50/60 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none z-0"
    ></div>
    <div
      class="absolute top-60 left-0 w-[400px] h-[400px] bg-blue-50/50 rounded-full blur-[80px] -ml-20 pointer-events-none z-0"
    ></div>

    <!-- 標題區塊 (Header Section) -->
    <div class="relative z-10 pt-20 pb-16 px-6">
      <div class="max-w-5xl mx-auto flex flex-col items-center text-center">
        <div
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[11px] font-black uppercase tracking-widest mb-6"
        >
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Vue 3 Composition API Course
        </div>
        <h1 class="text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">
          Vue.js 基礎課程
        </h1>
        <p class="text-xl text-slate-500 max-w-2xl leading-relaxed">
          這是一堂為初學者準備的 Vue 3 入門課程。我們將透過簡單的說明與即時互動環境，幫助你快速掌握
          Vue 框架的核心概念。
        </p>
      </div>
    </div>

    <!-- 主內容區塊，對齊標準版面寬度 -->
    <div class="relative z-10 max-w-5xl mx-auto px-6">
      <!-- 頁籤導覽，使用毛玻璃效果 (Glassmorphism) -->
      <div
        class="flex space-x-2 bg-white/60 backdrop-blur-xl border border-slate-200/60 p-1.5 rounded-2xl mb-12 shadow-sm overflow-x-auto"
      >
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="flex-1 min-w-[140px] px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 relative group"
          :class="
            activeTab === tab.id
              ? 'bg-white text-emerald-600 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-slate-100'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50/80 transparent border border-transparent'
          "
          @click="activeTab = tab.id"
        >
          <span class="relative z-10 flex items-center justify-center gap-2">
            {{ tab.label }}
          </span>
        </button>
      </div>

      <!-- 頁籤內容：介紹 (Intro) -->
      <div
        v-show="activeTab === 'intro'"
        class="animate-fade-in-up"
      >
        <h2 class="text-3xl font-black text-slate-800 tracking-tight mb-8 flex items-center gap-3">
          <span class="p-2 rounded-xl bg-emerald-50 text-emerald-500">
            <IIcon
              icon="mdi-book-open-variant"
              size="24"
            />
          </span>
          什麼是 Vue.js？
        </h2>

        <div
          class="bg-white border border-slate-100 rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1 transition-all duration-300 mb-8 relative overflow-hidden group"
        >
          <!-- 卡片內部環境發光效果 -->
          <div
            class="absolute -top-20 -right-20 w-48 h-48 bg-emerald-50/80 rounded-full blur-3xl group-hover:bg-emerald-100/60 transition-colors duration-500"
          ></div>

          <div class="relative z-10">
            <p class="text-[1.05rem] text-slate-600 leading-relaxed mb-6">
              Vue (發音類似 view) 是一個用於構建使用者介面的 JavaScript 框架。它建立在標準 HTML、CSS
              和 JavaScript 之上，並提供了一套宣告式 (Declarative) 和元件化 (Component-based)
              的程式設計模型，幫助你高效地開發使用者介面。
            </p>
            <div
              class="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 text-slate-500 text-sm"
            >
              <IIcon
                icon="mdi-information-outline"
                class="text-blue-500"
              />
              <span>
                這門課程使用的是
                <strong>Vue 3</strong>
                以及
                <strong>Composition API</strong>
                。
              </span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            class="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300 group"
          >
            <div
              class="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform"
            >
              <IIcon
                icon="mdi-xml"
                size="24"
              />
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-3">宣告式渲染</h3>
            <p class="text-slate-500 leading-relaxed">
              Vue 透過基於 HTML 的模板語法，允許我們聲明式地將 DOM 綁定至底層元件實體的資料上。
            </p>
          </div>

          <div
            class="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl hover:shadow-amber-500/5 hover:-translate-y-1 transition-all duration-300 group"
          >
            <div
              class="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 mb-6 group-hover:scale-110 transition-transform"
            >
              <IIcon
                icon="mdi-lightning-bolt"
                size="24"
              />
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-3">響應式 Reactivity</h3>
            <p class="text-slate-500 leading-relaxed">
              Vue 會自動追蹤 JavaScript 狀態變化，並在狀態改變時有效率地更新 DOM。
            </p>
          </div>
        </div>
      </div>

      <!-- 頁籤內容：響應式狀態 (Reactivity) -->
      <div
        v-show="activeTab === 'reactivity'"
        class="animate-fade-in-up"
      >
        <h2 class="text-3xl font-black text-slate-800 tracking-tight mb-8 flex items-center gap-3">
          <span class="p-2 rounded-xl bg-amber-50 text-amber-500">
            <IIcon
              icon="mdi-lightning-bolt"
              size="24"
            />
          </span>
          響應式狀態 (Reactivity)
        </h2>

        <div
          class="bg-white border border-slate-100 rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-6"
        >
          <div class="mb-8">
            <h3 class="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
              核心概念 (Core Concept)
            </h3>
            <div class="flex items-center gap-3 mb-4">
              <h4 class="text-2xl font-bold text-slate-800">
                使用
                <code>ref()</code>
              </h4>
            </div>
            <p class="text-[1.05rem] text-slate-600 leading-relaxed">
              在 Composition API 中，若要宣告響應式的狀態，推薦的作法是使用
              <code class="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded-md font-mono text-sm">
                ref()
              </code>
              函數。
              <br />
              呼叫後會回傳一個帶有
              <code class="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded-md font-mono text-sm">
                .value
              </code>
              屬性的物件。
            </p>
          </div>

          <!-- 程式碼區塊模擬，遵循新樣式規範 -->
          <div
            class="bg-slate-900 rounded-2xl overflow-hidden shadow-lg shadow-slate-900/10 mb-6 border border-slate-800"
          >
            <div
              class="flex items-center gap-2 px-4 py-3 bg-slate-800/80 border-b border-slate-700/50"
            >
              <div class="w-2.5 h-2.5 rounded-full bg-red-400"></div>
              <div class="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
              <div class="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
            </div>
            <div class="p-5 overflow-x-auto text-[13px] font-mono leading-relaxed">
              <pre
                class="m-0 text-slate-300"
              ><code><span class="text-purple-400">import</span> { ref } <span class="text-purple-400">from</span> <span class="text-amber-300">'vue'</span>

<span class="text-purple-400">const</span> count = ref(<span class="text-amber-500">0</span>)

                    <span class="text-slate-500">// 改變狀態需透過 .value</span>
count.value++</code></pre>
            </div>
          </div>

          <div class="flex items-start gap-3 p-4 bg-sky-50 rounded-xl border border-sky-100">
            <IIcon
              icon="mdi-lightbulb-on-outline"
              class="text-sky-500 text-xl shrink-0 mt-0.5"
            />
            <p class="text-sm text-sky-800 m-0">
              在 template 中使用 ref 時，Vue 會自動解包 (unwrap)，所以不需要加上
              <code>.value</code>
              。
            </p>
          </div>
        </div>
      </div>

      <!-- 頁籤內容：指令 (Directives) -->
      <div
        v-show="activeTab === 'directives'"
        class="animate-fade-in-up"
      >
        <h2 class="text-3xl font-black text-slate-800 tracking-tight mb-8 flex items-center gap-3">
          <span class="p-2 rounded-xl bg-purple-50 text-purple-500">
            <IIcon
              icon="mdi-code-tags"
              size="24"
            />
          </span>
          模板語法與常用指令
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            class="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 class="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
              文字插值 (Text Interpolation)
            </h3>
            <h4 class="text-lg font-bold text-slate-800 mb-3">
              插值
              <code>\{\{ \}\}</code>
            </h4>
            <p class="text-slate-500 text-sm mb-4 h-10">
              使用「雙大括號」語法來顯示 JavaScript 變數。
            </p>
            <div class="bg-slate-900 rounded-xl p-4 font-mono text-[13px] border border-slate-800">
              <code class="text-slate-300">&lt;span&gt;Message: \{\{ msg \}\}&lt;/span&gt;</code>
            </div>
          </div>

          <div
            class="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 class="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
              事件處理 (Event Handling)
            </h3>
            <h4 class="text-lg font-bold text-slate-800 mb-3">
              事件綁定
              <code>@click</code>
            </h4>
            <p class="text-slate-500 text-sm mb-4 h-10">用於監聽 DOM 事件並觸發方法。</p>
            <div class="bg-slate-900 rounded-xl p-4 font-mono text-[13px] border border-slate-800">
              <code class="text-slate-300">&lt;button @click="count++"&gt;加一&lt;/button&gt;</code>
            </div>
          </div>

          <div
            class="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 class="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
              條件渲染 (Conditional Rendering)
            </h3>
            <h4 class="text-lg font-bold text-slate-800 mb-3">
              條件渲染
              <code>v-if</code>
            </h4>
            <p class="text-slate-500 text-sm mb-4 h-10">
              只有在指令的表達式回傳 true 時才渲染元素。
            </p>
            <div class="bg-slate-900 rounded-xl p-4 font-mono text-[13px] border border-slate-800">
              <code class="text-slate-300">&lt;div v-if="awesome"&gt;Vue 很棒！&lt;/div&gt;</code>
            </div>
          </div>

          <div
            class="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 class="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
              雙向綁定 (Two-way Binding)
            </h3>
            <h4 class="text-lg font-bold text-slate-800 mb-3">
              雙向綁定
              <code>v-model</code>
            </h4>
            <p class="text-slate-500 text-sm mb-4 h-10">使表單輸入與元件狀態同步。</p>
            <div class="bg-slate-900 rounded-xl p-4 font-mono text-[13px] border border-slate-800">
              <code class="text-slate-300">&lt;input v-model="text" placeholder="..."&gt;</code>
            </div>
          </div>
        </div>
      </div>

      <!-- 頁籤內容：演練場 (Playground) -->
      <div
        v-show="activeTab === 'playground'"
        class="animate-fade-in-up flex flex-col h-[700px]"
      >
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
            <span class="p-2 rounded-xl bg-blue-50 text-blue-500">
              <IIcon
                icon="mdi-play-circle-outline"
                size="24"
              />
            </span>
            Vue 互動演練場
          </h2>
          <a
            class="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 text-slate-600 shadow-sm hover:shadow-md hover:shadow-emerald-500/10 hover:-translate-y-0.5 hover:border-emerald-200 hover:text-emerald-600 active:scale-95 transition-all duration-300"
            href="https://play.vuejs.org/"
            target="_blank"
          >
            <span class="text-sm font-semibold">開啟新分頁</span>
            <IIcon
              icon="mdi-open-in-new"
              size="16"
              class="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>

        <p class="text-slate-500 mb-6 text-lg leading-relaxed">
          這是官方的 Vue SFC (單一檔案元件) 演練場。你可以在左側編寫程式碼，右側會即時呈現執行結果。
          <br />
          試著建立一個 `ref` 變數並把它顯示在畫面中吧！
        </p>

        <div
          class="flex-1 bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative group"
        >
          <!-- iframe 容器周圍的微光效果 -->
          <div
            class="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-3xl pointer-events-none z-10 transition-colors group-hover:ring-emerald-500/20"
          ></div>

          <iframe
            :src="playgroundUrl"
            class="w-full h-full border-none relative z-0 bg-slate-50"
            title="Vue SFC Playground"
            allow="clipboard-read; clipboard-write"
          ></iframe>
        </div>
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
