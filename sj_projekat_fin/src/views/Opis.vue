<template>
  <div>
    <h4>Napravi post</h4>
    <div class="main Add info">
      <form @submit="onSubmit">
        <input type="text" v-model="title" placeholder="Napisite naslov: ">
        <input type="text" v-model="content" placeholder="Napisite sadrzaj: ">
        <input type="date" v-model="author" placeholder="Dodajte autora: ">
        <input type="submit" value="Potvrdi">
      </form>
    </div>
  </div>
</template>



<script>
import { mapActions } from 'vuex'

export default {
  name: "AdmDodaj",
  data() {
    return {
      title: '',
      content: '',
      author: ''
    }
  },
  methods: {
    ...mapActions(['admDodaj']),
    onSubmit(){
      const payload = {
        title: this.title,
        content: this.content,
        author: this.author
      }
      this.addPost(payload)
    }
  }
}
</script>



<style scoped>
#Opis {
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

