import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/pages/index'
import DemoModal from '@/pages/demos/modal'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: Index
  }, {
    path: '/demo',
    component: Index
  }, {
    path: '/demo/modal',
    component: DemoModal
  }]
})
