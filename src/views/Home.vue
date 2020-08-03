<template>
  <div>
    <!-- Template categories -->
    <v-container class="ma-0 pa-0" grid-list-sm>
      <div class="text-right">
        <v-btn small text to="/categories" class="blue--text">
        All categories <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>

      <v-layout wrap>
        <v-flex v-for="(category, index) in categories" 
        :key="`category-`+index" xs6>
        <v-card :to="'/category/'+category.slug">
        <v-img :src="getImage('/categories/'+category.image)" class = "white--text">
          <v-card-title class="fill-height align-end" v-text="category.name">
          </v-card-title>
        </v-img>
        </v-card>
        </v-flex>
      </v-layout>
    </v-container>
<!-- Template Buku -->
    <v-container class="ma-0 pa-0 mt-2" grid-list-sm>
      <div class="text-right">
        <v-btn small text to='/books' class="blue--text">
        All Books <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
      <v-layout wrap>
        <v-flex v-for="(book) in books" 
        :key="`book-`+book.id" xs6>
          <!-- <v-card :to="'/book/'+book.slug">
          <v-img :src="getImage('/books/'+book.cover)" class="white--text">
            <v-card-title class="fill-height align-end"
            v-text="book.title">
            </v-card-title> 
          </v-img>
          </v-card> -->

          <!-- Menggunakan komponen book-item dari file BookItem.vue -->
          <book-item :book="book"/>
        </v-flex>
      </v-layout>
    </v-container>

  </div>
</template>
<script>
export default {
  //memanggil komponen book-item
  components: {
    BookItem: ()=> import(/* komponen book-item */ '@/components/BookItem.vue')
  },
  data: () => ({
    //siapkan array kosong, yang akan diisi di method created
    categories:[],
    books:[]
  }),
  mounted(){
    console.log(process.env)
  },
  created(){
    console.log('ambil data kategori')
    this.axios.get('/categories/random/100')
    .then((response)=>{
      let{data} = response.data
      this.categories = data //memasukkan data ke dalam categories
    })
    .catch((error)=>{
      let{responses} = error
      console.log(responses)
    })

    console.log('ambil data buku')
    this.axios.get('/books/top/100')
    .then((response)=> {
      let{data} = response.data
      this.books = data
    })
    .catch((error) => {
      let{responses} = error
      console.log(responses)
    })
  },
  
  methods: {
    getImage(image){
      if(image!=null && image.length>0){
        return "http://localhost/larashop-api/public/image"+image
      }
      return "img/not-available.png"  
    },
  },
};
</script>