<script setup lang="ts">
/**
 * Header Language Selector - Framework Agnostic
 * 框架無關的語言選擇器
 */
const { locale, locales } = useLanguage()
</script>

<template>
  <div style="position: relative">
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      style="
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
        color: var(--color-gray-500);
        pointer-events: none;
      "
    >
      <circle
        cx="12"
        cy="12"
        r="10"
      />
      <line
        x1="2"
        y1="12"
        x2="22"
        y2="12"
      />
      <path
        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
      />
    </svg>
    <select
      v-model="locale"
      style="
        padding: 0.5rem 2rem 0.5rem 2.5rem;
        border: 1px solid var(--color-gray-300);
        border-radius: var(--radius-md);
        background-color: var(--color-white);
        font-size: 0.875rem;
        cursor: pointer;
        appearance: none;
        background-image: url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23666%27 stroke-width=%272%27%3e%3cpolyline points=%276 9 12 15 18 9%27/%3e%3c/svg%3e');
        background-repeat: no-repeat;
        background-position: right 0.5rem center;
        transition: all var(--transition-fast);
      "
    >
      <option
        v-for="lang in locales"
        :key="lang.code"
        :value="lang.code"
      >
        {{ lang.name }}
      </option>
    </select>
  </div>
</template>

<style scoped>
select:focus {
  outline: none;
  border-color: var(--color-primary);
}

select:hover {
  border-color: var(--color-gray-400);
}
</style>
