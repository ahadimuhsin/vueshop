<template>
    <v-card>
        <v-toolbar dark color="primary">
            <v-btn icon dark @click="close">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>

        <v-divider></v-divider>

        <v-container fluid>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field 
                v-model="email" 
                :rules="emailRules"
                required 
                append-icon="mdi-email"
                placeholder="Email">
                </v-text-field>
                <v-text-field
                v-model="password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passwordRules"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Password"
                hint="Minimal 6 karakter"
                counter
                @click:append="showPassword = !showPassword">
                </v-text-field>

                <div class="text-xs-center">
                    <v-btn color="accent lightn-1"
                    :disabled="!valid"
                    @click="submit">
                    Login
                        <v-icon right dark>mdi-lock-open</v-icon>
                    </v-btn>
                </div>
            </v-form>
        </v-container>
    </v-card>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    name: 'login',
    data (){
        return {
            valid: true,
            email: '',
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
        }
    },

    computed: {
        ...mapGetters({
            user: 'auth/user',
            token: 'auth/token',
            prevUrl : 'prevUrl'
        })
    },

    methods: {
        ...mapActions({
            setAlert: 'alert/set',
            setAuth: 'auth/set',
            setToken: 'auth/setToken'
        }),
        submit(){
            //jika form validasi lolos
            if(this.$refs.form.validate()){
                let formData = {
                    'email': this.email,
                    'password' : this.password
                }
                this.axios.post('/login', formData)
                .then((response) => {
                    console.log(response)
                    let {data} = response.data
                    let token = response.data.token
                    this.setAuth(data)
                    console.log(token)
                    this.setToken(token)
                    if(this.user.id > 0)
                    {
                        this.setAlert({
                            status: true,
                            color: 'success',
                            text: 'Login Berhasil'
                        })
                        //kembali ke halaman sebelum login
                        if(this.prevUrl.length > 0){
                            this.$router.push(this.prevUrl)
                        }
                        this.close()
                    }
                    else {
                        this.setAlert({
                            status: true,
                            color: 'error',
                            text: 'Email/Password Salah'
                        })
                    }
                })
                .catch((error) => {
                    // let responses = error.response
                    // this.setAlert({
                    //     status: true,
                    //     text: responses.data.message,
                    //     color: 'error'
                    // })
                    console.log(error)
                })
            }
        },
        close(){
            this.$emit('closed', false)
        }
    }
}
</script>