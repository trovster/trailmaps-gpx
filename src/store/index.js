import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const Store = new Vuex.Store({
    state: {
        authorisation: {},
        authenticated: {},
        user: null,
    },
    getters: {
        authenticated(state) {
            return state.authenticated.access_token ? true : false
        },
        stravaCode(state) {
            return state.authorisation.code || ""
        },
        stravaAccessToken(state) {
            return state.authenticated.access_token || ""
        },
        user(state) {
            return state.user
        },
        activities(state) {
            return state.activities
        },
    },
    mutations: {
        initialiseStore(state) {
            if (localStorage.getItem("store")) {
                this.replaceState(
                    Object.assign(state, JSON.parse(localStorage.getItem("store")))
                )
            }
        },
        authorise(state, query) {
            state.authorisation = query
        },
        authenticate(state, data) {
            state.authenticated = data
        },
        user(state, user) {
            state.user = user
        },
        activities(state, activities) {
            state.activities = activities
        },
    },
    actions: {},
})

Store.subscribe((mutation, state) => {
    localStorage.setItem("store", JSON.stringify(state))
})

export default Store
