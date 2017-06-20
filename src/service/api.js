import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
// Vue.http.interceptors.push((request, next) => {
//   request.headers.set('APPkey','3')
//   next((response) => {
//     return response
//   })
// })
const API = class Api {
  constructor () {
    var header = {
      'Content-Type': 'application/json; charset=UTF-8',
      'apiVersion': '1.0',
      'platform': 'webApp'
    }
  }
  get (url, params, cb) {
    // for (var k in params) {
    //   url += params[k] + '/'
    // }
    return Vue.http.get(url, {params: params}).then(function (response) {
      cb(response.body)
    }).catch(function(response){
      alert('网络连接失败，请检查您的网络')
    })
  }
  post (url, params, cb) {
    return Vue.http.post(url, {params: params}).then(function (response) {
      cb(response.body)
    }).catch(function(response){
      alert('网络连接失败，请检查您的网络')
    })
  }
  jsonp (url, params) {
    return Vue.http.jsonp(url, {params: params}).then(function (response) {
      cb(response.body)
    }).catch(function(response){
      cb(response.body)
    })
  }
}

export default API
