import Vue from 'vue'
import Vuex from 'vuex'

import firebase from "firebase/app";
import "firebase/auth";


const provider = new firebase.auth.GithubAuthProvider();

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedProjects: [
      {
          id: "1",
          title: "UberTeleport",
          bgColor: "00f4f4",
          fontColor: "000",
          imageUrl: `https://dummyimage.com/600x400/00f4f4/000.png&text=UberTeleport`,
          username: "716green",
          description:
            "A teleporter sharing service where the owner of the teleporter beams you to your destination for ratings in the mobile app",
          technologies: [
            "JavaScript",
            "MariaDB",
            "Firebase",
            "Nginx",
            "Cloud Functions",
            "Vue.js",
        ],
          githubRepo: "github.com/a/b",
          productPage: "coda.io/@narro/abcdefg",
          startDate: '2021-01-20',
          endDate: '2021-12-01',
          goals: 'Learn Stuff',
          projectDuration: '7 Days'
        },
        {
          id: "2",
          title: "TierZooDaily",
          bgColor: "cc87fc",
          fontColor: "000",
          imageUrl:
            "https://dummyimage.com/600x400/cf78cf/000.png&text=TierZooDaily",
          username: "PotatoBug111",
          description:
            "An app that generates interesting animal videos every 24 hours.",
          technologies: ["C++", "GPT-3", "Tensorflow"],
          githubRepo: "github.com/a/b",
          productPage: "coda.io/@narro/abcdefg",
          startDate: '2021-01-20',
          endDate: '2021-12-02',
          goals: 'Learn Stuff',
          projectDuration: '7 Days'
        },
        {
          id: "3",
          title: "Pigma",
          bgColor: "5cf",
          fontColor: "fff",
          imageUrl: `https://dummyimage.com/600x400/5cf/fff.png&text=Pigma`,
          username: "WebMaster2021",
          description:
            "An app that allows you to decorate an augmented reality pig while it runs around your living room.",
          technologies: ["WebGL", "MongoDB", "Java"],
          githubRepo: "github.com/a/b",
          productPage: "coda.io/@narro/abcdefg",
          startDate: '2021-01-20',
          endDate: '2021-12-02',
          goals: 'Learn Stuff',
          projectDuration: '7 Days'
        },
        {
          id: "4",
          title: "Moonwalk Shoes",
          bgColor: "cc87fc",
          fontColor: "f1c",
          imageUrl:
          "https://dummyimage.com/600x400/cf78cf/fff.png&text=MoonwalkShoes",
          username: "Jackson5",
          description:
          "A marketplace for one of a kind dancing shoes inspired by the king of pop.",
          technologies: ["HTML", "CSS", "PHP"],
          githubRepo: "github.com/a/b",
          productPage: "coda.io/@narro/abcdefg",
          startDate: '2021-01-20',
          endDate: '2021-12-02',
          goals: 'Learn Stuff',
          projectDuration: '7 Days'
      }
    ],
    user: {
      id: null,
      projects: []
    }
  },
  mutations: {
    createProject(state, payload) {
      state.loadedProjects.push(payload)
    },
    setUser(state, payload) {
      state.user = payload
    }
  },  
  actions: {
    signUserUp({commit}) {
      firebase.auth().signInWithPopup(provider)
      .then((ghUser) => {
        console.log({ghUser})
        const user = ghUser.user
        const operationType = ghUser.operationType
        const credential = ghUser.credential
        const additionalUserInfo = ghUser.additionalUserInfo
        const { isNewUser, profile, providerId, username } = additionalUserInfo
        const { avatar_url, bio, blog, company, created_at, email, events_url, followers, followers_url, following, following_url, gists_url, gravitar_id, hireable, html_url, id, location, login, name, node_id, organization_url, public_gists, public_repos, received_events_url, repos_url, site_admin, starred_url, subscriptions_url, twitter_username, type, updated_at, url } = profile
        const { uid, displayName, emailVerified, isAnonymous, phoneNumber, photoURL } = user
        const userEmail = user.email
        console.log(operationType, credential, userEmail, isNewUser, profile, providerId, username, avatar_url, bio, blog, company, created_at, email, events_url, followers, followers_url, following, following_url, gists_url, gravitar_id, hireable, html_url, id, location, login, name, node_id, organization_url, public_gists, public_repos, received_events_url, repos_url, site_admin, starred_url, subscriptions_url, twitter_username, type, updated_at, url, uid, displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL )
        const newUser = {
            id: uid,
            projects: []
          }
          commit('setUser', newUser)
        }).catch(
          error => {
            console.log(error)
        }
      )
    },
    createProject({ commit }, payload) {
      const project = {
        id: this.state.loadedProjects.length + 1,
        title: payload.projectName,
        imageUrl: payload.imageUrl ? payload.imageUrl : `https://dummyimage.com/600x400/cf78cf/000.png&text=${payload.projectName}`,
        description: payload.summary,
        technologies: payload.anticipatedTechnologies,
        username: "", //todo
        githubRepo: payload.githubRepo,
        productPage: payload.productPage,
        emailAddress: "", //todo
        created: payload.created,
        goals: payload.goals,
        projectDuration: payload.projectDuration,
      }
      // Reach out to firebase and store it, get id from firebase, add to project
      commit('createProject', project)
    }
  },
  getters: {
    loadedProjects(state) {
      return state.loadedProjects.sort((projectA, projectB) => {
        return projectA.endDate > projectB.endDate
      })
    },
    featuredProjects(state, getters) {
      return getters.loadedProjects.slice(0,3)
    },
    loadedProject(state) {
      return (projectId) => {
        return state.loadedProjects.find((project) => {
          return project.id === projectId
        })
      }
    },
    user(state) {
      return state.user
    }
  }
})