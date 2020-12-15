import Vue from 'vue'
import vuetify from './plugins/vuetify';
import App from './App.vue'
import { firestorePlugin } from 'vuefire'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import markdown from './directives/markdown';
import firebase from 'firebase/app'
import 'firebase/auth'
import FollowProject from '@/components/Project/Follow/FollowProject.vue';

Vue.use(firestorePlugin)

Vue.filter('date', DateFilter)
Vue.directive('markdown', markdown)
Vue.component('app-project-follow-dialog', FollowProject)


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    if (this.technologies == [] || this.technologies == null || this.technologies == undefined) {
      this.$store.dispatch("setTechnologies");
    }
    this.$store.dispatch('loadProjects')
    this.$store.dispatch('loadHackers')
  },
  computed: {
    technologies() {
      return this.$store.getters.technologies;
    }
  },
}).$mount('#app')
