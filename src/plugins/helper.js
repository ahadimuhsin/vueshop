"use strict"
import Vue from 'vue'
const Helper = {
    install(Vue){
        Vue.prototype.appName = process.env.VUE_APP_NAME
        Vue.prototype.getImage = function(image){
            if (image != null && image.length >0){
                return process.env.VUE_APP_IMAGE_URL + image
            }
            return 'https://img.pngio.com/lighting-and-home-furnishing-products-represented-by-bostrom-png-unavailable-300_300.png'
        }
    }
}

Vue.use(Helper)