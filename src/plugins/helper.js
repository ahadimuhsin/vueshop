//daftarkan komponen image sebagai global method
"use strict"
import Vue from 'vue'
const Helper = {
    install(Vue){
        Vue.prototype.appName = process.env.VUE_APP_NAME
        Vue.prototype.getImage = function (image){
            if(image != null && image.length>0){
                return "http://localhost/larashop-api/public/image"+image
            }
            return "img/not-available.png"
        }
    }
}
Vue.use(Helper)