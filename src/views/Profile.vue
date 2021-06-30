<template>
  <div>
    <v-subheader>Profile Saya</v-subheader>
    <v-card flat>
      <v-container class="text-center">
        <v-flex class="mb-4">
          <v-avatar size="100" class="mr-4">
            <v-img :src="getImage('/' + user.avatar)" alt="photo profile" align-center>
            </v-img>
          </v-avatar>
        </v-flex>
        <h3>
          {{ user.name }} <br>
          {{ user.email }} <br>
          {{ city_name }}
        </h3>
        
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data(){
    return {
      city_name: ''
    }
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
      cities: "region/cities"
    }),
    setCity(){
      // let city_id = this.user.city_id
      // let city_name = this.city_name
      console.log(this.cities)
      return this.cities.filter((city) => {
        if(city.id == this.user.city_id){
          return city
        }
      })
    }
  },
  created(){
    this.getCityName()
  },
  methods: {
    getCityName(){
      this.city_name = this.setCity[0].city
      console.log(this.setCity[0].city)
    }
    
  }
  // created(){
  //   let city_id = this.user.city_id
  //     // let city_name = this.city_name
  //     console.log(this.cities)
  //     return this.cities.filter((city) => {
  //       if(city.id == city_id){
  //         return city.city
  //       }
  //     })
  //   },
  // methods: {
  //   checkCityId(id){
  //     if(this.user.city_id == this.cities.id){
  //       return cities.name
  //     }
  //   }
  // }
};
</script>
