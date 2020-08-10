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
            placeholder="请输入名称"
            :maxlength="50"
            show-word-limit
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="方法" prop="method">
          <el-checkbox-group v-model="form.method" size="medium">
            <el-checkbox-button
              v-for="(item, index) in methodOptions"
              :key="index"
              :label="item.value"
              :disabled="item.disabled"
            >
              {{ item.label }}
            </el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="路径" prop="path">
          <el-input
            v-model="form.path"
            placeholder="请输入请求路径（支持通配符）"
            :maxlength="200"
            show-word-limit
            clearable
            :style="{ width: '100%' }"
          ></el-input>
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
          ></el-input>
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
  import { PermissionCreate, PermissionEdit } from "@/api/api";
  const emptyForm = {
    name: "",
    method: [],
    path: "",
    remark: "",
  };

  export default {
    components: {},
    inheritAttrs: false,
    props: [],
    data() {
      return {
        form: {
          name: undefined,
          method: [],
          path: undefined,
          remark: undefined,
        },
        rules: {
          name: [
            {
              required: true,
              message: "请输入名称",
              trigger: "blur",
            },
          ],
          method: [
            {
              required: true,
              type: "array",
              message: "请至少选择一个方法",
              trigger: "change",
            },
          ],
          path: [
            {
              required: true,
              message: "请输入请求路径（支持通配符）",
              trigger: "blur",
            },
          ],
          remark: [],
        },
        methodOptions: [
          {
            label: "ALL",
            value: "ALL",
          },
          {
            label: "GET",
            value: "GET",
          },
          {
            label: "POST",
            value: "POST",
          },
          {
            label: "PUT",
            value: "PUT",
          },
          {
            label: "DELETE",
            value: "DELETE",
          },
          {
            label: "PATCH",
            value: "PATCH",
          },
          {
            label: "OPTIONS",
            value: "OPTIONS",
          },
        ],
        title: "",
        isEdit: false,
      };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      onOpen() {},
      onClose() {
        this.$refs["form"].resetFields();
        this.form = Object.assign({}, emptyForm);
        this.isEdit = false;
      },
      close() {
        this.$emit("update:visible", false);
      },
      handelConfirm() {
        this.$refs["form"].validate((valid) => {
          if (!valid) return;
          if (this.isEdit) {
            this.PermissionEdit();
          } else {
            this.PermissionCreate();
          }
        });
      },
      async PermissionCreate() {
        const { msg } = await PermissionCreate(this.form);
        this.$baseMessage(msg, "success");
        this.close();
        this.$emit("refreshTable", true);
      },
      async PermissionEdit() {
        const { msg } = await PermissionEdit(this.form);
        this.$baseMessage(msg, "success");
        this.close();
        this.$emit("refreshTable", true);
      },
      showEdit(row) {
        if (!row) {
          this.title = "添加角色";
          this.isEdit = false;
        } else {
          this.title = "编辑角色";
          this.isEdit = true;
          this.form = Object.assign({}, row);
          // 把方法string变为数组
          this.form.method = row.method.split(",");
        }
      },
    },
  };
</script>
