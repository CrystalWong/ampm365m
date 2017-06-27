import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/main/Home'
import MenuBar from '@/components/main/MenuBar'
import Coupon from '@/components/promotions/Coupon'
import ReceiveCoupons from '@/components/promotions/ReceiveCoupons'
import ActivityEnd from '@/components/promotions/ActivityEnd'
import SpreadActive from '@/components/promotions/SpreadActive'
import Share from '@/components/promotions/Share'
import Receivesucc from '@/components/promotions/Receivesucc'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Home',
    components: {
      default: Home,
      menubar: MenuBar
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
    }
  },
  {
    path: '/spreadactive',
    name: 'spreadactive',
    components: {
      default: SpreadActive
    }
  },
  {
    path: '/share',
    name: 'share',
    components: {
      default: Share
    }
  },
  {
    path: '/receivesucc',
    name: 'receivesucc',
    components: {
      default: Receivesucc
    }
  }]
})
