import Api from '@/service/api'
let api = new Api()
export default {
  toLogin (params, cb) {
    return api.get('/user-api/v1/unionUseLogin/', params, cb)
  },
  getCaptcha (params, cb) {
    return api.get(gatewayTicket + '/v1/vcode/get/', params, cb)
  },
  submitCaptcha (params, cb) {
    return api.get(gatewayTicket + '/v1/vcode/check/', params, cb)
  }
}
