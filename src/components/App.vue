<template>
  <div id="app">
    <router-view></router-view>
    <router-view name="main"></router-view>
    <router-view name="menubar"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () { return {} },
  methods: {}
}
</script>
<style src="@/assets/style/common.less" lang="less"></style>
<style lang="less">
#app {
  text-align: center;
}
</style>
