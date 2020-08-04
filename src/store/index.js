import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//penerapan Vuex (State Management)
export default new Vuex.Store({
  state: {
    //data yang ingin ditransfer
    carts: [],
  },
  mutations: {
    /*
    Operasi pada carts:
    1. Insert (menambah ke keranjang belanja, tiap penambahan + 1)
    2. Update (perubahan jumlah di keranjang belanja)
    */
    insert: (state,payload) => {
      //push -> menambah data ke dalam array
      state.carts.push({
        id_book: payload.id_book,
        title: payload.title,
        cover: payload.cover,
        price: payload.price,
        weight: payload.weight,
        quantity: 1
      })
    },
    update: (state, payload) => {
      //mendeteksi payload ada di index ke berapa
      let idx = state.carts.indexOf(payload);
      //splice -> menghapus/mengupdate data pada array
      state.carts.splice(idx,1, {
        id_book: payload.id_book,
        title: payload.title,
        cover: payload.cover,
        price : payload.price,
        weight: payload.weight,
        quantity : payload.quantity
      });
      //menghapus item carts jika quantitynya nol
      if (payload.quantity <= 0){
        state.carts.splice(idx, 1)
      }
    }
  },
  //agar component dapat mengakses mutation, buat method pada
  //actions untuk men-commit mutation
  actions: {
    add: ({state, commit}, payload) => {
      //mendeteksi apakah data yang diinput ada pada carts
      //sesuaikan item.x dengan id pada database
      let cartItem = state.carts.find(item => item.id_book === payload.id_book)

      //kalo gak ada, mutation insert dijalankan
      if (!cartItem){
        commit('insert', payload)
      }
      //kalo ada, mutation update yg dijalankan
      else {
        cartItem.quantity++
        commit('update', cartItem)
      }
    },
  },
  modules: {
  },
  //untuk mendapatkan state carts
  getters: {
    carts: state => state.carts
  }
})
