<template>
  <div>
    <!-- Template Categories -->
    <v-container class="ma-0 pa-0" grid-list-sm>
      <div class="text-right">
        <v-btn small text to="/categories" class="blue--text">
          All Categories <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
      <v-layout wrap>
        <v-flex v-for="(category, index) in categories" 
        :key="`category-`+index" xs6>
        <v-card :to="'/category/'+category.slug" >
        <!-- Fill height aling end area teksnya seluas gambar 
        namun posisinya tetap di akhir -->
          <v-img :src="getImage('/'+category.image)" class="white--text" style="width:auto; height: 200px">
            <v-card-title class="fill-height align-end" 
            v-text="category.name" style="color: red"></v-card-title>
          </v-img>
        </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <!-- Template Books -->
    <v-container class="ma-0 pa-0 mt-2" grid-list-sm>
      <div class="text-right">
        <v-btn small text to="/books" class="blue--text">
          All Books <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
      <v-layout wrap>
        <v-flex v-for="(book, index) in books" :key="`book-`+index" xs6>
          <!-- Memanggil Komponen book-item -->
          <book-item :book="book"></book-item>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
// import BookItem from '../components/BookItem.vue';
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  // components: {
  //   HelloWorld
  // },
  data: () => ({
    categories: [],
    books: [],
  }),
  components: {
    BookItem: () => import (/* */ '@/components/BookItem.vue')
  },
  created(){
    console.log('get data categories');
    this.axios.get('/categories/random/4')
    .then((response) => {
      let {data} = response.data
      this.categories = data
      console.log(data)
    })
    .catch((error) => {
      let {response} = error
      console.log(response)
    });
    console.log('get books data')
    this.axios.get('/books/top/6')
    .then((response) => {
      let {data} = response.data
      this.books = data
      console.log(data)
    })
    .catch((error) => {
      let {responses} = error
      console.log(responses)
    })
  },
};
</script>
