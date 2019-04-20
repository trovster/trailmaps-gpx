import Vue from "vue"
import Router from "vue-router"

import Homepage from "@/components/Homepage"
import Login from "@/components/Login"
import Map from "@/components/Map"

Vue.use(Router)

export default new Router({
    base: process.env.BASE_URL,
    mode: "history",
    routes: [
        {
            path: "/",
            name: "homepage",
            component: Homepage,
        },
        {
            path: "/map",
            name: "map",
            component: Map,
            // beforeEnter: (to, from, next) => {
            //     // check that the authorisation is set
            // },
        },
        {
            path: "login",
            name: "login",
            component: Login,
        },
    ],
})
