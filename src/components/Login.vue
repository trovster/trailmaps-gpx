<script>
import { mapGetters, mapMutations } from "vuex"

export default {
    name: "Login",
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
                client_id: process.env.VUE_APP_STRAVA_CLIENT_ID,
                client_secret: process.env.VUE_APP_STRAVA_CLIENT_SECRET,
            }),
        }
    },
    mounted() {
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
</script>