<template>
  <div class="home">
    <Navbar/>    
    <b-container>
      <b-row>
        <ListBook v-for="item in books" :key="item.id" :book="item"/>
      </b-row>   
    </b-container>
    <!-- <img src="../assets/logo.png"> -->
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import ListBook from '@/components/ListBook.vue'
export default {
  name: 'home',
  components: {
    Navbar,
    ListBook
  },
  mounted() {
    this.$store.dispatch('getBooks')
  },
  computed: {
    books: {
      get() {
        return this.$store.state.books
      }
    }
  },
}
</script>
