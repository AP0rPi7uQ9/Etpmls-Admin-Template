<template>
  <el-upload
    class="avatar-uploader"
    :action="avatarAction"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    :headers="headers"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="">
    <i v-else class="el-icon-plus avatar-uploader-icon" />
    <div slot="tip" class="el-upload__tip">
      只能上传不超过 200KB 的jpg格式的文件
    </div>
  </el-upload>
</template>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<script>
import { getToken } from '@/utils/auth' // get token from cookie
export default {
  props: {
    value: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  data() {
    return {
      imageUrl: this.value,
      avatarAction: process.env.VUE_APP_BASE_API + '/attachment/uploadImage',
      headers: {}
    }
  },
  created() {
    this.setUploadHeader()
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 < 200

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 200KB!')
      }
      return isJPG && isLt2M
    },
    setUploadHeader() {
      if (getToken()) {
        this.headers['token'] = getToken()
      }
    }
  }
}
</script>
