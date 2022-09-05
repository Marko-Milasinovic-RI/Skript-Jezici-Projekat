<template>
  <div class="main posts" style="text-align: center">
   <h1 class="allPosts" style="text-align: center">Posts</h1>

   <div class="main searchPost" style="text-align: center">
     <form @submit="search">
       <input class="submitKlasa" type="text" v-model="title" placeholder="Pretrazite postove:  ">
       <input type="submit" value="Pretrazi">
     </form>
   </div>

   <div class="post" v-for="post in getPosts" :key="post.id" style="text-align: center">
     <div class="card" @click="goToPost(post.title)">
       <div class="div post">
         <h5 class="info 1">{{ post.title }}</h5>
         <p class="info 2">Autor: {{post.author}}</p>
         <p class="info 2">Autor: {{post.content}}</p>
       </div>
     </div>
   </div>

  </div>
</template>

<script>
import {mapActions , mapGetters} from 'vuex'

export default {
  name: "AllPosts",
  data() {
    return {
      title: this.title
    }
  },
  computed: {
    ...mapGetters(['getPosts'])
  },
  methods: {
    ...mapActions(['getAllPosts','searchPost']),
    async search(){
      await this.searchPost(this.title)
          .then(() => {
            this.$router.push({path: 'post'});
          })
    },
    goToPost(title){
      this.searchPost(title)
          .then(() => {
            this.$router.push({path: 'post'});
          })
    }
  },
  created() {
    this.getAllPosts()
  }
}
</script>

<style scoped>
#AllPosts {
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