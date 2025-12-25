<script setup lang="ts">
const activities = [
  {
    id: 1,
    user: 'Admin',
    avatar:
      'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortFlat&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
    action: '登入系統',
    target: '',
    ip: '192.168.1.1',
    time: '2023-10-27 10:30:00',
    status: 'success'
  },
  {
    id: 2,
    user: '王小明',
    avatar: '',
    action: '修改會員資料',
    target: 'User: 李大華 (ID: 2)',
    ip: '192.168.1.55',
    time: '2023-10-27 10:15:22',
    status: 'success'
  },
  {
    id: 3,
    user: 'Unknown',
    avatar: '',
    action: '嘗試存取敏感資料',
    target: '/api/secrets',
    ip: '203.145.2.1',
    time: '2023-10-27 09:45:10',
    status: 'danger'
  },
  {
    id: 4,
    user: 'System',
    avatar: '',
    action: '執行排程備份',
    target: 'Database',
    ip: 'localhost',
    time: '2023-10-27 04:00:00',
    status: 'info'
  },
  {
    id: 5,
    user: 'Admin',
    avatar:
      'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortFlat&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
    action: '新增權限',
    target: 'order.view',
    ip: '192.168.1.1',
    time: '2023-10-26 15:20:00',
    status: 'success'
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'success':
      return 'success'
    case 'danger':
      return 'error'
    case 'info':
      return 'info'
    default:
      return 'grey'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'success':
      return 'mdi-check-circle'
    case 'danger':
      return 'mdi-alert-circle'
    case 'info':
      return 'mdi-information'
    default:
      return 'mdi-circle'
  }
}
</script>

<template>
  <v-container fluid>
    <v-card
      class="rounded-lg"
      elevation="2"
    >
      <v-card-title class="d-flex align-center py-4 px-6 border-b">
        <div>
          <div class="text-h6 font-weight-bold">系統稽核紀錄</div>
          <div class="text-caption text-medium-emphasis">追蹤所有系統操作與安全性事件</div>
        </div>
        <v-spacer />
        <v-btn
          variant="outlined"
          color="grey-darken-1"
          prepend-icon="mdi-filter-variant"
          class="mr-2"
        >
          篩選
        </v-btn>
        <v-btn
          variant="outlined"
          color="primary"
          prepend-icon="mdi-download"
        >
          匯出 CSV
        </v-btn>
      </v-card-title>

      <v-card-text class="pa-0">
        <v-list
          lines="two"
          class="py-0"
        >
          <template
            v-for="(item, index) in activities"
            :key="item.id"
          >
            <v-list-item class="py-3 px-6">
              <template #prepend>
                <v-avatar
                  v-if="item.avatar"
                  :image="item.avatar"
                  size="40"
                  class="mr-3"
                />
                <v-avatar
                  v-else
                  color="primary"
                  variant="tonal"
                  size="40"
                  class="mr-3"
                >
                  <span class="text-subtitle-2">{{ item.user.charAt(0) }}</span>
                </v-avatar>
              </template>

              <v-list-item-title class="d-flex align-center mb-1">
                <span class="font-weight-bold mr-2">{{ item.user }}</span>
                <span class="text-body-2">{{ item.action }}</span>
                <v-chip
                  v-if="item.target"
                  size="x-small"
                  class="ml-2"
                  variant="outlined"
                >
                  {{ item.target }}
                </v-chip>
              </v-list-item-title>

              <v-list-item-subtitle class="d-flex align-center">
                <v-icon
                  size="x-small"
                  icon="mdi-clock-outline"
                  class="mr-1"
                />
                <span class="mr-4">{{ item.time }}</span>
                <v-icon
                  size="x-small"
                  icon="mdi-ip-network"
                  class="mr-1"
                />
                <span>{{ item.ip }}</span>
              </v-list-item-subtitle>

              <template #append>
                <v-chip
                  :color="getStatusColor(item.status)"
                  size="small"
                  variant="tonal"
                  label
                >
                  <v-icon
                    :icon="getStatusIcon(item.status)"
                    start
                    size="small"
                  />
                  {{ item.status.toUpperCase() }}
                </v-chip>
              </template>
            </v-list-item>
            <v-divider v-if="index < activities.length - 1" />
          </template>
        </v-list>
      </v-card-text>

      <v-divider />

      <v-card-actions class="justify-center py-3">
        <v-btn
          variant="text"
          color="primary"
          size="small"
        >
          載入更多紀錄
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
