<template>
  <div class="role">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    />
    <page-modal :modal-config="modalConfig" :other-info="otherInfo" ref="modalRef">
      <template #menulist>
        <!-- check方法elementplus树形组件 选中复选框后触发 -->
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleElTreeCheck"
        />
      </template>
      <!-- <template #span>
        <span>this is span</span>
      </template>
      <template #btn>
        <button>button</button>
      </template> -->
    </page-modal>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref, nextTick } from "vue";
import type { ElTree } from "element-plus";

import PageSearch from "@/components/page-search/page-search.vue";
import searchConfig from "./config/search.config";

import PageContent from "@/components/page-content/page-content.vue";
import contentConfig from "./config/content.config";

import PageModal from "@/components/page-modal/page-modal.vue";
import modalConfig from "./config/modal.config";

import usePageContent from "@/hooks/usePageContent";
import usePageModal from "@/hooks/usePageModal";
import useMainStore from "@/store/main/main";
import { mapMenuListToIds } from "@/utils/map-menus";

// 逻辑关系
const { contentRef, handleQueryClick, handleResetClick } = usePageContent();
const { modalRef, handleNewClick, handleEditClick } = usePageModal(newCallback, editCallback);

// 获取完整的菜单
const mainStore = useMainStore();
const { entireMenus } = storeToRefs(mainStore);
const otherInfo = ref({});

// check方法elementplus树形组件 选中复选框后触发
function handleElTreeCheck(data1: any, data2: any) {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys];
  console.log(data2.checkedKeys);
  otherInfo.value = { menuList };
}

const treeRef = ref<InstanceType<typeof ElTree>>();

// 编辑role权限分配
function editCallback(itemData: any) {
  // 数据在发现变化的时候，vue并不会立刻去更新Dom，而是将修改数据的操作放在了一个异步操作队列中
  // 等待同一事件循环中的所有数据变化完成之后，会将队列中的事件拿来进行处理，进行DOM的更新
  // nextick 修改数据后立刻得到更新后的DOM结构 微任务
  nextTick(() => {
    const menuIds = mapMenuListToIds(itemData.menuList);
    // setCheckedKeys由element提供
    treeRef.value?.setCheckedKeys(menuIds);
  });
}
// 新建角色按钮 role权限分配
function newCallback() {
  nextTick(() => {
    // setCheckedKeys由element提供
    treeRef.value?.setCheckedKeys([]);
  });
}
</script>

<style lang="less" scoped></style>
