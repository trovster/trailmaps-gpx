<template>
    <div class="page">
        <h2>Art prints for the adventurous</h2>
        <p v-if="!this.authenticated">Please login with Strava to create your own personalised art print.</p>
        <p v-if="this.authenticated">Select your activity below to create your own personalised art print.</p>

        <div class="user" v-if="this.authenticated && this.user">
            <a :href="`https://www.strava.com/athletes/${this.user.id}`" target="_blank" class="user--profile">
                <img :src="this.user.profile" class="avatar" :title="this.user.username" :alt="this.user.username" />
            </a>
            <p><strong>{{ this.user.firstname }} {{ this.user.lastname }}</strong></p>
            <p>{{ this.user.city }}</p>
            <p>{{ this.user.country }}</p>
            <router-link :to="{ name: 'logout'}" class="logout">Logout</router-link>
        </div>

        <div class="activities" v-if="this.activities.length > 0">
            <ul>
                <li v-for="activity in this.activities" :key="activity.id" class="activity">
                    <router-link :to="{ name: 'map', params: { id: activity.id }}">
                        <span class="activity--name">{{ activity.name }}</span>
                        <time class="activity--start">{{ date(activity.start_date) }}</time>
                        <span class="activity--distance">{{ distance(activity.distance) }}</span>
                    </router-link>
                </li>
            </ul>
        </div>

        <a :href="login()" v-if="!this.authenticated" class="button button--strava">Login with Strava</a>
        <router-link v-if="!this.authenticated" :to="{ name: 'map-example'}" class="button button--view">View example map</router-link>

    </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
    name: "Homepage",
    computed: {
        ...mapGetters({
            authenticated: "authenticated",
            accessToken: "stravaAccessToken",
            user: "user",
        }),
    },
    data() {
        return {
            api: new require("strava")({
                client_id: process.env.VUE_APP_STRAVA_CLIENT_ID,
                client_secret: process.env.VUE_APP_STRAVA_CLIENT_SECRET,
            }),
            activities: [],
        }
    },
    mounted() {
        if (this.authenticated) {
            this.api.config.access_token = this.accessToken

            this.api.athlete.activities.get({
                per_page: 10,
            }, (error, activities) => {
                this.activities = activities
            })
        }
    },
    methods: {
        login() {
            const params = {
                "client_id": this.api.config.client_id,
                "redirect_uri": `${window.location.href}login`,
                "response_type": "code",
                "approval_prompt": "auto",
                "scope": "read,activity:read",
            }

            return this.api.config.oauth_base + "?" + Object.keys(params).map(key => key + "=" + params[key]).join("&")
        },
        date(date) {
            return new Date(date).toDateString()
        },
        distance(distance) {
            return `${(distance / 1000).toFixed(2)} miles`
        },
    },
}
</script>

<style lang="scss">
.user {
    position: absolute;
    top: 15px;
    right: 55px;
    padding: 20px 0 0 125px;
    z-index: 101;
    text-align: left;

    p {
        margin: 0 0 5px;
    }
    strong {
        font-weight: 700;
    }
    .user--profile {
        display: block;
    }
    .avatar {
        position: absolute;
        top: 0;
        left: 0;
        max-width: 110px;
        border-radius: 100%;
    }
}
.logout {
    font-size: 0.8em;
    color: #aaa;
    text-transform: none;
    text-decoration: none;

    &:hover,
    &:focus,
    &:active {
        color: #777;
        text-decoration: underline;
    }
}
.activities {
    margin: 20px auto; padding: 0;
    border-bottom: 1px solid #e8e9eb;
}
.activity {
    position: relative;
    overflow: hidden;
    clear: both;
    border-top: 1px solid #e8e9eb;
    text-align: left;

    a {
        position: relative;
        overflow: hidden;
        clear: both;
        display: block;
        padding: 15px 0 10px;
        color: #000;
        text-decoration: none;

        &:hover,
        &:focus,
        &:active {
            .activity--name {
                font-weight: 700;
            }
        }
    }
    &--start {
        float: right;
    }
    &--distance {
        color: #ccc;

        &:before {
            content: "(";
            margin-left: 10px;
        }
        &:after {
            content: ")";
        }
    }
}
</style>
