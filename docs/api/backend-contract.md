[← 返回文件導覽](../index.md)

# 後端 API 規範

## 目標讀者

負責開發後端 API 的工程師。

## 本文件說明

本文件定義前端與後端之間的 API 契約 (Contract),確保雙方能夠順利整合。

---

## 回應格式規範

### 成功回應

所有成功的 API 回應**必須**遵循以下格式:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    // 你的業務資料
  }
}
```

**欄位說明**:

| 欄位      | 類型   | 必填 | 說明                                |
| --------- | ------ | ---- | ----------------------------------- |
| `code`    | number | ✅   | 業務狀態碼,成功時為 200             |
| `message` | string | ✅   | 回應訊息,成功時通常為 "success"     |
| `data`    | any    | ✅   | 業務資料,可以是物件、陣列或基本型別 |

### 錯誤回應

所有錯誤回應**必須**遵循以下格式:

```json
{
  "code": 400,
  "message": "錯誤訊息",
  "errors": [
    {
      "field": "email",
      "message": "Email 格式不正確"
    }
  ]
}
```

**欄位說明**:

| 欄位      | 類型   | 必填 | 說明                                 |
| --------- | ------ | ---- | ------------------------------------ |
| `code`    | number | ✅   | 業務狀態碼,通常與 HTTP 狀態碼一致    |
| `message` | string | ✅   | 錯誤訊息,會顯示給使用者              |
| `errors`  | array  | ⚠️   | 詳細錯誤列表 (選填,用於表單驗證錯誤) |

### 分頁回應

對於列表類型的 API,建議使用以下格式:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "items": [
      { "id": 1, "name": "項目 1" },
      { "id": 2, "name": "項目 2" }
    ],
    "total": 100,
    "page": 1,
    "itemsPerPage": 10
  }
}
```

**分頁欄位說明**:

| 欄位           | 類型   | 必填 | 說明             |
| -------------- | ------ | ---- | ---------------- |
| `items`        | array  | ✅   | 當前頁的資料列表 |
| `total`        | number | ✅   | 總筆數           |
| `page`         | number | ⚠️   | 當前頁碼 (選填)  |
| `itemsPerPage` | number | ⚠️   | 每頁筆數 (選填)  |

---

## HTTP 狀態碼規範

前端會根據 HTTP 狀態碼做不同處理,請務必遵循以下規範:

| 狀態碼 | 說明           | 前端行為             |
| ------ | -------------- | -------------------- |
| 200    | 成功           | 正常處理資料         |
| 201    | 建立成功       | 正常處理資料         |
| 400    | 請求錯誤       | 顯示錯誤訊息         |
| 401    | 未授權         | **自動導向登入頁面** |
| 403    | 無權限         | 顯示錯誤訊息         |
| 404    | 找不到資源     | 顯示錯誤訊息         |
| 422    | 驗證失敗       | 顯示表單驗證錯誤     |
| 500    | 伺服器錯誤     | 顯示錯誤訊息         |
| 503    | 服務暫時不可用 | 顯示錯誤訊息         |

> [!IMPORTANT]
> **特別注意**: 當 Token 過期或無效時,**必須**回傳 HTTP 401,前端才會自動導向登入頁面。

---

## 認證機制

### Token 格式

本專案使用 **JWT (JSON Web Token)** 進行身份驗證。

### 登入流程

#### 1. 登入 API

**端點**: `POST /auth/login`

**請求格式**:

```json
{
  "username": "user@example.com",
  "password": "password123"
}
```

**成功回應**:

```json
{
  "code": 200,
  "message": "登入成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    "user": {
      "id": 1,
      "username": "user@example.com",
      "name": "使用者名稱",
      "email": "user@example.com"
    }
  }
}
```

**失敗回應**:

```json
{
  "code": 401,
  "message": "帳號或密碼錯誤"
}
```

#### 2. 後續請求

前端會在每個 API 請求的 Header 中自動帶入 Token:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

後端需要驗證此 Token,並根據驗證結果回傳對應的 HTTP 狀態碼。

### Token 過期處理

當 Token 過期時,後端**必須**回傳:

- **HTTP 狀態碼**: 401
- **回應格式**:

```json
{
  "code": 401,
  "message": "Token 已過期,請重新登入"
}
```

前端會自動:

1. 清除本地的 Token
2. 導向登入頁面
3. 顯示錯誤訊息

### Token 刷新 (選填)

如果你的系統支援 Token 刷新機制,可以提供以下 API:

**端點**: `POST /auth/refresh`

**請求格式**:

```json
{
  "refreshToken": "your-refresh-token"
}
```

**成功回應**:

```json
{
  "code": 200,
  "message": "Token 刷新成功",
  "data": {
    "token": "new-access-token",
    "refreshToken": "new-refresh-token"
  }
}
```

---

## CORS 設定

為了讓前端能夠正常呼叫後端 API,後端需要設定 CORS (Cross-Origin Resource Sharing)。

### 必要的 CORS Headers

```http
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, X-Request-ID, Accept-Language, X-CSRF-Token
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 86400
```

### 開發環境設定範例

#### Node.js (Express)

```javascript
const cors = require('cors')

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Request-ID',
      'Accept-Language',
      'X-CSRF-Token'
    ]
  })
)
```

#### Spring Boot (Java)

```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                    .allowedOrigins("http://localhost:3000")
                    .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                    .allowedHeaders("*")
                    .allowCredentials(true)
                    .maxAge(86400);
            }
        };
    }
}
```

#### ASP.NET Core (C#)

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddCors(options =>
    {
        options.AddPolicy("AllowFrontend",
            builder => builder
                .WithOrigins("http://localhost:3000")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());
    });
}

public void Configure(IApplicationBuilder app)
{
    app.UseCors("AllowFrontend");
}
```

### 正式環境設定

> [!WARNING]
> 正式環境請將 `Access-Control-Allow-Origin` 設定為你的正式網域,**不要使用 `*`**!

```http
Access-Control-Allow-Origin: https://your-production-domain.com
```

---

## 完整 API 範例

### 範例 1: 使用者列表 (分頁)

**端點**: `GET /users`

**查詢參數**:

| 參數         | 類型   | 必填 | 說明          |
| ------------ | ------ | ---- | ------------- |
| page         | number | ⚠️   | 頁碼 (預設 1) |
| itemsPerPage | number | ⚠️   | 每頁筆數      |
| q            | string | ⚠️   | 搜尋關鍵字    |

**請求範例**:

```http
GET /users?page=1&itemsPerPage=10&q=john
```

**成功回應**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "items": [
      {
        "id": 1,
        "username": "john.doe",
        "name": "John Doe",
        "email": "john@example.com",
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ],
    "total": 1,
    "page": 1,
    "itemsPerPage": 10
  }
}
```

### 範例 2: 取得單一使用者

**端點**: `GET /users/:id`

**請求範例**:

```http
GET /users/1
```

**成功回應**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "username": "john.doe",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "0912345678",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

**失敗回應** (找不到):

```json
{
  "code": 404,
  "message": "找不到該使用者"
}
```

### 範例 3: 建立使用者

**端點**: `POST /users`

**請求格式**:

```json
{
  "username": "jane.doe",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "securePassword123"
}
```

**成功回應**:

```json
{
  "code": 201,
  "message": "使用者建立成功",
  "data": {
    "id": 2,
    "username": "jane.doe",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "createdAt": "2024-01-21T11:54:00Z"
  }
}
```

**失敗回應** (驗證錯誤):

```json
{
  "code": 422,
  "message": "資料驗證失敗",
  "errors": [
    {
      "field": "email",
      "message": "Email 已被使用"
    },
    {
      "field": "password",
      "message": "密碼長度至少 8 個字元"
    }
  ]
}
```

### 範例 4: 更新使用者

**端點**: `PUT /users/:id` 或 `PATCH /users/:id`

**請求格式**:

```json
{
  "name": "Jane Smith",
  "phone": "0987654321"
}
```

**成功回應**:

```json
{
  "code": 200,
  "message": "使用者更新成功",
  "data": {
    "id": 2,
    "username": "jane.doe",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "0987654321",
    "updatedAt": "2024-01-21T12:00:00Z"
  }
}
```

### 範例 5: 刪除使用者

**端點**: `DELETE /users/:id`

**請求範例**:

```http
DELETE /users/2
```

**成功回應**:

```json
{
  "code": 200,
  "message": "使用者刪除成功",
  "data": null
}
```

或簡化版本:

```json
{
  "code": 200,
  "message": "使用者刪除成功"
}
```

---

## 其他 Headers

前端會自動在每個請求中帶入以下 Headers:

| Header            | 說明                  | 範例值                                 |
| ----------------- | --------------------- | -------------------------------------- |
| `Authorization`   | JWT Token             | `Bearer eyJhbGciOiJIUzI1NiIs...`       |
| `Content-Type`    | 請求內容類型          | `application/json`                     |
| `Accept-Language` | 使用者語言偏好        | `zh-TW`, `en-US`                       |
| `X-Request-ID`    | 請求追蹤 ID (UUID)    | `550e8400-e29b-41d4-a716-446655440000` |
| `X-CSRF-Token`    | CSRF Token (如果啟用) | `abc123...`                            |

後端可以利用這些 Headers 進行:

- **多語系**: 根據 `Accept-Language` 回傳對應語言的錯誤訊息
- **請求追蹤**: 使用 `X-Request-ID` 追蹤請求,方便除錯
- **CSRF 防護**: 驗證 `X-CSRF-Token`

---

## 注意事項

### 1. 時間格式

所有時間欄位請使用 **ISO 8601** 格式:

```json
{
  "createdAt": "2024-01-21T11:54:00Z",
  "updatedAt": "2024-01-21T12:00:00+08:00"
}
```

### 2. 數字精度

對於金額等需要高精度的數字,建議使用**字串**而非浮點數:

```json
{
  "price": "99.99",
  "total": "1234.56"
}
```

### 3. 空值處理

- 如果欄位沒有值,建議使用 `null` 而非空字串 `""`
- 如果陣列沒有資料,使用 `[]` 而非 `null`

```json
{
  "name": "John",
  "phone": null, // 沒有電話
  "tags": [] // 沒有標籤
}
```

### 4. 布林值

使用 `true` / `false`,不要使用 `1` / `0` 或 `"Y"` / `"N"`:

```json
{
  "isActive": true,
  "isDeleted": false
}
```

---

## 延伸閱讀

- [快速開始:API 串接](./quick-start.md) - 前端如何串接 API
- [環境設定指南](./environment-setup.md) - 環境變數設定
- [API 開發指南](./guide.md) - 前端 API 開發規範

---

## 總結

遵循本規範,可以確保前後端順利整合,減少溝通成本。

**核心要點**:

- ✅ 回應格式: `{ code, message, data }`
- ✅ Token 過期時回傳 HTTP 401
- ✅ 設定正確的 CORS Headers
- ✅ 使用 ISO 8601 時間格式
- ✅ 使用標準的 HTTP 狀態碼
