<template>
  <div id="share">
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
        <img src="../../assets/imgs/promotions/share/share0705/activity.jpg" alt="" />
      </div>
    </div>
  
    <!--手机号页面-->
    <div class="phone-bg bg" v-show="phone">
      <input type="text" id="phone" class="phone-txt" name="phone" placeholder='输入手机号' @blur="checkPhone" @input="ckPhone"/>
      <div class="verification">
        <input type="text" name="captcha" placeholder='输入验证码' class="fl inputCaptcha" @input="inputCaptcha"/>
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
        <img src="../../assets/imgs/promotions/share/share0705/activity.jpg" alt="" />
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
//    判断手机号有没有绑定提示信息
      binding: false,
//    判断是不是手机号提示信息
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
      userId: ''
    }
  },
  created () {
    this.getCode()
  },
  methods: {
    //  购买按钮
    buyClick: function () {
      alert(1)
    },
    // 确认按钮
    confirmClick: function () {
      var that = this
      var url = '/org/coupon/user/bind?userId=' + this.userId + '&phone=' + this.phoneValue + '&vacode=' + this.inCaptcha
      this.$http.get(url).then(function (data) {
        if (data.body.code !== '000000') {
          this.message = data.body.message
          this.binding = true
        } else {
          var url = '/org/coupon/coupon/bind/online?userId=' + that.userId + '&yhqId=373'
          that.$http.get(url).then(function (data) {
            that.coupon = false
            that.phone = true
            console.log(data)
          }, function () {
            this.message = '获取数据失败'
          })
        }
      }, function () {
        this.message = '获取数据失败'
      })
    },
    // 判断手机号
    checkPhone: function () {
      var phone = document.getElementById('phone')
      this.phoneValue = phone.value
      if (!(/^1[34578]\d{9}$/.test(phone.value))) {
        this.truePhone = true
      } else {
        this.truePhone = false
        this.judge = true
      }
      if (phone.value.length === 0) {
        this.truePhone = false
      }
    },
//  检测手机号Input每次输入/删除,将错误信息清除
    ckPhone: function () {
      this.binding = false
      var phone = document.getElementById('phone')
//    当手机号删除完后,清除提示  并且确认键至灰
      if (phone.value.length === 0) {
        this.truePhone = false
        this.grayConfirm = true
        this.judge = false
      }
//    如果手机号符合要求,清除提示
      if ((/^1[34578]\d{9}$/.test(phone.value))) {
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
        var url = '/org/coupon/vacode/send?phone=' + this.phoneValue + '&channel=1001'
        this.$http.get(url).then(function (data) {
          console.log(data)
          if (data.body.code !== '000000') {
            this.message = data.body.message
            this.binding = true
          }
        }, function () {
          this.message = '获取数据失败'
        })
      }
    },
//  输入验证码
    inputCaptcha: function () {
      var inputCaptcha = document.getElementsByClassName('inputCaptcha')[0]
      this.inCaptcha = inputCaptcha.value
//    如果两个输入框都有值,确认键可点击
      if (this.judge && this.inCaptcha) {
        this.grayConfirm = false
      } else {
        this.grayConfirm = true
      }
    },
//  校验openId是否绑定手机号
    getCode: function () {
      var that = this
      var code = util.getUrlParam(location.href, 'code')
      console.log(code)
      var url = '/org/coupon/user/checkandregister?code=' + code + '&channelNo=1000001'
      this.$http.get(url).then(function (data) {
        console.log(data)
        console.log(data.body.result.bindStatus)
        that.openId = data.body.result.openId
        that.userId = data.body.result.userId
        if (data.body.result.bindStatus) {
          this.phone = false
          this.coupon = true
        } else {
          var url = '/org/coupon/coupon/bind/online?userId=' + that.userId + '&yhqId=373'
          that.$http.get(url).then(function (data) {
            that.coupon = false
            that.phone = true
            console.log(data)
          }, function () {
            this.message = '获取数据失败'
          })
        }
      }, function () {
        this.message = '获取数据失败'
      })
    }
  }
}
</script>

<style lang="less" scoped>
  #share {
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
