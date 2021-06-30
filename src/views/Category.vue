<template>
    <div>
        <v-card :to="'/category/'+category.slug" v-if="category.slug">
            <v-img :src="getImage('/'+category.image)" 
            class="white--text"
            style="width: auto; height:400px">
            <v-card-title class="fill-height align-end"
            v-text="category.name">
            </v-card-title>
            </v-img>
        </v-card>

        <v-container class="ma-0 pa-0" grid-list-sm v-if="books">
            <v-subheader>
                All Books
            </v-subheader>
            <v-layout wrap>
                <v-flex v-for="(book) in books" :key="`book-`+book.id" xs6>
                    <v-card :to="'/book/'+book.slug">
                        <v-img :src="getImage('/'+book.cover)" class="white--text">
                            <v-card-title class="fill-height align-end" 
                            v-text="book.title">
                            </v-card-title>
                        </v-img>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>

        <!-- Pagination -->
        <template>
            <div class="text-center">
            <v-pagination 
            v-model="page" 
            @input="go"
            :length="lengthPage"
            :total-visible="5">
            </v-pagination>
        </div>
        </template>
        <!-- End of Pagination -->
    </div>
</template>
<script>
export default{
    data:() => ({
        category: {}, //properti kategori simpan sebagai objek
        books: [], //berisi daftar buku
        page: 0,
        lengthPage: 0
    }),
    created(){
        this.go()
    },
    methods: {
        go(){
            let {slug} = this.$route.params
            let url = '/categories/slug/'+slug
            url = url + '?page='+this.page
            url = encodeURI(url)
            this.axios.get(url)
            .then((response) => {
                let {data} = response.data
                let category = data //kalo objek, perlu didefinisikan variabelnya
                this.category = data
                this.books = category.books.data
                this.page = category.books.current_page
                this.lengthPage = category.books.last_page
            })
            .catch((error) =>{
                let {responses} = error
                console.log(responses)
            })


        }
    }
}
</script>