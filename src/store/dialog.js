export default{
    namespaced: true,
    state: {
        status      : false,
        component   : 'search',
    },
    mutations: {
        setStatus: (state, status) => { //mengatur status dialog
            state.status = status
        },
        setComponent: (state, component) => { //mengeset component yang akan ditampilkan pada dialog
            state.component = component
        },
    },
    actions: {
        setStatus: ({commit}, status)=>{
            commit('setStatus', status)
        },
        setComponent: ({commit}, component)=>{
            commit('setComponent', component)
            commit('setStatus', true)
        },
    },
    getters: {
        status : state => state.status,
        component : state => state.component,
    }
}