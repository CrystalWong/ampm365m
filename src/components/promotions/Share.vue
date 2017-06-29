<template>
  <div id="share">
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
import service from '@/service'
import API from '@/service/api'
import { Toast } from 'mint-ui'
let api = new API()
export default {
  data () {
    return {
      mask: false
    }
  },
  created () {
    this.getOAuth2sdk()
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
//  朋友圈/好友分享
    getOAuth2sdk: function () {
      var that = this
      var params = {
        'channelNo': '1000001',
        'type': 'jsapi',
        'url': encodeURIComponent(window.location.href)
      }
      service.OAuth2sdk(params, function (res) {
        if (res.code === '000000') {
           that.setwxConfig(res.result)
        }
      })
    },
    setwxConfig: function (res) {
      var that = this
      console.log(res)
      wx.config({
        debug: false,
        appId: res.appid,
        timestamp: res.timestamp,
        nonceStr: res.nonceStr,
        signature: res.signature,
        jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline']
      })
      that.applyWeChat()
    }, 
    shareInitReceivecoupons: function() {
      wx.onMenuShareAppMessage({
        title:'给你一份爱，不知敢接否？', // 分享标题
        desc:'请珍惜每一个愿意分享给你东东的小可爱——全时', // 分享描述
        link:'http://wechat.ampm365.cn/test/promotion/#/transfer', // 分享链接
        imgUrl:'http://wechat.ampm365.cn/test/promotion/static/celebration.png', // 分享图标
        type:'', // 分享类型,music、video或link，不填默认为link
        dataUrl:'', // 如果type是music或video，则要提供数据链接，默认为空
        success: function() {
          Toast('分享成功！')
        },
        cancel: function() {
          Toast('分享失败！')
        }
      }),
      wx.onMenuShareTimeline({
        title:'给你一份爱，不知敢接否？', // 分享标题
        link:'http://wechat.ampm365.cn/test/promotion/#/transfer', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl:'http://wechat.ampm365.cn/test/promotion/static/celebration.png', // 分享图标
        success: function () {
          Toast('分享成功！')
        },
        cancel: function () {
          Toast('分享失败！')
        }
      });
    },
    applyWeChat: function() {
      var that = this;
      wx.ready(function() {
        that.shareInitReceivecoupons();
      });
      wx.error(function(res) {});
    }
    // applyWeChat end
  }
}
</script>

<style lang="less" scoped>
  #share {
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
      position: fixed;
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
