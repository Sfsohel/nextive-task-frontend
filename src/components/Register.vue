<template>
  <div class="Register">
    <div class="modal fade" id="exampleModalCenterRegister" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <div class="col-sm-10">
                      <input v-model="form.name" type="text" class="form-control" :class="{ 'is-invalid': form.errors.has('name') }" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter name">
                      <has-error :form="form" field="name"></has-error>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <div class="col-sm-10">
                      <input v-model="form.email" type="email" class="form-control" :class="{ 'is-invalid': form.errors.has('email') }" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                      <has-error :form="form" field="email"></has-error>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <div class="col-sm-10">
                      <input v-model="form.password" type="password" class="form-control" :class="{ 'is-invalid': form.errors.has('name') }" id="exampleInputPassword1" placeholder="Password">
                      <has-error :form="form" field="password"></has-error>
                    </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" @click="register" data-dismiss="modal">Save</button>
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
              name: '',
              email: '',
              password: '',
            })
        }
    },
    methods:{
        register(){
            this.form.post('/register')
            .then(function (response) {
                toast.fire({
                  icon: 'success',
                  title: 'User Created in successfully'
                })
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
