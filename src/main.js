import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store'
import Vuetify from 'vuetify'
import BuyModal from './components/Shared/BuyModal'
import * as firebase from 'firebase'
import 'vuetify/dist/vuetify.min.css'
// import colors from 'vuetify/es5/util/colors'
import './stylus/main.styl'

Vue.use(Vuetify.install
  // {
  // theme: {
  //   primary: colors.red.darken1 // #E53935
  // }
// }
)
Vue.component('appBuyModal', BuyModal)

Vue.config.productionTip = false  // Отрубаем сообщения

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    const config = {
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
