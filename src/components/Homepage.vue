<template>
    <div class="page">
        <h2>Art prints for the adventurous</h2>
        <p>Please login with Strava to create your own personalised art print.</p>

        <hr />
        <div class="user" v-if="this.user">
            <img :src="this.user.profile" class="avatar" />
            <h3>Username: {{ this.user.username }}</h3>
            <p>Name: {{ this.user.firstname }} {{ this.user.lastname }}</p>
            <p>City: {{ this.user.city }}</p>
            <p>Country: {{ this.user.country }}</p>

            <div class="activities" v-if="this.activities.length > 0">
                <h4>Activities</h4>
                <ul>
                    <li v-for="activity in this.activities" :key="activity.id">
                        <a :href="activity.id">{{ activity.name}}</a>
                        distance
                    </li>
                </ul>
            </div>
        </div>

        <a :href="login()" v-if="!this.user" class="button">Login with Strava</a>
    </div>
</template>

<script>
import { mapGetters } from "vuex"
import stravaConfig from "@/config/strava"

export default {
    name: "Homepage",
    data() {
        return {
            api: new require("strava")({
                client_id: stravaConfig.client_id,
                client_secret: stravaConfig.client_secret,
                redirect_uri: window.location.href,
                access_token: stravaConfig.access_token, // code?
            }),
            user: null,
            activities: [],
        };
    },
    mounted() {
        // this.api.athlete.get((error, user) => this.user = user)

        // this.api.athlete.activities.get({
        //     per_page: 5
        // }, (error, activities) => {
        //     this.activities = activities
        //     console.log(activities)
        // })
    },
    computed: {
        ...mapGetters([
            'authorisation'
        ]),
    },
    methods: {
        login() {
            const params = {
                "client_id": this.api.config.client_id,
                "redirect_uri": window.location.href + "/login",
                "response_type": "code",
                "approval_prompt": "auto",
                "scope": "read,activity:read",
            }
            console.log(this.authorisation)

            return this.api.config.oauth_base + '?' + Object.keys(params).map(key => key + '=' + params[key]).join('&')
        }
    }
}
</script>

<style type="sass" scoped>
.avatar {
    margin-bottom: 15px;
    border-radius: 100%;
}
</style>
