<template>
  <div id="receive">
    <!--领取礼物-->
    <div class="share-bg bg">
      <div class="receive" @click="btnClick">
        <div class="txt">
                      有心啦，我领~
        </div>
      </div>
      <div class="unclock">
        <img src="../../assets/imgs/promotions/share/share0705/unclock.png"/>
      </div>
      <div class="friend">
        <img src="../../assets/imgs/promotions/share/share0705/friend.png" alt="" class="fl"/>
        <img src="../../assets/imgs/promotions/share/share0705/share.png" class="fr" />
      </div>
    </div>
    <div class="boot">
                分享完成后点击链接领取
    </div>
    <div class="mask" v-show="mask" @click='maskClose'>
      <img src="../../assets/imgs/promotions/share/share0705/backoh.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mask: false
    }
  },
  methods: {
// 领取按钮
    btnClick: function () {
      this.mask = true
    },
    // 遮罩层
    maskClose: function () {
      this.mask = false
    },
  }
}
</script>

<style lang="less" scoped>
  #receive {
    width: 100%;
    position: relative;
    /*领取页面*/
    .share-bg{
      height: 11.21rem;
      background: url('../../assets/imgs/promotions/share/share0705/interfacethr.png') no-repeat;
      background-size: 100% 100%;
      background-color: transparent;
      border: none;
      overflow: hidden;
    }
    .receive {
      width: 100%;
      height: 0.96rem;
      margin-top: 7.52rem;
    }
    .receive .txt {
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
    .unclock {
      width: 100%;
      margin-top: 0.4rem;
      height: 0.43rem;
    }
    .unclock img {
      width: 50%;
      margin: 0 auto;
    }
    .friend {
      width: 52%;
      margin: 0 auto;
      margin-top: 0.24rem;
    }
    .friend img {
      width: 36.2%;
    }
    .boot {
      width: 100%;
      background-color: #9b1616;
      height: 0.86rem;
      text-align: center;
      line-height: 0.86rem;
      font-size: 0.24rem;
      color: #fff;
    }
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,.5);
    }
    .mask img {
      width: 82.67%;
      margin-left: 0.8rem;
    }
  }
</style>
