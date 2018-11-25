import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        default: Home,
        props: {
          isLogin: Boolean,
          isAdmin: Boolean
        }
      },
      // props: ['isLogin']
    },
    {
      path: '/clientes',
      name: 'clientes',
      component: () => import(/* webpackChunkName: "clientes" */ './views/Clientes.vue')
    },
    {
      path: '/lista',
      name: 'lista',
      component: () => import(/* webpackChunkName: "lista" */ './views/Lista.vue')
    },
    {
      path: '/reportes',
      name: 'reportes',
      component: () => import(/* webpackChunkName: "reportes" */'./views/Reportes.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
