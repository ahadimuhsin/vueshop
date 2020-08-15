//untuk memproses login
//menyimpan api token dari endpoint
export default{
    namespaced: true,
    state: { //berisi data user
        user: {},
    },

    mutations: { 
        set: (state, payload) => {
            state.user = payload
        },
    },
    actions: { //mengatur data user yang login pada state user
        set: ({commit}, payload) => {
            commit('set', payload)
        },
    },
    getters: { //mendapatkan data user dan guets pada state, dan
        //mengecek apakah sudah login atau belum
        user : state => state.user,
        guest: state => Object.keys(state.user).length === 0,
    }
}