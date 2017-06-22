<template>
  <div id="coupon" class="set-bg">
    <!-- 没绑过定手机号 start -->
    <div class="page-1" v-if="!bindStatus">
      <img src="../../assets/imgs/promotions/coupons/coupon0630/top.png" width="100%">
      <input type="tel" name="mobile" class="item-wrap set-bg outer-bg mobile" placeholder="输入手机号" v-model.trim="mobile" maxlength="11">
      <div class="item-wrap captcha-wrap">
        <input type="text" name="captcha" class="set-bg outer-bg captcha fl" placeholder="输入验证码" v-model.trim="captcha" maxlength="6">
        <div class="set-bg outer-bg get-captcha fr" v-if="!timerFlag">{{ captchaDisable }}</div>
        <div class="set-bg outer-bg get-captcha fr" @click="getCaptcha" v-if="timerFlag">{{ "获取验证码" }}</div>
      </div>
      <div class="item-wrap submitMobile" @click="bindMobile" v-if="mobile !=='' && captcha !=='' && bindable">确定</div>
      <div class="item-wrap submitMobile unable" v-if="mobile ==='' || captcha ==='' || !bindable">确定</div>
    </div>
    <!-- 没绑过定手机号 end -->
    <!-- 绑定过手机号 start -->
    <div class="page-2" v-if="bindStatus">
      <img src="../../assets/imgs/promotions/coupons/coupon0630/top2.png" width="100%">
      <div class="item-wrap set-bg outer-bg get-coupon" @click="getcoupon">我要领赠品</div>
      <!-- 优惠码弹窗 start -->
      <div class="mask" v-if="dialogShow"></div>
      <div class="dialog set-bg" v-if="dialogShow">
        <div class="dialog-inner">
          <div class="dialog-title">请在结账时向店员出示条形码</div>
          <div class="dialog-body">
            <img :src="imgUrl" width="80%">
          </div>
          <div class="set-bg outer-bg dialog-btn" @click="close">确定</div>         
        </div>
      </div>
      <!-- 优惠码弹窗 end -->
    </div>
    <!-- 绑定过手机号 end -->
    <div class="item-wrap hint"><small>{{ message }}</small></div>
    <img src="../../assets/imgs/promotions/coupons/coupon0630/rules.png" width="80%">
  </div>
</template>

<script>
import API from '@/service/api'
import Util from '@/utils'
import { Toast } from 'mint-ui'
let util = new Util()
let api = new API()
export default {
  data () {
    return {
      'dialogShow': false,
      'imgUrl': '',
      'captchaDisable': '获取验证码',
      'message': '',
      'availability': true,
      'bindable': true,
      'mobile': '',
      'captcha': '',
      'timerFlag': true,
      'urlPrefix': location.href.indexOf('test') > 0 ? '/test' : '',
      'openId': window.sessionStorage.getItem('openId'),
      'userId': window.sessionStorage.getItem('userId'),
      'bindStatus': window.sessionStorage.getItem('bindStatus')
    }
  },
  created () {
    this.checkOffline()
    console.log(this.openId, this.userId, this.bindStatus)
  },
  methods: {
    close () {
      this.dialogShow = false
    },
    checkOffline: function (params) {
      var _t = this
      return api.get(_t.urlPrefix + '/org/coupon/available/check/offline', params, function (res) {
        if (res.code === '000000') {
          _t.availability = res.result.available
          if (_t.availability === false) {
            // location.href = '/#/activityend'
            location.href = 'http://wechat.ampm365.cn/test/promotion/#/activityend'
          } else {
            _t.checkRegister()
          }
        } else {
          _t.message = res.message
        }
      })
    },
    checkRegister: function () {
      var _t = this
      var params = {
        'code': util.getUrlParam(location.href, 'code'),
        'channelNo': '1000001'
      }
      return api.get(_t.urlPrefix + '/org/coupon/user/checkandregister', params, function (res) {
        if (res.code === '000000') {
          window.sessionStorage.setItem('openId', res.result.openId)
          window.sessionStorage.setItem('userId', res.result.userId)
          window.sessionStorage.setItem('bindStatus', res.result.bindStatus)
          _t.openId = res.result.openId
          _t.userId = res.result.userId
          _t.bindStatus = res.result.bindStatus
          // window.sessionStorage.setItem('openId', '888')
          // window.sessionStorage.setItem('userId', '22902')
          // window.sessionStorage.setItem('bindStatus', true)
        } else {
          Toast(res.message)
          location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxaafaca10ec60eac6&redirect_uri=http%3A%2F%2Fwechat.ampm365.cn%2Ftest%2Fpromotion%2F%23%2Fcoupon&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
        }
      })
    },
    checkMoblie: function () {
      this.message = ''
      if (this.mobile === '') return
      var reg = /^1[34578]{1}\d{9}$/
      if (!reg.test(this.mobile)) {
        this.message = '请输入正确的手机号'
        return false
      }
      return true
    },
    timer: function () {
      var _t = this
      var s = 60
      _t.timerFlag = false
      _t.captchaDisable = s + 'S后重发'
      function clock () {
        s -= 1
        _t.captchaDisable = s + 'S后重发'
        if (s <= 0) {
          clearInterval(tim)
          _t.timerFlag = true
        }
      }
      var tim = setInterval(clock, 1000)
    },
    getCaptcha: function () {
      var _t = this
      var checkTel = _t.checkMoblie()
      if (checkTel) {
        var params = {
          'phone': _t.mobile,
          'channel': '1001'
        }
        _t.timer()
        _t.$store.dispatch('getCaptcha', params)
      }
    },
    bindMobile: function () {
      var _t = this
      var params = {
        'phone': _t.mobile,
        'vacode': _t.captcha,
        'userId': _t.userId,
        'openId': _t.openId
      }
      _t.bindable = false
      return api.get(_t.urlPrefix + '/org/coupon/user/bind', params, function (res) {
        if (res.code === '000000') {
          _t.bindStatus = true
        } else {
          Toast(res.message)
        }
        _t.bindable = true
      })
    },
    getcoupon: function () {
      var _t = this
      var params = {
        'userId': _t.userId,
        'width': '1',
        'dpi': '80',
        'fontSize': '3',
        'fileType': 'image/png'
      }
      return api.get(_t.urlPrefix + '/org/coupon/coupon/bind/offline', params, function (res) {
        if (res.code === '000000') {
          console.log(res.result.data)
          _t.imgUrl = 'data:image/png;base64,' + res.result.data
          _t.dialogShow = true
        } else {
          Toast(res.message)
        }
      })
    }
  }
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
  .get-captcha {
    width: 40%;
    padding: 0;
    color: #f03c31;
    background-image: url('../../assets/imgs/promotions/coupons/coupon0630/captcha.png');
  }
  .submitMobile {
    background-color: #fe4f42;
    color: #ffffff;
    padding: 10px 0;
    font-size: 0.36rem;
    border-radius: 30px;
    margin-bottom: 2%;
  }
  .unable {
    background-color: #666666;
  }
  .get-coupon {
    margin-top: 5%;
    color: #ffffff;
    font-size: 0.36rem;
    padding: 0;
    background-image: url('../../assets/imgs/promotions/coupons/coupon0630/getcoupon.png');
  }
  .hint {
    color: #fe4f42;
  }
  .mask {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background-color: #000000;
    opacity: 0.7;
    z-index: 998;
  }
  .dialog {
    z-index: 999;
    position: absolute;
    width: 90%;
    height: 90%;
    top: 50%;
    left: 50%;
    margin-top: -65%;
    margin-left: -45%;
    background-image: url('../../assets/imgs/promotions/coupons/coupon0630/qlcat.png');
    background-size: 100% auto;
    .dialog-inner {
      width: 80%;
      margin: 0 auto;
      .dialog-title {
        margin-top: 46%;
        background-color: #fe4f42;
        padding: 10px 0;
        color: #ffffff;
      }
      .dialog-body {
        padding: 20px 0 15px;
        background-color: #ffffff;
      }
      .dialog-btn {
        margin-top: 15px;
        color: #ffffff;
        padding: 0;
        background-image: url('../../assets/imgs/promotions/coupons/coupon0630/close.png');
      }
    }
  }
}
</style>
