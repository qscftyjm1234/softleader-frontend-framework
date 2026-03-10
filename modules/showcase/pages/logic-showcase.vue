<script setup lang="ts">
import { ref, computed } from 'vue'
import IBreadcrumbs from '~/components/uiInterface/layout/IBreadcrumbs.vue'
import IIcon from '~/components/uiInterface/IIcon.vue'
import { useBreadcrumbs } from '~/composables/useBreadcrumbs'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'

definePageMeta({
  title: '核心業務邏輯 (Logic Directory)',
  icon: 'mdi-folder-search-outline',
  layout: 'portal'
})

const { breadcrumbs: breadcrumbItems } = useBreadcrumbs()

// Data structure for the composables directory
const categories = ref([
  {
    id: 'data-fetching',
    name: '資料擷取與分頁 (Data & Pagination)',
    icon: 'mdi-database-search',
    color: 'blue',
    composables: [
      {
        name: 'useApi',
        shortDescription: '自動處理 Token 的 API 請求封裝',
        description:
          '全域核心 API 請求封裝（基於 $fetch）。自動處理 Token、錯誤攔截與全域 Loading，所有業務請求的底層基礎。',
        signature: 'const { data, loading, error, execute } = useApi(url, options)',
        usage: `import { useApi } from '~/composables/useApi'

// 1. 自動帶上 Token 並處理報錯
const { data, execute } = useApi('/api/v1/users', {
  method: 'GET',
  query: { role: 'admin' }
})

// 2. 結合 async/await
const submit = async () => {
  const res = await execute({
    method: 'POST',
    body: { name: 'John' }
  })
}`,
        output: `// data.value:
{
  "id": 1,
  "name": "John",
  "role": "admin"
}`
      },
      {
        name: 'useTableData',
        shortDescription: '資料表格分頁與排序',
        description:
          '專為資料表格 (Data Table) 設計的高階封裝。封裝了分頁、排序、請求 Loading 狀態，並與 IDataTable 完美結合。',
        signature:
          'const { dataList, total, loading, pagination, fetchData } = useTableData(fetchFunction)',
        usage: `import { useTableData } from '~/composables/useTableData'
import { userRepo } from '~/repositories'

const { dataList, total, loading, pagination, fetchData } = useTableData({
  fetchFunction: userRepo.getList,
  initialSort: { field: 'createdAt', order: 'desc' }
})

// IDataTable 綁定
// <IDataTable :data="dataList" :loading="loading" :pagination="pagination" />`,
        output: `// dataList.value:
[
  { "id": 1, "name": "Alice" },
  { "id": 2, "name": "Bob" }
]
// pagination.value:
{ "current": 1, "pageSize": 10, "total": 2 }`
      },
      {
        name: 'usePagination',
        shortDescription: '分頁狀態核心邏輯',
        description:
          '提供處理分頁狀態的核心邏輯（當前頁碼、每頁筆數、總頁數計算），通常與 API 抓取配合使用。',
        signature:
          'const { currentPage, pageSize, total, totalPages, handlePageChange } = usePagination()',
        usage: `import { usePagination } from '~/composables/usePagination'

const { currentPage, pageSize, total, totalPages } = usePagination({
  defaultPageSize: 20
})

watch([currentPage, pageSize], () => {
  fetchData()
})`,
        output: `// 當總筆數 (total) 為 50 時：
// totalPages.value: 3
// currentPage.value: 1
// pageSize.value: 20`
      },
      {
        name: 'useRepository',
        shortDescription: 'CRUD 資料層 Repository',
        description:
          '底層資料 Repository 建構工具。將 API endpoint 綁定為標準的 CRUD 方法，實現前端 Clean Architecture 的資料層隔離。',
        signature: 'const repo = useRepository<T>(endpoint)',
        usage: `import { useRepository } from '~/composables/useRepository'

// 宣告 User Repository，自動擁有 getList, getById, create, update, delete 方法
export const userRepo = useRepository<User>('/api/users')

// 元件中使用
const users = await userRepo.getList({ role: 'admin' })`,
        output: `// users:
[
  { "id": 1, "name": "Admin User", "role": "admin" }
]`
      }
    ]
  },
  {
    id: 'ui-interaction',
    name: '介面互動 (UI & Interaction)',
    icon: 'mdi-cursor-default-click',
    color: 'emerald',
    composables: [
      {
        name: 'useNotify',
        shortDescription: '全域 Toast 通知',
        description:
          '全域通知/吐司 (Toast/Snackbar) 的呼叫介面。支援成功、警告、錯誤等多種層級，無需在組件內埋放實體。',
        signature: 'const { show, success, error, warning } = useNotify()',
        usage: `import { useNotify } from '~/composables/useNotify'

const notify = useNotify()

const handleSave = async () => {
  try {
    await saveUser()
    notify.success('儲存成功！')
  } catch(e) {
    notify.error('儲存失敗，請稍後再試。')
  }
}`,
        output: `// 畫面右上角彈出綠色提示框：
// [ ✔ ] 儲存成功！

// 或紅色錯誤框：
// [ ✖ ] 儲存失敗，請稍後再試。`
      },
      {
        name: 'useModal',
        shortDescription: '全域對話框控制器',
        description:
          '全域彈出視窗 (Dialog/Modal) 控制器。支援傳遞組件進去動態渲染，徹底解決多個 Modal 在 Template 裡亂塞的問題。',
        signature: 'const { open, close, openedDialogs } = useModal()',
        usage: `import { useModal } from '~/composables/useModal'
import EditUserModal from './EditUserModal.vue'

const modal = useModal()

const handleEdit = (user) => {
  modal.open(EditUserModal, {
    title: '編輯會員',
    props: { userData: user },
    onConfirm: () => refreshList()
  })
}`,
        output: `// 畫面中心彈出對話框：
// ---------------------------------
// | 編輯會員                      |
// | ----------------------------- |
// | (EditUserModal 元件內容)      |
// |                               |
// |                   [取消][確認]|
// ---------------------------------`
      },
      {
        name: 'useLoading',
        shortDescription: '全域 Loading 遮罩',
        description:
          '控制全域或局部的遮罩載入動畫 (Loading Overlay)。通常在執行耗時操作（如匯出報表）時使用。',
        signature: 'const { isActive, start, finish } = useLoading()',
        usage: `import { useLoading } from '~/composables/useLoading'

const loading = useLoading()

const downloadReport = async () => {
  loading.start('報表產出中，請稍候...')
  await buildReport()
  loading.finish()
}`,
        output: `// 畫面被半透明遮罩覆蓋，並顯示：
// (旋轉動畫) 報表產出中，請稍候...`
      },
      {
        name: 'useBreadcrumbs',
        shortDescription: '自動產生麵包屑',
        description: '自動生成麵包屑導航路徑。根據路由 Meta 設定自動解析，也可手動動態推入新路徑。',
        signature: 'const { breadcrumbs, addBreadcrumb, setBreadcrumbs } = useBreadcrumbs()',
        usage: `import { useBreadcrumbs } from '~/composables/useBreadcrumbs'

const { breadcrumbs, addBreadcrumb } = useBreadcrumbs()

// 手動加上最後一層動態名稱
onMounted(() => {
  addBreadcrumb({ title: '報表詳情', to: '/reports/123' })
})`,
        output: `// breadcrumbs.value:
[
  { "title": "首頁", "to": "/" },
  { "title": "報表管理", "to": "/reports" },
  { "title": "報表詳情", "to": "/reports/123" }
]`
      },
      {
        name: 'useCustomIcon',
        shortDescription: '外部圖示 SSR 封裝',
        description:
          '封裝對外部圖示庫（如 Iconify, Material Icons）的存取，確保全站圖示渲染方式一致且支援 SSR。',
        signature: 'const { getIconUrl, renderIcon } = useCustomIcon()',
        usage: `import { useCustomIcon } from '~/composables/useCustomIcon'

const { getIconUrl } = useCustomIcon()
const arrowIcon = computed(() => getIconUrl('mdi:arrow-right'))`,
        output: `// arrowIcon.value:
// "https://api.iconify.design/mdi/arrow-right.svg"`
      }
    ]
  },
  {
    id: 'system-validation',
    name: '系統機制與驗證 (System & Validation)',
    icon: 'mdi-shield-check-outline',
    color: 'amber',
    composables: [
      {
        name: 'usePermission',
        shortDescription: '使用者權限與角色判斷',
        description:
          '核心權限判斷模組。根據目前登入者的角色 (Role) 或權限標籤 (Permissions) 決定按鈕/頁面是否顯示。',
        signature: 'const { hasRole, hasPermission } = usePermission()',
        usage: `import { usePermission } from '~/composables/usePermission'

const { hasPermission } = usePermission()

// 在 Template 控制按鈕:
// <IButton v-if="hasPermission('user:delete')" label="刪除" />`,
        output: `// 若使用者具備 'user:delete' 權限，按鈕顯示。
// 若不具備，按鈕自動隱藏。`
      },
      {
        name: 'useValidation',
        shortDescription: '企業級表單欄位驗證',
        description:
          '企業級表單驗證 (Form Validation) 邏輯。內建 email, phone, isRequired 等驗證規則，並提供 validateFields 批次驗證。',
        signature:
          'const { required, email, phone, minLength, validateFields, isAllValid } = useValidation()',
        usage: `import { useValidation } from '~/composables/useValidation'

const { required, email, phone, validateFields, isAllValid } = useValidation()

const formData = reactive({ name: '', mail: '' })
const rules = {
  name: [required],
  mail: [required, email]
}

const submit = () => {
  const results = validateFields(formData, rules)
  if (isAllValid(results)) {
     // 送出表單
  }
}`,
        output: `// results:
{
  "name": "此欄位為必填",
  "mail": "請輸入有效的電子郵件格式"
}
// isAllValid(results): false`
      },
      {
        name: 'useFeatureFlag',
        shortDescription: '灰度測試功能開關',
        description:
          '功能開關管理器。根據環境變數、使用者群組動態決定是否開啟某個尚未完工的實驗性 Feature (灰度測試用)。',
        signature: 'const { isEnabled, enable, disable } = useFeatureFlag(flagName)',
        usage: `import { useFeatureFlag } from '~/composables/useFeatureFlag'

const { isEnabled: showNewDashboard } = useFeatureFlag('beta-dashboard')

// <template>
// <NewDashboard v-if="showNewDashboard" />
// <OldDashboard v-else />`,
        output: `// showNewDashboard.value: true (若開關開啟)
// 渲染 <NewDashboard /> 元件`
      },
      {
        name: 'useEncryption',
        shortDescription: 'AES 加解密與 Base64',
        description:
          '前端加密工具箱。封裝了 AES 加解密、Base64 編碼，用於在 localStorage 儲存較敏感的設定值或產生一次性簽章。',
        signature: 'const { encrypt, decrypt, md5Hash } = useEncryption()',
        usage: `import { useEncryption } from '~/composables/useEncryption'

const { encrypt, decrypt } = useEncryption()

const secureData = encrypt(JSON.stringify({ userId: 123 }))
localStorage.setItem('__secure_token', secureData)`,
        output: `// secureData:
// "U2FsdGVkX19zomeR..."
//
// decrypt(secureData):
// '{"userId":123}'`
      },
      {
        name: 'useErrorHandler',
        shortDescription: 'API 全域錯誤攔截',
        description:
          '全域錯誤攔截與解析器。統一處理 Axios 錯誤結構，並回傳使用者友善的中文提示，避免頁面直接噴出 raw object。',
        signature: 'const { parseError, handleApiError } = useErrorHandler()',
        usage: `import { useErrorHandler } from '~/composables/useErrorHandler'

const { handleApiError } = useErrorHandler()

try {
  await repo.postData()
} catch(err) {
  // 自動判斷 401/403/500 並呼叫 notify
  handleApiError(err)
}`,
        output: `// 若發生 401 錯誤：
// 畫面彈出提示：「登入已過期，請重新登入」
// 並自動導向登入頁面`
      }
    ]
  },
  {
    id: 'utils-helpers',
    name: '通用輔助函數 (Utilities & Helpers)',
    icon: 'mdi-toolbox-outline',
    color: 'purple',
    composables: [
      {
        name: 'useDateTime',
        shortDescription: '日期時間格式化',
        description:
          '日期時間格式化與計算。封裝了 Day.js 或 date-fns 的常用操作，統一全站時間顯示格式 (YYYY-MM-DD)。',
        signature: 'const { format, isBefore, addDays } = useDateTime()',
        usage: `import { useDateTime } from '~/composables/useDateTime'

const { format } = useDateTime()

// 印出: "2024-01-01 14:30"
const displayStr = format('2024-01-01T14:30:00Z', 'YYYY-MM-DD HH:mm')`,
        output: `// displayStr:
// "2024-01-01 14:30"`
      },
      {
        name: 'useDeepClone',
        shortDescription: '安全深拷貝',
        description:
          '安全的深拷貝 (Deep Clone) 方法，避免 Vue 的 Proxy 追蹤互相污染（特別是在編輯表單、比對舊資料時）。',
        signature: 'const { clone, isEqual } = useDeepClone()',
        usage: `import { useDeepClone } from '~/composables/useDeepClone'

const { clone } = useDeepClone()

// 取消連動：修改 formData 不會影響 originalData
const formData = ref(clone(originalData.value))`,
        output: `// formData.value:
// 與 originalData.value 內容完全相同，
// 但是獨立的記憶體參考。`
      },
      {
        name: 'useStorage',
        shortDescription: '強化版 LocalStorage',
        description:
          '強化版的 LocalStorage / SessionStorage 操作。支援自動 JSON 解析/序列化，並加上環境前綴避免衝突。',
        signature: 'const { get, set, remove } = useStorage(type = "local")',
        usage: `import { useStorage } from '~/composables/useStorage'

const local = useStorage('local')

// 自動序列化存入
local.set('user_prefs', { theme: 'dark', lang: 'zh-TW' })

// 自動解析為 Object
const prefs = local.get('user_prefs')`,
        output: `// LocalStorage 實際儲存內容:
// key: "MYAPP_user_prefs"
// value: '{"theme":"dark","lang":"zh-TW"}'
//
// prefs:
// { theme: 'dark', lang: 'zh-TW' }`
      },
      {
        name: 'useDebounce',
        shortDescription: '防抖與節流函數',
        description:
          '防抖/節流函數封裝。避免使用者短時間內狂按按鈕，或是用於 Search Input 停止輸入 500ms 後才打 API。',
        signature: 'const { debounce, throttle } = useDebounce()',
        usage: `import { useDebounce } from '~/composables/useDebounce'

const { debounce } = useDebounce()

const searchApi = async (kb) => { /* 打 API */ }

// 打包後的 safeSearch 只有在停頓 500ms 後才執行
const safeSearch = debounce(searchApi, 500)

// <IInput @input="safeSearch($event)" />`,
        output: `// 使用者快速輸入 "A", "AB", "ABC"
// searchApi 只會在輸入結束後 500ms 執行一次，傳入 "ABC"`
      },
      {
        name: 'useFileDownload',
        shortDescription: 'Blob 檔案下載',
        description:
          '處理 Blob 二進位檔案下載的萬用黑客工具。自動建立 a 標籤點擊下載、釋放 URL 記憶體。',
        signature: 'const { downloadBlob, downloadFromUrl } = useFileDownload()',
        usage: `import { useFileDownload } from '~/composables/useFileDownload'

const { downloadBlob } = useFileDownload()

const handleExport = async () => {
  const blob = await api.getExcel()
  downloadBlob(blob, 'report_2024.xlsx')
}`,
        output: `// 瀏覽器觸發下載動作，檔名為 "report_2024.xlsx"`
      },
      {
        name: 'useFileUpload',
        shortDescription: '檔案上傳與驗證',
        description: '檔案上傳封裝。自動處理 FormData 封裝、檔案大小計算與格式驗證。',
        signature: 'const { validateFile, upload } = useFileUpload()',
        usage: `import { useFileUpload } from '~/composables/useFileUpload'

const { validateFile, upload } = useFileUpload()

const onFileChange = async (file) => {
  if(!validateFile(file, { maxSizeMB: 5, accept: ['image/png'] })) return

  const url = await upload(file, '/api/upload')
}`,
        output: `// 若檔案為 6MB：
// 驗證失敗，跳出警告：「檔案太大」

// 若上傳成功：
// url: "https://my-bucket.s3.aws.com/image.png"`
      },
      {
        name: 'useFormatter',
        shortDescription: '金錢與個資遮蔽',
        description:
          '全域文字格式化工具。包含金額千分位、遮蔽敏感個資 (姓名/身分證/信用卡)、手機格式化等。',
        signature: 'const { formatMoney, maskName, maskIdCard } = useFormatter()',
        usage: `import { useFormatter } from '~/composables/useFormatter'

const { formatMoney, maskIdCard } = useFormatter()

console.log(formatMoney(1234567))
console.log(maskIdCard('A123456789'))`,
        output: `// console.log 輸出:
// "1,234,567"
// "A12**6789"`
      }
    ]
  }
])

const activeCategoryIndex = ref(0)
const activeCategory = computed(() => categories.value[activeCategoryIndex.value])

// Scroll syncing logic
const scrollToItem = (id: string, index: number) => {
  activeCategoryIndex.value = index
  // Prevent scrolling to the category when a main item is clicked in the sidebar
  // const el = document.getElementById(id)
  // if (el) {
  //   el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  // }
}

const scrollToSubItem = (id: string, catIndex: number) => {
  activeCategoryIndex.value = catIndex
  const el = document.getElementById(id)
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 100 // Add offset for sticky header
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="logic-showcase-layout min-h-screen bg-white">
    <!-- Premium SaaS Header -->
    <header
      class="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-slate-100 px-8 py-4"
    >
      <div class="max-w-[1400px] mx-auto flex items-center justify-between">
        <div class="flex items-center gap-5">
          <NuxtLink
            to="/"
            class="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all hover:bg-indigo-50 group"
            title="回到首頁"
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
        <div class="hidden md:flex items-center gap-2">
          <span
            class="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-lg border border-indigo-100 shadow-sm"
          >
            v3.4.x API Reference
          </span>
        </div>
      </div>
    </header>

    <div class="max-w-[1400px] mx-auto lg:grid lg:grid-cols-12 min-h-[calc(100vh-73px)]">
      <!-- Left Sidebar: Categories Navigation -->
      <aside
        class="lg:col-span-3 border-r border-slate-50 p-6 space-y-2 bg-slate-50/30 overflow-y-auto sticky top-[73px]"
        style="height: calc(100vh - 73px)"
      >
        <div
          class="px-4 py-2 mb-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]"
        >
          功能分類
        </div>

        <div class="space-y-4">
          <div
            v-for="(cat, index) in categories"
            :key="cat.id"
            class="space-y-1"
          >
            <button
              class="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden"
              :class="
                activeCategoryIndex === index
                  ? 'bg-white shadow-[0_4px_20px_rgba(79,70,229,0.08)] text-indigo-600 ring-1 ring-indigo-50'
                  : 'text-slate-500 hover:bg-slate-100/50 hover:text-slate-900'
              "
              @click="scrollToItem(cat.id, index)"
            >
              <div
                class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-colors"
                :class="
                  activeCategoryIndex === index
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                "
              >
                <IIcon
                  :icon="cat.icon"
                  size="18"
                />
              </div>
              <div class="flex-1 text-left">
                <div class="text-sm font-black tracking-tight">{{ cat.name }}</div>
              </div>
              <IIcon
                v-if="activeCategoryIndex === index"
                :icon="activeCategoryIndex === index ? 'mdi-chevron-down' : 'mdi-chevron-right'"
                size="18"
              />
            </button>

            <!-- Subcategories (Composables) -->
            <div
              v-if="activeCategoryIndex === index"
              class="pl-12 pr-2 py-2 space-y-1 animate-fadeIn"
            >
              <button
                v-for="comp in cat.composables"
                :key="comp.name"
                class="w-full text-left py-2 px-3 rounded-xl hover:bg-indigo-50/50 transition-colors group/item"
                @click="scrollToSubItem(comp.name, index)"
              >
                <div
                  class="text-[14px] font-bold text-slate-700 group-hover/item:text-indigo-600 mb-0.5"
                >
                  {{ comp.name }}
                </div>
                <div class="text-[13px] text-slate-500 leading-tight pr-2">
                  {{ comp.shortDescription || comp.description }}
                </div>
              </button>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Content: Documentation Area -->
      <main class="lg:col-span-9 p-8 lg:p-12 overflow-y-auto">
        <div class="max-w-4xl mx-auto">
          <!-- Intro Section -->
          <div class="mb-16">
            <div
              class="inline-flex items-center justify-center p-3 sm:p-4 rounded-[1.5rem] sm:rounded-[2rem] bg-indigo-50 mb-6 shadow-inner border border-indigo-100/50"
            >
              <IIcon
                icon="mdi-book-open-page-variant-outline"
                class="text-indigo-600 text-3xl sm:text-5xl"
              />
            </div>
            <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-4">
              開發者的終極法寶：Composables
            </h1>
            <p class="text-lg text-slate-500 leading-relaxed">
              這是本專案的「核心業務邏輯說明書」。我們將常用、繁瑣、容易出錯的邏輯，封裝成了 30+
              種隨開即用的 Composables。
              <br />
              如果遇到新需求，請先來這裡找找看有沒有已經造好的輪子。**一鍵複製 (Ctrl+C)**
              範例程式碼，貼到你的組件裡直接使用！
            </p>
          </div>

          <!-- Documentation Blocks by Category -->
          <div class="space-y-24">
            <div
              v-for="cat in categories"
              :id="cat.id"
              :key="cat.id"
              class="scroll-mt-24 relative"
            >
              <!-- Category Header -->
              <div class="flex items-center gap-4 mb-10 pb-4 border-b border-slate-200">
                <div
                  :class="`w-12 h-12 rounded-xl bg-${cat.color}-50 text-${cat.color}-600 flex items-center justify-center border border-${cat.color}-100`"
                >
                  <IIcon
                    :icon="cat.icon"
                    size="24"
                  />
                </div>
                <h2 class="text-2xl font-black text-slate-800">{{ cat.name }}</h2>
              </div>

              <!-- Composables within Category -->
              <div class="space-y-16">
                <div
                  v-for="(comp, i) in cat.composables"
                  :id="comp.name"
                  :key="comp.name"
                  class="group scroll-mt-28"
                >
                  <!-- Composable Header -->
                  <div class="flex items-start justify-between mb-4">
                    <div>
                      <div class="flex items-center gap-3 mb-2">
                        <h3 class="text-xl font-mono font-bold text-slate-900">
                          {{ comp.name }}()
                        </h3>
                      </div>
                      <p class="text-sm text-slate-600 leading-relaxed max-w-2xl">
                        {{ comp.description }}
                      </p>
                    </div>
                  </div>

                  <!-- Signature Banner -->
                  <div
                    class="mb-6 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg opacity-80 group-hover:opacity-100 transition-opacity"
                  >
                    <span class="text-[10px] font-black uppercase text-slate-400 mr-3 select-none">
                      Signature
                    </span>
                    <code class="text-xs font-mono text-slate-700 select-all">
                      {{ comp.signature }}
                    </code>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Import & Usage Example -->
                    <div class="relative min-w-0">
                      <div
                        class="absolute -top-3 left-6 px-3 py-1 bg-indigo-600 text-white text-[10px] font-black uppercase rounded-full shadow-sm z-10 border border-indigo-500"
                      >
                        Import & Usage
                      </div>
                      <div class="h-full">
                        <ShowcaseCodeBlock
                          :code="comp.usage"
                          language="typescript"
                        />
                      </div>
                    </div>

                    <!-- Output Example -->
                    <div class="relative min-w-0">
                      <div
                        class="absolute -top-3 left-6 px-3 py-1 bg-emerald-500 text-white text-[10px] font-black uppercase rounded-full shadow-sm z-10 border border-emerald-400"
                      >
                        Output
                      </div>
                      <div class="h-full">
                        <ShowcaseCodeBlock
                          :code="comp.output"
                          language="json"
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    v-if="i < cat.composables.length - 1"
                    class="my-12 border-b border-slate-100/60 w-3/4"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
html {
  scroll-behavior: smooth;
}

code {
  font-family:
    ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
    monospace;
}
</style>
