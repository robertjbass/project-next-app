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
  #2 - MUTATIONS
  ************************** */
  mutations: {
    updateProject(state, payload) {
      let projectUpdateObject = payload;
      console.log(projectUpdateObject);
      state.loadedProjects.forEach((project) => {
        if (project.id == state.loadedProjects.id) {
          console.log(project.projectId);
        }
      });
    },
    createProject(state, payload) {
      let newPayload = { ...payload };
      state.loadedProjects.push(...newPayload);
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
    setTechnologies(state, payload) {
      state.technologies = payload;
    },
    setLoadedProjects(state, payload) {
      state.loadedProjects = payload;
    },
    setHackers(state, payload) {
      state.hackers = payload;
    },
  },

  /*************************
  #3 - ACTIONS
  ************************** */

  actions: {
    //* USERS (HACKERS)
    //! LOAD HACKERS
    loadHackers({ commit }) {
      const hackersRef = db.collection("users");
      const query = hackersRef;

      query.onSnapshot((hacker) => {
        const hackers = [];
        hacker.forEach((doc) => {
          hacker = { id: doc.id, ...doc.data() };
          hackers.push(hacker);
        });
        console.log(...hackers);
        commit("setHackers", hackers);
      });
    },

    //! SIGN USER UP
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
    autoSignIn({ commit }, payload) {
      let usersRef = db.collection("users");
      usersRef.get().then((doc) => {
        doc.forEach((user) => {
          if (user.data().id == payload.uid) {
            // todo - add projects
            commit("setUser", { ...user.data(), projects: [] });
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

    //* PROJECTS
    //! LOAD PROJECTS
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

    //! CREATE PROJECT
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

    //! MISC
    clearError({ commit }) {
      commit("clearError");
    },
    setTechnologies({ commit }) {
      let technologies = [];
      let technologyUrl = `https://v1.nocodeapi.com/bbass/airtable/OWBByjdlNVhiKRiR?tableName=Technologies&view=All&perPage=500&sortBy=Technology`;
      axios
        .get(technologyUrl)
        .then((res) => {
          technologies = [];
          // commit("setTechnologies", technologies);
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
  #4 - GETTERS
  ************************** */
  getters: {
    loadedProjects(state) {
      return state.loadedProjects.sort((projectA, projectB) => {
        return projectA.endDate > projectB.endDate;
        // return state.loadedProjects
      });
    },
    featuredProjects(getters) {
      return getters.loadedProjects.slice(0, 3);
    },
    featuredExtended(getters) {
      return getters.loadedProjects.slice(0, 6);
    },
    loadedProject(state) {
      return (projectId) => {
        return state.loadedProjects.find((project) => {
          return project.id === projectId;
        });
      };
    },
    user(state) {
      return state.user;
    },
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
    technologies(state) {
      return state.technologies;
    },
    hackers(state) {
      return state.hackers;
    },
  },
});
