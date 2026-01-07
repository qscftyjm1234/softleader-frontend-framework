<script setup lang="ts">
/**
 * API Demo - API 管理與 Repository 模式展示
 */
import { ref, watch } from 'vue'
import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'

// ----------------------------------------------------------------
// Shared State & Helpers
// ----------------------------------------------------------------
const apiLogs = ref<{ time: string; method: string; path: string; status: string }[]>([])
const activeCode = ref(`// 這是互動式教學區塊
// 請試著點擊左側的「下一頁」或「編輯」按鈕
// 這裡將會顯示該動作對應的程式碼寫法`)

const addLog = (method: string, path: string, status: string = '200 OK') => {
  const time = new Date().toLocaleTimeString('zh-TW', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
  const statusText = status === '200 OK' ? '200 成功' : status
  apiLogs.value.unshift({ time, method, path, status: statusText })
  if (apiLogs.value.length > 10) apiLogs.value.pop()
}

const getMethodColor = (method: string) => {
  switch (method) {
    case 'GET':
      return 'text-sky-400'
    case 'POST':
      return 'text-emerald-400'
    case 'PUT':
      return 'text-amber-400'
    case 'DELETE':
      return 'text-rose-400'
    default:
      return 'text-slate-400'
  }
}

// ----------------------------------------------------------------
// Scenario 1: CRUD List
// ----------------------------------------------------------------
const { user } = useRepository()
const page = ref(1)
const search = ref('')
const itemsPerPage = 5

// 響應式 API 呼叫 (CRUD List)
const { data, pending, error, refresh } = await user.getUsers({
  page,
  q: search,
  itemsPerPage
})

watch(pending, (isPending) => {
  if (!isPending && !error.value && currentTab.value === 'crud') {
    addLog('GET', `/users/list?page=${page.value}&q=${search.value}`)
    activeCode.value = `// 1. 自動觸發資料更新 (Auto-fetch)
await user.getUsers({
  page: ${page.value},
  q: '${search.value}',
  itemsPerPage: 5
})`
  }
})

const handleEdit = async (item: any) => {
  activeCode.value = `// 準備更新資料
const newData = { ...item, name: 'New Name' }

// 2. 呼叫 Repository 更新
await user.updateUser(${item.id}, newData)

// 3. 刷新列表
refresh()`

  const newName = prompt('更新使用者名稱:', item.name)
  if (!newName) return

  addLog('PUT', `/users/${item.id}`, '處理中...')

  try {
    await user.updateUser(item.id, { ...item, name: newName })
    addLog('PUT', `/users/${item.id}`, '200 成功')
    refresh()
  } catch (e) {
    addLog('PUT', `/users/${item.id}`, '錯誤')
  }
}

const handleDelete = async (id: number) => {
  activeCode.value = `// 1. 呼叫 Repository 刪除
await user.deleteUser(${id})

// 2. 刷新列表
refresh()`

  if (!confirm('確定要刪除此使用者嗎？')) return
  addLog('DELETE', `/users/${id}`, '處理中...')
  try {
    await user.deleteUser(id)
    addLog('DELETE', `/users/${id}`, '200 成功')
    refresh()
  } catch (e) {
    addLog('DELETE', `/users/${id}`, '錯誤')
  }
}

// ----------------------------------------------------------------
// Scenario 2: Dashboard (Parallel Requests)
// ----------------------------------------------------------------
const dashStats = ref<any>(null)
const dashLoading = ref(false)

const loadDashboard = async () => {
  dashLoading.value = true
  addLog('GET', '/api/stats (平行請求 x3)', '處理中...')

  activeCode.value = `// 平行請求 (Parallel Requests)
// 使用 Promise.all 同時發出多個請求，提升效能
const [sales, users, visits] = await Promise.all([
  api.get('/stats?type=sales'),
  api.get('/stats?type=users'),
  api.get('/stats?type=visits')
])`

  try {
    // 模擬三個平行請求
    const results = await Promise.all([
      $fetch('/api/stats?type=sales'),
      $fetch('/api/stats?type=users'),
      $fetch('/api/stats?type=visits')
    ])
    dashStats.value = results.map((r: any) => r.data)
    addLog('GET', '/api/stats', '200 成功 (x3)')
  } catch (e) {
    addLog('GET', '/api/stats', '錯誤')
  } finally {
    dashLoading.value = false
  }
}

// ----------------------------------------------------------------
// Scenario 3: Error Handling
// ----------------------------------------------------------------
const errorLoading = ref(false)

const triggerError = async (code: number) => {
  errorLoading.value = true
  addLog('GET', `/api/error?code=${code}`, '處理中...')

  activeCode.value = `// 錯誤處理 (Error Handling)
// 系統會自動攔截 4xx/5xx錯誤，並顯示 Snackbar
// 除非您設定 autoError: false
try {
  await api.get('/error', { params: { code: ${code} } })
} catch (err) {
  // 您可以在這裡進行額外的錯誤處理
  console.error(err)
}`

  try {
    await useApi('/error', { params: { code } })
    addLog('GET', `/api/error?code=${code}`, '200 成功') // Should not happen
  } catch (e: any) {
    addLog('GET', `/api/error?code=${code}`, `${code} 錯誤`)
  } finally {
    errorLoading.value = false
  }
}

// ----------------------------------------------------------------
// Tabs Logic
// ----------------------------------------------------------------
const currentTab = ref('crud')
const tabs = [
  { id: 'crud', label: 'CRUD 列表' },
  { id: 'dashboard', label: 'Dashboard (平行請求)' },
  { id: 'error', label: '錯誤測試' }
]

watch(currentTab, (val) => {
  if (val === 'crud') {
    activeCode.value = `// 切換至 CRUD 範例
// 這裡展示標準的 List, Pagination, Search 操作`
  } else if (val === 'dashboard') {
    activeCode.value = `// 切換至 Dashboard 範例
// 點擊「載入數據」測試 Promise.all 平行請求`
  } else {
    activeCode.value = `// 切換至 錯誤測試
// 點擊不同按鈕測試 API 錯誤攔截機制`
  }
})

definePageMeta({
  title: 'API 展示',
  icon: 'mdi-api',
  layout: 'portal'
})
</script>

<template>
  <ShowcasePage
    title="API 管理系統"
    description="整合 Nuxt useFetch 與 Repository Pattern，提供企業級的 API 統一管理方案。"
  >
    <!-- 0. 前置準備 -->
    <ShowcaseSection title="0. 前置準備">
      <div class="component-grid">
        <ShowcaseCard
          title="核心依賴"
          description="useApi 依賴以下系統模組以提供完整體驗"
        >
          <ul class="benefit-list">
            <li>
              <strong>useLoading:</strong>
              <span class="text-slate-400 text-xs block mt-1">
                整合全域 Loading (計數器模式)，自動控制讀取條顯示
              </span>
            </li>
            <li>
              <strong>useNotify:</strong>
              <span class="text-slate-400 text-xs block mt-1">
                整合 Snackbar，處理 autoSuccess/autoError
              </span>
            </li>
            <li>
              <strong>Nuxt Server Routes:</strong>
              <span class="text-slate-400 text-xs block mt-1">
                開發環境使用 server/api 作為 Mock Data
              </span>
            </li>
          </ul>
        </ShowcaseCard>

        <ShowcaseCard
          title="環境變數"
          description="請於 nuxt.config.ts 設定 runtimeConfig"
        >
          <div class="h-full">
            <ShowcaseCodeBlock
              code="export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      api: {
        baseUrl: process.env.VITE_API_BASE_URL,
        timeout: 30000,
        retry: 0,
        globalLoading: true
      }
    }
  }
})"
              label="nuxt.config.ts"
              language="typescript"
              :lines="false"
              class="h-full"
            />
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- 1. 回傳值詳解 -->
    <ShowcaseSection title="1. 回傳值詳解">
      <ShowcaseCard
        title="與 Nuxt useFetch 完全一致"
        description="useApi 保留了所有 useFetch 的回傳屬性，並針對 data 做了自動拆包處理。"
        full-width
      >
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse border border-slate-700">
            <thead>
              <tr>
                <th
                  class="p-4 border border-slate-600 bg-slate-800/50 text-slate-400 font-medium text-sm text-nowrap"
                >
                  屬性 (Property)
                </th>
                <th
                  class="p-4 border border-slate-600 bg-slate-800/50 text-slate-400 font-medium text-sm text-nowrap"
                >
                  型別 (Type)
                </th>
                <th
                  class="p-4 border border-slate-600 bg-slate-800/50 text-slate-400 font-medium text-sm w-full"
                >
                  說明 (Description)
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-700/50">
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-sky-300 font-medium">
                  data
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">T | null</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  API 回傳資料。已自動拆除
                  <code class="text-sky-300">ApiResponse</code>
                  外殼，直接回傳 Generic T。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-sky-300 font-medium">
                  pending
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Boolean</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  請求是否正在進行中 (True/False)。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-sky-300 font-medium">
                  error
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Error | null</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  請求失敗時的錯誤物件，包含 statusCode 與 message。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                  refresh()
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  重新發送請求的函式 (常用於列表刷新)。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-sky-300 font-medium">
                  status
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">String</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  目前的狀態字串：'idle' | 'pending' | 'success' | 'error'。
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <template #footer>
          <ShowcaseCodeBlock
            code="const { 
  data,     // T | null
  pending,  // boolean
  error,    // Error | null
  refresh,  // () => Promise<void>
  status    // 'idle' | 'pending' | ...
} = await user.getUsers()"
            label="解構賦值範例"
          />
        </template>
      </ShowcaseCard>
    </ShowcaseSection>

    <!-- 2. 請求參數詳解 -->
    <ShowcaseSection title="2. 請求參數詳解">
      <ShowcaseCard
        title="擴充參數"
        description="除原本 useFetch 的參數外，額外支援的企業級設定。"
      >
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse border border-slate-700">
            <thead>
              <tr>
                <th
                  class="p-4 border border-slate-600 bg-slate-800/50 text-slate-400 font-medium text-sm text-nowrap"
                >
                  參數名 (Parameter)
                </th>
                <th
                  class="p-4 border border-slate-600 bg-slate-800/50 text-slate-400 font-medium text-sm text-nowrap"
                >
                  預設值 (Default)
                </th>
                <th
                  class="p-4 border border-slate-600 bg-slate-800/50 text-slate-400 font-medium text-sm w-full"
                >
                  說明 (Description)
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-700/50">
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-amber-300 font-medium">
                  globalLoading
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">true</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  是否觸發全域 Loading 狀態 (設為 false 可個別關閉)
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-amber-300 font-medium">
                  autoError
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">true</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  是否自動顯示錯誤 Snackbar (4xx/5xx)
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-amber-300 font-medium">
                  autoSuccess
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">false</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  成功後自動顯示提示 (傳入字串即為訊息內容)
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-amber-300 font-medium">
                  loadingRef
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">-</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  綁定按鈕的
                  <code class="text-sky-300">Ref&lt;boolean&gt;</code>
                  ，自動切換 Loading
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </ShowcaseCard>

      <ShowcaseCard
        title="標準參數"
        description="繼承自 Nuxt useFetch 的常用標準參數。"
      >
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse border border-slate-700">
            <thead>
              <tr>
                <th
                  class="p-4 border border-slate-600 bg-slate-800/50 text-slate-400 font-medium text-sm text-nowrap"
                >
                  屬性 (Property)
                </th>
                <th
                  class="p-4 border border-slate-600 bg-slate-800/50 text-slate-400 font-medium text-sm text-nowrap"
                >
                  型別 (Type)
                </th>
                <th
                  class="p-4 border border-slate-600 bg-slate-800/50 text-slate-400 font-medium text-sm w-full"
                >
                  說明 (Description)
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-700/50">
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-sky-300 font-medium">
                  data
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">T | null</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  API 回傳資料。已自動拆除
                  <code class="text-sky-300">ApiResponse</code>
                  外殼，直接回傳 Generic T。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-sky-300 font-medium">
                  pending
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Boolean</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  請求是否正在進行中 (True/False)。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-sky-300 font-medium">
                  error
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Error | null</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  請求失敗時的錯誤物件，包含 statusCode 與 message。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                  refresh()
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  重新發送請求的函式 (常用於列表刷新)。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-sky-300 font-medium">
                  status
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">String</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  目前的狀態字串：'idle' | 'pending' | 'success' | 'error'。
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <template #footer>
          <ShowcaseCodeBlock
            code="// 綜合範例：靜默請求 (Background Sync)
useApi('/users/sync', {
  method: 'POST',
  body: { timestamp: 12345 },
  // Custom: 關閉全域 Loading
  globalLoading: false,
  // Custom: 關閉錯誤提示
  autoError: false
})"
            label="靜默請求範例"
          />
        </template>
      </ShowcaseCard>

      <ShowcaseCard
        title="資料轉換範例"
        description="進階：使用 transform 轉換資料結構，或用 pick 減少資料量。"
        full-width
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ShowcaseCodeBlock
            code="// 1. 欄位篩選 (Pick)
// 只取 id 與 name，減少前端記憶體與傳輸量
const { data } = useApi('/users/list', {
  pick: ['id', 'name']
})"
            label="範例 1：欄位篩選"
            language="typescript"
          />

          <ShowcaseCodeBlock
            code="// 2. 資料轉換 (Transform)
// 將後端陣列轉換為前端好用的 Map 或格式
const { data } = useApi('/config/map', {
  transform: (data) => {
    // 這裡的 data 已經是自動拆包後的結果
    return data.map(item => ({
       value: item.id,
       label: item.title.toUpperCase()
    }))
  }
})"
            label="範例 2：資料轉換"
            language="typescript"
          />
        </div>
      </ShowcaseCard>
    </ShowcaseSection>

    <!-- 3. 核心工具 -->
    <ShowcaseSection title="3. 核心工具">
      <div class="component-grid">
        <ShowcaseCard
          title="為什麼使用 useClient?"
          description="useClient 是 Repository 模式的核心，用於鎖定 API 路徑前綴並提供更簡潔的 CRUD 方法。"
        >
          <ul class="benefit-list">
            <li>
              <strong>自動前綴：</strong>
              <span class="text-slate-400 text-xs block mt-1">
                宣告一次
                <code>useClient('/users')</code>
                ，後續呼叫自動帶入
                <code>/users</code>
              </span>
            </li>
            <li>
              <strong>簡化方法：</strong>
              <span class="text-slate-400 text-xs block mt-1">
                直接提供
                <code>.get()</code>
                ,
                <code>.post()</code>
                等方法，不必再寫
                <code>{ method: 'POST' }</code>
              </span>
            </li>
            <li>
              <strong>類型安全：</strong>
              <span class="text-slate-400 text-xs block mt-1">
                完整支援 TypeScript Generic，定義回傳型別更直覺
              </span>
            </li>
          </ul>
        </ShowcaseCard>

        <ShowcaseCard
          title="代碼比較"
          description="使用 useClient 前後的差異比較"
        >
          <div class="flex flex-col gap-4">
            <div>
              <div class="text-xs font-bold text-rose-400 mb-1">原始寫法</div>
              <ShowcaseCodeBlock
                code="const { data } = useApi('/users/create', {
  method: 'POST', 
  body: payload 
})"
                label="標準 useApi"
                language="typescript"
                :lines="false"
              />
            </div>
            <div>
              <div class="text-xs font-bold text-emerald-400 mb-1">useClient 寫法</div>
              <ShowcaseCodeBlock
                code="// 1. 建立 Client
const api = useClient('/users')

// 2. 簡潔呼叫
const { data } = api.post('/create', payload)"
                label="使用 useClient"
                language="typescript"
                :lines="false"
              />
            </div>
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- 4. 定義位置與原則 (Structure) -->
    <ShowcaseSection title="4. 定義位置與原則">
      <div class="component-grid">
        <!-- Architecture Card -->
        <ShowcaseCard
          title="架構設計"
          description="Repository 模式的職責邊界"
        >
          <div class="demo-area">
            <h4 class="text-sm font-bold text-slate-200 mb-2">Repository 層</h4>
            <ul class="responsibility-list">
              <li>定義後端 API 介面與回傳型別</li>
              <li>封裝 HTTP 方法與路徑細節</li>
              <li>提供 Component 乾淨的呼叫介面</li>
            </ul>

            <div class="principles-list">
              <span class="principles-title">
                <span class="text-amber-400">✦</span>
                開發原則：
              </span>
              <ul>
                <li>
                  <span class="icon">✦</span>
                  <span>集中管理：Component 禁止出現 API URL</span>
                </li>
                <li>
                  <span class="icon">✦</span>
                  <span>單一職責：Component 只負責呼叫與接收</span>
                </li>
                <li>
                  <span class="icon">✦</span>
                  <span>模組化：使用 useClient 鎖定前綴</span>
                </li>
              </ul>
            </div>
          </div>
        </ShowcaseCard>

        <!-- Implementation Card -->
        <ShowcaseCard
          title="實作範例"
          description="repositories/modules/user.ts"
        >
          <div class="demo-area h-full">
            <ShowcaseCodeBlock
              code="import { useClient } from '#imports'

// 1. 定義 Client (鎖定 /users 前綴)
const api = useClient('/users')

export const repository = {
  // 2. 定義方法 (只專注於業務邏輯)
  getUsers(params) {
    return api.get('/list', { params })
  },
  
  updateUser(id, data) {
    // 3. 封裝細節 (Method, URL)
    return api.put(`/${id}`, data)
  }
}"
              label="repositories/modules/user.ts"
              :lines="false"
              class="h-full"
            />
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- 5. 實戰演練 -->
    <ShowcaseSection
      title="5. 實戰演練"
      icon="🎮"
    >
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column: Interactive Scenario -->
        <div class="lg:col-span-2">
          <ShowcaseCard
            title="情境模擬"
            description="請選擇下方頁籤切換不同的 API 測試情境。"
            full-width
          >
            <!-- Tabs -->
            <div class="flex gap-2 mb-6 border-b border-slate-700/50 pb-4">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                :class="
                  currentTab === tab.id
                    ? 'bg-sky-500/20 text-sky-400 ring-1 ring-sky-500/50 shadow-sm shadow-sky-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                "
                @click="currentTab = tab.id"
              >
                {{ tab.label }}
              </button>
            </div>

            <!-- TAB 1: CRUD -->
            <div
              v-if="currentTab === 'crud'"
              class="flex flex-col gap-6"
            >
              <!-- Controls -->
              <div class="flex flex-wrap items-end justify-between gap-4">
                <div class="w-full max-w-xs relative bg-slate-900 rounded-lg">
                  <input
                    v-model="search"
                    type="text"
                    placeholder="搜尋使用者..."
                    class="w-full bg-transparent border border-slate-700 rounded-lg py-2 pl-4 pr-4 text-sm text-slate-300 focus:outline-none focus:border-sky-500 transition-colors"
                  />
                </div>

                <div class="flex items-center gap-2">
                  <button
                    :disabled="page <= 1"
                    class="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-400 text-xs hover:bg-slate-700 disabled:opacity-50 transition-colors"
                    @click="page--"
                  >
                    上一頁
                  </button>
                  <div
                    class="px-3 py-1.5 bg-slate-900 rounded-lg border border-slate-700 text-slate-300 text-xs font-mono"
                  >
                    頁次 {{ page }}
                  </div>
                  <button
                    class="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-400 text-xs hover:bg-slate-700 transition-colors"
                    @click="page++"
                  >
                    下一頁
                  </button>
                </div>
              </div>

              <!-- Table -->
              <div
                class="w-full overflow-hidden rounded-lg border border-slate-800 bg-slate-900 relative min-h-[290px]"
              >
                <div
                  v-if="pending"
                  class="absolute inset-0 bg-slate-900/80 z-10 flex items-center justify-center backdrop-blur-sm"
                >
                  <div class="flex items-center gap-3 text-sky-400">
                    <span class="text-sm font-medium">載入中...</span>
                  </div>
                </div>
                <div
                  v-else-if="error"
                  class="p-8 text-center text-rose-400"
                >
                  <p class="text-sm">資料載入失敗：{{ error.message }}</p>
                </div>

                <table
                  v-else
                  class="w-full text-left text-sm border-collapse"
                >
                  <thead>
                    <tr class="bg-slate-950 border-b border-slate-800">
                      <th class="py-3 px-4 font-semibold text-slate-400 text-xs uppercase w-16">
                        ID
                      </th>
                      <th class="py-3 px-4 font-semibold text-slate-400 text-xs uppercase">
                        使用者
                      </th>
                      <th class="py-3 px-4 font-semibold text-slate-400 text-xs uppercase">角色</th>
                      <th
                        class="py-3 px-4 font-semibold text-slate-400 text-xs uppercase text-right"
                      >
                        操作
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-800">
                    <tr
                      v-for="item in (data as any)?.items"
                      :key="item.id"
                      class="group hover:bg-slate-800/50 transition-colors"
                    >
                      <td class="py-3 px-4 font-mono text-sky-500">#{{ item.id }}</td>
                      <td class="py-3 px-4">
                        <div>
                          <div class="text-slate-200 font-medium">{{ item.name }}</div>
                          <div class="text-xs text-slate-500 font-mono">{{ item.email }}</div>
                        </div>
                      </td>
                      <td class="py-3 px-4">
                        <span
                          class="px-2 py-0.5 rounded text-xs border bg-slate-800 border-slate-700 text-slate-300"
                        >
                          {{ item.role }}
                        </span>
                      </td>
                      <td class="py-3 px-4 text-right">
                        <div class="flex justify-end gap-2">
                          <button
                            class="text-xs font-medium text-sky-400 hover:text-white hover:bg-sky-500/20 px-2 py-1 rounded transition-colors"
                            @click="handleEdit(item)"
                          >
                            編輯
                          </button>
                          <button
                            class="text-xs font-medium text-rose-400 hover:text-white hover:bg-rose-500/20 px-2 py-1 rounded transition-colors"
                            @click="handleDelete(item.id)"
                          >
                            刪除
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- TAB 2: Dashboard -->
            <div
              v-else-if="currentTab === 'dashboard'"
              class="flex flex-col gap-6"
            >
              <div
                class="p-4 bg-slate-900 rounded-lg border border-slate-800 relative min-h-[200px] flex flex-col justify-center items-center"
              >
                <button
                  class="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg flex items-center gap-2 mb-6 shadow-lg shadow-sky-900/50 transition-all"
                  :disabled="dashLoading"
                  @click="loadDashboard"
                >
                  <span>{{ dashLoading ? '載入中...' : '重新載入數據' }}</span>
                </button>

                <div
                  v-if="dashLoading"
                  class="text-sky-400 text-sm animate-pulse"
                >
                  正在平行請求 3 個 API...
                </div>

                <div
                  v-else-if="dashStats"
                  class="grid grid-cols-1 md:grid-cols-3 gap-4 w-full px-4"
                >
                  <div
                    v-for="(val, idx) in dashStats"
                    :key="idx"
                    class="p-4 bg-slate-950 rounded border border-slate-800 text-center"
                  >
                    <div class="text-xs text-slate-400 uppercase tracking-wider mb-1">
                      指標 {{ idx + 1 }}
                    </div>
                    <div class="text-2xl font-mono text-emerald-400">
                      {{ val.sales || val.visits || val.activeUsers }}
                    </div>
                  </div>
                </div>
                <div
                  v-else
                  class="text-slate-500 text-sm"
                >
                  點擊按鈕測試 Promise.all
                </div>
              </div>
            </div>

            <!-- TAB 3: Error Handling -->
            <div
              v-else-if="currentTab === 'error'"
              class="flex flex-col gap-6"
            >
              <div
                class="p-6 bg-slate-900 rounded-lg border border-slate-800 min-h-[200px] flex flex-col items-center justify-center gap-6"
              >
                <div class="text-center">
                  <h3 class="text-slate-200 font-medium mb-2">錯誤攔截測試</h3>
                  <p class="text-slate-400 text-sm max-w-md">
                    點擊下方按鈕觸發不同的 HTTP 錯誤。系統會自動攔截並顯示 Snackbar 錯誤提示。
                  </p>
                </div>

                <div class="flex flex-wrap gap-3 justify-center">
                  <button
                    class="px-4 py-2 rounded border border-amber-500/50 text-amber-500 hover:bg-amber-500/10 transition-colors"
                    @click="triggerError(400)"
                  >
                    400 Bad Request
                  </button>
                  <button
                    class="px-4 py-2 rounded border border-rose-500/50 text-rose-500 hover:bg-rose-500/10 transition-colors"
                    @click="triggerError(401)"
                  >
                    401 Unauthorized
                  </button>
                  <button
                    class="px-4 py-2 rounded border border-slate-500/50 text-slate-400 hover:bg-slate-500/10 transition-colors"
                    @click="triggerError(404)"
                  >
                    404 Not Found
                  </button>
                  <button
                    class="px-4 py-2 rounded border border-rose-600/50 text-rose-600 hover:bg-rose-600/10 transition-colors"
                    @click="triggerError(500)"
                  >
                    500 Server Error
                  </button>
                </div>
              </div>
            </div>

            <template #footer>
              <ShowcaseCodeBlock
                :code="activeCode"
                label="對應程式碼"
                language="typescript"
              />
            </template>
          </ShowcaseCard>
        </div>

        <!-- Right Column: Inspector -->
        <div class="flex flex-col gap-6">
          <!-- 1. Activity Log -->
          <ShowcaseCard
            title="請求監控"
            description="顯示左側操作實際發出的 API 請求 (GET/POST)，證明資料真的有同步。"
          >
            <div
              class="bg-slate-950 rounded-lg border border-slate-800 p-0 overflow-hidden h-48 flex flex-col"
            >
              <div
                class="bg-slate-900 border-b border-slate-800 px-3 py-2 text-xs font-bold text-slate-400 flex justify-between"
              >
                <span>控制台</span>
                <span
                  class="text-slate-600 cursor-pointer hover:text-slate-300"
                  @click="apiLogs = []"
                >
                  清除
                </span>
              </div>
              <div class="overflow-y-auto p-3 flex-1 font-mono text-xs space-y-2">
                <div
                  v-if="apiLogs.length === 0"
                  class="text-slate-500 text-center mt-10 text-sm"
                >
                  <p>尚無請求紀錄</p>
                  <p class="text-xs mt-1">請操作左側列表以觸發 API</p>
                </div>
                <div
                  v-for="(log, i) in apiLogs"
                  :key="i"
                  class="flex items-start gap-2 animate-pulse-once"
                >
                  <span class="text-slate-500 shrink-0">[{{ log.time }}]</span>
                  <span
                    :class="getMethodColor(log.method)"
                    class="font-bold shrink-0 w-12"
                  >
                    {{ log.method }}
                  </span>
                  <div class="flex-1 break-all">
                    <span class="text-slate-300">{{ log.path }}</span>
                    <span class="ml-2 text-slate-500">{{ log.status }}</span>
                  </div>
                </div>
              </div>
            </div>
          </ShowcaseCard>

          <!-- 2. Code Preview -->
          <ShowcaseCard
            title="實作對照"
            description="即時顯示「剛才的操作」是對應到哪一段 Repository 程式碼。"
          >
            <div class="h-full">
              <ShowcaseCodeBlock
                :code="activeCode"
                label="操作邏輯實作"
                :lines="false"
                class="h-full"
              />
            </div>
          </ShowcaseCard>
        </div>
      </div>
    </ShowcaseSection>
  </ShowcasePage>
</template>

<style scoped>
.benefit-list {
  padding-left: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  margin: 0;
}

.benefit-list li {
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.05) 0%, rgba(99, 102, 241, 0.05) 100%);
  padding: 1.25rem 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(56, 189, 248, 0.15);
  color: #e2e8f0;
  font-size: 0.95rem;
  line-height: 1.7;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.benefit-list li:hover {
  border-color: rgba(56, 189, 248, 0.3);
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.08) 0%, rgba(99, 102, 241, 0.08) 100%);
}

.benefit-list li strong {
  color: #38bdf8;
  display: inline-block;
  margin-right: 0.5rem;
  font-weight: 600;
}

.method-desc {
  color: #cbd5e1;
  font-size: 0.95rem;
  line-height: 1.7;
  margin: 0 0 1rem 0;
}

.component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

/* Responsibility List (From ShowcaseArchitecture) */
.responsibility-list {
  margin: 0 0 1.5rem 0;
  padding-left: 1.25rem;
  color: #cad5e1;
  font-size: 0.9rem;
  line-height: 1.6;
}
.responsibility-list li {
  margin-bottom: 0.25rem;
  list-style-type: disc;
}

/* Principles List (From ShowcaseArchitecture) */
.principles-list {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px dashed rgba(255, 255, 255, 0.1);
}

.principles-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #fbbf24; /* Amber-400 */
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.principles-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.principles-list li {
  font-size: 0.85rem;
  color: #94a3b8;
  padding-left: 0;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.principles-list .icon {
  color: #fbbf24; /* Amber-400 */
  font-size: 0.8rem;
  opacity: 0.8;
}

@keyframes pulse-once {
  0% {
    opacity: 0.5;
    background: rgba(56, 189, 248, 0.1);
  }
  100% {
    opacity: 1;
    background: transparent;
  }
}
.animate-pulse-once {
  animation: pulse-once 0.5s ease-out;
}
</style>
