<template>
  <div class="curmb">
    <el-breadcrumb separator-icon="CaretRight">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import useLoginStore from "@/store/login/login";
import { mapPathToBreadcrumbs } from "@/utils/map-menus";

const route = useRoute();
const userMenus = useLoginStore().userMenus;
// 值变化时计算属性帮助重新获取新的值
const breadcrumbs = computed(() => {
  return mapPathToBreadcrumbs(route.path, userMenus);
});
// console.log(useLoginStore);
// console.log(route.path);
// console.log(breadcrumbs);
</script>

<style lang="less" scoped>
.curmb {
  color: red;
}
</style>
