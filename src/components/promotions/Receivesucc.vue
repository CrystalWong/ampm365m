<template>
  <div id="receive">
    <!--优惠券页面-->
    <div class="coupon-bg bg" v-show="coupon">
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
        <div class="activityTime">
                    活动时间
        </div>
        <div class="activeMessage">
          <span class="num">1</span>
          <span class="cont">领取时间：2017年7月5日-7月7日</span>
        </div>
        <div class="activeMessage">
          <span class="num">2</span>
          <span class="cont">使用时间：2017年7月8日-7月16日</span>
        </div>
        <div class="activityRule">
                    活动规则
        </div>
        <div class="activeMessage">
          <span class="num">1</span>
          <span class="cont">每个用户限领一张优惠券；</span>
        </div>
        <div class="activeMessage">
          <span class="num">2</span>
          <span class="cont">优惠券仅限在全时微信商城下单使用；</span>
        </div>
        <div class="activeMessage">
          <span class="num">3</span>
          <span class="cont">活动火爆，优惠券数量有限，领完即止；</span>
        </div>
        <div class="activeMessage">
          <span class="num">4</span>
          <span class="cont">优惠券限在有效期内使用。</span>
        </div>
        <div class="bottomMessage">
                          此次活动最终解释权归北京全时叁陆伍连锁便利店有限公司所有
        </div>
      </div>
    </div>
  
    <!--手机号页面-->
    <div class="phone-bg bg" v-show="phone">
      <input type="tel" id="phone" class="phone-txt" name="phone" placeholder='输入手机号' v-model.trim="phoneValue" @blur="checkPhone" @input="ckPhone" maxlength="11"/>
      <div class="verification">
        <input type="text" name="captcha" placeholder='输入验证码' class="fl inputCaptcha" v-model.trim="inCaptcha" @input="inputCaptcha" maxlength="6"/>
        <div class="fr getCaptcha captcha" @click="getCaptcha" v-show='time'>获取验证码</div>
        <div class="fr countDown captcha" v-bind:hidden="time">60 s</div>
      </div>
      <div class="confirm">
        <div class="txt" @click="confirmClick" v-bind:hidden="grayConfirm">
                    确 定
        </div>
        <div class="grayTxt" v-show="grayConfirm">
                    确 定
        </div>
        <p v-show="binding">{{message}}</p>
        <p v-show="truePhone">请使用正确手机号</p>
      </div>
      <div class="activity">
        <div class="activityTime">
                    活动时间
        </div>
        <div class="activeMessage">
          <span class="num">1</span>
          <span class="cont">领取时间：2017年7月5日-7月7日</span>
        </div>
        <div class="activeMessage">
          <span class="num">2</span>
          <span class="cont">使用时间：2017年7月8日-7月16日</span>
        </div>
        <div class="activityRule">
                    活动规则
        </div>
        <div class="activeMessage">
          <span class="num">1</span>
          <span class="cont">每个用户限领一张优惠券；</span>
        </div>
        <div class="activeMessage">
          <span class="num">2</span>
          <span class="cont">优惠券仅限在全时微信商城下单使用；</span>
        </div>
        <div class="activeMessage">
          <span class="num">3</span>
          <span class="cont">活动火爆，优惠券数量有限，领完即止；</span>
        </div>
        <div class="activeMessage">
          <span class="num">4</span>
          <span class="cont">优惠券限在有效期内使用。</span>
        </div>
        <div class="bottomMessage">
                          此次活动最终解释权归北京全时叁陆伍连锁便利店有限公司所有
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Util from '@/utils'
import { Toast } from 'mint-ui'
let util = new Util()
export default {
  data () {
    return {
      coupon: false,
      phone: false,
//    判断手机号有没有绑定, 提示信息
      binding: false,
//    判断是不是手机号,提示信息
      truePhone: false,
//    获取验证码能否点击
      judge: false,
//    验证时间60s
      time: true,
//    手机号页面,确认键
      grayConfirm: true,
//    手机号
      phoneValue: '',
//    验证码
      inCaptcha: '',
//    验证手机,报错返回信息
      message: '',
      openId: '',
      urlPrefix: location.href.indexOf('test') > 0 ? '/test' : '',
      userId: '',
//    点击确认键时,防止多次点击
      bool: true
    }
  },
  created () {
    this.checkOnline()
  },
  methods: {
    //  购买按钮
    buyClick: function () {
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxaafaca10ec60eac6&redirect_uri=http://wechat.ampm365.cn/assets/appIndex.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
    },
    // 确认按钮
    confirmClick: function () {
      if (this.bool) {
        this.bool = false
        var url = this.urlPrefix + '/org/coupon/user/bind?openId=' + this.openId + '&userId=' + this.userId + '&phone=' + this.phoneValue + '&vacode=' + this.inCaptcha
        this.$http.get(url).then(function (data) {
          if (data.body.code !== '000000') {
            this.message = data.body.message
            this.binding = true
            this.bool = true
          } else {
            this.getCoupon()
            this.bool = true
          }
        }, function () {
          Toast('获取数据失败')
          this.bool = true
        })
      }
    },
    // 判断手机号
    checkPhone: function () {
      if (!(/^1[34578]\d{9}$/.test(this.phoneValue))) {
        this.truePhone = true
      } else {
        this.truePhone = false
        this.judge = true
      }
      if (this.phoneValue.length === 0) {
        this.truePhone = false
      }
    },
//  检测手机号Input每次输入/删除,将错误信息清除
    ckPhone: function () {
      this.binding = false
//    当手机号删除完后,清除提示  并且确认键至灰
      if (this.phoneValue.length === 0) {
        this.truePhone = false
        this.grayConfirm = true
        this.judge = false
      }
//    如果手机号符合要求,清除提示
      if ((/^1[34578]\d{9}$/.test(this.phoneValue))) {
        this.truePhone = false
        this.judge = true
//    如果两个输入框都有值,确认键可点击
        if (this.judge && this.inCaptcha) {
          this.grayConfirm = false
        } else {
          this.grayConfirm = true
        }
      }
    },
    // 获取验证码
    getCaptcha: function () {
      if (!this.truePhone && this.judge) {
        this.time = false
        var countDown = document.getElementsByClassName('countDown')[0]
        var sum = 60
        var sharePar = this
        var timers = setInterval(function () {
          sum--
          countDown.innerHTML = sum + ' s'
          if (sum === 0) {
            clearInterval(timers)
            countDown.innerHTML = 60 + ' s'
            sharePar.time = true
          }
        }, 1000)
        var url = this.urlPrefix + '/org/coupon/vacode/send?phone=' + this.phoneValue + '&channel=1001'
        this.$http.get(url).then(function (data) {
          if (data.body.code !== '000000') {
            this.message = data.body.message
            this.binding = true
          }
        }, function () {
          Toast('获取数据失败')
        })
      }
    },
//  输入验证码
    inputCaptcha: function () {
//    如果两个输入框都有值,确认键可点击
      if (this.judge && this.inCaptcha) {
        this.grayConfirm = false
      } else {
        this.grayConfirm = true
      }
    },
    // 判断活动是否存在
    checkOnline: function () {
      var url = this.urlPrefix + '/org/coupon/available/check/online?yhqId=193'
      this.$http.get(url).then(function (data) {
        if (data.body.code === '000000') {
          if (data.body.result.available === false) {
            if (this.urlPrefix === '/test') {
              location.href = 'http://wechat.ampm365.cn/test/promotion/#/activityend'
            } else {
              location.href = 'http://wechat.ampm365.cn/promotion/#/activityend'
            }
          } else {
            this.getCode()
          }
        } else {
          Toast(data.body.message)
        }
      }, function () {
        Toast('获取数据失败')
      })
    },
//  校验openId是否绑定手机号
    getCode: function () {
      var that = this
      var code = util.getUrlParam(location.href, 'code')
      var url = this.urlPrefix + '/org/coupon/user/checkandregister?code=' + code + '&channelNo=1000001'
      this.$http.get(url).then(function (data) {
        this.openId = data.body.result.openId
        this.userId = data.body.result.userId
        if (data.body.code === '000000') {
          if (data.body.result.bindStatus) {
            this.getCoupon()
          } else {
            this.phone = true
            this.coupon = false
            document.title = '领取赠品'
          }
        } else {
          if (that.urlPrefix === '/test') {
            location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxaafaca10ec60eac6&redirect_uri=http%3A%2F%2Fwechat.ampm365.cn%2Ftest%2Fpromotion%2F%23%2Freceivesucc&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
          } else {
            location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxaafaca10ec60eac6&redirect_uri=http%3A%2F%2Fwechat.ampm365.cn%2Fpromotion%2F%23%2Freceivesucc&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
          }
        }
        
      }, function () {
        Toast('获取数据失败')
      })
    },
//  领取优惠券
    getCoupon: function () {
      var url = this.urlPrefix + '/org/coupon/coupon/bind/online?userId=' + this.userId + '&yhqId=193'
      this.$http.get(url).then(function (data) {
        if (data.body.code !== '000000') {
          Toast(data.body.message)
        }
        this.coupon = true
        this.phone = false
        document.title = '领取优惠券'
      }, function () {
        Toast('获取数据失败')
      })
    }
  }
}
</script>

<style lang="less" scoped>
  #receive {
    width: 100%;
    /*手机号页面*/
    .phone-bg {
      height: 18.38rem;
      background: url('../../assets/imgs/promotions/share/share0705/sterygift.png') no-repeat;
    }
    .phone-txt {
      margin: 0 auto;
      margin-top: 7.52rem;
      width: 5.61rem;
      height: 0.88rem;
      line-height: 0.88rem;
      padding-left: 0.56rem;
      font-size: 0.28rem;
      border: 0.04rem solid #ffad1f;
      border-radius: 0.44rem;
    }
    .verification {
      width: 5.61rem;
      height: 0.88rem;
      margin: 0 auto;
      margin-top: 0.4rem;
    }
    .verification input{
      width: 3.36rem;
      height: 0.88rem;
      line-height: 0.88rem;
      border: 0.04rem solid #ffad1f;
      font-size: 0.28rem;
      border-radius: 0.44rem;
      padding-left: 0.56rem;
    }
    .verification .countDown {
      background-color: #ccc;
      color: #fff;
      font-size: 0.4rem;
    }
    .verification .getCaptcha {
      background-color: #ffe749;
      font-size: 0.28rem;
      color: #f03c31;
    }
    .verification .captcha {
      width: 2.1rem;
      height: 0.88rem;
      line-height: 0.88rem;
      text-align: center;
      font-weight: 600;
      border-radius: 0.44rem;
    }
    .confirm {
      width: 100%;
      margin-top: 0.4rem;
    }
    .confirm .grayTxt {
      width: 74.8%;
      margin: 0 auto;
      height: 0.96rem;
      text-align: center;
      line-height: 0.96rem;
      border-radius: 0.48rem;
      color: #fff;
      font-size: 0.32rem;
      font-weight: 600;
      background-color: #ccc;
    }
    .confirm p {
      color: #fff;
      font-size: 0.24rem;
      margin-top: 0.24rem;
    }
    
    /*优惠券*/
    .coupon-bg {
      height: 20.08rem;
      background: url(../../assets/imgs/promotions/share/share0705/ceiveSuc.png) no-repeat;
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
    
    /*公共样式*/
    .bg {
      background-size: 100% 100%;
      background-color: transparent;
      border: none;
      overflow: hidden;
    }
    .txt {
      width: 74.8%;
      margin: 0 auto;
      height: 0.96rem;
      text-align: center;
      line-height: 0.96rem;
      color: #660000;
      font-weight: 600;
      font-size: 0.32rem;
      background: url('../../assets/imgs/promotions/share/share0705/beaukug.png') no-repeat;
      background-size: 100% 100%;
      background-color: transparent;
    }
    /*活动介绍样式*/
    .activity {
      width: 100%;
      margin-top: 0.32rem;
    }
    .activity .activityTime {
      height: 0.64rem;
      width: 2.82rem;
      margin: 0 auto;
      background: url(../../assets/imgs/promotions/share/share0705/chickrule.png) no-repeat;
      background-size: 100% 100%;
      background-color: transparent;
      text-align: center;
      line-height: 0.64rem;
      color: #660000;
    }
    .activity .activityRule {
      height: 0.64rem;
      width: 2.82rem;
      margin: 0.32rem auto 0;
      background: url(../../assets/imgs/promotions/share/share0705/chickrule.png) no-repeat;
      background-size: 100% 100%;
      background-color: transparent;
      text-align: center;
      line-height: 0.64rem;
      color: #660000;
    }
    .activity .activeMessage {
      padding-left: 0.96rem;
      text-align: left;
      margin-top: 0.28rem;
      line-height: 0.32rem;
    } 
    .activity .activeMessage span{
      display: inline-block;
    }
    .activity .activeMessage span.num{
      width: 0.32rem;
      height: 0.32rem;
      line-height: 0.32rem;
      border-radius: 0.16rem;
      border: 1px solid #ffad14;
      background-color: #ffe749;
      color: #660000;
      font-size: 0.2rem;
      text-align: center;
    }
    .activity .activeMessage span.cont{
      height: 0.32rem;
      line-height: 0.32rem;
      font-size: 0.28rem;
      color: #fff;
    }
    .activity .bottomMessage {
      margin-top: 0.5rem;
      font-size: 0.18rem;
      color: #660000;
      text-align: center;
    }
  }
</style>
