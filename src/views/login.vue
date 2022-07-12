<template>
  <div class="login">
    <h1 class="welcome">智慧服务平台</h1>
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="fromWrap"
    >
      <h3 class="title">欢迎登录</h3>
      <el-form-item prop="username">
        <el-input
          v-model.trim="loginForm.username"
          placeholder="请输入账号"
          suffix-icon="el-icon-user-solid"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model.trim="loginForm.password"
          type="password"
          placeholder="请输入密码"
          suffix-icon="el-icon-s-goods"
          clearable
          show-password
        />
      </el-form-item>
      <el-form-item prop="code">
        <div class="verify">
          <el-input
            v-model.trim="loginForm.code"
            placeholder="请输入验证码"
            @keyup.enter="onLogin"
          ></el-input>
          <el-image
            :src="imgCodeUrl"
            alt="正在加载"
            @click.stop="loadCaptcha"
          />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="onLogin" :loading="loadingLogin"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getCaptcha } from '@/api/user.js'
export default {
  data() {
    return {
      /**
       * 登录表单
       */
      loginForm: {
        username: 'duck',
        password: 'admin888',
        code: '',
        token: ''
      },
      /**
       * 验证码地址
       */
      imgCodeUrl: '',
      /**
       * 表单验证规则
       */
      loginRules: {
        username: [
          { required: true, trigger: 'blur', message: '请输入用户名' }
        ],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }],
        code: [{ required: true, trigger: 'blur', message: '请输入验证码' }]
      },
      /**
       * 登录按钮加载状态
       */
      loadingLogin: false
    }
  },
  methods: {
    /**
     * 加载验证码
     */
    async loadCaptcha() {
      const { captchaImg, token } = await getCaptcha()
      this.imgCodeUrl = captchaImg
      this.loginForm.token = token
    },
    /**
     * 刷新验证码
     */
    refreshCaptcha() {
      this.loginForm.code = ''
      this.loadCaptcha()
    },
    /**
     * 登录表单校验
     */
    verifyLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.onLogin()
        } else {
          this.$message.error('填写错误，请检查')
          return false
        }
      })
    },
    /**
     * 登录
     */
    async onLogin() {
      try {
        const token = await this.$store.dispatch('user/login', this.loginForm)
        if (!token) return
        this.$notify({ title: '提示', message: '登录成功', type: 'success' })
        this.loadingLogin = true
        await this.$router.push('/layout')
      } catch (error) {
        this.$message.error(error)
      } finally {
        this.loadingLogin = false
      }
    }
  },
  components: {},
  computed: {},
  watch: {},
  created() {
    this.loadCaptcha()
  }
}
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url('@/assets/images/123.webp');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
  overflow: hidden;
  .welcome {
    text-align: center;
    font-size: 50px;
    margin-top: 80px;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 5px;
  }
  .fromWrap {
    margin: 10% auto 13%;
    width: 20%;
    .title {
      color: #fff;
      font-size: 30px;
      margin-bottom: 30px;
    }
    .el-input {
      margin-bottom: 20px;
    }
    .verify {
      width: 100%;
      display: flex;
    }
    .el-image {
      width: 200px;
      height: 40px;
      border-radius: 5px;
      margin-left: 10px;
      cursor: pointer;
    }
    .el-button {
      width: 27.55vh;
    }
  }
}
</style>
