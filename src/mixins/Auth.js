import { mapGetters, mapMutations } from "vuex"

export default {
    methods: {
        ...mapMutations({
            "authorise": "authorise",
            "authenticate": "authenticate",
            "setUser": "user",
        }),
        login(callback) {
            this.authorise(this.$route.query)
    
            this.api.authenticate({
                code: this.code,
            }, (error, body) => {
                this.setUser(body.athlete)
                this.authenticate({
                    access_token: body.access_token,
                    refresh_token: body.refresh_token,
                    expires_at: body.expires_at,
                    expires_in: body.expires_in,
                })
                callback.call()
            })
        },
        logout(callback) {
            this.setUser(null)
            this.authenticate({})
            callback.call()
        },
    },
    computed: {
        ...mapGetters({
            code: "stravaCode",
        }),
    },
    data() {
        return {
            api: new require("strava")({
                client_id: process.env.VUE_APP_STRAVA_CLIENT_ID,
                client_secret: process.env.VUE_APP_STRAVA_CLIENT_SECRET,
            }),
        }
    },
}