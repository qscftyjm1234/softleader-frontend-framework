<script setup lang="ts">
import { ref, computed } from 'vue'
import DataPreview from '../components/DataPreview.vue'

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
  setRoles,
  setPermissions,
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
  icon: 'mdi-shield-account'
})
</script>

<template>
  <div class="inspector-container">
    <div class="page-header">
      <div class="header-main">
        <router-link
          to="/showcase"
          class="back-link"
        >
          返回
        </router-link>
        <h1 class="page-title">權限管理系統 (Permission System)</h1>
      </div>
      <p class="page-desc">
        完整的權限管理模組，提供角色驗證、功能權限控制與多重權限檢查。
        <br />
        核心特色：角色管理、權限映射、多重檢查、動態新增/移除。
      </p>
    </div>

    <!-- General Usage Section -->
    <section class="module-section">
      <h2 class="section-title">
        <span class="icon">📝</span>
        General Usage (一般使用範例)
      </h2>
      <div class="card-content">
        <p class="demo-desc">
          最常見的情境：檢查使用者是否擁有特定角色或權限。
          <br />
          使用
          <code>hasRole</code>
          、
          <code>hasPermission</code>
          方法快速驗證。
        </p>

        <div class="demo-grid">
          <div class="usage-block">
            <div class="block-header">Example Code</div>
            <div class="code-content">
              <pre><code>&lt;script setup&gt;
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
&lt;/script&gt;</code></pre>
            </div>
          </div>

          <div class="output-block">
            <DataPreview
              title="當前狀態"
              :data="{
                roles: roles,
                permissions: permissions
              }"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive Playground -->
    <section class="module-section mt-8">
      <h2 class="section-title">
        <span class="icon">🎮</span>
        Interactive Playground (互動式演示)
      </h2>
      <div class="card-content">
        <div class="method-demos">
          <!-- 1. Role Management -->
          <div class="demo-card">
            <h3 class="demo-title">1. 角色管理</h3>
            <p class="demo-desc">新增、移除角色，並查看當前角色列表。</p>

            <div class="control-row mb-4">
              <label>角色名稱:</label>
              <input
                v-model="newRole"
                type="text"
                class="input-field"
                placeholder="例如: admin, editor"
                style="width: 200px"
                @keyup.enter="handleAddRole"
              />
              <button
                class="action-btn"
                @click="handleAddRole"
              >
                新增角色
              </button>
              <button
                class="action-btn danger"
                @click="handleRemoveRole"
              >
                移除角色
              </button>
            </div>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// 新增角色
addRole('{{ newRole || "admin" }}')

// 移除角色
removeRole('{{ newRole || "admin" }}')

// 設定角色列表
setRoles(['user', 'admin'])</code></pre>
                </div>
              </div>
              <div class="output-block">
                <DataPreview
                  title="Output Results"
                  :data="{
                    currentRoles: roles,
                    roleCount: roles.length
                  }"
                />
              </div>
            </div>
          </div>

          <!-- 2. Permission Management -->
          <div class="demo-card">
            <h3 class="demo-title">2. 權限管理</h3>
            <p class="demo-desc">新增、移除權限，並查看當前權限映射表。</p>

            <div class="control-row mb-4">
              <label>權限名稱:</label>
              <input
                v-model="newPermission"
                type="text"
                class="input-field"
                placeholder="例如: delete, update"
                style="width: 200px"
                @keyup.enter="handleAddPermission"
              />
              <button
                class="action-btn"
                @click="handleAddPermission"
              >
                新增權限
              </button>
              <button
                class="action-btn danger"
                @click="handleRemovePermission"
              >
                移除權限
              </button>
            </div>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// 新增權限
addPermission('{{ newPermission || "delete" }}')

// 移除權限
removePermission('{{ newPermission || "delete" }}')

// 設定權限映射表
setPermissions({
  'read': true,
  'write': true,
  'delete': false
})</code></pre>
                </div>
              </div>
              <div class="output-block">
                <DataPreview
                  title="Output Results"
                  :data="{
                    currentPermissions: permissions,
                    permissionCount: Object.keys(permissions).length
                  }"
                />
              </div>
            </div>
          </div>

          <!-- 3. Role Checking -->
          <div class="demo-card">
            <h3 class="demo-title">3. 角色檢查</h3>
            <p class="demo-desc">檢查使用者是否擁有特定角色。</p>

            <div class="control-row mb-4">
              <label>檢查角色:</label>
              <input
                v-model="checkRole"
                type="text"
                class="input-field"
                placeholder="例如: admin"
                style="width: 200px"
              />
            </div>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// 檢查單一角色
hasRole('{{ checkRole }}')

// 檢查多個角色（任一）
hasAnyRole(['admin', 'user', 'guest'])

// 檢查多個角色（全部）
hasAllRoles(['admin', 'user', 'guest'])</code></pre>
                </div>
              </div>
              <div class="output-block">
                <DataPreview
                  title="Check Results"
                  :data="{
                    hasRole: roleCheckResult,
                    hasAnyRole: multipleRolesCheck.hasAnyRole,
                    hasAllRoles: multipleRolesCheck.hasAllRoles
                  }"
                />
              </div>
            </div>
          </div>

          <!-- 4. Permission Checking -->
          <div class="demo-card">
            <h3 class="demo-title">4. 權限檢查</h3>
            <p class="demo-desc">檢查使用者是否擁有特定權限。</p>

            <div class="control-row mb-4">
              <label>檢查權限:</label>
              <input
                v-model="checkPermission"
                type="text"
                class="input-field"
                placeholder="例如: delete"
                style="width: 200px"
              />
            </div>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// 檢查單一權限
hasPermission('{{ checkPermission }}')

// 檢查多個權限（任一）
hasAnyPermission(['read', 'write', 'delete'])

// 檢查多個權限（全部）
hasAllPermissions(['read', 'write', 'delete'])</code></pre>
                </div>
              </div>
              <div class="output-block">
                <DataPreview
                  title="Check Results"
                  :data="{
                    hasPermission: permissionCheckResult,
                    hasAnyPermission: multiplePermissionsCheck.hasAnyPermission,
                    hasAllPermissions: multiplePermissionsCheck.hasAllPermissions
                  }"
                />
              </div>
            </div>
          </div>

          <!-- 5. Clear All -->
          <div class="demo-card">
            <h3 class="demo-title">5. 清除所有資料</h3>
            <p class="demo-desc">清除所有角色和權限。</p>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// 清除所有角色和權限
clear()</code></pre>
                </div>
              </div>
              <div class="output-block">
                <button
                  class="action-btn danger"
                  style="margin-top: 1rem"
                  @click="clear"
                >
                  清除所有角色和權限
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.inspector-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
  color: #333;
}

.page-header {
  margin-bottom: 2rem;
}

.header-main {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.back-link {
  text-decoration: none;
  color: #666;
  margin-right: 1rem;
  padding: 0.5rem 1rem;
  background: #f0f0f0;
  border-radius: 4px;
  transition: all 0.2s;
}

.back-link:hover {
  background: #e0e0e0;
}

.page-title {
  font-size: 2rem;
  font-weight: 500;
  margin: 0;
}

.page-desc {
  color: #666;
  margin-left: 0.5rem;
  line-height: 1.5;
}

.module-section {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
}

.section-title {
  padding: 1rem 1.5rem;
  background: #fafafa;
  border-bottom: 1px solid #eee;
  margin: 0;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
}

.icon {
  margin-right: 0.5rem;
}

.card-content {
  padding: 1.5rem;
}

.demo-desc {
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
}

.control-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.control-row label {
  font-size: 0.9rem;
  font-weight: 500;
  color: #555;
}

.input-field {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  flex: 1;
}

.method-demos {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.demo-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0.75rem;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

.demo-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.15rem 0;
  color: #2c3e50;
  display: flex;
  align-items: center;
}

.demo-title::before {
  content: '';
  display: inline-block;
  width: 3px;
  height: 1.1em;
  background: #3498db;
  margin-right: 0.5rem;
  border-radius: 2px;
}

.demo-grid {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.usage-block,
.output-block {
  display: flex;
  flex-direction: column;
}

.block-header {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #888;
  margin-bottom: 0.15rem;
  font-weight: 600;
}

.code-content {
  background: #282c34;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
  color: #e06c75;
  line-height: 1.25;
  max-height: 360px;
}

.code-content pre {
  margin: 0;
}

.code-content code {
  color: #abb2bf;
}

.action-btn {
  background: #0d6efd;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  font-size: 0.9rem;
}

.action-btn:hover {
  opacity: 0.9;
}

.action-btn.danger {
  background: #dc3545;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mt-8 {
  margin-top: 2rem;
}
</style>
