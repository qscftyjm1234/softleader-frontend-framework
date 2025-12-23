<script setup lang="ts">
const search = ref('')
const headers: any = [
  { title: '權限名稱', key: 'name', align: 'start' },
  { title: '代碼 (Key)', key: 'code' },
  { title: '所屬模組', key: 'module' },
  { title: '類型', key: 'type' },
  { title: '操作', key: 'actions', sortable: false, align: 'end' }
]

const permissions = [
  {
    name: '查看會員',
    code: 'user.view',
    module: 'User',
    type: 'read',
    description: '允許查看會員列表與詳情'
  },
  {
    name: '新增會員',
    code: 'user.create',
    module: 'User',
    type: 'write',
    description: '允許建立新會員'
  },
  {
    name: '編輯會員',
    code: 'user.edit',
    module: 'User',
    type: 'write',
    description: '允許修改會員資料'
  },
  {
    name: '刪除會員',
    code: 'user.delete',
    module: 'User',
    type: 'delete',
    description: '允許刪除會員'
  },
  {
    name: '查看權限',
    code: 'permission.view',
    module: 'Permission',
    type: 'read',
    description: '允許查看系統權限'
  },
  {
    name: '管理角色',
    code: 'role.manage',
    module: 'Permission',
    type: 'admin',
    description: '允許新增修改角色'
  },
  {
    name: '系統設定',
    code: 'system.config',
    module: 'System',
    type: 'admin',
    description: '允許修改全域設定'
  }
]

const getTypeColor = (type: string) => {
  switch (type) {
    case 'read':
      return 'info'
    case 'write':
      return 'success'
    case 'delete':
      return 'error'
    case 'admin':
      return 'deep-purple'
    default:
      return 'grey'
  }
}
</script>

<template>
  <v-container fluid>
    <v-card class="rounded-lg" elevation="2">
      <v-card-title class="d-flex align-center py-4 px-6">
        <div>
          <div class="text-h6 font-weight-bold">權限列表</div>
          <div class="text-caption text-medium-emphasis">
            系統所有功能點的權限定義
          </div>
        </div>
        <v-spacer />
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="搜尋權限..."
          single-line
          hide-details
          variant="outlined"
          density="compact"
          class="me-4"
          style="max-width: 300px"
        />
        <v-btn color="primary" prepend-icon="mdi-plus" to="/permission/create"
          >新增權限</v-btn
        >
      </v-card-title>

      <v-divider />

      <v-data-table
        :headers="headers"
        :items="permissions"
        :search="search"
        hover
      >
        <!-- 自定義代碼欄位 -->
        <template #item.code="{ item }">
          <code
            class="bg-grey-lighten-3 px-2 py-1 rounded text-caption font-weight-bold"
            >{{ item.code }}</code
          >
        </template>

        <!-- 自定義類型欄位 -->
        <template #item.type="{ item }">
          <v-chip
            :color="getTypeColor(item.type)"
            size="x-small"
            label
            variant="tonal"
            class="text-uppercase"
          >
            {{ item.type }}
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
