<template>
    <v-app>
        <!-- For Header if it is Home-->
        <v-app-bar app color="primary" dark extended v-if="isHome">
            <!-- membuat nav bar di samping, yang
            jika diklik, akan show/hide -->
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title>Vueshop</v-toolbar-title>

            <!-- Pemisah Konten -->
            <v-spacer></v-spacer>
            
            <!-- menambahkan icon -->
             <!-- Icon dari material design google -->
            <!-- Membuat icon keranjang belanja dengan
                penanda -->
            <v-btn icon @click="setDialogComponent('cart')" >
                <v-badge color="orange" overlap>
                    <template v-slot:badge v-if="countCart>0">
                        <span>{{countCart}}</span>
                    </template>
                    <v-icon>mdi-cart</v-icon>
                </v-badge>
            </v-btn>

            <v-text-field slot="extension" hide-details
            append-icon="mdi-microphone"
            flat
            label="Search"
            prepend-inner-icon="mdi-magnify"
            solo-inverted
            @click="setDialogComponent('search')">
            </v-text-field>
            <!-- Header -->
        </v-app-bar>

        <!-- Header Bukan Home -->
        <v-app-bar app color="primary" dark v-else>
            <v-btn icon @click.stop="$router.go(-1)">
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click="setDialogComponent('cart')">
            <v-badge color="orange" overlap>
                <template v-slot:badge>
                    <span>{{countCart}}</span>
                </template>
                <v-icon>mdi-cart</v-icon>
            </v-badge>
            </v-btn>


            </v-app-bar> 
        <!-- Navigation Menu -->
        <v-card>
            <v-navigation-drawer app v-model="drawer">
                <!-- Membuat List Menu di Sebelah Kiri,
                yang datanya diambil dari data() -->
                    <!-- Tombol Login dan Register -->
                    <div class="pa-2" v-if="guest">
                        <v-btn block color="primary" class="mb-1"
                        @click="setDialogComponent('login')">
                            <v-icon left>mdi-lock</v-icon>
                            Login
                        </v-btn>
                        <v-btn block color="success" @click="setDialogComponent('register')">
                            <v-icon left>mdi-account</v-icon>
                            Register
                        </v-btn>
                    </div>
                    

                    <!-- Bagian Avatar -->
                    <v-list-item v-if="!guest">
                        <v-list-item-avatar>
                            <v-img :src="getImage('/users/'+user.avatar)">

                            </v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>{{ user.name }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-divider></v-divider>
                <!--Membuat List  -->
                
                <v-list shaped>
                <v-list-item
                    v-for="(item, index) in menus"
                    :key="`menu-`+index"
                    :to="item.route">
                    <!-- Menambahkan icon -->
                    <v-list-item-icon>
                        <v-icon left>{{item.icon}}</v-icon>
                    </v-list-item-icon>
                    <!-- Menambahkan nama -->
                    <v-list-item-content>
                        <v-list-item-title>{{item.title}}</v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
                </v-list>
                
                <!-- Tombol Logout -->
                    <template v-slot:append v-if="!guest">
                        <div class="pa-2">
                            <v-btn block color="red" dark @click="logout">
                                <v-icon left>mdi-lock</v-icon>
                                Logout
                            </v-btn>
                        </div>
                    </template>

            </v-navigation-drawer>
        </v-card>

        <!-- Memanggil component alert -->
        <alert />

        <!-- Komponen Search -->
        <keep-alive>
        <v-dialog v-model="dialog" 
        fullscreen 
        hide-overlay
        transition="scale-transition">
            <component :is="currentComponent" 
            @closed="setDialogStatus"></component>
        </v-dialog>
        </keep-alive>

        <!-- Konten dari Component -->
        <!-- Secara dinamis, akan berubah sesuai dengan halaman yang dibuka
        oleh pengguna -->
        <v-content>
            <v-container fluid>
                <v-slide-y-transition>
                <router-view>Isinya</router-view>
                </v-slide-y-transition>
                
            </v-container>
        </v-content>

        <!-- Footer -->
        <v-card>
            <v-footer absolute app>
                <v-card-text class="text-center">
                    &copy; {{new Date().getFullYear()}} - <strong>Vueshop</strong>
                </v-card-text>
            </v-footer>
        </v-card>

    </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'App',
    components: {
        Alert: () => import
        (/* webpackChunkName: "alert" */ '@/components/Alert.vue'),
        Search: () => import (/* alias search */ '@/components/Search.vue'),
        Login: () => import(/* alias login*/ '@/components/Login.vue'),
        Register: () => import (/* alias register */ '@/components/Register.vue'),
        Cart: () =>import (/* alias cart */ '@/components/Cart.vue')
    },
    data: () => ({
        drawer: false,
        // dialog: false,
        menus: [
            {title: 'Home', icon: 'mdi-home', route: '/'},
            {title: 'About', icon: 'mdi-account', route:'/about'},
        ],
        // guest: false,
    }),
    methods: {
        // closeDialog(value){
        //     this.dialog = value
        // },
        ...mapActions ({
            setDialogStatus : 'dialog/setStatus',
            setDialogComponent : 'dialog/setComponent',
            setAuth: 'auth/set',
            setAlert : 'alert/set',
        }),
        logout(){
            let config = {
                headers: {
                    'Authorization' : 'Bearer ' + this.user.api_token,
                }
            }
            this.axios.post('/logout', {}, config)
            .then(() => {
                this.setAuth({}) //kosongkan auth ketika logout
                this.setAlert({
                    status: true,
                    color: 'success',
                    text: 'Logout succesfully',
                })
            })
            .catch((error) => {
                let{data} = error.response
                this.setAlert({
                    status: true,
                    color: 'error',
                    text: data.message,
                })
            })
        }
    },
    //computed = properti yang akan selalu dimonitor perubahannya
  computed: {
    //memeriksa apakah halaman ini Home atau bukan
    isHome(){
      return (this.$route.path === '/')
    },
    ...mapGetters({
        countCart   : 'cart/count', //mengakses getters count pada file cart.js
        guest       : 'auth/guest',
        user        : 'auth/user',
        dialogStatus : 'dialog/status',
        currentComponent : 'dialog/component',
    }),
    dialog : {
        get(){
            return this.dialogStatus
        },
        set(value){
            return this.setDialogStatus(value)
        }
    }
  },
};
</script>