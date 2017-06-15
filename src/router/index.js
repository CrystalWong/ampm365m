import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/main/Home'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Home',
    components: {
      default: Home
        // menubar: Menubar
    }
  }]
})
