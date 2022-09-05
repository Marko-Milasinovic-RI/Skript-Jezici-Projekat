<template>
  <nav class="main center wrapper" style="text-align: center">

    <router-link to="/" class="navigacija"> Glavna stranica </router-link>
    <div class="main wrapper">

      <ul class="login/reg wrapper" v-if="!user">
        <li class="log">
          <router-link to="/loginPage" class="nav-link">Uloguj se</router-link>
        </li>
        <li class="reg">
          <router-link to="/registerPage" class="nav-link">Registruj se</router-link>
        </li>
      </ul>

      <ul class="user wrapper" v-if="user">
        <li class="item 1">
          <router-link to="/userProfile" class="nav-link">Korisnik: <b>{{ user.ime }}</b></router-link>
        </li>

        <li class="item 2">
          <a href="javascript:void(0)" @click="logOutLink" class="nav-link">Izlogujte se</a>
        </li>
      </ul>
    </div>

  </nav>
</template>



<script>
import axios from "axios";
import {mapGetters, mapActions} from 'vuex'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Navigacija",
  data() {
    return {
      user: '',
      ime: '',
    };
  },
  computed: {
    ...mapGetters(['getUser']),

  },
  async created() {
    //verification
    const email = localStorage.getItem('email')
    const token = localStorage.getItem('token')
    if (!token || !email) return;

    //logic
    const myHeader = { headers: { authorization: 'Bearer ${token}' } };
    const axiosResponse  = await axios.get('http://localhost:3003/users/${email}', myHeader)
        .then((response) => {
          return response.data.user
        })

    this.user = axiosResponse;
  },
  methods: {
    ...mapActions(['fetchUser']),

    logOutLink() {
      localStorage.removeItem('email')
      localStorage.removeItem('token')
      window.location.href = "/"
    },
  },
};
</script>



<style scoped>
#Navigacija {
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