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
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
            :maxlength="50"
            show-word-limit
            clearable
            prefix-icon="el-icon-user"
            :style="{ width: '100%' }"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password" :required="isEdit === false">
          <el-input
            v-model="form.password"
            placeholder="请输入密码"
            :maxlength="50"
            clearable
            prefix-icon="el-icon-lock"
            show-password
            :style="{ width: '100%' }"
          />
        </el-form-item>
        <el-form-item label="角色" prop="roles">
          <el-checkbox-group v-model="form.roles" size="medium">
            <el-checkbox
              v-for="(item, index) in rolesOptions"
              :key="index"
              :label="item"
              :disabled="item.disabled"
            >
              {{ item.name }}
            </el-checkbox>
          </el-checkbox-group>
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
import { RoleGetAll, UserCreate, UserEdit } from '@/api/etpmls-admin'
import { successMessage } from '@/utils/etpmls-admin'
export default {
  components: {},
  inheritAttrs: false,
  props: [],
  data() {
    var checkPassword = (rule, value, callback) => {
      // 修改时对密码没有要求
      if (!value && !this.isEdit) {
        return callback(new Error('密码不能为空！'))
      }
      if (value && value.length > 50) {
        return callback(new Error('密码长度不能大于50位！'))
      } else {
        callback()
      }
    }
    return {
      form: {
        username: undefined,
        password: '',
        roles: []
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            validator: checkPassword,
            trigger: 'blur'
          }
        ],
        roles: [
          {
            required: true,
            type: 'array',
            message: '请至少选择一个角色',
            trigger: 'change'
          }
        ]
      },
      rolesOptions: [],
      title: '',
      isEdit: false
    }
  },
  computed: {},
  watch: {},
  created() {
    this.RoleGetAll()
  },
  mounted() {},
  methods: {
    onOpen() {},
    onClose() {
      this.$refs['form'].resetFields()
      this.form = this.$options.data().form // 防止编辑关闭再打开创建，留下编辑的信息
      this.isEdit = false
    },
    close() {
      this.$emit('update:visible', false)
    },
    handelConfirm() {
      this.$refs['form'].validate((valid) => {
        if (!valid) return
        if (this.isEdit) {
          this.UserEdit()
        } else {
          this.UserCreate()
        }
      })
    },
    showEdit(row) {
      if (!row) {
        this.title = '添加用户'
        this.isEdit = false
      } else {
        this.title = '编辑用户'
        this.isEdit = true
        this.form = Object.assign({}, row)
        // 初始化roles，防止roles为null报错
        this.form.roles_tmp = this.form.roles
        this.form.roles = []
        if (this.form.roles_tmp != null) {
          for (var i = 0; i < this.form.roles_tmp.length; i++) {
            for (var v = 0; v < this.rolesOptions.length; v++) {
              if (this.form.roles_tmp[i].id === this.rolesOptions[v].id) {
                this.form.roles.push(this.rolesOptions[v])
                break
              }
            }
          }
        }
        delete this.form.roles_tmp
      }
    },
    RoleGetAll() {
      RoleGetAll().then((result) => {
        const { data } = result.data
        this.rolesOptions = data
      })
    },
    async UserCreate() {
      const { message } = await UserCreate(this.form)
      successMessage(this, '成功', message)
      this.close()
      this.$emit('refreshTable', true)
    },
    async UserEdit() {
      const { message } = await UserEdit(this.form)
      successMessage(this, '成功', message)
      this.close()
      this.$emit('refreshTable', true)
    }
  }
}
</script>
