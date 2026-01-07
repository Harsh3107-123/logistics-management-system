export default{
    template :
    `
<div class="my-2">
  <h2 class="text-center">Create Transaction</h2>

  <div
    class="container mx-auto p-4"
    style="max-width: 600px; border: 1px solid #ccc; border-radius: 8px;"
  >

    <div class="mb-3">
      <label for="name" class="form-label">Transaction Name</label>
      <input type="text" class="form-control" id="name" v-model="transData.name">
    </div>

    <div class="mb-3">
      <label for="type" class="form-label">Transaction Type</label>
      <input type="text" class="form-control" id="type" v-model="transData.type">
    </div>

    <div class="d-flex">
      <div class="mx-2 mb-3 flex-fill">
        <label for="source" class="form-label">Source</label>
        <select class="form-select" v-model="transData.source">
          <option disabled value="">Open this select menu</option>
          <option>Mumbai</option>
          <option>Delhi</option>
          <option>Chennai</option>
          <option>Kolkata</option>
          <option>Pune</option>
        </select>
      </div>

      <div class="mx-2 mb-3 flex-fill">
        <label for="destination" class="form-label">Destination</label>
        <select class="form-select" v-model="transData.destination">
          <option disabled value="">Open this select menu</option>
          <option>Mumbai</option>
          <option>Delhi</option>
          <option>Chennai</option>
          <option>Kolkata</option>
          <option>Pune</option>
        </select>
      </div>
    </div>

    <div class="mb-3">
      <label for="description" class="form-label">Description</label>
      <textarea
        class="form-control"
        id="description"
        v-model="transData.description"
        rows="3"
      ></textarea>
    </div>

    <div class="mb-3 text-end">
      <button @click="updateTrans" class="btn btn-primary">
        Submit
      </button>
    </div>

  </div>
</div>

 `
,
data:function(){
    return {
        transData:{
            name:"",
            type:"",
            source:"",
            destination:"",
            description:""
        }
    }
},
methods:{
    updateTrans(){
        
    }
}
}
