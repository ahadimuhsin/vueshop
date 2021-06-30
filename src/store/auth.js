export default{
    namespaced: true,
    state:{
        user: {},
        token: ''
    },

    mutations: {
        set: (state, payload) => {
            state.user = payload
        },
        setToken: (state, payload) => {
            state.token = payload
        }
    },

    actions: {
        set: ({commit}, payload) => {
            commit('set', payload)
        },
        setToken:({commit}, payload) => {
            commit('setToken', payload)
        }
    },

    getters: {
        user: state => state.user,
        token: state => state.token,
        guest: state => Object.keys(state.user).length === 0
    }
}