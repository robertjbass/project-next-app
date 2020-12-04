import Vue from 'vue'
import vuetify from './plugins/vuetify';
import App from './App.vue'
import { firestorePlugin } from 'vuefire'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
// import firebase from 'firebase/app'
// import 'firebase/auth'

Vue.use(firestorePlugin)

Vue.filter('date', DateFilter)



new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  // created() {
  // }
}).$mount('#app')
