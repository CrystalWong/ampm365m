<template>
<div>
  <div id="spreadActive">
   <div class="extensionone">
     <img src="../../assets/imgs/promotions/coupons/coupon0626/extensionone.png">
   </div>
   <div class="extensiontwo">
     <img src="../../assets/imgs/promotions/coupons/coupon0626/extensiontwo.png">
   </div>
   <div class="extensionthr">
     <img src="../../assets/imgs/promotions/coupons/coupon0626/extensionthr.png">
   </div>
   <div class="extensionfor">
     <img src="../../assets/imgs/promotions/coupons/coupon0626/extensionfor.png">
   </div>
   <div class="extensionfive">
     <img src="../../assets/imgs/promotions/coupons/coupon0626/extensionfive.png">
   </div>
   <div class="notice">
     <span>此次活动最终解释权归北京全时叁陆伍连锁便利店有限公司所有</span>
   </div>
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
#spreadActive{
  min-height: 23rem;
  background: url(../../assets/imgs/promotions/coupons/coupon0626/extension.png);
  background-size:cover;
  padding-left:0.24rem;
  padding-right:0.24rem;
  div{
    img{
      width: 100%;
    }
  }
  .extensionone{
    padding-top:6.42rem;
    height: 9.22rem;
  }
  .extensiontwo{
    height: 3.2rem;
  }
  .extensionthr{
    height: 2.75rem;
  }
  .extensionfor{
    height: 3.3rem;
  }
   .extensionfive{
    height: 3.7rem;
  }
  .notice{
    text-align: center;
    margin-top:0.15rem;
    span{
      font-size:0.16rem;
      color:#660000;
    }
  }
}
</style>
