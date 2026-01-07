<script setup lang="ts">
import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'

definePageMeta({
  title: '開發規矩',
  icon: 'mdi-ruler-square',
  layout: 'portal'
})
</script>

<template>
  <ShowcasePage
    title="開發規矩 (Development Rules)"
    description="統一的開發規範，讓團隊協作更順暢。"
    class="fade-in-up"
  >
    <!-- 1. Naming Conventions -->
    <ShowcaseSection
      title="命名規則"
      icon="mdi-format-letter-case"
      class="stagger-1"
    >
      <ShowcaseCard
        title="變數與函式命名"
        description="請跟著這樣寫，不然 ESLint 會報錯喔。"
        full-width
      >
        <!-- Dev Context Block -->
        <div class="dev-context mb-6">
          <div class="context-item">
            <span class="label">設定檔案:</span>
            <code class="value">eslint.config.mjs</code>
          </div>
          <div class="context-item">
            <span class="label">執行檢查:</span>
            <code class="value">npm run lint</code>
          </div>
          <div class="context-item">
            <span class="label">規則名稱:</span>
            <code class="value">@typescript-eslint/naming-convention</code>
          </div>
        </div>

        <div class="naming-rules">
          <!-- Rule 1: Boolean -->
          <div class="rule-item">
            <div class="rule-meta">
              <span class="rule-type">Boolean</span>
              <span class="rule-desc">如果是 Yes/No</span>
              <div class="config-source">
                <v-icon
                  size="12"
                  color="slate-400"
                >
                  mdi-target
                </v-icon>
                <span>selector: 'variable' (types: boolean)</span>
              </div>
            </div>
            <div class="rule-content">
              <div class="rule-syntax">
                <span class="keyword">is</span>
                <span class="divider">/</span>
                <span class="keyword">should</span>
                <span class="divider">/</span>
                <span class="keyword">has</span>
                <span class="divider">/</span>
                <span class="keyword">can</span>
                <span class="divider">/</span>
                <span class="keyword">did</span>
                <span class="divider">/</span>
                <span class="keyword">will</span>
              </div>
              <div class="rule-examples">
                <span class="good">isValid</span>
                <span class="good">hasPermission</span>
                <span class="bad">valid</span>
                <span class="bad">permission</span>
              </div>
            </div>
          </div>

          <!-- Rule 2: Class / Interface -->
          <div class="rule-item">
            <div class="rule-meta">
              <span class="rule-type">Class / Interface</span>
              <span class="rule-desc">類別與介面</span>
              <div class="config-source">
                <v-icon
                  size="12"
                  color="slate-400"
                >
                  mdi-file-cog
                </v-icon>
                <span>eslint: naming-convention</span>
              </div>
            </div>
            <div class="rule-content">
              <div class="rule-syntax">
                <span class="keyword">PascalCase</span>
                <p class="text-xs text-slate-400 mt-1 font-sans font-normal">(大寫開頭)</p>
              </div>
              <div class="rule-examples">
                <span class="good">UserInterface</span>
                <span class="bad">userInterface</span>
              </div>
            </div>
          </div>

          <!-- Rule 3: Function -->
          <div class="rule-item">
            <div class="rule-meta">
              <span class="rule-type">Function</span>
              <span class="rule-desc">函式命名</span>
              <div class="config-source">
                <v-icon
                  size="12"
                  color="slate-400"
                >
                  mdi-target
                </v-icon>
                <span>selector: 'function'</span>
              </div>
            </div>
            <div class="rule-content">
              <div class="rule-syntax">
                <span class="keyword">動詞開頭</span>
                <p class="text-xs text-slate-400 mt-1 font-sans font-normal">
                  單一動作: get / set / fetch / handle / click / submit / validate / create / update
                  / delete / toggle / show / hide / open / close / add / remove / clear / reset
                </p>
                <p class="text-xs text-emerald-400 mt-2 font-sans font-normal">
                  流程性: initialize / init / process / execute / perform / complete / setup / run /
                  check / verify / on
                </p>
              </div>
              <div class="rule-examples">
                <span class="good">getUserData</span>
                <span class="good">handleClick</span>
                <span class="good">processPayment</span>
                <span class="good">initializeApp</span>
                <span class="bad">userData</span>
                <span class="bad">payment</span>
              </div>
            </div>
          </div>

          <!-- Rule 4: Constants -->
          <div class="rule-item">
            <div class="rule-meta">
              <span class="rule-type">Constants</span>
              <span class="rule-desc">常數</span>
              <div class="config-source">
                <v-icon
                  size="12"
                  color="slate-400"
                >
                  mdi-file-cog
                </v-icon>
                <span>eslint: naming-convention</span>
              </div>
            </div>
            <div class="rule-content">
              <div class="rule-syntax">
                <span class="keyword">UPPER_SNAKE_CASE</span>
                <p class="text-xs text-slate-400 mt-1 font-sans font-normal">(全大寫 + 底線)</p>
              </div>
              <div class="rule-examples">
                <span class="good">MAX_COUNT</span>
                <span class="good">API_BASE_URL</span>
                <span class="bad">maxCount</span>
                <span class="bad">apiBaseUrl</span>
              </div>
            </div>
          </div>
        </div>
      </ShowcaseCard>
    </ShowcaseSection>

    <!-- 2. File Organization -->
    <ShowcaseSection
      title="資料夾功能"
      icon="mdi-folder-outline"
      class="stagger-2"
    >
      <div class="folder-grid">
        <!-- Pages -->
        <div class="folder-card">
          <div class="folder-header">
            <div class="folder-identity">
              <v-icon
                color="blue-400"
                size="24"
                class="folder-icon"
              >
                mdi-file-document-multiple
              </v-icon>
              <span class="folder-name">pages/</span>
            </div>
            <span class="naming-badge">kebab-case</span>
          </div>
          <div class="folder-body">
            <p class="folder-desc">頁面路由 - Nuxt 自動生成</p>
            <div class="folder-examples">
              <div class="example-row valid">
                <v-icon
                  size="14"
                  color="emerald-400"
                >
                  mdi-check
                </v-icon>
                <span>user-profile.vue</span>
              </div>
              <div class="example-row invalid">
                <v-icon
                  size="14"
                  color="red-400"
                >
                  mdi-close
                </v-icon>
                <span>UserProfile.vue</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Layouts -->
        <div class="folder-card">
          <div class="folder-header">
            <div class="folder-identity">
              <v-icon
                color="purple-400"
                size="24"
                class="folder-icon"
              >
                mdi-page-layout-header
              </v-icon>
              <span class="folder-name">layouts/</span>
            </div>
            <span class="naming-badge">kebab-case</span>
          </div>
          <div class="folder-body">
            <p class="folder-desc">共用的頁面與版型框架</p>
            <div class="folder-examples">
              <div class="example-row valid">
                <v-icon
                  size="14"
                  color="emerald-400"
                >
                  mdi-check
                </v-icon>
                <span>default.vue</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Components (Special Card) -->
        <div class="folder-card">
          <div class="folder-header">
            <div class="folder-identity">
              <v-icon
                color="green-400"
                size="24"
                class="folder-icon"
              >
                mdi-puzzle
              </v-icon>
              <span class="folder-name">components/</span>
            </div>
            <span class="naming-badge mixed">Mixed</span>
          </div>
          <div class="folder-body">
            <p class="folder-desc mb-4">UI 元件庫 - 依類型區分資料夾</p>
            <div class="sub-folders">
              <div class="sub-folder-item">
                <div class="sub-folder-head">
                  <span class="sub-name">uiInterface/</span>
                  <span class="naming-badge sm">I + PascalCase</span>
                </div>
                <div class="sub-desc">純 UI 元件 (IButton.vue)</div>
              </div>
              <div class="sub-folder-item">
                <div class="sub-folder-head">
                  <span class="sub-name">uiBusiness/</span>
                  <span class="naming-badge sm">PascalCase</span>
                </div>
                <div class="sub-desc">業務 UI 元件 (UserCard.vue)</div>
              </div>
              <div class="sub-folder-item">
                <div class="sub-folder-head">
                  <span class="sub-name">business/</span>
                  <span class="naming-badge sm">PascalCase</span>
                </div>
                <div class="sub-desc">業務邏輯元件 (GlobalSnackbar)</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Composables -->
        <div class="folder-card">
          <div class="folder-header">
            <div class="folder-identity">
              <v-icon
                color="blue-400"
                size="24"
                class="folder-icon"
              >
                mdi-function-variant
              </v-icon>
              <span class="folder-name">composables/</span>
            </div>
            <span class="naming-badge">camelCase</span>
          </div>
          <div class="folder-body">
            <p class="folder-desc">共用邏輯 (Composition API)</p>
            <div class="folder-examples">
              <div class="example-row valid">
                <v-icon
                  size="14"
                  color="emerald-400"
                >
                  mdi-check
                </v-icon>
                <span>useAuth.ts</span>
              </div>
              <div class="example-row invalid">
                <v-icon
                  size="14"
                  color="red-400"
                >
                  mdi-close
                </v-icon>
                <span>auth.ts</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Stores -->
        <div class="folder-card">
          <div class="folder-header">
            <div class="folder-identity">
              <v-icon
                color="pink-400"
                size="24"
                class="folder-icon"
              >
                mdi-database
              </v-icon>
              <span class="folder-name">stores/</span>
            </div>
            <span class="naming-badge">camelCase</span>
          </div>
          <div class="folder-body">
            <p class="folder-desc">全域狀態管理 (Pinia)</p>
            <div class="folder-examples">
              <div class="example-row valid">
                <v-icon
                  size="14"
                  color="emerald-400"
                >
                  mdi-check
                </v-icon>
                <span>user.ts</span>
              </div>
              <div class="example-row invalid">
                <v-icon
                  size="14"
                  color="red-400"
                >
                  mdi-close
                </v-icon>
                <span>userStore.ts</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Core -->
        <div class="folder-card">
          <div class="folder-header">
            <div class="folder-identity">
              <v-icon
                color="orange-400"
                size="24"
                class="folder-icon"
              >
                mdi-cog
              </v-icon>
              <span class="folder-name">core/</span>
            </div>
            <span class="naming-badge">camelCase</span>
          </div>
          <div class="folder-body">
            <p class="folder-desc">系統核心功能與設定</p>
            <div class="folder-examples">
              <div class="example-row valid">
                <v-icon
                  size="14"
                  color="emerald-400"
                >
                  mdi-check
                </v-icon>
                <span>client.ts</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Repositories -->
        <div class="folder-card">
          <div class="folder-header">
            <div class="folder-identity">
              <v-icon
                color="teal-400"
                size="24"
                class="folder-icon"
              >
                mdi-source-repository
              </v-icon>
              <span class="folder-name">repositories/</span>
            </div>
            <span class="naming-badge">camelCase</span>
          </div>
          <div class="folder-body">
            <p class="folder-desc">API 資料層封裝 (+Repo)</p>
            <div class="folder-examples">
              <div class="example-row valid">
                <v-icon
                  size="14"
                  color="emerald-400"
                >
                  mdi-check
                </v-icon>
                <span>userRepo.ts</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Modules -->
        <div class="folder-card">
          <div class="folder-header">
            <div class="folder-identity">
              <v-icon
                color="amber-400"
                size="24"
                class="folder-icon"
              >
                mdi-folder-open
              </v-icon>
              <span class="folder-name">modules/</span>
            </div>
            <span class="naming-badge">kebab-case</span>
          </div>
          <div class="folder-body">
            <p class="folder-desc">獨立功能模組分類</p>
            <div class="folder-examples">
              <div class="example-row valid">
                <v-icon
                  size="14"
                  color="emerald-400"
                >
                  mdi-check
                </v-icon>
                <span>showcase/</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Utils -->
        <div class="folder-card">
          <div class="folder-header">
            <div class="folder-identity">
              <v-icon
                color="cyan-400"
                size="24"
                class="folder-icon"
              >
                mdi-toolbox
              </v-icon>
              <span class="folder-name">utils/</span>
            </div>
            <span class="naming-badge">camelCase</span>
          </div>
          <div class="folder-body">
            <p class="folder-desc">純共用工具函式</p>
            <div class="folder-examples">
              <div class="example-row valid">
                <v-icon
                  size="14"
                  color="emerald-400"
                >
                  mdi-check
                </v-icon>
                <span>formatDate.ts</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Types -->
        <div class="folder-card">
          <div class="folder-header">
            <div class="folder-identity">
              <v-icon
                color="indigo-400"
                size="24"
                class="folder-icon"
              >
                mdi-code-braces
              </v-icon>
              <span class="folder-name">types/</span>
            </div>
            <span class="naming-badge">PascalCase</span>
          </div>
          <div class="folder-body">
            <p class="folder-desc">TypeScript 型別定義</p>
            <div class="folder-examples">
              <div class="example-row valid">
                <v-icon
                  size="14"
                  color="emerald-400"
                >
                  mdi-check
                </v-icon>
                <span>UserData.ts</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Assets -->
        <div class="folder-card">
          <div class="folder-header">
            <div class="folder-identity">
              <v-icon
                color="lime-400"
                size="24"
                class="folder-icon"
              >
                mdi-image-multiple
              </v-icon>
              <span class="folder-name">assets/</span>
            </div>
            <span class="naming-badge">kebab-case</span>
          </div>
          <div class="folder-body">
            <p class="folder-desc">靜態資源 (SCSS, Images)</p>
          </div>
        </div>

        <!-- Public -->
        <div class="folder-card">
          <div class="folder-header">
            <div class="folder-identity">
              <v-icon
                color="grey-400"
                size="24"
                class="folder-icon"
              >
                mdi-folder-open-outline
              </v-icon>
              <span class="folder-name">public/</span>
            </div>
            <span class="naming-badge gray">Original</span>
          </div>
          <div class="folder-body">
            <p class="folder-desc">公開資源 (favicon.ico)</p>
          </div>
        </div>
      </div>
    </ShowcaseSection>

    <!-- 3. TypeScript Rules -->
    <ShowcaseSection
      title="TypeScript 使用規則"
      icon="mdi-language-typescript"
      class="stagger-3"
    >
      <ShowcaseCard
        title="型別標註規範"
        description="什麼時候要寫型別,什麼時候可以省略"
        full-width
      >
        <div class="ts-rules-grid">
          <div class="ts-rule-card">
            <div class="ts-rule-header">
              <v-icon
                size="20"
                color="emerald-400"
              >
                mdi-check-circle
              </v-icon>
              <span class="ts-rule-title">必須明確標註型別</span>
            </div>
            <ul class="ts-rule-list">
              <li>函式參數</li>
              <li>函式回傳值 (除非是 void)</li>
              <li>公開的 API 介面</li>
              <li>複雜的物件結構</li>
            </ul>
            <ShowcaseCodeBlock
              code="// ✅ 正確
function getUser(id: number): Promise<User> {
  return api.get(`/users/${id}`)
}

// ✅ 正確
const handleSubmit = (data: FormData): void => {
  console.log(data)
}"
              language="typescript"
            />
          </div>

          <div class="ts-rule-card">
            <div class="ts-rule-header">
              <v-icon
                size="20"
                color="blue-400"
              >
                mdi-information
              </v-icon>
              <span class="ts-rule-title">可以省略型別</span>
            </div>
            <ul class="ts-rule-list">
              <li>變數初始化時 (型別推斷)</li>
              <li>簡單的箭頭函式</li>
              <li>迴圈變數</li>
            </ul>
            <ShowcaseCodeBlock
              code="// ✅ 正確 (型別推斷)
const count = 0  // number
const name = 'John'  // string
const isActive = true  // boolean

// ✅ 正確
const double = (n: number) => n * 2"
              language="typescript"
            />
          </div>

          <div class="ts-rule-card">
            <div class="ts-rule-header">
              <v-icon
                size="20"
                color="red-400"
              >
                mdi-close-circle
              </v-icon>
              <span class="ts-rule-title">禁止使用</span>
              <div class="config-source ml-2">
                <span>eslint: no-explicit-any</span>
              </div>
            </div>
            <ul class="ts-rule-list">
              <li>
                <code>any</code>
                型別 (除非必要)
              </li>
              <li>
                <code>@ts-ignore</code>
                註解
              </li>
              <li>
                型別斷言
                <code>as any</code>
              </li>
            </ul>
            <ShowcaseCodeBlock
              code="// ❌ 錯誤
function process(data: any) {
  return data
}

// ✅ 正確
function process(data: unknown) {
  if (typeof data === 'string') {
    return data.toUpperCase()
  }
}"
              language="typescript"
            />
          </div>
        </div>
      </ShowcaseCard>

      <ShowcaseCard
        title="介面與型別定義"
        description="Interface vs Type 的使用時機"
        full-width
      >
        <div class="ts-comparison">
          <div class="ts-comparison-item">
            <div class="ts-comparison-header">
              <v-icon
                size="20"
                color="purple-400"
              >
                mdi-code-braces
              </v-icon>
              <span class="ts-comparison-title">使用 Interface</span>
            </div>
            <div class="ts-comparison-when">
              <v-icon
                size="16"
                color="purple-300"
              >
                mdi-arrow-right
              </v-icon>
              <span>適用於: 物件結構、類別、可擴展的定義</span>
            </div>
            <ShowcaseCodeBlock
              code="// ✅ 使用 Interface
interface User {
  id: number
  name: string
  email: string
}

// 可以擴展
interface AdminUser extends User {
  role: 'admin'
  permissions: string[]
}"
              language="typescript"
            />
          </div>

          <div class="ts-comparison-item">
            <div class="ts-comparison-header">
              <v-icon
                size="20"
                color="amber-400"
              >
                mdi-format-letter-case
              </v-icon>
              <span class="ts-comparison-title">使用 Type</span>
            </div>
            <div class="ts-comparison-when">
              <v-icon
                size="16"
                color="amber-300"
              >
                mdi-arrow-right
              </v-icon>
              <span>適用於: 聯合型別、交集型別、工具型別</span>
            </div>
            <ShowcaseCodeBlock
              code="// ✅ 使用 Type
type Status = 'pending' | 'success' | 'error'

type ID = string | number

type ApiResponse<T> = {
  data: T
  status: number
  message: string
}"
              language="typescript"
            />
          </div>
        </div>
      </ShowcaseCard>
    </ShowcaseSection>

    <!-- 4. Git Commit Rules -->
    <ShowcaseSection
      title="Git 提交規範 (Commit)"
      icon="mdi-git"
      class="stagger-4"
    >
      <div class="git-section-grid">
        <!-- Left: Structure & Types -->
        <div class="git-col-left">
          <ShowcaseCard
            title="Commit Message 格式"
            icon="mdi-format-align-left"
            class="h-full"
          >
            <div class="commit-structure">
              <div class="structure-row">
                <span class="structure-tag type">type</span>
                <span class="structure-bracket">(</span>
                <span class="structure-tag scope">scope</span>
                <span class="structure-bracket">):</span>
                <span class="structure-tag subject">subject</span>
              </div>
              <div class="structure-row optional">
                <span class="structure-tag body">body</span>
              </div>
              <div class="structure-row optional">
                <span class="structure-tag footer">footer</span>
              </div>
            </div>

            <div class="types-grid">
              <div class="type-item type-feat">
                <span class="type-name">feat</span>
                <span class="type-desc">新功能</span>
              </div>
              <div class="type-item type-fix">
                <span class="type-name">fix</span>
                <span class="type-desc">修復 Bug</span>
              </div>
              <div class="type-item type-refactor">
                <span class="type-name">refactor</span>
                <span class="type-desc">重構代碼</span>
              </div>
              <div class="type-item type-docs">
                <span class="type-name">docs</span>
                <span class="type-desc">文件更新</span>
              </div>
              <div class="type-item type-style">
                <span class="type-name">style</span>
                <span class="type-desc">格式調整</span>
              </div>
              <div class="type-item type-test">
                <span class="type-name">test</span>
                <span class="type-desc">測試相關</span>
              </div>
              <div class="type-item type-chore">
                <span class="type-name">chore</span>
                <span class="type-desc">雜項處理</span>
              </div>
              <div class="type-item type-perf">
                <span class="type-name">perf</span>
                <span class="type-desc">效能優化</span>
              </div>
            </div>
          </ShowcaseCard>
        </div>

        <!-- Right: Examples -->
        <div class="git-col-right">
          <ShowcaseCard
            title="範例展示"
            icon="mdi-code-tags"
            class="h-full"
          >
            <div class="examples-list">
              <div class="example-item">
                <div class="example-header">
                  <v-icon
                    size="16"
                    color="emerald-400"
                  >
                    mdi-check-circle
                  </v-icon>
                  <span class="example-title">新增功能</span>
                </div>
                <div class="example-code">
                  <span class="code-type feat">feat</span>
                  <span class="code-scope">(auth)</span>
                  :
                  <span class="code-subject">新增 Google 登入功能</span>
                </div>
              </div>

              <div class="example-item">
                <div class="example-header">
                  <v-icon
                    size="16"
                    color="blue-400"
                  >
                    mdi-check-circle
                  </v-icon>
                  <span class="example-title">修復錯誤</span>
                </div>
                <div class="example-code">
                  <span class="code-type fix">fix</span>
                  <span class="code-scope">(api)</span>
                  :
                  <span class="code-subject">修復用戶資料取得失敗的問題</span>
                </div>
              </div>

              <div class="example-item">
                <div class="example-header">
                  <v-icon
                    size="16"
                    color="purple-400"
                  >
                    mdi-check-circle
                  </v-icon>
                  <span class="example-title">代碼重構</span>
                </div>
                <div class="example-code">
                  <span class="code-type refactor">refactor</span>
                  <span class="code-scope">(components)</span>
                  :
                  <span class="code-subject">優化按鈕元件結構</span>
                </div>
              </div>

              <div class="example-item">
                <div class="example-header">
                  <v-icon
                    size="16"
                    color="orange-400"
                  >
                    mdi-check-circle
                  </v-icon>
                  <span class="example-title">文件更新</span>
                </div>
                <div class="example-code">
                  <span class="code-type docs">docs</span>
                  <span class="code-scope">(readme)</span>
                  :
                  <span class="code-subject">更新安裝說明文件</span>
                </div>
              </div>
            </div>
          </ShowcaseCard>
        </div>
      </div>
    </ShowcaseSection>

    <!-- 5. Quality Assurance -->
    <ShowcaseSection
      title="品質檢查工具"
      icon="mdi-shield-check"
      class="stagger-5"
    >
      <div class="packages-grid">
        <!-- ESLint -->
        <div class="package-card">
          <div class="package-header">
            <v-icon
              size="24"
              color="purple-400"
            >
              mdi-eslint
            </v-icon>
            <div class="package-name">ESLint 檢查</div>
          </div>
          <div class="package-desc">程式碼風格與品質檢查</div>
          <div class="package-install">
            <ShowcaseCodeBlock
              code="npm run lint"
              language="bash"
            />
          </div>
        </div>

        <!-- Git Hooks -->
        <div class="package-card">
          <div class="package-header">
            <v-icon
              size="24"
              color="emerald-400"
            >
              mdi-git
            </v-icon>
            <div class="package-name">Git Hooks</div>
          </div>
          <div class="package-desc">Commit 前自動執行檢查</div>
          <div class="package-install">
            <ShowcaseCodeBlock
              code="npm run prepare"
              language="bash"
            />
          </div>
        </div>

        <!-- Emergency Skip -->
        <div class="package-card">
          <div class="package-header">
            <v-icon
              size="24"
              color="amber-400"
            >
              mdi-alert
            </v-icon>
            <div class="package-name">緊急跳過</div>
          </div>
          <div class="package-desc">僅在緊急情況使用</div>
          <div class="package-install">
            <ShowcaseCodeBlock
              code="git commit -n -m 'message'"
              language="bash"
            />
          </div>
        </div>
      </div>
    </ShowcaseSection>

    <!-- 7. Quality Assurance -->
    <ShowcaseSection
      title="程式碼品質 (QA)"
      icon="mdi-shield-check"
      class="stagger-7"
    >
      <!-- ESLint Checks -->
      <div class="package-category">
        <div class="category-header">
          <div class="category-icon category-icon-emerald">
            <v-icon
              size="20"
              color="emerald-400"
            >
              mdi-shield-check-outline
            </v-icon>
          </div>
          <h3 class="category-title">自動檢查工具 (ESLint)</h3>
        </div>
        <div class="packages-grid">
          <!-- Vue Best Practices -->
          <div class="package-card">
            <div class="package-header">
              <div class="package-name">Vue 最佳實踐</div>
              <v-icon
                size="20"
                color="emerald-400"
              >
                mdi-vuejs
              </v-icon>
            </div>
            <div class="config-badge flex-col items-start gap-1">
              <span>vue/max-attributes-per-line</span>
              <span>vue/max-len</span>
              <span>vue/no-v-html</span>
            </div>
            <div class="package-desc">強制屬性換行與長度限制</div>
            <div class="package-install">
              <ShowcaseCodeBlock
                code="<!-- 屬性超過 1 個必須換行 -->
<MyComponent
  first-prop='value'
  second-prop='value'
/>

<!-- 最多 120 字元 -->"
                language="html"
              />
            </div>
          </div>

          <!-- TypeScript Check -->
          <div class="package-card">
            <div class="package-header">
              <div class="package-name">TypeScript 檢查</div>
              <v-icon
                size="20"
                color="blue-400"
              >
                mdi-language-typescript
              </v-icon>
            </div>
            <div class="config-badge">
              <span>@typescript-eslint/no-unused-vars</span>
            </div>
            <div class="package-desc">避免型別錯誤</div>
            <div class="package-install">
              <ShowcaseCodeBlock
                code="// ✓ 正確
const user: User = {
  id: 1,
  name: 'John'
}"
                language="typescript"
              />
            </div>
          </div>

          <!-- Prettier Format -->
          <div class="package-card">
            <div class="package-header">
              <div class="package-name">Prettier 排版</div>
              <v-icon
                size="20"
                color="pink-400"
              >
                mdi-format-paint
              </v-icon>
            </div>
            <div class="config-badge">
              <span>prettier/prettier</span>
            </div>
            <div class="package-desc">幫你把程式碼排整齊</div>
            <div class="package-install">
              <ShowcaseCodeBlock
                code="// 存檔時自動格式化
// 統一縮排、引號、分號"
                language="javascript"
              />
            </div>
          </div>

          <!-- JSDoc Comments -->
          <div class="package-card">
            <div class="package-header">
              <div class="package-name">JSDoc 註解</div>
              <v-icon
                size="20"
                color="amber-400"
              >
                mdi-comment-text-outline
              </v-icon>
            </div>
            <div class="config-badge">
              <span>eslint.config.mjs</span>
            </div>
            <div class="package-desc">
              <p>強制 ESLint 檢查規則：</p>
              <ul class="text-xs text-slate-400 mt-2 list-disc pl-4 space-y-1">
                <li>Function / Class / Method 必須有 JSDoc</li>
                <li>
                  必須包含
                  <code>@param</code>
                  與
                  <code>@returns</code>
                </li>
                <li>參數與回傳值都「必須」要有描述說明</li>
              </ul>
            </div>
            <div class="package-install">
              <ShowcaseCodeBlock
                code="/**
 * 取得使用者資料
 * @param {number} id
 * @returns {Promise<User>}
 */"
                language="javascript"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Git Workflow Tools -->
      <div class="package-category">
        <div class="category-header">
          <div class="category-icon category-icon-blue">
            <v-icon
              size="20"
              color="blue-400"
            >
              mdi-git
            </v-icon>
          </div>
          <h3 class="category-title">Git 工作流工具 (Workflow)</h3>
        </div>
        <div class="packages-grid">
          <!-- Husky -->
          <div class="package-card">
            <div class="package-header">
              <div class="package-name">Husky</div>
              <div class="package-version">^9.1.7</div>
            </div>
            <div class="package-desc">Git Hooks - Commit 前自動檢查</div>
            <div class="package-install">
              <ShowcaseCodeBlock
                code="# 自動攔截並檢查
git commit -m 'feat: 新功能'"
                language="bash"
              />
            </div>
          </div>

          <!-- Lint Staged -->
          <div class="package-card">
            <div class="package-header">
              <div class="package-name">Lint Staged</div>
              <div class="package-version">^16.2.7</div>
            </div>
            <div class="package-desc">只檢查這次修改的檔案</div>
            <div class="package-install">
              <ShowcaseCodeBlock
                code="# 速度很快
# 只檢查暫存區的檔案"
                language="bash"
              />
            </div>
          </div>

          <!-- Commitizen -->
          <div class="package-card">
            <div class="package-header">
              <div class="package-name">Commitizen</div>
              <div class="package-version">^4.3.1</div>
            </div>
            <div class="package-desc">協助撰寫標準 Commit 訊息</div>
            <div class="package-install">
              <ShowcaseCodeBlock
                code="# 互動式選單
npm run commit"
                language="bash"
              />
            </div>
          </div>

          <!-- Commitlint -->
          <div class="package-card">
            <div class="package-header">
              <div class="package-name">Commitlint</div>
              <div class="package-version">^19.x</div>
            </div>
            <div class="package-desc">檢查 Commit 訊息格式</div>
            <div class="package-install">
              <ShowcaseCodeBlock
                code="# 必須符合規範
feat: 新增功能
fix: 修正錯誤"
                language="bash"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Skip Checks (Emergency) -->
      <div class="package-category">
        <div class="category-header">
          <div class="category-icon category-icon-amber">
            <v-icon
              size="20"
              color="amber-400"
            >
              mdi-alert
            </v-icon>
          </div>
          <h3 class="category-title">緊急略過檢查 (盡量少用)</h3>
        </div>
        <div class="qa-warning-note">
          <v-icon
            size="20"
            color="amber-400"
          >
            mdi-alert-circle-outline
          </v-icon>
          <span>注意:僅在緊急情況使用,跳過檢查可能導致代碼品質問題。</span>
        </div>
        <div class="packages-grid">
          <!-- Skip Commit Check -->
          <div class="package-card qa-warning-card">
            <div class="package-header">
              <div class="package-name">Commit 時跳過</div>
              <v-icon
                size="20"
                color="amber-400"
              >
                mdi-close-circle-outline
              </v-icon>
            </div>
            <div class="package-desc">跳過所有 Git Hooks 檢查</div>
            <div class="package-install">
              <ShowcaseCodeBlock
                code="git commit -n -m '急件處理'"
                language="bash"
              />
            </div>
          </div>

          <!-- Skip Line Check -->
          <div class="package-card qa-warning-card">
            <div class="package-header">
              <div class="package-name">某一行跳過</div>
              <v-icon
                size="20"
                color="amber-400"
              >
                mdi-code-not-equal-variant
              </v-icon>
            </div>
            <div class="package-desc">跳過特定行的 ESLint 檢查</div>
            <div class="package-install">
              <ShowcaseCodeBlock
                code="// eslint-disable-next-line
console.log('debug')"
                language="javascript"
              />
            </div>
          </div>

          <!-- Skip File Check -->
          <div class="package-card qa-warning-card">
            <div class="package-header">
              <div class="package-name">整個檔案跳過</div>
              <v-icon
                size="20"
                color="amber-400"
              >
                mdi-file-cancel-outline
              </v-icon>
            </div>
            <div class="package-desc">跳過整個檔案的檢查</div>
            <div class="package-install">
              <ShowcaseCodeBlock
                code="/* eslint-disable */
// 整個檔案都不檢查"
                language="javascript"
              />
            </div>
          </div>
        </div>
      </div>
    </ShowcaseSection>

    <!-- 6. JavaScript Core Rules -->
    <ShowcaseSection
      title="JavaScript / TypeScript 核心規範"
      icon="mdi-language-javascript"
      class="stagger-6 mb-24"
    >
      <ShowcaseCard
        title="語法與邏輯限制"
        description="最基礎的程式碼品質守門員。"
        full-width
      >
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- eqeqeq -->
          <div class="config-rule-item">
            <div class="rule-info">
              <span class="rule-name">eqeqeq</span>
              <span class="rule-desc">強制全等 (===)</span>
              <span class="rule-badge error">Error</span>
            </div>
            <ShowcaseCodeBlock
              code="// ✅ 正確
if (a === b) {}

// ❌ 錯誤
if (a == b) {}"
              language="javascript"
            />
          </div>

          <!-- no-var -->
          <div class="config-rule-item">
            <div class="rule-info">
              <span class="rule-name">no-var</span>
              <span class="rule-desc">禁止使用 var</span>
              <span class="rule-badge error">Error</span>
            </div>
            <ShowcaseCodeBlock
              code="// ✅ 正確
const name = 'John'

// ❌ 錯誤
var name = 'John'"
              language="javascript"
            />
          </div>

          <!-- prefer-const -->
          <div class="config-rule-item">
            <div class="rule-info">
              <span class="rule-name">prefer-const</span>
              <span class="rule-desc">優先使用 const</span>
              <span class="rule-badge error">Error</span>
            </div>
            <ShowcaseCodeBlock
              code="// ✅ 正確
const tax = 0.05

// ❌ 錯誤
let tax = 0.05 // 未修改"
              language="javascript"
            />
          </div>

          <!-- curly -->
          <div class="config-rule-item">
            <div class="rule-info">
              <span class="rule-name">curly</span>
              <span class="rule-desc">強制大括號</span>
              <span class="rule-badge error">Error</span>
            </div>
            <ShowcaseCodeBlock
              code="// ✅ 正確
if (a) { return }

// ❌ 錯誤
if (a) return"
              language="javascript"
            />
          </div>

          <!-- prefer-template -->
          <div class="config-rule-item">
            <div class="rule-info">
              <span class="rule-name">prefer-template</span>
              <span class="rule-desc">優先使用樣板字串</span>
              <span class="rule-badge error">Error</span>
            </div>
            <ShowcaseCodeBlock
              code="// ✅ 正確
const msg = `Hi ${name}`

// ❌ 錯誤
const msg = 'Hi ' + name"
              language="javascript"
            />
          </div>

          <!-- object-shorthand -->
          <div class="config-rule-item">
            <div class="rule-info">
              <span class="rule-name">object-shorthand</span>
              <span class="rule-desc">物件屬性簡寫</span>
              <span class="rule-badge error">Error</span>
            </div>
            <ShowcaseCodeBlock
              code="// ✅ 正確
const obj = { x, y }

// ❌ 錯誤
const obj = { x: x, y: y }"
              language="javascript"
            />
          </div>

          <!-- arrow-body-style -->
          <div class="config-rule-item">
            <div class="rule-info">
              <span class="rule-name">arrow-body-style</span>
              <span class="rule-desc">簡化箭頭函式</span>
              <span class="rule-badge error">Error</span>
            </div>
            <ShowcaseCodeBlock
              code="// ✅ 正確
const get = () => 'value'

// ❌ 錯誤
const get = () => { return 'value' }"
              language="javascript"
            />
          </div>

          <!-- no-console -->
          <div class="config-rule-item">
            <div class="rule-info">
              <span class="rule-name">no-console</span>
              <span class="rule-desc">Production 禁用</span>
              <span class="rule-badge warn">Warn</span>
            </div>
            <ShowcaseCodeBlock
              code="console.log('debug')"
              language="javascript"
            />
          </div>
        </div>
      </ShowcaseCard>
    </ShowcaseSection>

    <!-- 7. Vue Template Rules -->
    <ShowcaseSection
      title="Vue 模板規範"
      icon="mdi-vuejs"
      class="stagger-7 mb-24"
    >
      <ShowcaseCard
        title="Template 最佳實踐"
        description="讓 Vue 程式碼看起來一致且專業。"
        full-width
      >
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- component-name -->
          <div class="config-rule-item">
            <div class="rule-info">
              <span class="rule-name">component-name-in-template-casing</span>
              <span class="rule-desc">元件大駝峰</span>
              <span class="rule-badge error">Error</span>
            </div>
            <ShowcaseCodeBlock
              code="<!-- ✅ -->
<UserCard />

<!-- ❌ -->
<user-card />"
              language="html"
            />
          </div>

          <!-- no-useless-v-bind -->
          <div class="config-rule-item">
            <div class="rule-info">
              <span class="rule-name">no-useless-v-bind</span>
              <span class="rule-desc">禁止多餘綁定</span>
              <span class="rule-badge error">Error</span>
            </div>
            <ShowcaseCodeBlock
              code="<!-- ✅ -->
<Input text='hi' />

<!-- ❌ -->
<Input :text='&quot;hi&quot;' />"
              language="html"
            />
          </div>

          <!-- prefer-true-attribute-shorthand -->
          <div class="config-rule-item">
            <div class="rule-info">
              <span class="rule-name">prefer-true-attribute-shorthand</span>
              <span class="rule-desc">Boolean 簡寫</span>
              <span class="rule-badge error">Error</span>
            </div>
            <ShowcaseCodeBlock
              code="<!-- ✅ -->
<Modal is-open />

<!-- ❌ -->
<Modal :is-open='true' />"
              language="html"
            />
          </div>

          <!-- no-v-html -->
          <div class="config-rule-item">
            <div class="rule-info">
              <span class="rule-name">no-v-html</span>
              <span class="rule-desc">禁止 v-html</span>
              <span class="rule-badge error">Error</span>
            </div>
            <ShowcaseCodeBlock
              code="<div v-html='content'></div>"
              language="html"
            />
          </div>

          <!-- attributes-order -->
          <div class="config-rule-item">
            <div class="rule-info">
              <span class="rule-name">attributes-order</span>
              <span class="rule-desc">屬性順序強制</span>
              <span class="rule-badge error">Error</span>
            </div>
            <ShowcaseCodeBlock
              code="<!-- ✅ -->
<div
  ref='el'
  v-if='show'
  @click='fn'
>

<!-- ❌ -->
<div
  @click='fn'
  ref='el'
  v-if='show'
>"
              language="html"
            />
          </div>

          <!-- order-in-components -->
          <div class="config-rule-item">
            <div class="rule-info">
              <span class="rule-name">order-in-components</span>
              <span class="rule-desc">Options API 順序</span>
              <span class="rule-badge error">Error</span>
            </div>
            <div class="text-xs text-slate-400 mt-2 px-3 mb-2">
              Props → Data → Computed → Methods
            </div>
          </div>

          <!-- block-lang -->
          <div class="config-rule-item">
            <div class="rule-info">
              <span class="rule-name">block-lang</span>
              <span class="rule-desc">Script Lang TS</span>
              <span class="rule-badge warn">Warn</span>
            </div>
            <ShowcaseCodeBlock
              code="<script lang='ts'>"
              language="html"
            />
          </div>
        </div>
      </ShowcaseCard>
    </ShowcaseSection>

    <!-- 8. Configuration & Quality -->
    <ShowcaseSection
      title="程式碼品質與排版"
      icon="mdi-shield-check"
      class="stagger-8 mb-24"
    >
      <ShowcaseCard
        title="格式化與文件"
        description="自動化排版與註解要求。"
        full-width
      >
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Prettier -->
          <div class="config-rule-item">
            <div class="rule-info">
              <span class="rule-name">prettier/prettier</span>
              <span class="rule-desc">Prettier 排版整合</span>
              <span class="rule-badge error">Error</span>
            </div>
            <div class="text-sm text-slate-400">
              任何排版錯誤 (縮排、引號、分號) 都會被視為 ESLint 錯誤，必須修正才能 Commit。
            </div>
          </div>

          <!-- JSDoc -->
          <div class="config-rule-item">
            <div class="rule-info">
              <span class="rule-name">jsdoc/*</span>
              <span class="rule-desc">JSDoc 註解強制</span>
              <span class="rule-badge error">Error</span>
            </div>
            <div class="text-sm text-slate-400">
              所有函式 (Function/Method/Class) 都必須撰寫 JSDoc，並包含 @param 與 @returns 說明。
            </div>
          </div>

          <!-- Max Attributes -->
          <div class="config-rule-item">
            <div class="rule-info">
              <span class="rule-name">vue/max-attributes-per-line</span>
              <span class="rule-desc">屬性換行</span>
              <span class="rule-badge error">Error</span>
            </div>
            <div class="text-sm text-slate-400">
              單行最多允許 1 個屬性，超過 1 個屬性時，每個屬性必須獨立一行。
            </div>
          </div>

          <!-- Max Len -->
          <div class="config-rule-item">
            <div class="rule-info">
              <span class="rule-name">vue/max-len</span>
              <span class="rule-desc">長度限制 120</span>
              <span class="rule-badge error">Error</span>
            </div>
            <div class="text-sm text-slate-400">
              單行程式碼或模板內容不可超過 120 字元 (已排除字串長度與網址)。
            </div>
          </div>
        </div>
      </ShowcaseCard>
    </ShowcaseSection>

    <!-- 9. Allowed Patterns (Disabled Rules) -->
    <ShowcaseSection
      title="允許的開發模式 (Allowed Patterns)"
      icon="mdi-check-circle-outline"
      class="stagger-9 mb-24"
    >
      <ShowcaseCard
        title="系統白名單 (Disabled Rules)"
        description="雖然 ESLint 預設可能禁止，但我們明確允許與接受的寫法。"
        full-width
      >
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="config-rule-item allowed">
            <div class="rule-info">
              <span class="rule-name">vue/multi-word-component-names</span>
              <span class="rule-badge pass">Off</span>
            </div>
            <div class="text-sm text-slate-300 font-bold mb-2">允許單字元件名稱</div>
            <div class="text-xs text-slate-400">
              可以使用
              <code class="text-emerald-400">Content.vue</code>
              ，不強制
              <code class="text-emerald-400">AppContent.vue</code>
              。
            </div>
          </div>

          <div class="config-rule-item allowed">
            <div class="rule-info">
              <span class="rule-name">vue/no-multiple-template-root</span>
              <span class="rule-badge pass">Off</span>
            </div>
            <div class="text-sm text-slate-300 font-bold mb-2">允許多重根節點</div>
            <div class="text-xs text-slate-400">
              Vue 3 支援 Fragment，Template 不需要只有一個頂層 div。
            </div>
          </div>

          <div class="config-rule-item allowed">
            <div class="rule-info">
              <span class="rule-name">no-undef</span>
              <span class="rule-badge pass">Off</span>
            </div>
            <div class="text-sm text-slate-300 font-bold mb-2">支援 Nuxt 自動導入</div>
            <div class="text-xs text-slate-400">
              Nuxt 的 composables 與 utils 會自動 import，關閉此規則以避免誤判。
            </div>
          </div>

          <div class="config-rule-item allowed">
            <div class="rule-info">
              <span class="rule-name">vue/html-self-closing</span>
              <span class="rule-badge pass">Off</span>
            </div>
            <div class="text-sm text-slate-300 font-bold mb-2">標籤自閉合不強制</div>
            <div class="text-xs text-slate-400">
              允許
              <code class="text-emerald-400">&lt;div /&gt;</code>
              或
              <code class="text-emerald-400">&lt;div&gt;&lt;/div&gt;</code>
              自由混用。
            </div>
          </div>

          <div class="config-rule-item allowed">
            <div class="rule-info">
              <span class="rule-name">vue/no-empty-alt</span>
              <span class="rule-badge pass">Off</span>
            </div>
            <div class="text-sm text-slate-300 font-bold mb-2">允許空 alt 屬性</div>
            <div class="text-xs text-slate-400">
              裝飾性圖片允許
              <code class="text-emerald-400">alt=""</code>
              。
            </div>
          </div>

          <div class="config-rule-item allowed">
            <div class="rule-info">
              <span class="rule-name">vue/script-setup-uses-vars</span>
              <span class="rule-badge pass">Off</span>
            </div>
            <div class="text-sm text-slate-300 font-bold mb-2">支援 Script Setup</div>
            <div class="text-xs text-slate-400">
              配合 Vue 3 Script Setup 語法，防止變數被誤判為未使用。
            </div>
          </div>
        </div>
      </ShowcaseCard>
    </ShowcaseSection>
  </ShowcasePage>
</template>

<style scoped>
/* Naming Rules */
.naming-rules {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .naming-rules {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .naming-rules {
    grid-template-columns: 1fr;
  }
}

.rule-item {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  background: rgba(30, 41, 59, 0.3);
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s;
}

.rule-item:hover {
  background: rgba(30, 41, 59, 0.5);
  border-color: rgba(255, 255, 255, 0.1);
}

.rule-meta {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 140px;
  padding-right: 1.5rem;
  border-right: 2px solid rgba(255, 255, 255, 0.08);
}

.rule-type {
  font-size: 0.875rem;
  font-weight: 700;
  color: rgb(96, 165, 250);
  font-family: 'Courier New', monospace;
}

.rule-desc {
  font-size: 0.75rem;
  color: rgb(148, 163, 184);
}

.config-source {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.5rem;
  font-size: 0.7rem;
  color: rgb(100, 116, 139);
  background: rgba(15, 23, 42, 0.4);
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;
  align-self: flex-start;
  white-space: nowrap;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

/* Dev Context Styles */
.dev-context {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
  background: rgba(15, 23, 42, 0.5);
  border: 1px dashed rgba(96, 165, 250, 0.3);
  border-radius: 0.5rem;
}

.context-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #94a3b8;
}

.context-item .label {
  font-weight: 500;
  color: #cbd5e1;
}

.context-item .value {
  font-family: 'Fira Code', monospace;
  color: #60a5fa;
  background: rgba(96, 165, 250, 0.1);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
}

.config-badge {
  display: inline-block;
  font-size: 0.7rem;
  color: rgb(100, 116, 139);
  background: rgba(0, 0, 0, 0.2);
  padding: 0.125rem 0.5rem;
  border-radius: 999px;
  margin-bottom: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.rule-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.rule-syntax {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
}

.keyword {
  color: rgb(167, 139, 250);
  font-weight: 600;
}

.divider {
  color: rgba(255, 255, 255, 0.2);
}

.rule-examples {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.rule-examples span {
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  font-weight: 500;
}

.good {
  background: rgba(16, 185, 129, 0.1);
  color: rgb(52, 211, 153);
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.bad {
  background: rgba(239, 68, 68, 0.1);
  color: rgb(248, 113, 113);
  border: 1px solid rgba(239, 68, 68, 0.2);
  text-decoration: line-through;
  opacity: 0.7;
}

/* Folder Grid System */
.folder-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr) !important;
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .folder-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

@media (max-width: 768px) {
  .folder-grid {
    grid-template-columns: 1fr !important;
  }
}

.folder-card {
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  padding: 1.25rem;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.folder-card:hover {
  background: rgba(30, 41, 59, 0.6);
  border-color: rgba(96, 165, 250, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* Removed span-col since we want strict 3 columns */

@media (max-width: 768px) {
  /* Removed span-col media query */
}

.folder-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.folder-identity {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.folder-name {
  font-family: 'Fira Code', monospace;
  font-size: 1.1rem;
  font-weight: 600;
  color: #e2e8f0;
}

.naming-badge {
  font-size: 0.75rem;
  padding: 0.25rem 0.6rem;
  background: rgba(59, 130, 246, 0.15);
  color: #60a5fa;
  border-radius: 999px;
  border: 1px solid rgba(59, 130, 246, 0.3);
  font-weight: 500;
  white-space: nowrap;
}

.naming-badge.mixed {
  background: rgba(167, 139, 250, 0.15);
  color: #a78bfa;
  border-color: rgba(167, 139, 250, 0.3);
}

.naming-badge.gray {
  background: rgba(148, 163, 184, 0.15);
  color: #cbd5e1;
  border-color: rgba(148, 163, 184, 0.3);
}

.naming-badge.sm {
  font-size: 0.7rem;
  padding: 0.15rem 0.5rem;
}

.folder-desc {
  color: #94a3b8;
  font-size: 0.9rem;
  line-height: 1.5;
}

.folder-examples {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: rgba(15, 23, 42, 0.3);
  padding: 0.75rem;
  border-radius: 0.5rem;
}

.example-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
}

.example-row.valid {
  color: #34d399;
}

.example-row.invalid {
  color: #f87171;
  text-decoration: line-through;
  opacity: 0.7;
}

/* Sub-folders style */
.sub-folders {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.sub-folder-item {
  background: rgba(0, 0, 0, 0.2);
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.sub-folder-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.sub-name {
  color: #e2e8f0;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
}

.sub-desc {
  font-size: 0.8rem;
  color: #94a3b8;
}

/* TypeScript Rules Grid */
.ts-rules-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .ts-rules-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .ts-rules-grid {
    grid-template-columns: 1fr;
  }
}

.ts-rule-card {
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  transition: all 0.3s ease;
}

.ts-rule-card:hover {
  background: rgba(30, 41, 59, 0.6);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.ts-rule-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.ts-rule-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #f1f5f9;
}

.ts-rule-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.ts-rule-list li {
  position: relative;
  padding-left: 1.5rem;
  color: #cbd5e1;
  font-size: 0.95rem;
  line-height: 1.5;
}

.ts-rule-list li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: #64748b;
  font-weight: bold;
}

/* Comparison Section */
.ts-comparison {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

@media (max-width: 768px) {
  .ts-comparison {
    grid-template-columns: 1fr;
  }
}

.ts-comparison-item {
  background: rgba(30, 41, 59, 0.3);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.ts-comparison-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.ts-comparison-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #e2e8f0;
}

.ts-comparison-when {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: rgba(59, 130, 246, 0.1);
  border-left: 4px solid #3b82f6;
  border-radius: 0.375rem;
  margin-bottom: 1.25rem;
  color: #bae6fd;
  font-size: 0.9rem;
}

/* Git Section */
.git-section-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

@media (max-width: 960px) {
  .git-section-grid {
    grid-template-columns: 1fr;
  }
}

.commit-structure {
  background: rgba(15, 23, 42, 0.5);
  padding: 1.5rem;
  border-radius: 0.75rem;
  margin-bottom: 2rem;
  font-family: 'Fira Code', monospace;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.structure-row {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.structure-row.optional {
  opacity: 0.5;
  padding-left: 1rem;
}

.structure-tag {
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.85rem;
  font-weight: 500;
}

.structure-tag.type {
  background: rgba(16, 185, 129, 0.2);
  color: #34d399;
}
.structure-tag.scope {
  background: rgba(59, 130, 246, 0.2);
  color: #60a5fa;
}
.structure-tag.subject {
  background: rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
}
.structure-tag.body,
.structure-tag.footer {
  border: 1px dashed rgba(255, 255, 255, 0.2);
  color: #94a3b8;
}
.structure-bracket {
  color: #64748b;
}

.types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 0.75rem;
}

.type-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.75rem;
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  transition: all 0.2s;
}

.type-item:hover {
  background: rgba(30, 41, 59, 0.6);
  transform: translateY(-2px);
}

.type-name {
  font-family: 'Fira Code', monospace;
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.type-desc {
  font-size: 0.75rem;
  color: #94a3b8;
}

.type-feat .type-name {
  color: #34d399;
}
.type-fix .type-name {
  color: #60a5fa;
}
.type-refactor .type-name {
  color: #a78bfa;
}
.type-docs .type-name {
  color: #fbbf24;
}
.type-style .type-name {
  color: #f472b6;
}
.type-test .type-name {
  color: #ef4444;
}
.type-chore .type-name {
  color: #94a3b8;
}
.type-perf .type-name {
  color: #2dd4bf;
}

.examples-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.example-item {
  background: rgba(15, 23, 42, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 0.75rem;
  padding: 1rem;
}

.example-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.example-title {
  font-size: 0.85rem;
  color: #94a3b8;
}

.example-code {
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  color: #e2e8f0;
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
}

.code-type.feat {
  color: #34d399;
}
.code-type.fix {
  color: #60a5fa;
}
.code-type.refactor {
  color: #a78bfa;
}
.code-type.docs {
  color: #fbbf24;
}
.code-scope {
  color: #94a3b8;
}
.code-subject {
  color: #e2e8f0;
}

/* QA Features (Enhanced) */
.qa-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.package-category {
  margin-bottom: 2rem;
}

.category-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.category-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.category-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #f8fafc;
}

.packages-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

@media (max-width: 1024px) {
  .packages-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .packages-grid {
    grid-template-columns: 1fr;
  }
}

.package-card {
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0.75rem;
  padding: 1.25rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.package-card:hover {
  background: rgba(30, 41, 59, 0.7);
  box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.3);
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.15);
}

.package-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.package-name {
  font-weight: 700;
  color: #f1f5f9;
  font-size: 0.95rem;
}

.package-version {
  font-size: 0.75rem;
  color: #64748b;
  font-family: monospace;
  background: rgba(0, 0, 0, 0.2);
  padding: 2px 6px;
  border-radius: 4px;
}

.package-desc {
  font-size: 0.85rem;
  color: #94a3b8;
  margin-bottom: 1rem;
  line-height: 1.4;
}

/* Warnings */
.qa-warning-note {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid rgba(245, 158, 11, 0.2);
  border-radius: 0.75rem;
  margin-bottom: 1.5rem;
  color: #fbbf24;
  font-size: 0.9rem;
}

.qa-warning-card {
  border: 1px solid rgba(245, 158, 11, 0.2) !important;
  background: rgba(245, 158, 11, 0.05) !important;
}

.qa-warning-card:hover {
  background: rgba(245, 158, 11, 0.1) !important;
  border-color: rgba(245, 158, 11, 0.4) !important;
}

/* Enterprise Grade Styles for Configured Rules */
.rule-group-card {
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(148, 163, 184, 0.1);
  border-radius: 0.75rem;
  padding: 1.5rem;
  height: 100%;
}

.group-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.group-header h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #e2e8f0;
  margin: 0;
}

.config-rule-item {
  margin-bottom: 2rem;
  padding: 1rem;
  background: rgba(15, 23, 42, 0.3);
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.02);
  transition: all 0.2s ease;
}

.config-rule-item:hover {
  background: rgba(15, 23, 42, 0.5);
  border-color: rgba(99, 102, 241, 0.2);
}

.config-rule-item:last-child {
  margin-bottom: 0;
}

.rule-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.rule-name {
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  color: #60a5fa;
  font-weight: 500;
}

.rule-desc {
  font-size: 0.9rem;
  color: #94a3b8;
  margin-right: auto;
}

.rule-badge {
  font-size: 0.7rem;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  font-weight: 600;
  letter-spacing: 0.025em;
  text-transform: uppercase;
}

.rule-badge.error {
  background: rgba(239, 68, 68, 0.15);
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.rule-badge.warn {
  background: rgba(245, 158, 11, 0.15);
  color: #fbbf24;
  border: 1px solid rgba(245, 158, 11, 0.2);
}

.rule-badge.pass {
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

/* Force 2 columns for config rules */
@media (min-width: 1024px) {
  .rule-group-card .grid,
  .config-rule-item .grid,
  .ShowcaseCard .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  }
}

.config-rule-item.allowed {
  border-left: 3px solid rgba(16, 185, 129, 0.4);
  background: rgba(16, 185, 129, 0.05);
}

.config-rule-item.allowed:hover {
  background: rgba(16, 185, 129, 0.1);
  border-color: rgba(16, 185, 129, 0.3);
}
</style>
