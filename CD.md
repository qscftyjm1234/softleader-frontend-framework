# 富邦行動保全系統 - CD (持續部署)

**CD (Continuous Deployment)** 意指持續部署，當程式碼通過 CI 階段後，透過自動化工具將應用程式更新到目標環境 (如 Kubernetes 叢集)。本專案採用 Kustomize 進行多環境配置管理，實現快速且可靠的產品交付。

本文件說明持續部署 CD 流程，包含 Kubernetes 部署設定。

---

## 目錄

1. [部署檔案設定及說明](#1-部署檔案設定及說明)

## 1. 部署檔案設定及說明

部署檔案位於 `deploy/` 資料夾，採用 **Kustomize** 管理多環境配置。

### 1.1 目錄結構

```
deploy/
├── base/                          # 基礎配置（所有環境共用）
│   ├── kustomization.yaml         # 基礎 Kustomize 配置
│   ├── deployment.yaml            # Deployment 定義
│   ├── service.yaml               # Service 定義
│   ├── virtualservice.yaml        # Istio VirtualService 定義
│   ├── configmap.yaml             # ConfigMap 定義
│   └── secret.yaml                # Secret 定義
└── overlays/                      # 環境特定配置（覆蓋 base）
    ├── sit/                       # SIT 環境
    │   └── kustomization.yaml
    ├── sit2/                      # SIT2 環境
    │   ├── kustomization.yaml
    │   ├── deployment-sit2.yaml
    │   └── virtualservice-sit2.yaml
    └── sit3/                      # SIT3 環境
        ├── kustomization.yaml
        ├── deployment-sit3.yaml
        └── virtualservice-sit3.yaml
```

### 1.2 Base 配置檔案說明

#### 1.2.1 kustomization.yaml - Kustomize 主配置

**檔案位置：`deploy/base/kustomization.yaml`**

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

labels:
  - pairs:
      app: mps-ui
      apsys: A0001196
      env: dev-dmz
      service-type: web
      part-of: mps
      class: '1'
      outgoing: mps-z-ut00.fbl.com.tw
    includeSelectors: true

namespace: front-mpos

resources:
  - deployment.yaml
  - configmap.yaml
  - secret.yaml
  - service.yaml
  - virtualservice.yaml

images:
  - name: com.fubonlife/app
    newName: jfrog.fbl.com.tw/mpos-ui-sit/mps-ui
    newTag: 1.0.0
  - name: com.fubonlife/app01
    newName: jfrog.fbl.com.tw/mpos-ui-sit/mps-ui-01
    newTag: 1.0.0
  - name: com.fubonlife/app02
    newName: jfrog.fbl.com.tw/mpos-ui-sit/mps-ui-02
    newTag: 1.0.0
```

**說明：**

- **labels**：所有資源自動加上的標籤
  - `app`：應用程式名稱
  - `apsys`：系統代碼
  - `env`：環境標籤
  - `service-type`：服務類型
  - `part-of`：所屬專案
  - `class`：服務等級
  - `outgoing`：對外域名
- **namespace**：部署到的 Kubernetes 命名空間
- **resources**：包含的 Kubernetes 資源清單
- **images**：Image 名稱替換規則（支援多 Image 部署）

#### 1.2.2 deployment.yaml - Deployment 定義

**檔案位置：`deploy/base/deployment.yaml`**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mps-ui
spec:
  replicas: 2
  strategy:
    type: RollingUpdate
  template:
    spec:
      securityContext:
        runAsUser: 101 # 以非 root 使用者執行（nginx）
      affinity:
        podAntiAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
            - weight: 100
              podAffinityTerm:
                labelSelector:
                  matchExpressions:
                    - key: app
                      operator: In
                      values:
                        - 'mps-ui'
                topologyKey: kubernetes.io/hostname
```

**說明：**

- **replicas: 2**：執行 2 個副本（高可用性）
- **RollingUpdate**：滾動更新策略（無停機部署）
- **securityContext**：安全性設定，以 UID 101 執行（nginx 使用者）
- **podAntiAffinity**：Pod 反親和性
  - 偏好將同一應用的 Pod 分散到不同節點
  - 提高可用性（避免單點故障）

**容器設定：**

```yaml
containers:
  - name: app
    image: com.fubonlife/app # 會被 Kustomize 替換
    imagePullPolicy: Always
    ports:
      - containerPort: 8080
        name: http
        protocol: TCP
```

**說明：**

- **imagePullPolicy: Always**：每次部署都拉取最新 Image
- **containerPort: 8080**：容器監聽埠號

**健康檢查：**

```yaml
startupProbe:
  httpGet:
    path: /healthz
    port: http
  periodSeconds: 5
  failureThreshold: 30

livenessProbe:
  httpGet:
    path: /healthz
    port: http
  timeoutSeconds: 5
  failureThreshold: 5

readinessProbe:
  httpGet:
    path: /healthz
    port: http
  initialDelaySeconds: 3
  timeoutSeconds: 5
```

**說明：**

- **startupProbe**：啟動探測（最多等待 150 秒 = 5s × 30）
- **livenessProbe**：存活探測（失敗則重啟容器）
- **readinessProbe**：就緒探測（失敗則從 Service 移除）

**資源限制：**

```yaml
resources:
  requests:
    cpu: '100m'
    memory: '128Mi'
  limits:
    cpu: '500m'
    memory: '200Mi'
```

**說明：**

- **requests**：保證資源（Kubernetes 排程依據）
- **limits**：資源上限（超過則可能被限流或終止）

**環境變數：**

```yaml
env:
  - name: POD_NAME
    valueFrom:
      fieldRef:
        fieldPath: metadata.name

envFrom:
  - configMapRef:
      name: mps-ui
  - secretRef:
      name: mps-ui
```

**說明：**

- **POD_NAME**：注入 Pod 名稱（用於 Nginx 自訂標頭）
- **envFrom**：從 ConfigMap 和 Secret 載入環境變數

#### 3.2.3 service.yaml - Service 定義

**檔案位置：`deploy/base/service.yaml`**

```yaml
apiVersion: v1
kind: Service
metadata:
  name: mps-ui
spec:
  type: ClusterIP
  ports:
    - name: http
      port: 8080
      protocol: TCP
```

**說明：**

- **type: ClusterIP**：叢集內部服務（不對外暴露）
- **port: 8080**：服務監聽埠號

#### 1.2.4 virtualservice.yaml - Istio VirtualService 定義

**檔案位置：`deploy/base/virtualservice.yaml`**

```yaml
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: mps-ui
spec:
  hosts:
    - 'mps-z-ut00.fbl.com.tw'
  gateways:
    - 'front-mpos-gateway'
  http:
    - headers:
        request:
          set:
            X-Forwarded-Proto: https
            X-Forwarded-Port: '443'
      route:
        - destination:
            host: mps-ui
            port:
              number: 8080
```

**說明：**

- **hosts**：對外域名
- **gateways**：使用的 Istio Gateway
- **headers**：設定請求標頭（告知後端使用 HTTPS）
- **route**：路由到 mps-ui Service 的 8080 埠

#### 1.2.5 configmap.yaml - ConfigMap 定義

**檔案位置：`deploy/base/configmap.yaml`**

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: mps-ui
data:
  API_URL: https://mps-bff-i-ut00.fbl.com.tw
```

**說明：**

- 定義環境變數 `API_URL`（後端 API 位址）
- 會被 Nginx 的 `nginx.default.conf.template` 使用

#### 1.2.6 secret.yaml - Secret 定義

**檔案位置：`deploy/base/secret.yaml`**

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: mps-ui
type: Opaque
data: {}
stringData: {}
```

**說明：**

- 目前為空，預留給未來敏感資料使用（如 API Token）

### 1.3 Overlays 配置說明

Overlays 用於覆蓋或擴展 base 配置，實現多環境管理。

#### 1.3.1 SIT 環境

**檔案位置：`deploy/overlays/sit/kustomization.yaml`**

```yaml
resources:
  - ../../base
```

**說明：**

- 直接使用 base 配置，無額外覆蓋

#### 1.3.2 SIT2 環境

**檔案位置：`deploy/overlays/sit2/kustomization.yaml`**

```yaml
nameSuffix: -sit2

labels:
  - pairs:
      env: sit2-dmz
      outgoing: mps-z-ut01.fbl.com.tw
    includeSelectors: true

resources:
  - ../../base

patches:
  - path: virtualservice-sit2.yaml
  - path: deployment-sit2.yaml

configMapGenerator:
  - name: mps-ui
    behavior: merge
    literals:
      - API_URL=https://mps-bff-i-ut01.fbl.com.tw

images:
  - name: com.fubonlife/app01
    newName: jfrog.fbl.com.tw/mpos-ui-sit/mps-ui-01
    newTag: 1.0.0
```

**說明：**

- **nameSuffix**：所有資源名稱加上 `-sit2` 後綴
- **labels**：覆蓋環境標籤
- **patches**：套用環境特定的修補檔
- **configMapGenerator**：覆蓋 ConfigMap 的 `API_URL`
- **images**：使用不同的 Image 名稱（`mps-ui-01`）

#### 1.3.3 SIT3 環境

**檔案位置：`deploy/overlays/sit3/kustomization.yaml`**

```yaml
nameSuffix: -sit3

labels:
  - pairs:
      env: sit3-dmz
      outgoing: mps-z-ut02.fbl.com.tw
    includeSelectors: true

resources:
  - ../../base

patches:
  - path: virtualservice-sit3.yaml
  - path: deployment-sit3.yaml

configMapGenerator:
  - name: mps-ui
    behavior: merge
    literals:
      - API_URL=https://mps-bff-i-ut02.fbl.com.tw

images:
  - name: com.fubonlife/app02
    newName: jfrog.fbl.com.tw/mpos-ui-sit/mps-ui-02
    newTag: 1.0.1 # 注意：版本號為 1.0.1
```

**說明：**

- 類似 SIT2，但使用不同的域名、Image 名稱和版本號

### 1.4 部署流程

#### 1.4.1 上傳部署檔案

第一次部署或部署檔案有異動時，需先上傳：

```bash
scp -r deploy ansfrontmpos@sdtwlnx00203:/dkhome/ansfrontmpos/mps-ui
```

#### 1.4.2 連線過版機

```bash
ssh ansfrontmpos@sdtwlnx00203
export KUBECONFIG=$HOME/.kube/anthos-user-cluster-dmz-dev-kubeconfig
```

**說明：**

- 設定 Kubernetes 配置檔案路徑

#### 1.4.3 套用部署檔案

**首次部署或部署檔案有異動時：**

```bash
# SIT 環境
kubectl apply -k /dkhome/ansfrontmpos/mps-ui/deploy/overlays/sit

# SIT2 環境
kubectl apply -k /dkhome/ansfrontmpos/mps-ui/deploy/overlays/sit2

# SIT3 環境
kubectl apply -k /dkhome/ansfrontmpos/mps-ui/deploy/overlays/sit3
```

**說明：**

- `-k`：使用 Kustomize 模式套用
- Kustomize 會合併 base 和 overlay 配置後部署

#### 1.4.4 手動重啟（若部署檔案無異動）

若只更新了 Image，但 `deployment.yaml` 沒有異動，需手動重啟：

```bash
# SIT 環境
kubectl rollout restart deploy -l env=dev-dmz

# SIT2 環境
kubectl rollout restart deploy -l env=sit2-dmz

# SIT3 環境
kubectl rollout restart deploy -l env=sit3-dmz
```

**說明：**

- `-l`：使用標籤選擇器篩選 Deployment
- 會觸發滾動更新（Rolling Update）

### 1.5 驗證部署

```bash
# 查看 Deployment 狀態
kubectl get deployment -n front-mpos

# 查看 Pod 狀態
kubectl get pods -n front-mpos

# 查看滾動更新進度
kubectl rollout status deployment/mps-ui -n front-mpos

# 查看 Pod 日誌
kubectl logs -f deployment/mps-ui -n front-mpos

# 查看 Service
kubectl get svc -n front-mpos

# 查看 VirtualService
kubectl get virtualservice -n front-mpos
```
