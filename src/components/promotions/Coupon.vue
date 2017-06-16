<template>
  <div id="coupon" class="set-bg">
    <img src="../../assets/imgs/promotions/coupons/coupon0630/top.png" width="100%">
    <input type="tel" name="mobile" class="set-bg outer-bg mobile" placeholder="输入手机号">
    <div class="captcha-wrap">
      <input type="text" name="captcha" class="set-bg outer-bg captcha fl" placeholder="输入验证码">
      <div class="set-bg outer-bg captcha-get fr">{{ captchaTxt }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      'captchaTxt': '获取验证码'
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
#coupon {
  background-image: url('../../assets/imgs/promotions/coupons/coupon0630/bg.png');
  text-align: center;
  .set-bg {
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-color: transparent;
    border: none;
  }
  .outer-bg {
    height: 45px;
    line-height: 45px;
    padding: 10px 20px;
  }
  .captcha-wrap {
    width: 80%;
    overflow: hidden;
    margin: 0 auto;
  }
  .mobile {
    width: 80%;
    margin: 5% auto;
    background-image: url('../../assets/imgs/promotions/coupons/coupon0630/inputfir.png');
  }
  .captcha {
    width: 55%;
    background-image: url('../../assets/imgs/promotions/coupons/coupon0630/inputsec.png');
  }
  .captcha-get {
    width: 40%;
    padding: 0;
    background-image: url('../../assets/imgs/promotions/coupons/coupon0630/captcha.png');
  }

  
}
</style>
