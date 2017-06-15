// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
// import 'muse-ui/dist/theme-light.css'
import App from '@/components/App'
import router from '@/router'
import store from '@/store'

Vue.use(VueResource)
Vue.use(Vuex)
Vue.use(MuseUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created () {
    console.log('创建成功')
  }
})
