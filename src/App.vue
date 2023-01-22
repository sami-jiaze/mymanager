<template>
  <div class="app">
    <!-- elementplus全局国际化(中文)配置 -->
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
</script>

<style lang="less" scoped>
.app {
  width: 100vw;
  height: 100vh;
}

// .test {
//   // 根元素
//   color: blue;

//   :deep(.title) {
//     font-size: 100px;
//   }
// }
</style>
