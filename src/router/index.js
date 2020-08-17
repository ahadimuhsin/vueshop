import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/'
// import { nextTick } from 'vue/types/umd'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes :
  [ 
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path : '/categories',
        name : 'categories',
        component:() => import(/* webpackChunkName: "categories" */'../views/Categories.vue')
      },
      {
        path: '/books',
        name: 'books',
        component: () => import(/* webpackChunkName: "categories" */ '../views/Books.vue')
      },
      {
        path : '/category/:slug',
        name: 'category',
        component:() => import (/* webpackChunkName: "category" */ '../views/Category.vue')
      },
      {
        path : '/book/:slug',
        name: 'book',
        component:() => import (/* webpackChunkName: "book" */ '../views/Book.vue')
      },
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      },
      {
        path: '/checkout',
        name: 'checkout',
        component: () => import( /* Nama Alias checkout */ '../views/Checkout.vue'),
        meta: { auth: true } //mengatur sifatnya provate, agar hanya user yg sudah login yg boleh mengaksesnya
      }
  ]
})

//Navigation Guard : untuk mengecek routing yang private
//Jika routing private dan user belum login, tampilkan form login

router.beforeEach((to, from, next) => {
  // Jika routing ada meta auth-nya
  if(to.matched.some(record => record.meta.auth))
  {
    // jika user belum login atau guest
    if (store.getters['auth/guest']){
      //tampilkan pesan bahwa harus login dahulu
      store.dispatch('alert/set', {
        status: true,
        text : 'Mohon Login Dulu',
        color : 'error',
      })
      store.dispatch('setPrevUrl', to.path)
      //tampilkan form login
      store.dispatch('dialog/setComponent', 'login')
      store.dispatch('dialog/setStatus', true)
    }
    else {
      next()
    }
  }
  else{
    next()
  }
})

export default router
