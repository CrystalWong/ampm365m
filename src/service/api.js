import Vue from 'vue'
import VueResource from 'vue-resource'
import { Toast } from 'mint-ui'
Vue.use(VueResource)
Vue.http.options.emulateJSON = true;
Vue.http.options.headers = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  'developToken': '000006',
  'tokenPassword': '1qaz2wsx',
  'reqId': guid()
}
function guid () {
  function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  }
  return (S4()+S4()+S4()+S4());
}
// Vue.http.interceptors.push((request, next) => {
//   request.headers.set('APPkey','3')
//   next((response) => {
//     return response
//   })
// })

const API = class Api {
  constructor () {
    var header = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'developToken': '000006',
      'tokenPassword': '1qaz2wsx'
    }
  }
  get (url, params, cb) {
    return Vue.http.get(url, {params: params}).then(function (res) {
      cb(res.body)
    }).catch(function(res){
      cb(res.body)
    })
  }
  post (url, params, cb) {
    // return Vue.http.post(url, {params: params}).then(function (res) {
    return Vue.http.post(url, params).then(function (res) {
      cb(res.body)
    }).catch(function(res){
      cb(res.body)
    })
  }
  jsonp (url, params) {
    return Vue.http.jsonp(url, {params: params}).then(function (res) {
      cb(res.body)
    }).catch(function(res){
      cb(res.body)
    })
  }
}

export default API
