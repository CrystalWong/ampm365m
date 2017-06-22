import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/main/Home'
import Menubar from '@/components/main/Menubar'
import Coupon from '@/components/promotions/Coupon'
import ReceiveCoupons from '@/components/promotions/ReceiveCoupons'
import ActivityEnd from '@/components/promotions/ActivityEnd'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Home',
    components: {
      default: Home,
      menubar: Menubar
    }
  },
  {
    path: '/coupon',
    name: 'coupon',
    components: {
      default: Coupon
      // main: Coupon,
      // menubar: Menubar
    }
  },
  {
    path: '/activityend',
    name: 'activityend',
    components: {
      default: ActivityEnd
    }
  },
  {
    path: '/receivecoupons',
    name: 'receivecoupons',
    components: {
      default: ReceiveCoupons
      // main: Receivecoupons,
      // menubar: Menubar
    }
  }]
})
