<template>
    <div>
        <!-- Layout Component Book Item -->
        <v-card :to="'/book/'+book.slug">
            <v-img :src="getImage('/'+book.cover)"
            class="white--text"
            height="200px">
            <v-card-title class="fill-height align-end"
            v-text="book.title">
            </v-card-title>
            </v-img>

            <v-card-actions>
                <v-icon>mdi-cash</v-icon>
                <span class="orange--text">
                    Rp {{book.price.toLocaleString('id-ID')}}
                </span>
                <v-spacer></v-spacer>
                <v-icon>mdi-eye</v-icon> {{ book.views }}
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'book-item',
    props: ['book'],
    data: () => ({

 }),
 computed: {
     ...mapGetters({
         'carts': 'carts'
     })
 }
 }
</script>