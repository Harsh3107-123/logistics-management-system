export default {
    template: `
    <div class="row">
        <div class="col-10 fs-2 border">
            <p>Fast Logistics</p>
        </div>

        <div class="col-2 border">
            <div class="mt-1" v-if="!loggedIn">
                <router-link to="/login" class="btn btn-primary my-2">
                    Login
                </router-link>
                <router-link to="/register" class="btn btn-warning my-2">
                    Register
                </router-link>
            </div>

            <div class="mt-1" v-else>
                <button
                    class="btn btn-danger"
                    @click="logout"
                >
                    Logout
                </button>
            </div>
        </div>
    </div>
    `,

    data() {
        return {
            loggedIn: !!localStorage.getItem("auth-token")
        }
    },

    methods: {
        logout() {
            localStorage.removeItem("auth-token")
            this.loggedIn = false
            this.$router.push("/login")
        }
    }
}
