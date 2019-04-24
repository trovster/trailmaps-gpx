import { mapMutations } from "vuex"

export default {
    methods: {
        ...mapMutations([
            "authenticate",
            "user",
        ]),
    },
    logout() {
        this.user(null)
        this.authenticate({})
        this.$router.push("/")
    },
}