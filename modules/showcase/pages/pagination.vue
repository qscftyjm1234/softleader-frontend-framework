<script setup lang="ts">
import { ref, computed } from 'vue'
import DataPreview from '../components/DataPreview.vue'

const {
  currentPage,
  pageSize,
  total,
  totalPages,
  info,
  goToPage,
  prevPage,
  nextPage,
  firstPage,
  lastPage,
  setPageSize,
  setTotal,
  getPageRange,
  paginateArray
} = usePagination({
  currentPage: 1,
  pageSize: 10,
  total: 100
})

// Demo data
const allItems = ref(
  Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    value: Math.floor(Math.random() * 1000)
  }))
)

const currentItems = computed(() => paginateArray(allItems.value))
const pageButtons = computed(() => getPageRange(7))

definePageMeta({
  title: '分頁管理 (Pagination)',
  icon: 'mdi-page-layout-footer'
})
</script>

<template>
  <div class="inspector-container">
    <div class="page-header">
      <div class="header-main">
        <router-link
          to="/showcase"
          class="back-link"
        >
          返回
        </router-link>
        <h1 class="page-title">分頁管理系統 (Pagination System)</h1>
      </div>
      <p class="page-desc">完整的分頁邏輯處理，支援頁碼計算、範圍管理與陣列分頁。</p>
    </div>

    <section class="module-section">
      <h2 class="section-title">
        <span class="icon">🎮</span>
        Interactive Demo
      </h2>
      <div class="card-content">
        <!-- Controls -->
        <div class="controls">
          <div class="control-group">
            <label>Total Items:</label>
            <input
              v-model.number="total"
              type="number"
              class="input-field"
              @change="setTotal(total)"
            />
          </div>
          <div class="control-group">
            <label>Page Size:</label>
            <select
              v-model.number="pageSize"
              class="input-field"
              @change="setPageSize(pageSize)"
            >
              <option :value="5">5</option>
              <option :value="10">10</option>
              <option :value="20">20</option>
              <option :value="50">50</option>
            </select>
          </div>
        </div>

        <!-- Pagination Info -->
        <div class="info-panel">
          <DataPreview
            title="Pagination Info"
            :data="info"
          />
        </div>

        <!-- Data Table -->
        <div class="data-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in currentItems"
                :key="item.id"
              >
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.value }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination Controls -->
        <div class="pagination">
          <button
            :disabled="!info.hasPrev"
            class="page-btn"
            @click="firstPage"
          >
            First
          </button>
          <button
            :disabled="!info.hasPrev"
            class="page-btn"
            @click="prevPage"
          >
            Prev
          </button>

          <button
            v-for="page in pageButtons"
            :key="page"
            :class="['page-btn', { active: page === currentPage }]"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>

          <button
            :disabled="!info.hasNext"
            class="page-btn"
            @click="nextPage"
          >
            Next
          </button>
          <button
            :disabled="!info.hasNext"
            class="page-btn"
            @click="lastPage"
          >
            Last
          </button>
        </div>

        <div class="summary">
          Showing {{ info.startItem }} to {{ info.endItem }} of {{ info.total }} items
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.inspector-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
  color: #333;
}

.page-header {
  margin-bottom: 2rem;
}

.header-main {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.back-link {
  text-decoration: none;
  color: #666;
  margin-right: 1rem;
  padding: 0.5rem 1rem;
  background: #f0f0f0;
  border-radius: 4px;
}

.page-title {
  font-size: 2rem;
  font-weight: 500;
  margin: 0;
}

.page-desc {
  color: #666;
  margin-left: 0.5rem;
}

.module-section {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.section-title {
  padding: 1rem 1.5rem;
  background: #fafafa;
  border-bottom: 1px solid #eee;
  margin: 0;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
}

.icon {
  margin-right: 0.5rem;
}

.card-content {
  padding: 1.5rem;
}

.controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.input-field {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.info-panel {
  margin-bottom: 1.5rem;
}

.data-table {
  margin-bottom: 1.5rem;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background: #f8f9fa;
  font-weight: 600;
}

.pagination {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.page-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.page-btn:hover:not(:disabled) {
  background: #f8f9fa;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-btn.active {
  background: #0d6efd;
  color: white;
  border-color: #0d6efd;
}

.summary {
  text-align: center;
  color: #666;
  font-size: 0.9rem;
}
</style>
