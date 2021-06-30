export default{
    namespaced: true,
    //set default value
    state: {
        status: false,
        color: 'success', //warning, info, error
        text: ''
    },
    mutations: {
        set:(state, payload) => {
            state.status = payload.status
            state.text = payload.text
            state.color = payload.color
        },
    },
    actions: {
        set: ({commit}, payload) => {
            commit('set', payload)
        },
    },
    getters: {
        status  : state => state.status,
        color   : state => state.color,
        text    : state => state.text
    }
}