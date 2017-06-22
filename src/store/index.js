import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import service from '@/service'
import { Toast } from 'mint-ui'
Vue.use(Vuex)
Vue.use(VueResource)
// function clearSession () {
//   var info = {
//     'tokenId': '',
//     'mobile': '',
//     'userName': '',
//     'openId': ''
//   }
//   return info
// }
const store = new Vuex.Store({
  state: {
    // 'mobile': window.sessionStorage.getItem('mobile'),
    'userId': window.sessionStorage.getItem('userId'),
    'openId': window.sessionStorage.getItem('openId'),
    'bindStatus': window.sessionStorage.getItem('bindStatus')
  },
  getters: {
    // loginMsg: state => state.loginMsg
  },
  mutations: {
    checkRegister (state, pamars) {
      // state.mobile = pamars.mobile
      state.openId = pamars.unionId
      state.userId = pamars.userId
      // state.bindStatus = pamars.bindStatus
      state.bindStatus = true
    }
  },
  actions: {
    checkRegister ({commit, state}, pamars) {
      service.checkRegister(pamars, function (res) {
        if (res.code === '000000') {
          window.sessionStorage.setItem('openId', res.result.unionId)
          window.sessionStorage.setItem('userId', res.result.userId)
          window.sessionStorage.setItem('bindStatus', res.result.bindStatus)
          var info = {
            'unionId': res.result.unionId,
            'userId': res.result.userId,
            'bindStatus': res.result.bindStatus
          }
          commit('checkRegister', info)
        } else {
          Toast(res.message)
        }
      })
    },
    getCaptcha ({commit, state}, pamars) {
      service.getCaptcha(pamars, function (res) {
        if (res.code === '000000') {
          Toast('验证码已成功发送，请注意查收～')
        } else {
          Toast(res.message)
        }
      })
    }
  }
})

export default store
