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
    'tokenId': '',
    'mobile': '',
    'userName': '',
    'openId': ''
  },
  getters: {
    // loginMsg: state => state.loginMsg
  },
  mutations: {
    sessionStorage (state, pamars) {
      state.tokenId = pamars.tokenId
      state.mobile = pamars.mobile
      state.unionId = pamars.unionId
      state.userName = pamars.userName
    }
  },
  actions: {
    toLogin ({commit, state}, pamars) {
      service.toLogin(pamars, function (response) {
        window.sessionStorage.setItem('tokenId', response.tokenid)
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
