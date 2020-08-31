<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" size="medium" label-width="80px">
      <el-form-item :label="lang('username')">
        <el-input
          :placeholder="user.username"
          readonly
          :disabled="true"
          :style="{width: '100%'}"
        />
      </el-form-item>
      <el-form-item :label="lang('password')" prop="password">
        <el-input
          v-model="form.password"
          :placeholder="lang('etp_message.password_required')"
          :maxlength="200"
          clearable
          show-password
          :style="{width: '100%'}"
        />
      </el-form-item>
      <el-form-item :label="lang('avatar')" prop="avatar">
        <avatar :value="user.avatar" />
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="submitForm">{{ lang('submit') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getlang } from '@/utils/etpmls-admin'
import Avatar from '@/components/Etpmls-Admin/avatar'
export default {
  components: { Avatar },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          username: '',
          email: '',
          avatar: '',
          role: ''
        }
      }
    }
  },
  data() {
    var checkPassword = (rule, value, callback) => {
      // 修改时对密码没有要求
      if (value && value.length < 6) {
        return callback(new Error(this.lang('etp_message.password_required')))
      }
      if (value && value.length > 50) {
        return callback(new Error(this.lang('etp_message.password_max_length')))
      } else {
        callback()
      }
    }
    return {
      form: {
        username: undefined,
        password: ''
      },
      rules: {
        username: [],
        password: [
          {
            validator: checkPassword,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (!valid) return
        // TODO 提交表单
      })
    },
    resetForm() {
      this.$refs['form'].resetFields()
    },
    lang(field) {
      return getlang(this, field)
    }
  }
}

</script>
<style>
</style>
