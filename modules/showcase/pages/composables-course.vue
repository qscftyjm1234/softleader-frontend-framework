<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import IIcon from '~/components/uiInterface/IIcon.vue'
import IButton from '~/components/uiInterface/IButton.vue'
import IBreadcrumbs from '~/components/uiInterface/layout/IBreadcrumbs.vue'
import { useBreadcrumbs } from '~/composables/useBreadcrumbs'

const { breadcrumbs: breadcrumbItems } = useBreadcrumbs()

definePageMeta({
  title: 'composables 介紹',
  layout: 'portal'
})

// Units Definition
const units = ref([
  {
    id: 'intro',
    title: '單元 00：什麼是 Composables？',
    icon: 'mdi-function-variant',
    description:
      '在龐大的企業級專案中，如果不將邏輯抽離，你會發現 script 區塊動輒數百行。我們透過核心邏輯 SDK 將「狀態」與「邏輯」封裝成可復用的函數。',
    tasks: ['理解從 Options API 到 Composition API 的演進', '觀察邏輯如何被「模組化」'],
    initialCode: `// 傳統寫法：邏輯散落在各處\n// 核心業務寫法：\nconst { data, loading, error } = useFetch('/api/user')`,
    code: `// 傳統寫法：邏輯散落在各處\n// 核心業務 寫法：\nconst { data, loading, error } = useFetch('/api/user')`,
    interactive: 'Intro',
    useCase: '當多個頁面需要共用相同的 API 串接、驗證邏輯或瀏覽器 API 監聽時。'
  },
  {
    id: 'state',
    title: '單元 01：利用 Composables 封裝狀態',
    icon: 'mdi-variable',
    description:
      'Composables 內部可以使用 ref 或 reactive。這些狀態是「私有」的，除非你選擇將它們回傳給叫用者。',
    tasks: ['修改計數器的初始值', '觀察狀態如何在組件間獨立運作'],
    initialCode: `\x3cscript setup\x3e\n  const { count, inc, dec } = useCounter(0)\n\x3c/script\x3e\n\n\x3ctemplate\x3e\n  \x3cp\x3e計數：{{ count }}\x3c/p\x3e\n  \x3cIButton label="增加" @click="inc" />\n\x3c/template\x3e`,
    code: `\x3cscript setup\x3e\n  const { count, inc, dec } = useCounter(0)\n\x3c/script\x3e\n\n\x3ctemplate\x3e\n  \x3cp\x3e計數：{{ count }}\x3c/p\x3e\n  \x3cIButton label="增加" @click="inc" />\n\x3c/template\x3e`,
    interactive: 'State',
    useCase: '管理頁面局部狀態、分頁邏輯、表單暫存等。'
  },
  {
    id: 'lifecycle',
    title: '單元 02：在 Composables 使用生命週期',
    icon: 'mdi-sync-circle',
    description:
      '你可以在 Composables 中使用 onMounted, onUnmounted 等鉤子。這讓「監聽器建立」與「銷毀」邏輯能完美合一。',
    tasks: ['查看滑鼠追蹤邏輯', '觀察組件過場時監聽器的自動清理'],
    initialCode: `\x3cscript setup\x3e\n  const { x, y } = useMousePosition()\n\x3c/script\x3e\n\n\x3ctemplate\x3e\n  \x3cp\x3e座標：{{ x }}, {{ y }}\x3c/p\x3e\n\x3c/template\x3e`,
    code: `\x3cscript setup\x3e\n  const { x, y } = useMousePosition()\n\x3c/script\x3e\n\n\x3ctemplate\x3e\n  \x3cp\x3e座標：{{ x }}, {{ y }}\x3c/p\x3e\n\x3c/template\x3e`,
    interactive: 'Lifecycle',
    useCase: '視窗大小監聽、網路狀態偵測、動畫幀管理。'
  },
  {
    id: 'async',
    title: '單元 03：非同步 API 與 Composables',
    icon: 'mdi-cloud-download-outline',
    description:
      '封裝 API 請求是 Composables 最強大的戰場。我們可以統一處理 Loading 狀態、錯誤回報與數據格式轉換。',
    tasks: ['模擬網路延遲', '切換不同的 API 端點路徑'],
    initialCode: `\x3cscript setup\x3e\n  const { list, refresh } = useList('/products')\n\x3c/script\x3e\n\n\x3ctemplate\x3e\n  \x3cdiv v-for="item in list"\x3e{{ item.name }}\x3c/div\x3e\n\x3c/template\x3e`,
    code: `\x3cscript setup\x3e\n  const { list, refresh } = useList('/products')\n\x3c/script\x3e\n\n\x3ctemplate\x3e\n  \x3cdiv v-for="item in list"\x3e{{ item.name }}\x3c/div\x3e\n\x3c/template\x3e`,
    interactive: 'Async',
    useCase: '整合 axios/fetch，建立標準化的資料層。'
  },
  {
    id: 'shared',
    title: '單元 04：全域狀態與 Composables',
    icon: 'mdi-share-variant',
    description:
      'Nuxt 提供的 useState 可以跨組件共享響應式狀態，且是 SSR 安全的。這在處理 User Profile 時非常有用。',
    tasks: ['修改共享的 User 姓名', '觀察在不同地方調用時的同步效果'],
    initialCode: `\x3cscript setup\x3e\n  const user = useState('user', () => ({ name: '訪客' }))\n  const updateName = (val) => user.value.name = val\n\x3c/script\x3e`,
    code: `\x3cscript setup\x3e\n  const user = useState('user', () => ({ name: '訪客' }))\n  const updateName = (val) => user.value.name = val\n\x3c/script\x3e`,
    interactive: 'Shared',
    useCase: '全域登入狀態、多語言切換、購物車預覽。'
  },
  {
    id: 'args',
    title: '單元 05：為 Composables 加入參數',
    icon: 'mdi-tune-variant',
    description: 'Composables 可以接受參數，甚至接受響應式的參數 (refs)。這讓邏輯可以動態變化。',
    tasks: ['修改傳入的 URL', '觀察 API 參數如何隨之連動'],
    initialCode: `\x3cscript setup\x3e\n  const endpoint = ref('/users')\n  const { data } = useApi(endpoint)\n\x3c/script\x3e`,
    code: `\x3cscript setup\x3e\n  const endpoint = ref('/users')\n  const { data } = useApi(endpoint)\n\x3c/script\x3e`,
    interactive: 'Args',
    useCase: '分頁切換、搜尋條件篩選、根據 ID 抓取特定資料。'
  },
  {
    id: 'composition',
    title: '單元 06：Composables 的進階組合',
    icon: 'mdi-plus-box-multiple-outline',
    description:
      'Composables 的精髓在於組合。你可以將多個小的 Composables 組合出一個功能強大的大型功能。',
    tasks: ['觀察使用方式', '理解樂高式的邏輯建構'],
    initialCode: `\x3cscript setup\x3e\n  const { exec } = useComplexTask()\n\x3c/script\x3e`,
    code: `\x3cscript setup\x3e\n  const { exec } = useComplexTask()\n\x3c/script\x3e`,
    interactive: 'Composition',
    useCase: '高階業務組件（如：訂單管理、權限控制）。'
  },
  {
    id: 'best',
    title: '單元 07：Composables 最佳實踐',
    icon: 'mdi-star-check-outline',
    description: '遵循「use」前綴、回傳物件、使用 unref 等規範，讓代碼更易維護。',
    tasks: ['檢查變數命名規範', '確認清理邏輯'],
    initialCode: `export const useMyFeature = () => {\n  const data = ref(null)\n  onUnmounted(() => { /* 清除 */ })\n  return { data }\n}`,
    code: `export const useMyFeature = () => {\n  const data = ref(null)\n  onUnmounted(() => { /* 清除 */ })\n  return { data }\n}`,
    interactive: 'Best',
    useCase: '標準化所有業務邏輯封裝時。'
  },
  {
    id: 'directory',
    title: '單元 08：內建 Composables 大全',
    icon: 'mdi-folder-search-outline',
    description:
      '企業級前端不僅有基礎的七個單元，我們已經為你準備了超過 30 種標準化的工具函數，覆蓋所有常見業務場景。',
    tasks: ['瀏覽全部 30+ 內建 Composables', '根據分類尋找需要的工具'],
    initialCode: `// 體驗內建的 30+ 業務邏輯 API\nconst { copy } = useClipboard()\nconst { download } = useFileDownload()\nconst { validate } = useValidation()`,
    code: `// 體驗內建的 30+ 業務邏輯 API\nconst { copy } = useClipboard()\nconst { download } = useFileDownload()\nconst { validate } = useValidation()`,
    interactive: 'Directory',
    useCase: '查閱開發包中所有已經封裝好的邏輯工具，避免重複造輪子。'
  }
])

const activeUnitIndex = ref(0)
const activeUnit = computed(() => units.value[activeUnitIndex.value])

// Simulator State
const state = ref({
  count: 0,
  mouseX: 0,
  mouseY: 0,
  loading: false,
  list: [] as any[],
  sharedUser: '訪客',
  activeEndpoint: '/users',
  logs: [] as string[]
})

// Simulator Logic
const addLog = (msg: string) => {
  state.value.logs.push(`[${new Date().toLocaleTimeString()}] ${msg}`)
}

const inc = () => {
  state.value.count++
  addLog('Counter Increased')
}
const dec = () => {
  state.value.count--
  addLog('Counter Decreased')
}

// Global Mouse tracking for lifecycle unit
let handleMouse: ((e: MouseEvent) => void) | null = null

watch(activeUnitIndex, (newIdx) => {
  // Cleanup
  if (handleMouse) {
    window.removeEventListener('mousemove', handleMouse)
    handleMouse = null
  }

  const unit = units.value[newIdx]
  if (unit.id === 'lifecycle') {
    handleMouse = (e: MouseEvent) => {
      state.value.mouseX = e.clientX
      state.value.mouseY = e.clientY
    }
    window.addEventListener('mousemove', handleMouse)
  }
})

onUnmounted(() => {
  if (handleMouse) window.removeEventListener('mousemove', handleMouse)
})

// Reactive Simulator Logic
watch(
  () => units.value[activeUnitIndex.value].code,
  (newCode) => {
    const unitId = units.value[activeUnitIndex.value].id

    if (unitId === 'state') {
      const match = newCode.match(/useCounter\((\d+)\)/)
      if (match) state.value.count = parseInt(match[1])
    } else if (unitId === 'async') {
      const match = newCode.match(/useList\(['"](.*?)['"]\)/)
      if (match) {
        state.value.loading = true
        setTimeout(() => {
          state.value.loading = false
          addLog(`Fetched data from ${match[1]}`)
        }, 1000)
      }
    } else if (unitId === 'shared') {
      const match = newCode.match(/name:\s*['"](.*?)['"]/)
      if (match) state.value.sharedUser = match[1]
    } else if (unitId === 'args') {
      const match = newCode.match(/ref\(\s*['"](.*?)['"]\s*\)/)
      if (match) state.value.activeEndpoint = match[1]
    }
  },
  { immediate: true }
)

const resetState = () => {
  state.value = {
    count: 0,
    mouseX: 0,
    mouseY: 0,
    loading: false,
    list: [],
    sharedUser: '訪客',
    activeEndpoint: '/users',
    logs: []
  }
  units.value[activeUnitIndex.value].code = units.value[activeUnitIndex.value].initialCode
}

const scrollContainer = ref<HTMLElement | null>(null)
watch(activeUnitIndex, () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollTo({ top: 0, behavior: 'smooth' })
  }
})
</script>

<template>
  <div class="composables-course-layout min-h-screen bg-white">
    <!-- Header -->
    <header
      class="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-slate-100 px-8 py-4"
    >
      <div class="max-w-[1400px] mx-auto flex items-center justify-between">
        <div class="flex items-center gap-5">
          <NuxtLink
            to="/"
            class="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all hover:bg-indigo-50 group"
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
          <div class="text-sm font-mono font-bold text-slate-600">
            Course Unit: {{ activeUnitIndex + 1 }} / {{ units.length }}
          </div>
          <div class="w-24 h-2 bg-slate-100 rounded-full">
            <div
              class="h-full bg-indigo-500 rounded-full"
              :style="{ width: `${((activeUnitIndex + 1) / units.length) * 100}%` }"
            ></div>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-73px)]">
      <!-- Sidebar -->
      <aside class="lg:col-span-3 border-r border-slate-50 p-6 space-y-2 bg-slate-50/30">
        <button
          v-for="(unit, index) in units"
          :key="unit.id"
          class="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all"
          :class="
            activeUnitIndex === index
              ? 'bg-white shadow-sm text-indigo-600 ring-1 ring-indigo-50'
              : 'text-slate-500 hover:bg-slate-100/50'
          "
          @click="activeUnitIndex = index"
        >
          <div
            class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
            :class="
              activeUnitIndex === index ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'
            "
          >
            {{ index + 1 }}
          </div>
          <span class="text-sm font-black">{{ unit.title }}</span>
        </button>
      </aside>

      <!-- Main Content -->
      <main
        ref="scrollContainer"
        class="lg:col-span-9 p-8 lg:p-12 overflow-y-auto"
      >
        <div class="max-w-5xl mx-auto space-y-12">
          <!-- Unit Header -->
          <div class="flex items-start gap-6">
            <div
              class="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 shrink-0"
            >
              <IIcon
                :icon="activeUnit.icon"
                size="28"
              />
            </div>
            <div>
              <h2 class="text-3xl font-black text-slate-900 mb-2">{{ activeUnit.title }}</h2>
              <p class="text-slate-500 leading-relaxed">{{ activeUnit.description }}</p>
            </div>
          </div>

          <!-- Playground -->
          <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div class="space-y-4">
              <div class="flex items-center justify-between px-2">
                <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  互動編輯器
                </span>
                <button
                  class="text-[10px] font-black text-slate-400 hover:text-indigo-600 uppercase transition-colors"
                  @click="resetState"
                >
                  重置代碼
                </button>
              </div>
              <div
                class="bg-slate-900 rounded-[2rem] p-6 shadow-2xl relative overflow-hidden group"
              >
                <div
                  class="absolute top-4 right-6 flex gap-1.5 opacity-30 group-hover:opacity-100 transition-opacity"
                >
                  <div class="w-3 h-3 rounded-full bg-red-500"></div>
                  <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div class="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <textarea
                  v-model="units[activeUnitIndex].code"
                  spellcheck="false"
                  class="w-full h-[300px] bg-transparent text-indigo-100 font-mono text-sm leading-relaxed outline-none resize-none pt-4"
                ></textarea>
              </div>
            </div>

            <!-- Preview -->
            <div class="space-y-4">
              <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
                即時預覽 (Live Simulator)
              </span>
              <div
                class="bg-slate-50 rounded-[2.5rem] border border-slate-100 p-8 min-h-[365px] flex flex-col items-center justify-center relative overflow-hidden"
              >
                <!-- Simulation Area -->
                <div
                  v-if="activeUnit.id === 'state'"
                  class="text-center space-y-6"
                >
                  <div class="text-5xl font-black text-slate-800">{{ state.count }}</div>
                  <div class="flex gap-4">
                    <IButton
                      label="減少"
                      color="slate"
                      @click="dec"
                    />
                    <IButton
                      label="增加"
                      color="primary"
                      @click="inc"
                    />
                  </div>
                </div>
                <div
                  v-if="activeUnit.id === 'lifecycle'"
                  class="text-center space-y-2"
                >
                  <div class="px-6 py-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                    <div class="text-xs font-black text-slate-400 uppercase">Mouse Position</div>
                    <div class="text-2xl font-mono font-black text-slate-700">
                      X: {{ state.mouseX }} | Y: {{ state.mouseY }}
                    </div>
                  </div>
                </div>
                <div
                  v-if="activeUnit.id === 'async'"
                  class="w-full space-y-4"
                >
                  <div
                    v-if="state.loading"
                    class="w-full p-4 bg-white rounded-xl border border-slate-100 flex items-center gap-4 animate-pulse"
                  >
                    <div class="w-12 h-12 rounded-lg bg-slate-100"></div>
                    <div class="space-y-2 flex-1">
                      <div class="h-4 bg-slate-100 rounded w-1/3"></div>
                      <div class="h-3 bg-slate-50 rounded w-2/3"></div>
                    </div>
                  </div>
                  <div class="text-center text-slate-400 italic">
                    點擊 Refresh 或修改 API 路徑模擬數據抓取...
                  </div>
                </div>
                <div
                  v-if="activeUnit.id === 'intro'"
                  class="text-center"
                >
                  <IIcon
                    icon="mdi-library-outline"
                    size="64"
                    class="text-slate-200 mb-4"
                  />
                  <p class="text-sm font-medium text-slate-500">Composables 是邏輯的容器</p>
                </div>
                <!-- Shared State Preview -->
                <div
                  v-if="activeUnit.id === 'shared'"
                  class="text-center space-y-6"
                >
                  <div class="px-8 py-6 bg-white rounded-3xl shadow-sm border border-slate-100">
                    <div class="text-[10px] font-black text-slate-400 uppercase mb-2">
                      Global User
                    </div>
                    <div class="text-3xl font-black text-indigo-600">{{ state.sharedUser }}</div>
                  </div>
                  <p class="text-xs text-slate-400">這是全域共享的狀態，修改代碼中的 name 試試！</p>
                </div>
                <!-- Arguments Preview -->
                <div
                  v-if="activeUnit.id === 'args'"
                  class="text-center space-y-4"
                >
                  <div class="flex flex-col items-center">
                    <div
                      class="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-3"
                    >
                      <IIcon
                        icon="mdi-link-variant"
                        size="24"
                      />
                    </div>
                    <div class="px-4 py-2 bg-slate-100 rounded-lg font-mono text-xs text-slate-600">
                      Target: {{ state.activeEndpoint }}
                    </div>
                  </div>
                  <p class="text-xs text-slate-500">修改 endpoint ref 來動態切換請求目標</p>
                </div>
                <!-- Directory Preview -->
                <div
                  v-if="activeUnit.id === 'directory'"
                  class="w-full h-[300px] text-left space-y-6 overflow-y-auto custom-scrollbar pr-2"
                >
                  <div class="space-y-4">
                    <h4
                      class="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2"
                    >
                      Data Fetching & State
                    </h4>
                    <div class="flex flex-wrap gap-2">
                      <span
                        class="px-2.5 py-1.5 bg-blue-50 text-blue-600 rounded-md text-xs font-mono font-bold border border-blue-100 hover:bg-blue-100 transition-colors cursor-default"
                      >
                        useApi
                      </span>
                      <span
                        class="px-2.5 py-1.5 bg-blue-50 text-blue-600 rounded-md text-xs font-mono font-bold border border-blue-100 hover:bg-blue-100 transition-colors cursor-default"
                      >
                        useRepository
                      </span>
                      <span
                        class="px-2.5 py-1.5 bg-blue-50 text-blue-600 rounded-md text-xs font-mono font-bold border border-blue-100 hover:bg-blue-100 transition-colors cursor-default"
                      >
                        useTableData
                      </span>
                      <span
                        class="px-2.5 py-1.5 bg-blue-50 text-blue-600 rounded-md text-xs font-mono font-bold border border-blue-100 hover:bg-blue-100 transition-colors cursor-default"
                      >
                        usePagination
                      </span>
                    </div>
                  </div>
                  <div class="space-y-4">
                    <h4
                      class="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2"
                    >
                      UI & Interaction
                    </h4>
                    <div class="flex flex-wrap gap-2">
                      <span
                        class="px-2.5 py-1.5 bg-emerald-50 text-emerald-600 rounded-md text-xs font-mono font-bold border border-emerald-100 hover:bg-emerald-100 transition-colors cursor-default"
                      >
                        useModal
                      </span>
                      <span
                        class="px-2.5 py-1.5 bg-emerald-50 text-emerald-600 rounded-md text-xs font-mono font-bold border border-emerald-100 hover:bg-emerald-100 transition-colors cursor-default"
                      >
                        useNotify
                      </span>
                      <span
                        class="px-2.5 py-1.5 bg-emerald-50 text-emerald-600 rounded-md text-xs font-mono font-bold border border-emerald-100 hover:bg-emerald-100 transition-colors cursor-default"
                      >
                        useLoading
                      </span>
                      <span
                        class="px-2.5 py-1.5 bg-emerald-50 text-emerald-600 rounded-md text-xs font-mono font-bold border border-emerald-100 hover:bg-emerald-100 transition-colors cursor-default"
                      >
                        useBreadcrumbs
                      </span>
                      <span
                        class="px-2.5 py-1.5 bg-emerald-50 text-emerald-600 rounded-md text-xs font-mono font-bold border border-emerald-100 hover:bg-emerald-100 transition-colors cursor-default"
                      >
                        useCustomIcon
                      </span>
                    </div>
                  </div>
                  <div class="space-y-4">
                    <h4
                      class="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2"
                    >
                      System & Validation
                    </h4>
                    <div class="flex flex-wrap gap-2">
                      <span
                        class="px-2.5 py-1.5 bg-amber-50 text-amber-600 rounded-md text-xs font-mono font-bold border border-amber-100 hover:bg-amber-100 transition-colors cursor-default"
                      >
                        usePermission
                      </span>
                      <span
                        class="px-2.5 py-1.5 bg-amber-50 text-amber-600 rounded-md text-xs font-mono font-bold border border-amber-100 hover:bg-amber-100 transition-colors cursor-default"
                      >
                        useEncryption
                      </span>
                      <span
                        class="px-2.5 py-1.5 bg-amber-50 text-amber-600 rounded-md text-xs font-mono font-bold border border-amber-100 hover:bg-amber-100 transition-colors cursor-default"
                      >
                        useFeatureFlag
                      </span>
                      <span
                        class="px-2.5 py-1.5 bg-amber-50 text-amber-600 rounded-md text-xs font-mono font-bold border border-amber-100 hover:bg-amber-100 transition-colors cursor-default"
                      >
                        useValidation
                      </span>
                      <span
                        class="px-2.5 py-1.5 bg-amber-50 text-amber-600 rounded-md text-xs font-mono font-bold border border-amber-100 hover:bg-amber-100 transition-colors cursor-default"
                      >
                        useErrorHandler
                      </span>
                    </div>
                  </div>
                  <div class="space-y-4">
                    <h4
                      class="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2"
                    >
                      Utilities & Helpers
                    </h4>
                    <div class="flex flex-wrap gap-2">
                      <span
                        class="px-2.5 py-1.5 bg-purple-50 text-purple-600 rounded-md text-xs font-mono font-bold border border-purple-100 hover:bg-purple-100 transition-colors cursor-default"
                      >
                        useDateTime
                      </span>
                      <span
                        class="px-2.5 py-1.5 bg-purple-50 text-purple-600 rounded-md text-xs font-mono font-bold border border-purple-100 hover:bg-purple-100 transition-colors cursor-default"
                      >
                        useFormatter
                      </span>
                      <span
                        class="px-2.5 py-1.5 bg-purple-50 text-purple-600 rounded-md text-xs font-mono font-bold border border-purple-100 hover:bg-purple-100 transition-colors cursor-default"
                      >
                        useFileUpload
                      </span>
                      <span
                        class="px-2.5 py-1.5 bg-purple-50 text-purple-600 rounded-md text-xs font-mono font-bold border border-purple-100 hover:bg-purple-100 transition-colors cursor-default"
                      >
                        useFileDownload
                      </span>
                      <span
                        class="px-2.5 py-1.5 bg-purple-50 text-purple-600 rounded-md text-xs font-mono font-bold border border-purple-100 hover:bg-purple-100 transition-colors cursor-default"
                      >
                        useDebounce
                      </span>
                      <span
                        class="px-2.5 py-1.5 bg-purple-50 text-purple-600 rounded-md text-xs font-mono font-bold border border-purple-100 hover:bg-purple-100 transition-colors cursor-default"
                      >
                        useDeepClone
                      </span>
                      <span
                        class="px-2.5 py-1.5 bg-purple-50 text-purple-600 rounded-md text-xs font-mono font-bold border border-purple-100 hover:bg-purple-100 transition-colors cursor-default"
                      >
                        useStorage
                      </span>
                      <span
                        class="px-2.5 py-1.5 bg-purple-50 text-purple-600 rounded-md text-xs font-mono font-bold border border-purple-100 hover:bg-purple-100 transition-colors cursor-default"
                      >
                        useNetwork
                      </span>
                      <span
                        class="px-2.5 py-1.5 bg-purple-50 text-purple-600 rounded-md text-xs font-mono font-bold border border-purple-100 hover:bg-purple-100 transition-colors cursor-default"
                      >
                        useLanguage
                      </span>
                      <span
                        class="px-2.5 py-1.5 bg-purple-50 text-purple-600 rounded-md text-xs font-mono font-bold border border-purple-100 hover:bg-purple-100 transition-colors cursor-default"
                      >
                        useIdle
                      </span>
                    </div>
                  </div>
                </div>
                <!-- Console Logs -->
                <div
                  v-if="activeUnit.id !== 'directory'"
                  class="absolute bottom-4 left-4 right-4 h-24 overflow-y-auto bg-slate-900/5 rounded-xl p-3 font-mono text-[10px] text-slate-400"
                >
                  <div class="uppercase text-[8px] font-black mb-2 opacity-50">Event Log</div>
                  <div
                    v-for="(log, i) in state.logs"
                    :key="i"
                  >
                    {{ log }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Unit Challenge -->
          <div
            class="bg-white border border-slate-100 rounded-[2.5rem] p-8 lg:p-12 shadow-sm relative overflow-hidden"
          >
            <div
              class="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-32 -mt-32 pointer-events-none"
            ></div>
            <div class="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div class="space-y-6">
                <div
                  class="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"
                >
                  <IIcon
                    icon="mdi-checkbox-marked-circle-outline"
                    size="14"
                  />
                  單元挑戰
                </div>
                <ul class="space-y-4">
                  <li
                    v-for="(task, i) in activeUnit.tasks"
                    :key="i"
                    class="flex items-center gap-4 text-slate-600 font-medium text-sm"
                  >
                    <div
                      class="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0"
                    >
                      <IIcon
                        icon="mdi-check"
                        size="12"
                        class="text-slate-300"
                      />
                    </div>
                    {{ task }}
                  </li>
                </ul>
              </div>
              <div class="space-y-6 border-l border-slate-100 pl-12">
                <div
                  class="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"
                >
                  <IIcon
                    icon="mdi-lightbulb-on-outline"
                    size="14"
                  />
                  實務場景
                </div>
                <p class="text-sm text-slate-500 leading-relaxed italic">
                  「{{ activeUnit.useCase }}」
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
textarea::-webkit-scrollbar {
  width: 6px;
}
textarea::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
</style>
