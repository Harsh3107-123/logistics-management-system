export default {
  template: `
    <div class="row">
      <div class="col" style="height: 750px;">
        <div class="border mx-auto mt-5" style="height: 400px; width:300px;">
          <h2 class="text-center">Register Form</h2>

          <div>
            <label for="email">Enter your Email</label>
            <input type="email" id="email" v-model="formData.email">
          </div>

          <div>
            <label for="pass">Enter your Password</label>
            <input type="password" id="pass" v-model="formData.password">
          </div>

          <div>
            <label for="username">Enter your Username</label>
            <input type="text" id="username" v-model="formData.username">
          </div>

          <div>
            <button type="button" class="btn btn-primary" @click="registerUser">
              Register
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
        password: "",
        username:""
      }
    }
  },

  methods: {
    registerUser: function () {
      fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.formData)
      })
        .then(response => response.json())
        .then(data => {
            alert(data.message)
          this.$router.push("/login")
        })
        .catch(err => {
          console.error("Register error:", err)
        })
    }
  }
}
