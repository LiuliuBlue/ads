<template>
  <div class="login-container">
    <h1>智慧服务平台</h1>
    <div class="main-agileinfo">
      <h2>欢迎登录</h2>
      <el-form ref="loginFormRef" :model="loginFormModel" :rules="rules">
        <el-form-item prop="username">
          <el-input
            v-model="loginFormModel.username"
            clearable
            placeholder="请输入账号"
            suffix-icon="el-icon-user-solid"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginFormModel.password"
            clearable
            placeholder="请输入密码"
            show-password
            suffix-icon="el-icon-s-goods"
            type="password"
          />
        </el-form-item>
        <el-form-item prop="code">
          <div class="img-code">
            <el-input
              v-model="loginFormModel.code"
              clearable
              placeholder="请输入验证码"
            />
            <el-image
              :src="imgUrl"
              @click="
                () => {
                  loginFormModel.code = ''
                  getCaptcha()
                }
              "
            />
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            class="login-button"
            type="danger"
            @click="handleLogin"
          >
            {{ loading ? '登录中...' : '立即登录' }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { captcha } from '@/api/user'
import rules from './rules'
import { mapActions } from 'vuex'
import { notifyTips } from '@/utils/notify'

export default {
  name: 'login',
  data() {
    return {
      // loading加载
      loading: false,
      // 表单验证规则
      rules,
      // 图片地址
      imgUrl: '',
      // 登录数据模型
      loginFormModel: {
        code: '',
        password: 'admin888',
        token: '',
        username: 'duck'
      }
    }
  },
  created() {
    this.getCaptcha()
  },
  methods: {
    ...mapActions({
      login: 'user/login'
    }),
    /**
     * 获取验证码
     * @returns {Promise<void>}
     */
    async getCaptcha() {
      try {
        const { captchaImg, token } = await captcha()
        this.imgUrl = captchaImg
        this.loginFormModel.token = token
      } catch (e) {
        console.log(e)
      }
    },
    async handleLogin() {
      try {
        this.loading = true
        await this.$refs.loginFormRef.validate()
        await this.login(this.loginFormModel)
        notifyTips('成功', '登录成功', 'success')
        this.$router.push('/')
      } catch (e) {
        this.getCaptcha()
        console.log(e)
      }
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  background: url('@/assets/images/123.webp') no-repeat 0 0;
  background-size: cover;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  h1 {
    text-align: center;
    font-size: 42px;
    margin-top: 50px;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 5px;
  }

  .main-agileinfo {
    margin: 10% auto 13%;
    width: 20%;

    h2 {
      color: #fff;
      font-size: 30px;
      margin-bottom: 30px;
    }

    .el-form {
      .el-form-item {
        height: 64px;

        .el-input {
          width: 100%;
          padding: 2px 2px 2px 2px;
          border-radius: 5px;
          background: hsla(0, 0%, 100%, 0.15);
          background: #fff;
          border: none;
          outline: none;
          font-size: 14px;
          margin-bottom: 20px;

          .el-input__inner {
            border: 1px solid #dcdfe6;
          }
        }

        .img-code {
          display: flex;
          align-items: stretch;
          justify-content: center;

          .el-image {
            width: 200px;
            height: 40px;
            border-radius: 5px;
            margin-left: 10px;
            cursor: pointer;
          }
        }

        .login-button {
          width: 100%;
        }
      }
    }
  }
}
</style>
