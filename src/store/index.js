import Vue from 'vue'
import Vuex from 'vuex'
import cart from '@/store/cart' //import modul cart
import alert from '@/store/alert' //modul auth
import auth from '@/store/auth' //modul auth
import dialog from '@/store/dialog' //modul dialog

Vue.use(Vuex)
//penerapan Vuex (State Management)
export default new Vuex.Store({
  state: {
    //data yang ingin ditransfer
    carts: [],
  },
  mutations: {
    
    
  },
  actions: {
    
  },
  //import modul di sini
  modules: {
    cart,
    alert,
    auth,
    dialog,
  },
  //untuk mendapatkan state carts
  getters: {
    
  }
})
