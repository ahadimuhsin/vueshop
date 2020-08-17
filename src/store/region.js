// Menyimpan data provinsi dan kota dari API untuk digunakan
//pada aplikasi Vue

export default{
    namespaced: true,
    // Tempat menyimpan datanya
    state: {
        provinces: [],
        cities: [],
    },

    // Perubahan datanya
    mutations: {
        setProvinces: (state, value) => {
            state.provinces = value;
        },
        setCities: (state, value) => {
            state.cities = value;
        },
    },

    //commit mutations
    actions: {
        setProvinces: ({commit}, value) => {
            commit('setProvinces', value)
        },

        setCities: ({commit}, value) => {
            commit('setCities', value)
        },
    },

    //dapatkan datanya
    getters: {
        provinces: state => state.provinces,
        cities: state =>state.cities,
    }
}