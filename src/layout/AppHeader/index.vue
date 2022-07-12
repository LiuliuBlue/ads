<template>
  <div class="head">
    <div class="tc">
      <el-dropdown>
        <span class="el-dropdown-link">
          duck
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人设置</el-dropdown-item>
            <el-dropdown-item @click="tcdl">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    tcdl() {
      this.$router.push('../../views/login.vue')
    }
  },
  components: {},
  computed: {},
  watch: {},
  created() {}
}
</script>
<style lang="scss" scoped>
.tc {
  font-size: 30px;
  color: #fff;
  align-items: center;
  margin-left: 1200px;
}
.tc .el-dropdown-link {
  color: #fff;
}
</style>
