# History: `greet`

**File**: `components\ReleaseDemo.vue`
**Generated**: 2025/12/24 下午3:20:10

## Summary

| Date                      | Version/Commit                                                                                              | Author     | Message                             |
| ------------------------- | ----------------------------------------------------------------------------------------------------------- | ---------- | ----------------------------------- |
| 2025-12-24 15:19:43 +0800 | [844cd2e](https://github.com/qscftyjm1234/frontier_project/commit/844cd2e0b07fbb209d0f643ceeb5a5921617bd74) | Gino Huang | feat: 測試                          |
| 2025-12-24 14:57:19 +0800 | [85efa57](https://github.com/qscftyjm1234/frontier_project/commit/85efa570b9656d5134bec196f8f0202bbfbb8844) | unknown    | style: 測試                         |
| 2025-12-24 14:20:51 +0800 | [d6b50ec](https://github.com/qscftyjm1234/frontier_project/commit/d6b50ec898740a786dd8e81166e3a741ad644909) | unknown    | feat(release): 展示版本發布工作流程 |

## Detailed Changes

### [844cd2e] 2025-12-24 15:19:43 +0800 - feat: 測試

```diff
diff --git a/components/ReleaseDemo.vue b/components/ReleaseDemo.vue
--- a/components/ReleaseDemo.vue
+++ b/components/ReleaseDemo.vue
@@ -13,19 +16,21 @@
 function greet(name: string): void {
   console.log(`小狗狗`)
   console.log(`${message.value} ${name}`)
+  console.log(`喵`)
+  console.log(`喵`)
 }
 </script>

 <template>
   <div class="release-demo">
     <h1>{{ message }}</h1>
     <button @click="greet('Developer')">Greet</button>
   </div>
 </template>

 <style scoped>
 .release-demo {
   padding: 2rem;
   border: 1px dashed #ccc;
 }
 </style>

```

### [85efa57] 2025-12-24 14:57:19 +0800 - style: 測試

```diff
diff --git a/components/ReleaseDemo.vue b/components/ReleaseDemo.vue
--- a/components/ReleaseDemo.vue
+++ b/components/ReleaseDemo.vue
@@ -18,18 +19,19 @@
 function greet(name: string): void {
+  console.log(`小狗狗`)
   console.log(`${message.value} ${name}`)
 }
 </script>

 <template>
   <div class="release-demo">
     <h1>{{ message }}</h1>
     <button @click="greet('Developer')">Greet</button>
   </div>
 </template>

 <style scoped>
 .release-demo {
   padding: 2rem;
   border: 1px dashed #ccc;
 }
 </style>

```

### [d6b50ec] 2025-12-24 14:20:51 +0800 - feat(release): 展示版本發布工作流程

```diff
diff --git a/components/ReleaseDemo.vue b/components/ReleaseDemo.vue
--- /dev/null
+++ b/components/ReleaseDemo.vue
@@ -0,0 +17,18 @@
+function greet(name: string): void {
+  console.log(`${message.value} ${name}`)
+}
+</script>
+
+<template>
+  <div class="release-demo">
+    <h1>{{ message }}</h1>
+    <button @click="greet('Developer')">Greet</button>
+  </div>
+</template>
+
+<style scoped>
+.release-demo {
+  padding: 2rem;
+  border: 1px dashed #ccc;
+}
+</style>
```
