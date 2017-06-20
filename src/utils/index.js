const Util = class Util {
  constructor () {
    var header = {
      'Content-Type': 'application/json; charset=UTF-8',
      'apiVersion': '1.0',
      'platform': 'webApp'
    }
  }
  getUrlParam (url, name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var r = url.substr(1).match(reg)
    if (r != null) {
      return unescape(r[2])
    }
    return null
  }
}

export default Util
