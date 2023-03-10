<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary" @click="handleNewUserClick">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="50px" />
        <el-table-column align="center" type="index" label="序号" width="60px" />

        <el-table-column align="center" label="用户名" prop="name" width="150px" />
        <el-table-column align="center" label="真实姓名" prop="realname" width="150px" />
        <el-table-column align="center" label="手机号码" prop="cellphone" width="150px" />
        <el-table-column align="center" label="状态" prop="enable" width="100px">
          <!-- 作用域插槽 -->
          <template #default="scope">
            <el-button size="small" :type="scope.row.enable ? 'primary' : 'danger'" plain>
              {{ scope.row.enable ? "启用" : "禁用" }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" prop="createAt">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="更新时间" prop="updateAt">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="150px">
          <template #default="scope">
            <el-button
              size="small"
              icon="Edit"
              type="primary"
              text
              @click="handleEditBtnClick(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              size="small"
              icon="Delete"
              type="danger"
              text
              @click="handleDeleteBtnClick(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 15, 20]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="usersTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import useSystemStore from "@/store/main/system/system";
import { formatUTC } from "@/utils/format";
// 子传父 自定义事件（函数） 向父组件传值
const emit = defineEmits(["newClick", "editClick"]);
// 分页相关
const currentPage = ref(1);
const pageSize = ref(10);
// 发起action，请求usersList的数据
const systemStore = useSystemStore();
fetchUserListData();
// 获取usersList数据,进行展示
// 第一步操作是异步的导致第二步无法及时拿到数据 可以包裹storeToRefs或者使用计算属性
// 使用storeToRefs()将state中的状态解构出来，方便在视图中使用，
// storeToRefs函数可将普通数据变成响应式数据。
const { usersList, usersTotalCount } = storeToRefs(systemStore);

// 分页相关
function handleSizeChange() {
  fetchUserListData();
}
function handleCurrentChange() {
  fetchUserListData();
}

// 封装函数, 用于发送网络请求
function fetchUserListData(formData: any = {}) {
  const size = pageSize.value;
  const offset = (currentPage.value - 1) * size;
  const pageInfo = { size, offset };

  const queryInfo = { ...pageInfo, ...formData };
  systemStore.postUsersListAction(queryInfo);
}

// 删除
function handleDeleteBtnClick(id: number) {
  systemStore.deleteUserByIdAction(id);
  // console.log(id);
}
// 新增
function handleNewUserClick() {
  // 子传父 自定义事件（函数） 向父组件传值
  emit("newClick");
}
// 编辑
function handleEditBtnClick(itemData: any) {
  // 子传父 自定义事件（函数） 向父组件传值
  emit("editClick", itemData);
}

// 子传父 把数据导出，供父组件user.vue使用
defineExpose({ fetchUserListData });
</script>

<style lang="less" scoped>
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;

  .title {
    font-size: 22px;
  }
}

.table {
  :deep(.el-table__cell) {
    padding: 12px 0;
  }

  .el-button {
    margin-left: 0;
    padding: 5px 8px;
  }
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
