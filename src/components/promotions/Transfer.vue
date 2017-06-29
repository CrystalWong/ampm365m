<template>
</template>

<script>
export default {
  data () {
    return {}
  },
  created () {
    this.win()
  },
  methods: {
    win: function () {
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxaafaca10ec60eac6&redirect_uri=http%3A%2F%2Fwechat.ampm365.cn%2Ftest%2Fpromotion%2F%23%2Freceivesucc%2F&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
    }
  }
}
</script>

<style>
</style>