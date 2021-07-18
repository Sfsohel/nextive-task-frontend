<template>
  <div class="login">
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Login</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
               <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input v-model="user.email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input v-model="user.password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" @click.prevent="userLogin">Login</button>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import Index from './Login.vue'
export default {
    name: 'HelloWorld',
    components: {
      Index,
    },
    data(){
        return{
            user:{email:null,password:null}
        }
    },
    methods:{
        userLogin(){
            axios.post('/login', { 
                email: this.user.email,
                password: this.user.password,
            })
            .then( response => {
                // console.log(response.data[1]);
                localStorage.setItem('AToken',response.data[1]);
                location.reload();
            })
            .catch( error=> {
                console.log(error);
            });
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
