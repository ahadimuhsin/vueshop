<template>
<div>
    <v-subheader>Alamat Pengiriman</v-subheader>
    <div>
        <v-card flat>
            <v-container>
                <v-form ref="form" lazy-validation>
                    <v-text-field
                    label="Name"
                    v-model="name"
                    required
                    append-icon="mdi-account">
                    </v-text-field>

                    <v-textarea
                    label="Address"
                    v-model="address"
                    required
                    auto-grow
                    rows="3"
                    append-icon="mdi-home">
                    </v-textarea>

                    <v-text-field
                    label="Phone"
                    v-model="phone"
                    required
                    v-mask="'############'"
                    append-icon="mdi-phone"
                    ></v-text-field>

                    <v-select
                    v-model="province_id"
                    :items="provinces"
                    item-text="province"
                    item-value="id"
                    label="Province"
                    persistent-hint
                    single-line
                    >
                    </v-select>

                    <v-select
                    v-model="city_id"
                    v-if="province_id>0"
                    :items="citiesByProvince"
                    item-text="city"
                    item-value="id"
                    label="City"
                    persistent-hint
                    single-line
                    >
                    </v-select>
                </v-form>

                <v-card-actions>
                    <v-btn color="success" dark @click="saveShipping">
                        <v-icon>mdi-content-save</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-container>
        </v-card>
    </div>
    <v-subheader>Your Shopping Cart</v-subheader>
    <div v-if="countCart>0">
        <v-card flat>
            <v-list three-line v-if="countCart>0">
                <template v-for="(item,index) in carts">
                    <v-list-item
                    :key="'cart'+index">
                    <v-list-item-avatar>
                        <v-img :src="getImage('/'+item.cover)"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title v-html="item.title"></v-list-item-title>
                        <v-list-item-subtitle>
                            Rp. {{ item.price.toLocaleString('id-ID') }}
                            ({{ item.weight }} kg)
                            <span style="float:right">
                                {{ item.quantity }}
                            </span>
                        </v-list-item-subtitle>
                    </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
            <v-container>
                <v-card-actions>
                    Sub Total
                    <v-spacer />
                    Rp. {{ totalPrice.toLocaleString('id-ID') }}
                </v-card-actions>
            </v-container>
        </v-card>
    </div>
    <v-subheader>Courier</v-subheader>
    <div>
        <v-card flat>
            <v-container>
                <!-- Memilih jenis jasa pengiriman -->
                <v-select
                v-model="courier"
                :items="couriers"
                @change="getServices"
                item-text="text"
                item-value="id"
                label="Courier"
                persistent-hint
                single-line>
                </v-select>
                <!-- Memilih jenis pelayanan -->
                <v-select v-model="service"
                v-if="courier"
                :items="services"
                @change="calculateBill"
                item-text="resume"
                item-value="service"
                label="Courier Service"
                persistent-hint
                single-line
                >
                </v-select>

                <!-- Menampilkan subtotal -->
                <v-card-actions>
                    Sub Total
                    <v-spacer />
                    Rp. {{ shippingCost.toLocaleString('id-ID') }}
                </v-card-actions>
            </v-container>
        </v-card>
    </div>

    <v-subheader>Total</v-subheader>
    <v-card>
        <v-container>
            <v-layout row wrap>
                <v-flex xs6 text-center>
                    Total Bill ({{ totalQuantity }}items)
                    <div class="title">
                        {{ totalBill.toLocaleString('id-ID') }}
                    </div>
                </v-flex>
                <v-flex xs6 text-center>
                    <v-btn color="orange" @click="dialogConfirm = true" :disabled="totalBill==0">
                        <v-icon light>mdi-cash</v-icon> &nbsp;
                        Pay
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>

    <!-- Dialog Konfirmasi Pembayaran -->
    <template>
        <v-layout wrap justify-center>
            <v-dialog v-model="dialogConfirm" persistent max-width="290">
                <v-card>
                    <v-card-title class="headline">Confirmation</v-card-title>
                    <v-card-text>Jika diklik Continue, transaksi akan diproses</v-card-text>
                    <v-card-actions>
                        <v-btn color="warning" @click="cancel">Cancel</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="success" @click="pay">Continue</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </template>

</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default{
    data(){
        return {
            name: '',
            address: '',
            phone: '',
            province_id : 0,
            city_id: 0,
            courier: '',
            couriers: [],
            service: '',
            services: [],
            shippingCost: 0,
            totalBill: 0,
            dialogConfirm: false
        }
    },
    computed: {
        ...mapGetters({
            user: 'auth/user', //mengambil data user yang sedang login
            token: 'auth/token',
            provinces: 'region/provinces',
            cities: 'region/cities',
            carts: 'cart/carts',
            countCart: 'cart/count',
            totalPrice: 'cart/totalPrice',
            totalQuantity: 'cart/totalQuantity',
            totalWeight: 'cart/totalWeight'
        }),
        citiesByProvince(){
            let province_id = this.province_id
            return this.cities.filter((city) => {
                if (city.province_id == province_id){
                    console.log(city)
                    return city
                }
            })
        }
    },
    methods: {
        ...mapActions({
            setAlert: 'alert/set',
            setAuth: 'auth/set',
            setProvinces: 'region/setProvinces',
            setCities: 'region/setCities',
            setCart: 'cart/set',
            setPayment: 'setPayment'
        }),
        //kirim data form ke server
        saveShipping(){
            let formData = new FormData()
            formData.set('name', this.name)
            formData.set('address', this.address)
            formData.set('phone', this.phone)
            formData.set('province_id', this.province_id)
            formData.set('city_id', this.city_id)

            // console.log(this.token)

            let config ={
                headers: {
                    'Authorization': 'Bearer ' +this.token
                }
            }

            this.axios.post('/shipping', formData, config)
            .then((response) => {
                let {data} = response
                this.setAuth(data.data)
                this.setAlert({
                    status: true,
                    text: data.message,
                    color: 'success'
                })
            })
            .catch((error) => {
                let {data} = error
                console.log(data)
                // this.setAlert({
                //     status: true,
                //     text: data.message,
                //     color: 'error'
                // })
            })
        },
        getServices(){
            let courier = this.courier
            let encodedCart = JSON.stringify(this.carts)
            let formData = new FormData()
            formData.set('courier', courier)
            formData.set('carts', encodedCart)

              let config ={
                headers: {
                    'Authorization': 'Bearer ' +this.token
                }
            }

            this.axios.post('/services', formData, config)
            .then((response) => {
                let response_data = response.data
                //jika tidak error, maka data service dan cart akan diupdate
                if(response_data.status != 'error'){
                    this.services = response_data.data.services
                    this.setCart(response_data.data.safe_carts)
                }

                this.setAlert({
                    status: true,
                    text: response_data.message,
                    color: response_data.status
                })
            })
            .catch((error) =>
            {
                let responses = error.response
                console.log(responses)
            })
        },

        calculateBill(){
            let selectedService = this.services.find((service) => {
                return (service.service == this.service)
            })
            this.shippingCost = selectedService.cost
            this.totalBill = parseInt(this.totalPrice) + parseInt(this.shippingCost)
        },
        pay()
        {
            this.dialogConfirm = false
            let courier = this.courier
            let service = this.service
            let safeCart = JSON.stringify(this.carts)
            let formData = new FormData()
            formData.set('courier', courier)
            formData.set('service', service)
            formData.set('carts', safeCart)

            let config ={
                headers: {
                    'Authorization': 'Bearer ' +this.token
                }
            }
            this.axios.post('/payment', formData, config)
            .then((response) => {
                let {data} = response
                //jika pembayaran sukses, kembali ke halaman payment dan kosongkan cart
                if(data && data.status == 'success'){
                    // this.setPayment(data.data)
                    // this.$router.push({path: '/payment'})
                    this.setCart([])
                    let payment_link = data.data.payment_link
                    window.location = payment_link
                }

                this.setAlert({
                    status: true,
                    text: data.message,
                    color: data.status,
                })
            })
            .catch((error) => {
                let {data} = error.response
                this.setAlert({
                    status: true,
                    text: data.message,
                    color: 'error'
                })
            })
        },
        cancel(){
            this.dialogConfirm = false
        }
    },
    //dijalankan saat halaman diload
    created()
    {
        this.name = this.user.name
        this.address = this.user.address
        this.phone = this.user.phone
        this.city_id = this.user.city_id
        this.province_id = this.user.province_id

        if(this.provinces && this.provinces.length == 0){
            this.axios.get('/provinces')
            .then((response) => {
                let{data} = response.data
                this.setProvinces(data)
            })
            this.axios.get('/cities')
            .then((response) => {
                let {data} = response.data
                this.setCities(data)
            })
        }

        if(this.couriers.length == 0){
            this.axios.get('/couriers')
            .then((response) => {
                this.couriers = response.data.data
            })
        }
    }
}
</script>