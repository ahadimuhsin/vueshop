<template>
    <div>
        <!-- Isinya -->
        <v-card :to="'/book/'+book.slug">
            <v-img :src="getImage('/books/'+book.cover)" 
            class="white--text"
            height="200px">
                <v-card-title class="fill-height align-end" 
                v-text="book.title">
                </v-card-title>
            </v-img>
            <!-- Menampilka harga dan jumlah view -->
            <v-card-actions>
                <v-icon>mdi-cash</v-icon>
                <span class="orange--text">
                    Rp {{book.price.toLocaleString('id-ID')}}
                </span>
                <v-spacer></v-spacer>
                <v-icon>mdi-eye</v-icon>
                {{book.views}}
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
export default {
    //kalo mau gunakan komponen ini, tambahkan
    //kode <book-item/>
    name: 'book-item',
    //props untuk mengirim data dari parent ke child componentnya
    props: ['book'],
    data: () =>({
    }),
}
</script>