<template>
    <div>
        <v-card v-if="book.slug">
            <v-img :src="getImage('/'+book.cover)"
            class="white--text">
                <v-card-title class="fill-height align-end"
                v-text="book.title">
                </v-card-title>
            </v-img>

            <v-card-text>
                <v-simple-table>
                    <tbody>
                        <tr>
                            <td>
                                <v-icon>mdi-account-tie</v-icon>
                                Author
                            </td>
                            <td>
                                {{ book.author }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <v-icon>mdi-bullhorn</v-icon>
                                Publisher
                            </td>
                            <td>
                                {{ book.publisher }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <v-icon>mdi-weight</v-icon>
                                Weight
                            </td>
                            <td>
                                {{ book.weight }} kg
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <v-icon>mdi-format-list-bulleted</v-icon>
                                Stock
                            </td>
                            <td>
                                {{ book.stock }} item
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <v-icon>mdi-eye</v-icon>
                                View(s)
                            </td>
                            <td>
                                {{ book.views }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <v-icon>mdi-cash</v-icon>
                                Price
                            </td>
                            <td class="orange--text">Rp {{book.price.toLocaleString('id-ID')}}</td>
                        </tr>
                    </tbody>
                </v-simple-table>

                Description: <br>
                {{ book.description }}
                <br>
                <!-- Menampilkan kategori buku dalam bentuk chip -->
                Categories:
                <v-chip v-for="category in book.categories" 
                :key="`category-`+category.id" :to="'/category/'+category.slug" 
                small>
                {{ category.name }}
                </v-chip>
            </v-card-text>

            <v-card-actions>
                <v-btn block color="success" @click="buy" :disabled="book.stock==0">
                    <v-icon>mdi-cart-plus</v-icon> &nbsp; BUY
                </v-btn>
            </v-card-actions>

        </v-card>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    data: () => ({
        book: {}
    }),
    created(){
        this.go()
    },
    methods: {
        go()
        {
            let {slug} = this.$route.params
            let url = '/books/slug/'+slug
            url = url + '?page='+this.page
            url = encodeURI(url)
            this.axios.get(url)
            .then((response) => {
                let {data} = response.data
                this.book = data
            })
            .catch((error) => {
                let {responses} = error
                console.log(responses)
            })
        },
        //memanggil action add dari vuex
        ...mapActions({
            addCart: 'cart/add',
            setAlert: 'alert/set',
        }),
        buy()
        {
            // alert('Buy '+this.book.title)
            this.addCart(this.book)
            this.setAlert({
                status: true,
                color: 'success',
                text: "Ditambahkan ke dalam keranjang"
            })

            //pemanggilan tanpa MapAction
            //this.$store.dispatch('cart/add', this.book)
        }
    }
}
</script>