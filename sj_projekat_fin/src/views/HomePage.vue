<template>
  <div class="main Autentifikacija" style="text-align: center">

    <h3 v-if="user">
      <div class="router main" style="text-align: center">
        <router-link
            to="/allPosts"
            v-if="user"
            class="nav-link">Svi postovi</router-link>
      </div>
    </h3>

    <h4 v-if="!user" style="text-align: center">Molimo ulogujte se.</h4>
  </div>
</template>


<script>
import {mapGetters} from 'vuex'
import axios from 'axios'

export default {
  name: "HomePage",
  data() {
    return {
      user: ''
    };
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  async created() {
    //verification
    const email = localStorage.getItem('email')
    const token = localStorage.getItem('token')
    if (!token || !email) return;

    //logic
    const myHeader = { headers: { authorization: 'Bearer ${token}' } };
    const resources  = await axios.get('http://localhost:3003/users/${email}', myHeader)
        .then((response) => {
          return response.data.user
        })

    this.user = resources;
  },
};
</script>



<style scoped>
#HomePage {
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