<template>
<div>
	<div id="receiveCoupons" v-show="isShow">
    <img src="../../assets/imgs/promotions/coupons/coupon0701/interface.png" width="100%">
    <div class="mineBottom">
      <div >
        <span @click="CheckCoupon">当然是我哒</span>
        <img src="../../assets/imgs/promotions/coupons/coupon0701/thrinput.png">
      </div>  
    </div>
    <div class="activeTime">
      <div class="activeTitle">
        <span>活动时间</span>
        <img src="../../assets/imgs/promotions/coupons/coupon0701/ableframe.png">
      </div>
      <div class="activeMessage">
        <i><span>1</span></i>
        <span>领取时间：2017年7月1日-7月7日</span>
      </div>
      <div class="activeMessage">
        <i><span>2</span></i>
        <span>优惠券有效时间：2017年7月1日-7月7日</span>
      </div> 
    </div>
    <div class="activeRule">
      <div class="ruleTitle">
        <span>活动规则</span>
        <img src="../../assets/imgs/promotions/coupons/coupon0701/ableframe.png">
      </div>
      <div class="activeMessage">
        <i><span>1</span></i>
        <span>每个用户限领一张;</span>
      </div>
      <div class="activeMessage">
        <i><span>2</span></i>
        <span>优惠券仅限在全时微信商城下单使用;</span>
      </div> 
      <div class="activeMessage">
        <i><span>3</span></i>
        <span>活动火爆，优惠券数量有限，领完即止;</span>
      </div>
      <div class="activeMessage">
        <i><span>4</span></i>
        <span>优惠券限在活动期间使用。</span>
      </div>
      <div class="bottomMessage">
        <span>此次活动最终解释权归北京全时叁陆伍连锁便利店有限公司所有</span>
      </div>  
    </div>
    <!--dialog-->
    <div id="dialog" >
      <mu-dialog :open="dialog" title="" @close="close">
        <img src="../../assets/imgs/promotions/coupons/coupon0701/framebackg.png" width="100%">
        <input type="tel" placeholder="输入手机号" class="inputPhone" v-model='phoneNum'>
        <input type="number" placeholder="输入验证码" class="inputCode" v-model.trim="captcha" maxlength="6">
        <button type='button' @click="getCaptcha" v-if="timerFlag">{{ "获取验证码" }}</button>
        <button type='button' v-if="!timerFlag">{{ captchaDisable }}S后重发</button>
        <div v-show="message"  class="notice">{{message}}</div>
        <div class='giveMe' @click="bindMobile">
          <div>
            <span>是我的，快给我</span>
            <img src="../../assets/imgs/promotions/coupons/coupon0701/thrinput.png">
          </div>
        </div> 
      </mu-dialog>
    </div>
    <!--dialog end -->
    <!--getgifes start -->
	</div>
  <!--getgift end -->
  <div id="getgift" v-show="!isShow">
    <img src="../../assets/imgs/promotions/coupons/coupon0701/interfacethree.png" width="100%">
    <div class="dimensional">
      <img src="../../assets/imgs/promotions/coupons/coupon0701/dimensional.png">
    </div>
    <div class="mineBottom">
      <div class="notice">
        <span>关注该，直接买</span>
      </div>
      <div >
        <a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxaafaca10ec60eac6&redirect_uri=http://wechat.ampm365.cn/assets/appIndex.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect" style='color:#000 !important'>
         <span>去买买买</span>
        <img src="../../assets/imgs/promotions/coupons/coupon0701/thrinput.png">
        </a>
      </div>  
    </div>
    <div class="activeTime">
      <div class="activeTitle">
        <span>活动时间</span>
        <img src="../../assets/imgs/promotions/coupons/coupon0701/ableframe.png">
      </div>
      <div class="activeMessage">
        <i><span>1</span></i>
        <span>领取时间：2017年7月1日-7月7日</span>
      </div>
      <div class="activeMessage">
        <i><span>2</span></i>
        <span>优惠券有效时间：2017年7月1日-7月7日</span>
      </div> 
    </div>
    <div class="activeRule">
      <div class="ruleTitle">
        <span>活动规则</span>
        <img src="../../assets/imgs/promotions/coupons/coupon0701/ableframe.png">
      </div>
      <div class="activeMessage">
        <i><span>1</span></i>
        <span>每个用户限领一张;</span>
      </div>
      <div class="activeMessage">
        <i><span>2</span></i>
        <span>优惠券仅限在全时微信商城下单使用;</span>
      </div> 
      <div class="activeMessage">
        <i><span>3</span></i>
        <span>活动火爆，优惠券数量有限，领完即止;</span>
      </div>
      <div class="activeMessage">
        <i><span>4</span></i>
        <span>优惠券限在活动期间使用。</span>
      </div>
      <div class="bottomMessage">
        <span>此次活动最终解释权归北京全时叁陆伍连锁便利店有限公司所有</span>
      </div>  
    </div>
  </div>
</div>
</template>

<script>
import service from '@/service'
import API from '@/service/api'
import Util from '@/utils'
import { Toast } from 'mint-ui'
let util = new Util()
let api = new API()
export default {
  data () {
    return {
      'openId': '',
      'userId': '',
      'imgUrl': '',
      'flag': false,
      'timerFlag': true,
      'titleMaxLength': 11,
      'dialog': false,
      'isShow': true,
      'stop': false,
      'Interval': null,
      'alreadyRegister': false,
      'phoneNum': '',
      'code': '',
      'captchaDisable': '',
      'phoneError': false,
      'userId': '',
      'message': '',
      'captcha': '',
      'urlPrefix': location.href.indexOf('test') > 0 ? '/test' : '',
      'clickAble': true,
      'bindStatus': '',
      'getcode': '',
      'codeValue': ''
    }
  },
  watch: {
    phoneNum () {
      var _t = this
      if (_t.phoneNum.length > _t.titleMaxLength) {
        _t.phoneNum = String(_t.phoneNum).slice(0, this.titleMaxLength)
      }
    }
  },
  created () {
    document.title = '领取赠品'
    this.getOAuth2sdk()
    this.checkOnline()
  },
  filters: {
    sliceString: function (str, start, length) {
      return str.slice(start, length)
    }
  },
  methods: {
    open () { // 弹出弹出层
      this.dialog = true
    },
    close () { // 关闭弹出层
      this.dialog = false
    },
    timer: function () {
      var _t = this
      var s = 60
      _t.timerFlag = false
      _t.captchaDisable = s
      function clock () {
        s -= 1
        _t.captchaDisable = s
        if (s <= 0) {
          clearInterval(tim)
          _t.timerFlag = true
        }
      }
      var tim = setInterval(clock, 1000)
    },
    checkOnline () { // 判断
      var _t = this
      var params = {
        'yhqId': 192
      }
      return api.get(_t.urlPrefix + '/org/coupon/available/check/online', params, function (res) {
        if (res.code === '000000') {
          _t.availability = res.result.available
          if (_t.availability === false) {
            if (_t.urlPrefix === '/test') {
              location.href = 'http://wechat.ampm365.cn/test/promotion/#/activityend'
            } else {
              location.href = 'http://wechat.ampm365.cn/promotion/#/activityend'
            }
          } else {
            _t.checkRegister()
          }
        } else {
          _t.message = res.message
        }
      })
    },
    // 绑定手机
    bindMobile: function () {
      var _t = this
      var params = {
        'phone': _t.phoneNum,
        'vacode': _t.captcha,
        'userId': _t.userId,
        'openId': _t.openId
      }
      _t.clickAble = false
      if(_t.phoneNum == ''){
        _t.message = '请先输入手机号'
      } else if (_t.captcha == '') {
        _t.message = '请先输入验证码'
      } else {
        service.bindMobile(params, function (res) {
          if (res.code === '000000') {
            _t.isShow = false
            _t.close()
            _t.getCoupon()
          } else {
            // Toast(res.message)
            _t.message = res.message
          }
          _t.clickAble = true
        })
      }
    },
    CheckCoupon: function () {
      var _t = this
      if (_t.codeValue == '000000') {
        if (_t.bindStatus) {
          _t.getCoupon()
        } else {
          _t.open()
        }
      } else {
        
      }
    },
    // 优惠券领取
    getCoupon: function () {
      var _t = this
      var params = {
        'userId': _t.userId,
        'yhqId': 192
      }
      return api.get(_t.urlPrefix + '/org/coupon/coupon/bind/online', params, function (res) {
        if (res.code === '000000') {
          _t.isShow = false 
        } else if (res.code === '222222') {
          // Toast(res.message)
          // setTimeout("location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxaafaca10ec60eac6&redirect_uri=http://wechat.ampm365.cn/assets/appIndex.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'",2000);
          _t.isShow = false 
          // Toast(res.message)
        }
      })
    },
    // 获取验证码
    getCaptcha: function () {
      var _t = this
      var phoneNum = _t.phoneNum
      if (util.checkPhoneNum(phoneNum)) {
        var params = {
          'phone': phoneNum,
          'channel': '1001'
        }
        service.getCaptcha(params, function (res) {
          if (res.code === '000000') {
            _t.timerFlag = false
             _t.message = '验证码已成功发送，请注意查收～'
            _t.timer()
          } else if (res.code === '333333') {
            _t.message = '您的手机号已经绑定过，请刷新页面重试'
          } else {
            _t.timerFlag = true
            _t.message = res.message
          }
        })
      } else {
        _t.message = '手机号码格式错误！'
      }
    },
    // 判断该用户是否绑定了手机号
    checkRegister: function () {
      var _t = this
      var params = {
        'code': util.getUrlParam(location.href, 'code'),
        'channelNo': '1000001'
      }
      service.checkRegister(params, function (res) {
        if (res.code === '000000') {
          _t.openId = res.result.openId
          _t.userId = res.result.userId
          _t.bindStatus = res.result.bindStatus
          _t.codeValue = res.code
          // console.log(' _t.bindStatus is : ' + _t.bindStatus)
          // console.log(' _t.bindStatus is : ' + _t.urlPrefix)
        } else {
          if (_t.urlPrefix === '/test') {
            location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxaafaca10ec60eac6&redirect_uri=http%3A%2F%2Fwechat.ampm365.cn%2Ftest%2Fpromotion%2F%23%2FReceivecoupons&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
          } else {
            location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxaafaca10ec60eac6&redirect_uri=http%3A%2F%2Fwechat.ampm365.cn%2Fpromotion%2F%23%2FReceivecoupons&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
          }
        }
      })
    },
    // checkRegister end
    getOAuth2sdk: function () {
      var _t = this
      var params = {
        'channelNo': '1000001',
        'type': 'jsapi',
        'url': encodeURIComponent(window.location.href)
      }
      service.OAuth2sdk(params, function (res) {
        if (res.code === '000000') {
           _t.setwxConfig(res.result)
        }
      })
    },
    setwxConfig: function (res) {
      var _t = this
      console.log(res)
      wx.config({
        debug: false,
        appId: res.appid,
        timestamp: res.timestamp,
        nonceStr: res.nonceStr,
        signature: res.signature,
        jsApiList: ['onMenuShareAppMessage']
      })
      _t.applyWeChat()
    }, 
    shareInitReceivecoupons: function() {
      wx.onMenuShareAppMessage({
        title: '【全时便利店-送你10块钱】', // 分享标题
        desc: '微信商城+门店共同发力，狂欢7天，今天就能用哦.', // 分享描述
        link: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxaafaca10ec60eac6&redirect_uri=http%3A%2F%2Fwechat.ampm365.cn%2Fpromotion%2F%23%2FReceivecoupons&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect', // 分享链接
        imgUrl: 'http://wechat.ampm365.cn/test/promotion/static/celebration.png', // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function() {
          Toast('分享成功！')
        },
        cancel: function() {
          Toast('分享失败！')
        }
      })
    },
    applyWeChat: function() {
      var _t = this;
      wx.ready(function() {
        _t.shareInitReceivecoupons();
      });
      wx.error(function(res) {});
    }
    // applyWeChat end
  }
}
</script>

<style lang="less" scoped>
	#receiveCoupons{
    background: url(/test/promotion/static/img/interface.7a50d55.png);
    background-size:100% 100%;
    position: relative;
    .mineBottom{
      position: absolute;
      top: 7.6rem;
      width: 100%;
      div{
        position: relative;
        img{
          width: 5.6rem;
        }
        span{
          position: absolute;
          right: 0;
          left: 0;
          bottom: 0;
          top: 0;
          margin: auto;
          font-size: 0.4rem;
          color: #000;
          height: 0.7rem;
        }
      }
    }
  .activeTime{
      position: absolute;
      top: 8.95rem;
      width: 100%;
      text-align: center;
      .activeTitle{
        position: relative;
        margin-bottom: 0.2rem;
        img{
          width: 3rem;
          height: 0.7rem;
        }
        span{
          position: absolute;
          right: 0;
          left: 0;
          bottom: 0;
          top: 0;
          margin: auto;
          font-size: 0.4rem;
          color: #000;
          height: 0.6rem;
          font-size: 0.32rem;
        }
      }
      .activeMessage{
        padding: 0 0.8rem;
        text-align: left;
        margin-bottom: 0.28rem;
        line-height: 0.4rem;
        span{
          color:#fff;
          font-size:0.3rem;
        }
        i{
          width: 0.32rem;
          height: 0.32rem;
          display: inline-block;
          font: 0.28rem;
          background: #ffe749;
          span{
            color: #000;
            position: relative;
            top:-0.05rem;
            left: 0.05rem;
          }
        }
      }  
    }
    .activeRule{
      position: absolute;
      top: 11.35rem;
      width: 100%;
      text-align: center;
      background-color: #cc0000;
      .ruleTitle{
        position: relative;
        margin-bottom: 0.2rem;
        img{
          width: 3rem;
          height: 0.7rem;
        }
        span{
          position: absolute;
          right: 0;
          left: 0;
          bottom: 0;
          top: 0;
          margin: auto;
          font-size: 0.4rem;
          color: #000;
          height: 0.6rem;
          font-size: 0.32rem;
        }
      }
      .activeMessage{
        padding: 0 0.8rem;
        text-align: left;
        margin-bottom: 0.28rem;
        line-height: 0.4rem;
        span{
          color:#fff;
          font-size:0.3rem;
        }
        i{
          width: 0.32rem;
          height: 0.32rem;
          display: inline-block;
          font: 0.28rem;
          background: #ffe749;
          span{
            color: #000;
            position: relative;
            top:-0.05rem;
            left: 0.05rem;
          }
        }
      }
    .bottomMessage{
      font-size: 0.16rem;
      color:#660000;
    }
  }
}
//part2 start 
.dimensional{
  position: absolute;
  top: 6.2rem;
  width: 100%;
  img{
    width: 5.64rem;
  }
}
#getgift{
    position: relative;
    background: url(/test/promotion/static/img/interface.7a50d55.png);
    background-size:100% 100%;
    .mineBottom{
      position: absolute;
      top: 10.85rem;
      width: 100%;
      .notice{
        font-size: 0.24rem;
        text-align: center;
        span{
          top: -0.5rem;
          font-size: 0.24rem;
        }
      }
      div{
        position: relative;
        img{
          width: 5.6rem;
        }
        span{
          position: absolute;
          right: 0;
          left: 0;
          bottom: 0;
          top: 0;
          margin: auto;
          font-size: 0.4rem;
          color: #000;
          height: 0.5rem;
          font-size: 0.3rem;
        }
      }
    }
  .activeTime{
      position: absolute;
      top: 12.25rem;
      width: 100%;
      text-align: center;
      .activeTitle{
        position: relative;
        margin-bottom: 0.2rem;
        img{
          width: 3rem;
          height: 0.7rem;
        }
        span{
          position: absolute;
          right: 0;
          left: 0;
          bottom: 0;
          top: 0;
          margin: auto;
          font-size: 0.4rem;
          color: #000;
          height: 0.6rem;
          font-size: 0.32rem;
        }
      }
      .activeMessage{
        padding: 0 0.8rem;
        text-align: left;
        margin-bottom: 0.28rem;
        line-height: 0.4rem;
        span{
          color:#fff;
          font-size:0.3rem;
        }
        i{
          width: 0.32rem;
          height: 0.32rem;
          display: inline-block;
          font: 0.28rem;
          background: #ffe749;
          span{
            color: #000;
            position: relative;
            top:-0.05rem;
            left: 0.05rem;
          }
        }
      }  
    }
    .activeRule{
      position: absolute;
      top: 14.65rem;
      width: 100%;
      text-align: center;
      background-color: #cc0000;
      .ruleTitle{
        position: relative;
        margin-bottom: 0.2rem;
        img{
          width: 3rem;
          height: 0.7rem;
        }
        span{
          position: absolute;
          right: 0;
          left: 0;
          bottom: 0;
          top: 0;
          margin: auto;
          font-size: 0.4rem;
          color: #000;
          height: 0.6rem;
          font-size: 0.32rem;
        }
      }
      .activeMessage{
        padding: 0 0.8rem;
        text-align: left;
        margin-bottom: 0.28rem;
        line-height: 0.4rem;
        span{
          color:#fff;
          font-size:0.3rem;
        }
        i{
          width: 0.32rem;
          height: 0.32rem;
          display: inline-block;
          font: 0.28rem;
          background: #ffe749;
          span{
            color: #000;
            position: relative;
            top:-0.05rem;
            left: 0.05rem;
          }
        }
      }
    .bottomMessage{
      font-size: 0.16rem;
      color: #660000;
      margin-top: 0.54rem;
    }   
  }
}  
  // part2 end
  #activeEnd{
    img{
      width: 100%;
      height:100%;
    }
  }
  // activeEnd 
</style>
