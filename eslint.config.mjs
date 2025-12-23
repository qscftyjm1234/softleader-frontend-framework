// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  // 您的自定義規則
  rules: {
    'vue/multi-word-component-names': 'off', // 允許單字組件名稱 (如 Login.vue)
    'vue/no-multiple-template-root': 'off', // Nuxt 3 (Vue 3) 支援多根節點
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  }
})
.append({
  files: ['**/*.vue'],
  languageOptions: {
    parser: await import('vue-eslint-parser'),
    parserOptions: {
      parser: await import('@typescript-eslint/parser'),
      ecmaVersion: 'latest',
      sourceType: 'module'
    }
  },
  rules: {
    'vue/valid-v-slot': 'off'
  }
})
