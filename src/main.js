import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import * as firebase from 'firebase'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

Vue.config.productionTip = false  // Отрубаем сообщения

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>',
  created () {
    var config = {
      apiKey: 'AIzaSyAZgzWdB0armXXahap2ebn6hKBCEUm3HJs',
      authDomain: 'its-ads-daec4.firebaseapp.com',
      databaseURL: 'https://its-ads-daec4.firebaseio.com',
      projectId: 'its-ads-daec4',
      storageBucket: 'its-ads-daec4.appspot.com',
      messagingSenderId: '453198137215'
    }
    firebase.initializeApp(config)

    // firebase проверит localStorage на предмент состоявшегося логина
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })
    this.$store.dispatch('fetchAds')
  }
})
