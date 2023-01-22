<template>
  <div class="user">
    <!-- 接收来自user-seaarch子组件发来的数据 -->
    <user-search @query-click="handQueryClick" @reset-click="handResetClick" />
    <!-- 接收来自user-content子组件发来的数据 -->
    <user-content ref="contentRef" @new-click="handleNewClick" @edit-click="handleEditClick" />
    <userModal ref="modalRef"></userModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import UserSearch from "./c-cpns/user-search.vue";
import UserContent from "./c-cpns/user-content.vue";
import userModal from "./c-cpns/user-modal.vue";

// 对content组件的操作
const contentRef = ref<InstanceType<typeof UserContent>>();
// 查询
function handQueryClick(formData: any) {
  contentRef.value?.fetchUserListData(formData);
}
// 重置
function handResetClick() {
  contentRef.value?.fetchUserListData();
}

// 对modal组件的操作
const modalRef = ref<InstanceType<typeof userModal>>();
// 新增
function handleNewClick() {
  modalRef.value?.setModalVisible();
}
// 修改
function handleEditClick(itemData: any) {
  // console.log(itemData);
  modalRef.value?.setModalVisible(false, itemData);
}
</script>

<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
