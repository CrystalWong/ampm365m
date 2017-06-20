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
    'mobile': window.sessionStorage.getItem('mobile'),
    'userId': window.sessionStorage.getItem('userId'),
    'openId': window.sessionStorage.getItem('openId')
  },
  getters: {
    // loginMsg: state => state.loginMsg
  },
  mutations: {
    sessionStorage (state, pamars) {
      state.mobile = pamars.mobile
      state.openId = pamars.unionId
      state.userId = pamars.userId
    }
  },
  actions: {
    checkRegister ({commit, state}, pamars) {
      service.checkRegister(pamars, function (response) {
        window.sessionStorage.setItem('openId', response.openId)
        window.sessionStorage.setItem('mobile', response.mobile)
        window.sessionStorage.setItem('userName', response.userName)
        var info = {
          'tokenId': response.tokenid,
          'mobile': response.mobile,
          'openId': response.openId,
          'userName': response.userName
        }
        commit('sessionStorage', info)
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
