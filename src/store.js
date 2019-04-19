import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        authorisation: null,
    },
    mutations: {

    },
    actions: {

    },
    getters: {
        authorisation: state => {
            return state.authorisation
        }
    }
})
