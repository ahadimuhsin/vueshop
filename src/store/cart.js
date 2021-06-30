export default{
    namespaced: true,
    state: {
        carts: [],
      },
      mutations: {
        //menambah pesanan buku
        insert: (state, payload) => {
          state.carts.push({ //push untuk menambah data ke dalam array
            id: payload.id,
            title: payload.title,
            cover: payload.cover,
            price: payload.price,
            weight: payload.weight,
            quantity: 1
          })
        },
        //mengubah pesanan buku
        update: (state, payload) => {
          //mendeteksi payload ada di index ke berapa
          let idx = state.carts.indexOf(payload);
          state.carts.splice(idx, 1,{ //splice untuk menghapus data pada array
            id: payload.id,
            title: payload.title,
            cover: payload.cover,
            price: payload.price,
            weight: payload.weight,
            quantity: payload.quantity
          });
          //hapus item cars jika quantitynya nol
          if(payload.quantity <= 0){
            state.carts.splice(idx,1)
          }
        },
        //batch update carts
        set: (state, payload) => {
          state.carts = payload
        }
      },
      actions: {
        add: ({state, commit}, payload) => {
          //mendeteksi apakah data yang diinput ada pada carts
          let cartItem = state.carts
          .find(item => item.id === payload.id)
          //jika tidak ada, mutation insert dijalankan
          if(!cartItem){
            commit('insert', payload)
          }
          //jika ada, mutation update yang dijalankan
          else{
            cartItem.quantity++
            commit('update', cartItem)
          }
        },
        //menghapus cart pada item tertentu
        remove: ({state, commit}, payload) => {
          let cartItem = state.carts
          .find(item => item.id === payload.id)
          if(cartItem){
            cartItem.quantity--
            commit('update', cartItem)
          }
        },
        //bacth update carts
        set: ({commit}, payload) => {
          commit('set', payload)
        }
      },
      modules: {
      },
      getters: {
        carts: state => state.carts,
        //untuk simpan jumlah di keranjang,
        //mengembalikan panhang array pada state carts
        count: (state) => {
          return state.carts.length
        },
        //menghitung total harga
        totalPrice: (state) => {
          let total = 0
          state.carts.forEach(function(cart){
            total += cart.price * cart.quantity
          })
          return total
        },
        //total jumlah barang
        totalQuantity: (state) => {
          let total = 0
          state.carts.forEach(function(cart){
            total += cart.quantity
          })
          return total
        },
        //total berat barang
        totalWeight: (state) => {
          let total = 0
          state.carts.forEach(function(cart){
            total += cart.weight
          })
          return total
        },
      }
}