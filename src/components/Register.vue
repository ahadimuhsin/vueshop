<template>
<!-- Membuat Card -->
    <v-card>
        <!-- Membuat Toolbar -->
        <v-toolbar dark color="primary">
            <v-btn icon dark @click.native="close">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <!-- Isi dari component, berupa form -->
        <v-container fluid>
            <v-form ref="form" v-model="valid" lazy-validation>
                <!-- Form Name -->
                <v-text-field v-model="name"
                :rules="nameRules"
                :counter="255"
                label="Name"
                required
                append-icon="mdi-user"
                ></v-text-field>

                <!-- Form Email -->
                <v-text-field v-model="email" 
                :rules="emailRules"
                label="Email" 
                required 
                append-icon="mdi-email">
                </v-text-field>

                <!-- Form Password -->
                <v-text-field v-model="password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passwordRules"
                :type="showPassword ? 'text' : 'password'"
                label="Password"
                hint="At least 6 characters"
                counter
                @click:append="showPassword = !showPassword">
                </v-text-field>

                <!-- Checkbox -->
                <v-checkbox v-model="checkbox"
                :rules="[v => !!v || 'You must agree to continue!']"
                label = "Do you agree with our Privacy Policy?"
                required></v-checkbox>

                <!-- Button submit -->
                <v-btn color='accent lighten-1'
                :disabled="!valid"
                @click="submit">
                Register
                <v-icon right dark>mdi-account-plus</v-icon>
                </v-btn>

                <!-- Button reset form -->
                <v-btn @click="clear">
                    Reset
                    <v-icon right dark>mdi-lock-reset</v-icon>
                </v-btn>
            </v-form>
        </v-container>
    </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'register',
    data (){
        return {
            valid: true,
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 255) || 'Name must be less than 255'
            ],
            email: '',
            emailRules: [
              v => !!v || 'Email is required',
              v => /([a-zA-Z0-9_]{1,})(@)([a-zA-Z0-9_]{2,}).([a-zA-Z0-9_]{2,})+/.test(v) || 'E-mail must be valid',
            ],
            showPassword: false,
            password: '',
            passwordRules: [
                v => !!v || 'Password required',
                v => (v && v.length >= 6) || 'Min 6 characters',
            ],
            checkbox: false,
        }
    },
    computed: {
        ...mapGetters({
            user: 'auth/user',
        }),
    },
    methods: {
        ...mapActions({
            setAlert    : 'alert/set',
            setAuth     : 'auth/set',
        }),
        submit(){
            // Data yang dikirim dari form, akan diteruskan ke endpoint
            //register, jika data benar, langsung otomatis login
            if (this.$refs.form.validate()){
                let formData = new FormData()
                formData.set('name', this.name)
                formData.set('email', this.email)
                formData.set('password', this.password)
                this.axios.post('/register', formData)
                    .then((response) => {
                        let { data } = response.data
                        this.setAuth(data)
                        this.setAlert({
                            status: true,
                            color: 'success',
                            text: 'Register success',
                        })
                        this.close()
                    })
                    .catch((error) => {
                        let { data } = error.response.data
                        this.setAlert({
                            status: true,
                            color: 'error',
                            text: data.message,
                        })
                    })
            }
        },
        close(){
            this.$emit('closed', false)
        },
        clear(){
            this.$refs.form.reset()
        }
    }
}
</script>