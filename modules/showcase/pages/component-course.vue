<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import IIcon from '~/components/uiInterface/IIcon.vue'
import IButton from '~/components/uiInterface/IButton.vue'
import IBreadcrumbs from '~/components/uiInterface/layout/IBreadcrumbs.vue'
import { useBreadcrumbs } from '~/composables/useBreadcrumbs'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'

const { breadcrumbs: breadcrumbItems } = useBreadcrumbs()

// Architecture Examples Data
const archSnippets = {
  example1: {
    page: `\x3ctemplate\x3e\n  \x3cIInput \n    :error="!isValidEmail(email)"\n    v-model="email" \n  />\n\x3c/template\x3e`,
    business:
      'export const isValidEmail = (val: string) => {\n  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(val)\n}',
    interface:
      '\x3ctemplate\x3e\n  \x3cinput :class="{ \'border-red-500\': error }" />\n\x3c/template\x3e'
  },
  example2: {
    page: `\x3ctemplate\x3e\n  \x3cIChip :color="userColor"\x3e\n    {{ user.level }} \n  \x3c/IChip\x3e\n\x3c/template\x3e`,
    business:
      "const userColor = computed(() => {\n  return user.level === 'VIP' ? 'gold' : 'slate'\n})",
    interface:
      '\x3ctemplate\x3e\n  \x3cdiv :style="{ background: color }"\x3e\n    \x3cslot /\x3e\n  \x3c/div\x3e\n\x3c/template\x3e'
  },
  example3: {
    page: `\x3ctemplate\x3e\n  \x3cITable :data="products" />\n\x3c/template\x3e\n\n\x3cscript setup\x3e\n  const { products } = useProducts()\n\x3c/script\x3e`,
    business:
      "export const useProducts = () => {\n  const { data } = await api.get('/products')\n  return { products: data }\n}",
    interface:
      '\x3ctemplate\x3e\n  \x3ctr v-for="row in data"\x3e\n    \x3ctd\x3e{{ row.name }}\x3c/td\x3e\n  \x3c/tr\x3e\n\x3c/template\x3e'
  }
}
definePageMeta({
  title: '組件架構實戰課',
  layout: 'portal'
})

// Units Definition
const units = ref([
  {
    id: 'arch',
    title: '單元 00：分層架構 (Architecture)',
    icon: 'mdi-layers-outline',
    description:
      '企業級前端的核心在於「分層」。這裡舉三個具體例子：\n    1. **Email 輸入**：Business 層檢查格式正確性，Interface 層只管畫出輸入框。\n    2. **會員狀態**：Business 層判斷「黑名單」要顯示紅色，Interface 層只負責畫出紅色標籤。\n    3. **搜尋列表**：Business 層處理多條件篩選與分頁，Interface 層只負責顯示表格與按鈕。',
    tasks: ['理解三層職責', '觀察這三者如何像積木一樣組合', '嘗試修改描述中的範例邏輯'],
    initialCode: `\x3ctemplate\x3e\n  \n  <!-- 1. Page 層：傳入基本資料 -->\n  \n  \x3cProductItem :id="101" />\n  \n\x3c/template\x3e\n\n\n<!-- 2. Business 層 (內部封裝) -->\n\n<!-- 根據 ID 抓資料、判斷是否有庫存 -->\n\n\n<!-- 3. Interface 層 (最底層) -->\n\n<!-- 畫出漂亮的卡片與按鈕 -->\n`,
    code: `\x3ctemplate\x3e\n  \n  <!-- 1. Page 層：傳入基本資料 -->\n  \n  \x3cProductItem :id="101" />\n  \n\x3c/template\x3e\n\n\n<!-- 2. Business 層 (內部封裝) -->\n\n<!-- 根據 ID 抓資料、判斷是否有庫存 -->\n\n\n<!-- 3. Interface 層 (最底層) -->\n\n<!-- 畫出漂亮的卡片與按鈕 -->\n`,
    interactive: 'Arch',
    useCase:
      '適用於中大型專案，確保 UI 變更（如更換 UI 庫）時，核心的驗證邏輯、會員狀態判斷、搜尋邏輯完全不需更動。'
  },
  {
    id: 'props',
    title: '單元 01：屬性傳進去 (Props)',
    icon: 'mdi-arrow-down-bold-box-outline',
    description: 'Props 是「單向數據流」。父組件傳遞資料給子組件，子組件只能讀取不能直接修改。',
    tasks: ['修改左側代碼中的 label 字串', '嘗試改變 color 屬性 (primary / error)'],
    initialCode: `\x3cscript setup\x3e\n  const myLabel = ref('按我一下')\n\x3c/script\x3e\n\n\x3ctemplate\x3e\n  <!-- 子組件 IButton 接收 label 與 color -->\n  \x3cIButton :label="myLabel" color="primary" />\n\x3c/template\x3e`,
    code: `\x3cscript setup\x3e\n  const myLabel = ref('按我一下')\n\x3c/script\x3e\n\n\x3ctemplate\x3e\n  <!-- 子組件 IButton 接收 label 與 color -->\n  \x3cIButton :label="myLabel" color="primary" />\n\x3c/template\x3e`,
    interactive: 'Props',
    useCase: '基礎 UI 元件最常用的傳資方式，如按鈕文字、列表內容、使用者名稱顯示等。'
  },
  {
    id: 'emits',
    title: '單元 02：事件喊上來 (Emits)',
    icon: 'mdi-arrow-up-bold-box-outline',
    description: '子組件發出訊號告知父組件。我們使用 defineEmits 來定義事件清單。',
    tasks: ['點擊右側按鈕觸發事件', '觀察訊息紀錄區的變化'],
    initialCode: `\x3cscript setup\x3e\n  const log = ref([])\n  const onTrigger = () => {\n    log.value.push('子組件發出了訊號！')\n  }\n\x3c/script\x3e\n\n\x3ctemplate\x3e\n  \x3cIButton label="點我觸發 Emit" @click="onTrigger" />\n\x3c/template\x3e`,
    code: `\x3cscript setup\x3e\n  const log = ref([])\n  const onTrigger = () => {\n    log.value.push('子組件發出了訊號！')\n  }\n\x3c/script\x3e\n\n\x3ctemplate\x3e\n  \x3cIButton label="點我觸發 Emit" @click="onTrigger" />\n\x3c/template\x3e`,
    interactive: 'Emits',
    useCase: '子組件內部的動作（如按鈕點擊、表單提交、刪除列表項）需要通知父組件處理時使用。'
  },
  {
    id: 'slots',
    title: '單元 03：內容塞進去 (Slots)',
    icon: 'mdi-view-quilt-outline',
    description: 'Slot 是組件的「預留空間」。讓父組件能自定義子組件內部的 HTML 結構。',
    tasks: ['嘗試在 <template #header> 中修改標題', '在預設插槽中加入自定義圖示'],
    initialCode: `\x3ctemplate\x3e\n  \x3cICard\x3e\n    \x3ctemplate #header\x3e\n      \x3ch4\x3e自定義卡片標題\x3c/h4\x3e\n    \x3c/template\x3e\n\n    \x3cp\x3e我是被塞進去的內容文字\x3c/p\x3e\n    \x3cIIcon icon="mdi-heart" color="red" />\n  \x3c/ICard\x3e\n\x3c/template\x3e`,
    code: `\x3ctemplate\x3e\n  \x3cICard\x3e\n    \x3ctemplate #header\x3e\n      \x3ch4\x3e自定義卡片標題\x3c/h4\x3e\n    \x3c/template\x3e\n\n    \x3cp\x3e我是被塞進去的內容文字\x3c/p\x3e\n    \x3cIIcon icon="mdi-heart" color="red" />\n  \x3c/ICard\x3e\n\x3c/template\x3e`,
    interactive: 'Slots',
    useCase: '打造通用容器組件（如：彈窗 Modal、卡片 Card、佈局 Layout），內容由叫用者決定的場景。'
  },
  {
    id: 'vmodel',
    title: '單元 04：雙向連動 (v-model)',
    icon: 'mdi-sync',
    description: 'v-model 是 Props + Emits 的縮寫。它讓父子組件的數據保持同步更新。',
    tasks: ['在輸入框打字', '觀察下方的變數值同步變化'],
    initialCode: `\x3cscript setup\x3e\n  const username = ref('Vue 專家')\n\x3c/script\x3e\n\n\x3ctemplate\x3e\n  <!-- v-model 會自動同步 username 的值 -->\n  \x3cIInput v-model="username" label="姓名" />\n  \x3cp\x3e目前值：{{ username }}\x3c/p\x3e\n\x3c/template\x3e`,
    code: `\x3cscript setup\x3e\n  const username = ref('Vue 專家')\n\x3c/script\x3e\n\n\x3ctemplate\x3e\n  <!-- v-model 會自動同步 username 的值 -->\n  \x3cIInput v-model="username" label="姓名" />\n  \x3cp\x3e目前值：{{ username }}\x3c/p\x3e\n\x3c/template\x3e`,
    interactive: 'VModel',
    useCase: '各種表單輸入項（Input, Select, Switch）的狀態同步。'
  },
  {
    id: 'provide',
    title: '單元 05：跨層傳遞 (Provide / Inject)',
    icon: 'mdi-transit-connection-variant',
    description: '當層級太深 (孫組件) 時，我們可以使用 Provide/Inject 讓數據繞過中間層直接傳遞。',
    tasks: ['修改 Provide 的數值', '驗證深層組件是否有接到'],
    initialCode: `\x3cscript setup\x3e\n  // 父組件 Provide\n  provide('themeColor', 'blue')\n\x3c/script\x3e\n\n<!-- 中間經過了 5 層組件... -->\n\n\x3cscript setup\x3e\n  // 孫組件 Inject\n  const color = inject('themeColor')\n\x3c/script\x3e`,
    code: `\x3cscript setup\x3e\n  // 父組件 Provide\n  provide('themeColor', 'blue')\n\x3c/script\x3e\n\n<!-- 中間經過了 5 層組件... -->\n\n\x3cscript setup\x3e\n  // 孫組件 Inject\n  const color = inject('themeColor')\n\x3c/script\x3e`,
    interactive: 'Provide',
    useCase: '全域主題設定、跨頁面共享的大型狀態、或是多層嵌套的樹狀結構資料傳遞。'
  },
  {
    id: 'dynamic',
    title: '單元 06：動態切換 (Dynamic Components)',
    icon: 'mdi-animation-outline',
    description: '使用 <component :is="..."> 根據狀態切換展示不同的組件。',
    tasks: ['點擊切換按鈕', '觀察展示區組件的動態更換'],
    initialCode: `\x3cscript setup\x3e\n  const view = ref('List') // 或 'Grid'\n\x3c/script\x3e\n\n\x3ctemplate\x3e\n  \x3ccomponent :is="view === 'List' ? ListView : GridView" />\n\x3c/template\x3e`,
    code: `\x3cscript setup\x3e\n  const view = ref('List') // 或 'Grid'\n\x3c/script\x3e\n\n\x3ctemplate\x3e\n  \x3ccomponent :is="view === 'List' ? ListView : GridView" />\n\x3c/template\x3e`,
    interactive: 'Dynamic',
    useCase: '看板模式與清單模式切換、多步驟表單流程、選單導覽內容切換等。'
  },
  {
    id: 'practical',
    title: '單元 07：綜合實戰 (Practical Challenge)',
    icon: 'mdi-star-face',
    description: '最後一關！結合 Props, Emits 與 Slots，打造一個完整的「個人檔案卡片」。',
    tasks: ['修改名字、頭像路徑', '點擊「關注」按鈕觀察 Emit 反饋'],
    initialCode: `\x3ctemplate\x3e\n  \x3cProfileCard\n    name="王小明"\n    @follow="onFollow"\n  \x3e\n    \x3ctemplate #bio\x3e\n      資深前端工程師，熱愛 Vue 與設計。\n    \x3c/template\x3e\n  \x3c/ProfileCard\x3e\n\x3c/template\x3e`,
    code: `\x3ctemplate\x3e\n  \x3cProfileCard\n    name="王小明"\n    @follow="onFollow"\n  \x3e\n    \x3ctemplate #bio\x3e\n      資深前端工程師，熱愛 Vue 與設計。\n    \x3c/template\x3e\n  \x3c/ProfileCard\x3e\n\x3c/template\x3e`,
    interactive: 'Practical',
    useCase: '實際開發中最常見的元件組合場景。'
  }
])

const activeUnitIndex = ref(0)
const activeUnit = computed(() => units.value[activeUnitIndex.value])

// Interactive Simulator State
const initialState = {
  label: '按我一下',
  color: 'primary',
  logs: [] as string[],
  username: 'Vue 專家',
  cardTitle: '自定義卡片標題',
  cardContent: '我是被塞進去的內容文字',
  themeColor: 'blue',
  activeView: 'List',
  profileName: '王小明',
  isFollowing: false
}
const state = ref({ ...initialState })

// Reactive Simulator Logic
watch(
  () => units.value[activeUnitIndex.value].code,
  (newCode) => {
    const unitId = units.value[activeUnitIndex.value].id
    const cleanCode = newCode
      .replace(/<script[^>]*>|<\/[s]cript>|\x3ctemplate\x3e|<\/[t]emplate>/g, '')
      .trim()

    if (unitId === 'props') {
      const labelMatch = cleanCode.match(/ref\(\s*['"](.*?)['"]\s*\)/)
      const colorMatch = cleanCode.match(/color=['"](.*?)['"]/)
      if (labelMatch) state.value.label = labelMatch[1]
      if (colorMatch) state.value.color = colorMatch[1]
    } else if (unitId === 'vmodel') {
      const match = cleanCode.match(/ref\(\s*['"](.*?)['"]\s*\)/)
      if (match) state.value.username = match[1]
    } else if (unitId === 'slots') {
      const hMatch = cleanCode.match(/<template #header>\s*<h4>(.*?)<\/h4>/)
      const pMatch = cleanCode.match(/<p>(.*?)<\/p>/)
      if (hMatch) state.value.cardTitle = hMatch[1]
      if (pMatch) state.value.cardContent = pMatch[1]
    } else if (unitId === 'provide') {
      const colorMatch = cleanCode.match(/provide\(\s*['"]themeColor['"]\s*,\s*['"](.*?)['"]\s*\)/)
      if (colorMatch) state.value.themeColor = colorMatch[1]
    } else if (unitId === 'dynamic') {
      const viewMatch = cleanCode.match(/const\s+view\s*=\s*ref\(\s*['"](.*?)['"]\s*\)/)
      if (viewMatch) state.value.activeView = viewMatch[1]
    } else if (unitId === 'practical') {
      const nameMatch = cleanCode.match(/name=['"](.*?)['"]/)
      if (nameMatch) state.value.profileName = nameMatch[1]
    }
  },
  { immediate: true }
)

const resetState = () => {
  state.value = { ...initialState }
  units.value[activeUnitIndex.value].code = units.value[activeUnitIndex.value].initialCode
}

const addLog = (msg: string) => {
  state.value.logs.push(`[${new Date().toLocaleTimeString()}] ${msg}`)
}

const scrollContainer = ref<HTMLElement | null>(null)
watch(activeUnitIndex, () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollTo({ top: 0, behavior: 'smooth' })
  }
})
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
          <div class="flex flex-col items-end">
            <span class="text-[10px] font-black text-indigo-500 uppercase">單元進度</span>
            <div class="text-sm font-mono font-bold text-slate-600">
              {{ activeUnitIndex + 1 }} / {{ units.length }}
            </div>
          </div>
          <div class="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              class="h-full bg-indigo-500 transition-all duration-500"
              :style="{ width: `${((activeUnitIndex + 1) / units.length) * 100}%` }"
            ></div>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-73px)]">
      <!-- Sidebar Nav -->
      <aside class="lg:col-span-3 border-r border-slate-50 p-6 space-y-2 bg-slate-50/30">
        <div
          class="px-4 py-2 mb-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]"
        >
          課程單元 (Course Index)
        </div>
        <button
          v-for="(unit, index) in units"
          :key="unit.id"
          class="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group"
          :class="
            activeUnitIndex === index
              ? 'bg-white shadow-sm text-indigo-600 ring-1 ring-indigo-50'
              : 'text-slate-500 hover:bg-slate-100/50 hover:text-slate-900'
          "
          @click="activeUnitIndex = index"
        >
          <div
            class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-colors"
            :class="
              activeUnitIndex === index ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'
            "
          >
            {{ index + 1 }}
          </div>
          <div class="flex-1 text-left">
            <div class="text-sm font-black tracking-tight">{{ unit.title }}</div>
          </div>
          <IIcon
            v-if="activeUnitIndex === index"
            icon="mdi-chevron-right"
            size="18"
          />
        </button>
      </aside>

      <!-- Main Content -->
      <main
        ref="scrollContainer"
        class="lg:col-span-9 p-8 lg:p-12 overflow-y-auto"
      >
        <div class="max-w-5xl mx-auto space-y-10">
          <!-- Intro Section -->
          <div class="flex items-start gap-6">
            <div
              class="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 shadow-sm shrink-0"
            >
              <IIcon
                :icon="activeUnit.icon"
                size="28"
              />
            </div>
            <div>
              <h2 class="text-3xl font-black text-slate-900 tracking-tight leading-tight mb-2">
                {{ activeUnit.title }}
              </h2>
              <p class="text-slate-500 leading-relaxed max-w-2xl">{{ activeUnit.description }}</p>
            </div>
          </div>

          <!-- Playground -->
          <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <!-- Code Editor (Simulated) -->
            <div class="space-y-4">
              <div class="flex items-center justify-between px-2">
                <div
                  class="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest"
                >
                  <IIcon
                    icon="mdi-code-braces"
                    size="14"
                  />
                  互動編輯器
                </div>
                <button
                  class="text-[10px] font-black text-slate-400 hover:text-indigo-600 flex items-center gap-1 uppercase tracking-widest transition-colors"
                  @click="resetState"
                >
                  <IIcon
                    icon="mdi-refresh"
                    size="14"
                  />
                  重置代碼
                </button>
              </div>
              <div
                class="bg-slate-900 rounded-3xl p-6 font-mono text-sm leading-relaxed shadow-xl border border-slate-800 ring-1 ring-white/5 relative group"
              >
                <div
                  class="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none"
                ></div>
                <textarea
                  v-model="units[activeUnitIndex].code"
                  class="w-full bg-transparent text-slate-300 resize-none outline-none caret-indigo-400 min-h-[350px]"
                  spellcheck="false"
                ></textarea>
              </div>
            </div>

            <!-- Live Preview -->
            <div class="space-y-4">
              <div
                class="flex items-center gap-2 px-2 text-[10px] font-black text-indigo-500 uppercase tracking-widest"
              >
                <IIcon
                  icon="mdi-play-circle-outline"
                  size="14"
                />
                Playground 預覽展示
              </div>
              <div
                class="bg-slate-50 rounded-3xl p-8 border border-slate-100 min-h-[300px] flex flex-col items-center justify-center relative overflow-hidden"
              >
                <!-- Unit Specific Interactive Component -->
                <div
                  v-if="activeUnit.id === 'arch'"
                  class="w-full space-y-8"
                >
                  <!-- Flow Diagram -->
                  <div class="grid grid-cols-1 gap-4 w-full max-w-xs mx-auto">
                    <div
                      class="p-4 bg-white border border-slate-200 rounded-xl shadow-sm text-center"
                    >
                      <div class="text-[10px] text-slate-400 font-bold uppercase mb-1">
                        Page (頁面)
                      </div>
                      <div class="font-bold text-slate-800">負責佈局與配置</div>
                    </div>
                    <IIcon
                      icon="mdi-arrow-down"
                      class="mx-auto text-slate-300"
                    />
                    <div
                      class="p-4 bg-white border border-blue-500/30 rounded-xl shadow-sm text-center ring-2 ring-blue-50"
                    >
                      <div class="text-[10px] text-blue-500 font-bold uppercase mb-1">
                        Business (業務邏輯)
                      </div>
                      <div class="font-bold text-slate-800">驗證、資料處理、邏輯</div>
                    </div>
                    <IIcon
                      icon="mdi-arrow-down"
                      class="mx-auto text-slate-300"
                    />
                    <div
                      class="p-4 bg-white border border-amber-500/30 rounded-xl shadow-sm text-center ring-2 ring-amber-50"
                    >
                      <div class="text-[10px] text-amber-500 font-bold uppercase mb-1">
                        Interface (外部介面)
                      </div>
                      <div class="font-bold text-slate-800">純粹的 UI 展示</div>
                    </div>
                  </div>
                </div>

                <div
                  v-else-if="activeUnit.id === 'props'"
                  class="space-y-4"
                >
                  <IButton
                    :label="state.label"
                    :color="state.color"
                  />
                </div>

                <div
                  v-else-if="activeUnit.id === 'emits'"
                  class="w-full space-y-4"
                >
                  <IButton
                    label="點我觸發 Emit"
                    color="primary"
                    @click="addLog('子組件按鈕已點擊')"
                  />
                  <div class="mt-4 bg-white border border-slate-200 rounded-2xl p-4 w-full">
                    <div class="text-[10px] font-black text-slate-400 uppercase mb-2">
                      事件紀錄區 (Parent Logs)
                    </div>
                    <div
                      v-if="state.logs.length === 0"
                      class="text-xs text-slate-300 italic"
                    >
                      尚未收到任何事件...
                    </div>
                    <div
                      v-for="(log, i) in state.logs.slice().reverse()"
                      :key="i"
                      class="text-[11px] text-indigo-600 font-mono py-1 border-b border-slate-50 last:border-0"
                    >
                      {{ log }}
                    </div>
                  </div>
                </div>

                <div
                  v-else-if="activeUnit.id === 'slots'"
                  class="w-full max-w-sm"
                >
                  <div
                    class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
                  >
                    <div class="p-4 bg-slate-50 border-b border-slate-100 font-bold text-slate-800">
                      {{ state.cardTitle }}
                    </div>
                    <div class="p-6 flex flex-col items-center gap-3">
                      <p class="text-slate-600">{{ state.cardContent }}</p>
                      <IIcon
                        icon="mdi-heart"
                        class="text-rose-500"
                        size="32"
                      />
                    </div>
                  </div>
                </div>

                <div
                  v-else-if="activeUnit.id === 'vmodel'"
                  class="w-full max-w-xs space-y-6"
                >
                  <div class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <label
                      class="block text-[10px] font-black text-slate-400 uppercase mb-2 text-center"
                    >
                      雙向綁定輸入框
                    </label>
                    <input
                      v-model="state.username"
                      class="w-full px-4 py-2 rounded-xl border border-slate-100 focus:border-indigo-300 outline-none transition-colors text-center font-bold text-slate-700"
                    />
                  </div>
                  <div class="text-center font-mono text-sm text-indigo-600 animate-pulse">
                    目前變數值：{{ state.username }}
                  </div>
                </div>

                <div
                  v-else-if="activeUnit.id === 'provide'"
                  class="flex flex-col items-center gap-6"
                >
                  <div
                    class="p-4 bg-indigo-50 border border-indigo-200 rounded-xl text-indigo-700 text-xs font-bold"
                  >
                    Provider 層級 (藍色)
                  </div>
                  <IIcon
                    icon="mdi-arrow-down-dashed"
                    class="text-slate-300"
                  />
                  <div
                    class="p-6 bg-white border-4 rounded-full shadow-lg h-24 w-24 flex items-center justify-center font-black"
                    :style="{
                      borderColor: state.themeColor === 'blue' ? '#3B82F6' : '#EF4444',
                      color: state.themeColor === 'blue' ? '#3B82F6' : '#EF4444'
                    }"
                  >
                    Inject!!
                  </div>
                </div>

                <div
                  v-else-if="activeUnit.id === 'dynamic'"
                  class="w-full flex flex-col items-center gap-6"
                >
                  <div class="flex gap-2 p-1 bg-slate-200 rounded-xl">
                    <button
                      class="px-4 py-2 rounded-lg text-xs font-bold transition-all"
                      :class="
                        state.activeView === 'List'
                          ? 'bg-white text-indigo-600 shadow-sm'
                          : 'text-slate-500'
                      "
                      @click="state.activeView = 'List'"
                    >
                      List View
                    </button>
                    <button
                      class="px-4 py-2 rounded-lg text-xs font-bold transition-all"
                      :class="
                        state.activeView === 'Grid'
                          ? 'bg-white text-indigo-600 shadow-sm'
                          : 'text-slate-500'
                      "
                      @click="state.activeView = 'Grid'"
                    >
                      Grid View
                    </button>
                  </div>
                  <div class="w-full transition-all duration-500">
                    <div
                      v-if="state.activeView === 'List'"
                      class="space-y-2"
                    >
                      <div
                        v-for="i in 3"
                        :key="i"
                        class="h-10 bg-white border border-slate-200 rounded-lg w-full animate-pulse"
                      ></div>
                    </div>
                    <div
                      v-else
                      class="grid grid-cols-2 gap-2"
                    >
                      <div
                        v-for="i in 4"
                        :key="i"
                        class="h-20 bg-white border border-slate-200 rounded-lg w-full animate-pulse"
                      ></div>
                    </div>
                  </div>
                </div>

                <div
                  v-else-if="activeUnit.id === 'practical'"
                  class="w-full max-w-sm"
                >
                  <div
                    class="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-8 text-center space-y-4"
                  >
                    <div
                      class="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full mx-auto flex items-center justify-center"
                    >
                      <IIcon
                        icon="mdi-account"
                        size="48"
                      />
                    </div>
                    <div>
                      <h3 class="text-xl font-black text-slate-800">{{ state.profileName }}</h3>
                      <p class="text-sm text-slate-500 mt-1 italic">
                        資深前端工程師，熱愛 Vue 與設計。
                      </p>
                    </div>
                    <button
                      class="w-full py-3 rounded-2xl font-bold transition-all"
                      :class="
                        state.isFollowing
                          ? 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                          : 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                      "
                      @click="state.isFollowing = !state.isFollowing"
                    >
                      {{ state.isFollowing ? '正在關注' : '關注我' }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Concrete Examples Grid (Architecture Unit Only) -->
          <!-- Architecture Unit Deep Dive (Unified UI) -->
          <div
            v-if="activeUnit.id === 'arch'"
            class="space-y-8 animate-fadeIn"
          >
            <!-- Part 1: Concrete Examples -->
            <div class="bg-white border border-slate-100 rounded-[2.5rem] p-8 lg:p-12 shadow-sm">
              <div class="flex items-center gap-3 mb-10">
                <div
                  class="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center"
                >
                  <IIcon
                    icon="mdi-rocket-launch-outline"
                    size="24"
                  />
                </div>
                <div>
                  <h3 class="text-xl font-black text-slate-800 tracking-tight">實戰開發例子</h3>
                  <p class="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                    Full Stack Architecture flow
                  </p>
                </div>
              </div>

              <!-- Complete Three-Tier Flow Examples -->
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <!-- Example 1: Email -->
                <div class="space-y-8">
                  <div class="flex items-center gap-4 pb-4 border-b-2 border-slate-50">
                    <div
                      class="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-xl font-black shadow-lg shadow-blue-100 italic"
                    >
                      01
                    </div>
                    <div>
                      <h4 class="font-black text-slate-800 text-lg">Email 註冊驗證</h4>
                      <p class="text-xs text-slate-400 font-medium">完整三層協作流程</p>
                    </div>
                  </div>

                  <div class="space-y-4">
                    <ShowcaseCodeBlock
                      filename="register.vue (Page)"
                      :code="archSnippets.example1.page"
                    />
                    <ShowcaseCodeBlock
                      filename="auth.ts (Business)"
                      :code="archSnippets.example1.business"
                    />
                    <ShowcaseCodeBlock
                      filename="IInput.vue (Interface)"
                      :code="archSnippets.example1.interface"
                    />
                  </div>
                </div>

                <!-- Example 2: Member -->
                <div class="space-y-8">
                  <div class="flex items-center gap-4 pb-4 border-b-2 border-slate-50">
                    <div
                      class="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-xl font-black shadow-lg shadow-indigo-100 italic"
                    >
                      02
                    </div>
                    <div>
                      <h4 class="font-black text-slate-800 text-lg">會員等級標籤</h4>
                      <p class="text-xs text-slate-400 font-medium">邏輯抽離與介面復用</p>
                    </div>
                  </div>

                  <div class="space-y-4">
                    <ShowcaseCodeBlock
                      filename="profile.vue (Page)"
                      :code="archSnippets.example2.page"
                    />
                    <ShowcaseCodeBlock
                      filename="user.ts (Business)"
                      :code="archSnippets.example2.business"
                    />
                    <ShowcaseCodeBlock
                      filename="IChip.vue (Interface)"
                      :code="archSnippets.example2.interface"
                    />
                  </div>
                </div>

                <!-- Example 3: Search -->
                <div class="space-y-8">
                  <div class="flex items-center gap-4 pb-4 border-b-2 border-slate-50">
                    <div
                      class="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-xl font-black shadow-lg shadow-emerald-100 italic"
                    >
                      03
                    </div>
                    <div>
                      <h4 class="font-black text-slate-800 text-lg">商品搜尋列表</h4>
                      <p class="text-xs text-slate-400 font-medium">數據驅動的 UI 渲染</p>
                    </div>
                  </div>

                  <div class="space-y-4">
                    <ShowcaseCodeBlock
                      filename="search.vue (Page)"
                      :code="archSnippets.example3.page"
                    />
                    <ShowcaseCodeBlock
                      filename="api.ts (Business)"
                      :code="archSnippets.example3.business"
                    />
                    <ShowcaseCodeBlock
                      filename="ITable.vue (Interface)"
                      :code="archSnippets.example3.interface"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Part 2: Design Advantages -->
            <div
              class="bg-white border border-slate-100 rounded-[2.5rem] p-8 lg:p-12 shadow-sm relative overflow-hidden group"
            >
              <div
                class="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full -mr-32 -mt-32 pointer-events-none group-hover:scale-110 transition-transform duration-700"
              ></div>

              <div class="relative z-10 flex flex-col lg:flex-row gap-12 items-start">
                <div class="lg:w-1/3 space-y-4">
                  <div
                    class="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-200"
                  >
                    <IIcon
                      icon="mdi-shield-check"
                      size="24"
                    />
                  </div>
                  <h3 class="text-2xl font-black text-slate-800 tracking-tight">
                    為什麼要這樣設計？
                  </h3>
                  <p class="text-slate-500 leading-relaxed font-medium">
                    分層架構雖然初次開發會多花一點點時間，但在企業級專案中，它帶來的長期收益是巨大的。
                  </p>
                </div>

                <div class="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div class="flex gap-4">
                    <div class="text-indigo-600 font-black text-xl opacity-10">01</div>
                    <div class="space-y-1">
                      <h4 class="font-black text-slate-800 text-base">高度組件復用性</h4>
                      <p class="text-sm text-slate-500 leading-relaxed">
                        Interface 不帶業務邏輯，可以在不同專案間自由遷移。
                      </p>
                    </div>
                  </div>
                  <div class="flex gap-4">
                    <div class="text-indigo-600 font-black text-xl opacity-10">02</div>
                    <div class="space-y-1">
                      <h4 class="font-black text-slate-800 text-base">輕鬆更換 UI 框架</h4>
                      <p class="text-sm text-slate-500 leading-relaxed">
                        更換 UI 系統時，只需更動 Interface，Business 邏輯穩定不動。
                      </p>
                    </div>
                  </div>
                  <div class="flex gap-4">
                    <div class="text-indigo-600 font-black text-xl opacity-10">03</div>
                    <div class="space-y-1">
                      <h4 class="font-black text-slate-800 text-base">提升測試穩定度</h4>
                      <p class="text-sm text-slate-500 leading-relaxed">
                        Business 邏輯抽離後，編寫純 JS 單元測試變得極其簡單。
                      </p>
                    </div>
                  </div>
                  <div class="flex gap-4">
                    <div class="text-indigo-600 font-black text-xl opacity-10">04</div>
                    <div class="space-y-1">
                      <h4 class="font-black text-slate-800 text-base">團隊協作效率</h4>
                      <p class="text-sm text-slate-500 leading-relaxed">
                        UI 與 邏輯可以由不同成員同步並行開發，互不干擾。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Unit Task Checklist -->
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
                  單元挑戰 (Action Items)
                </div>
                <ul class="space-y-4">
                  <li
                    v-for="(task, i) in activeUnit.tasks"
                    :key="i"
                    class="flex items-center gap-4 text-slate-600 font-medium"
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
              <div class="space-y-6 border-l border-slate-100 pl-12 hidden md:block">
                <div
                  class="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"
                >
                  <IIcon
                    icon="mdi-lightbulb-on-outline"
                    size="14"
                  />
                  實務場景 (Use Case)
                </div>
                <p class="text-sm text-slate-500 leading-relaxed italic">
                  「{{ activeUnit.useCase }}」
                </p>
                <div class="pt-4">
                  <div
                    class="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-lg text-[10px] font-black text-slate-400 uppercase tracking-widest"
                  >
                    最佳實踐標竿
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Units Navigation -->
          <div class="flex items-center justify-between pt-10 border-t border-slate-100">
            <button
              v-if="activeUnitIndex > 0"
              class="flex items-center gap-2 px-6 py-3 rounded-2xl border border-slate-200 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all font-bold text-sm shadow-sm"
              @click="activeUnitIndex--"
            >
              <IIcon
                icon="mdi-arrow-left"
                size="18"
              />
              上一個單元
            </button>
            <div v-else></div>

            <button
              v-if="activeUnitIndex < units.length - 1"
              class="flex items-center gap-2 px-8 py-3 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700 transition-all font-bold text-sm shadow-lg shadow-indigo-100"
              @click="activeUnitIndex++"
            >
              下一個單元
              <IIcon
                icon="mdi-arrow-right"
                size="18"
              />
            </button>
            <NuxtLink
              v-else
              to="/showcase"
              class="flex items-center gap-2 px-8 py-3 rounded-2xl bg-emerald-600 text-white hover:bg-emerald-700 transition-all font-bold text-sm shadow-lg shadow-emerald-100"
            >
              完成課程
              <IIcon
                icon="mdi-trophy-outline"
                size="18"
              />
            </NuxtLink>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.sidebar-scroll::-webkit-scrollbar {
  width: 4px;
}
.sidebar-scroll::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
</style>
