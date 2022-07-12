<template>
  <div class="big">
    <div class="head">
      <h1>智慧服务平台</h1>
    </div>
    <div class="center">
      <div class="dl">
        <h1>欢迎登录</h1>
        <input type="text" placeholder="请输入" />
      </div>
      <div class="dl">
        <input type="text" placeholder="请输入" />
      </div>
      <div class="yzm">
        <input class="yz" type="text" placeholder="请输入" />
      </div>
      <div class="bt">
        <button @click="lay">立即登录</button>
      </div>
    </div>
  </div>
</template>

<script>
const lay = () => {
  this.$router.push('../../layout/index.vue')
}
</script>

<style scoped lang="scss">
.big {
  width: 100%;
  height: 200vh;
  background: url('../../../public/123.webp');
  position: relative;
}
.head {
  width: 100%;
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 50px;
  color: #ccc;
  padding-top: 50px;
}
.center {
  width: 50%;
  height: 600px;
  background-color: aqua;
  position: absolute;
  top: 400px;
  left: 600px;
  .dl {
    height: 150px;
    text-align: center;
  }
  input {
    width: 500px;
    height: 50px;
  }
  .yzm {
    height: 150px;
    text-align: center;
  }
  .yz {
    width: 200px;
  }
  .bt {
    height: 100px;
    text-align: center;
    line-height: 100px;
  }
  button {
    width: 600px;
    height: 50px;
  }
}
</style>
