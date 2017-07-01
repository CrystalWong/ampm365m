const Util = class Util {
  constructor () {
    var header = {
      'Content-Type': 'application/json; charset=UTF-8',
      'apiVersion': '1.0',
      'platform': 'webApp'
    }
  }
  getUrlParam (url, name) {
    var reg = new RegExp(name + '=([^&]*)(&|$)','i')
    var r = url.substr(1).match(reg)
    if (r != null) {
      return unescape(r[1])
    }
    return null
  }
  checkPhoneNum (num) {
    var reg = new RegExp('^((13[0-9])|(17[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0-9]))\\d{8}$')
    var r = num.match(reg)
    return r
  }
}

export default Util
