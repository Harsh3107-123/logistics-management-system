
export default {
  template: `
    <div class="row">
      <div class="col" style="height: 750px;">
        <div class="border mx-auto mt-5" style="height: 400px; width:300px;">
          <h2 class="text-center">Login Form</h2>

          <div>
            <label for="email">Enter your Email</label>
            <input type="email" id="email" v-model="formData.email">
          </div>

          <div>
            <label for="pass">Enter your Password</label>
            <input type="password" id="pass" v-model="formData.password">
          </div>

          <div>
            <button type="button" class="btn btn-primary" @click="loginUser">
              Login
            </button>
          </div>

        </div>
      </div>
    </div>
  `,

  data: function () {
    return {
      formData: {
        email: "",
        password: ""
      }
    }
  },

  methods: {
    loginUser: function () {
      fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.formData)
      })
        .then(response => response.json())
        .then(data => {
          localStorage.setItem("auth_token", data["auth-token"])
          localStorage.setItem("id", data.id)
          this.$router.push("/dashboard")
        })
        .catch(err => {
          console.error("Login error:", err)
        })
    }
  }
}


// remember that when preparing and vue app data must be an object while when creating a Component data must be function that is it should return some value