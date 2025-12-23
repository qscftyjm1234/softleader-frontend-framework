<script setup lang="ts">
const roles = [
  {
    name: '超級管理員 (Super Admin)',
    code: 'super_admin',
    description: '擁有系統所有權限，可進行任何操作。',
    usersCount: 2,
    permissionsCount: 'All',
    color: 'deep-purple',
    icon: 'mdi-shield-crown'
  },
  {
    name: '系統管理員 (Admin)',
    code: 'admin',
    description: '可管理會員與一般設定，無法存取敏感日誌。',
    usersCount: 5,
    permissionsCount: 42,
    color: 'primary',
    icon: 'mdi-shield-account'
  },
  {
    name: '編輯 (Editor)',
    code: 'editor',
    description: '可發布與編輯內容，無法管理使用者。',
    usersCount: 12,
    permissionsCount: 15,
    color: 'info',
    icon: 'mdi-file-edit'
  },
  {
    name: '訪客 (Guest)',
    code: 'guest',
    description: '僅擁有唯讀權限。',
    usersCount: 856,
    permissionsCount: 3,
    color: 'grey',
    icon: 'mdi-account-eye'
  }
]
</script>

<template>
  <v-container fluid>
    <div class="d-flex align-center mb-6">
      <div>
        <h1 class="text-h5 font-weight-bold">角色與權限</h1>
        <p class="text-subtitle-2 text-medium-emphasis">
          管理系統角色及其對應的權限範圍。
        </p>
      </div>
      <v-spacer />
      <v-btn color="primary" prepend-icon="mdi-plus">新增角色</v-btn>
    </div>

    <v-row>
      <v-col v-for="role in roles" :key="role.code" cols="12" md="6" lg="3">
        <v-card class="h-100 rounded-lg" elevation="2">
          <v-card-text>
            <div class="d-flex justify-space-between align-start mb-4">
              <v-avatar
                :color="role.color"
                variant="tonal"
                size="56"
                rounded="lg"
              >
                <v-icon :icon="role.icon" size="32" />
              </v-avatar>
              <v-menu>
                <template #activator="{ props }">
                  <v-btn
                    icon="mdi-dots-vertical"
                    variant="text"
                    size="small"
                    v-bind="props"
                  />
                </template>
                <v-list>
                  <v-list-item prepend-icon="mdi-pencil" title="編輯" />
                  <v-list-item prepend-icon="mdi-content-copy" title="複製" />
                  <v-list-item
                    prepend-icon="mdi-delete"
                    title="刪除"
                    color="error"
                  />
                </v-list>
              </v-menu>
            </div>

            <div class="text-h6 font-weight-bold mb-1">{{ role.name }}</div>
            <div
              class="text-caption text-medium-emphasis mb-4"
              style="min-height: 40px"
            >
              {{ role.description }}
            </div>

            <v-divider class="mb-4" />

            <div class="d-flex justify-space-between text-caption">
              <div>
                <span class="font-weight-bold">{{ role.usersCount }}</span>
                位使用者
              </div>
              <div>
                <span class="font-weight-bold">{{
                  role.permissionsCount
                }}</span>
                項權限
              </div>
            </div>

            <div class="d-flex mt-3">
              <v-avatar-group max="3">
                <v-avatar size="24" color="grey-lighten-2" />
                <v-avatar size="24" color="grey-lighten-1" />
                <v-avatar size="24" color="grey-darken-1" />
                <v-avatar size="24" color="grey-darken-2" class="text-caption"
                  >+{{ role.usersCount }}</v-avatar
                >
              </v-avatar-group>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
