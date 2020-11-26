import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

Vue.use(VueRouter)

import Home from './components/Home'
import Profile from './components/Profile'


const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/profile', component: Profile },
    { path: '*', component: Home },
  ] 
})

//! this is probably wrong
router.beforeEach((to, from, next) => {
  // store.dispatch('fetchProfile');
  if (to.fullPath === '/users') {
    if (!store.state.user.loggedIn) {
      next('/login');
    }
  }
  if (to.fullPath === '/login') {
    if (store.state.user.loggedIn) {
      next('/profile');
    }
  }
  next();
})

export default router