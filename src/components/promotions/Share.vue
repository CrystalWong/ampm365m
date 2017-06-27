<template>
	<div id="share">
	  <!--领取礼物-->
		<div class="share-bg bg" v-show="share">
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
		<div class="boot" v-show="share">
			分享完成后点击链接领取
		</div>
		<div class="mask" v-show="mask" @click='maskClose'>
			<img src="../../assets/imgs/promotions/share/share0705/backoh.png" alt="" />
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
export default {
  data () {
    return {
      share: false,
      mask: false,
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
    this.id = this.$route.params.id
    this.page(this.id)
    this.getCode()
  },
  methods: {
    page: function (shareId) {
      if (shareId === '1') {
        this.share = true
      } else if (shareId === '2') {
        this.phone = true
      }
    },
    // 领取按钮
    btnClick: function () {
      this.mask = true
    },
    // 遮罩层
    maskClose: function () {
      this.mask = false
    },
    // 确认按钮
    confirmClick: function () {
      var url = '/org/coupon/user/bind?userId=' + this.phoneValue + '&phone=' + this.phoneValue + '&vacode=' + this.inCaptcha
      this.$http.get(url).then(function (data) {
        if (data.body.code !== '000000') {
          this.message = data.body.message
          this.binding = true
        } else {
          this.$router.push('/receivesucc')
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
//  获取code值
    getCode: function () {
      var code = this.GetQueryString('code')
      console.log(code)
      var that = this
      var url = '/org/coupon/user/checkandregister?code=' + code + '&channelNo=1000001'
      this.$http.get(url).then(function (data) {
        console.log(data)
        console.log(data.body.result.bindStatus)
        that.openId = data.body.result.openId
        that.userId = data.body.result.userId
        if (data.body.result.bindStatus) {
          this.$router.push('/share/2')
        } else {
          var url = '/org/coupon/coupon/bind/online?userId=' + that.userId + '&yhqId=373'
          this.$http.get(url).then(function (data) {
            this.$router.push('/receivesucc')
          }, function () {
            this.message = '获取数据失败'
          })
        }
      }, function () {
        this.message = '获取数据失败'
      })
    },
    GetQueryString: function (name) {
      var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)")
      var r = window.location.search.substr(1).match(reg)
      if (r!=null) {
        return unescape(r[2])
      } else {
        return null
      }
    }
  }
}
</script>

<style lang="less" scoped>
	#share {
		width: 100;
		position: relative;
		/*领取页面*/
		.share-bg{
			height: 11.21rem;
			background: url('../../assets/imgs/promotions/share/share0705/interfacethr.png') no-repeat;
		}
		.receive {
			width: 100%;
			height: 0.96rem;
			margin-top: 7.52rem;
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
