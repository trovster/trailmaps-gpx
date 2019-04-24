import Vue from "vue"
import Router from "vue-router"

import Homepage from "@/components/Homepage"
import Map from "@/components/Map"

Vue.use(Router)

export default new Router({
    base: process.env.BASE_URL,
    mode: "history",
    routes: [
        {
            path: "/map-example",
            name: "map-example",
            component: Map,
        },
        {
            path: "/map/:id",
            name: "map",
            component: Map,
            // beforeEnter: (to, from, next) => {
            //     // check that the authorisation is set
            // },
        },
        {
            path: "/",
            name: "homepage",
            component: Homepage,
        },
    ],
})
