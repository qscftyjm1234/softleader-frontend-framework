# Module Templates

此目錄用於存放模組生成的 YAML 設定檔。

## 如何使用

1.  在此目錄中建立一個 `.yaml` 檔案，例如 `order.yaml`。
2.  檔案內容參考 `example.yaml`。
3.  執行生成指令：

    ```bash
    pnpm gen:module order
    ```
    
    或者直接指定檔案路徑：
    
    ```bash
    node scripts/generate-module.js module-templates/order.yaml
    ```

## 設定檔格式

```yaml
name: "my-module" # 模組目錄名稱 (modules/my-module)
routes:
  - label: "My Module"
    icon: "mdi-star"
    permission: "my-module.view"
    children:
      - label: "List"
        path: "/my-module/list"
        permission: "my-module.list.view"
```
