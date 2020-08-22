<template>
    <div class="payment">
        <v-subheader>Payment Information</v-subheader>
        <v-card flat>
            <v-container v-if="payment">
                <v-simple-table>
                    <tr>
                        <th>Order ID</th>
                            <td>{{payment.order_id}}</td>
                    </tr>
                    <tr>
                        <th>Invoice Number</th>
                            <td>{{ payment.invoice_number}}</td>
                    </tr>
                    <tr>
                        <th>Total Bill</th>
                            <td> Rp. {{ payment.total_price.toLocaleString('id-ID')}}</td>
                    </tr>
                </v-simple-table>
            </v-container>
        </v-card>

        <v-subheader>Transfer to</v-subheader>
        <v-card flat>
            <v-container>
                <v-simple-table>
                    <tr>
                        <td><img src="https://khusnulkhotimah94.files.wordpress.com/2015/11/logo-bank-bca.jpg"
                        height="180" width="200"></td>
                        <td>BCA KCP Rawa Buaya No Rek 123</td>
                    </tr>
                    <tr>
                        <td><img src="https://pbs.twimg.com/profile_images/829865693185138688/D1y2Ciyn.jpg" height="200" width="200"></td>
                        <td>Mandiri KCP Taman Semanan Indah No Rek 080989999</td>
                    </tr>
                </v-simple-table>
            </v-container>
        </v-card>

        <v-subheader></v-subheader>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12 text-center>
                        <v-btn color="success" @click="finish">
                            Finish
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </div>
</template>

<script>
import { mapGetters, mapActions} from 'vuex'
export default {
    computed: {
        ...mapGetters({
            payment: 'payment',
        }),
    },
    created() {
        if(this.payment == undefined){
            this.setAlert({
                status: true,
                text: 'Payment undefined',
                color: 'warning',
            })
            this.$router.push('/')
        }
    },
    methods: {
        ...mapActions({
            setAlert    : 'alert/set',
        }),
        finish(){
            this.setAlert({
                status: true,
                text: 'Transaction succes',
                color: 'success',
            })
            this.$router.push('/')
        }
    },
}
</script>