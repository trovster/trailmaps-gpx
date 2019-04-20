<script>
import { mapMutations } from "vuex"

export default {
    name: "Logout",
    methods: {
        ...mapMutations([
            "authenticate",
            "user",
        ]),
    },
    mounted() {
        this.user(null)
        this.authenticate({})
        this.$router.push("/")
    },
}
</script>