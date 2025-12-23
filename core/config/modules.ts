import type { NuxtConfig } from 'nuxt/schema'

export const modulesConfig: NuxtConfig['modules'] = [
  '@nuxtjs/device',
  '@nuxtjs/i18n',
  '@vueuse/nuxt',
  '@pinia/nuxt',
  '@nuxt/eslint'
]
