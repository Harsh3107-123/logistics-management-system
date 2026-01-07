export default {
  template: `
<div class="my-2">
    <h2>Welcome, {{ userData.name }}</h2>

    <div class="row">
        <!-- Left column -->
        <div class="col-8 border" style="height: 750px; overflow-y:scroll;">
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

        <!-- Right column -->
        <div class="col-4 border" style="height: 750px;">
            <div class="my-2">
                <h2> Create Transaction </h2>

                <div class="mb-3">
                    <label for="name" class="form-label">Transaction Name</label>
                    <input type="text" class="form-control" id="name" v-model="transData.name">
                </div>

                <div class="mb-3">
                    <label for="type" class="form-label">Transaction Type</label>
                    <input type="text" class="form-control" id="type" v-model="transData.type">
                </div>

                <div class="d-flex">
                    <div class=" mx-2 mb-3">
                        <label for="source" class="form-label">Source</label>
                        <select class="form-select" aria-label="Default select example" v-model="transData.source">
                            <option selected>Open this select menu</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Chennai">Chennai</option>
                            <option value="Kolkata">Kolkata</option>
                            <option value="Pune">Pune</option>
                        </select>
                    </div>

                    <div class="mx-2 mb-3">
                        <label for="destination" class="form-label">Destination</label>
                        <select class="form-select" aria-label="Default select example" v-model="transData.destination">
                            <option selected>Open this select menu</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Chennai">Chennai</option>
                            <option value="Kolkata">Kolkata</option>
                            <option value="Pune">Pune</option>
                        </select>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="description" class="form-label">Example textarea</label>
                    <textarea class="form-control" id="description" v-model="transData.description" rows="3"></textarea>
                </div>

                <div class="mb-3 text-end">
                    <button @click="createTrans" class="btn btn-primary">Submit</button>
                </div>
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
    createTrans(){
      fetch("/api/create",{
        method:"POST",
        headers:{
        "Content-Type": "application/json",
        "Authentication-Token": localStorage.getItem("auth_token")
      },
      body:JSON.stringify(this.transData)
      })
      .then(response=>response.json())
      .then(data =>{
        this.loadTrans()
      })
    },
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
