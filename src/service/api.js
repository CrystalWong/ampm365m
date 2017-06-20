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
    return Vue.http.get(url, {params: params}).then(function (response) {
      cb(response.body)
    }).catch(function(response){
      cb(response.body)
    })
  }
  post (url, params, cb) {
    return Vue.http.post(url, {params: params}).then(function (response) {
      cb(response.body)
    }).catch(function(response){
      cb(response.body)
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
