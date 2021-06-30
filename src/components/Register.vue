<template>
    <v-card>
        <v-toolbar dark color="primary">
            <v-btn icon dark @click.native="close">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>

        <v-divider></v-divider>

        <v-container fluid>
            <v-form ref="form" v-model="valid" lazy-validation>
                <!-- Name -->
                <v-text-field
                v-model="name"
                :rules="nameRules"
                :counter="255"
                placeholder="Nama"
                required
                label="Nama"
                append-icon="mdi-account">
                </v-text-field>
                <!-- Username -->
                <v-text-field
                v-model="username"
                :rules="unameRules"
                :counter="30"
                placeholder="Username"
                required
                label="Username"
                append-icon="mdi-account">
                </v-text-field>
                <!-- Email -->
                <v-text-field
                v-model="email"
                :rules="emailRules"
                placeholder="Email"
                required
                label="Email"
                append-icon="mdi-email">
                </v-text-field>
                <!-- Password -->
                <v-text-field
                v-model="password"
                :rules="passwordRules"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                required
                label="Password"
                placeholder="Password"
                hint="Minimal 6 karakter"
                counter
                @click:append="showPassword = !showPassword">
                </v-text-field>
                <!-- Password Confirmation -->
                <v-text-field
                v-model="passwordConfirmation"
                :rules="passwordConfRules"
                placeholder="Password Confirmation"
                hint="Harus sama dengan password"
                label="Konfirmasi Password"
                required
                type="password"
                >
                </v-text-field>
                <!-- Address -->
                <v-textarea 
                v-model="address"
                :rules="addressRules"
                append-icon="mdi-home"
                required
                placeholder="Alamat"
                label="Alamat"
                counter></v-textarea>
                <!-- Phone Number -->
                <v-text-field
                v-model="phone"
                :rules="phoneRules"
                append-icon="mdi-phone"
                required
                v-mask="'############'"
                label="Nomor Telepon"
                placeholder="Phone Number">
                </v-text-field>
                <!-- Avatar -->
                <v-file-input
                v-model="avatar"
                :rules="avatarRules"
                type="file"
                ref="file"
                prepend-icon="mdi-camera"
                label="Avatar"
                placeholder="Pilih Avatar"
                show-size
                accept="image/*"                
                >
                <!-- @change="checkSize()" -->
                </v-file-input>

                <!-- Submit Button -->
                <div class="text-cs-center">
                    <v-btn color="accent lighten-1"
                    :disabled="!valid"
                    @click="submit">
                    Register
                    <v-icon dark right>mdi-account-plus</v-icon>
                    </v-btn>

                    <!-- Clear Button -->
                    <v-btn @click="clear">
                        Reset
                        <v-icon dark right>mdi-lock-reset</v-icon>
                    </v-btn>
                </div>
            </v-form>
        </v-container>    
    </v-card>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
    name: 'register',
    data(){
        return {
            valid: true,
            size: '',
            name: '',
            nameRules: [
                v => !!v || 'Nama harus diisi',
                v => (v && v.length <=255) || 'Nama harus kurang dari 255 karakter'
            ],
            username: '',
            unameRules: [
                v => !! v || 'Username harus diisi',
                v => (v && v.length >=4) || 'Username harus lebih dari 4 karakter',
                v => (v && v.length <=30) || 'Username harus kurang dari 30 karakter',
            ],
            email : '',
            emailRules: [
                v => !!v || 'E-mail harus diisi',
                v => /([a-zA-Z0-9_]{1,})(@)([a-zA-Z0-9_]{2,}).([a-zA-Z0-9_]{2,})+/.test(v) || 'Email harus valid'
            ],
            showPassword: false,
            password: '',
            passwordRules: [
                v => !!v || 'Password harus diisi',
                v => (v && v.length >= 6) || 'Password minimal 6 karakter'
            ],
            passwordConfirmation: '',
            passwordConfRules: [
                v => !!v || 'Konfrimasi Password harus diisi',
                v => (this.password === v) || 'Konfirmasi password harus sama dengan password'
            ],
            address: '',
            addressRules: [
                v => !!v || 'Alamat harus diisi',
                v => (v && v.length>=8) || 'Alamat minimal 8 karakter'
            ],
            phone: '',
            phoneRules: [
                v => !!v || 'Nomor Telepon harus diisi',
                v => (v && (v.length >=10 && v.length <=12)) || 'Nomor Telepon antara 10 sampai 12 digit'
            ],
            avatar: '',
            avatarRules: [
                v => (v && (v.size <= 2097152)) || 'Ukuran file harus kurang dari 2MB'
            ]
        }
    },
    computed: {
        ...mapGetters({
            user: 'auth/user',
            token: 'auth/token'
        }),
        
    },
    methods: {
        ...mapActions({
            setAlert: 'alert/set',
            setAuth: 'auth/set',
            setToken: 'auth/setToken'
        }),
        submit(){
            if (this.$refs.form.validate()){
                let formData = new FormData()
                formData.set('name', this.name)
                formData.set('username', this.username)
                formData.set('email', this.email)
                formData.set('password', this.password)
                formData.set('password_confirmation', this.passwordConfirmation)
                formData.set('address', this.address)
                formData.set('phone', this.phone)
                formData.set('avatar', this.avatar)     
                
                this.axios.post('/register', formData)
                .then((response) => {
                    let {data} = response.data
                    let token = response.data.token
                    this.setAuth(data)
                    console.log(token)
                    this.setToken(token)
                    this.setAlert({
                        status: true,
                        color: 'success',
                        text: 'Pendaftaran Berhasil!'
                    })
                    this.close()
                    })
                    .catch((error) => {
                        console.log(error)
                    })      
            }
        },
        close()
        {
            this.$emit('closed', false)
        },
        clear()
        {
            this.$refs.form.reset()
        }
    }
}
</script>