import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Home from '@/components/Home'
import CreateProject from '@/components/Project/CreateProject'
import Projects from '@/components/Project/Projects'
import Project from '@/components/Project/Project'
import Hackers from '@/components/User/Hackers'
import Profile from '@/components/User/Profile'
// import Signin from '@/components/User/Signin'
import Signup from '@/components/User/Signup'
import AlertCmp from '@/components/Shared/Alert'
// import axios from 'axios'
import { AuthGuard } from './auth-guard'

Vue.component('app-alert', AlertCmp)


const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  // scrollBehavior: () => ({ x: 0, y: 0 }),
  routes: [
     {
      path: '/', 
      name: 'Home',
      component: Home
    },
    {
      path: '/project/new',
      name: 'CreateProject',
      component: CreateProject,
      beforeEnter: AuthGuard
    },
    {
      path: '/project/:id',
      name: 'Project',
      props: true,
      component: Project
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects
    },
    {
      path: '/hackers',
      name: 'Hackers',
      component: Hackers
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '*',
      component: Home,
    },
  ] 
})




export default router
