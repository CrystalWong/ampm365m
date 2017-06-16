<template>
  <div class="coupon">
    <img src="../../assets/imgs/promotions/coupons/coupon0630/top.png" width="100%">
    <div class="mobile-wrap">
      <input type="tel" name="mobile" class="mobile" width="90%">
    </div>
    
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.coupon {
  background: -webkit-linear-gradient(#fcf7cd, #fff4bd); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(#fcf7cd, #fff4bd); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(#fcf7cd, #fff4bd); /* Firefox 3.6 - 15 */
  background: linear-gradient(#fcf7cd, #fff4bd); /* 标准的语法（必须放在最后） */
  text-align: center;
  .mobile {
    width: 80%;
    height: 45px;
    line-height: 45px;
    background-image: url('../../assets/imgs/promotions/coupons/coupon0630/inputfir.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin: 5% auto;
    padding: 10px 20px;
    background-color: transparent;
    border: none;
  }
  
}
</style>
