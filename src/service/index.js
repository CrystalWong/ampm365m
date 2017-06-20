import Api from '@/service/api'
let api = new Api()
export default {
  checkOffline (params, cb) {
    return api.get('/org/coupon/coupon/bind/offline', params, cb)
  },
  checkRegister (params, cb) {
    // return api.post('org/business/CM100111.do', params, cb)
    return api.get('/org/coupon/user/checkandregister', params, cb)
  },
  getCaptcha (params, cb) {
    return api.get('/org/coupon/coupon/bind/offline', params, cb)
  },
  submitCaptcha (params, cb) {
    return api.get(gatewayTicket + '/v1/vcode/check', params, cb)
  }
}
