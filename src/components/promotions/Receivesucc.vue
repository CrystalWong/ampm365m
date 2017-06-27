<template>
  <!--优惠券页面-->
  <div id="receive">
    <div class="coupon-bg">
      <div class="qrCode">
        <img src="../../assets/imgs/promotions/share/share0705/ohcode.png" alt="" />
        <p>关注过，直接买</p>
      </div>
      <div class="buy" @click="buyClick">
        <div class="buy-txt">
          	去买买买
        </div>
      </div>
      <div class="activity">
        <img src="../../assets/imgs/promotions/share/share0705/activity.jpg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
//  购买按钮
    buyClick: function () {
      alert(1)
    }
  }
}
</script>

<style lang="less" scoped>
  #receive {
    /*优惠券*/
    .coupon-bg {
      height: 20.08rem;
      background: url(../../assets/imgs/promotions/share/share0705/ceiveSuc.png) no-repeat;
      background-size: 100% 100%;
      background-color: transparent;
      border: none;
      overflow: hidden;
    }
    .qrCode {
      width: 100%;
      margin-top: 7.5rem;
    }
    .qrCode img {
      width: 75.2%;
      margin: 0 auto;
    }
    .qrCode p {
      text-align: center;
      color: #000;
      margin-top: 0.20rem;
      font-size: 0.24rem;
    }
    .buy {
      width: 100%;
      height: 0.96rem;
      margin-top: 0.20rem;
    }
    .buy .buy-txt {
      width: 74.8%;
      margin: 0 auto;
      height: 0.96rem;
      text-align: center;
      line-height: 0.96rem;
      color: #660000;
      font-size: 0.32rem;
      font-weight: 600;
      background: url('../../assets/imgs/promotions/share/share0705/beaukug.png') no-repeat;
      background-size: 100% 100%;
      background-color: transparent;
    }
    .activity {
      width: 100%;
      margin-top: 0.32rem;
    }
    .activity img {
      width: 100%;
    }
  }
</style>
