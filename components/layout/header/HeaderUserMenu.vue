<script setup lang="ts">
import { useAppStore } from '~/stores/app'

const appStore = useAppStore()

const handleAction = async (item: any) => {
  if (item.to) {
    navigateTo(item.to)
  } else if (item.action) {
    console.log('Triggered action:', item.action)
    if (item.action === 'logout') {
      const { $api } = useNuxtApp()
      
      try {
        // 1. 呼叫登出 API
        await $api.auth.logout()
      } catch (e) {
        console.error('Logout failed', e)
      } finally {
        // 2. 清除 Cookie
        const config = useRuntimeConfig()
        const token = useCookie(config.public.tokenKey as string)
        token.value = null
        
        // 3. 導回登入頁
        navigateTo('/login')
      }
    }
  }
}
</script>

<template>
  <v-menu v-if="appStore.config.header.userMenu.visible" location="bottom end" offset="10">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props">
        <v-avatar color="primary" size="36">
          <v-img src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortFlat&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"></v-img>
        </v-avatar>
      </v-btn>
    </template>
    <v-card width="200" class="rounded-lg">
      <v-list>
        <v-list-item
          prepend-avatar="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortFlat&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
          title="Admin User"
          subtitle="admin@example.com"
        ></v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list density="compact" nav>
        <template v-for="(item, i) in appStore.config.header.userMenu.items" :key="i">
          <v-divider v-if="item.divider" class="my-2"></v-divider>
          <v-list-item
            v-else
            :prepend-icon="item.icon"
            :title="item.title"
            :value="item.action"
            :color="item.color"
            :to="item.to"
            @click="handleAction(item)"
          ></v-list-item>
        </template>
      </v-list>
    </v-card>
  </v-menu>
</template>
