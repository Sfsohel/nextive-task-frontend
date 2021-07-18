<template>
  <div class="login">
    <div class="modal fade" id="exampleModalCenterAddData" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Add Product</h5>
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
                              <img :src="form.product_image" alt="" width="80" height="80">
                              <has-error :form="form" field="product_image"></has-error>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" @click.prevent="addProduct">Save</button>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    data(){
        return{
            user:{email:null,password:null},
            form: new Form({
              product_name: '',
              product_price: '',
              product_description: '',
              product_image: '',
          })
        }
    },
    created() {
        Fire.$on('AfterCreate',() => {
            this.getallProducts();
        });
    },
    mounted(){
        // this.reset(); 
    },
    methods:{
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
        getallProducts() {
            axios.get('getAllProduct')
            .then(response => {
                this.products=response.data;
            })
        },
        addProduct(){
            this.form.post('/addproduct')
            .then(function (response) {
                toast.fire({
                  icon: 'success',
                  title: 'Data added in successfully'
                })
                Fire.$emit('AfterCreate');
            })
            .catch(function (error) {
               
            });
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
