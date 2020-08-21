<template>
    <v-card>
        <v-toolbar dark color="primary">
            <v-btn icon dark @click.native="close">
                <v-icon>mdi-close</v-icon>
            </v-btn>

            <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>

        <v-divider></v-divider>
        <!-- Container Form Login -->
        <v-container fluid>
            <v-form ref="form" v-model="valid" lazy-validation>
                <!-- Email -->
                <v-text-field v-model="email" :rules="emailRules"
                label="E-mail" required append-icon="mdi-email">
                </v-text-field>
                <!-- Password -->
                <v-text-field v-model="password" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passwordRules" :type="showPassword ? 'text' : 'password'"
                label ="Password" hint="At least 6 character" counter
                @click:append="ShowPassword = ! showPassword">
                </v-text-field>

                <div class="text-xs-center">
                    <v-btn color="accent lighten-1"
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
import {mapGetters, mapActions} from 'vuex'
export default {
    name: 'login',
    data(){
        return {
            valid: true,
            email : 'dare.damon@example.net',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /([a-zA-Z0-9_]{1,})(@)([a-zA-Z0-9_]{2,}).([a-zA-Z0-9_]{2,})+/.test(v) || 'E-mail must be valid',
            ],
            showPassword: false,
            password : '',
            passwordRules:[
                v => !!v || 'Password is required',
                v => (v && v.length >=6) || 'Min 6 characters',
            ],
        }
    },
    computed: {
        ...mapGetters({
            user : 'auth/user',
            prevUrl : 'prevUrl',
        }),
    },
    methods: {
        ...mapActions({
            setAlert : 'alert/set',
            setAuth : 'auth/set',
        }),
        submit(){
            if(this.$refs.form.validate()){
                let formData = {
                    'email' : this.email,
                    'password' : this.password
                }
                this.axios.post('/login', formData)
                .then((response) => {
                    let data_user = response.data.data
                    this.setAuth(data_user)
                    if(this.user.id_user>0){
                        this.setAlert({
                            status: true,
                            color : 'success',
                            text: 'Login Success',
                        })
                        //jika sebelumnya membuka halaman lain selain
                        //halaman login, akan kembali ke halaman itu
                        if(this.prevUrl.length>0){
                            this.$router.push(this.prevUrl)
                        }
                        this.close()
                    }
                    else {
                        this.setAlert({
                            status: true,
                            color : 'error',
                            text: 'Login Faield'
                        })
                    }
                })
                .catch((error) => {
                    let responses = error.response
                    this.setAlert({
                        status: true,
                        text : responses.data.message,
                        color: 'error',
                    })
                })
            }
        },
        close(){
            this.$emit('closed', false)
        }
    },
}
</script>