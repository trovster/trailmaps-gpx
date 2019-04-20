<script>
import { mapState } from "vuex"

export default {
    name: "Login",
    mounted() {
    // https://stackoverflow.com/questions/52880434/problem-with-access-token-in-strava-api-v3-get-all-athlete-activities
    },
    computed: mapState({
        authorisation() {
            return this.$route.query
        },
    }),
}
</script>