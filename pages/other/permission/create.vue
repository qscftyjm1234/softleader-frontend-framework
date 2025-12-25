<script setup lang="ts">
const formData = ref({
  name: '',
  code: '',
  description: '',
  module: 'user',
  isSystem: false
})

const modules = [
  { title: '會員模組 (User)', value: 'user' },
  { title: '權限模組 (Permission)', value: 'permission' },
  { title: '訂單模組 (Order)', value: 'order' },
  { title: '系統設定 (System)', value: 'system' }
]
</script>

<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
        lg="6"
      >
        <v-card
          class="rounded-lg"
          elevation="2"
        >
          <v-card-title class="d-flex align-center py-4 px-6 border-b">
            <v-icon
              icon="mdi-shield-plus"
              start
              color="primary"
            />
            <div>
              <div class="text-h6 font-weight-bold">新增權限</div>
              <div class="text-caption text-medium-emphasis">定義新的系統操作權限點</div>
            </div>
          </v-card-title>

          <v-card-text class="pt-6">
            <v-form>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="formData.name"
                    label="權限名稱"
                    placeholder="例如：刪除訂單"
                    variant="outlined"
                    density="comfortable"
                    color="primary"
                    hint="顯示在權限列表的名稱"
                    persistent-hint
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="formData.code"
                    label="權限代碼 (Key)"
                    placeholder="例如：order.delete"
                    variant="outlined"
                    density="comfortable"
                    prepend-inner-icon="mdi-code-tags"
                    color="primary"
                    class="font-monospace"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-select
                    v-model="formData.module"
                    :items="modules"
                    label="所屬模組"
                    variant="outlined"
                    density="comfortable"
                    color="primary"
                  />
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    v-model="formData.description"
                    label="功能描述"
                    placeholder="說明此權限的用途與影響範圍..."
                    variant="outlined"
                    rows="3"
                    color="primary"
                  />
                </v-col>

                <v-col cols="12">
                  <v-alert
                    v-if="formData.code.startsWith('system')"
                    type="warning"
                    variant="tonal"
                    icon="mdi-alert"
                    class="mb-2"
                  >
                    注意：修改系統層級的權限可能會影響核心功能運作。
                  </v-alert>
                  <v-checkbox
                    v-model="formData.isSystem"
                    label="設為系統核心權限 (無法刪除)"
                    color="error"
                    hide-details
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>

          <v-divider />

          <v-card-actions class="pa-6">
            <v-spacer />
            <v-btn
              variant="text"
              color="grey-darken-1"
              to="/permission/list"
            >
              取消
            </v-btn>
            <v-btn
              color="primary"
              variant="flat"
              prepend-icon="mdi-content-save"
            >
              儲存設定
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
