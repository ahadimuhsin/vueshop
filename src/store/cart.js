//memecah modul state menjadi modul tersendiri
//dalam hal ini, modul cart
export default{
    namespaced: true,

    state: {
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
        },
        //update carts
        set: (state, payload) => {
          state.carts = payload
        },
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
            //menghapus cart pada item tertentu
            remove: ({state, commit}, payload) => {
              let cartItem = state.carts.find(item => item.id_book === payload.id_book)
              /*
              Jika action ini diklik, jika di cartItem ada isinya, kurangi 1 isinya, kemudian
              update nilai terbaru cart tersebut
              */
              if (cartItem){
                cartItem.quantity--
                commit('update', cartItem)
              }
            },
            //batch update carts
            set: ({commit}, payload) => {
              commit('set', payload)
            }
        },
        modules: {
        },
        //untuk mendapatkan state carts
        getters: {
            carts: state => state.carts,
            count: (state) => { //mengembalikan panjang array dari state carts
              return state.carts.length
            },
            //menghitung total harga
            totalPrice: (state) => {
              /*
              Menghitung total harga dengan mengalikan 
              harga per item dikali jumlah quantity
              di dalam cart
              */
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