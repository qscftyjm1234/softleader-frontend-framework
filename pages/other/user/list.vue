<script setup lang="ts">
const search = ref('')
const headers: any = [
  { title: 'ID', key: 'id', align: 'start' },
  { title: '會員資訊', key: 'user' },
  { title: '角色', key: 'role' },
  { title: '狀態', key: 'status' },
  { title: '註冊時間', key: 'joined' },
  { title: '操作', key: 'actions', sortable: false, align: 'end' }
]

const users = [
  {
    id: 1,
    name: '王小明',
    email: 'ming@example.com',
    avatar: '',
    role: 'Admin',
    status: 'active',
    joined: '2023-01-15'
  },
  {
    id: 2,
    name: '李大華',
    email: 'hua@example.com',
    avatar: '',
    role: 'User',
    status: 'inactive',
    joined: '2023-02-20'
  },
  {
    id: 3,
    name: '張美麗',
    email: 'mei@example.com',
    avatar: '',
    role: 'Editor',
    status: 'active',
    joined: '2023-03-10'
  },
  {
    id: 4,
    name: '陳志豪',
    email: 'hao@example.com',
    avatar: '',
    role: 'User',
    status: 'pending',
    joined: '2023-04-05'
  },
  {
    id: 5,
    name: '林雅婷',
    email: 'ting@example.com',
    avatar: '',
    role: 'User',
    status: 'active',
    joined: '2023-05-12'
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'success'
    case 'inactive':
      return 'grey'
    case 'pending':
      return 'warning'
    default:
      return 'default'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'active':
      return '啟用中'
    case 'inactive':
      return '已停用'
    case 'pending':
      return '待審核'
    default:
      return status
  }
}
</script>

<template>
  <v-container fluid>
    <v-card class="rounded-lg" elevation="2">
      <v-card-title class="d-flex align-center py-4 px-6">
        <div>
          <div class="text-h6 font-weight-bold">會員列表</div>
          <div class="text-caption text-medium-emphasis">
            管理系統中的所有註冊會員
          </div>
        </div>
        <v-spacer />
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="搜尋會員..."
          single-line
          hide-details
          variant="outlined"
          density="compact"
          class="me-4"
          style="max-width: 300px"
        />
        <v-btn color="primary" prepend-icon="mdi-plus" to="/user/create"
          >新增會員</v-btn
        >
      </v-card-title>

      <v-divider />

      <v-data-table :headers="headers" :items="users" :search="search" hover>
        <!-- 自定義會員資訊欄位 -->
        <template #item.user="{ item }">
          <div class="d-flex align-center py-2">
            <v-avatar color="primary" variant="tonal" size="36" class="me-3">
              <span class="text-subtitle-2">{{ item.name.charAt(0) }}</span>
            </v-avatar>
            <div>
              <div class="font-weight-bold">{{ item.name }}</div>
              <div class="text-caption text-medium-emphasis">
                {{ item.email }}
              </div>
            </div>
          </div>
        </template>

        <!-- 自定義狀態欄位 -->
        <template #item.status="{ item }">
          <v-chip
            :color="getStatusColor(item.status)"
            size="small"
            label
            variant="flat"
          >
            {{ getStatusText(item.status) }}
          </v-chip>
        </template>

        <!-- 自定義操作欄位 -->
        <template #item.actions>
          <v-btn
            icon="mdi-pencil"
            size="small"
            variant="text"
            color="primary"
          />
          <v-btn icon="mdi-delete" size="small" variant="text" color="error" />
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>
