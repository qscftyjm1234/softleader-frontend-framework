<script setup lang="ts">
/**
 * Layout Demo - Index Page
 * Layout 展示的首頁,提供導航到各個展示頁面
 */
definePageMeta({
  layout: 'default'
})

const demos = [
  {
    title: '基本頁面',
    description: '展示基本的 Layout 使用方式,包含統計卡片和內容區塊',
    path: '/layout-demo/basic',
    icon: 'layout',
    color: 'primary'
  },
  {
    title: '表單頁面',
    description: '展示如何在 Layout 中使用原生表單元件',
    path: '/layout-demo/form',
    icon: 'form',
    color: 'success'
  },
  {
    title: '元件頁面',
    description: '展示各種常用 UI 元件的實現方式 (按鈕、表格、徽章等)',
    path: '/layout-demo/components',
    icon: 'components',
    color: 'warning'
  }
]

const handleCardHover = (event: MouseEvent, isEnter: boolean) => {
  const target = event.currentTarget as HTMLElement
  if (isEnter) {
    target.style.transform = 'translateY(-4px)'
    target.style.boxShadow = 'var(--shadow-xl)'
  } else {
    target.style.transform = 'translateY(0)'
    target.style.boxShadow = 'var(--shadow-md)'
  }
}
</script>

<template>
  <div>
    <!-- Hero Section -->
    <div
      style="
        background: linear-gradient(
          135deg,
          var(--color-primary) 0%,
          var(--color-primary-dark) 100%
        );
        color: var(--color-white);
        border-radius: var(--radius-xl);
        padding: 3rem 2rem;
        margin-bottom: 3rem;
        text-align: center;
      "
    >
      <h1 style="font-size: 2.5rem; font-weight: 700; margin: 0 0 1rem 0">框架無關 Layout 系統</h1>
      <p
        style="
          font-size: 1.125rem;
          opacity: 0.9;
          margin: 0 0 2rem 0;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        "
      >
        不依賴任何 UI 框架,使用純 HTML + CSS 實現的企業級 Layout 系統
      </p>
      <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap">
        <a
          href="https://github.com"
          target="_blank"
          class="btn"
          style="background-color: var(--color-white); color: var(--color-primary)"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            style="margin-right: 0.5rem"
          >
            <path
              d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
            />
          </svg>
          查看原始碼
        </a>
        <a
          href="#demos"
          class="btn"
          style="
            background-color: rgba(255, 255, 255, 0.2);
            color: var(--color-white);
            border: 1px solid var(--color-white);
          "
        >
          開始探索
        </a>
      </div>
    </div>

    <!-- Features Grid -->
    <div style="margin-bottom: 3rem">
      <h2
        id="features"
        style="font-size: 1.75rem; font-weight: 700; margin: 0 0 1.5rem 0; text-align: center"
      >
        核心特性
      </h2>
      <div
        style="
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        "
      >
        <div
          style="
            background: var(--color-white);
            border-radius: var(--radius-lg);
            padding: 1.5rem;
            box-shadow: var(--shadow-md);
            text-align: center;
          "
        >
          <div
            style="
              width: 64px;
              height: 64px;
              background: var(--color-primary);
              opacity: 0.1;
              border-radius: var(--radius-full);
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 auto 1rem auto;
            "
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="currentColor"
              style="color: var(--color-primary)"
            >
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
            </svg>
          </div>
          <h3 style="font-size: 1.125rem; font-weight: 600; margin: 0 0 0.5rem 0">框架無關</h3>
          <p style="color: var(--color-gray-600); font-size: 0.875rem; margin: 0">
            不依賴任何 UI 框架,可與任何技術棧整合
          </p>
        </div>

        <div
          style="
            background: var(--color-white);
            border-radius: var(--radius-lg);
            padding: 1.5rem;
            box-shadow: var(--shadow-md);
            text-align: center;
          "
        >
          <div
            style="
              width: 64px;
              height: 64px;
              background: var(--color-success);
              opacity: 0.1;
              border-radius: var(--radius-full);
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 auto 1rem auto;
            "
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="currentColor"
              style="color: var(--color-success)"
            >
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          </div>
          <h3 style="font-size: 1.125rem; font-weight: 600; margin: 0 0 0.5rem 0">完整功能</h3>
          <p style="color: var(--color-gray-600); font-size: 0.875rem; margin: 0">
            包含 Header、Sidebar、Footer、Breadcrumbs 等完整功能
          </p>
        </div>

        <div
          style="
            background: var(--color-white);
            border-radius: var(--radius-lg);
            padding: 1.5rem;
            box-shadow: var(--shadow-md);
            text-align: center;
          "
        >
          <div
            style="
              width: 64px;
              height: 64px;
              background: var(--color-warning);
              opacity: 0.1;
              border-radius: var(--radius-full);
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 auto 1rem auto;
            "
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="currentColor"
              style="color: var(--color-warning)"
            >
              <path
                d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"
              />
            </svg>
          </div>
          <h3 style="font-size: 1.125rem; font-weight: 600; margin: 0 0 0.5rem 0">響應式設計</h3>
          <p style="color: var(--color-gray-600); font-size: 0.875rem; margin: 0">
            完美支援手機、平板、桌面等各種裝置
          </p>
        </div>

        <div
          style="
            background: var(--color-white);
            border-radius: var(--radius-lg);
            padding: 1.5rem;
            box-shadow: var(--shadow-md);
            text-align: center;
          "
        >
          <div
            style="
              width: 64px;
              height: 64px;
              background: var(--color-info);
              opacity: 0.1;
              border-radius: var(--radius-full);
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 auto 1rem auto;
            "
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="currentColor"
              style="color: var(--color-info)"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
              />
            </svg>
          </div>
          <h3 style="font-size: 1.125rem; font-weight: 600; margin: 0 0 0.5rem 0">易於自訂</h3>
          <p style="color: var(--color-gray-600); font-size: 0.875rem; margin: 0">
            使用 CSS Variables,可輕鬆調整顏色、間距等樣式
          </p>
        </div>
      </div>
    </div>

    <!-- Demo Cards -->
    <div>
      <h2
        id="demos"
        style="font-size: 1.75rem; font-weight: 700; margin: 0 0 1.5rem 0; text-align: center"
      >
        展示頁面
      </h2>
      <div
        style="
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        "
      >
        <NuxtLink
          v-for="demo in demos"
          :key="demo.path"
          :to="demo.path"
          style="
            background: var(--color-white);
            border-radius: var(--radius-lg);
            padding: 2rem;
            box-shadow: var(--shadow-md);
            text-decoration: none;
            color: inherit;
            transition: all var(--transition-base);
            display: block;
          "
          @mouseenter="handleCardHover($event, true)"
          @mouseleave="handleCardHover($event, false)"
        >
          <div
            style="
              width: 56px;
              height: 56px;
              border-radius: var(--radius-lg);
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 1rem;
            "
            :style="{
              backgroundColor: `var(--color-${demo.color})`,
              opacity: 0.15
            }"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="currentColor"
              :style="{ color: `var(--color-${demo.color})` }"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
              />
            </svg>
          </div>
          <h3 style="font-size: 1.25rem; font-weight: 600; margin: 0 0 0.5rem 0">
            {{ demo.title }}
          </h3>
          <p style="color: var(--color-gray-600); font-size: 0.875rem; margin: 0 0 1rem 0">
            {{ demo.description }}
          </p>
          <div
            style="
              display: flex;
              align-items: center;
              gap: 0.5rem;
              color: var(--color-primary);
              font-weight: 500;
              font-size: 0.875rem;
            "
          >
            查看範例
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <line
                x1="5"
                y1="12"
                x2="19"
                y2="12"
              />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
