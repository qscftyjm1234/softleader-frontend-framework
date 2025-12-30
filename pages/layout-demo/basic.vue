<script setup lang="ts">
/**
 * Layout Demo - Basic Page
 * 展示基本的 Layout 使用方式
 */
definePageMeta({
  layout: 'default'
})

const cards = [
  { title: '總用戶數', value: '12,345', icon: 'users', color: 'primary', trend: '+12%' },
  { title: '今日訂單', value: '234', icon: 'cart', color: 'success', trend: '+5%' },
  { title: '營收', value: '$45,678', icon: 'dollar', color: 'warning', trend: '+8%' },
  { title: '訪客數', value: '8,901', icon: 'eye', color: 'info', trend: '-2%' }
]
</script>

<template>
  <div>
    <!-- Page Header -->
    <div style="margin-bottom: 2rem">
      <h1 style="font-size: 2rem; font-weight: 700; margin: 0 0 0.5rem 0">
        Layout 展示 - 基本頁面
      </h1>
      <p style="color: var(--color-gray-600); margin: 0">
        這是一個使用框架無關 Layout 的範例頁面,不依賴任何 UI 框架
      </p>
    </div>

    <!-- Stats Cards -->
    <div
      style="
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;
      "
    >
      <div
        v-for="(card, i) in cards"
        :key="i"
        style="
          background: var(--color-white);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          box-shadow: var(--shadow-md);
          display: flex;
          align-items: center;
          gap: 1rem;
        "
      >
        <div
          style="
            width: 48px;
            height: 48px;
            border-radius: var(--radius-lg);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          "
          :style="{
            backgroundColor: `var(--color-${card.color})`,
            opacity: 0.2
          }"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            :style="{ color: `var(--color-${card.color})` }"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
            />
          </svg>
        </div>
        <div style="flex: 1">
          <div style="font-size: 0.875rem; color: var(--color-gray-600); margin-bottom: 0.25rem">
            {{ card.title }}
          </div>
          <div style="font-size: 1.5rem; font-weight: 700">
            {{ card.value }}
          </div>
        </div>
        <div
          style="
            font-size: 0.75rem;
            font-weight: 600;
            padding: 0.25rem 0.5rem;
            border-radius: var(--radius-sm);
          "
          :style="{
            backgroundColor: card.trend.includes('+')
              ? 'var(--color-success)'
              : 'var(--color-error)',
            color: 'var(--color-white)',
            opacity: 0.9
          }"
        >
          {{ card.trend }}
        </div>
      </div>
    </div>

    <!-- Content Section -->
    <div
      style="
        background: var(--color-white);
        border-radius: var(--radius-lg);
        padding: 2rem;
        box-shadow: var(--shadow-md);
      "
    >
      <h2 style="font-size: 1.25rem; font-weight: 600; margin: 0 0 1rem 0">框架無關的特性</h2>
      <ul style="color: var(--color-gray-700); line-height: 1.8">
        <li>✅ 不依賴任何 UI 框架 (Vuetify, Element Plus, etc.)</li>
        <li>✅ 使用純 HTML + CSS 實現</li>
        <li>✅ 完整的 CSS Variables 設計系統</li>
        <li>✅ 響應式設計,支援手機、平板、桌面</li>
        <li>✅ 可輕鬆整合任何 UI 框架或自訂樣式</li>
        <li>✅ 保留所有原有功能 (Sidebar, Header, Footer, Breadcrumbs, etc.)</li>
      </ul>

      <div
        style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--color-gray-200)"
      >
        <h3 style="font-size: 1rem; font-weight: 600; margin: 0 0 0.75rem 0">快速開始</h3>
        <p style="color: var(--color-gray-600); margin: 0 0 1rem 0">
          只需在頁面中設定 layout 即可使用:
        </p>
        <pre
          style="
            background: var(--color-gray-900);
            color: var(--color-gray-100);
            padding: 1rem;
            border-radius: var(--radius-md);
            overflow-x: auto;
            font-size: 0.875rem;
          "
        ><code>definePageMeta({
  layout: 'default'
})</code></pre>
      </div>
    </div>
  </div>
</template>
