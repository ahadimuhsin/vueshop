<template>
    <div>
        <!-- Masukkan Alamat Pengiriman -->
        <v-subheader>Shipping Address</v-subheader>
        <div>
            <v-card flat>
                <v-container>
                    <v-form ref="form" lazy-validation>
                        <!-- Form Nama -->
                        <v-text-field 
                        label="Name" 
                        v-model="name"
                        required 
                        append-icon="mdi-account" 
                        readonly>
                        </v-text-field>
                        <!-- Form Alamat -->
                        <v-textarea 
                        label="Address" 
                        v-model="address"
                        required 
                        auto-grow 
                        rows="5" 
                        append-icon="mdi-map-marker">
                        </v-textarea>
                        <!-- Form Phone -->
                        <v-text-field label="Phone" 
                        v-model="phone"
                        required append-icon="mdi-phone">
                        </v-text-field>
                        <!-- Select Province -->
                        <v-select 
                        v-model="province_id"
                        :items="provinces"
                        item-text="province"
                        item-value="id_province"
                        label="Province"
                        persistent-hint
                        single-line>
                        </v-select>
                        <!-- Select City -->
                        <v-select 
                        v-model="city_id"
                        v-if="province_id>0"
                        :items="citiesByProvince"
                        item-text="city"
                        item-value="id_city"
                        label="City"
                        persistent-hint
                        single-line>
                        </v-select>
                    </v-form>

                    <!-- Button Submit -->
                    <v-card-actions>
                        <v-btn color="success" dark 
                        @click="saveShipping">
                            <v-icon>mdi-content-save</v-icon> &nbsp;
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-container>
            </v-card>
        </div>
        <!-- Shopping Cart -->
        <v-subheader>Your Shopping Cart</v-subheader>
        <div v-if="countCart>0">
            <v-card flat>
                <v-list three-line v-if="countCart>0">
                    <template v-for="(item, index) in carts">
                        <v-list-item :key="'cart'+index">
                            <v-list-item-avatar>
                                <v-img :src="getImage('/books/'+item.cover)"></v-img>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title v-html="item.title">
                                </v-list-item-title>

                                <v-list-item-subtitle>
                                    Rp. {{  item.price.toLocaleString('id-ID') }}
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
                        Subtotal
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
                    <!-- Pilih Kurir -->
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
                    <!-- Pilih Layanan -->
                    <v-select
                    v-model="service"
                    v-if="courier"
                    :items="services"
                    @change="calculateBill"
                    item-text="resume"
                    item-value="service"
                    label="Courier Service"
                    persistent-hint
                    single-line
                    ></v-select>
                    <!-- Menampilkan Total Harga Shipping -->
                    <v-card-actions>
                        Subtotal
                        <v-spacer />
                        Rp. {{ shippingCost.toLocaleString('id-ID') }}
                    </v-card-actions>
                </v-container>
            </v-card>
        </div>
        <!-- Menampilkan Total Harga: Barang + Shipping -->
        <v-subheader>Total</v-subheader>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs6 text-center>
                        Total Bill ({{ totalQuantity }} items)
                    <div class="title">{{ totalBill.toLocaleString('id-ID') }}</div>
                    </v-flex>
                    <v-flex xs6 text-center>
                        <v-btn color="orange" @click="dialogConfirm=true"
                        :disabled="totalBill==0">
                            <v-icon light>mdi-cash</v-icon> &nbsp;
                            Pay
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>

        <!-- Modal Confirmation -->
        <template>
            <v-layout row justify-center>
                <v-dialog v-model="dialogConfirm" persistent max-width="290">
                    <v-card>
                        <v-card-title class="headline">Confirmation</v-card-title>
                        <v-card-text>
                            If you continue, transaction will be processed
                        </v-card-text>
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
export default {
    //set data default value
    data(){
        return {
            name: '',
            address : '',
            phone: '',
            province_id: 0,
            city_id: 0,
            courier: '',
            couriers: [],
            service: '',
            services: [],
            shippingCost: 0,
            totalBill: 0,
            dialogConfirm: false,
        }
    },
    computed: {
        //ambil datanya dari getters
        ...mapGetters({
            user        : 'auth/user',
            provinces   : 'region/provinces',
            cities      : 'region/cities',
            carts       : 'cart/carts',
            countCart   : 'cart/count',
            totalPrice  : 'cart/totalPrice',
            totalQuantity : 'cart/totalQuantity',
            totalWeight : 'cart/totalWeight',
        }),
        //fungsi untuk menampilkan kota berdasarkan provinsi
        citiesByProvince(){
            let province_id = this.province_id
            return this.cities.filter((city) => {
                if (city.province_id == province_id) return city
            })
        },
    },
    methods: {
        //ambil action pada tiap2 state
        ...mapActions({
            setAlert    : 'alert/set',
            setAuth     : 'auth/set',
            setProvinces    : 'region/setProvinces',
            setCities       : 'region/setCities',
            setCart     : 'cart/set', //untuk mengupdate data belanja agar sesuai dengan database
            setPayment  : 'setPayment',
        }),
        saveShipping(){
            let formData = new FormData()
            formData.set('name', this.name)
            formData.set('address', this.address)
            formData.set('phone', this.phone)
            formData.set('province_id', this.province_id)
            formData.set('city_id', this.city_id)
            //check header dari user login dan ambil api token
            let config = {
                headers: {
                    'Authorization': 'Bearer ' +this.user.api_token,
                },
            }

            this.axios.post('/shipping', formData, config)
            .then((response) => {
                let { data } = response
                this.setAuth(data.data)
                this.setAlert({
                    status: true,
                    text: data.message,
                    color : 'success',
                })
            })
            .catch((error) => {
                let { data } = error
                this.setAlert({
                    status: true,
                    text: data.message,
                    color: 'error',
                })
            })
        },
        //merequest endpoint service
        getServices(){
            let courier = this.courier
            let encodedCart = JSON.stringify(this.carts)
            console.log(encodedCart)
            let formData = new FormData()
            //mengambil isi dari form courier dan carts
            formData.set('courier', courier)
            formData.set('carts', encodedCart);

            let config = {
                headers: {
                    'Authorization': 'Bearer '+this.user.api_token,
                },
            }
            this.axios.post('/services', formData, config)
            .then((response) => {
                let response_data = response.data
                //jika tidak error maka data service dan cart
                //akan diupdate
                if(response_data.status != 'error'){
                    this.services = response_data.data.services
                    this.setCart(response_data.data.safe_carts)
                }

                this.setAlert({
                    status: true,
                    text: response_data.message,
                    color: response_data.status,
                })
            })
            .catch((error) => {
                let responses = error.response
                this.setAlert({
                    status: true,
                    text: responses.data.message,
                    color: 'error', 
                })
            })
        },
        //method calculate Bill: menghitung total pembayaran
        calculateBill(){
            let selectedService = this.services.find((service)=> {
                return (service.service == this.service)
            })
            this.shippingCost = selectedService.cost
            this.totalBill = parseInt(this.totalPrice) + parseInt(this.shippingCost)
        },
        //jika user setuju dengan pesanannya, method pay akan dijalankan
        pay(){
            this.dialogConfirm = false
            let courier = this.courier
            let service = this.service
            let safeCart = JSON.stringify(this.carts)
            console.log(safeCart)
            let formData = new FormData()
            formData.set('courier', courier)
            formData.set('service', service)
            formData.set('carts', safeCart);
            //tiap jalananin method post, sertakan api token
            let config = {
                headers: {
                    'Authorization' : 'Bearer ' +this.user.api_token,
                },
            }
            this.axios.post('/payment', formData, config)
            .then((response) => {
                let { data } = response
                if(data && data.status == 'success'){
                    // this.setPayment(data.data)
                    // this.$router.push({path: "/payment"})
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
                let{ data } = error.response
                this.setAlert({
                    status: true,
                    text: data.message,
                    color: 'error',
                })
            })
        },
        cancel(){
            this.dialogConfirm = false
        }
    },
    created(){
        this.name = this.user.name
        this.address = this.user.address
        this.phone = this.user.phone
        this.city_id = this.user.city_id
        this.province_id = this.user.province_id
        //periksa apakah provinsi ada dan panjangnya 0
        if (this.provinces && this.provinces.length == 0){
            this.axios.get('/provinces')
            .then((response) => {
                let { data } = response.data
                this.setProvinces(data)
            })
            
            this.axios.get('/cities')
            .then((response) => {
                let { data } = response.data
                 this.setCities(data)
            })  
        }

        //ambil endpoint kurir
        if(this.couriers.length==0){
            this.axios.get('/couriers')
            .then((response) => {
                this.couriers = response.data.data
            })
        }
    }
}
</script>