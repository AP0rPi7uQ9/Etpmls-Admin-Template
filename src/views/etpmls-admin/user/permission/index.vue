<template>
  <div class="app-container">
    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
      <div class="left-panel">
        <el-button icon="el-icon-plus" type="primary" size="small" @click="handleAdd">
          添加
        </el-button>
        <el-button icon="el-icon-delete" type="danger" size="small" @click="handleDelete">
          删除
        </el-button>
      </div>
    </el-col>

    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
      <div class="right-panel">
        <el-form
          ref="form"
          :model="queryForm"
          :inline="true"
          @submit.native.prevent
        >
          <el-form-item>
            <el-input v-model="queryForm.search" size="small" placeholder="标题" />
          </el-form-item>
          <el-form-item>
            <el-button
              icon="el-icon-search"
              type="primary"
              native-type="submit"
              size="small"
              @click="handleQuery"
            >
              查询
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>

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
      />
      <el-table-column
        show-overflow-tooltip
        prop="id"
        label="ID"
      />
      <el-table-column
        show-overflow-tooltip
        prop="name"
        label="权限名"
      />
      <el-table-column
        show-overflow-tooltip
        prop="method"
        label="方法"
      />
      <el-table-column
        show-overflow-tooltip
        prop="path"
        label="路径"
      />
      <el-table-column
        show-overflow-tooltip
        label="备注"
        prop="remark"
      />
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
    />
    <table-edit
      ref="edit"
      :visible.sync="isShow"
      @refreshTable="fetchData"
    />
  </div>
</template>

<script>
import { PermissionGetAll, PermissionDelete } from '@/api/etpmls-admin'
import TableEdit from './components/TableEdit'
import { successMessage, errorTextMessage, deleteConfirmMessage } from '@/utils/etpmls-admin'
export default {
  name: 'ComprehensiveTable',
  components: {
    TableEdit
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      imgShow: true,
      list: [],
      imageList: [],
      listLoading: true,
      layout: 'total, sizes, prev, pager, next, jumper',
      total: 0,
      background: true,
      selectRows: '',
      elementLoadingText: '正在加载...',
      queryForm: {
        pageNo: 1,
        pageSize: 20,
        search: ''
      },
      isShow: false // 添加编辑的角色框是否显示
    }
  },
  created() {
    this.fetchData()
  },
  beforeDestroy() {},
  mounted() {},
  methods: {
    tableSortChange() {
      const imageList = []
      this.$refs.tableSort.tableData.forEach((item, index) => {
        imageList.push(item.img)
      })
      this.imageList = imageList
    },
    setSelectRows(val) {
      this.selectRows = val
    },
    handleAdd() {
      this.isShow = true // 显示添加编辑的框
      this.$refs['edit'].showEdit()
    },
    handleEdit(row) {
      this.isShow = true // 显示添加编辑的框
      this.$refs['edit'].showEdit(row)
    },
    handleDelete(row) {
      if (row.id) {
        deleteConfirmMessage(this, '你确定要删除当前项吗', async() => {
          const { message } = await PermissionDelete({
            permissions: [{ id: row.id }]
          })
          successMessage(this, '成功', message)
          this.fetchData()
        })
      } else {
        if (this.selectRows.length > 0) {
          const ids = this.selectRows.map((item) => item)
          deleteConfirmMessage(this, '你确定要删除选中项吗', async() => {
            const { message } = await PermissionDelete({ permissions: ids })
            successMessage(this, '成功', message)
            this.fetchData()
          })
        } else {
          errorTextMessage(this, '未选中任何行')
          return false
        }
      }
    },
    handleSizeChange(val) {
      this.queryForm.pageSize = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.queryForm.pageNo = val
      this.fetchData()
    },
    handleQuery() {
      this.queryForm.pageNo = 1
      this.fetchData()
    },
    async fetchData() {
      this.listLoading = true
      const result = await PermissionGetAll(this.queryForm)
      const { data, count } = result.data
      this.list = data
      this.total = count
      setTimeout(() => {
        this.listLoading = false
      }, 500)
    }
  }
}
</script>

<style>
  .app-main {
    background-color: #f6f8f9;
  }
  .app-container {
    padding: 20px;
    margin: 20px 20px ;
    background: #fff;
    border-radius: 2px;
  }
  .el-pagination {
    padding: 2px 5px;
    margin: 15px 0 0 0;
    font-weight: normal;
    text-align: center;
  }
  .right-panel {
    float: right;
  }
  .left-panel {
    float: left;
  }
</style>
