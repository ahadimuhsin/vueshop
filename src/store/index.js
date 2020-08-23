import Vue from 'vue'
import Vuex from 'vuex'
import cart from '@/store/cart' //import modul cart
import alert from '@/store/alert' //modul auth
import auth from '@/store/auth' //modul auth
import dialog from '@/store/dialog' //modul dialog
import region from '@/store/region' //modul region
import VuexPersist from 'vuex-persist' //untuk menyimpan state

const vuexPersist = new VuexPersist({
  key: 'my-app',
  storage: localStorage
});

Vue.use(Vuex)
//penerapan Vuex (State Management)
export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
  state: {
    //data yang ingin ditransfer
    carts: [],
    prevUrl:  '',
    payment: [],
  },
  mutations: {
    setPrevUrl: (state, value) => {
      state.prevUrl = value
    },
    setPayment: (state, value) => {
      state.payment = value
    }
  },
  actions: {
    setPrevUrl: ({commit}, value) => {
      commit('setPrevUrl', value)
    },
    setPayment: ({commit}, value) => {
      commit('setPayment', value)
    },
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
    payment: state => state.payment,
  }
})
