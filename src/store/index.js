import Vue from 'vue'
import Vuex from 'vuex'
import cart from '@/store/cart' //import modul cart
import alert from '@/store/alert' //modul auth
import auth from '@/store/auth' //modul auth
import dialog from '@/store/dialog' //modul dialog
import region from '@/store/region' //modul region

Vue.use(Vuex)
//penerapan Vuex (State Management)
export default new Vuex.Store({
  state: {
    //data yang ingin ditransfer
    carts: [],
    prevUrl:  '',
  },
  mutations: {
    setPrevUrl: (state, value) => {
      state.prevUrl = value
    }
  },
  actions: {
    setPrevUrl: ({commit}, value) => {
      commit('setPrevUrl', value)
    }
  },
  //import modul di sini
  modules: {
    cart,
    alert,
    auth,
    dialog,
    region,
  },
  //untuk mendapatkan state carts
  getters: {
    prevUrl: state => state.prevUrl,
  }
})
