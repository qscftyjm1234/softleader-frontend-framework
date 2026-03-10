<script setup lang="ts">
import { ref, computed } from 'vue'
import IIcon from '~/components/uiInterface/IIcon.vue'
import ICard from '~/components/uiInterface/ICard.vue'
import IButton from '~/components/uiInterface/IButton.vue'
import ShowcaseCodeBlock from './ShowcaseCodeBlock.vue'

// Course Steps Data
const steps = [
  {
    title: '響應式基礎 (Reactivity)',
    description: '學習如何使用 ref 定義響應式變數。這是 Vue 3 的核心，讓資料變更時頁面能自動更新。',
    code: `<span class="hljs-tag">&lt;script setup&gt;</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title">ref</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>

<span class="hljs-keyword">const</span> count = <span class="hljs-title">ref</span>(<span class="hljs-number">0</span>)
<span class="hljs-keyword">const</span> <span class="hljs-title">increment</span> = () => count.value++
<span class="hljs-tag">&lt;/script&gt;</span>

<span class="hljs-tag">&lt;template&gt;</span>
  <span class="hljs-tag">&lt;button</span> <span class="hljs-attr">@click</span>=<span class="hljs-string">"increment"</span><span class="hljs-tag">&gt;</span>
    計數器: {&#123; count &#125;}
  <span class="hljs-tag">&lt;/button&gt;</span>
<span class="hljs-tag">&lt;/template&gt;</span>`,
    interactive: 'Counter'
  },
  {
    title: '雙向綁定 (v-model)',
    description: '使用 v-model 輕鬆達成表單輸入與資料的同步。',
    code: `<span class="hljs-tag">&lt;script setup&gt;</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title">ref</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>

<span class="hljs-keyword">const</span> text = <span class="hljs-title">ref</span>(<span class="hljs-string">'Hello Vue'</span>)
<span class="hljs-tag">&lt;/script&gt;</span>

<span class="hljs-tag">&lt;template&gt;</span>
  <span class="hljs-tag">&lt;input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"text"</span> <span class="hljs-tag">/&gt;</span>
  <span class="hljs-tag">&lt;p&gt;</span>你輸入的是: {&#123; text &#125;}<span class="hljs-tag">&lt;/p&gt;</span>
<span class="hljs-tag">&lt;/template&gt;</span>`,
    interactive: 'Input'
  },
  {
    title: '條件與列表 (v-if & v-for)',
    description: '透過指令來切換顯示狀態或渲染列表。',
    code: `<span class="hljs-tag">&lt;script setup&gt;</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title">ref</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>

<span class="hljs-keyword">const</span> show = <span class="hljs-title">ref</span>(<span class="hljs-keyword">true</span>)
<span class="hljs-keyword">const</span> items = <span class="hljs-title">ref</span>([<span class="hljs-string">'Vue'</span>, <span class="hljs-string">'Nuxt'</span>, <span class="hljs-string">'AntD'</span>])
<span class="hljs-tag">&lt;/script&gt;</span>

<span class="hljs-tag">&lt;template&gt;</span>
  <span class="hljs-tag">&lt;button</span> <span class="hljs-attr">@click</span>=<span class="hljs-string">"show = !show"</span><span class="hljs-tag">&gt;</span>切換顯示<span class="hljs-tag">&lt;/button&gt;</span>
  <span class="hljs-tag">&lt;ul</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"show"</span><span class="hljs-tag">&gt;</span>
    <span class="hljs-tag">&lt;li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in items"</span><span class="hljs-tag">&gt;</span>{&#123; item &#125;}<span class="hljs-tag">&lt;/li&gt;</span>
  <span class="hljs-tag">&lt;/ul&gt;</span>
<span class="hljs-tag">&lt;/template&gt;</span>`,
    interactive: 'List'
  }
]

const currentStep = ref(0)
const totalSteps = steps.length

const nextStep = () => {
  if (currentStep.value < totalSteps - 1) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

// Playground Simulated State
const playgroundState = ref({
  count: 0,
  text: 'Hello Vue 3',
  showList: true,
  items: ['Vue', 'Nuxt', 'AntD']
})
</script>

<template>
  <div class="vue-structured-course space-y-8 animate-fadeIn">
    <!-- Course Header -->
    <header
      class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8"
    >
      <div class="space-y-3">
        <div
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest"
        >
          基礎課程 01
        </div>
        <h2 class="text-3xl font-black text-slate-900 leading-tight">Vue 3 核心開發基礎</h2>
        <p class="text-slate-500 max-w-xl">
          本課程將帶領你深入淺出地掌握 Vue 3 的核心技術，從響應式原理到組件實踐。
        </p>
      </div>

      <!-- Step Counter -->
      <div class="flex items-center gap-4 bg-slate-50 p-2 rounded-xl border border-slate-100">
        <div class="flex -space-x-1">
          <div
            v-for="i in totalSteps"
            :key="i"
            class="w-8 h-1.5 rounded-full transition-all duration-300"
            :class="i - 1 <= currentStep ? 'bg-indigo-600' : 'bg-slate-200'"
          ></div>
        </div>
        <span class="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
          進度 {{ currentStep + 1 }} / {{ totalSteps }}
        </span>
      </div>
    </header>

    <!-- Main Course Area -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <!-- Instruction & Code -->
      <div class="lg:col-span-12 xl:col-span-7 space-y-6">
        <div class="space-y-4">
          <h3 class="text-xl font-bold text-slate-900 flex items-center gap-3">
            <span
              class="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-sm font-black"
            >
              {{ currentStep + 1 }}
            </span>
            {{ steps[currentStep].title }}
          </h3>
          <p class="text-slate-600 leading-relaxed">
            {{ steps[currentStep].description }}
          </p>
        </div>

        <!-- Code Block -->
        <ShowcaseCodeBlock
          :code="steps[currentStep].code"
          language="vue"
          :filename="`Exercise_${currentStep + 1}.vue`"
        />

        <!-- Navigation Buttons -->
        <div class="flex items-center gap-3 pt-4">
          <IButton
            variant="outlined"
            size="medium"
            :disabled="currentStep === 0"
            prepend-icon="mdi-chevron-left"
            @click="prevStep"
          >
            上一步
          </IButton>
          <IButton
            variant="primary"
            size="medium"
            :append-icon="currentStep === totalSteps - 1 ? 'mdi-check' : 'mdi-chevron-right'"
            @click="nextStep"
          >
            {{ currentStep === totalSteps - 1 ? '完成章節' : '下一步' }}
          </IButton>
        </div>
      </div>

      <!-- Playground Area -->
      <div class="lg:col-span-12 xl:col-span-5 lg:sticky lg:top-24">
        <ICard
          variant="elevated"
          class="border-indigo-100 overflow-hidden shadow-xl shadow-indigo-900/5"
        >
          <template #header>
            <div class="flex items-center justify-between">
              <span
                class="text-xs font-black uppercase tracking-widest text-indigo-600 flex items-center gap-2"
              >
                <IIcon
                  icon="mdi-play-circle"
                  size="16"
                />
                即時演練畫布 (Playground)
              </span>
              <div class="flex gap-1">
                <div class="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                <div class="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
              </div>
            </div>
          </template>

          <div
            class="min-h-[300px] flex flex-col items-center justify-center p-8 bg-slate-50/50 relative"
          >
            <!-- Simulated Result Area -->
            <div
              class="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6 animate-fadeIn"
            >
              <!-- STEP 1: Counter Demo -->
              <div
                v-if="currentStep === 0"
                class="text-center space-y-4"
              >
                <div class="text-4xl font-black text-indigo-600">{{ playgroundState.count }}</div>
                <IButton
                  variant="primary"
                  size="medium"
                  @click="playgroundState.count++"
                >
                  點擊計數 +1
                </IButton>
                <p class="text-[11px] text-slate-400">當變數 count 改變時，頁面會隨之更新</p>
              </div>

              <!-- STEP 2: Input Demo -->
              <div
                v-if="currentStep === 1"
                class="space-y-4"
              >
                <div class="space-y-2">
                  <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    輸入框
                  </label>
                  <input
                    v-model="playgroundState.text"
                    type="text"
                    class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none bg-slate-50"
                  />
                </div>
                <div class="p-4 rounded-xl bg-indigo-50 border border-indigo-100">
                  <span class="text-xs text-indigo-400 font-bold block mb-1">同步顯示：</span>
                  <div class="text-indigo-900 font-medium">{{ playgroundState.text }}</div>
                </div>
              </div>

              <!-- STEP 3: List Demo -->
              <div
                v-if="currentStep === 2"
                class="space-y-4"
              >
                <div class="flex items-center justify-between">
                  <span class="text-sm font-bold text-slate-700">技術清單</span>
                  <button
                    class="text-xs font-bold text-indigo-600 hover:text-indigo-700 underline"
                    @click="playgroundState.showList = !playgroundState.showList"
                  >
                    {{ playgroundState.showList ? '隱藏' : '顯示' }}
                  </button>
                </div>

                <transition name="fade">
                  <div
                    v-if="playgroundState.showList"
                    class="space-y-2"
                  >
                    <div
                      v-for="item in playgroundState.items"
                      :key="item"
                      class="px-4 py-2 bg-slate-50 rounded-lg flex items-center gap-2 text-sm text-slate-600 border border-slate-100"
                    >
                      <IIcon
                        icon="mdi-check-circle"
                        size="14"
                        class="text-emerald-500"
                      />
                      {{ item }}
                    </div>
                  </div>
                </transition>
              </div>
            </div>

            <!-- Ambient Pattern Background -->
            <div
              class="absolute inset-0 opacity-[0.03] pointer-events-none"
              style="
                background-image: radial-gradient(#6366f1 1.5px, transparent 1.5px);
                background-size: 24px 24px;
              "
            ></div>
          </div>
        </ICard>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
