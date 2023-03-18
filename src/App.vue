<template>
  <div id="app">
    <router-view v-if="showRouter"></router-view>
  </div>
</template>
<!--删除时刷新页面，重新加载页面，见笔记-->
<script>
export default {
  name: "App",
  
  provide() {
    return {
      reload: this.reload,
    }
  },
  data() {
    return {
      showRouter: true,
    }
  },
  methods: {
    reload() {
      this.showRouter = false
      this.$nextTick(() => {
        this.showRouter = true
      })
    },
  },
}
</script>
