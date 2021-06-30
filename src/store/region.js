export default{
    namespaced: true,
    state: {
        cities: [],
        provinces: []
    },
    mutations: {
        setProvinces: (state, value) => {
            state.provinces = value
        },
        setCities: (state, value) => {
            state.cities = value
        }
    },
    actions: {
        setProvinces: ({commit}, value) => {
            commit('setProvinces', value)
        },
        setCities: ({commit}, value) => {
            commit('setCities', value)
        }
    },
    getters: {
        provinces: state => state.provinces,
        cities: state => state.cities
    }
}