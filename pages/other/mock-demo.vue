<script setup lang="ts">
/**
 * Mock API 示範頁面 (Best Practices)
 *
 * 展示如何整合：
 * 1. Mock System (mock/routes.ts, mock/core.ts)
 * 2. Repository Pattern (repositories/modules/*)
 * 3. Error Handling
 */

import type { User } from '~/mock/types/user'

const { $api } = useNuxtApp()
const { $toast } = useNuxtApp() // 假設有 toast plugin，若無則用 alert 或 useNotify

// -----------------------------------------------------------------------------
// 1. Dashboard 資料 (唯讀)
// -----------------------------------------------------------------------------
const { data: dashboardStats, pending: statsPending } = await $api.dashboard.getStats()
const { data: activities, pending: activitiesPending } = await $api.dashboard.getActivities({
  limit: 5
})

// -----------------------------------------------------------------------------
// 2. User User 資料 (CRUD)
// -----------------------------------------------------------------------------
// 列表與分頁
const userPage = ref(1)
const {
  data: usersResponse,
  pending: usersPending,
  refresh: refreshUsers
} = await $api.user.getUsers({
  page: userPage,
  limit: 6
})

// 新增使用者表單
const showCreateForm = ref(false)
const newUser = ref({
  name: '',
  email: '',
  role: 'user'
})
const creating = ref(false)

const handleCreateUser = async () => {
  if (!newUser.value.name || !newUser.value.email) return
  creating.value = true

  try {
    // 呼叫 Repository
    const { data, error } = await $api.user.createUser(newUser.value)

    if (error.value) throw error.value

    // 成功處理
    alert('使用者建立成功！(Mock)')
    showCreateForm.value = false
    newUser.value = { name: '', email: '', role: 'user' }
    refreshUsers() // 重新整理列表
  } catch (err) {
    alert('建立失敗')
    console.error(err)
  } finally {
    creating.value = false
  }
}

// 刪除使用者
const handleDeleteUser = async (id: number) => {
  if (!confirm('確定要刪除此使用者嗎？(Mock)')) return

  const { error } = await $api.user.deleteUser(id)
  if (!error.value) {
    alert('使用者已刪除 (Mock)')
    refreshUsers()
  } else {
    alert('刪除失敗')
  }
}

// -----------------------------------------------------------------------------
// 3. Order 資料 (列表)
// -----------------------------------------------------------------------------
const {
  data: ordersResponse,
  pending: ordersPending,
  refresh: refreshOrders
} = await $api.order.getOrders({
  page: 1,
  itemsPerPage: 5
})

// -----------------------------------------------------------------------------
// 4. Error Handling 測試
// -----------------------------------------------------------------------------
const errorLoading = ref(false)
const triggerError = async (code: number) => {
  errorLoading.value = true
  try {
    // 直接呼叫 Mock Error Endpoint
    const { error } = await useApi('/api/error', {
      params: { code },
      autoError: true // 讓 useApi 自動處理錯誤顯示
    })

    if (error.value) {
      console.log('Caught Expected Error:', error.value)
    }
  } finally {
    errorLoading.value = false
  }
}

// 環境變數檢查
const isMockEnabled = process.env.NUXT_PUBLIC_FEATURE_API_MOCK !== 'false'
</script>

<template>
  <div class="mock-demo p-8 max-w-7xl mx-auto">
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-slate-800 mb-2">🎭 Mock API 整合示範</h1>
        <p class="text-slate-500">展示 Repository Pattern 與 Mock System 的完美結合</p>
      </div>
      <div
        class="px-4 py-2 rounded-lg font-bold border"
        :class="
          isMockEnabled
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
            : 'bg-red-50 text-red-700 border-red-200'
        "
      >
        {{ isMockEnabled ? '✅ Mock Mode ON' : '❌ Mock Mode OFF' }}
      </div>
    </div>

    <!-- 1. Dashboard Section -->
    <section class="mb-12">
      <h2 class="text-xl font-bold text-slate-700 mb-4 flex items-center gap-2">
        <span class="p-1 bg-blue-100 text-blue-600 rounded">📊</span>
        Dashboard Repository
      </h2>

      <!-- Stats Cards -->
      <div
        v-if="statsPending"
        class="p-8 text-center text-slate-400 bg-slate-50 rounded-xl"
      >
        載入中...
      </div>
      <div
        v-else-if="dashboardStats"
        class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
      >
        <div
          v-for="stat in dashboardStats"
          :key="stat.title"
          class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm"
        >
          <div class="flex justify-between items-start mb-2">
            <span class="text-slate-500 text-sm">{{ stat.title }}</span>
            <span
              :class="`text-${stat.color}-500 bg-${stat.color}-50`"
              class="p-1 rounded"
            >
              <i :class="`mdi ${stat.icon}`"></i>
            </span>
          </div>
          <div class="text-2xl font-bold text-slate-800">{{ stat.value }}</div>
          <div
            class="text-xs mt-2"
            :class="stat.trend.includes('+') ? 'text-emerald-500' : 'text-slate-400'"
          >
            {{ stat.trend }}
          </div>
        </div>
      </div>

      <!-- Activity Feed -->
      <div class="bg-white rounded-xl border border-slate-200 p-4">
        <h3 class="text-sm font-bold text-slate-700 mb-3">
          近期活動 ($api.dashboard.getActivities)
        </h3>
        <div
          v-if="activities"
          class="space-y-3"
        >
          <div
            v-for="(activity, idx) in activities"
            :key="idx"
            class="flex items-center gap-3 text-sm border-b border-slate-50 last:border-0 pb-2 last:pb-0"
          >
            <div
              class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
            >
              <i :class="`mdi ${activity.icon}`"></i>
            </div>
            <div class="flex-1">
              <span class="font-bold text-slate-700">{{ activity.user }}</span>
              <span class="text-slate-600">{{ activity.action }}</span>
            </div>
            <span class="text-xs text-slate-400">{{ activity.time }}</span>
          </div>
        </div>
      </div>
    </section>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
      <!-- 2. User Management -->
      <section>
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-slate-700 flex items-center gap-2">
            <span class="p-1 bg-purple-100 text-purple-600 rounded">👥</span>
            User Repository
          </h2>
          <button
            class="text-sm px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
            @click="showCreateForm = !showCreateForm"
          >
            {{ showCreateForm ? '取消' : '+ 新增使用者' }}
          </button>
        </div>

        <!-- Create Form -->
        <div
          v-if="showCreateForm"
          class="mb-4 bg-purple-50 p-4 rounded-xl border border-purple-100"
        >
          <h3 class="font-bold text-purple-900 mb-3">新增使用者 (Mock POST)</h3>
          <div class="space-y-3">
            <input
              v-model="newUser.name"
              type="text"
              placeholder="姓名"
              class="w-full px-3 py-2 rounded border border-purple-200 focus:outline-none focus:border-purple-400"
            />
            <input
              v-model="newUser.email"
              type="email"
              placeholder="Email"
              class="w-full px-3 py-2 rounded border border-purple-200 focus:outline-none focus:border-purple-400"
            />
            <div class="flex justify-end pt-2">
              <button
                :disabled="creating"
                class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
                @click="handleCreateUser"
              >
                {{ creating ? '建立中...' : '確認建立' }}
              </button>
            </div>
          </div>
        </div>

        <!-- User List -->
        <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div
            v-if="usersPending"
            class="p-8 text-center text-slate-400"
          >
            Loading Users...
          </div>
          <div
            v-else-if="usersResponse"
            class="divide-y divide-slate-100"
          >
            <div
              v-for="user in usersResponse.data"
              :key="user.id"
              class="p-4 flex items-center justify-between hover:bg-slate-50 transition"
            >
              <div class="flex items-center gap-3">
                <img
                  :src="user.avatar"
                  class="w-10 h-10 rounded-full bg-slate-200"
                />
                <div>
                  <div class="font-bold text-slate-700">{{ user.name }}</div>
                  <div class="text-xs text-slate-500">{{ user.email }}</div>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <span
                  class="px-2 py-0.5 rounded text-xs font-bold"
                  :class="{
                    'bg-red-100 text-red-600': user.role === 'admin',
                    'bg-blue-100 text-blue-600': user.role === 'user',
                    'bg-slate-100 text-slate-600': user.role === 'guest'
                  }"
                >
                  {{ user.role }}
                </span>
                <button
                  class="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:bg-red-50 hover:text-red-500 transition"
                  title="刪除"
                  @click="handleDeleteUser(user.id)"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
          <!-- Pagination -->
          <div
            class="p-3 border-t border-slate-100 flex justify-between items-center text-sm text-slate-500"
          >
            <button
              :disabled="userPage <= 1"
              class="hover:text-purple-600 disabled:opacity-30"
              @click="userPage--"
            >
              ← Prev
            </button>
            <span>Page {{ userPage }}</span>
            <button
              class="hover:text-purple-600 disabled:opacity-30"
              @click="userPage++"
            >
              Next →
            </button>
          </div>
        </div>
      </section>

      <!-- 3. Order Management & Error Test -->
      <section class="space-y-8">
        <!-- Orders -->
        <div>
          <h2 class="text-xl font-bold text-slate-700 mb-4 flex items-center gap-2">
            <span class="p-1 bg-amber-100 text-amber-600 rounded">📦</span>
            Order Repository
          </h2>
          <div class="bg-white rounded-xl border border-slate-200 p-4">
            <div
              v-if="ordersPending"
              class="text-center py-4 text-slate-400"
            >
              Loading Orders...
            </div>
            <table
              v-else-if="ordersResponse"
              class="w-full text-sm"
            >
              <thead>
                <tr class="text-left text-slate-400 border-b border-slate-100">
                  <th class="pb-2">Order #</th>
                  <th class="pb-2">Items</th>
                  <th class="pb-2">Total</th>
                  <th class="pb-2">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr
                  v-for="order in ordersResponse.data"
                  :key="order.id"
                >
                  <td class="py-3 font-mono text-slate-600">{{ order.orderNumber }}</td>
                  <td class="py-3">{{ order.items.length }} items</td>
                  <td class="py-3 font-bold text-slate-700">${{ order.total }}</td>
                  <td class="py-3">
                    <span
                      class="px-2 py-0.5 rounded text-xs"
                      :class="{
                        'bg-emerald-100 text-emerald-600': order.status === 'delivered',
                        'bg-amber-100 text-amber-600': order.status === 'pending',
                        'bg-blue-100 text-blue-600': order.status === 'shipping',
                        'bg-red-100 text-red-600': order.status === 'cancelled'
                      }"
                    >
                      {{ order.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="mt-4 text-center">
              <button
                class="text-sm text-amber-600 hover:underline"
                @click="refreshOrders"
              >
                重新整理訂單
              </button>
            </div>
          </div>
        </div>

        <!-- Error Testing -->
        <div class="bg-red-50 rounded-xl border border-red-100 p-6">
          <h3 class="font-bold text-red-900 mb-2">🚫 Error Handling Test</h3>
          <p class="text-sm text-red-700 mb-4">點擊下方按鈕測試錯誤處理機制 (需開啟 autoError)</p>
          <div class="flex gap-2 flex-wrap">
            <button
              v-for="code in [400, 401, 403, 404, 500]"
              :key="code"
              :disabled="errorLoading"
              class="px-3 py-1 bg-white border border-red-200 text-red-600 rounded hover:bg-red-100 text-sm transition"
              @click="triggerError(code)"
            >
              {{ code }} Error
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* 使用 Tailwind CSS，樣式盡量保持原風格但優化間距 */
</style>
