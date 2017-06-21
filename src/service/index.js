import Api from '@/service/api'
let api = new Api()
let hrefStr = window.location.href
var urlPrefix =  hrefStr.indexOf('test') > 0 ? '/test' : ''
export default {
  checkOffline (params, cb) {
    return api.get(urlPrefix + '/org/coupon/coupon/bind/offline', params, cb)
  },
  checkRegister (params, cb) {
    return api.get(urlPrefix + '/org/coupon/user/checkandregister', params, cb)
  },
  getCaptcha (params, cb) {
    return api.get('/org/coupon/coupon/bind/offline', params, cb)
  },
  submitCaptcha (params, cb) {
    return api.get(gatewayTicket + '/v1/vcode/check', params, cb)
  }
}
