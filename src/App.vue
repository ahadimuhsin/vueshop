<template>
  <v-app>
    <!-- Header Home -->
    <v-app-bar app color="dark" dark extended dense v-if="isHome">
      <!-- Ketika ditekan, menu akan membesar/mengecil -->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"> </v-app-bar-nav-icon>

      <v-toolbar-title>{{ appName }}</v-toolbar-title>
      <v-text-field
        slot="extension"
        hide-details
        append-icon="mdi-microphone"
        flat
        label="Search"
        prepend-inner-icon="mdi-magnify"
        solo-inverted
        @click="setDialogComponent('search')"
      >
      </v-text-field>
      <!-- Pemisah Konten -->
      <v-spacer></v-spacer>

      <!-- Icon Basket -->
      <v-btn icon to="/about" @click="setDialogComponent('cart')">
        <v-badge color="orange" overlap>
          <template v-slot:badge v-if="countCart > 0">
            <span>{{ countCart }}</span>
          </template>
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>

    <!-- Header Child -->
    <v-app-bar app color="dark" dark v-else>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"> </v-app-bar-nav-icon>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
      <v-spacer></v-spacer>

      <!-- Icon Basket-->
      <v-btn icon to="/about" @click="setDialogComponent('cart')">
        <v-badge color="orange" overlap>
          <template v-slot:badge v-if="countCart > 0">
            <span>{{ countCart }}</span>
          </template>
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>
    <v-card>
      <!-- Side Menu -->
      <v-navigation-drawer app v-model="drawer">
          <!-- Tampilkan tombol login dan register jika guest bernilai true -->
          <div class="pa-2" v-if="guest">
            <v-btn
              block
              color="primary"
              class="mb-1"
              @click="setDialogComponent('login')"
            >
              <v-icon left>mdi-lock</v-icon>
              Login
            </v-btn>
            <v-btn
              block
              color="success"
              @click="setDialogComponent('register')"
            >
              <v-icon left>mdi-account</v-icon>
              Register
            </v-btn>
          </div>
          <!-- Menampilkan Avatar -->
          <v-list-item v-if="!guest">
            <!-- Jika belum login, jangan ditampilkan-->
            <v-list-item-avatar>
              <v-img :src="getImage('/' + user.avatar)"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ user.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <!-- Menampilkan Daftar Menu dan Icon -->
          <v-list shaped>
            <template v-for="(item, index) in menus">
              <v-list-item
              :key="`menu-`+index"
              :to="item.route"
              v-if="!item.auth || (item.auth && !guest)">
              <v-icon left>{{item.icon}}</v-icon>
              <v-list-item-content>
                <v-list-item-title>{{item.title}}</v-list-item-title>
              </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>

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
    <alert></alert>

    <keep-alive>
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <component :is="currentComponent" @closed="setDialogStatus"></component>
      </v-dialog>
    </keep-alive>

    <!-- Content -->
    <v-main>
      <v-container fluid>
        <v-fade-transition>
          <router-view></router-view>
        </v-fade-transition>
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-card>
      <v-footer absolute app>
        <v-card-text class="text-center">
          &copy; {{ new Date().getFullYear() }} - <strong>Vueshop</strong>
        </v-card-text>
      </v-footer>
    </v-card>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "App",
  components: {
    Alert: () => import(/* komponen alert */ "@/components/Alert.vue"),
    Search: () => import(/* komponent search*/ "@/components/Search.vue"),
    Login: () => import(/* komponen login */ "@/components/Login.vue"),
    Register: () => import(/* komponen register */ "@/components/Register.vue"),
    Cart: () => import(/* komponen cart */ "@/components/Cart.vue"),
  },
  data: () => ({
    drawer: false,
    menus: [
      { 
        title: "Home", 
        icon: "mdi-home", 
        route: "/" 
      },
      {
        title: "Profile",
        icon: "mdi-account",
        route: "/profile",
        auth: true
      },
      {
        title: "My Order",
        icon: "mdi-shopping",
        route: "/my-order",
        auth: true
      },
      { 
        title: "About", 
        icon: "mdi-help-box", 
        route: "/about" 
      },
    ],
    // guest: true,
  }),
  methods: {
    ...mapActions({
      setDialogStatus: "dialog/setStatus",
      setDialogComponent: "dialog/setComponent",
      setAuth: "auth/set",
      setToken: "auth/setToken",
      setAlert: "alert/set",
    }),
    //fungsi logout
    logout() {
      console.log(this.token);
      let config = {
        headers: {
          Authorization: "Bearer " + this.token,
        },
      };
      this.axios
        .post("/logout", {}, config)
        .then(() => {
          this.setAuth({}); //kosongkan auth ketika logout
          this.setToken(""); //kosongkan token ketika logout
          this.setAlert({
            status: true,
            color: "success",
            text: "Logout sukses",
          });
        })
        .catch((error) => {
          let { data } = error.response;
          this.setAlert({
            status: true,
            color: "error",
            text: data.message,
          });
        });
    },
  },
  computed: {
    isHome() {
      return this.$route.path === "/";
    },
    //ambil getters dari state
    ...mapGetters({
      countCart: "cart/count",
      guest: "auth/guest",
      user: "auth/user",
      token: "auth/token",
      dialogStatus: "dialog/status",
      currentComponent: "dialog/component",
    }),
    dialog: {
      get() {
        return this.dialogStatus;
      },
      set(value) {
        this.setDialogStatus(value);
      },
    },
  },
};
</script>