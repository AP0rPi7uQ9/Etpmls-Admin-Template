<template>
  <div class="table-container">
    <vab-query-form>
      <vab-query-form-left-panel>
        <el-button icon="el-icon-plus" type="primary" @click="handleAdd">
          添加
        </el-button>
        <el-button icon="el-icon-delete" type="danger" @click="handleDelete">
          删除
        </el-button>
      </vab-query-form-left-panel>
      <vab-query-form-right-panel>
        <el-form
          ref="form"
          :model="queryForm"
          :inline="true"
          @submit.native.prevent
        >
          <el-form-item>
            <el-input v-model="queryForm.search" placeholder="标题" />
          </el-form-item>
          <el-form-item>
            <el-button
              icon="el-icon-search"
              type="primary"
              native-type="submit"
              @click="handleQuery"
            >
              查询
            </el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-right-panel>
    </vab-query-form>

    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
      @selection-change="setSelectRows"
      @sort-change="tableSortChange"
    >
      <el-table-column
        show-overflow-tooltip
        type="selection"
        width="55"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="id"
        label="ID"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="用户名"
        prop="username"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="角色"
        prop="roles_name"
        sortable
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="操作"
        width="180px"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :background="background"
      :current-page="queryForm.pageNo"
      :layout="layout"
      :page-size="queryForm.pageSize"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
    <table-edit
      ref="edit"
      :visible.sync="isShow"
      @refreshTable="fetchData"
    ></table-edit>
  </div>
</template>

<script>
  import { getList, doDelete } from "@/api/table";
  import { UserGetAll, UserDelete } from "@/api/api";
  import TableEdit from "./components/TableEdit";
  export default {
    name: "ComprehensiveTable",
    components: {
      TableEdit,
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: "success",
          draft: "gray",
          deleted: "danger",
        };
        return statusMap[status];
      },
    },
    data() {
      return {
        imgShow: true,
        list: [],
        imageList: [],
        listLoading: true,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
        background: true,
        selectRows: "",
        elementLoadingText: "正在加载...",
        queryForm: {
          pageNo: 1,
          pageSize: 20,
          search: "",
        },
        isShow: false, // 添加编辑的框是否显示
      };
    },
    created() {
      this.fetchData();
    },
    beforeDestroy() {},
    mounted() {},
    methods: {
      tableSortChange() {
        const imageList = [];
        this.$refs.tableSort.tableData.forEach((item, index) => {
          imageList.push(item.img);
        });
        this.imageList = imageList;
      },
      setSelectRows(val) {
        this.selectRows = val;
      },
      handleAdd() {
        this.isShow = true; // 显示添加编辑的框
        this.$refs["edit"].showEdit();
      },
      handleEdit(row) {
        this.isShow = true; // 显示添加编辑的框
        this.$refs["edit"].showEdit(row);
      },
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm("你确定要删除当前项吗", null, async () => {
            const { msg } = await UserDelete({ users: [{ id: row.id }] });
            this.$baseMessage(msg, "success");
            this.fetchData();
          });
        } else {
          if (this.selectRows.length > 0) {
            const ids = this.selectRows.map((item) => item);
            this.$baseConfirm("你确定要删除选中项吗", null, async () => {
              const { msg } = await UserDelete({ users: ids });
              this.$baseMessage(msg, "success");
              this.fetchData();
            });
          } else {
            this.$baseMessage("未选中任何行", "error");
            return false;
          }
        }
      },
      handleSizeChange(val) {
        this.queryForm.pageSize = val;
        this.fetchData();
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val;
        this.fetchData();
      },
      handleQuery() {
        this.queryForm.pageNo = 1;
        this.fetchData();
      },
      async fetchData() {
        this.listLoading = true;
        const result = await UserGetAll(this.queryForm);
        const { data, count } = result.data;
        for (var i = 0; i < data.length; i++) {
          if (data[i].roles != null) {
            data[i].roles_name = [];
            for (var v = 0; v < data[i].roles.length; v++) {
              data[i].roles_name.push(data[i].roles[v].name);
            }
            data[i].roles_name = data[i].roles_name.join(" | ");
          }
        }
        this.list = data;
        const imageList = [];
        data.forEach((item, index) => {
          imageList.push(item.img);
        });
        this.imageList = imageList;
        this.total = count;
        setTimeout(() => {
          this.listLoading = false;
        }, 500);
      },
    },
  };
</script>
