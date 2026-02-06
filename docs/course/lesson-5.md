<!-- Author: cindy -->

# 第五課:客製化圖示系統

本課程教您如何在專案中使用圖示,包含 MDI 圖示和自訂 SVG 圖示。

## 1. 使用 IIcon 組件

本專案使用 `IIcon` 組件來顯示圖示。

### 基本用法

```vue
<template>
  <IIcon name="mdi-home" />
</template>
```

---

## 2. MDI 圖示

MDI (Material Design Icons) 提供了數千個免費圖示。

### 如何找圖示

1. 前往 [Material Design Icons](https://pictogrammers.com/library/mdi/)
2. 搜尋你要的圖示 (例如搜尋 "home")
3. 複製圖示名稱 (例如 `mdi-home`)
4. 在專案中使用

### 常用圖示範例

```vue
<template>
  <div class="flex gap-4">
    <!-- 首頁 -->
    <IIcon name="mdi-home" />

    <!-- 使用者 -->
    <IIcon name="mdi-account" />

    <!-- 設定 -->
    <IIcon name="mdi-cog" />
  </div>
</template>
```

---

## 3. 調整圖示大小與顏色

### 使用 size 和 color 屬性

```vue
<template>
  <div class="flex items-center gap-4">
    <IIcon
      name="mdi-heart"
      size="small"
      color="error"
    />
    <IIcon name="mdi-heart" />
    <IIcon
      name="mdi-heart"
      size="large"
      color="primary"
    />
  </div>
</template>
```

### 使用 Tailwind 類別

```vue
<template>
  <IIcon
    name="mdi-star"
    class="text-3xl text-yellow-500"
  />
</template>
```

---

## 4. 在按鈕中使用圖示

### IButton 的 icon 屬性

```vue
<template>
  <!-- 圖示 + 文字 -->
  <IButton
    icon="mdi-plus"
    variant="primary"
  >
    新增
  </IButton>

  <!-- 只有圖示 -->
  <IButton
    icon="mdi-delete"
    color="error"
  />
</template>
```

---

## 5. 小結

1. **組件**: `<IIcon name="mdi-xxx" />`
2. **來源**: Material Design Icons
3. **按鈕**: `<IButton icon="mdi-xxx">`

---

[上一課:UI 組件開發規範](./lesson-4.md) | [下一課:頁面導航與路由](./lesson-6.md) | [回首頁](../../README.md)
