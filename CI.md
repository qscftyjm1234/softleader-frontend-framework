# 富邦行動保全系統 - CI (持續整合)

**CI (Continuous Integration)** 意指持續整合，開發者會頻繁地將程式碼合併到主線中。本專案透過自動化腳本執行測試、打包 Docker Image 並推送到映像檔倉庫 (JFrog)，確保程式碼的穩定性與一致性。

本文件說明 CI 流程，包含打包 Image、Nginx 配置。

---

## 目錄

1. [打包 Image 的步驟及說明](#1-打包-image-的步驟及說明)
2. [部署注意事項：解決 Lazy Load 導致的 404 問題](#3-部署注意事項解決-lazy-load-導致的-404-問題)
3. [Nginx 配置設定及說明](#4-nginx-配置設定及說明)

---

## 1. 打包 Image 的步驟及說明

### 1.1 前置作業

#### 確認 node_modules

執行前，先確認專案是否有 `node_modules` 資料夾：

- 若沒有，需先下載 `node_modules.zip`，解壓縮到專案根目錄中

### 1.2 打包靜態資源

在專案根目錄執行：

```bash
npm run generate
```

執行完成後，靜態資源將被打包至專案根目錄下的 `dist` 資料夾。

### 1.3 版本更新（可選）

如需更新版本號（假設要更新成 `1.0.x`），需修改以下檔案：

1. **修改 Kustomization 版本配置**
   - 檔案位置：`deploy/base/kustomization.yaml`
   - 修改內容：
     ```yaml
     images:
       - name: com.fubonlife/app
         newName: jfrog.fbl.com.tw/mpos-ui-sit/mps-ui
         newTag: 1.0.x # 更新此處版本號
     ```

2. **修改各環境的 overlay 配置**
   - SIT2 環境：`deploy/overlays/sit2/kustomization.yaml`
   - SIT3 環境：`deploy/overlays/sit3/kustomization.yaml`
   - 修改相應的 `newTag` 版本號

3. **修改打包腳本版本號**
   - 檔案位置：`build-image-script/build-image-sit.sh`（或對應環境的腳本）
   - 修改 image tag：
     ```bash
     podman build -t jfrog.fbl.com.tw/mpos-ui-sit/mps-ui:1.0.x ...
     ```

### 1.4 打包 Docker Image

#### 檢查本機環境

首先檢查本機是否有安裝能夠處理 Dockerfile 的工具：

- Docker
- Buildx
- Podman

#### 若本機無工具，使用過版機打包

**步驟 1：上傳必要檔案至過版機**

```bash
# Dockerfile（若有異動才需要）
scp -o MACs=hmac-sha2-256 Dockerfile-nginx-local ansfrontmpos@sdtwlnx00203:/dkhome/ansfrontmpos/mps-ui/image

# 打包腳本（若有異動才需要）
scp -o MACs=hmac-sha2-256 build-image-script/build-image-sit.sh ansfrontmpos@sdtwlnx00203:/dkhome/ansfrontmpos/mps-ui/image

# nginx 設定檔（若有異動才需要）
scp -r -o MACs=hmac-sha2-256 nginx ansfrontmpos@sdtwlnx00203:/dkhome/ansfrontmpos/mps-ui/image

# 靜態資源（每次都需要）
scp -r -o MACs=hmac-sha2-256 dist ansfrontmpos@sdtwlnx00203:/dkhome/ansfrontmpos/mps-ui/image
```

**步驟 2：登入過版機並執行打包**

```bash
# 連線過版機
ssh ansfrontmpos@sdtwlnx00203
cd /dkhome/ansfrontmpos/mps-ui/image

# 執行打包腳本（依環境選擇對應腳本）
sh build-image-sit.sh    # SIT 環境
sh build-image-sit2.sh   # SIT2 環境
sh build-image-sit3.sh   # SIT3 環境
```

### 1.5 Dockerfile 說明

**檔案：`Dockerfile-nginx-local`**

```dockerfile
FROM jfrog.fbl.com.tw/fbl_base_image/fb-alpine-nginx:1.26-alpine3.19_2024Q4
COPY --chmod=755 dist /usr/share/nginx/html
COPY --chmod=755 nginx/nginx.conf /etc/nginx/nginx.conf
COPY --chmod=755 nginx/mime.types /etc/nginx/mime.types
COPY --chmod=755 nginx/nginx.default.conf.template /etc/nginx/templates/
EXPOSE 8080
```

**說明：**

- **基礎映像檔**：使用富邦人壽內部的 Alpine Nginx 1.26 映像檔
- **靜態資源**：將打包後的 `dist` 資料夾複製到 Nginx 的 HTML 目錄
- **Nginx 設定檔**：
  - `nginx.conf`：主設定檔
  - `mime.types`：MIME 類型定義檔
  - `nginx.default.conf.template`：Server 區塊設定模板
- **對外埠號**：8080

### 1.6 打包腳本說明

**範例：`build-image-script/build-image-sit.sh`**

```bash
podman build -t jfrog.fbl.com.tw/mpos-ui-sit/mps-ui:1.0.0 -f Dockerfile-nginx-local /dkhome/ansfrontmpos/mps-ui/image
podman login jfrog.fbl.com.tw -u A9726 -p Aa123456
podman push jfrog.fbl.com.tw/mpos-ui-sit/mps-ui:1.0.0
```

**說明：**

1. **podman build**：使用 Podman 建置 Docker Image
   - `-t`：指定 image 名稱及標籤
   - `-f`：指定 Dockerfile 路徑
   - 最後參數：建置上下文路徑
2. **podman login**：登入 JFrog Artifactory
3. **podman push**：將 Image 推送至 JFrog Registry

**不同環境的差異：**

- **SIT**：`jfrog.fbl.com.tw/mpos-ui-sit/mps-ui`
- **SIT2**：`jfrog.fbl.com.tw/mpos-ui-sit/mps-ui-01`
- **SIT3**：`jfrog.fbl.com.tw/mpos-ui-sit/mps-ui-02`

---

## 3. 部署注意事項：解決 Lazy Load 導致的 404 問題

在 Nuxt 3 專案中，由於使用了 **Lazy Loading（隨選下載）**，上版更新時經常會遇到使用者「換頁 404」的問題。以下是解決方案：

### 3.1 基礎原理

- **原因**：使用者瀏覽器紀錄的是舊版的 JS 檔名（含舊 Hash），但部署時若將伺服器檔案清空，舊檔消失，使用者換頁就會抓不到檔案而噴 404。

### 3.2 CI/CD 端的應對策略 (必做)

在執行資源上傳或同步時，應採用 **「增量更新 (Incremental Update)」**，保留舊版本的檔案至少一段時間。

**範例 (以 S3 為例)：**

```bash
# ❌ 錯誤：加上 --delete 會砍掉舊檔案，導致舊使用者 404
aws s3 sync ./dist s3://my-bucket --delete

# ✅ 正確：不加 --delete，保留舊 Hash 檔案
aws s3 sync ./dist s3://my-bucket
```

- **建議**：定期（例如每週）才執行一次清理過期（例如 7 天前）的靜態資源。

### 3.3 前端插件補強策略

建議在專案中加入錯誤攔截插件，當偵測到 Chunk 載入失敗時，強制瀏覽器重新整理 (Reload)。

**檔案位置：`plugins/error-handler.client.ts`**

```typescript
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:chunkError', () => {
    // 偵測到版本更新導致的 404，強制刷新抓取新版索引
    window.location.reload()
  })
})
```

---

## 4. Nginx 配置設定及說明

Nginx 配置檔案位於 `nginx/` 資料夾，包含三個主要檔案。

### 2.1 nginx.conf - 主設定檔

**檔案位置：`nginx/nginx.conf`**

#### 核心配置

```nginx
pid /tmp/nginx.pid;
error_log  /var/log/nginx/error.log warn;
worker_processes auto;
worker_rlimit_nofile 100000;
```

**說明：**

- **pid**：PID 檔案路徑（使用 /tmp 以符合非 root 執行環境）
- **worker_processes auto**：自動偵測 CPU 核心數，動態調整工作程序數量
- **worker_rlimit_nofile**：每個工作程序可開啟的檔案描述符數量上限（10 萬）

#### Events 區塊

```nginx
events {
  worker_connections 4000;
  use epoll;
  multi_accept on;
}
```

**說明：**

- **worker_connections**：每個工作程序的最大並發連線數（4000）
- **use epoll**：使用 epoll 事件驅動模型（Linux 環境最佳效能）
- **multi_accept on**：允許一次接受多個新連線

#### HTTP 區塊 - 安全性設定

```nginx
http {
  server_tokens off;  # 隱藏 Nginx 版本資訊
  charset UTF-8;      # 預設字元編碼
```

#### 檔案快取優化

```nginx
open_file_cache max=200000 inactive=20s;
open_file_cache_valid 30s;
open_file_cache_min_uses 2;
open_file_cache_errors on;
```

**說明：**

- **max=200000**：快取最多 20 萬個檔案描述符
- **inactive=20s**：20 秒內未使用則移除
- **valid=30s**：每 30 秒驗證快取有效性
- **min_uses=2**：被訪問 2 次以上才快取

#### Gzip 壓縮

```nginx
gzip on;
gzip_static on;
gzip_min_length 1024;
gzip_comp_level 4;
gzip_vary on;
gzip_disable msie6;
gzip_types
    text/css
    text/javascript
    application/javascript
    application/json
    ...
```

**說明：**

- **gzip on**：啟用動態壓縮
- **gzip_static on**：優先使用預先壓縮的 .gz 檔案
- **gzip_min_length 1024**：檔案大於 1KB 才壓縮
- **gzip_comp_level 4**：壓縮等級（1-9，4 為效能與壓縮率的平衡點）
- **gzip_types**：指定需要壓縮的 MIME 類型

#### 連線與超時設定

```nginx
reset_timedout_connection on;
client_header_timeout 120;
client_body_timeout 120;
send_timeout 2;
keepalive_timeout 400;
keepalive_requests 100000;
```

**說明：**

- **keepalive_timeout 400**：Keep-Alive 連線保持 400 秒
- **keepalive_requests 100000**：單一連線最多處理 10 萬個請求
- **client_max_body_size 50m**：允許上傳最大 50MB

#### Proxy 設定

```nginx
proxy_read_timeout 400;
proxy_connect_timeout 400;
proxy_send_timeout 400;
```

**說明：**

- 設定代理超時時間為 400 秒，適用於長時間 API 請求

#### 其他重要設定

```nginx
port_in_redirect off;  # 確保重定向不包含內部容器埠號 8080
```

### 2.2 nginx.default.conf.template - Server 區塊設定

**檔案位置：`nginx/nginx.default.conf.template`**

#### 基本設定

```nginx
server {
  listen 8080;
  server_name localhost;
  absolute_redirect off;
  root /usr/share/nginx/html;
```

**說明：**

- **listen 8080**：監聽 8080 埠
- **absolute_redirect off**：使用相對路徑重定向
- **root**：靜態檔案根目錄

#### 安全性標頭（Security Headers）

```nginx
add_header Set-Cookie "Path=/; Secure; HttpOnly; SameSite=Strict" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
```

**說明：**

- **HSTS**：強制使用 HTTPS，有效期一年
- **X-Frame-Options**：防止點擊劫持（Clickjacking）
- **X-Content-Type-Options**：防止 MIME 類型嗅探
- **X-XSS-Protection**：啟用瀏覽器 XSS 防護
- **Referrer-Policy**：控制 Referer 標頭的傳送策略

#### 內容安全政策（CSP）

```nginx
add_header Conent-Security-Policy "
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self';
  font-src 'self';
  connect-src 'self';
  frame-ancestors 'none';
" always;
```

**說明：**

- **default-src 'self'**：預設只允許同源資源
- **unsafe-inline**：允許內嵌 script 和 style（Vue/Nuxt 等 SPA 框架需要）
- **frame-ancestors 'none'**：不允許被嵌入 iframe

#### 權限政策（Permissions Policy）

```nginx
add_header Permissions-Policy "
  camera=(self),
  display-capture=(self),
  fullscreen=(self),
  microphone=(self),
  geolocation=(self),
  accelerometer=(),
  autoplay=(),
  ...
" always;
```

**說明：**

- 精細控制瀏覽器功能權限
- 限制敏感功能僅限同源使用
- 禁用不必要的功能（如 autoplay、payment 等）

#### 自訂標頭

```nginx
add_header X-Edge-App "${POD_NAME}";
```

**說明：**

- 回傳處理請求的 Kubernetes Pod 名稱，方便除錯

#### 健康檢查端點

```nginx
location /healthz {
  return 200;
}
```

**說明：**

- 提供 Kubernetes 的健康檢查端點
- 直接回傳 HTTP 200

#### API 代理

```nginx
location /api/ {
  proxy_http_version 1.1;
  rewrite ^/api/(.*) /v1/$1 break;

  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Host $server_name;
  proxy_set_header X-Forwarded-Proto $scheme;
  proxy_pass_header Set-Cookie;
  proxy_pass ${API_URL};

  access_log /dev/stdout proxy_log;
  rewrite_log on;
  error_log /dev/stdout notice;
}
```

**說明：**

- **rewrite**：將 `/api/*` 改寫為 `/v1/*` 後轉發
- **proxy_set_header**：設定代理標頭，保留客戶端真實 IP
- **proxy_pass ${API_URL}**：轉發至後端 API（環境變數注入）
- **access_log**：記錄代理請求日誌

#### 靜態資源快取

```nginx
location ~* \.(?:css|js|jpg|jpeg|gif|png|ico|svg|woff|woff2|ttf|eot)$ {
  expires 1y;
  add_header Cache-Control "public";
  access_log off;
  try_files $uri =404;
}
```

**說明：**

- **expires 1y**：快取一年（靜態資源通常有版本化檔名）
- **Cache-Control "public"**：允許 CDN 和瀏覽器快取
- **access_log off**：不記錄靜態資源請求（減少 I/O）

#### HTML 檔案處理

```nginx
location / {
  expires -1;
  index index.html
  try_files $uri.html $uri $uri/index.html =404;
}
```

**說明：**

- **expires -1**：不快取 HTML（確保取得最新版本）
- **try_files**：依序嘗試 `$uri.html` → `$uri` → `$uri/index.html`
- 支援 SPA 路由（如 Nuxt 的靜態生成）

#### 錯誤頁面

```nginx
error_page 404 /404.html;
```

### 2.3 mime.types - MIME 類型定義

**檔案位置：`nginx/mime.types`**

定義各種檔案副檔名對應的 MIME 類型，包含：

- **文字**：html, css, js, json, xml
- **圖片**：png, jpg, gif, svg, webp, avif
- **字型**：woff, woff2, ttf, eot
- **文件**：pdf, doc, docx, xls, xlsx, ppt, pptx
- **影音**：mp4, webm, mp3, ogg
- **其他**：wasm, zip, 7z
