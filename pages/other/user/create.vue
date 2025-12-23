<script setup lang="ts">
const formData = ref({
  name: '',
  email: '',
  password: '',
  role: 'user',
  status: true,
  bio: '',
  notifications: {
    email: true,
    sms: false
  }
})

const roles = [
  { title: '一般會員', value: 'user' },
  { title: '編輯人員', value: 'editor' },
  { title: '管理員', value: 'admin' }
]
</script>

<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card class="rounded-lg" elevation="2">
          <v-card-title class="d-flex align-center py-4 px-6 border-b">
            <v-icon icon="mdi-account-plus" start color="primary" />
            <div>
              <div class="text-h6 font-weight-bold">新增會員</div>
              <div class="text-caption text-medium-emphasis">
                建立新的使用者帳號並設定權限
              </div>
            </div>
            <v-spacer />
            <v-btn variant="text" icon="mdi-close" to="/user/list" />
          </v-card-title>

          <v-card-text class="pt-6">
            <v-form>
              <!-- 基本資訊區塊 -->
              <div class="text-subtitle-1 font-weight-bold mb-2 text-primary">
                基本資訊
              </div>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formData.name"
                    label="姓名"
                    placeholder="請輸入真實姓名"
                    variant="outlined"
                    density="comfortable"
                    prepend-inner-icon="mdi-account"
                    color="primary"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formData.email"
                    label="電子郵件"
                    placeholder="example@domain.com"
                    variant="outlined"
                    density="comfortable"
                    prepend-inner-icon="mdi-email"
                    color="primary"
                    type="email"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formData.password"
                    label="密碼"
                    placeholder="設定登入密碼"
                    variant="outlined"
                    density="comfortable"
                    prepend-inner-icon="mdi-lock"
                    color="primary"
                    type="password"
                    hint="至少包含 8 個字元"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="formData.role"
                    :items="roles"
                    label="系統角色"
                    variant="outlined"
                    density="comfortable"
                    prepend-inner-icon="mdi-shield-account"
                    color="primary"
                  />
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="formData.bio"
                    label="備註 / 簡介"
                    placeholder="關於此使用者的其他資訊..."
                    variant="outlined"
                    rows="3"
                    color="primary"
                  />
                </v-col>
              </v-row>

              <v-divider class="my-6" />

              <!-- 設定與狀態區塊 -->
              <div class="text-subtitle-1 font-weight-bold mb-2 text-primary">
                帳號設定
              </div>
              <v-row>
                <v-col cols="12" md="6">
                  <v-switch
                    v-model="formData.status"
                    color="success"
                    label="啟用帳號"
                    hide-details
                    inset
                  >
                    <template #label>
                      <div>
                        <div class="font-weight-bold">啟用帳號</div>
                        <div class="text-caption">
                          使用者建立後是否可立即登入
                        </div>
                      </div>
                    </template>
                  </v-switch>
                </v-col>
                <v-col cols="12" md="6">
                  <v-switch
                    v-model="formData.notifications.email"
                    color="primary"
                    label="接收 Email 通知"
                    hide-details
                    inset
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>

          <v-divider />

          <v-card-actions class="pa-6 bg-grey-lighten-5">
            <v-spacer />
            <v-btn
              variant="outlined"
              color="grey-darken-1"
              class="me-2"
              to="/user/list"
              >取消</v-btn
            >
            <v-btn
              color="primary"
              variant="flat"
              size="large"
              prepend-icon="mdi-check"
              >確認建立</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
