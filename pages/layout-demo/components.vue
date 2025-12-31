<script setup lang="ts">
/**
 * Layout Demo - Components Page
 * 展示各種 UI 元件的使用
 */
definePageMeta({
  layout: 'default'
})

const { notify } = useNotify()

const showToast = (type: string) => {
  const messages: Record<string, string> = {
    success: '操作成功!',
    error: '發生錯誤!',
    warning: '請注意!',
    info: '這是一則訊息'
  }
  notify(messages[type] || '通知', type as any)
}

const tableData = [
  { id: 1, name: '張三', email: 'zhang@example.com', role: '管理員', status: '啟用' },
  { id: 2, name: '李四', email: 'li@example.com', role: '使用者', status: '啟用' },
  { id: 3, name: '王五', email: 'wang@example.com', role: '訪客', status: '停用' }
]
</script>

<template>
  <div>
    <!-- Page Header -->
    <div style="margin-bottom: 2rem">
      <h1 style="font-size: 2rem; font-weight: 700; margin: 0 0 0.5rem 0">
        Layout 展示 - 元件頁面
      </h1>
      <p style="color: var(--color-gray-600); margin: 0">展示各種常用 UI 元件的實現方式</p>
    </div>

    <!-- Buttons Section -->
    <div
      style="
        background: var(--color-white);
        border-radius: var(--radius-lg);
        padding: 2rem;
        box-shadow: var(--shadow-md);
        margin-bottom: 2rem;
      "
    >
      <h2 style="font-size: 1.25rem; font-weight: 600; margin: 0 0 1.5rem 0">按鈕 (Buttons)</h2>
      <div style="display: flex; flex-wrap: wrap; gap: 1rem">
        <button class="btn btn-primary">主要按鈕</button>
        <button
          class="btn"
          style="background-color: var(--color-success); color: var(--color-white)"
        >
          成功按鈕
        </button>
        <button
          class="btn"
          style="background-color: var(--color-warning); color: var(--color-white)"
        >
          警告按鈕
        </button>
        <button
          class="btn"
          style="background-color: var(--color-error); color: var(--color-white)"
        >
          錯誤按鈕
        </button>
        <button
          class="btn"
          style="background-color: var(--color-gray-200); color: var(--color-gray-700)"
        >
          次要按鈕
        </button>
        <button
          class="btn"
          style="
            border: 1px solid var(--color-primary);
            background: transparent;
            color: var(--color-primary);
          "
        >
          外框按鈕
        </button>
      </div>
    </div>

    <!-- Toast/Notification Section -->
    <div
      style="
        background: var(--color-white);
        border-radius: var(--radius-lg);
        padding: 2rem;
        box-shadow: var(--shadow-md);
        margin-bottom: 2rem;
      "
    >
      <h2 style="font-size: 1.25rem; font-weight: 600; margin: 0 0 1.5rem 0">
        通知 (Toast/Snackbar)
      </h2>
      <div style="display: flex; flex-wrap: wrap; gap: 1rem">
        <button
          class="btn"
          style="background-color: var(--color-success); color: var(--color-white)"
          @click="showToast('success')"
        >
          成功通知
        </button>
        <button
          class="btn"
          style="background-color: var(--color-error); color: var(--color-white)"
          @click="showToast('error')"
        >
          錯誤通知
        </button>
        <button
          class="btn"
          style="background-color: var(--color-warning); color: var(--color-white)"
          @click="showToast('warning')"
        >
          警告通知
        </button>
        <button
          class="btn"
          style="background-color: var(--color-info); color: var(--color-white)"
          @click="showToast('info')"
        >
          資訊通知
        </button>
      </div>
    </div>

    <!-- Table Section -->
    <div
      style="
        background: var(--color-white);
        border-radius: var(--radius-lg);
        padding: 2rem;
        box-shadow: var(--shadow-md);
        margin-bottom: 2rem;
      "
    >
      <h2 style="font-size: 1.25rem; font-weight: 600; margin: 0 0 1.5rem 0">表格 (Table)</h2>
      <div style="overflow-x: auto">
        <table style="width: 100%; border-collapse: collapse">
          <thead>
            <tr
              style="
                background-color: var(--color-gray-100);
                border-bottom: 2px solid var(--color-gray-300);
              "
            >
              <th style="padding: 0.75rem; text-align: left; font-weight: 600; font-size: 0.875rem">
                ID
              </th>
              <th style="padding: 0.75rem; text-align: left; font-weight: 600; font-size: 0.875rem">
                姓名
              </th>
              <th style="padding: 0.75rem; text-align: left; font-weight: 600; font-size: 0.875rem">
                Email
              </th>
              <th style="padding: 0.75rem; text-align: left; font-weight: 600; font-size: 0.875rem">
                角色
              </th>
              <th style="padding: 0.75rem; text-align: left; font-weight: 600; font-size: 0.875rem">
                狀態
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in tableData"
              :key="row.id"
              style="border-bottom: 1px solid var(--color-gray-200)"
            >
              <td style="padding: 0.75rem; font-size: 0.875rem">
                {{ row.id }}
              </td>
              <td style="padding: 0.75rem; font-size: 0.875rem; font-weight: 500">
                {{ row.name }}
              </td>
              <td style="padding: 0.75rem; font-size: 0.875rem; color: var(--color-gray-600)">
                {{ row.email }}
              </td>
              <td style="padding: 0.75rem; font-size: 0.875rem">
                {{ row.role }}
              </td>
              <td style="padding: 0.75rem">
                <span
                  style="
                    display: inline-block;
                    padding: 0.25rem 0.75rem;
                    border-radius: var(--radius-full);
                    font-size: 0.75rem;
                    font-weight: 600;
                  "
                  :style="{
                    backgroundColor:
                      row.status === '啟用' ? 'var(--color-success)' : 'var(--color-gray-400)',
                    color: 'var(--color-white)'
                  }"
                >
                  {{ row.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Badges Section -->
    <div
      style="
        background: var(--color-white);
        border-radius: var(--radius-lg);
        padding: 2rem;
        box-shadow: var(--shadow-md);
      "
    >
      <h2 style="font-size: 1.25rem; font-weight: 600; margin: 0 0 1.5rem 0">徽章 (Badges)</h2>
      <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center">
        <span class="badge">3</span>
        <span
          class="badge"
          style="background-color: var(--color-success)"
        >
          New
        </span>
        <span
          class="badge"
          style="background-color: var(--color-warning)"
        >
          Hot
        </span>
        <span
          class="badge"
          style="background-color: var(--color-info)"
        >
          99+
        </span>
        <span class="badge badge-dot" />
        <span
          class="badge badge-dot"
          style="background-color: var(--color-success)"
        />
      </div>
    </div>
  </div>
</template>
