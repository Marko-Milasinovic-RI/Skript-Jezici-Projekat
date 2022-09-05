<template>
  <div class="main post">
    <div v-if="user">

      <div class="main wrapper">
        <h4 class="card-title">{{ this.getPost.title }}</h4>

        <p class="card-text">Projection Time: </p>
        <div class="main">
          <input type="radio" id="one" value="Fst" v-model="picked">
          <label for="one">{{ this.getPost.categories}}</label>
          <input type="radio" id="one" value="Fst" v-model="picked">
          <label for="one">{{ this.getPost.tags}}</label>
          <span>Izabrano: {{ picked }}</span>
        </div>

        <form @submit="createPost">
          <input type="submit" value="Napravi post">
        </form>
      </div>

    </div>

    <div>
      <h1 v-if="!user">Molimo ulogujte se!</h1>
    </div>

  </div>
</template>


<script>
import axios from 'axios'
import { mapGetters , mapActions } from 'vuex'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Post",
  data() {
    return {
      title: '',
      user: '',
      picked: null
    }
  },
  computed: {
    ...mapGetters(['getPost'])
  },
  methods: {
    ...mapActions(['searchPost', 'createPost']),
    createPost() {
      if(this.picked === "Fst") this.picked = this.getPost.categories
      else if(this.picked === "Snd") this.picked = this.getPost.tags
      else this.picked = null

      const payload = {
        user_email: this.user.email,
        postTitle: this.getPost.title,
        categories: this.picked
      }
      this.createPost(payload)
          .then(() => {
            this.$router.push({path: 'allPosts'});
          })
    }
  },

  async created() {
    //verification
    const email = localStorage.getItem('email')
    const token = localStorage.getItem('token')
    if (!token || !email) return;

    //logic
    const MyHeader = { headers: { authorization: 'Bearer ${token}' } };
    const response  = await axios.get('http://localhost:3003/users/${email}', MyHeader)
        .then((response) => {
          return response.data.user
        })

    this.user = response;
  }
}
</script>



<style scoped>
#Post {
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