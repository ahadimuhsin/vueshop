<template>
    <div>
        <v-subheader>Your Profile</v-subheader>
        <v-card flat>
            <v-container>
                <v-simple-table>
                    <tbody>
                        <!-- Menampilkan data2 user -->
                        <tr v-for="(value, key) in user" :key="key">
                            <td>{{ key }}</td>
                            <td>{{ value }}</td>
                        </tr>
                    </tbody>
                </v-simple-table>
            </v-container>
        </v-card>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(
            { 'user' : 'auth/user' 
            }
        ),
    }
}
</script>