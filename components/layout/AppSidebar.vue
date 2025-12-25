<script setup lang="ts">
import AppSidebarItem from '~/components/layout/AppSidebarItem.vue'

const sidebarStore = useSidebarStore()
const userStore = useUserStore()
const appStore = useAppStore()

const props = defineProps<{
  modelValue?: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const drawer = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

// 確保 sidebar 已經生成，並傳入使用者權限
watch(
  () => userStore.permissions,
  (newPermissions) => {
    sidebarStore.generate(newPermissions)
  },
  { immediate: true }
)
</script>

<template>
  <v-navigation-drawer
    v-model="drawer"
    class="bg-grey-darken-4"
    theme="dark"
    elevation="2"
    :width="appStore.config?.sidebar?.width || 280"
  >
    <!-- 品牌 Logo 區塊 -->
    <div class="pa-6 d-flex align-center">
      <v-avatar
        color="primary"
        size="40"
        rounded="lg"
        class="mr-3 elevation-2"
      >
        <v-img
          v-if="appStore.config.branding.logo.image"
          :src="appStore.config.branding.logo.image"
        />
        <v-icon
          v-else
          :icon="appStore.config.branding.logo.icon"
          size="24"
        />
      </v-avatar>
      <div>
        <div
          class="text-h6 font-weight-bold text-white"
          style="line-height: 1.2"
        >
          {{ appStore.config.branding.title }}
        </div>
        <div class="text-caption text-grey-lighten-1">
          {{ appStore.config.branding.subtitle }}
        </div>
      </div>
    </div>

    <v-divider class="mb-2 border-opacity-25" />

    <v-list
      nav
      open-strategy="single"
      class="px-3"
    >
      <div class="text-caption font-weight-bold text-grey-darken-1 mb-2 mt-2 px-2">
        {{ appStore.config.sidebar.mainMenuTitle }}
      </div>
      <AppSidebarItem
        v-for="item in sidebarStore.items"
        :key="item.label"
        :item="item"
      />
    </v-list>

    <template #append>
      <div
        v-if="appStore.config.sidebar.proCard.visible"
        class="pa-4"
      >
        <v-card
          color="grey-darken-3"
          class="rounded-lg pa-3"
          variant="flat"
        >
          <div class="d-flex align-center">
            <v-avatar
              size="36"
              color="primary"
              variant="tonal"
              class="mr-3"
            >
              <span class="text-subtitle-2">{{ appStore.config.sidebar.proCard.badge }}</span>
            </v-avatar>
            <div>
              <div class="text-subtitle-2 font-weight-bold">
                {{ appStore.config.sidebar.proCard.title }}
              </div>
              <div class="text-caption text-grey-lighten-1">
                {{ appStore.config.sidebar.proCard.subtitle }}
              </div>
            </div>
          </div>
        </v-card>
      </div>
    </template>
  </v-navigation-drawer>
</template>
