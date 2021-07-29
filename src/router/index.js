import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/home'
import detail from '../views/detail/detail'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path:'/detail',
    component:detail
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
