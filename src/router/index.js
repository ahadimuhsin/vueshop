import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
    path: '/categories',
    name: 'Categories',
    component: () => import(/* webpackChunkName: "categories" */
      '../views/Categories.vue')
  },
  {
    path: '/books',
    name: 'Books',
    component: () => import(/* */ '../views/Books.vue')
  },
  {
    path: '/category/:slug',
    name: 'Category',
    component: () => import(/* */ '../views/Category.vue')
  },
  {
    path: '/book/:slug',
    name: 'Book',
    component: () => import(/* */ '../views/Book.vue')
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import( /* */ '../views/Checkout.vue'),
    meta: { auth: true }
  },
  {
    path: '/payment',
    name: 'payment',
    component: () => import(/* */ '../views/Payment.vue'),
    meta: { auth: true }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* */ '../views/Profile.vue'),
    meta: { auth: true }
  },
  {
    path: '/my-order',
    name: 'my-order',
    component: () => import(/* */ '../views/MyOrder.vue'),
    meta: { auth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//Navigation Guard : untuk mengecek routing yang private
//Jika routing private dan user belum login, tampilkan form login

router.beforeEach((to, from, next) => {
  //jika routing ada meta-authnya, maka
  if (to.matched.some(record => record.meta.auth)) {
    //jika user adalah guest
    if (store.getters['auth/guest']) {
      //tampilkan pesan bahwa harus login dulu
      store.dispatch('alert/set', {
        status: true,
        text: 'Anda belum login',
        color: 'error'
      })
      //kembali ke url sebelumnya
      store.dispatch('setPrevUrl', to.path)
      //tampilkan form login
      store.dispatch('dialog/setComponent', 'login')
      store.dispatch('dialog/setStatus', true)

    }
    else {
      next()
    }
  }
  else {
    next()
  }
})

export default router
