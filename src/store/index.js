import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import service from '@/service'
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
    sessionStorage (state, pamars) {
      // state.mobile = pamars.mobile
      state.openId = pamars.unionId
      state.userId = pamars.userId
      state.bindStatus = pamars.bindStatus
    }
  },
  actions: {
    checkRegister ({commit, state}, pamars) {
      service.checkRegister(pamars, function (res) {
        if (res.code === '000000') {
          window.sessionStorage.setItem('openId', res.unionId)
          window.sessionStorage.setItem('userId', res.userId)
          window.sessionStorage.setItem('bindStatus', res.bindStatus)
          var info = {
            // 'mobile': res.mobile,
            'unionId': res.unionId,
            'userId': res.userId,
            'bindStatus': res.bindStatus
          }
          commit('sessionStorage', info)
        } else {
          alert(res.message)
        }
      })
    },
    getCaptcha ({commit, state}, pamars) {
      service.getCaptcha(pamars, function (response) {
        console.log(response)
      })
    },
    submitCaptcha ({commit, state}, pamars) {
      service.submitCaptcha(pamars, function (response) {
        window.sessionStorage.setItem('mobile', pamars.mobile)
      })
    }
  }
})

export default store
