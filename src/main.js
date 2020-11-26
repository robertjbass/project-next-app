import Vue from 'vue'
import App from './App.vue'
import { firestorePlugin } from 'vuefire'
import VueRouter from 'vue-router'
import store from './store'

import Home from './components/Home'
import vuetify from './plugins/vuetify';
Vue.use(firestorePlugin)
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
  ]
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
