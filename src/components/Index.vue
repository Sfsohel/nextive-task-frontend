<template>
  <div class="index">
     <!-- Button trigger modal -->
      <div v-if="token == null">
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
          Login
        </button>
        &nbsp;
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenterRegister">
          Register
        </button>
      </div>
      <div v-else>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenterAddData">
          Add Data
        </button>
        &nbsp;
        <button type="button" class="btn btn-primary" @click="logout">
          Logout
        </button>
      </div>
      <br/><br/>
      <!-- Modal -->
      <div>
          <Login />
      </div>
      <div>
          <Register />
      </div>
      <div>
        <AddData/>
      </div>
     <table class="table table-hover">
        <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Description</th>
              <th scope="col" v-if="token">Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="product,index in products">
              <th scope="row">{{index+1}}</th>
              <td>{{product.product_name}}</td>
              <td>{{product.product_price}}</td>
              <td>{{product.product_description}}</td>
              <td v-if="token">
                  <div class="btn-group">
                      <table>
                          <tr>
                            <td>
                              <button class="btn btn-outline-warning" data-toggle="modal" data-target="#exampleModalCenteredit" @click.prevent="editProduct(product.id)">Edit</button>
                            </td>
                            <td>
                                <button class="btn btn-outline-danger" @click="deleteProduct(product.id)">Delete</button>
                            </td>
                          </tr>
                      </table>
                  </div>
              </td>
            </tr>
        </tbody>
    </table>
    <div class="modal fade" id="exampleModalCenteredit" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Edit Product</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
               <form>
                    <div class="form-group row">
                        <label for="product_name" class="col-sm-2 col-form-label">Name</label>
                        <div class="col-sm-10">
                        <input type="text" class="form-control" :class="{ 'is-invalid': form.errors.has('product_name') }" name="product_name" id="product_name" placeholder="Give Product Name" v-model="form.product_name">
                              <has-error :form="form" field="product_name"></has-error>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="product_price" class="col-sm-2 col-form-label">Price</label>
                        <div class="col-sm-10">
                        <input type="number" class="form-control" :class="{ 'is-invalid': form.errors.has('product_price') }" name="product_price" id="product_price" placeholder="Give Product Price" v-model="form.product_price">
                              <has-error :form="form" field="product_price"></has-error>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="product_description" class="col-sm-2 col-form-label">Description</label>
                        <div class="col-sm-10">
                        <input type="text" class="form-control" :class="{ 'is-invalid': form.errors.has('product_description') }" name="product_description" id="product_description" placeholder="Give Product Description" v-model="form.product_description">
                              <has-error :form="form" field="product_description"></has-error>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="product_image" class="col-sm-2 col-form-label">Image</label>
                        <div class="col-sm-10">
                        <input type="file" class="form-control" :class="{ 'is-invalid': form.errors.has('product_image') }" name="product_image" id="product_image"  @change="changePhoto($event)">
                              <img :src="updateImage()" alt="" width="80" height="80">
                              <has-error :form="form" field="product_image"></has-error>
                        </div>
                    </div>
                    <input type="hidden" name="id" id="id" v-model="form.id">
                </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" @click.prevent="updateProduct">Update</button>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import Login from './Login.vue'
import Register from './Register.vue'
import AddData from './Add.vue'
export default {
  name: 'HelloWorld',
  components: {
    Login,
    Register,
    AddData,
  },
  mounted(){
        
        
  },
  created() {
    this.getallProducts();
    Fire.$on('AfterCreate',() => {
        this.getallProducts();
    });
  },
  data(){
      return{
          products:[],
          token:localStorage.getItem("AToken"),
          form: new Form({
              id:null,
              product_name: '',
              product_price: '',
              product_description: '',
              product_image: '',
          })
      }
  },
  methods:{
      getallProducts() {
          axios.get('getAllProduct')
          .then(response => {
            this.products=response.data;
          })
      },
      changePhoto(event){
        let file = event.target.files[0];
        if(file.size>1048576){
            swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'please upload a less size photo',
                footer: '<a href>Why do I have this issue?</a>'
            })
        }else{
            let reader = new FileReader();
            reader.onload = event => {
                this.form.product_image = event.target.result
              // console.log(event.target.result)
            };
            reader.readAsDataURL(file);
        }
      },
      editProduct(id){
         axios.get('/editproduct/'+ id)
            .then(response =>{
                this.form.fill(response.data.product);
            })
          
      },
      updateProduct(){
        this.form.post('/updateproduct')
            .then(function (response) {
                toast.fire({
                  icon: 'success',
                  title: 'Data Edited successfully'
                })
                Fire.$emit('AfterCreate');
            })
            .catch(function (error) {
               
            });
      },
      updateImage(){ 
        let img = this.form.product_image;
        if(img.length>100){
            return  this.form.product_image
        }else{
            return `uploadimage/${this.form.product_image}`
        }
      },
      deleteProduct(id){
        swal.fire({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
              if (result.value) {
                // send request to the server
                axios.get('/deleteproduct/'+id).then(() => {
                    swal.fire(
                      'Deleted!',
                      'Your file has been deleted.',
                      'success'
                    )
                    Fire.$emit('AfterCreate');
                }).catch(() => { 
                  swal.fire("Failed","There was something wrong","Warning");
                });
              }
          })
        //  axios.get('/deleteproduct/'+ id)
        //     .then(response =>{
        //         console.log(response);
        //         Fire.$emit('AfterCreate');
        //     })
      },
      logout(){
        axios.get('/logout')
        .then(response =>{
            localStorage.removeItem('AToken');
            location.reload();
        })
        
      }
      
  }
}
</script>

<style scoped>

</style>
