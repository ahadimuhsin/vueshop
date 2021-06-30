<template>
    <div class="payment">
        <v-subheader>Informasi Pembayaran</v-subheader>
        <v-card flat>
            <v-container v-if="payment">
                <v-simple-table>
                    <tr>
                        <th>ID Pesanan</th>
                        <td>{{payment.order_id}}</td>
                    </tr>
                    <tr>
                        <th>Nomor Tagihan</th>
                        <td>{{payment.invoice_number}}</td>
                    </tr>
                    <tr>
                        <th>Total Tagihan</th>
                        <td>{{payment.total_price.toLocaleString('id-ID')}}</td>
                    </tr>
                </v-simple-table>
            </v-container>
        </v-card>

        <v-subheader>Transfer ke</v-subheader>
        <v-card flat>
            <v-container>
                <v-simple-table>
                    <tr>
                        <td><img src="https://4.bp.blogspot.com/-wGICxxBifdQ/W_EGMAGv-mI/AAAAAAAAFB4/fOX2DdfFMpckF0boSuvZy066_lLF3hkBwCLcBGAs/s400/BCA.png" height="150" width="150"></td>
                        <td>BCA KCP Rawa Buaya 547652786578</td>
                    </tr>
                    <tr>
                        <td><img src="https://i.pinimg.com/originals/fa/b0/31/fab0316777f1e21b9bfbbe888872df29.png" height="150" width="150"></td>
                        <td>BANK MANDIRI KCP Rawa Buaya 876873987987</td>
                    </tr>
                </v-simple-table>
            </v-container>
        </v-card>

        <v-subheader></v-subheader>
        <v-card></v-card>
        <v-container>
            <v-layout row wrap>
                <v-flex xs12 text-center>
                    <v-btn color="success" @click="finish">
                        Finish
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
    computed: {
        ...mapGetters({
            payment: 'payment'
        }),
    },
    methods: {
        ...mapActions({
            setAlert: 'alert/set'
        }),
        finish(){
            this.setAlert({
                status: true,
                text: 'Transaksi Selesai',
                color: 'success'
            })
            this.$router.push('/')
        }
    },
    created(){
        if(this.payment == undefined){
            this.setAlert({
                status: true,
                text: 'Belum ada payment',
                color: 'warning'
            })
            this.$router.push('/')
        }
    }
}
</script>