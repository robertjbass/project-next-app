import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: null,
    },
    profile: null
  },
  getters: {
    user(state){
      return state.user
    },
    profile(state){
      return state.profile
    }
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    SET_PROFILE(state, profile) {
      state.profile = profile
    }
  },
  actions: {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid
        });
      } else {
        commit("SET_USER", null);
      }
    },
    fetchProfile({ commit }, profile) {
      commit("SET_PROFILE", {
        profile: profile[0].fields,
          // active: profile[0].fields.active,
          // name: profile[0].fields.name,
          // email: profile[0].fields.email,
          // profilePicUrl: profile[0].fields.profilePicUrl,
          // profileSummary: profile[0].fields.profileSummary,
          // firebaseUid: profile[0].fields.firebaseUid
        // 
        // name: profile[0].fields.name,
        // active: profile[0].fields.active,
        // email: profile[0].fields.email,
        // profilePicUrl: profile[0].fields.profilePicUrl,
        // profileSummary: profile[0].fields.profileSummary,
        // firebaseUid: profile[0].fields.firebaseUid
      })
    }
  }
});