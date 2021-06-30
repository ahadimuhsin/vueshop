<template>
    <div>
        <v-container class="ma-0 pa-0" grid-list-sm>
            <v-subheader>All Books</v-subheader>
            <v-layout wrap>
                <v-flex v-for="(book) in books" :key="`book-`+book.id" xs6>
                    <v-card :to="'/book/'+book.slug">
                        <v-img
                        :src="getImage('/'+book.cover)"
                        class="white--text">
                        <v-card-title class="fill-height align-end"
                        v-text="book.title"></v-card-title>
                        </v-img>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>

        <!-- Pagination -->
        <template>
            <div class="text-center">
                <v-pagination v-model="page" @input="go"
                :length="lengthPage"
                :total-visible="5">
                </v-pagination>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    data:() => ({
        books: [],
        page: 0,
        lengthPage: 0
    }),
    created(){
        this.go()
    },
    methods: {
        go(){
            let url = '/books?page='+this.page
            this.axios.get(url)
            .then((response) => {
                let {data} = response.data
                let {meta} = response.data
                this.books = data
                // Jumlah halaman didapat dari meta endpoint books
                this.lengthPage = meta.last_page
                this.page = meta.current_page
            })
            .catch((error) => {
                let {responses} = error
                console.log(responses)
            })
        }
    }
}
</script>