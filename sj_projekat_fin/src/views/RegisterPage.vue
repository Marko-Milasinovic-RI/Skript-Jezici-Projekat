<template>
  <div class="main Wrapper" >

      <form @submit.prevent="handleSubmit" last_name>
        <h4 last_name>Registracija korisnika</h4>

        <div class="form-group">
          <label>Ime</label>
          <input type="text" class="form-control" v-model="first_name" placeholder="Ime">
        </div>
        <div class="form-group">
          <label>Prezime</label>
          <input type="text" class="form-control" v-model="last_name" placeholder="Prezime">
        </div>
        <div class="form-group">
          <label>E-Mail adresa</label>
          <input type="email" class="form-control" v-model="email" placeholder="E-Mail adresa">
        </div>
        <div class="form-group">
          <label>Sifra</label>
          <input type="password" class="form-control" v-model="password" placeholder="Sifra">
        </div>
        <div class="form-group">
          <label>Potvrdite sifru</label>
          <input type="password" class="form-control" v-model="password_conf" placeholder="Potvrdite sifru">
        </div>

        <button class="btn block">Registrujte se</button>
      </form>

  </div>
</template>



<script>
import {mapActions} from 'vuex'
export default {
  name: 'RegisterPage',
  data() {
    return {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_conf: ''
    }
  },
  methods: {
    ...mapActions(['registerUser']),
    handleSubmit() {
      if(this.password !== this.password_conf){
        alert('Pogresna lozinka')
      } else {
        const data = {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          password: this.password
        }
        this.registerUser(data);
        this.$router.push('/loginPage');
      }
    }
  }
}
</script>



<style scoped>
#RegisterPage {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.main {
  max-width: 900px;
  margin: auto;
  margin-top: 100px;
  text-align: center;
}
</style>