import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: null,
    },
  },
  getters: {
    user(state){
      return state.user
    },
    // profiles(state){
    //   return state.profiles
    // }
    // profile(state){
    //   return state.profile
    // }
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    // SET_PROFILE(state, profile) {
    //   state.profile = profile
    // },
    // SET_ALL_USERS(state, profiles) {
    //   state.profiles = profiles
    // }
  },
  actions: {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          // displayName: user.displayName,
          // email: user.email,
          // uid: user.uid,
          displayName: user.displayName,
          userEmail: user.userEmail,
          photoURL: user.photoURL,
          uid: user.uid
        });
      } else {
        commit("SET_USER", null);
      }
    },
    // fetchProfile({ commit }, profile) {
    //   console.table('value sent to vuex', {profile})
    //     commit("SET_PROFILE",
    //       {profile: profile}
    //   )
    // },
    // fetchAllProfiles({ commit }, profiles) {
    //   console.table('value sent to vuex', {profiles})
    //     commit("SET_ALL_USERS",
    //       {profile: profile}
    //   )
    // }
  }
});