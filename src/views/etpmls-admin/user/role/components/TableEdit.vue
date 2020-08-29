<template>
  <div>
    <el-dialog
      v-bind="$attrs"
      :title="title"
      v-on="$listeners"
      @open="onOpen"
      @close="onClose"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        size="medium"
        label-width="80px"
      >
        <el-form-item label="名称" prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入角色名称"
            :maxlength="30"
            show-word-limit
            clearable
            prefix-icon="el-icon-user"
            :style="{ width: '100%' }"
          />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="form.remark"
            type="textarea"
            placeholder="请输入备注"
            :maxlength="200"
            show-word-limit
            :autosize="{ minRows: 4, maxRows: 4 }"
            :style="{ width: '100%' }"
          />
        </el-form-item>
        <el-form-item label="权限" prop="permissions">
          <el-transfer
            v-model="form.permissions"
            :data="allPermission"
            :titles="['未添加权限', '已添加权限']"
            :props="{
              key: 'id',
              label: 'name',
            }"
          />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { RoleCreate, RoleEdit, PermissionGetAll } from '@/api/etpmls-admin'
import { successMessage } from '@/utils/etpmls-admin'
const emptyForm = {
  name: undefined,
  remark: undefined,
  permissions: []
}

export default {
  components: {},
  inheritAttrs: false,
  props: [],
  data() {
    return {
      form: {
        name: undefined,
        remark: undefined,
        permissions: []
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入角色名称',
            trigger: 'blur'
          }
        ],
        remark: []
      },
      title: '',
      isEdit: false,
      allPermission: []
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getAllPermission()
  },
  mounted() {},
  methods: {
    onOpen() {},
    onClose() {
      this.$refs['form'].resetFields()
      this.form = Object.assign({}, emptyForm)
      this.isEdit = false
    },
    close() {
      this.$emit('update:visible', false)
    },
    handelConfirm() {
      this.$refs['form'].validate((valid) => {
        if (!valid) return
        this.PermissionIdToObj()
        if (this.isEdit) {
          this.RoleEdit()
        } else {
          this.RoleCreate()
        }
      })
    },
    async RoleCreate() {
      const { message } = await RoleCreate(this.form)
      successMessage(this, '成功', message)
      this.close()
      this.$emit('refreshTable', true)
    },
    async RoleEdit() {
      const { message } = await RoleEdit(this.form)
      successMessage(this, '成功', message)
      this.close()
      this.$emit('refreshTable', true)
    },
    showEdit(row) {
      if (!row) {
        this.title = '添加角色'
        this.isEdit = false
      } else {
        this.title = '编辑角色'
        this.isEdit = true
        this.form = Object.assign({}, row)
        if (!row.permissions) {
          this.form.permissions = []
        } else {
          var tmp = []
          for (var i = 0; i < this.form.permissions.length; i++) {
            tmp.push(this.form.permissions[i].id)
          }
          this.form.permissions = tmp
        }
      }
    },
    async getAllPermission() {
      const { data } = await PermissionGetAll()
      this.allPermission = data.data
    },
    PermissionIdToObj() {
      // 把permissionID转为对象
      if (this.form.permissions && this.form.permissions.length > 0) {
        var tmp = []
        for (var i = 0; i < this.form.permissions.length; i++) {
          tmp.push({ id: this.form.permissions[i] })
        }
        this.form.permissions = tmp
      }
    }
  }
}
</script>
