<template>
  <div class="main wrapper" v-for="post in getPosts" :key="post.id">

    <div v-if="post.user_email === user.email">
      <div class="main Info div">

        <h4 class="card-title">{{ post.title }}</h4>
        <p class="card-text">Datum: {{ post.date }}</p>
        <p class="card-text">Sadrzaj: {{ post.content }}</p>

        <div class="Post Likes">
          <p>Likes: {{ post.likes }}</p>
        </div>

        <div class="functions">
          <form @submit="deletePost(user.email, post.title)">
            <input type="submit" value="Delete">
          </form>
          <form @submit="editPost(user.email, post.title, post.date, post.content)">
            <input type="submit" value="Izmeni">
          </form>
        </div>

      </div>
    </div>

  </div>

</template>



<script>
import axios from 'axios'
import {mapActions, mapGetters} from 'vuex'
export default {
  name: "UserProfile",
  data() {
    return {
      user: ''
    }
  },
  methods: {
    ...mapActions(['getAllPosts', 'deletePost', 'gettingData', 'searchPost']),

    deletePost(user, post) {
      let data = {user, post}
      this.deletePost(data).then(() => {
        this.getAllPosts();
      })
    },
    async editPost(user, post, categories, tag) {
      let data = {user, post, categories, tag}
      await this.gettingData(data)
      await this.searchPost(post)
          .then(() => {
            this.$router.push({path: '/EditPost'});
          })
    }
  },
  computed: {
    ...mapGetters(['getPosts'])
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
#UserProfile {
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