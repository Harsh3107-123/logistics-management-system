export default {
  template: `
<div class="my-2">
    <h2>Welcome, {{ userData.name }}</h2>

    <div class="row">
        <!-- Left column -->
            <h2>Your Transaction</h2>

            <div v-for="t in transaction" :key="t.id" class="card mt-3 mb-3">
                <div class="card-body">
                    <h5 class="card-title">
                        {{ t.name }}
                        <span class="badge text-white bg-secondary">
                            {{ t.type }}
                        </span>
                    </h5>

                    <p class="card-text">
                        Created at: {{ t.date }}
                    </p>

                    <!-- Paid -->
                    <p v-if="t.internal_status === 'paid'" class="card-text">
                        Delivery: {{ t.delivery }}
                    </p>

                    <p class="card-text">
                        About: {{ t.description }}
                    </p>

                    <p class="card-text">
                        From {{ t.source }} to {{ t.destination }}
                    </p>

                    <!-- Pending -->
                    <p v-if="t.internal_status === 'requested'" class="card-text">
                        <router-link :to=" {name : 'update' , params:{id : t.id} } " class="btn btn-warning me-2">Update</router-link>
                        <button class="btn btn-danger">Delete</button>
                    </p>

                    <!-- Requested -->
                    <p v-if="t.internal_status === 'pending'" class="card-text">
                        Amount: {{ t.amount }}
                        <button class="btn btn-success ms-2">Pay</button>
                    </p>

                </div>
            </div>
    </div>
</div>
  `,

  data() {
    return {
      userData: "",
      transaction:null,
      transData:{
        name:"",
        type:"",
        source:"",
        destination:"",
        description:""
      }
    }
  },

  mounted() {
    this.loadUser()
    this.loadTrans()
  },
  methods:{
    loadUser(){
          fetch("/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authentication-Token": localStorage.getItem("auth_token")
      }
    })
      .then(response => response.json())
      .then(data => this.userData = data)
    },
    loadTrans(){
            fetch("/api/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authentication-Token": localStorage.getItem("auth_token")
      }
    })
    .then(response => response.json())
    .then(data => this.transaction=data)
    }

  }
}
