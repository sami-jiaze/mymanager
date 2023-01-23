<template>
  <div class="department">
    <page-search1 @query-click="handleQueryClick" @reset-click="handleResetClick" />
    <page-content1 ref="contentRef" @new-click="handleNewClick" @edit-click="handleEditClick" />
    <page-modal1 ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import { ref } from "vue";
import PageSearch1 from "./c-cpns/page-search.vue";
import PageContent1 from "./c-cpns/page-content.vue";
import PageModal1 from "./c-cpns/page-modal.vue";

// 点击search, content的操作
const contentRef = ref<InstanceType<typeof PageContent1>>();
function handleQueryClick(queryInfo: any) {
  contentRef.value?.fetchPageListData(queryInfo);
}
function handleResetClick() {
  contentRef.value?.fetchPageListData();
}

// 点击content, modal的操作
const modalRef = ref<InstanceType<typeof PageModal1>>();
function handleNewClick() {
  modalRef.value?.setModalVisible();
}
function handleEditClick(itemData: any) {
  modalRef.value?.setModalVisible(false, itemData);
}
</script>

<style scoped></style>
