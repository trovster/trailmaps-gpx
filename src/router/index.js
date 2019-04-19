import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/Homepage'
import Map from '@/components/Map'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'homepage',
            component: Homepage,
        },
        {
            path: '/map',
            name: 'map',
            component: Map,
        },
    ],
})
