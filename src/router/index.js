import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/main/Home'
import Menubar from '@/components/main/Menubar'
import Coupon from '@/components/promotions/Coupon'
import Luckydraw from '@/components/promotions/Luckydraw'
import Receivecoupons from '@/components/promotions/Receivecoupons'
import Spreadactive from '@/components/promotions/Spreadactive'

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
    path: '/luckydraw',
    name: 'luckydraw',
    components: {
      default: '',
      main: Luckydraw,
      menubar: Menubar
    }
  },
  {
    path: '/Receivecoupons',
    name: 'Receivecoupons',
    components: {
      default: Receivecoupons
      // main: Receivecoupons,
      // menubar: Menubar
    }
  },
  {
    path: '/Spreadactive',
    name: 'Spreadactive',
    components: {
      default: Spreadactive
      // main: Receivecoupons,
      // menubar: Menubar
    }
  }]
})
