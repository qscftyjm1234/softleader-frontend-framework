<script setup lang="ts">
/**
 * Layout Demo - Form Page
 * 展示表單頁面的 Layout 使用
 */
definePageMeta({
  layout: 'default'
})

const formData = ref({
  name: '',
  email: '',
  role: '',
  bio: '',
  notifications: true
})

const handleSubmit = () => {
  const { notify } = useNotify()
  notify('表單已提交!', 'success')
  console.log('Form data:', formData.value)
}

// Handle input focus/blur for styling
const handleInputFocus = (event: FocusEvent) => {
  const target = event.target as HTMLInputElement
  target.style.borderColor = 'var(--color-primary)'
  target.style.outline = 'none'
}

const handleInputBlur = (event: FocusEvent) => {
  const target = event.target as HTMLInputElement
  target.style.borderColor = 'var(--color-gray-300)'
}
</script>

<template>
  <div>
    <!-- Page Header -->
    <div style="margin-bottom: 2rem">
      <h1 style="font-size: 2rem; font-weight: 700; margin: 0 0 0.5rem 0">
        Layout 展示 - 表單頁面
      </h1>
      <p style="color: var(--color-gray-600); margin: 0">
        展示如何在框架無關的 Layout 中使用表單元件
      </p>
    </div>

    <!-- Form Card -->
    <div
      style="
        background: var(--color-white);
        border-radius: var(--radius-lg);
        padding: 2rem;
        box-shadow: var(--shadow-md);
        max-width: 600px;
      "
    >
      <h2 style="font-size: 1.25rem; font-weight: 600; margin: 0 0 1.5rem 0">使用者資料</h2>

      <form @submit.prevent="handleSubmit">
        <!-- Name Field -->
        <div style="margin-bottom: 1.5rem">
          <label
            for="name"
            style="display: block; font-weight: 500; margin-bottom: 0.5rem; font-size: 0.875rem"
          >
            姓名
            <span style="color: var(--color-error)">*</span>
          </label>
          <input
            id="name"
            v-model="formData.name"
            type="text"
            required
            style="
              width: 100%;
              padding: 0.75rem;
              border: 1px solid var(--color-gray-300);
              border-radius: var(--radius-md);
              font-size: 0.875rem;
              transition: all var(--transition-fast);
            "
            placeholder="請輸入姓名"
            @focus="handleInputFocus"
            @blur="handleInputBlur"
          />
        </div>

        <!-- Email Field -->
        <div style="margin-bottom: 1.5rem">
          <label
            for="email"
            style="display: block; font-weight: 500; margin-bottom: 0.5rem; font-size: 0.875rem"
          >
            Email
            <span style="color: var(--color-error)">*</span>
          </label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            required
            style="
              width: 100%;
              padding: 0.75rem;
              border: 1px solid var(--color-gray-300);
              border-radius: var(--radius-md);
              font-size: 0.875rem;
              transition: all var(--transition-fast);
            "
            placeholder="請輸入 Email"
            @focus="handleInputFocus"
            @blur="handleInputBlur"
          />
        </div>

        <!-- Role Select -->
        <div style="margin-bottom: 1.5rem">
          <label
            for="role"
            style="display: block; font-weight: 500; margin-bottom: 0.5rem; font-size: 0.875rem"
          >
            角色
          </label>
          <select
            id="role"
            v-model="formData.role"
            style="
              width: 100%;
              padding: 0.75rem;
              border: 1px solid var(--color-gray-300);
              border-radius: var(--radius-md);
              font-size: 0.875rem;
              background-color: var(--color-white);
              cursor: pointer;
            "
            @focus="handleInputFocus"
            @blur="handleInputBlur"
          >
            <option value="">請選擇角色</option>
            <option value="admin">管理員</option>
            <option value="user">一般使用者</option>
            <option value="guest">訪客</option>
          </select>
        </div>

        <!-- Bio Textarea -->
        <div style="margin-bottom: 1.5rem">
          <label
            for="bio"
            style="display: block; font-weight: 500; margin-bottom: 0.5rem; font-size: 0.875rem"
          >
            個人簡介
          </label>
          <textarea
            id="bio"
            v-model="formData.bio"
            rows="4"
            style="
              width: 100%;
              padding: 0.75rem;
              border: 1px solid var(--color-gray-300);
              border-radius: var(--radius-md);
              font-size: 0.875rem;
              font-family: inherit;
              resize: vertical;
              transition: all var(--transition-fast);
            "
            placeholder="請輸入個人簡介"
            @focus="handleInputFocus"
            @blur="handleInputBlur"
          />
        </div>

        <!-- Checkbox -->
        <div style="margin-bottom: 1.5rem">
          <label style="display: flex; align-items: center; cursor: pointer">
            <input
              v-model="formData.notifications"
              type="checkbox"
              style="
                width: 18px;
                height: 18px;
                margin-right: 0.5rem;
                cursor: pointer;
                accent-color: var(--color-primary);
              "
            />
            <span style="font-size: 0.875rem">接收通知郵件</span>
          </label>
        </div>

        <!-- Submit Button -->
        <div style="display: flex; gap: 1rem; margin-top: 2rem">
          <button
            type="submit"
            class="btn btn-primary"
            style="flex: 1"
          >
            提交
          </button>
          <button
            type="button"
            class="btn"
            style="flex: 1; background-color: var(--color-gray-200); color: var(--color-gray-700)"
            @click="formData = { name: '', email: '', role: '', bio: '', notifications: true }"
          >
            重置
          </button>
        </div>
      </form>
    </div>

    <!-- Info Card -->
    <div
      style="
        background: var(--color-info);
        color: var(--color-white);
        border-radius: var(--radius-lg);
        padding: 1.5rem;
        margin-top: 2rem;
        max-width: 600px;
      "
    >
      <div style="display: flex; gap: 1rem">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          style="flex-shrink: 0"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
          />
          <line
            x1="12"
            y1="16"
            x2="12"
            y2="12"
          />
          <line
            x1="12"
            y1="8"
            x2="12.01"
            y2="8"
          />
        </svg>
        <div>
          <div style="font-weight: 600; margin-bottom: 0.25rem">提示</div>
          <div style="font-size: 0.875rem; opacity: 0.9">
            所有表單元件都使用原生 HTML,沒有依賴任何 UI 框架。樣式通過 CSS Variables
            統一管理,可輕鬆自訂。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input:focus,
select:focus,
textarea:focus {
  outline: none;
}
</style>
