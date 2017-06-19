<template>
  <div id="coupon" class="set-bg">
    <img src="../../assets/imgs/promotions/coupons/coupon0630/top.png" width="100%">
    <input type="tel" name="mobile" class="item-wrap set-bg outer-bg mobile" placeholder="输入手机号">
    <div class="item-wrap captcha-wrap">
      <input type="text" name="captcha" class="set-bg outer-bg captcha fl" placeholder="输入验证码">
      <div class="set-bg outer-bg captcha-get fr">{{ captchaTxt }}</div>
    </div>
    <div class="item-wrap submit">确定</div>
    <div class="item-wrap hint"><small>该手机号已经被绑定，请更换手机号后重试</small></div>
    <img src="../../assets/imgs/promotions/coupons/coupon0630/rules.png" width="80%">
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
  padding-bottom: 15px;
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
  .item-wrap {
    width: 80%;
    margin: 0 auto 5%;
  }
  .captcha-wrap {
    overflow: hidden;
  }
  .mobile {
    margin-top: 5%;
    background-image: url('../../assets/imgs/promotions/coupons/coupon0630/inputfir.png');
  }
  .captcha {
    width: 55%;
    background-image: url('../../assets/imgs/promotions/coupons/coupon0630/inputsec.png');
  }
  .captcha-get {
    width: 40%;
    padding: 0;
    color: #f03c31;
    background-image: url('../../assets/imgs/promotions/coupons/coupon0630/captcha.png');
  }
  .submit {
    background-color: #fe4f42;
    color: #ffffff;
    padding: 10px 0;
    font-size: 0.36rem;
    border-radius: 30px;
    margin-bottom: 2%;
  }
  .hint {
    color: #fe4f42;
  }
}
</style>
