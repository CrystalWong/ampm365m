import Api from '@/service/api'
let api = new Api()
let hrefStr = window.location.href
var urlPrefix =  hrefStr.indexOf('test') > 0 ? '/test' : ''
export default {
  checkRegister (params, cb) {
    return api.get(urlPrefix + '/org/coupon/user/checkandregister', params, cb)
  },
  getCaptcha (params, cb) {
    return api.get(urlPrefix + '/org/coupon/vacode/send', params, cb)
  }
}
