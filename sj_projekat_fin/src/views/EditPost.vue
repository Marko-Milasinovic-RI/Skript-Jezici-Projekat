<template>
  <div class="main autentifikacija">

    <div v-if="user">
      <div class="main data-wrapper">

        <h3 class="naslov">{{ this.getPost.title }}</h3>
        <h4 class="autor">{{ this.getPost.author }}</h4>
        <p class="autor">{{ this.getPost.content }}</p>

        <div class="form wrapper">
          <form @submit="cancelEdit()">
            <input type="submit" value="Ponisti">
          </form>
          <form @submit="confirmEdit()">
            <input type="submit" value="Sacuvaj izmene">
          </form>
        </div>

      </div>
    </div>

    <div>
      <h3 v-if="!user">Molimo ulogujte se</h3>
    </div>

  </div>
</template>



<script>
import axios from 'axios'
import {mapActions, mapGetters} from 'vuex'
export default {
  name: "EditPost",
  data() {
    return {
      user: '',
      title: '',
      author: '',
      content: ''
    }
  },
  computed: {
    ...mapGetters(['getData', 'getPost'])
  },
  methods: {
    ...mapActions(['editPost']),

    cancelEdit() {
      this.$router.push({path: '/userProfile'});
    },

    confirmEdit() {
      const payload = {
        title: this.getPost.title,
        author: this.getPost.author,
        content: this.getPost.content,
        user_email: this.user.email,
      }
      this.editPost(payload)
          .then(() => {
            this.$router.push({path: '/userProfile'});
          })
    }
  },
  async created() {
    //verification
    const email = localStorage.getItem('email')
    const token = localStorage.getItem('token')
    if (!token || !email) return;

    //logic
    this.getAllPosts();

    const MyHeader = { headers: { authorization: 'Bearer ${token}' } };
    const axiosResponse  = await axios.get('http://localhost:3003/users/${email}', MyHeader)
        .then((response) => {
          return response.data.user
        })

    this.user = axiosResponse;
  }
}
</script>



<style scoped>
#EditPost {
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