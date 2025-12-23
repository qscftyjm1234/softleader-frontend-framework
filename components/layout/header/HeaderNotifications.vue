<script setup lang="ts">
import { useAppStore } from '~/stores/app'

const appStore = useAppStore()

const notifications = [
  {
    title: '新訂單通知',
    subtitle: '收到一筆來自 Google 的新訂單',
    time: '5m',
    color: 'success',
    icon: 'mdi-cart-plus'
  },
  {
    title: '系統警告',
    subtitle: 'CPU 使用率超過 90%',
    time: '2h',
    color: 'warning',
    icon: 'mdi-alert'
  },
  {
    title: '備份完成',
    subtitle: '每日自動備份已成功',
    time: '1d',
    color: 'info',
    icon: 'mdi-cloud-check'
  }
]
</script>

<template>
  <v-menu
    v-if="appStore.config.header.notifications"
    location="bottom end"
    offset="10"
  >
    <template #activator="{ props }">
      <v-btn icon v-bind="props" class="mr-2">
        <v-badge content="3" color="error" dot floating>
          <v-icon icon="mdi-bell-outline" color="grey-darken-2" />
        </v-badge>
      </v-btn>
    </template>
    <v-card width="320" class="rounded-lg">
      <v-card-title class="text-subtitle-1 font-weight-bold px-4 pt-4"
        >通知中心</v-card-title
      >
      <v-list lines="two" class="py-0">
        <v-list-item
          v-for="(item, i) in notifications"
          :key="i"
          :value="item"
          active-color="primary"
          class="px-4"
        >
          <template #prepend>
            <v-avatar
              :color="item.color"
              variant="tonal"
              size="small"
              class="mr-3"
            >
              <v-icon :icon="item.icon" size="small" />
            </v-avatar>
          </template>
          <v-list-item-title class="text-body-2 font-weight-bold">{{
            item.title
          }}</v-list-item-title>
          <v-list-item-subtitle class="text-caption">{{
            item.subtitle
          }}</v-list-item-subtitle>
          <template #append>
            <span class="text-caption text-medium-emphasis">{{
              item.time
            }}</span>
          </template>
        </v-list-item>
      </v-list>
      <v-divider />
      <v-btn block variant="text" color="primary" class="py-2"
        >查看所有通知</v-btn
      >
    </v-card>
  </v-menu>
</template>
