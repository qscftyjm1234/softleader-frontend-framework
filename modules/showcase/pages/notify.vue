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
  title: '通知系統核心 (Notification System)',
  layout: 'portal'
})

const { success, error, warning, info } = useNotify()

const units = ref([
  {
    id: 'concept',
    title: '單元 00：核心概念',
    icon: 'mdi-bell-outline',
    description: '通知系統提供輕量級的 Snackbar/Toast 反饋。呼叫即顯示，自動管理隊列與生命週期。',
    useCase: '理解如何透過狀態驅動的方式發送非阻塞性的訊息反饋。'
  },
  {
    id: 'types',
    title: '單元 01：通知類型',
    icon: 'mdi-palette-outline',
    description: '內建四種語義化類型：成功 (Success)、錯誤 (Error)、警告 (Warning) 與提示 (Info)。',
    useCase: '根據操作結果選擇適合的視覺符號與色彩。'
  },
  {
    id: 'queue',
    title: '單元 02：佇列與自動消失',
    icon: 'mdi-sort-variant',
    description: '通知會按照呼叫順序排入隊列，並在設定的延遲時間（預設 3 秒）後自動消失。',
    useCase: '短時間內發送多條訊息時，避免訊息重疊覆蓋。'
  },
  {
    id: 'integration',
    title: '單元 03：實戰整合',
    icon: 'mdi-puzzle-outline',
    description: '展示與 API 請求結果或表單校驗邏輯的整合應用。',
    useCase: 'API 回傳 200 時顯示成功，回傳 4xx/5xx 時顯示錯誤。'
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

// Action Handlers
const handleNotify = (type: 'success' | 'error' | 'warning' | 'info') => {
  const messages = {
    success: '專案設定已成功儲存！',
    error: '無法連線至伺服器，請檢查網路狀態 (504)',
    warning: '您的磁碟空間即將不足，請儘速處理。',
    info: '今日有 3 條待處理的系統更新。'
  }

  if (type === 'success') success(messages.success)
  else if (type === 'error') error(messages.error)
  else if (type === 'warning') warning(messages.warning)
  else if (type === 'info') info(messages.info)
}

// Snippets
const snippets = {
  basic: `const { success, error } = useNotify()\n\nsuccess('操作成功')\nerror('出錯了...')`,
  api: `try {\n  await useApi('/api/save', { body: form })\n  success('儲存成功')\n} catch (e) {\n  error(e.message || '儲存失敗')\n}`
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
            <!-- Unit 00: Concept -->
            <template v-if="activeUnit.id === 'concept'">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ShowcaseCard title="Composable API">
                  <ShowcaseCodeBlock :code="snippets.basic" />
                </ShowcaseCard>
                <div class="space-y-6 pt-2">
                  <h4 class="text-sm font-black text-slate-400 uppercase tracking-widest">
                    系統特性
                  </h4>
                  <ul class="space-y-4">
                    <li class="flex items-start gap-3">
                      <div class="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                      <p class="text-slate-600 text-sm leading-relaxed">
                        <strong>呼叫即顯示</strong>
                        ：無需在每個頁面引入
                        <code>&lt;Notify /&gt;</code>
                        ，全域僅需一個掛載點。
                      </p>
                    </li>
                    <li class="flex items-start gap-3">
                      <div class="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                      <p class="text-slate-600 text-sm leading-relaxed">
                        <strong>解耦 UI</strong>
                        ：業務邏輯層 (Business Layer) 也可以直接發送通知而無須依賴 Vue Context。
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </template>

            <!-- Unit 01: Types -->
            <template v-if="activeUnit.id === 'types'">
              <ShowcaseCard
                title="交互觸發測試"
                description="點擊下方不同顏色的按鈕以觀察全域通知。"
              >
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6 py-4">
                  <button
                    class="group flex flex-col items-center gap-3 p-6 rounded-[2rem] bg-emerald-50 border border-emerald-100 active:scale-95 transition-all"
                    @click="handleNotify('success')"
                  >
                    <div
                      class="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform"
                    >
                      <IIcon
                        icon="mdi-check-circle"
                        size="28"
                      />
                    </div>
                    <span class="text-xs font-black text-emerald-700 uppercase tracking-widest">
                      Success
                    </span>
                  </button>

                  <button
                    class="group flex flex-col items-center gap-3 p-6 rounded-[2rem] bg-rose-50 border border-rose-100 active:scale-95 transition-all"
                    @click="handleNotify('error')"
                  >
                    <div
                      class="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-rose-500 group-hover:scale-110 transition-transform"
                    >
                      <IIcon
                        icon="mdi-alert-circle"
                        size="28"
                      />
                    </div>
                    <span class="text-xs font-black text-rose-700 uppercase tracking-widest">
                      Error
                    </span>
                  </button>

                  <button
                    class="group flex flex-col items-center gap-3 p-6 rounded-[2rem] bg-amber-50 border border-amber-100 active:scale-95 transition-all"
                    @click="handleNotify('warning')"
                  >
                    <div
                      class="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform"
                    >
                      <IIcon
                        icon="mdi-alert"
                        size="28"
                      />
                    </div>
                    <span class="text-xs font-black text-amber-700 uppercase tracking-widest">
                      Warning
                    </span>
                  </button>

                  <button
                    class="group flex flex-col items-center gap-3 p-6 rounded-[2rem] bg-sky-50 border border-sky-100 active:scale-95 transition-all"
                    @click="handleNotify('info')"
                  >
                    <div
                      class="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-sky-500 group-hover:scale-110 transition-transform"
                    >
                      <IIcon
                        icon="mdi-information"
                        size="28"
                      />
                    </div>
                    <span class="text-xs font-black text-sky-700 uppercase tracking-widest">
                      Info
                    </span>
                  </button>
                </div>
              </ShowcaseCard>
            </template>

            <!-- Unit 02: Queue -->
            <template v-if="activeUnit.id === 'queue'">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ShowcaseCard title="佇列管理展示">
                  <div class="py-4 space-y-6">
                    <p class="text-sm text-slate-500 font-medium">
                      連續點擊下方按鈕，系統會將通知依序顯示，避免視覺衝突。
                    </p>
                    <IButton
                      color="primary"
                      class="w-full"
                      @click="
                        () => {
                          handleNotify('info')
                          handleNotify('success')
                        }
                      "
                    >
                      併發觸發兩則通知
                    </IButton>
                  </div>
                </ShowcaseCard>
                <div class="space-y-6 pt-2">
                  <h4 class="text-sm font-black text-slate-400 uppercase tracking-widest">
                    計時機制
                  </h4>
                  <ul class="space-y-4">
                    <li class="flex items-start gap-3">
                      <div class="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                      <p class="text-slate-600 text-sm leading-relaxed">
                        <strong>Auto-Hide</strong>
                        ：預設停留 3000ms，鼠標懸停會自動暫停計時。
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </template>

            <!-- Unit 03: Integration -->
            <template v-if="activeUnit.id === 'integration'">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ShowcaseCard title="API 特例處理">
                  <ShowcaseCodeBlock :code="snippets.api" />
                </ShowcaseCard>
                <div class="space-y-6 pt-2">
                  <h4 class="text-sm font-black text-slate-400 uppercase tracking-widest">
                    實戰指南
                  </h4>
                  <p class="text-sm text-slate-600 leading-relaxed font-medium">
                    在大部份情況下，
                    <code>useApi</code>
                    啟用了
                    <code>autoSuccess: true</code>
                    與
                    <code>autoError: true</code>
                    ，您幾乎不需要在業務層手動編寫通知邏輯。
                  </p>
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
              完成通知系統課程
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
</style>
