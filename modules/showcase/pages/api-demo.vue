<script setup lang="ts">
/**
 * API Demo - API 管理與 Repository 模式展示
 *
 * 展示如何使用 useRepository 進行 API 呼叫
 * 包含分頁、搜尋、載入狀態等功能
 *
 * 為什麼需要 useRepositoryHelpers?
 * - waitForData: 在 SSR 環境下等待資料載入完成
 * - waitForAll: 等待多個 API 同時載入完成
 * - fetchData: 直接使用 $fetch 取得資料（適合一次性請求）
 */
const { user } = useRepository()

const page = ref(1)
const search = ref('')

// 響應式 API 呼叫
// 當 page 或 search 改變時，會自動重新發送請求
const { data, pending, error } = await user.getUsers({
  page,
  q: search,
  itemsPerPage: 5
})
</script>

<template>
  <div class="showcase-page">
    <h1 class="page-title">API Management Demo</h1>
    <p class="page-description">
      展示如何使用 Repository 模式進行 API 呼叫,包含分頁、搜尋、載入狀態等功能
    </p>

    <!-- Controls -->
    <div class="controls">
      <div class="control-group">
        <label>Search:</label>
        <input
          v-model="search"
          placeholder="Search users..."
          class="search-input"
        />
      </div>

      <div class="control-group">
        <button
          :disabled="page <= 1"
          class="btn btn-secondary"
          @click="page--"
        >
          Prev
        </button>
        <span class="page-info">Page {{ page }}</span>
        <button
          class="btn btn-secondary"
          @click="page++"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div
      v-if="pending"
      class="state-message loading"
    >
      ⏳ Loading...
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="state-message error"
    >
      ❌ Error: {{ error.message }}
    </div>

    <!-- Data Table -->
    <div
      v-else
      class="data-table-container"
    >
      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in (data as any)?.items"
            :key="item.id"
          >
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td>
              <span
                class="role-badge"
                :class="`role-${item.role.toLowerCase()}`"
              >
                {{ item.role }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="table-footer">Total: {{ (data as any)?.total }} users</div>
    </div>

    <!-- Usage Code -->
    <div class="code-section">
      <h3>使用方式</h3>
      <pre><code>// 基本用法
const { user } = useRepository()

const page = ref(1)
const search = ref('')

// 響應式 API 呼叫 - 當 page 或 search 改變時自動重新請求
const { data, pending, error } = await user.getUsers({
  page,
  q: search,
  itemsPerPage: 5
})

// ===== useRepositoryHelpers 用法 =====

// 1. waitForData - 等待單一 API 載入完成（SSR 環境）
const { data: stats, pending: statsPending } = useRepository().dashboard.getStats()
await waitForData(statsPending)
console.log('資料已載入:', stats.value)

// 2. waitForAll - 等待多個 API 同時載入完成
const stats = useRepository().dashboard.getStats()
const activities = useRepository().dashboard.getActivities({ limit: 10 })
await waitForAll([stats.pending, activities.pending])
console.log('所有資料都已載入')

// 3. fetchData - 直接取得資料（適合一次性請求）
const activities = await fetchData('/api/dashboard/activities', { limit: 10 })
console.log('資料:', activities)</code></pre>
    </div>
  </div>
</template>

<style scoped>
.showcase-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.page-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.page-description {
  color: #7f8c8d;
  margin-bottom: 2rem;
  line-height: 1.6;
}

/* Controls */
.controls {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.control-group label {
  font-weight: 500;
  color: #555;
}

.search-input {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.875rem;
  min-width: 200px;
}

.search-input:focus {
  outline: none;
  border-color: #3498db;
}

.btn {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.btn:hover:not(:disabled) {
  background: #f5f5f5;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  background: white;
  color: #555;
}

.page-info {
  padding: 0 0.5rem;
  color: #555;
  font-weight: 500;
}

/* State Messages */
.state-message {
  padding: 2rem;
  text-align: center;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.state-message.loading {
  background: #f0f9ff;
  color: #0369a1;
}

.state-message.error {
  background: #fef2f2;
  color: #dc2626;
}

/* Data Table */
.data-table-container {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 2rem;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table thead {
  background: #f5f5f5;
}

.data-table th {
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #555;
  font-size: 0.875rem;
  border-bottom: 2px solid #e0e0e0;
}

.data-table td {
  padding: 1rem;
  border-bottom: 1px solid #f0f0f0;
  color: #333;
  font-size: 0.875rem;
}

.data-table tbody tr:hover {
  background: #f9f9f9;
}

.data-table tbody tr:last-child td {
  border-bottom: none;
}

.role-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.role-badge.role-admin {
  background: #dbeafe;
  color: #1e40af;
}

.role-badge.role-editor {
  background: #dcfce7;
  color: #166534;
}

.role-badge.role-viewer {
  background: #f3f4f6;
  color: #6b7280;
}

.table-footer {
  padding: 1rem;
  background: #f9fafb;
  text-align: right;
  font-size: 0.875rem;
  color: #6b7280;
}

/* Code Section */
.code-section {
  margin-top: 2rem;
}

.code-section h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.code-section pre {
  background: #f5f5f5;
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
  border: 1px solid #e0e0e0;
}

.code-section code {
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
  color: #2c3e50;
}
</style>
