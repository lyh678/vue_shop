import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Welcome from '@/components/home/welcome.vue'
import Users from '@/components/home/user/users.vue'
import Goods from '@/components/home/goods/goods.vue'
import Add from '@/components/home/goods/add.vue'
import Cate from '@/components/home/goods/cate.vue'
import Params from '@/components/home/goods/params.vue'
import Rights from '@/components/power/rights.vue'
import Roles from '@/components/power/roles.vue'


Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/welcome',
    children: [{
      path: '/welcome',
      component: Welcome
    },
    {
      path: '/users',
      component: Users
    },
    {
      path: '/goods',
      component: Goods 
    },{
      path: '/goods/add',
      component: Add
    },
    {
      path: '/rights',
      component: Rights
    },
    {
      path: '/roles',
      component: Roles
    },
    {
      path: '/params',
      component: Params
    },
    {
      path: '/categories',
      component: Cate
    },]
  }
]

const router = new VueRouter({
  routes
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  //to：将要访问的路径
  //from：代表从哪个路径跳转而来
  //next：是一个函数，表示放行
  //next()：放行  next('/login') 强制跳转

  if (to.path === '/login') return next()
  //获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
