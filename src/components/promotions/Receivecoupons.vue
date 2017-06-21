<template>
<div>
	<div id="receiveCoupons" v-show="isShow">
    <img src="../../assets/imgs/promotions/coupons/coupon0701/interface.png" width="100%">
    <div class="mineBottom">
      <div >
        <!-- <span><router-link to="/Getgifts">当然是我哒</router-link></span> -->
        <span @click="getCode">当然是我哒</span>
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
        <input type="text" placeholder="输入手机号" class="inputPhone">
        <input type="text" placeholder="输入验证码" class="inputCode">
        <button type='button'>获取验证码</button>
        <span v-if :'codeError'>验证码错误，请重新输入</span>
        <div class='giveMe'>
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
        <!-- <span><router-link to="/">去买买买</router-link></span> -->
        <span @click="toggle">去买买买</span>
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
  </div>
  <!--receivecupons end -->
  <div id="activeEnd">
    <img src="../../assets/imgs/promotions/coupons/coupon0701/activeEnd.png">
  </div>
</div>
</template>

<script>
import API from '@/service/api'
import Util from '@/utils'
let util = new Util()
let api = new API()
export default {
  data () {
    return {
      dialog: false,
      isShow: true,
      timer: 30,
      stop: false,
      Interval: null,
      codeError: false,
      alreadyRegister: false
    }
  },
  created () {
    var url = 'http://localhost:8080/#/coupon?code=jdjffofofof99877'
    var params = {
      // 'code': util.getUrlParam(location.href, 'code'),
      'code': util.getUrlParam(url, 'code'),
      'channelNo': '1000001'
    }
    this.$store.dispatch('checkRegister', params)
    this.checkOffline()
  },
  methods: {
    open () { // 弹出弹出层
      this.dialog = true
    },
    close () { // 关闭弹出层
      this.dialog = false
    },
    toggle () { // 切换页面
      this.isShow = !this.isShow
      console.log(this.isShow)
    },
    update () { // 验证码倒计时
      if (this.timer <= 0) {
        clearInterval(this.Interval)
      } else {
        this.timer--
      }
      console.log('this.timer is : ' + this.timer)
    },
    startTimer () { // 验证码倒计时控制
      if (this.stop === false) {
        this.stop = !this.stop
        this.getCode()
        this.Interval = setInterval(this.update, 1000)
      } else {
        if (this.timer <= 0) {
          this.stop = !this.stop
          this.startTimer()
          this.timer = 30
        }
      }
    },
    getCode () { // 验证码请求
      var params = {
        'yhqId': 370
      }
      this.$http.get('/org/coupon/available/check/online', {params: params}).then(response => {
        this.someData = response.data
        if (this.someData.available) {

        } else {
          this.checkOffline()
        }
      }, response => {
      })
    },
    userRegister () {
      this.$http.get('/someUrl').then(response => {
        this.someData = response.body
      }, response => {
        this.isShow()
      })
    },
    checkOffline: function (params, cb) {
      return api.get('/org/coupon/user/checkandregister', params, cb)
    }
  }
}
</script>

<style lang="less" scoped>
	#receiveCoupons{
    position: relative;
    .mineBottom{
      position: absolute;
      top: 8.7rem;
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
      top: 10.2rem;
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
      top: 12.7rem;
      width: 100%;
      text-align: center;
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
