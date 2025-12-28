<script setup lang="ts">
/**
 * Mock API 示範頁面
 *
 * 展示如何使用 Mock API 系統
 */

import type { UserListResponse } from '~/mock/schemas/user'
import type { OrderListResponse } from '~/mock/schemas/order'

// 使用者列表
const {
  data: users,
  pending: usersPending,
  refresh: refreshUsers
} = await useFetch<UserListResponse>('/api/users', {
  query: {
    page: 1,
    limit: 5
  }
})

// 訂單列表
const {
  data: orders,
  pending: ordersPending,
  refresh: refreshOrders
} = await useFetch<OrderListResponse>('/api/orders', {
  query: {
    page: 1,
    limit: 5
  }
})

// 檢查 Mock 是否啟用
const isMockEnabled = process.env.NUXT_PUBLIC_FEATURE_API_MOCK !== 'false'
</script>

<template>
  <div class="mock-demo">
    <h1>🎭 Mock API 示範</h1>

    <div class="status">
      <div
        class="badge"
        :class="isMockEnabled ? 'mock-enabled' : 'mock-disabled'"
      >
        {{ isMockEnabled ? '✅ Mock API 已啟用' : '❌ Mock API 已停用' }}
      </div>
    </div>

    <!-- 使用者列表 -->
    <section class="section">
      <div class="section-header">
        <h2>👥 使用者列表</h2>
        <button
          :disabled="usersPending"
          @click="refreshUsers"
        >
          {{ usersPending ? '載入中...' : '重新載入' }}
        </button>
      </div>

      <div
        v-if="usersPending"
        class="loading"
      >
        載入中...
      </div>

      <div
        v-else-if="users"
        class="data-grid"
      >
        <div
          v-for="user in users.data"
          :key="user.id"
          class="card"
        >
          <img
            v-if="user.avatar"
            :src="user.avatar"
            :alt="user.name"
            class="avatar"
          />
          <h3>{{ user.name }}</h3>
          <p>{{ user.email }}</p>
          <span
            class="role-badge"
            :class="`role-${user.role}`"
          >
            {{ user.role }}
          </span>
        </div>
      </div>

      <div
        v-if="users"
        class="pagination-info"
      >
        顯示 {{ users.data.length }} / {{ users.total }} 筆資料
      </div>
    </section>

    <!-- 訂單列表 -->
    <section class="section">
      <div class="section-header">
        <h2>📦 訂單列表</h2>
        <button
          :disabled="ordersPending"
          @click="refreshOrders"
        >
          {{ ordersPending ? '載入中...' : '重新載入' }}
        </button>
      </div>

      <div
        v-if="ordersPending"
        class="loading"
      >
        載入中...
      </div>

      <div
        v-else-if="orders"
        class="data-grid"
      >
        <div
          v-for="order in orders.data"
          :key="order.id"
          class="card"
        >
          <h3>{{ order.orderNumber }}</h3>
          <p>總金額: ${{ order.total.toFixed(2) }}</p>
          <p>商品數量: {{ order.items.length }}</p>
          <span
            class="status-badge"
            :class="`status-${order.status}`"
          >
            {{ order.status }}
          </span>
        </div>
      </div>

      <div
        v-if="orders"
        class="pagination-info"
      >
        顯示 {{ orders.data.length }} / {{ orders.total }} 筆資料
      </div>
    </section>

    <!-- 說明 -->
    <section class="section info-section">
      <h2>ℹ️ 使用說明</h2>
      <ul>
        <li>所有資料都是由 MSW 攔截並返回的 Mock 資料</li>
        <li>打開 DevTools Network 可以看到請求被攔截</li>
        <li>每次重新載入都會生成新的假資料</li>
        <li>
          修改
          <code>.env</code>
          中的
          <code>NUXT_PUBLIC_FEATURE_API_MOCK</code>
          可以切換 Mock/真實 API
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.mock-demo {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.status {
  margin-bottom: 2rem;
}

.badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
}

.mock-enabled {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.mock-disabled {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.section {
  background: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-header h2 {
  margin: 0;
  color: #34495e;
}

button {
  background: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s;
}

button:hover:not(:disabled) {
  background: #0056b3;
}

button:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #6c757d;
}

.data-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.card {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  padding: 1rem;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-bottom: 0.5rem;
}

.card h3 {
  margin: 0.5rem 0;
  color: #2c3e50;
  font-size: 1.1rem;
}

.card p {
  margin: 0.25rem 0;
  color: #6c757d;
  font-size: 0.9rem;
}

.role-badge,
.status-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-top: 0.5rem;
}

.role-admin {
  background: #dc3545;
  color: white;
}

.role-user {
  background: #007bff;
  color: white;
}

.role-guest {
  background: #6c757d;
  color: white;
}

.status-pending {
  background: #ffc107;
  color: #000;
}

.status-processing {
  background: #17a2b8;
  color: white;
}

.status-shipped {
  background: #007bff;
  color: white;
}

.status-delivered {
  background: #28a745;
  color: white;
}

.status-cancelled {
  background: #dc3545;
  color: white;
}

.pagination-info {
  margin-top: 1rem;
  text-align: center;
  color: #6c757d;
  font-size: 0.9rem;
}

.info-section ul {
  list-style: none;
  padding: 0;
}

.info-section li {
  padding: 0.5rem 0;
  color: #495057;
}

.info-section li::before {
  content: '💡 ';
  margin-right: 0.5rem;
}

code {
  background: #f8f9fa;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  color: #e83e8c;
}
</style>
