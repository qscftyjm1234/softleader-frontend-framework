# 組合式函式

本專案提供 27 個可重用的組合式函式 (Composables),涵蓋 API 呼叫、資料處理、表單驗證、檔案操作等核心功能。

## 📋 目錄

### 核心功能

- [useApi](#useapi) - API 呼叫封裝
- [useClient](#useclient) - 智慧型 API 客戶端
- [useRepository](#userepository) - Repository 模式
- [useRepositoryHelpers](#userepositoryhelpers) - Repository 輔助工具

### 資料處理

- [useFormatter](#useformatter) - 資料格式化
- [useDateTime](#usedatetime) - 日期時間處理
- [useOptions](#useoptions) - 選項資料管理
- [useTableData](#usetabledata) - 表格資料處理
- [usePagination](#usepagination) - 分頁處理

### 表單與驗證

- [useValidation](#usevalidation) - 表單驗證
- [useDebounce](#usedebounce) - 防抖處理

### 檔案操作

- [useFileUpload](#usefileupload) - 檔案上傳
- [useFileDownload](#usefiledownload) - 檔案下載

### UI 互動

- [useModal](#usemodal) - 彈窗管理
- [useNotify](#usenotify) - 通知訊息
- [useLoading](#useloading) - 載入狀態

### 系統與安全

- [usePermission](#usepermission) - 權限管理
- [useEncryption](#useencryption) - 加密解密
- [useStorage](#usestorage) - 本地儲存
- [useWatermark](#usewatermark) - 浮水印

### 裝置與環境

- [useAppDevice](#useappdevice) - 裝置偵測
- [useNetwork](#usenetwork) - 網路狀態
- [useIdle](#useidle) - 閒置偵測

### 其他工具

- [useFeatureFlag](#usefeatureflag) - 功能開關
- [useErrorHandler](#useerrorhandler) - 錯誤處理
- [useLanguage](#uselanguage) - 語言切換
- [useMenuFilter](#usemenufilter) - 選單過濾
- [useCustomIcon](#usecustomicon) - 自訂圖示

---

## 核心功能

### useApi

**用途**: 封裝 Nuxt 的 `useFetch`,提供統一的 API 呼叫介面

**主要功能**:

- 自動處理 Token 認證
- 統一錯誤處理
- 全域 Loading 控制
- 請求/回應攔截器
- Mock 資料支援
- 自動資料拆包

**使用範例**:

```typescript
// 基本使用
const { data, error, pending } = await useApi<User>('/api/user/profile')

// 帶參數的 POST 請求
const { data } = await useApi('/api/user/update', {
  method: 'POST',
  body: { name: '張三', email: 'test@example.com' },
  globalLoading: true, // 顯示全域 Loading
  autoError: true, // 自動顯示錯誤訊息
  autoSuccess: '更新成功' // 自動顯示成功訊息
})

// 使用本地 Loading Ref
const isLoading = ref(false)
const { data } = await useApi('/api/data', {
  loadingRef: isLoading
})
```

**自訂選項**:

| 選項            | 類型                | 說明                     |
| --------------- | ------------------- | ------------------------ |
| `globalLoading` | `boolean`           | 是否顯示全域 Loading     |
| `autoError`     | `boolean`           | 是否自動顯示錯誤訊息     |
| `autoSuccess`   | `boolean \| string` | 是否自動顯示成功訊息     |
| `loadingRef`    | `Ref<boolean>`      | 本地 Loading 狀態        |
| `auth`          | `boolean`           | 是否需要認證 (預設 true) |
| `prefix`        | `string`            | API 路徑前綴             |

---

### useClient

**用途**: 建立具備特定 Prefix 的 API 客戶端,簡化 Repository 代碼

**主要功能**:

- 自動注入路徑前綴
- 提供 RESTful 方法 (GET/POST/PUT/PATCH/DELETE)
- 繼承 `useApi` 所有功能

**使用範例**:

```typescript
// 建立客戶端
const api = useClient('/jasmine-mar/policy')

// 使用 RESTful 方法
const { data: list } = await api.get('/list') // GET /jasmine-mar/policy/list
const { data: detail } = await api.get('/detail/123') // GET /jasmine-mar/policy/detail/123
const { data: created } = await api.post('/create', { name: '新保單' })
const { data: updated } = await api.put('/update/123', { status: 'active' })
await api.delete('/delete/123')

// 在 Repository 中使用
export const usePolicyRepository = () => {
  const api = useClient('/jasmine-mar/policy')

  return {
    fetchList: () => api.get('/list'),
    fetchDetail: (id: string) => api.get(`/detail/${id}`),
    create: (data: any) => api.post('/create', data),
    update: (id: string, data: any) => api.put(`/update/${id}`, data),
    delete: (id: string) => api.delete(`/delete/${id}`)
  }
}
```

---

### useRepository

**用途**: Repository 模式的統一入口

**使用範例**:

```typescript
// 在 api/repositories/user.ts 定義
export const useUserRepository = () => {
  const api = useClient('/api/user')

  return {
    fetchProfile: () => api.get('/profile'),
    updateProfile: (data: any) => api.put('/profile', data)
  }
}

// 在元件中使用
const userRepo = useRepository('user')
const { data: profile } = await userRepo.fetchProfile()
```

---

### useRepositoryHelpers

**用途**: 提供 Repository 常用的輔助方法

**主要功能**:

- 批次請求處理
- 資料轉換
- 快取管理

---

## 資料處理

### useFormatter

**用途**: 提供數字、字串、電話號碼等格式化功能

**主要方法**:

#### 數字格式化

```typescript
const { formatNumber, formatCurrency, formatPercent } = useFormatter()

formatNumber(1234567.89) // "1,234,567.89"
formatNumber(1234567.89, 0) // "1,234,568"
formatCurrency(1234567) // "NT$ 1,234,567"
formatCurrency(1234567, 'USD', 2) // "USD 1,234,567.00"
formatPercent(0.856) // "85.60%"
formatPercent(85.6, 2, false) // "85.60%"
```

#### 電話與證件格式化

```typescript
const { formatPhone, formatTaiwanId, formatCreditCard } = useFormatter()

formatPhone('0912345678') // "0912-345678"
formatTaiwanId('A123456789') // "A123456789"
formatCreditCard('1234567890123456') // "1234-5678-9012-3456"
```

#### 字串處理

```typescript
const { capitalize, capitalizeWords, uppercase, lowercase, truncate, trim, removeSpaces } =
  useFormatter()

capitalize('hello world') // "Hello world"
capitalizeWords('hello world') // "Hello World"
uppercase('hello') // "HELLO"
lowercase('HELLO') // "hello"
truncate('這是一段很長的文字', 5) // "這是一段很..."
trim('  hello  ') // "hello"
removeSpaces('h e l l o') // "hello"
```

#### 遮罩處理

```typescript
const { mask, maskEmail, maskPhone } = useFormatter()

mask('1234567890', 3, 7) // "123****890"
maskEmail('test@example.com') // "te**@example.com"
maskPhone('0912345678') // "0912***678"
```

#### 其他格式化

```typescript
const { formatFileSize, formatJson, padZero, stripHtml } = useFormatter()

formatFileSize(1024) // "1.00 KB"
formatFileSize(1048576) // "1.00 MB"
formatJson({ name: 'test' }) // "{\n  \"name\": \"test\"\n}"
padZero(5) // "05"
padZero(5, 3) // "005"
stripHtml('<p>Hello</p>') // "Hello"
```

---

### useDateTime

**用途**: 完整的日期時間格式化、解析、計算與驗證功能

**主要方法**:

#### 格式化

```typescript
const { formatDate, formatTime, formatDateTime, formatRelative } = useDateTime()

formatDate(new Date()) // "2024-01-09"
formatDate(new Date(), 'YYYY/MM/DD') // "2024/01/09"
formatDate(new Date(), 'YYYY年MM月DD日') // "2024年01月09日"

formatTime(new Date()) // "15:30:00"
formatTime(new Date(), 'HH:mm') // "15:30"

formatDateTime(new Date()) // "2024-01-09 15:30:00"

formatRelative(new Date(Date.now() - 3600000)) // "1 小時前"
formatRelative(new Date(Date.now() + 86400000)) // "1 天後"
```

#### 解析

```typescript
const { parseISO, parseTimestamp } = useDateTime()

parseISO('2024-01-09T15:30:00.000Z') // Date 物件
parseTimestamp(1704812400000) // Date 物件
```

#### 計算

```typescript
const { add, subtract, diff } = useDateTime()

add(new Date(), 7, 'day') // 7 天後
add(new Date(), 3, 'month') // 3 個月後
subtract(new Date(), 1, 'year') // 1 年前

diff(date1, date2, 'day') // 相差天數
diff(date1, date2, 'hour') // 相差小時數
```

#### 判斷

```typescript
const { isBefore, isAfter, isSameDay } = useDateTime()

isBefore(date1, date2) // date1 是否在 date2 之前
isAfter(date1, date2) // date1 是否在 date2 之後
isSameDay(date1, date2) // 是否為同一天
```

#### 時間範圍

```typescript
const {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear
} = useDateTime()

startOfDay() // 今天 00:00:00
endOfDay() // 今天 23:59:59
startOfWeek() // 本週一 00:00:00
endOfWeek() // 本週日 23:59:59
```

---

### useOptions

**用途**: 強大的選項資料管理系統,支援靜態/動態資料、快取、擴充方法

**主要功能**:

- 支援靜態陣列、API 呼叫、函式定義
- 自動快取管理 (5 分鐘 TTL)
- 豐富的擴充方法
- 支援參數化呼叫

**使用範例**:

```typescript
// 1. 註冊選項
const options = useOptions()

// 靜態資料
options.register('gender', [
  { label: '男', value: 'M' },
  { label: '女', value: 'F' }
])

// API 呼叫
options.register('cities', '/api/cities')

// 函式定義 (支援參數)
options.register('districts', (cityId: string) => `/api/districts/${cityId}`)

// 2. 使用選項
const genderOptions = options.gender // [{ label: '男', value: 'M' }, ...]
const cityOptions = options.cities // 自動呼叫 API

// 3. 擴充方法
options.gender.withAll // 加入「全部」選項
options.gender.other // 加入「其他」選項
options.gender.label('M') // 取得 label: "男"
options.gender.findByValue('M') // 取得完整物件
options.gender.exclude(['M']) // 排除特定選項
options.gender.only(['M', 'F']) // 只保留特定選項

// 4. 參數化呼叫
const districtOptions = options.districts('taipei') // 自動呼叫 /api/districts/taipei

// 5. 強制重新載入
await options.cities.reload()
```

**擴充方法列表**:

| 方法                 | 說明                    | 範例                              |
| -------------------- | ----------------------- | --------------------------------- |
| `withAll`            | 加入「全部」選項        | `options.gender.withAll`          |
| `other`              | 加入「其他」選項        | `options.gender.other`            |
| `label(value)`       | 根據 value 取得 label   | `options.gender.label('M')`       |
| `findByValue(value)` | 根據 value 取得完整物件 | `options.gender.findByValue('M')` |
| `exclude(values)`    | 排除特定選項            | `options.gender.exclude(['M'])`   |
| `only(values)`       | 只保留特定選項          | `options.gender.only(['M', 'F'])` |
| `isLoading`          | 取得載入狀態            | `options.cities.isLoading`        |
| `isLoaded`           | 是否已載入完成          | `options.cities.isLoaded`         |
| `reload()`           | 強制重新載入            | `await options.cities.reload()`   |

---

### useTableData

**用途**: 表格資料處理與管理

**主要功能**:

- 資料排序
- 資料篩選
- 欄位選擇

---

### usePagination

**用途**: 分頁邏輯處理

**使用範例**:

```typescript
const { currentPage, pageSize, totalItems, totalPages, goToPage, nextPage, prevPage, setPageSize } =
  usePagination({
    initialPage: 1,
    initialPageSize: 10,
    totalItems: 100
  })

// 分頁操作
goToPage(2) // 跳到第 2 頁
nextPage() // 下一頁
prevPage() // 上一頁
setPageSize(20) // 改變每頁筆數
```

---

## 表單與驗證

### useValidation

**用途**: 提供常用的驗證規則與自訂驗證功能

**主要方法**:

#### 基本驗證

```typescript
const { required, email, phone, url, taiwanId } = useValidation()

required('') // { valid: false, message: '此欄位為必填' }
required('test') // { valid: true }

email('test@example.com') // { valid: true }
email('invalid') // { valid: false, message: 'Email 格式不正確' }

phone('0912345678') // { valid: true }
taiwanId('A123456789') // { valid: true }
url('https://example.com') // { valid: true }
```

#### 長度與範圍驗證

```typescript
const { minLength, maxLength, range, number, integer, positive } = useValidation()

minLength(3)('ab') // { valid: false, message: '長度不得少於 3 個字元' }
maxLength(10)('12345678901') // { valid: false }
range(1, 100)(50) // { valid: true }
number('123') // { valid: true }
integer(123.45) // { valid: false, message: '必須為整數' }
positive(10) // { valid: true }
```

#### 自訂驗證

```typescript
const { pattern, sameAs } = useValidation()

// 正則表達式驗證
const zipCodeRule = pattern(/^\d{5}$/, '郵遞區號格式不正確')
zipCodeRule('12345') // { valid: true }

// 確認密碼
const password = ref('123456')
const confirmRule = sameAs(password.value, '兩次密碼不一致')
confirmRule('123456') // { valid: true }
```

#### 批次驗證

```typescript
const { validate, validateFields, isAllValid } = useValidation()

// 單一欄位多規則驗證
const result = validate('test@example.com', [required, email])

// 多欄位驗證
const formData = {
  name: '張三',
  email: 'test@example.com',
  age: 25
}

const rules = {
  name: [required],
  email: [required, email],
  age: [required, number, range(18, 100)]
}

const results = validateFields(formData, rules)
// { name: { valid: true }, email: { valid: true }, age: { valid: true } }

isAllValid(results) // true
```

---

### useDebounce

**用途**: 防抖處理,延遲執行函式

**使用範例**:

```typescript
const { debounce, debouncedRef } = useDebounce()

// 防抖函式
const search = debounce((keyword: string) => {
  console.log('搜尋:', keyword)
}, 500)

search('test') // 500ms 後執行

// 防抖 Ref
const keyword = debouncedRef('', 500)
watch(keyword, (value) => {
  console.log('搜尋:', value)
})
```

---

## 檔案操作

### useFileUpload

**用途**: 支援單檔、多檔上傳,以及各種檔案類型驗證

**主要功能**:

- 單檔/多檔上傳
- 檔案類型驗證
- 檔案大小限制
- 上傳進度追蹤
- Base64/Blob 上傳

**使用範例**:

```typescript
const { uploadFile, uploadFiles, uploadFromInput, uploadFromBase64 } = useFileUpload()

// 單檔上傳
const result = await uploadFile(file, {
  endpoint: '/api/upload',
  maxSize: 5 * 1024 * 1024, // 5MB
  accept: ['image/jpeg', 'image/png'],
  onProgress: (progress) => console.log(`上傳進度: ${progress}%`),
  onSuccess: (response) => console.log('上傳成功', response),
  onError: (error) => console.error('上傳失敗', error)
})

// 多檔上傳
const results = await uploadFiles([file1, file2], {
  endpoint: '/api/upload/multiple',
  multiple: true
})

// 從 Input 元素上傳
const handleFileChange = async (event: Event) => {
  const result = await uploadFromInput(event, {
    endpoint: '/api/upload'
  })
}

// 從 Base64 上傳
const result = await uploadFromBase64(base64String, 'image.jpg', {
  endpoint: '/api/upload'
})
```

**檔案類型分組**:

```typescript
// 使用預定義的檔案類型分組
accept: ['image'] // 接受所有圖片格式
accept: ['document'] // 接受所有文件格式 (PDF, Word, Excel 等)
accept: ['video'] // 接受所有影片格式
accept: ['audio'] // 接受所有音訊格式
accept: ['archive'] // 接受所有壓縮檔格式
```

---

### useFileDownload

**用途**: 檔案下載處理

**主要功能**:

- Blob 下載
- URL 下載
- Base64 下載
- 自動檔名處理

**使用範例**:

```typescript
const { downloadFile, downloadFromUrl, downloadFromBase64 } = useFileDownload()

// 從 API 下載
const blob = await fetch('/api/file/123').then((r) => r.blob())
downloadFile(blob, 'document.pdf')

// 從 URL 下載
await downloadFromUrl('https://example.com/file.pdf', 'my-file.pdf')

// 從 Base64 下載
downloadFromBase64(base64String, 'image.jpg', 'image/jpeg')
```

---

## UI 互動

### useModal

**用途**: 彈窗管理

**使用範例**:

```typescript
const { isOpen, open, close, toggle } = useModal()

// 開啟彈窗
open()

// 關閉彈窗
close()

// 切換狀態
toggle()

// 在模板中使用
<Modal v-model="isOpen">
  <p>彈窗內容</p>
</Modal>
```

---

### useNotify

**用途**: 通知訊息管理

**使用範例**:

```typescript
const { success, error, warning, info } = useNotify()

success('操作成功')
error('操作失敗')
warning('請注意')
info('提示訊息')
```

---

### useLoading

**用途**: 載入狀態管理

**使用範例**:

```typescript
const { isLoading, startLoading, stopLoading } = useLoading()

startLoading()
// 執行非同步操作
await fetchData()
stopLoading()
```

---

## 系統與安全

### usePermission

**用途**: 權限管理與角色驗證

**使用範例**:

```typescript
const {
  hasRole,
  hasPermission,
  hasAllRoles,
  hasAnyRole,
  setRoles,
  setPermissions,
  addRole,
  removeRole
} = usePermission({
  roles: ['admin', 'user'],
  permissions: { 'user:read': true, 'user:write': true }
})

// 檢查角色
hasRole('admin') // true
hasRole(['admin', 'superadmin']) // true (任一符合)
hasAllRoles(['admin', 'user']) // true (全部符合)
hasAnyRole(['admin', 'guest']) // true (任一符合)

// 檢查權限
hasPermission('user:read') // true
hasAllPermissions(['user:read', 'user:write']) // true

// 動態管理
addRole('editor')
removeRole('user')
setRoles(['admin'])
setPermissions({ 'user:delete': true })
```

---

### useEncryption

**用途**: 加密解密處理

**主要功能**:

- AES 加密/解密
- Base64 編碼/解碼
- MD5 雜湊

**使用範例**:

```typescript
const { encrypt, decrypt, hash } = useEncryption()

// AES 加密
const encrypted = encrypt('敏感資料', 'secret-key')

// AES 解密
const decrypted = decrypt(encrypted, 'secret-key')

// MD5 雜湊
const hashed = hash('password')
```

---

### useStorage

**用途**: 本地儲存管理 (localStorage/sessionStorage)

**使用範例**:

```typescript
const { get, set, remove, clear } = useStorage('local') // 或 'session'

// 儲存資料
set('user', { name: '張三', age: 25 })

// 讀取資料
const user = get('user') // { name: '張三', age: 25 }

// 刪除資料
remove('user')

// 清空所有資料
clear()
```

---

### useWatermark

**用途**: 浮水印管理

**使用範例**:

```typescript
const { create, remove } = useWatermark()

// 建立浮水印
create({
  text: '機密文件',
  fontSize: 16,
  color: 'rgba(0, 0, 0, 0.1)',
  rotate: -30
})

// 移除浮水印
remove()
```

---

## 裝置與環境

### useAppDevice

**用途**: 裝置偵測與資訊

**使用範例**:

```typescript
const { isMobile, isTablet, isDesktop, isIOS, isAndroid, deviceType, osType, browserType } =
  useAppDevice()

if (isMobile.value) {
  console.log('行動裝置')
}

console.log('裝置類型:', deviceType.value) // 'mobile' | 'tablet' | 'desktop'
console.log('作業系統:', osType.value) // 'ios' | 'android' | 'windows' | 'macos'
console.log('瀏覽器:', browserType.value) // 'chrome' | 'safari' | 'firefox' | 'edge'
```

---

### useNetwork

**用途**: 網路狀態偵測

**使用範例**:

```typescript
const { isOnline, isOffline, networkType } = useNetwork()

watch(isOnline, (online) => {
  if (online) {
    console.log('網路已連線')
  } else {
    console.log('網路已斷線')
  }
})

console.log('網路類型:', networkType.value) // '4g' | 'wifi' | 'ethernet'
```

---

### useIdle

**用途**: 使用者閒置偵測

**使用範例**:

```typescript
const { isIdle, lastActive } = useIdle({
  timeout: 5 * 60 * 1000 // 5 分鐘
})

watch(isIdle, (idle) => {
  if (idle) {
    console.log('使用者已閒置 5 分鐘')
    // 執行登出或其他操作
  }
})
```

---

## 其他工具

### useFeatureFlag

**用途**: 功能開關管理

**使用範例**:

```typescript
const { isEnabled, enable, disable, toggle } = useFeatureFlag()

// 檢查功能是否啟用
if (isEnabled('new-feature')) {
  // 顯示新功能
}

// 動態控制
enable('new-feature')
disable('old-feature')
toggle('beta-feature')
```

---

### useErrorHandler

**用途**: 統一錯誤處理

**使用範例**:

```typescript
const { handleError, captureError } = useErrorHandler()

try {
  await riskyOperation()
} catch (error) {
  handleError(error, {
    showNotification: true,
    logToServer: true
  })
}
```

---

### useLanguage

**用途**: 語言切換

**使用範例**:

```typescript
const { currentLanguage, setLanguage, availableLanguages } = useLanguage()

setLanguage('en')
console.log('當前語言:', currentLanguage.value) // 'en'
console.log('可用語言:', availableLanguages.value) // ['zh-TW', 'en']
```

---

### useMenuFilter

**用途**: 選單過濾與權限控制

**使用範例**:

```typescript
const { filterMenuByPermission } = useMenuFilter()

const filteredMenu = filterMenuByPermission(menuItems, userPermissions)
```

---

### useCustomIcon

**用途**: 自訂圖示管理

**使用範例**:

```typescript
const { getIcon, registerIcon } = useCustomIcon()

// 註冊自訂圖示
registerIcon('custom-icon', '<svg>...</svg>')

// 使用圖示
const iconSvg = getIcon('custom-icon')
```

---

## 最佳實踐

### 1. 選擇合適的 Composable

- **API 呼叫**: 優先使用 `useClient` 建立 Repository
- **表單驗證**: 使用 `useValidation` 的批次驗證方法
- **資料格式化**: 統一使用 `useFormatter` 和 `useDateTime`
- **選項資料**: 使用 `useOptions` 統一管理

### 2. 效能優化

- 善用 `useOptions` 的快取機制
- 使用 `useDebounce` 處理高頻事件
- 使用 `loadingRef` 避免全域 Loading

### 3. 錯誤處理

- 使用 `useApi` 的 `autoError` 選項
- 使用 `useErrorHandler` 統一處理錯誤
- 在 Repository 層處理業務邏輯錯誤

### 4. 型別安全

- 使用 TypeScript 泛型定義資料型別
- 為 API 回應定義 Interface
- 使用 `useValidation` 確保資料正確性

---

## 相關文件

- [API 指南](../api/guide.md) - API 呼叫規範
- [Repository Pattern](../api/repository-pattern.md) - Repository 模式說明
- [狀態管理](./stores.md) - Pinia Store 使用
- [開發規範](../guides/development.md) - 程式碼風格與開發流程
