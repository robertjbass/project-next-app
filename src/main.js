import Vue from 'vue'
import App from './App.vue'
import { firestorePlugin } from 'vuefire'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'

import vuetify from './plugins/vuetify';
Vue.use(firestorePlugin)

Vue.filter('date', DateFilter)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
