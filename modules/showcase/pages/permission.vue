<script setup lang="ts">
import { ref, computed } from 'vue'
import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'

const {
  hasRole,
  hasPermission,
  hasAllRoles,
  hasAnyRole,
  hasAllPermissions,
  hasAnyPermission,
  addRole,
  removeRole,
  addPermission,
  removePermission,
  clear,
  roles,
  permissions
} = usePermission({
  roles: ['user'],
  permissions: {
    read: true,
    write: false
  }
})

// Demo state
const newRole = ref('')
const newPermission = ref('')
const checkRole = ref('admin')
const checkPermission = ref('delete')

// Computed examples
const roleCheckResult = computed(() => hasRole(checkRole.value))
const permissionCheckResult = computed(() => hasPermission(checkPermission.value))
const multipleRolesCheck = computed(() => ({
  hasAnyRole: hasAnyRole(['admin', 'user', 'guest']),
  hasAllRoles: hasAllRoles(['admin', 'user', 'guest'])
}))
const multiplePermissionsCheck = computed(() => ({
  hasAnyPermission: hasAnyPermission(['read', 'write', 'delete']),
  hasAllPermissions: hasAllPermissions(['read', 'write', 'delete'])
}))

const handleAddRole = () => {
  if (newRole.value) {
    addRole(newRole.value)
    newRole.value = ''
  }
}

const handleRemoveRole = () => {
  if (newRole.value) {
    removeRole(newRole.value)
    newRole.value = ''
  }
}

const handleAddPermission = () => {
  if (newPermission.value) {
    addPermission(newPermission.value)
    newPermission.value = ''
  }
}

const handleRemovePermission = () => {
  if (newPermission.value) {
    removePermission(newPermission.value)
    newPermission.value = ''
  }
}

definePageMeta({
  title: '權限管理 (Permission)',
  icon: 'mdi-shield-account',
  layout: 'portal'
})
</script>

<template>
  <ShowcasePage
    title="權限管理系統 (Permission System)"
    description="完整的權限管理模組，提供角色驗證、功能權限控制與多重權限檢查。核心特色包含角色管理、權限映射、多重檢查、動態新增/移除。"
  >
    <!-- General Usage Section -->
    <ShowcaseSection
      title="General Usage (一般使用範例)"
      icon="📝"
    >
      <div class="text-slate-400 leading-relaxed mb-4">
        最常見的情境：檢查使用者是否擁有特定角色或權限。 使用
        <code class="bg-slate-800/50 px-1.5 py-0.5 rounded text-sky-300 font-mono text-sm">
          hasRole
        </code>
        、
        <code class="bg-slate-800/50 px-1.5 py-0.5 rounded text-sky-300 font-mono text-sm">
          hasPermission
        </code>
        方法快速驗證。
      </div>

      <div class="component-grid">
        <ShowcaseCard
          title="Basic Usage"
          description="基本權限檢查與狀態檢視"
          full-width
        >
          <div class="flex gap-4 flex-col lg:flex-row">
            <div class="flex-1">
              <ShowcaseCodeBlock
                code="<script setup>
// 1. 引入 composable
const { hasRole, hasPermission, addRole, addPermission } = usePermission({
  roles: ['user'],
  permissions: { 'read': true }
})

// 2. 檢查角色
if (hasRole('admin')) {
  console.log('使用者是管理員')
}

// 3. 檢查權限
if (hasPermission('delete')) {
  console.log('使用者有刪除權限')
}

// 4. 新增角色和權限
addRole('editor')
addPermission('write')
</script>"
                label="Implementation"
              />
            </div>
            <div class="flex-1">
              <ShowcaseCodeBlock
                :code="JSON.stringify({ roles, permissions }, null, 2)"
                language="json"
                label="Current State"
              />
            </div>
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- Interactive Playground -->
    <ShowcaseSection
      title="Interactive Playground (互動式演示)"
      icon="🎮"
    >
      <div class="component-grid">
        <!-- 1. Role Management -->
        <ShowcaseCard
          title="1. Role Management (角色管理)"
          description="新增、移除角色，並查看當前角色列表"
        >
          <div class="flex items-center mb-4 gap-2">
            <input
              v-model="newRole"
              type="text"
              class="glass-input flex-1 min-w-0"
              placeholder="例如: admin, editor"
              @keyup.enter="handleAddRole"
            />
            <button
              class="glass-btn primary"
              @click="handleAddRole"
            >
              新增
            </button>
            <button
              class="glass-btn danger"
              @click="handleRemoveRole"
            >
              移除
            </button>
          </div>

          <ShowcaseCodeBlock
            :code="JSON.stringify({ currentRoles: roles, roleCount: roles.length }, null, 2)"
            language="json"
            label="Output Results"
          />

          <template #footer>
            <ShowcaseCodeBlock
              :code="`// 新增/移除角色
addRole('${newRole || 'admin'}')
removeRole('${newRole || 'admin'}')`"
              label="Usage Code"
            />
          </template>
        </ShowcaseCard>

        <!-- 2. Permission Management -->
        <ShowcaseCard
          title="2. Permission Management (權限管理)"
          description="新增、移除權限，並查看當前權限映射表"
        >
          <div class="flex items-center mb-4 gap-2">
            <input
              v-model="newPermission"
              type="text"
              class="glass-input flex-1 min-w-0"
              placeholder="例如: delete, update"
              @keyup.enter="handleAddPermission"
            />
            <button
              class="glass-btn primary"
              @click="handleAddPermission"
            >
              新增
            </button>
            <button
              class="glass-btn danger"
              @click="handleRemovePermission"
            >
              移除
            </button>
          </div>

          <ShowcaseCodeBlock
            :code="
              JSON.stringify(
                {
                  currentPermissions: permissions,
                  permissionCount: Object.keys(permissions).length
                },
                null,
                2
              )
            "
            language="json"
            label="Output Results"
          />

          <template #footer>
            <ShowcaseCodeBlock
              :code="`// 新增/移除權限
addPermission('${newPermission || 'delete'}')
removePermission('${newPermission || 'delete'}')`"
              label="Usage Code"
            />
          </template>
        </ShowcaseCard>

        <!-- 3. Role Checking -->
        <ShowcaseCard
          title="3. Role Checking (角色檢查)"
          description="檢查使用者是否擁有特定角色"
        >
          <div class="flex items-center mb-4 gap-2">
            <label class="text-slate-300 whitespace-nowrap">Check Role:</label>
            <input
              v-model="checkRole"
              type="text"
              class="glass-input flex-1 min-w-0"
              placeholder="例如: admin"
            />
          </div>

          <div
            class="font-mono text-slate-200 text-sm p-3 bg-slate-900/50 rounded-md border border-slate-700/10 mb-3"
          >
            hasRole('{{ checkRole }}'):
            <strong class="text-sky-400">{{ roleCheckResult }}</strong>
          </div>

          <ShowcaseCodeBlock
            :code="
              JSON.stringify(
                {
                  hasAnyRole: multipleRolesCheck.hasAnyRole,
                  hasAllRoles: multipleRolesCheck.hasAllRoles
                },
                null,
                2
              )
            "
            language="json"
            label="Multiple Checks Result"
          />

          <template #footer>
            <ShowcaseCodeBlock
              :code="`// 檢查角色
hasRole('${checkRole}')
hasAnyRole(['admin', 'user', 'guest']) // Result: ${multipleRolesCheck.hasAnyRole}
hasAllRoles(['admin', 'user', 'guest']) // Result: ${multipleRolesCheck.hasAllRoles}`"
              label="Usage Code"
            />
          </template>
        </ShowcaseCard>

        <!-- 4. Permission Checking -->
        <ShowcaseCard
          title="4. Permission Checking (權限檢查)"
          description="檢查使用者是否擁有特定權限"
        >
          <div class="flex items-center mb-4 gap-2">
            <label class="text-slate-300 whitespace-nowrap">Check Permission:</label>
            <input
              v-model="checkPermission"
              type="text"
              class="glass-input flex-1 min-w-0"
              placeholder="例如: delete"
            />
          </div>

          <div
            class="font-mono text-slate-200 text-sm p-3 bg-slate-900/50 rounded-md border border-slate-700/10 mb-3"
          >
            hasPermission('{{ checkPermission }}'):
            <strong class="text-sky-400">{{ permissionCheckResult }}</strong>
          </div>

          <ShowcaseCodeBlock
            :code="
              JSON.stringify(
                {
                  hasAnyPermission: multiplePermissionsCheck.hasAnyPermission,
                  hasAllPermissions: multiplePermissionsCheck.hasAllPermissions
                },
                null,
                2
              )
            "
            language="json"
            label="Multiple Checks Result"
          />

          <template #footer>
            <ShowcaseCodeBlock
              :code="`// 檢查權限
hasPermission('${checkPermission}')
hasAnyPermission(['read', 'write', 'delete']) // Result: ${multiplePermissionsCheck.hasAnyPermission}
hasAllPermissions(['read', 'write', 'delete']) // Result: ${multiplePermissionsCheck.hasAllPermissions}`"
              label="Usage Code"
            />
          </template>
        </ShowcaseCard>

        <!-- 5. Clear All -->
        <ShowcaseCard
          title="5. Clear All (清除所有資料)"
          description="清除所有角色和權限"
        >
          <div class="mb-4">
            <button
              class="glass-btn danger w-full"
              @click="clear"
            >
              清除所有角色和權限
            </button>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="// 清除所有角色和權限
clear()"
              label="Usage Code"
            />
          </template>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>
  </ShowcasePage>
</template>

<style scoped>
.glass-input {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.3);
  color: #f1f5f9;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  outline: none;
  font-size: 0.9rem;
  min-width: 200px;
}

.glass-input:focus {
  border-color: #38bdf8;
  background: rgba(15, 23, 42, 0.8);
}

.glass-btn {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.3);
  color: #e2e8f0;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
}

.glass-btn:hover {
  background: rgba(51, 65, 85, 0.8);
  border-color: #94a3b8;
}

.glass-btn.primary {
  background: rgba(56, 189, 248, 0.2);
  border-color: rgba(56, 189, 248, 0.5);
  color: #38bdf8;
}

.glass-btn.primary:hover {
  background: rgba(56, 189, 248, 0.3);
  box-shadow: 0 0 10px rgba(56, 189, 248, 0.2);
}

.glass-btn.danger {
  background: rgba(239, 68, 68, 0.2);
  border-color: rgba(239, 68, 68, 0.5);
  color: #ef4444;
}

.glass-btn.danger:hover {
  background: rgba(239, 68, 68, 0.3);
  box-shadow: 0 0 10px rgba(239, 68, 68, 0.2);
}
</style>
