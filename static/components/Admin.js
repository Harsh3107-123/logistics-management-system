export default {
  template: `
<div class="my-2">

    <h2>Welcome, {{ userData.name }}</h2>
    <h2>All Transactions</h2>

    <div class="row">

        <!-- LEFT SIDE (col-8) -->
        <div class="col-8">

            <!-- Requested -->
            <div>
                <h4>Requested</h4>
                <table class="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Package</th>
                            <th>Source</th>
                            <th>Dest</th>
                            <th>Created at</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="t in transaction">
                            <tr v-if="t.internal_status === 'requested'" :key="t.id">
                                <td>{{ t.id }}</td>
                                <td>{{ t.name }}</td>
                                <td>{{ t.source }}</td>
                                <td>{{ t.destination }}</td>
                                <td>{{ t.date.substring(0,11) }}</td>
                                <td>
                                    <button
                                        @click="review(t)"
                                        class="btn btn-info btn-sm"
                                    >
                                        Review
                                    </button>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>

            <!-- Pending -->
            <div>
                <h4>Pending</h4>
                <table class="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Package</th>
                            <th>Source</th>
                            <th>Dest</th>
                            <th>Created at</th>
                            <th>Amt</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="t in transaction">
                            <tr v-if="t.internal_status === 'pending'" :key="t.id">
                                <td>{{ t.id }}</td>
                                <td>{{ t.name }}</td>
                                <td>{{ t.source }}</td>
                                <td>{{ t.destination }}</td>
                                <td>{{ t.date.substring(0,11) }}</td>
                                <td>{{ t.amount }}</td>
                                <td>
                                    <button class="btn btn-danger">
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>

            <!-- Paid -->
            <div>
                <h4>Paid</h4>
                <table class="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Package</th>
                            <th>Source</th>
                            <th>Dest</th>
                            <th>Created at</th>
                            <th>Delivery Status</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="t in transaction">
                            <tr v-if="t.internal_status === 'paid'" :key="t.id">
                                <td>{{ t.id }}</td>
                                <td>{{ t.name }}</td>
                                <td>{{ t.source }}</td>
                                <td>{{ t.destination }}</td>
                                <td>{{ t.date.substring(0,11) }}</td>
                                <td>{{ t.delivery_status }}</td>
                                <td class="d-flex">
                                    <select
                                        class="form-select mx-2"
                                        style="width:60%;"
                                        v-model="d_status" 
                                    >
                                        <option selected>Open this select menu</option>
                                        <option value="in-process">In process</option>
                                        <option value="in-transit">In transit</option>
                                        <option value="dispatched">Dispatched</option>
                                        <option value="out-for-delivery">Out For Delivery</option>
                                        <option value="delivered">Delivered</option>
                                    </select>
                                    <button @click="()=>updateDelivery(t.id)"class="btn btn-primary mt-1">
                                        Submit
                                    </button>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>

        </div>

        <!-- RIGHT SIDE (col-4) -->
        <template v-if="reviewmode">
            <div class="col-4 border" style="height: 750px;">
                <div class="my-2">
                    <h2>Review Transaction</h2>

                    <div class="mb-3">
                        <p class="fs-3">Transaction Name</p>
                        <p>{{ t.name }}</p>
                    </div>

                    <div class="mb-3">
                        <p class="fs-3">Transaction Type</p>
                        <p>{{ t.type }}</p>
                    </div>

                    <div class="mb-3">
                        <p>{{ t.source }} to {{ t.destination }}</p>
                    </div>

                    <div class="mb-3 mx-auto" style="width: 60%">
                        <label class="form-label">Delivery Date</label>
                        <input
                            type="date"
                            class="form-control"
                            v-model="t.delivery"
                        >
                    </div>

                    <div class="mb-3 mx-auto" style="width:60%">
                        <label class="form-label">Amount</label>
                        <input
                            type="number"
                            class="form-control"
                            v-model="t.amount"
                        >
                    </div>

                    <div>
                        <button
                            @click="save(t.id)"
                            class="btn btn-primary"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </template>

        <template v-else>
            <div
                class="col-4 border d-flex align-items-center justify-content-center"
                style="height: 750px;"
            >
                <p class="text-muted fs-5">
                    Select a transaction to review
                </p>
            </div>
        </template>

    </div>
</div>
  `,

  data() {
    return {
      userData: {},          // ✅ fixed
      transaction: [],       // ✅ fixed
      reviewmode:false,
      d_status:"",
      t: {
        name: "package Dummy",
        type: "Fragile",
        source: "chennai",
        destination: "delhi",
        amount:"10000",
        delivery:"2025-03-03"
      }
    }
  },

  mounted() {
    this.loadUser()
    this.loadTrans()
  },

  methods: {
    loadUser() {
      fetch("/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authentication-Token": localStorage.getItem("auth_token")
        }
      })
        .then(res => res.json())
        .then(data => this.userData = data)
    },

    loadTrans() {
      fetch("/api/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authentication-Token": localStorage.getItem("auth_token")
        }
      })
        .then(res => res.json())
        .then(data => this.transaction = data)
    },
    review(t){
        this.reviewmode=true;
        this.t=t;
    },
    save(id){
       fetch(`/api/review/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authentication-Token": localStorage.getItem("auth_token")
        },
        body: JSON.stringify(this.t)
      })
      .then(res => res.json())
      .then(data=>{console.log(data),
        this.$router.go(0)
      }) 
    },
    updateDelivery(id){
        fetch(`/api/delivery/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authentication-Token": localStorage.getItem("auth_token")
        },
        body: JSON.stringify({delivery_status:this.d_status})
      })
      .then(res => res.json())
      .then(data=>{console.log(data),
        this.$router.go(0)
      }) 
    }
  }
}
