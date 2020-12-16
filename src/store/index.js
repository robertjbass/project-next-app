import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import "firebase/auth";
import axios from "axios";
const db = firebase.firestore();
import { auth } from "../firebase";

const provider = new firebase.auth.GithubAuthProvider();

Vue.use(Vuex);

export const store = new Vuex.Store({
  /*************************
  //* #1 - STATE
  ************************** */
  state: {

    loadedProjects: [],
    hackers: [],
    user: null,
    loading: false,
    error: null,
    technologies: null,
    countdownInfo: {
      date: new Date()
    },
  },

  /*************************
  //* #2 - MUTATIONS
  ************************** */
  mutations: {

    //? MUTATION - Update Project
    updateProject(state, payload) {
      let projectUpdateObject = payload;
      console.log(projectUpdateObject);
      state.loadedProjects.forEach((project) => {
        if (project.id == state.loadedProjects.id) {
          console.log(project.projectId);
        }
      });
    },

    //? MUTATION - Create Project (New Project)
    createProject(state, payload) {
      let newPayload = { ...payload };
      state.loadedProjects.push(...newPayload);
    },

    //? MUTATION - Set User (Logged In User)
    setUser(state, payload) {
      state.user = payload;
    },

    //? MUTATION - Set Loading State
    setLoading(state, payload) {
      state.loading = payload;
    },
    
    //? MUTATION - Update User Following Array
    updateUserFollowingArray(state, payload) {
      let { newFollowedProjectId, userDocumentId, currentUserProjects } = payload
      console.log(newFollowedProjectId,userDocumentId, currentUserProjects)
      state.user.projects.push(newFollowedProjectId)
    },
    
    //? MUTATION - Update User Following Array Unfollow Project
    updateUserFollowingArrayUnfollow(state, payload) {
      const followedProjects = state.user.projects
      followedProjects.splice(followedProjects.findIndex(project => project.id === payload), 1)
    },

    //? MUTATION - Set Error (Open Modal)
    setError(state, payload) {
      state.error = payload;
    },

    //? MUTATION - Clear Error (Close Modal)
    clearError(state) {
      state.error = null;
    },

    //? MUTATION - Set Available Technologies
    setTechnologies(state, payload) {
      state.technologies = payload;
    },

    //? MUTATION - Set Loaded Projects
    setLoadedProjects(state, payload) {
      state.loadedProjects = payload;
    },

    //? MUTATION - Set Hackers
    setHackers(state, payload) {
      state.hackers = payload;
    },
  },

  /*************************
  //* #3 - ACTIONS
  ************************** */
  actions: {

    //? ACTION - Follow Project
    followProject({ commit, getters }, payload) {
      commit('setLoading', true)
      let userProjects = []
      let userDocId
      const currentUser = getters.user
      console.log(currentUser)
      let userDocRef = db.collection('users')
      userDocRef.get().then((doc) => {
        doc.forEach((user) => {
          if (user.data().id == currentUser.id) {
            userDocId = user.id
            userProjects = user.data().projects
            if (userProjects.findIndex(project => payload === project) >= 0) {
              console.log("project ID already exists in projects array")
            } else {
              userProjects.push(payload);
              // following = user.data().projects
            }
            console.log(userProjects)
          }
        });
      }).then(() => {
        // console.log(userDocId)
        console.log({ userProjects: currentUser.projects, payload }) 
        if (currentUser.projects.length !== 0) {
          if (currentUser.projects.findIndex(project => payload === project) >= 0) {
            console.log("project ID already exists")
            return
          }
        } else {
          console.log("Project ID did not exist, adding")
          db.collection('users').doc(userDocId).update({ 
            // followedProjects: userProjects
            projects: userProjects
          })
          commit("updateUserFollowingArray", {newFollowedProjectId: payload, userDocumentId: userDocId, currentUserProjects: userProjects})
        }
        console.log({id: payload, fbKey: userDocId, userProjects})
        commit("setLoading", false)
      }).catch(error => {
        console.error(error)
        commit("setLoading", false)
      })
      // console.log(payload)
      // console.log(following)
    },

    //? ACTION - Unfollow Project
    unfollowProject({ commit, getters }, payload) {
      console.log("UNFOLLOW")
      commit("setLoading", true)
      let userProjects = []
      const user = getters.user
      let userDocId
      // console.log(user, payload)
      let userDocRef = db.collection('users')
      // console.log(userDocRef)
      userDocRef.get().then((doc) => {
        doc.forEach((eachUser) => {
          if (eachUser.data().id == user.id) {
            userProjects = eachUser.data().projects
            userDocId = eachUser.id
            // console.log(eachUser.data())
            if (userProjects.findIndex(project => payload === project) >= 0) {
              console.log("project ID exists in projects array")
              userProjects.pop(payload);
            } else {
              console.log("project ID doesn't exist in projects array")
            }
            console.log(userProjects)
            db.collection('users').doc(userDocId).update({ 
            projects: userProjects
            // followedProjects: userProjects
          })
          commit("updateUserFollowingArrayUnfollow", payload)
          }
        });
      })
      commit("setLoading", false)
    },

    //? ACTION - Load Hackers
    loadHackers({ commit }) {
      const hackersRef = db.collection("users");
      const query = hackersRef;
      query.onSnapshot((hacker) => {
        const hackers = [];
        hacker.forEach((doc) => {
          hacker = { id: doc.id, ...doc.data() };
          hackers.push(hacker);
        });
        // console.log(...hackers);
        commit("setHackers", hackers);
      });
    },

    //? ACTION - SIGN USER UP
    signUserUp({ commit }) {
      commit("setLoading", true);
      auth
        .signInWithPopup(provider)
        .then((ghUser) => {
          commit("setLoading", false);
          commit("clearError");
          const user = ghUser.user;
          const operationType = ghUser.operationType;
          const signInMethod = ghUser.credential.signInMethod;
          const additionalUserInfo = ghUser.additionalUserInfo;
          const {
            isNewUser,
            profile,
            providerId,
            username,
          } = additionalUserInfo;
          const {
            avatar_url,
            bio,
            blog,
            company,
            created_at,
            email,
            events_url,
            followers,
            followers_url,
            following,
            following_url,
            gists_url,
            gravatar_id,
            hireable,
            html_url,
            id,
            location,
            login,
            name,
            node_id,
            organizations_url,
            public_gists,
            public_repos,
            received_events_url,
            repos_url,
            site_admin,
            starred_url,
            subscriptions_url,
            twitter_username,
            type,
            updated_at,
            url,
          } = profile;
          const {
            uid,
            displayName,
            emailVerified,
            isAnonymous,
            phoneNumber,
            photoURL,
          } = user;
          const userEmail = user.email;
          const userData = {
            id: uid,
            githubId: id,
            projects: [],
            userEmail,
            isNewUser,
            operationType,
            displayName,
            emailVerified,
            isAnonymous,
            phoneNumber,
            photoURL,
            avatar_url,
            bio,
            blog,
            company,
            created_at,
            email,
            events_url,
            followers,
            followers_url,
            following,
            following_url,
            gists_url,
            gravatar_id,
            hireable,
            html_url,
            location,
            login,
            name,
            node_id,
            organizations_url,
            public_gists,
            public_repos,
            received_events_url,
            repos_url,
            site_admin,
            starred_url,
            subscriptions_url,
            twitter_username,
            type,
            updated_at,
            url,
            providerId,
            username,
            signInMethod,
          };
          commit("setUser", userData);
          if (isNewUser) {
            let url = "https://hooks.zapier.com/hooks/catch/6992427/oegd4e1";
            axios
              .post(url, userEmail)
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.error(err);
              });
            db.collection("users")
              .add(userData)
              .then((data) => {
                console.log(data.id);
              })
              .catch((error) => {
                console.error(error);
              });
          }
        })
        .catch((error) => {
          commit("setLoading", false);
          commit("setError", error);
          console.error(error);
        });
    },

    //? ACTION - AUTO SIGN IN
    autoSignIn({ commit }, payload) {
      let usersRef = db.collection("users");
      usersRef.get().then((doc) => {
        doc.forEach((user) => {
          if (user.data().id == payload.uid) {
            // todo - add projects
            // commit("setUser", { ...user.data(), projects: [] });
            commit("setUser", { ...user.data() });
          }
        });
      });
    },
    signOut({ commit }) {
      auth
        .signOut()
        .then(() => {
          commit("setUser", null);
        })
        .catch((error) => {
          console.error(error);
        });
    },


    //? ACTION - LOAD PROJECTS
    loadProjects({ commit }) {
      commit("setLoading", true);
      const projectsRef = db.collection("projects");
      const query = projectsRef.where("title", "!=", null);
      query.onSnapshot((project) => {
        const projects = [];
        project.forEach((doc) => {
          projects.push({ ...doc.data(), id: doc.id });
        });
        commit("setLoadedProjects", projects);
        commit("setLoading", false);
      });
    },

    //? ACTION - CREATE PROJECTS
    createProject({ commit, getters }, payload) {
      let project = {
        title: payload.projectName,
        imageUrl: "",
        description: payload.summary,
        technologies: payload.anticipatedTechnologies,
        githubRepo: payload.githubRepo,
        productPage: payload.productPage,
        created: payload.created,
        goals: payload.goals,
        projectDuration: payload.projectDuration,
        userId: this.state.user.id,
        name: this.state.user.name,
        username: this.state.user.login,
        emailAddress: this.state.user.email,
        creatorId: getters.user.id,
      };
      let key;
      let ext;
      let filename;
      let storage = firebase.storage();
      let storageRef;

      db.collection("projects")
        .add(project)
        .then((data) => {
          key = data.id;
          return key;
        })
        .then((key) => {
          filename = payload.image.name;
          ext = filename.split(".")[filename.split(".").length - 1];
          storageRef = storage.ref(`projects/${key}.${ext}`).put(payload.image);
          console.log({ storageRef });
        })
        .then(() => {
          let projectsRef = storage.ref("projects");
          let imageRef = projectsRef.child(`${key}.${ext}`);
          let path = imageRef.fullPath;
          let urlRef = storage.refFromURL(
            `gs://project-next-app.appspot.com/${path}`
          );
          console.log({ projectsRef, imageRef, path });
          storageRef.on(
            "state changed",
            function progress(snapshot) {
              console.log(snapshot);
              let percentage =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(percentage);
            },

            function error(err) {
              console.error(err);
            },

            async function complete() {
              console.log("complete");
              let imageUrl = urlRef.getDownloadURL();
              const imageUrl_1 = await imageUrl;
              db.collection("projects")
                .doc(key)
                .update({ imageUrl: imageUrl_1 });
              commit("createProject", {
                ...project,
                imageUrl: imageUrl_1,
                id: key,
              });
            }
          );
        })
        .catch((error) => {
          console.error(error);
        });
    },

    //? ACTION - UPDATE PROJECT
    updateProject({ commit }, payload) {
      let { projectId, updatedProject, userId } = payload;
      let {
        description,
        githubRepo,
        goals,
        imageUrl,
        productPage,
        projectDuration,
        technologies,
        title,
      } = updatedProject;

      let project = {
        description,
        githubRepo,
        goals,
        imageUrl,
        productPage,
        projectDuration,
        technologies,
        title,
      };
      let updateProjectRef = db.collection("projects").doc(projectId);
      return updateProjectRef
        .update({ ...project, id: userId })
        .then((data) => {
          console.log({ data });
          commit("updateProject", { ...project, projectId });
        })
        .catch((error) => {
          console.error(error);
        });
    },

    //? ACTION - UPDATE PROJECT (WITH IMAGE)
    updateProjectWithImage({ commit }, payload) {
      if (payload.imageUpdated) {
        console.log("new image provided");
      }
      let ext;
      let filename;
      let storage = firebase.storage();
      let storageRef;
      let { updatedProject, projectId } = payload;
      let key = projectId;
      let {
        title,
        description,
        technologies,
        githubRepo,
        productPage,
        goals,
        imageRaw,
        projectDuration,
      } = updatedProject;
      filename = imageRaw.name;
      ext = filename.split(".")[filename.split(".").length - 1];
      storageRef = storage.ref(`projects/${key}.${ext}`).put(imageRaw);
      let project = {
        title: title,
        imageUrl: "", // todo - "",
        description: description,
        technologies: technologies,
        githubRepo: githubRepo,
        productPage: productPage,
        goals: goals,
        projectDuration: projectDuration,
      };
      let projectsRef = storage.ref("projects");
      let imageRef = projectsRef.child(`${key}.${ext}`);
      let path = imageRef.fullPath;
      let urlRef = storage.refFromURL(
        `gs://project-next-app.appspot.com/${path}`
      );
      storageRef.on(
        "state changed",
        function progress(snapshot) {
          let percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(percentage);
        },

        function error(err) {
          console.error(err);
        },

        async function complete() {
          console.log("complete");
          let imageUrl = urlRef.getDownloadURL();
          project.imageUrl = await imageUrl;
          db.collection("projects")
            .doc(key)
            .update(project)
            .then(() => {
              commit("updateProject", {
                project,
              });
            })
            .catch((error) => {
              console.error(error);
            });
        }
      );
    },

    //? ACTION - CLEAR ERROR
    clearError({ commit }) {
      commit("clearError");
    },

    //? ACTION - SET TECHNOLOGIES
    setTechnologies({ commit }) {
      let technologies = [];
      let technologyUrl = `https://v1.nocodeapi.com/bbass/airtable/OWBByjdlNVhiKRiR?tableName=Technologies&view=All&perPage=500&sortBy=Technology`;
      axios
        .get(technologyUrl)
        .then((res) => {
          technologies = [];
          res.data.records.forEach((techObject) => {
            technologies.push(techObject.fields.Technology);
          });
          commit("setTechnologies", technologies);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },

  /*************************
  //* #4 - GETTERS
  ************************** */
  getters: {
    
    //? GETTER - GET Loaded Projects, (sorted by end date)
    loadedProjects(state) {
      return state.loadedProjects.sort((projectA, projectB) => {
        return projectA.endDate > projectB.endDate;
      });
    },

    //? GETTER - GET Featured Projects (Just the 3 most recent projects at the moment)
    featuredProjects(getters) {
      return getters.loadedProjects.slice(0, 3);
    },

    //? GETTER - GET Featured Projects (Top 6 most recent)
    featuredExtended(getters) {
      return getters.loadedProjects.slice(0, 6);
    },

    //? GETTER - GET Loaded Project - Single Project by Project ID
    loadedProject(state) {
      return (projectId) => {
        return state.loadedProjects.find((project) => {
          return project.id === projectId;
        });
      };
    },

    //? GETTER - GET Logged In User Data
    user(state) {
      return state.user;
    },

    //? GETTER - GET Loading State (Global)
    loading(state) {
      return state.loading;
    },

    //? GETTER - GET Error Modal state
    error(state) {
      return state.error;
    },

    //? GETTER - GET Technologies (All Available)
    technologies(state) {
      return state.technologies;
    },

    //? GETTER - GET Hackers - Users (Aside from logged in user)
    hackers(state) {
      return state.hackers;
    },
  },
});
