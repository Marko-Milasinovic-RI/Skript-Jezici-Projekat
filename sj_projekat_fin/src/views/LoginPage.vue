<template>
  <div class="main autentifikacija" style="text-align: center">
    <div class="main centriranje" style="text-align: center">

      <form @submit.prevent="handleSubmit">
        <h4 style="text-align: center">Logovanje korisnika</h4>
        <div class="form-group">
          <label>E-Mail</label>
          <input type="email" class="form-control" v-model="email" placeholder="E-mail"/>
        </div>

        <div class="form-group">
          <label>Sifra</label>
          <input type="password" class="form-control" v-model="password" placeholder="Sifra"/>
        </div>

        <button class="dugme login">Ulogujte se</button>
      </form>

    </div>
  </div>
</template>



<script>
import { mapActions } from "vuex";
export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["logInUser", "fetchUser"]),
    handleSubmit() {
      const user = {
        email: this.email,
        password: this.password,
      };
      this.logInUser(user).then(() => {
        this.fetchUser(this.email).then(() => {
          window.location.href = "/";
        });
      });
    },
  },
};
</script>



<style scoped>
#LoginPage {
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