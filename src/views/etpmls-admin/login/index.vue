<template>
  <div class="homepage-hero-module">
    <div class="video-container">
      <div :style="fixStyle" class="filter" />
      <video :style="fixStyle" autoplay loop class="fillWidth" @canplay="canplay">
        <source src="@/assets/etpmls-admin/login/login.mp4" type="video/mp4">
        {{ lang('etp_message.video_not_supported') }}
        <source src="@/assets/etpmls-admin/login/login.mp4" type="video/webm">
        {{ lang('etp_message.video_not_supported') }}
      </video>
      <div v-if="!vedioCanPlay" class="poster hidden">
        <img :style="fixStyle" src="@/assets/etpmls-admin/login/login.jpg" alt="">
      </div>
      <div class="login-container">

        <el-form ref="form" :model="form" :rules="rules" size="medium" class="form" label-width="80px">

          <div class="title-container">
            <h3 class="title">
              {{ lang('etp_variable.title') }}
            </h3>
            <lang-select class="set-language" />
          </div>

          <el-form-item label-width="0" prop="username">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              v-model="form.username"
              :placeholder="lang('username')"
              :maxlength="100"
              clearable
            />
          </el-form-item>
          <el-form-item label-width="0" prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              v-model="form.password"
              :placeholder="lang('password')"
              :maxlength="255"
              clearable
              show-password
            />
          </el-form-item>

          <el-form-item label-width="0" prop="captcha">
            <el-input v-model="form.captcha" :placeholder="lang('etp_message.captcha_required')" clearable />
          </el-form-item>

          <el-form-item label-width="0" prop="captchapic" style="background-color: #ffffff">
            <div>
              <img
                v-if="captcha_id_src"
                id="image"
                :src="captcha_id_src"
                alt="Captcha image"
                width="100%"
                @click="CaptchaGetOne"
              >
            </div>
          </el-form-item>

          <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">
            {{ $t('login.logIn') }}
          </el-button>

        </el-form>

      </div>
    </div>
  </div>
</template>
<script>
import LangSelect from '@/components/LangSelect'
import { CaptchaGetOne, CaptchaGetPicture } from '@/api/etpmls-admin'
import { getlang } from '@/utils/etpmls-admin'
export default {
  components: { LangSelect },
  props: [],
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value && value.length > 0) {
        callback()
      } else {
        callback(new Error(this.lang('etp_message.username_required')))
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value && value.length >= 6) {
        callback()
      } else {
        callback(new Error(this.lang('etp_message.password_required')))
      }
    }
    const validateCaptcha = (rule, value, callback) => {
      if (value && value.length > 0) {
        callback()
      } else {
        callback(new Error(this.lang('etp_message.captcha_required')))
      }
    }
    return {
      form: {
        username: '',
        password: '',
        captcha: '',
        captcha_id: ''
      },
      rules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        captcha: [
          {
            required: true,
            trigger: 'blur',
            validator: validateCaptcha
          }
        ],
        captcha_id: [{ required: true, trigger: 'blur' }]
      },
      vedioCanPlay: false,
      fixStyle: '',
      loading: false,
      captcha_id_src: undefined
    }
  },
  computed: {},
  watch: {},
  created() {
    this.CaptchaGetOne()
  },
  mounted() {
    this.windowsResize()
  },
  methods: {
    resetForm() {
      this.$refs['form'].resetFields()
    },
    canplay() {
      this.vedioCanPlay = true
    },
    async CaptchaGetOne() {
      const { data } = await CaptchaGetOne()
      this.form.captcha_id = data
      // Show Picture
      this.captcha_id_src = process.env.VUE_APP_BASE_API + CaptchaGetPicture(data)
    },
    windowsResize() {
      window.onresize = () => {
        const windowWidth = document.body.clientWidth
        const windowHeight = document.body.clientHeight
        const windowAspectRatio = windowHeight / windowWidth
        let videoWidth
        let videoHeight
        if (windowAspectRatio < 0.5625) {
          videoWidth = windowWidth
          videoHeight = videoWidth * 0.5625
          this.fixStyle = {
            height: windowWidth * 0.5625 + 'px',
            width: windowWidth + 'px',
            'margin-bottom': (windowHeight - videoHeight) / 2 + 'px',
            'margin-left': 'initial'
          }
        } else {
          videoHeight = windowHeight
          videoWidth = videoHeight / 0.5625
          this.fixStyle = {
            height: windowHeight + 'px',
            width: windowHeight / 0.5625 + 'px',
            'margin-left': (windowWidth - videoWidth) / 2 + 'px',
            'margin-bottom': 'initial'
          }
        }
      }
      window.onresize()
    },
    handleLogin() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.form)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
              this.CaptchaGetOne()
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    lang(field) {
      return getlang(this, field)
    }
  }
}

</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $light_gray:#fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(245, 245, 245, 0.2);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style lang="scss">
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

  .homepage-hero-module,
  .video-container {
    position: relative;
    height: 100vh;
    overflow: hidden;

    .login-container {
      min-height: 100%;
      width: 100%;
      background-color: $bg;
      overflow: hidden;

      .form {
        .title-container {
          position: relative;

          .title {
            font-size: 26px;
            color: $light_gray;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
          }

          .set-language {
            color: #fff;
            position: absolute;
            top: 3px;
            font-size: 18px;
            right: 0px;
            cursor: pointer;
          }
        }

        position: relative;
        width: 520px;
        max-width: 100%;
        // padding: 160px 35px 0;
        padding: 10% 35px 0;
        margin: 0 auto;
        overflow: hidden;
        z-index: 100;
      }

      .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
      }

      @media only screen and (max-width: 470px) {
        .thirdparty-button {
          display: none;
        }
      }
    }

  }

  .video-container .poster img,
  .video-container video {
    z-index: 0;
    position: absolute;
  }

  .video-container .filter {
    z-index: 1;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
  }

</style>
