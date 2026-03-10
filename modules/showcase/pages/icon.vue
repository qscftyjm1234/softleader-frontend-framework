<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import IIcon from '~/components/uiInterface/IIcon.vue'
import IButton from '~/components/uiInterface/IButton.vue'
import IInput from '~/components/uiInterface/IInput.vue'
import IBreadcrumbs from '~/components/uiInterface/layout/IBreadcrumbs.vue'
import { useBreadcrumbs } from '~/composables/useBreadcrumbs'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'
import { iconCategories } from '../data/mdi-icons'

const { breadcrumbs: breadcrumbItems } = useBreadcrumbs()

definePageMeta({
  title: '圖示組件核心 (Icon System)',
  layout: 'portal'
})

const units = ref([
  {
    id: 'concept',
    title: '單元 00：設計核心',
    icon: 'mdi-shield-outline',
    description:
      'IIcon 元件是一個「抽象容器」。它不關心裡面放的是什麼，只負責處理大小、顏色與佈局對齊。',
    useCase: '理解如何透過殼組件（Shell Component）來統一全站的圖示規格。'
  },
  {
    id: 'mdi',
    title: '單元 01：MDI 字體圖示',
    icon: 'mdi-material-design',
    description: '最便捷的使用方式。直接傳入 mdi- 前綴字串，系統會自動轉換為對應的圖示。',
    useCase: '快速 UI 開發、一般功能按鈕圖示。'
  },
  {
    id: 'svg',
    title: '單元 02：SVG 路徑與自定義',
    icon: 'mdi-svg',
    description: '支援直接傳入 SVG Path 資料，或是透過 Slot 嵌入自定義 SVG 內容，並繼承顏色屬性。',
    useCase: '品牌 Logo、第三方圖示庫、高度自定義的幾何圖形。'
  },
  {
    id: 'integration',
    title: '單元 03：組件整合應用',
    icon: 'mdi-puzzle-outline',
    description: '展示圖示如何與「輸入框」、「按鈕」等高階組件無縫協作。',
    useCase: '帶圖示的搜尋欄、動作按鈕雲、狀態指示器。'
  },
  {
    id: 'cheatsheet',
    title: '單元 04：圖示速查表',
    icon: 'mdi-magnify',
    description: '內建過千款 MDI 圖示庫，點擊即可複製名稱，直接貼上到程式碼中使用。',
    useCase: '在開發過程中快速尋找適合的視覺符號。'
  }
])

const activeUnitIndex = ref(0)
const activeUnit = computed(() => units.value[activeUnitIndex.value])

// Search & Filter Logic for Cheatsheet
const searchQuery = ref('')
const copiedIcon = ref('')

const filteredCategories = computed(() => {
  if (!searchQuery.value) return iconCategories
  const query = searchQuery.value.toLowerCase()
  const result: Record<string, string[]> = {}
  for (const [category, icons] of Object.entries(iconCategories)) {
    const matched = icons.filter((icon) => icon.includes(query))
    if (matched.length > 0) result[category] = matched
  }
  return result
})

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
  copiedIcon.value = text
  setTimeout(() => (copiedIcon.value = ''), 2000)
}

const scrollContainer = ref<HTMLElement | null>(null)
watch(activeUnitIndex, () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollTo({ top: 0, behavior: 'smooth' })
  }
})

// Snippets
const snippets = {
  mdi: `<IIcon icon="mdi-account" color="primary" size="large" />\n<IIcon icon="mdi-bell" color="#ff9800" />`,
  svg: `<IIcon icon="M12,2A10,10 0 0,0 2,12..." />\n\n<!-- 或嵌入 Slot -->\n<IIcon color="red">\n  <svg>...</svg>\n</IIcon>`,
  integration: `<IButton prepend-icon="mdi-check">確定</IButton>\n<IInput prepend-icon="mdi-email" />`
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
            <!-- Unit 00: Design Core -->
            <template v-if="activeUnit.id === 'concept'">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ShowcaseCard
                  title="抽象分層視圖"
                  description="為什麼 IIcon 只需要一個 Color 屬性？"
                >
                  <div class="space-y-6 py-4">
                    <div
                      class="p-4 rounded-xl bg-emerald-50 text-emerald-900 text-sm font-bold border border-emerald-100 text-center"
                    >
                      介面層 (Size, Color, Padding)
                    </div>
                    <div class="flex justify-center text-slate-300">
                      <IIcon icon="mdi-arrow-down" />
                    </div>
                    <div
                      class="p-4 rounded-xl bg-slate-900 text-slate-400 text-xs font-mono border border-slate-800 text-center"
                    >
                      渲染層 (MDI / SVG / Path)
                    </div>
                  </div>
                </ShowcaseCard>
                <div class="space-y-6 pt-2">
                  <h4 class="text-sm font-black text-slate-400 uppercase tracking-widest">
                    核心價值
                  </h4>
                  <ul class="space-y-4">
                    <li class="flex items-start gap-3">
                      <div class="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                      <p class="text-slate-600 text-sm leading-relaxed">
                        <strong>樣式一致性</strong>
                        ：確保全站所有圖示的對齊方式、預設間距完全相同。
                      </p>
                    </li>
                    <li class="flex items-start gap-3">
                      <div class="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                      <p class="text-slate-600 text-sm leading-relaxed">
                        <strong>簡化邏輯</strong>
                        ：開發者不需要處理 SVG 的 currentColor 或字體間距細節。
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </template>

            <!-- Unit 01: MDI -->
            <template v-if="activeUnit.id === 'mdi'">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ShowcaseCard title="實時渲染預覽">
                  <div
                    class="flex items-center justify-around py-10 bg-slate-50 rounded-2xl border border-slate-100"
                  >
                    <div class="flex flex-col items-center gap-2">
                      <IIcon
                        icon="mdi-home"
                        size="32"
                        color="#10b981"
                      />
                      <span class="text-[10px] font-bold text-slate-400">mdi-home</span>
                    </div>
                    <div class="flex flex-col items-center gap-2">
                      <IIcon
                        icon="mdi-check-circle"
                        size="32"
                        color="primary"
                      />
                      <span class="text-[10px] font-bold text-slate-400">primary</span>
                    </div>
                    <div class="flex flex-col items-center gap-2">
                      <IIcon
                        icon="mdi-fire"
                        size="48"
                        color="#f43f5e"
                      />
                      <span class="text-[10px] font-bold text-slate-400">mdi-fire (Large)</span>
                    </div>
                  </div>
                </ShowcaseCard>
                <div class="space-y-4">
                  <h4 class="text-sm font-black text-slate-400 uppercase tracking-widest">
                    程式碼範例
                  </h4>
                  <ShowcaseCodeBlock
                    filename="Example.vue"
                    :code="snippets.mdi"
                  />
                </div>
              </div>
            </template>

            <!-- Unit 02: SVG -->
            <template v-if="activeUnit.id === 'svg'">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ShowcaseCard title="SVG Data 實戰">
                  <div class="flex flex-col items-center gap-8 py-6">
                    <div
                      class="flex items-center gap-6 p-6 bg-white shadow-sm border border-slate-100 rounded-2xl w-full"
                    >
                      <IIcon
                        icon="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
                        color="red"
                        size="48"
                      />
                      <div>
                        <div class="font-black text-slate-800">直接傳入 Path</div>
                        <div class="text-xs text-slate-500">支援無限延伸的向量路徑</div>
                      </div>
                    </div>
                    <div
                      class="flex items-center gap-6 p-6 bg-emerald-900 border border-emerald-800 rounded-2xl w-full text-white"
                    >
                      <IIcon
                        color="emerald"
                        size="48"
                      >
                        <svg viewBox="0 0 24 24">
                          <path
                            d="M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5Z"
                            fill="currentColor"
                          />
                        </svg>
                      </IIcon>
                      <div>
                        <div class="font-black">Slot 注入</div>
                        <div class="text-xs opacity-60">
                          自動繼承
                          <code>currentColor</code>
                        </div>
                      </div>
                    </div>
                  </div>
                </ShowcaseCard>
                <div class="space-y-4">
                  <h4 class="text-sm font-black text-slate-400 uppercase tracking-widest">
                    SVG 整合代碼
                  </h4>
                  <ShowcaseCodeBlock :code="snippets.svg" />
                </div>
              </div>
            </template>

            <!-- Unit 03: Integration -->
            <template v-if="activeUnit.id === 'integration'">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ShowcaseCard title="高階組件聯動">
                  <div class="space-y-6 pt-4">
                    <div class="space-y-2">
                      <label class="text-[10px] font-black text-slate-400 uppercase">
                        Input Prepend Icon
                      </label>
                      <IInput
                        prepend-icon="mdi-magnify"
                        placeholder="搜尋項目..."
                      />
                    </div>
                    <div class="flex gap-4">
                      <IButton
                        prepend-icon="mdi-plus"
                        color="primary"
                      >
                        新增資料
                      </IButton>
                      <IButton
                        prepend-icon="mdi-delete-outline"
                        color="error"
                        variant="text"
                      >
                        刪除
                      </IButton>
                    </div>
                  </div>
                </ShowcaseCard>
                <div class="space-y-4">
                  <h4 class="text-sm font-black text-slate-400 uppercase tracking-widest">
                    佈局代碼
                  </h4>
                  <ShowcaseCodeBlock :code="snippets.integration" />
                </div>
              </div>
            </template>

            <!-- Unit 04: Cheatsheet -->
            <template v-if="activeUnit.id === 'cheatsheet'">
              <div class="space-y-6">
                <div
                  class="flex items-center justify-between bg-slate-900 p-6 rounded-[2rem] border border-slate-800"
                >
                  <div class="flex-1 max-w-md">
                    <IInput
                      v-model="searchQuery"
                      prepend-icon="mdi-magnify"
                      placeholder="搜尋 1000+ 個圖示..."
                      class="dark-input"
                    />
                  </div>
                  <div class="text-xs font-black text-slate-500 uppercase flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                    {{ Object.values(iconCategories).reduce((a, b) => a + b.length, 0) }} Icons
                    Loaded
                  </div>
                </div>

                <div
                  class="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden"
                >
                  <div
                    v-for="(icons, category) in filteredCategories"
                    :key="category"
                    class="mb-10 last:mb-0"
                  >
                    <div
                      class="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2 px-2"
                    >
                      {{ category }}
                      <div class="flex-1 h-px bg-slate-50"></div>
                    </div>
                    <div class="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                      <a-tooltip
                        v-for="icon in icons"
                        :key="icon"
                        :title="icon"
                      >
                        <button
                          class="flex flex-col items-center justify-center p-4 rounded-2xl hover:bg-emerald-50 hover:text-emerald-600 border border-transparent hover:border-emerald-100 transition-all group"
                          @click="copyToClipboard(icon)"
                        >
                          <IIcon
                            :icon="icon"
                            size="24"
                            class="group-hover:scale-110 transition-transform"
                          />
                        </button>
                      </a-tooltip>
                    </div>
                  </div>

                  <!-- Empty State -->
                  <div
                    v-if="Object.keys(filteredCategories).length === 0"
                    class="py-20 text-center text-slate-400"
                  >
                    <IIcon
                      icon="mdi-emoticon-sad-outline"
                      size="48"
                      class="mb-4 opacity-30"
                    />
                    <p class="font-bold">找不到符合 "{{ searchQuery }}" 的圖示</p>
                  </div>

                  <!-- Toast -->
                  <div
                    v-if="copiedIcon"
                    class="fixed bottom-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-slideUp z-50"
                  >
                    <IIcon
                      icon="mdi-check-circle"
                      color="#10b981"
                    />
                    <span class="text-sm font-bold">已複製: {{ copiedIcon }}</span>
                  </div>
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
              完成圖示核心課程
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

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translate(-50%, 20px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

.animate-slideUp {
  animation: slideUp 0.3s ease-out forwards;
}

:deep(.dark-input .v-field) {
  background: rgba(255, 255, 255, 0.05) !important;
  color: white !important;
}

:deep(.dark-input .v-field__outline) {
  --v-field-border-opacity: 0.1 !important;
}
</style>
