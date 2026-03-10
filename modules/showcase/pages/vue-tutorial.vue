<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import IIcon from '~/components/uiInterface/IIcon.vue'
import IButton from '~/components/uiInterface/IButton.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import IBreadcrumbs from '~/components/uiInterface/layout/IBreadcrumbs.vue'
import { useBreadcrumbs } from '~/composables/useBreadcrumbs'

const { breadcrumbs: breadcrumbItems } = useBreadcrumbs()

definePageMeta({
  title: 'Vue 3 初學者引導課',
  layout: 'portal'
})

// Units Definition (Make it reactive)
const units = ref([
  {
    id: 'intro',
    title: '單元 00：數據宣告 (Declaration)',
    icon: 'mdi-information-outline',
    description: '在 Vue 3 中，我們使用 <script setup> 來宣告數據。一切都從定義變數開始。',
    tasks: ['嘗試修改下方編輯器中的訊息內容', '觀察 ref() 括號中的文字變化'],
    initialCode:
      `<script setup lang="ts">
  // 使用 ref() 宣告一個具備「響應性」的變數
  // 這樣當變數值改變時，Vue 會自動更新網頁畫面上對應的內容
  const msg = ref('Hello Vue 3!')
</` +
      `script>

<template>
  <!-- 在 HTML 中使用 {{ }} (Mustache 語法) 來顯示變數內容 -->
  <h1>{{ msg }}</h1>
</template>`,
    code:
      `<script setup lang="ts">
  // 使用 ref() 宣告一個具備「響應性」的變數
  // 這樣當變數值改變時，Vue 會自動更新網頁畫面上對應的內容
  const msg = ref('Hello Vue 3!')
</` +
      `script>

<template>
  <!-- 在 HTML 中使用 {{ }} (Mustache 語法) 來顯示變數內容 -->
  <h1>{{ msg }}</h1>
</template>`,
    interactive: 'Intro',
    useCase: '適用於頁面標題、靜態說明文字或任何不需要頻繁變動的初始數據展示。'
  },
  {
    id: 'ref',
    title: '單元 01：響應式 Ref',
    icon: 'mdi-auto-fix',
    description: '在 Vue 3 中，我們使用 ref() 來讓變數具備「響應性」。當變數改變，畫面會自動更新。',
    tasks: ['修改程式碼中的初始值 (例如 0 改成 99)', '點擊按鈕檢查響應性是否依然存在'],
    initialCode:
      `<script setup lang="ts">
  // 宣告一個數字類型的響應性變數，初始值為 0
  const count = ref(0)
  
  // 定義一個函式來修改變數值
  // 注意：在 <script> 中修改 ref 變數時，必須使用 .value 屬性
  const add = () => {
    count.value++
  }
</` +
      `script>

<template>
  <!-- 使用 @click 監聽點擊事件，並執行 add 函式 -->
  <button @click="add">當前數值是: {{ count }}</button>
</template>`,
    code:
      `<script setup lang="ts">
  // 宣告一個數字類型的響應性變數，初始值為 0
  const count = ref(0)
  
  // 定義一個函式來修改變數值
  // 注意：在 <script> 中修改 ref 變數時，必須使用 .value 屬性
  const add = () => {
    count.value++
  }
</` +
      `script>

<template>
  <!-- 使用 @click 監聽點擊事件，並執行 add 函式 -->
  <button @click="add">當前數值是: {{ count }}</button>
</template>`,
    interactive: 'Ref',
    useCase: '用於表單輸入、計數器、切換開關 (Toggle) 等任何需要與使用者互動並即時更新畫面的數據。'
  },
  {
    id: 'computed',
    title: '單元 02：計算屬性 (Computed) - 智慧數據連動',
    icon: 'mdi-calculator',
    description:
      'Computed 就像是「會自動算帳的機器人」。當它依賴的資料 (如價格、數量) 改變時，它會自動重新計算。',
    tasks: [
      '第 1 步：在編輯器中將 price 從 100 改為 250',
      '第 2 步：觀察右側「計算結果」是否自動更新',
      '第 3 步：嘗試在程式碼中加入 + 50 (代表運費)'
    ],
    initialCode:
      `<script setup lang="ts">
  const price = ref(100)
  const quantity = ref(1)
  
  // 自動計算總價：當 price 或 quantity 變動時，total 會跟著變
  const total = computed(() => {
    return price.value * quantity.value
  })
</` +
      `script>

<template>
  <div class="card">
    <p>單價: {{ price }}</p>
    <p>數量: {{ quantity }}</p>
    <p><strong>總價: {{ total }}</strong></p>
  </div>
</template>`,
    code:
      `<script setup lang="ts">
  const price = ref(100)
  const quantity = ref(1)
  
  // 自動計算總價：當 price 或 quantity 變動時，total 會跟著變
  const total = computed(() => {
    return price.value * quantity.value
  })
</` +
      `script>

<template>
  <div class="card">
    <p>單價: {{ price }}</p>
    <p>數量: {{ quantity }}</p>
    <p><strong>總價: {{ total }}</strong></p>
  </div>
</template>`,
    interactive: 'Computed',
    useCase: '用於購物車總計、搜尋過濾結果等任何需要根據現有資料「推導」出新數據的場景。'
  },
  {
    id: 'vmodel',
    title: '單元 03：元件設計 & 雙向綁定 (v-model)',
    icon: 'mdi-sync',
    description:
      '在深入元件前，先理解其「資料守則」：元件就像一個黑盒子，Props 負責輸入，Emits 負責輸出，而 v-model 則是讓這兩者同步的完美捷徑。',
    tasks: [
      '第 1 步：理解元件的 Input/Output 架構',
      '第 2 步：在下方輸入框打字，觀察變數如何即時跳動',
      '第 3 步：嘗試修改初始值，體驗 v-model 的雙向同步'
    ],
    initialCode:
      `<script setup lang="ts">
  // 宣告一個響應性變數，作為元件內部的資料來源
  const name = ref('開發者')
</` +
      `script>

<template>
  <div class="form-group">
    <label>請輸入使用者名稱：</label>
    <!-- v-model 是 Vue 的雙向綁定語法 -->
    <input v-model="name" />
    <p>即時同步結果：{{ name }}</p>
  </div>
</template>`,
    code:
      `<script setup lang="ts">
  // 宣告一個響應性變數，作為元件內部的資料來源
  const name = ref('開發者')
</` +
      `script>

<template>
  <div class="form-group">
    <label>請輸入使用者名稱：</label>
    <!-- v-model 是 Vue 的雙向綁定語法 -->
    <input v-model="name" />
    <p>即時同步結果：{{ name }}</p>
  </div>
</template>`,
    interactive: 'VModel',
    useCase: '最常用於表單、搜尋框、或是任何需要讓子元件「回報」狀態給父元件的場景。'
  },
  {
    id: 'props',
    title: '單元 04：元件傳值 Props',
    icon: 'mdi-database-export',
    description: 'Props 允許父元件將數據傳遞給子元件。這是建立可複用元件的關鍵。',
    tasks: ['理解單向數據流', '觀察父子元件連動'],
    initialCode:
      `<script setup lang="ts">
  // 父元件：這是數據的源頭
  const parentMsg = ref('來自父元件的問候')
</` +
      `script>

<template>
  <div class="parent-case">
    <h3>這裡是父元件</h3>
    <p>我要傳給子元件的值: {{ parentMsg }}</p>
    
    <!-- 關鍵：使用 :msg="parentMsg" 將數據傳入子元件 -->
    <!-- 'msg' 是子元件定義好的接收標籤 (Prop 名稱) -->
    <Child :msg="parentMsg" />
  </div>
</template>`,
    code:
      `<script setup lang="ts">
  // 父元件：這是數據的源頭
  const parentMsg = ref('來自父元件的問候')
</` +
      `script>

<template>
  <div class="parent-case">
    <h3>這裡是父元件</h3>
    <p>我要傳給子元件的值: {{ parentMsg }}</p>
    
    <!-- 關鍵：使用 :msg="parentMsg" 將數據傳入子元件 -->
    <!-- 'msg' 是子元件定義好的接收標籤 (Prop 名稱) -->
    <Child :msg="parentMsg" />
  </div>
</template>`,
    interactive: 'Props',
    useCase: '用於打造可複用的元件（如：通用按鈕、導覽列、商品卡片），從外部注入不同的內容。'
  },
  {
    id: 'emits',
    title: '單元 05：元件事件 Emits',
    icon: 'mdi-transit-connection-variant',
    description: '子元件透過 $emit 發送事件告知父元件發生了什麼事（例如點擊、表單提交）。',
    tasks: ['點擊子元件發送事件', '父元件響應並更新狀態'],
    initialCode:
      `<script setup lang="ts">
  // 在父元件中準備一個變數來接收結果
  const status = ref('等待子元件點擊...')
  
  // 這是一個「處理函式」，當子元件發出訊號時會執行
  const handleUpdate = () => {
    status.value = '恭喜！已收到來自子元件的 Emit 事件'
  }
</` +
      `script>

<template>
  <div class="emit-demo">
    <p>當前父元件狀態: {{ status }}</p>
    
    <!-- 關鍵：使用 @update 監聽子元件定義的事件名稱 -->
    <!-- 當子元件點擊按鈕時，會驅動 handleUpdate 執行 -->
    <Child @update="handleUpdate" />
  </div>
</template>`,
    code:
      `<script setup lang="ts">
  // 在父元件中準備一個變數來接收結果
  const status = ref('等待子元件點擊...')
  
  // 這是一個「處理函式」，當子元件發出訊號時會執行
  const handleUpdate = () => {
    status.value = '恭喜！已收到來自子元件的 Emit 事件'
  }
</` +
      `script>

<template>
  <div class="emit-demo">
    <p>當前父元件狀態: {{ status }}</p>
    
    <!-- 關鍵：使用 @update 監聽子元件定義的事件名稱 -->
    <!-- 當子元件點擊按鈕時，會驅動 handleUpdate 執行 -->
    <Child @update="handleUpdate" />
  </div>
</template>`,
    interactive: 'Emits',
    useCase: '用於子元件向父元件「喊話」（如：關閉彈窗、提交表單、刪除項目），實現元件間的溝通。'
  },
  {
    id: 'lifecycle',
    title: '單元 06：生命週期 Hooks',
    icon: 'mdi-sync-circle',
    description: '生命週期鉤子讓我們在元件「掛載」、「更新」或「銷毀」的特定時刻執行程式碼。',
    tasks: [
      '觀察程式碼中的 onMounted 是如何運作的',
      '嘗試在 onMounted 中加入一個 console.log',
      '理解為什麼我們要在這裡進行資料初始化'
    ],
    initialCode:
      `<script setup lang="ts">
  const status = ref('載入中...')

  // onMounted: 當元件「出現在螢幕上」後執行的動作
  onMounted(() => {
    console.log('元件已掛載！')
    status.value = '歡迎來到 Vue 3 課程！'
  })
</` +
      `script>

<template>
  <div class="status-card">
    <!-- 當元件掛載後，這裡的文字會自動改變 -->
    系統狀態: {{ status }}
  </div>
</template>`,
    code:
      `<script setup lang="ts">
  const status = ref('載入中...')

  // onMounted: 當元件「出現在螢幕上」後執行的動作
  onMounted(() => {
    console.log('元件已掛載！')
    status.value = '歡迎來到 Vue 3 課程！'
  })
</` +
      `script>

<template>
  <div class="status-card">
    <!-- 當元件掛載後，這裡的文字會自動改變 -->
    系統狀態: {{ status }}
  </div>
</template>`,
    interactive: 'Lifecycle',
    useCase: '常用於在頁面載入時抓取 API 資料、啟動計時器、或進行第三方套件（如：圖表）的初始化。'
  },
  {
    id: 'composables',
    title: '單元 07：組合式函式 Composables',
    icon: 'mdi-puzzle-outline',
    description:
      'Composables 是 Vue 3 的精華，能將變數與邏輯封裝成獨立函式，達到極高的程式碼重用性。',
    tasks: ['整合 useMouse 邏輯', '封裝共用功能'],
    initialCode:
      `<script setup lang="ts">
  /**
   * 組合式函式 (Composables)
   * 目的：把「重複的邏輯」寫成一個函數，讓不同頁面都能共用
   */
  function useMouse() {
    const x = ref(0)
    const y = ref(0)
    
    // 更新座標的邏輯
    const update = (e: MouseEvent) => {
      x.value = e.pageX
      y.value = e.pageY
    }
    
    // 生命週期管理：進場時監聽，離場時移除
    onMounted(() => window.addEventListener('mousemove', update))
    onUnmounted(() => window.removeEventListener('mousemove', update))
    
    // 釋放變數供外部使用
    return { x, y }
  }

  // 直接解構拿取需要的邏輯
  const { x, y } = useMouse()
</` +
      `script>

<template>
  <div class="mouse-tracker">
    移動滑鼠看看: {{ x }}, {{ y }}
  </div>
</template>`,
    code:
      `<script setup lang="ts">
  /**
   * 組合式函式 (Composables)
   * 目的：把「重複的邏輯」寫成一個函數，讓不同頁面都能共用
   */
  function useMouse() {
    const x = ref(0)
    const y = ref(0)
    
    // 更新座標的邏輯
    const update = (e: MouseEvent) => {
      x.value = e.pageX
      y.value = e.pageY
    }
    
    // 生命週期管理：進場時監聽，離場時移除
    onMounted(() => window.addEventListener('mousemove', update))
    onUnmounted(() => window.removeEventListener('mousemove', update))
    
    // 釋放變數供外部使用
    return { x, y }
  }

  // 直接解構拿取需要的邏輯
  const { x, y } = useMouse()
</` +
      `script>

<template>
  <div class="mouse-tracker">
    移動滑鼠看看: {{ x }}, {{ y }}
  </div>
</template>`,
    interactive: 'Composables',
    useCase:
      '用於抽離複雜的業務邏輯（如：登入驗證、檔案上傳、視窗定位），讓多個頁面共享同一套邏輯。'
  },
  {
    id: 'pinia',
    title: '單元 08：全域狀態 Pinia',
    icon: 'mdi-database-cog-outline',
    description: '當應用程式變大，跨元件共享數據會變困難。Pinia 讓我們集中管理全域狀態。',
    tasks: ['定義 Store', '跨元件共享 State'],
    initialCode:
      `<script setup lang="ts">
  /**
   * 狀態管理 (Pinia Store)
   * 目的：讓「全應用程式」共享同一份數據，不會因為換頁而消失
   */
  const userStore = {
    // 全域變數：就像雲端同步，大家看到的都是同一個 name
    name: ref('Pinia 學習者'),
    
    // 全域方法：負責修改數據
    updateName(newName: string) {
      this.name.value = newName
    }
  }
  
  // 拿到全域變數，之後在模板中使用
  const { name } = userStore
</` +
      `script>

<template>
  <div class="store-sync">
    <p>全域狀態中的用戶名: <strong>{{ name }}</strong></p>
    <!-- 當你在這裡修改，右側的所有「連動元件」都會同步變化 -->
    <input v-model="name" placeholder="請嘗試修改全域數據" />
  </div>
</template>`,
    code:
      `<script setup lang="ts">
  /**
   * 狀態管理 (Pinia Store)
   * 目的：讓「全應用程式」共享同一份數據，不會因為換頁而消失
   */
  const userStore = {
    // 全域變數：就像雲端同步，大家看到的都是同一個 name
    name: ref('Pinia 學習者'),
    
    // 全域方法：負責修改數據
    updateName(newName: string) {
      this.name.value = newName
    }
  }
  
  // 拿到全域變數，之後在模板中使用
  const { name } = userStore
</` +
      `script>

<template>
  <div class="store-sync">
    <p>全域狀態中的用戶名: <strong>{{ name }}</strong></p>
    <!-- 當你在這裡修改，右側的所有「連動元件」都會同步變化 -->
    <input v-model="name" placeholder="請嘗試修改全域數據" />
  </div>
</template>`,
    interactive: 'Pinia',
    useCase:
      '用於管理全域狀態（如：使用者登入資訊、主題偏好、跨頁面的購物車實體），避免多層 Props 傳遞。'
  },
  {
    id: 'mastery',
    title: '單元 09：精通之道 Mastery',
    icon: 'mdi-trophy-outline',
    description: '恭喜！你已掌握 Vue 3 核心概念。現在試著結合所學，打造一個完整的微型應用。',
    tasks: ['製作 Todo List', '練習資料連動與清單渲染'],
    initialCode:
      `<script setup lang="ts">
  /**
   * 精通挑戰：打造完整的 Todo App
   * 綜合運用：Ref + 計算屬性 + 事件處理 + 條件渲染
   */
  interface Todo { text: string; done: boolean }
  
  // 1. 初始化任務清單資料
  const todos = ref<Todo[]>([
    { text: '學習核心數據 (Ref)', done: true },
    { text: '掌握計算屬性 (Computed)', done: true },
    { text: '打造微型應用 (Mastery)', done: false }
  ])
  
  // 2. 處理新任務的輸入變數
  const newTodo = ref('')
  
  // 3. 定義新增任務的方法
  const addTask = () => {
    if (newTodo.value.trim()) {
      todos.value.push({
        text: newTodo.value,
        done: false // 預設為未完成
      })
      newTodo.value = '' // 清空輸入框
    }
  }
</` +
      `script>

<template>
  <div class="mastery-app">
    <h3>我的待辦清單</h3>
    
    <!-- @keyup.enter：當按下 Enter 鍵時執行新增 -->
    <input 
      v-model="newTodo" 
      @keyup.enter="addTask" 
      placeholder="新增任務後按 Enter..." 
    />
    
    <ul>
      <!-- v-for：迴圈渲染清單 -->
      <li v-for="t in todos" :key="t.text">
        <!-- v-model：直接綁定任務的完成狀態 (done) -->
        <input type="checkbox" v-model="t.done" />
        
        <!-- :style：根據狀態動態切換樣式 -->
        <span :style="{ textDecoration: t.done ? 'line-through' : 'none' }">
          {{ t.text }}
        </span>
      </li>
    </ul>
  </div>
</template>`,
    code:
      `<script setup lang="ts">
  /**
   * 精通挑戰：打造完整的 Todo App
   * 綜合運用：Ref + 計算屬性 + 事件處理 + 條件渲染
   */
  interface Todo { text: string; done: boolean }
  
  // 1. 初始化任務清單資料
  const todos = ref<Todo[]>([
    { text: '學習核心數據 (Ref)', done: true },
    { text: '掌握計算屬性 (Computed)', done: true },
    { text: '打造微型應用 (Mastery)', done: false }
  ])
  
  // 2. 處理新任務的輸入變數
  const newTodo = ref('')
  
  // 3. 定義新增任務的方法
  const addTask = () => {
    if (newTodo.value.trim()) {
      todos.value.push({
        text: newTodo.value,
        done: false // 預設為未完成
      })
      newTodo.value = '' // 清空輸入框
    }
  }
</` +
      `script>

<template>
  <div class="mastery-app">
    <h3>我的待辦清單</h3>
    
    <!-- @keyup.enter：當按下 Enter 鍵時執行新增 -->
    <input 
      v-model="newTodo" 
      @keyup.enter="addTask" 
      placeholder="新增任務後按 Enter..." 
    />
    
    <ul>
      <!-- v-for：迴圈渲染清單 -->
      <li v-for="t in todos" :key="t.text">
        <!-- v-model：直接綁定任務的完成狀態 (done) -->
        <input type="checkbox" v-model="t.done" />
        
        <!-- :style：根據狀態動態切換樣式 -->
        <span :style="{ textDecoration: t.done ? 'line-through' : 'none' }">
          {{ t.text }}
        </span>
      </li>
    </ul>
  </div>
</template>`,
    interactive: 'Mastery',
    useCase: '綜合運用所有核心技術，打造具備完整邏輯、數據運算與父子溝通功能的微型 Web 應用程式。'
  }
])

const activeUnitIndex = ref(0)
const activeUnit = computed(() => units.value[activeUnitIndex.value])

// Interactive State
const initialState = {
  count: 0,
  price: 100,
  quantity: 1,
  name: '開發者',
  mouseX: 0,
  mouseY: 0,
  isTracking: false,
  todos: [
    { text: '學習核心數據 (Ref)', done: true },
    { text: '掌握計算屬性 (Computed)', done: true },
    { text: '打造微型應用 (Mastery)', done: false }
  ] as { text: string; done: boolean }[],
  newTodo: '',
  introMsg: 'Hello Vue 3!',
  parentMsg: 'Hello from Parent',
  status: 'Waiting...'
}
const state = ref({ ...initialState })
const total = computed(() => state.value.price * state.value.quantity)

// Reactive Sync: Watch units[activeUnitIndex].code and update state
watch(
  () => units.value[activeUnitIndex.value].code,
  (newCode) => {
    const unitId = units.value[activeUnitIndex.value].id
    // Clean code (strip script/template tags for parsing)
    const cleanCode = newCode
      .replace(/<script[^>]*>|<\/[s]cript>|<template>|<\/[t]emplate>/g, '')
      .trim()

    // Simple Heuristic Parsers to simulate "Live Code" impact
    if (unitId === 'intro') {
      const match = cleanCode.match(/ref\(\s*['"](.*?)['"]\s*\)/)
      if (match) state.value.introMsg = match[1]
    } else if (unitId === 'ref') {
      const match = cleanCode.match(/ref\(\s*(-?\d+)\s*\)/)
      if (match) state.value.count = Number(match[1])
    } else if (unitId === 'computed') {
      const pMatch = cleanCode.match(/price\s*=\s*ref\(\s*(-?\d+)\s*\)/)
      const qMatch = cleanCode.match(/quantity\s*=\s*ref\(\s*(-?\d+)\s*\)/)
      if (pMatch) state.value.price = Number(pMatch[1])
      if (qMatch) state.value.quantity = Number(qMatch[1])
    } else if (unitId === 'props') {
      const match = cleanCode.match(/parentMsg\s*=\s*ref\(\s*['"](.*?)['"]\s*\)/)
      if (match) state.value.parentMsg = match[1]
    } else if (unitId === 'emits') {
      const match = cleanCode.match(/status\s*=\s*ref\(\s*['"](.*?)['"]\s*\)/)
      if (match) state.value.status = match[1]
    } else if (unitId === 'mastery') {
      const match = cleanCode.match(/todos\s*=\s*ref\(\s*(\[[\s\S]*?\])\s*\)/)
      if (match) {
        try {
          const arrayStr = match[1]
          const itemRegex = /{\s*text:\s*['"](.*?)['"]\s*,\s*done:\s*(true|false)\s*}/g
          const items = []
          let itemMatch
          while ((itemMatch = itemRegex.exec(arrayStr)) !== null) {
            items.push({ text: itemMatch[1], done: itemMatch[2] === 'true' })
          }
          if (items.length > 0) state.value.todos = items
        } catch {
          // Silent catch for parsing errors
        }
      }
    }
  },
  { immediate: true }
)

const resetState = () => {
  state.value = { ...initialState }
  // Restore initial code for active unit
  units.value[activeUnitIndex.value].code = units.value[activeUnitIndex.value].initialCode
}

// Composables: useMouse simulation
const handleMouseMove = (e: MouseEvent) => {
  if (state.value.isTracking) {
    state.value.mouseX = Math.round(e.clientX)
    state.value.mouseY = Math.round(e.clientY)
  }
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
})

const toggleTracking = () => {
  state.value.isTracking = !state.value.isTracking
}

// Lifecycle demo
watch(activeUnitIndex, (newIdx) => {
  if (units.value[newIdx].id === 'lifecycle') {
    state.value.status = '歡迎來到生命週期單元！'
  }
})
const addTodo = () => {
  if (state.value.newTodo) {
    state.value.todos.push({ text: state.value.newTodo, done: false })
    state.value.newTodo = ''
  }
}
const toggleTodo = (index: number) => {
  state.value.todos[index].done = !state.value.todos[index].done
}
const removeTodo = (index: number) => {
  state.value.todos.splice(index, 1)
}

const scrollContainer = ref<HTMLElement | null>(null)
watch(activeUnitIndex, () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollTo({ top: 0, behavior: 'smooth' })
  }
})
</script>

<template>
  <div class="vue-course-layout min-h-screen bg-white">
    <!-- Premium SaaS Header -->
    <header
      class="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-slate-100 px-8 py-4"
    >
      <div class="max-w-[1400px] mx-auto flex items-center justify-between">
        <div class="flex items-center gap-5">
          <NuxtLink
            to="/"
            class="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-100 transition-all hover:bg-blue-50 group"
            title="回到首頁"
          >
            <IIcon
              icon="mdi-home-outline"
              size="22"
              class="group-hover:scale-110 transition-transform"
            />
          </NuxtLink>
          <div class="h-8 w-px bg-slate-200 mx-1"></div>
          <IBreadcrumbs :items="breadcrumbItems" />
        </div>

        <div class="flex items-center gap-6">
          <div class="flex flex-col items-end">
            <span class="text-[10px] font-black text-blue-500 uppercase">目前進度</span>
            <div class="text-sm font-mono font-bold text-slate-600">
              {{ activeUnitIndex + 1 }} / {{ units.length }}
            </div>
          </div>
          <div class="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              class="h-full bg-blue-500 transition-all duration-500"
              :style="{ width: `${((activeUnitIndex + 1) / units.length) * 100}%` }"
            ></div>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-73px)]">
      <!-- Sidebar Nav (Left Column) -->
      <aside class="lg:col-span-3 border-r border-slate-50 p-6 space-y-2 bg-slate-50/30">
        <div
          class="px-4 py-2 mb-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]"
        >
          單元列表
        </div>
        <button
          v-for="(unit, index) in units"
          :key="unit.id"
          class="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden"
          :class="
            activeUnitIndex === index
              ? 'bg-white shadow-[0_4px_20px_rgba(37,99,235,0.08)] text-blue-600 ring-1 ring-blue-50'
              : 'text-slate-500 hover:bg-slate-100/50 hover:text-slate-900'
          "
          @click="activeUnitIndex = index"
        >
          <div
            class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-colors"
            :class="
              activeUnitIndex === index
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
            "
          >
            {{ index + 1 }}
          </div>
          <div class="flex-1 text-left">
            <div class="text-sm font-black tracking-tight">{{ unit.title }}</div>
          </div>
          <IIcon
            v-if="activeUnitIndex === index"
            icon="mdi-chevron-right"
            size="18"
          />
        </button>
      </aside>

      <!-- Integrated Content Area (Right Column) -->
      <!-- Main Content Area (Dynamic) -->
      <div
        ref="scrollContainer"
        class="lg:col-span-9 h-full flex flex-col overflow-y-auto bg-slate-50/10 relative"
      >
        <!-- Vertical Content Stack -->
        <main class="w-full max-w-4xl mx-auto p-10 space-y-12">
          <!-- Course Header (Independent) -->
          <div class="mb-10 pb-10 border-b border-slate-100/60">
            <div class="flex items-center gap-4 mb-4">
              <div
                class="px-2.5 py-1 rounded bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100"
              >
                Course Module 02
              </div>
              <div class="h-4 w-px bg-slate-200"></div>
              <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                互動式教學平台
              </div>
            </div>
            <h1 class="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Vue 3 核心實戰課程
            </h1>
            <p class="text-lg text-slate-500 font-medium leading-relaxed">
              • 面向新手的引導式架構：從響應性、元件通訊到全域狀態管理的深度導覽。
            </p>
          </div>

          <div class="space-y-4 animate-fadeIn">
            <h2 class="text-3xl font-black text-slate-900 tracking-tight leading-tight">
              {{ activeUnit.title }}
            </h2>
            <p class="text-slate-500 text-lg leading-relaxed">{{ activeUnit.description }}</p>

            <!-- Real-world Case Callout -->
            <div
              class="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 flex items-start gap-4"
            >
              <div
                class="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-500 shrink-0"
              >
                <IIcon
                  icon="mdi-lightbulb-on-outline"
                  size="24"
                />
              </div>
              <div class="space-y-1">
                <div class="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                  實戰場景 (When to USE)
                </div>
                <p class="text-sm font-bold text-slate-600 leading-normal">
                  {{ activeUnit.useCase }}
                </p>
              </div>
            </div>
          </div>

          <!-- 2. Task Checklist -->
          <ShowcaseCard
            title="動手試試看"
            description="跟著以下步驟在下方 Playground 完成實作"
            compact
          >
            <ul class="space-y-4 m-0 p-0 list-none">
              <li
                v-for="task in activeUnit.tasks"
                :key="task"
                class="flex items-center gap-3 text-sm font-medium text-slate-600"
              >
                <div
                  class="w-5 h-5 rounded-full border-2 border-blue-100 flex items-center justify-center text-blue-500 bg-blue-50/50"
                >
                  <IIcon
                    icon="mdi-check"
                    size="12"
                  />
                </div>
                {{ task }}
              </li>
            </ul>
          </ShowcaseCard>

          <!-- 3. Dynamic Code Editor -->
          <div class="space-y-3">
            <div class="flex items-center justify-between px-1">
              <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                互動程式碼編輯器 (可修改內容)
              </div>
              <div class="flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span class="text-[10px] font-black text-slate-400 uppercase">Live 即時連動</span>
              </div>
            </div>

            <div class="relative group">
              <textarea
                v-model="activeUnit.code"
                class="w-full h-[350px] bg-slate-900 text-slate-300 p-8 font-mono text-sm leading-relaxed rounded-2xl border border-slate-800 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all resize-none shadow-xl"
                spellcheck="false"
              ></textarea>

              <div
                class="absolute bottom-4 right-4 flex items-center gap-2 opacity-50 group-focus-within:opacity-100 transition-opacity"
              >
                <span class="text-[10px] font-mono text-slate-500">Vue SFC</span>
                <IIcon
                  icon="mdi-xml"
                  size="14"
                  class="text-blue-400"
                />
              </div>
            </div>
          </div>

          <!-- 4. Playground (Results Section) -->
          <div class="space-y-4">
            <div class="flex items-center justify-between px-1">
              <span class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                預覽結果 (Result)
              </span>
            </div>

            <div
              class="w-full min-h-[300px] bg-white rounded-[2rem] border border-slate-100 shadow-2xl shadow-slate-200/50 flex flex-col p-12 items-center justify-center relative overflow-hidden group/result"
            >
              <!-- Reset Button -->
              <button
                class="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all flex items-center justify-center z-20 group/reset"
                @click="resetState"
              >
                <IIcon
                  icon="mdi-refresh"
                  size="18"
                  class="group-hover/reset:rotate-180 transition-transform duration-500"
                />
              </button>

              <!-- STEP: Intro -->
              <div
                v-if="activeUnit.interactive === 'Intro'"
                class="animate-scaleIn text-center"
              >
                <div class="text-4xl font-black text-slate-900">{{ state.introMsg }}</div>
              </div>

              <!-- STEP: Ref -->
              <div
                v-if="activeUnit.interactive === 'Ref'"
                class="text-center space-y-8 animate-scaleIn"
              >
                <div class="space-y-2">
                  <div class="text-[10px] font-black text-blue-500/40 uppercase tracking-[0.2em]">
                    Reactive State (Ref)
                  </div>
                  <div
                    class="text-7xl font-black text-blue-600 tracking-tighter hover:scale-110 transition-transform cursor-default"
                  >
                    {{ state.count }}
                  </div>
                </div>
                <IButton
                  variant="primary"
                  size="large"
                  class="shadow-xl shadow-blue-500/30 scale-110"
                  @click="state.count++"
                >
                  點我增加數值
                </IButton>
              </div>

              <!-- STEP: Computed -->
              <div
                v-if="activeUnit.interactive === 'Computed'"
                class="w-full max-w-xs space-y-8 animate-scaleIn"
              >
                <div class="p-6 rounded-[1.5rem] bg-slate-50 border border-slate-100 space-y-6">
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-bold text-slate-500">單價 (Ref)</span>
                    <span class="font-black text-slate-900">$ {{ state.price }}</span>
                  </div>
                  <div class="flex items-center justify-between gap-4">
                    <span class="text-sm font-bold text-slate-500">數量 (Ref)</span>
                    <div
                      class="flex items-center gap-4 bg-white px-4 py-2 rounded-xl ring-1 ring-slate-100 shadow-sm"
                    >
                      <button
                        class="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-slate-50 active:scale-90"
                        @click="state.quantity > 0 && state.quantity--"
                      >
                        -
                      </button>
                      <span class="font-black text-slate-900 w-4 text-center">
                        {{ state.quantity }}
                      </span>
                      <button
                        class="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-slate-50 active:scale-90"
                        @click="state.quantity++"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  class="bg-blue-600 rounded-[1.5rem] p-6 text-white shadow-xl shadow-blue-500/20 text-center relative overflow-hidden"
                >
                  <div
                    class="text-[10px] font-black uppercase opacity-40 tracking-widest mb-1 relative z-10"
                  >
                    Computed Result
                  </div>
                  <div class="text-4xl font-black tracking-tighter relative z-10">
                    $ {{ total }}
                  </div>
                </div>
              </div>

              <!-- STEP: VModel -->
              <div
                v-if="activeUnit.interactive === 'VModel'"
                class="w-full max-w-sm space-y-8 animate-scaleIn"
              >
                <div class="space-y-2">
                  <div
                    class="text-[10px] font-black text-blue-500/40 uppercase tracking-[0.2em] px-1"
                  >
                    Input (v-model)
                  </div>
                  <input
                    v-model="state.name"
                    type="text"
                    class="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-[1.25rem] px-6 py-5 outline-none transition-all duration-300 text-lg font-bold text-slate-800 shadow-inner"
                    placeholder="輸入你的名字..."
                  />
                </div>
                <div
                  class="flex items-center gap-6 p-8 rounded-[2rem] bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 relative"
                >
                  <div
                    class="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-blue-600 ring-4 ring-blue-50"
                  >
                    <IIcon
                      icon="mdi-account"
                      size="40"
                    />
                  </div>
                  <div class="space-y-1">
                    <div class="text-[10px] font-black text-blue-500/40 uppercase tracking-[0.2em]">
                      Reactive Output
                    </div>
                    <div class="text-2xl font-black text-slate-900 tracking-tight">
                      你好, {{ state.name }}!
                    </div>
                  </div>
                </div>
              </div>

              <!-- STEP: Props -->
              <div
                v-if="activeUnit.interactive === 'Props'"
                class="w-full max-w-sm space-y-6 animate-scaleIn"
              >
                <div class="space-y-2">
                  <div
                    class="text-[10px] font-black text-blue-500/40 uppercase tracking-[0.2em] px-1"
                  >
                    Parent Input (Simulation)
                  </div>
                  <input
                    v-model="state.parentMsg"
                    type="text"
                    class="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl px-4 py-3 outline-none transition-all text-sm font-bold text-slate-800"
                    placeholder="Change the prop value..."
                  />
                </div>
                <div
                  class="p-8 bg-white rounded-[2rem] border-2 border-dashed border-blue-200 relative overflow-hidden text-center scale-105 shadow-lg"
                >
                  <div
                    class="text-[10px] font-black text-blue-500/40 uppercase tracking-[0.2em] mb-2"
                  >
                    Child Component (Props View)
                  </div>
                  <div class="text-2xl font-black text-slate-900 border-t border-blue-50 pt-4 mt-2">
                    <span class="text-blue-600 text-sm block mb-1 font-bold">Received:</span>
                    <span class="text-blue-600">"</span>
                    {{ state.parentMsg }}
                    <span class="text-blue-600">"</span>
                  </div>
                </div>
              </div>

              <!-- STEP: Emits -->
              <div
                v-if="activeUnit.interactive === 'Emits'"
                class="w-full max-w-sm space-y-6 animate-scaleIn text-center"
              >
                <div class="p-8 bg-blue-600 rounded-[2.5rem] text-white shadow-xl shadow-blue-200">
                  <div class="text-[10px] font-black uppercase opacity-40 tracking-[0.2em] mb-4">
                    Child Component (Source)
                  </div>
                  <IButton
                    variant="outlined"
                    class="bg-white/10 border-white/20 text-white hover:bg-white hover:text-blue-600 !rounded-xl"
                    @click="state.status = 'Received!'"
                  >
                    發送事件 ($emit)
                  </IButton>
                </div>
                <div class="space-y-1">
                  <div class="text-[10px] font-black text-blue-500/40 uppercase tracking-[0.2em]">
                    Parent Handler Status
                  </div>
                  <div class="text-xl font-bold text-slate-900">{{ state.status }}</div>
                </div>
              </div>

              <!-- STEP: Lifecycle -->
              <div
                v-if="activeUnit.interactive === 'Lifecycle'"
                class="w-full max-w-sm space-y-8 animate-scaleIn text-center"
              >
                <div class="text-[10px] font-black text-blue-500/40 uppercase tracking-[0.2em]">
                  onMounted Hook
                </div>
                <div class="relative w-48 h-48 mx-auto flex items-center justify-center">
                  <div
                    class="absolute inset-0 border-8 border-blue-500 rounded-full border-t-transparent animate-spin"
                    style="animation-duration: 2s"
                  ></div>
                  <div class="text-5xl font-black text-slate-900 tracking-tighter">
                    {{ state.timer }}
                    <span class="text-xl text-slate-400">s</span>
                  </div>
                </div>
              </div>

              <!-- STEP: Composables -->
              <div
                v-if="activeUnit.interactive === 'Composables'"
                class="w-full max-w-sm space-y-8 animate-scaleIn text-center"
              >
                <div class="text-[10px] font-black text-indigo-500/40 uppercase tracking-[0.2em]">
                  Logic Reused (useMouse)
                </div>
                <div
                  class="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-200 relative overflow-hidden"
                >
                  <div class="grid grid-cols-2 gap-4">
                    <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                      <div class="text-2xl font-black text-indigo-600 text-center">
                        {{ state.mouseX }}
                      </div>
                    </div>
                    <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                      <div class="text-2xl font-black text-indigo-600 text-center">
                        {{ state.mouseY }}
                      </div>
                    </div>
                  </div>
                  <IButton
                    variant="primary"
                    class="mt-8 w-full !rounded-xl shadow-lg shadow-indigo-200"
                    @click="toggleTracking"
                  >
                    {{ state.isTracking ? '停止追蹤' : '啟動滑鼠追蹤' }}
                  </IButton>
                </div>
              </div>

              <!-- STEP: Pinia -->
              <div
                v-if="activeUnit.interactive === 'Pinia'"
                class="w-full max-w-sm space-y-6 animate-scaleIn"
              >
                <div class="grid grid-cols-2 gap-4">
                  <!-- Component A -->
                  <div
                    class="p-6 bg-indigo-50 border border-indigo-100 rounded-[2rem] text-center space-y-4"
                  >
                    <div class="text-[10px] font-black uppercase text-indigo-400">NavBar UI</div>
                    <div
                      class="w-12 h-12 bg-white rounded-full mx-auto flex items-center justify-center text-indigo-600 shadow-sm"
                    >
                      <IIcon
                        icon="mdi-account"
                        size="24"
                      />
                    </div>
                    <div class="text-xs font-black text-indigo-900 truncate">
                      {{ state.name }}
                    </div>
                  </div>
                  <!-- Component B -->
                  <div
                    class="p-6 bg-slate-50 border border-slate-200 rounded-[2rem] text-center space-y-4"
                  >
                    <div class="text-[10px] font-black uppercase text-slate-400">Profile UI</div>
                    <input
                      v-model="state.name"
                      class="w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-[10px] font-bold text-center outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                    <div class="text-[10px] text-slate-400 italic">Syncs Global</div>
                  </div>
                </div>
                <div
                  class="p-8 bg-indigo-600 rounded-[2.5rem] text-white shadow-xl shadow-indigo-100 text-center relative overflow-hidden"
                >
                  <div class="text-[10px] font-black uppercase opacity-40 tracking-[0.2em] mb-4">
                    Pinia Global Store
                  </div>
                  <div class="bg-white/10 p-5 rounded-3xl border border-white/20 backdrop-blur-md">
                    <div class="text-2xl font-black tracking-tight">{{ state.name }}</div>
                  </div>
                  <!-- Floating Icon -->
                  <IIcon
                    icon="mdi-database"
                    class="absolute -bottom-4 -right-4 text-white/5"
                    size="120"
                  />
                </div>
              </div>

              <!-- STEP: Mastery -->
              <div
                v-if="activeUnit.interactive === 'Mastery'"
                class="w-full max-w-sm animate-scaleIn text-center space-y-4"
              >
                <div class="text-[10px] font-black text-emerald-500/40 uppercase tracking-[0.2em]">
                  Todo App Preview
                </div>
                <div class="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 space-y-4">
                  <div class="flex gap-2">
                    <input
                      v-model="state.newTodo"
                      class="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-500/20"
                      placeholder="Add task..."
                      @keyup.enter="addTodo"
                    />
                  </div>
                  <ul class="text-left space-y-2 max-h-48 overflow-y-auto pr-2">
                    <li
                      v-for="(t, i) in state.todos"
                      :key="i"
                      class="bg-white px-4 py-3 rounded-xl border border-slate-100 flex items-center justify-between group transition-all"
                      :class="{ 'opacity-50 grayscale select-none': t.done }"
                    >
                      <div
                        class="flex items-center gap-3 cursor-pointer grow"
                        @click="toggleTodo(i)"
                      >
                        <div
                          class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
                          :class="
                            t.done
                              ? 'bg-emerald-500 border-emerald-500'
                              : 'border-slate-200 group-hover:border-emerald-200'
                          "
                        >
                          <IIcon
                            v-if="t.done"
                            icon="mdi-check"
                            size="12"
                            class="text-white"
                          />
                        </div>
                        <span
                          class="text-sm font-bold text-slate-700 transition-all"
                          :class="{ 'line-through text-slate-400': t.done }"
                        >
                          {{ t.text }}
                        </span>
                      </div>
                      <button
                        class="text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                        @click="removeTodo(i)"
                      >
                        <IIcon
                          icon="mdi-close"
                          size="14"
                        />
                      </button>
                    </li>
                  </ul>
                </div>
                <div class="flex items-center justify-between px-2 pt-2">
                  <div class="flex items-center gap-2 text-emerald-600">
                    <IIcon
                      icon="mdi-trophy"
                      size="20"
                    />
                    <span class="text-xs font-black italic">Challenge Mode</span>
                  </div>
                  <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {{ state.todos.filter((t: any) => t.done).length }} / {{ state.todos.length }}
                    Done
                  </div>
                </div>
              </div>

              <!-- Ambient Pattern -->
              <div
                class="absolute inset-0 opacity-[0.02] pointer-events-none"
                style="
                  background-image: radial-gradient(#2563eb 2px, transparent 2px);
                  background-size: 32px 32px;
                "
              ></div>
            </div>
          </div>

          <!-- Bottom Navigation Buttons -->
          <div class="flex gap-4 pt-10 pb-20 border-t border-slate-100">
            <IButton
              variant="outlined"
              size="large"
              :disabled="activeUnitIndex === 0"
              @click="activeUnitIndex--"
            >
              上一單元
            </IButton>
            <IButton
              variant="primary"
              size="large"
              :disabled="activeUnitIndex === units.length - 1"
              class="grow"
              @click="activeUnitIndex++"
            >
              我學會了，下一單元
            </IButton>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-scaleIn {
  animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.vue-course-layout {
  -webkit-font-smoothing: antialiased;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 3px;
}
</style>
