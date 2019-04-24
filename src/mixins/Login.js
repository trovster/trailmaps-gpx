import { mapGetters, mapMutations } from "vuex"
import stravaConfig from "@/config/strava"

export default {
    methods: {
        ...mapMutations([
            "authorise",
            "authenticate",
            "user",
        ]),
    },
    computed: {
        ...mapGetters({
            code: "stravaCode",
        }),
    },
    data() {
        return {
            api: new require("strava")({
                client_id: stravaConfig.client_id,
                client_secret: stravaConfig.client_secret,
            }),
        }
    },
    login() {
        this.authorise(this.$route.query)

        this.api.authenticate({
            code: this.code,
        }, (error, body) => {
            this.user(body.athlete)
            this.authenticate({
                access_token: body.access_token,
                refresh_token: body.refresh_token,
                expires_at: body.expires_at,
                expires_in: body.expires_in,
            })
            this.$router.push("/")
        })
    },
}