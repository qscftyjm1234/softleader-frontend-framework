<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import IIcon from '~/components/uiInterface/IIcon.vue'
import IButton from '~/components/uiInterface/IButton.vue'
import IBreadcrumbs from '~/components/uiInterface/layout/IBreadcrumbs.vue'
import { useBreadcrumbs } from '~/composables/useBreadcrumbs'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'

const { breadcrumbs: breadcrumbItems } = useBreadcrumbs()

definePageMeta({
  title: '載入狀態核心 (Loading System)',
  layout: 'portal'
})

const loading = useLoading()
const { count, isLoading } = loading

const units = ref([
  {
    id: 'concept',
    title: '單元 00：核心概念',
    icon: 'mdi-progress-clock',
    description:
      'Loading 系統採用「計數器 (Stack)」機制。當多個異步請求併發時，遮罩會維持開啟直到最後一個請求完成。',
    useCase: '理解全域 Loading 如何避免頁面因頻繁的請求完成而產生閃爍現象。'
  },
  {
    id: 'stack',
    title: '單元 01：計數器機制',
    icon: 'mdi-layers-outline',
    description:
      '展示 Stack 數量的變化。即使手動觸發多次 start()，也需要等量的 finish() 才能關閉遮罩。',
    useCase: '處理儀表板或是複雜報表頁面中，多個獨立組件同時發起 API 的情境。'
  },
  {
    id: 'api',
    title: '單元 02：API 自動化整合',
    icon: 'mdi-api',
    description: '核心 `useApi` 已自動整合全域 Loading。開發者通常不需要手動呼叫 start/finish。',
    useCase: '絕大多數的後台數據查詢情境。'
  },
  {
    id: 'local',
    title: '單元 03：局部狀態綁定',
    icon: 'mdi-link-variant',
    description:
      '透過 `loadingRef` 參數，可以將 API 狀態直接同步到特定組件（如按鈕的 loading 屬性）。',
    useCase: '表單送出按鈕、局部列表更新。'
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

// Simulation Logic
const localLoading = ref(false)
const mockDataCount = ref(0)

const handleApiSimulate = async (type: 'global' | 'local' | 'stack') => {
  if (type === 'global') {
    await useApi('/dashboard/stats', { autoSuccess: true })
  } else if (type === 'local') {
    await useApi('/orders', { loadingRef: localLoading, autoSuccess: true })
  } else if (type === 'stack') {
    const timestamp = Date.now()
    await Promise.all([
      useApi('/users', { query: { _t: timestamp } }),
      useApi('/activities', { query: { _t: timestamp } }),
      useApi('/orders', { query: { _t: timestamp } })
    ])
  }
  mockDataCount.value += Math.floor(Math.random() * 5) + 1
}

// Snippets
const snippets = {
  hook: `const { start, finish, isLoading } = useLoading()\n\nloading.start() // Count +1\nloading.finish() // Count -1`,
  api: `// 預設自動啟動全域 Loading\nawait useApi('/api/users')\n\n// 若不需遮罩可手動關閉\nawait useApi('/api/log', { globalLoading: false })`,
  ref: `const isSubmitting = ref(false)\n\n// 自動將 API 狀態綁定到 isSubmitting\nawait useApi('/submit', { loadingRef: isSubmitting })`
}
</script>

<template>
  <div class="vue-course-layout min-h-screen bg-white">
    <!-- Header -->
    <header
      class="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-slate-100 px-8 py-4"
    >
      <div class="max-w-[1400px] mx-auto flex items-center justify-between">
        <div class="flex items-center gap-5">
          <NuxtLink
            to="/showcase"
            class="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-emerald-600 transition-all group"
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
          <div class="text-right">
            <span class="text-[10px] font-black text-emerald-500 uppercase">單元進度</span>
            <div class="text-sm font-mono font-bold text-slate-600">
              {{ activeUnitIndex + 1 }} / {{ units.length }}
            </div>
          </div>
          <div class="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              class="h-full bg-emerald-500 transition-all duration-500"
              :style="{ width: `${((activeUnitIndex + 1) / units.length) * 100}%` }"
            ></div>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-73px)]">
      <!-- Sidebar -->
      <aside class="lg:col-span-3 border-r border-slate-50 p-6 space-y-2 bg-slate-50/30">
        <div
          class="px-4 py-2 mb-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]"
        >
          課程單元
        </div>
        <button
          v-for="(unit, index) in units"
          :key="unit.id"
          class="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group"
          :class="
            activeUnitIndex === index
              ? 'bg-white shadow-sm text-emerald-600 ring-1 ring-emerald-50'
              : 'text-slate-500 hover:bg-slate-100/50 hover:text-slate-900'
          "
          @click="activeUnitIndex = index"
        >
          <div
            class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-colors"
            :class="
              activeUnitIndex === index
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 text-slate-400'
            "
          >
            {{ index + 1 }}
          </div>
          <span class="text-sm font-black tracking-tight">{{ unit.title }}</span>
        </button>
      </aside>

      <!-- Main Content -->
      <div
        ref="scrollContainer"
        class="lg:col-span-9 h-full overflow-y-auto bg-slate-50/10"
      >
        <main class="max-w-4xl mx-auto p-10 space-y-12 pb-32">
          <!-- Intro Section -->
          <div class="space-y-6">
            <div class="flex items-center gap-4">
              <div
                class="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-sm"
              >
                <IIcon
                  :icon="activeUnit.icon"
                  size="28"
                />
              </div>
              <div>
                <h1 class="text-4xl font-black text-slate-900 tracking-tight">
                  {{ activeUnit.title }}
                </h1>
                <p class="text-lg text-slate-500 font-medium mt-1 leading-relaxed">
                  {{ activeUnit.description }}
                </p>
              </div>
            </div>
            <div
              class="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-5 flex items-start gap-4"
            >
              <div
                class="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-emerald-500 shrink-0"
              >
                <IIcon
                  icon="mdi-shield-check"
                  size="24"
                />
              </div>
              <div>
                <div class="text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                  實戰應用 (Use Case)
                </div>
                <p class="text-sm font-bold text-slate-600">{{ activeUnit.useCase }}</p>
              </div>
            </div>
          </div>

          <!-- Unit Content -->
          <div class="space-y-10 animate-fadeIn">
            <!-- Unit 00: Hook -->
            <template v-if="activeUnit.id === 'concept'">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ShowcaseCard title="Composable API">
                  <ShowcaseCodeBlock :code="snippets.hook" />
                </ShowcaseCard>
                <div class="space-y-6 pt-2">
                  <h4 class="text-sm font-black text-slate-400 uppercase tracking-widest">
                    系統特性
                  </h4>
                  <ul class="space-y-4">
                    <li class="flex items-start gap-3">
                      <div class="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                      <p class="text-slate-600 text-sm leading-relaxed">
                        <strong>防閃爍</strong>
                        ：只有在 Count 從 0 到 1 時才會顯示遮罩，避免同步代碼中的狀態跳動。
                      </p>
                    </li>
                    <li class="flex items-start gap-3">
                      <div class="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                      <p class="text-slate-600 text-sm leading-relaxed">
                        <strong>全域反應式</strong>
                        ：狀態存儲於 Pinia/State 中，跨頁面組件皆可直接觀察
                        <code>isLoading</code>
                        。
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </template>

            <!-- Unit 01: Stack -->
            <template v-if="activeUnit.id === 'stack'">
              <ShowcaseCard
                title="併發請求堆疊測試"
                description="點擊下方按鈕同時發起 3 個模擬 API 請求（間隔 2 秒），觀察堆疊數字變化。"
              >
                <div class="py-10 flex flex-col items-center gap-8">
                  <div class="flex items-center gap-12">
                    <div class="text-center">
                      <div
                        class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1"
                      >
                        Stack Count
                      </div>
                      <div
                        class="text-5xl font-mono font-black transition-all"
                        :class="count > 0 ? 'text-emerald-500 scale-110' : 'text-slate-200'"
                      >
                        {{ count }}
                      </div>
                    </div>
                    <div class="w-px h-16 bg-slate-100"></div>
                    <div class="text-center">
                      <div
                        class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1"
                      >
                        Overlay Status
                      </div>
                      <div
                        class="text-sm font-black flex items-center gap-2"
                        :class="isLoading ? 'text-emerald-600' : 'text-slate-400'"
                      >
                        <IIcon :icon="isLoading ? 'mdi-eye' : 'mdi-eye-off'" />
                        {{ isLoading ? 'VISIBLE' : 'HIDDEN' }}
                      </div>
                    </div>
                  </div>
                  <IButton
                    prepend-icon="mdi-flash"
                    color="primary"
                    @click="handleApiSimulate('stack')"
                  >
                    發起 3 重併發請求
                  </IButton>
                </div>
              </ShowcaseCard>
            </template>

            <!-- Unit 02: API -->
            <template v-if="activeUnit.id === 'api'">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ShowcaseCard title="自動化控制">
                  <div
                    class="p-8 bg-slate-50 rounded-2xl flex flex-col items-center justify-center gap-6 border border-slate-100"
                  >
                    <div class="flex gap-4">
                      <div class="w-3 h-3 rounded-full bg-slate-300 animate-pulse"></div>
                      <div class="w-3 h-3 rounded-full bg-slate-300 animate-pulse delay-75"></div>
                      <div class="w-3 h-3 rounded-full bg-slate-300 animate-pulse delay-150"></div>
                    </div>
                    <IButton @click="handleApiSimulate('global')">測試一般 API 請求</IButton>
                    <p class="text-xs text-slate-400 font-bold">
                      已載入總筆數: {{ mockDataCount }}
                    </p>
                  </div>
                </ShowcaseCard>
                <div class="space-y-4">
                  <h4 class="text-sm font-black text-slate-400 uppercase tracking-widest">
                    開發代碼
                  </h4>
                  <ShowcaseCodeBlock :code="snippets.api" />
                </div>
              </div>
            </template>

            <!-- Unit 03: local -->
            <template v-if="activeUnit.id === 'local'">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ShowcaseCard title="單點綁定 (Scoped)">
                  <div class="p-8 flex flex-col items-center gap-6">
                    <IButton
                      :loading="localLoading"
                      prepend-icon="mdi-send"
                      color="primary"
                      class="w-full h-14 rounded-2xl"
                      @click="handleApiSimulate('local')"
                    >
                      送出資料
                    </IButton>
                    <div class="flex items-center gap-3">
                      <div class="text-xs font-bold text-slate-400">localLoading Ref:</div>
                      <code
                        class="text-xs font-mono font-bold"
                        :class="localLoading ? 'text-emerald-500 font-black' : 'text-slate-300'"
                      >
                        {{ localLoading }}
                      </code>
                    </div>
                  </div>
                </ShowcaseCard>
                <div class="space-y-4">
                  <h4 class="text-sm font-black text-slate-400 uppercase tracking-widest">
                    綁定代碼
                  </h4>
                  <ShowcaseCodeBlock :code="snippets.ref" />
                </div>
              </div>
            </template>
          </div>

          <!-- Footer Navigation -->
          <div class="mt-12 border-t border-slate-100 pt-8 flex justify-between items-center">
            <button
              v-if="activeUnitIndex > 0"
              class="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 transition-all text-sm font-bold active:scale-95"
              @click="activeUnitIndex--"
            >
              <IIcon
                icon="mdi-arrow-left"
                size="18"
              />
              上一章節
            </button>
            <div v-else></div>

            <button
              v-if="activeUnitIndex < units.length - 1"
              class="flex items-center gap-2 px-8 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 shadow-xl transition-all text-sm font-bold active:scale-95"
              @click="activeUnitIndex++"
            >
              前進單元：{{ units[activeUnitIndex + 1].title.split('：')[1] }}
              <IIcon
                icon="mdi-arrow-right"
                size="18"
              />
            </button>
            <NuxtLink
              v-else
              to="/showcase"
              class="flex items-center gap-2 px-8 py-3 rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-200 font-bold text-sm active:scale-95 transition-all"
            >
              完成載入核心課程
              <IIcon
                icon="mdi-check-circle"
                size="18"
              />
            </NuxtLink>
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

.delay-75 {
  animation-delay: 75ms;
}
.delay-150 {
  animation-delay: 150ms;
}
</style>
