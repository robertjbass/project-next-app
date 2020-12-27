import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import "firebase/auth";
const db = firebase.firestore();
import { auth } from "../firebase";
import axios from "axios";

const provider = new firebase.auth.GithubAuthProvider();

Vue.use(Vuex);

// todo - set loading where needed

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
    allTechnologies: null,
    countdownInfo: {
      date: new Date(),
    },
  },

  /*************************
  //* #2 - MUTATIONS
  ************************** */
  mutations: {
    //? MUTATION - Add Technology
    addTechnology(state, payload) {
      let {
        categories,
        dateUpdated,
        documentId,
        reviews,
        technology,
      } = payload;
      let { description, recommendation, useCase, userId, username } = reviews;
      let newRecommendation = {
        userId,
        username,
        description,
        useCase,
        recommendation,
      };
      state.technologies.push(technology);
      state.allTechnologies.forEach((tech) => {
        if (technology == tech.technology) {
          tech.categories = categories;
          tech.description = description;
          tech.id = documentId;
          tech.technology = technology;
          tech.updated = dateUpdated;
          tech.recommendation.push(newRecommendation);
        }
      });
    },

    //? MUTATION - Update Project
    updateProject(state, payload) {
      let projectUpdateObject = payload;
      // console.log(projectUpdateObject);
      state.loadedProjects.forEach((project) => {
        if (project.id == state.loadedProjects.id) {
          console.log(project.projectId, projectUpdateObject);
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
      let {
        newFollowedProjectId,
        userDocumentId,
        currentUserProjects,
      } = payload;
      console.log(newFollowedProjectId, userDocumentId, currentUserProjects);
      state.user.followedProjects.push(newFollowedProjectId);
    },

    //? MUTATION - Update User Following Array Unfollow Project
    updateUserFollowingArrayUnfollow(state, payload) {
      state.user.followedProjects = payload;
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
      // console.log(payload);
      let { technologies, allTechnologies } = payload;
      state.allTechnologies = allTechnologies;
      state.technologies = technologies;
    },

    //? MUTATION - Set Loaded Projects
    setLoadedProjects(state, payload) {
      state.loadedProjects = payload;
    },

    //? MUTATION - Set Hackers
    setHackers(state, payload) {
      state.hackers = payload;
    },

    //? MUTATION - Update User Profile
    updateUserProfile(state, payload) {
      state.user;
      let { name, company, username, email, location, bio, stack } = payload;
      // let { languages, frameworksAndLibraries, databases, hostingPlatforms, other, technologiesToLearn } = stack
      state.user.name = name;
      state.user.company = company;
      state.user.username = username;
      state.user.email = email;
      state.user.location = location;
      state.user.bio = bio;
      state.user.stack = stack;
    },

    //? MUTATION - Add Project Comments
    addComment(state, payload) {
      let { id, comment } = payload;
      // only the id needs to be logged, the comment is only for visual reference
      console.log(comment);
      state.loadedProjects.forEach((project) => {
        if (id == project.documentId) {
          console.log("match", id, project.documentId, project.title);
        } else {
          console.log("no match", id, project.documentId, project.title);
        }
      });
    },

    //? MUTATION - Update Airtable Tech Listing
    updateAirtableTech(state, payload) {
      let { params } = payload;
      let allTechnology = {
        id: params.id,
        technology: params.technology,
        categories: params.categories,
        description: params.description,
        updated: params.updated,
      };
      let technology = params.technology;
      state.technologies.push(technology);
      state.allTechnologies.push(allTechnology);
    },

    //? MUTATION - Set NEW Technology just added to Firestore
    // todo - this may no longer be in use - double check, technologies are now reactive with a listener
    addTechnologiesFromFirestore(state, payload) {
      let { newTechnology, newTechObject } = payload;
      if (newTechnology) {
        state.technologies.push(newTechObject.technology);
        state.allTechnologies.push(newTechObject);
      } else {
        console.log("Do nothing, addTechnologyReview instead");
      }
    },

    //? MUTATION - Update Single Technology - can also be used for general tech info modification
    // todo - this may no longer be in use - double check, technologies are now reactive with a listener
    addTechnologyReview(state, payload) {
      let { techWithReview, newTechnology } = payload;
      if (!newTechnology) {
        let {
          categories,
          dateModified,
          description,
          documentId,
          keywords,
          reviews,
          technology,
          urlSlug,
        } = payload;
        state.allTechnologies.forEach((tech) => {
          if (tech.documentId == documentId) {
            tech.categories = categories;
            tech.dateModified = dateModified;
            tech.description = description;
            tech.documentId = documentId;
            tech.keywords = keywords;
            tech.reviews = reviews;
            tech.technology = technology;
            tech.urlSlug = urlSlug;
          }
        });
      } else {
        // console.log(techWithReview);
        state.allTechnologies.push(techWithReview);
      }
    },
  },

  /*************************
  //* #3 - ACTIONS
  ************************** */
  actions: {
    //? ACTIONS: Technology Review from User
    addTechnologyReview({ commit, getters }, payload) {
      let {
        newTechnology,
        name,
        dateUpdated,
        techInfo,
        user,
        review,
      } = payload;
      let { documentId, keywords } = techInfo;
      let existingTechData = getters.loadedTechnology(documentId);
      let {
        categories,
        dateModified,
        description,
        reviews,
        technology,
        urlSlug,
      } = existingTechData;
      console.log(dateModified, " is the original date");
      console.log(newTechnology, " is not used currently");
      console.log(name, " not used");
      let { userId, username, avatar } = user;
      let { newDescription, useCase, recommendation } = review;

      reviews.unshift({
        date: dateUpdated,
        newDescription,
        useCase,
        recommendation,
        user: {
          userId,
          username,
          avatar,
        },
      });
      let techWithReview = {
        categories,
        dateModified: dateUpdated,
        description,
        documentId,
        keywords,
        reviews,
        technology,
        urlSlug,
      };
      let techRef = db.collection("technologies").doc(documentId);
      techRef.get().then((docSnapshot) => {
        if (docSnapshot.exists) {
          console.log("exists");
          db.collection("technologies")
            .doc(documentId)
            .update({ ...techWithReview });
        } else {
          console.log("new");
          db.collection("technologies")
            .doc(documentId)
            .set({ ...techWithReview });
        }
      });
      commit("addTechnologiesFromFirestore", { techWithReview, newTechnology });
    },

    //? ACTIONS: Add New Technology to Firestore (TEST ME)
    // addTechnologiesToFirestore({ commit }, payload) {
    addTechnologiesToFirestore({ commit }, payload) {
      // todo - figure this out, can't comment this out but also not using this
      console.log(commit)
      let {
        technology,
        categories,
        username,
        userId,
        avatar,
        dateModified,
        newTechnology,
      } = payload;

      let description = "";
      let reviews = [];

      let documentId = technology
        .split(" ")
        .join("")
        .split(".NET")
        .join("dotnet")
        .split(".")
        .join("")
        .split("-")
        .join("")
        .split("#")
        .join("sharp")
        .split("+")
        .join("p")
        .toLowerCase();

      let slug = documentId;

      let keyword = slug.includes("js")
        ? "javascript"
        : slug.includes("sql")
        ? "sql"
        : slug.includes("dotnet")
        ? "dotnet"
        : slug;

      if (newTechnology) {
        reviews.push({
          date: dateModified,
          newDescription: `New technology added by ${username}`,
          recommendation: "",
          useCase: "",
          user: {
            avatar,
            userId,
            username,
          },
        });
      }
      console.log(
        newTechnology ? "New Technology Added" : "Existing Technology"
      );
      let newTechObject = {
        categories: [categories.toString()],
        dateModified,
        description,
        documentId,
        keywords: [keyword],
        reviews,
        technology,
        urlSlug: slug,
      };
      let techRef = db.collection("technologies").doc(slug);
      techRef.get().then((docSnapshot) => {
        if (docSnapshot.exists) {
          console.log("document exists - this shouldn't happen");
          techRef.onSnapshot((doc) => {
            doc.update({ ...newTechObject });
          });
        } else {
          console.log("document doesn't exist");
          db.collection("technologies")
            .doc(slug)
            .set(newTechObject);
        }
        // commit("addTechnologiesFromFirestore", {
        //   newTechObject,
        //   newTechnology,
        // });
      });
    },

    //? ACTION - Update User Profile
    addComment({ commit }, payload) {
      // console.table(payload);
      let { projectId, comment, comments } = payload;
      let { id, date, commentText, authorName } = comment;
      // console.table({ projectId, id, date, commentText, authorName });
      // console.table({ comment, comments });
      (comment = {
        id: id,
        date: date,
        comment: commentText,
        authorName: authorName,
      }),
        comments.push(comment);
      db.collection("projects")
        .doc(projectId.trim())
        .update({
          comments: comments,
        });
      commit("addComment", { id, comments });
    },

    //? ACTION - Update User Profile
    updateUserProfile({ commit }, payload) {
      let {
        userId,
        name,
        company,
        username,
        email,
        location,
        bio,
        stack,
      } = payload;
      db.collection("users")
        .doc(userId.trim())
        .update({
          name: name,
          company: company,
          username: username,
          email: email,
          location: location,
          bio: bio,
          stack: stack,
        });
      commit("updateUserProfile", payload);
    },

    //? ACTION - Follow Project
    followProject({ commit, getters }, payload) {
      commit("setLoading", true);
      let userProjects = [];
      let userDocId;
      const currentUser = getters.user;
      // console.log(currentUser);
      let userDocRef = db.collection("users");
      userDocRef
        .get()
        .then((doc) => {
          doc.forEach((user) => {
            if (user.data().id == currentUser.id) {
              userDocId = user.id;
              userProjects = user.data().followedProjects;
              if (
                userProjects.findIndex((project) => payload === project) >= 0
              ) {
                console.log("project ID already exists in projects array");
              } else {
                userProjects.push(payload);
              }
              // console.log(userProjects);
            }
          });
        })
        .then(() => {
          console.log({ userProjects: currentUser.projects, payload });
          if (currentUser.projects.length !== 0) {
            if (
              currentUser.projects.findIndex(
                (project) => payload === project
              ) >= 0
            ) {
              console.log("project ID already exists");
              return;
            }
          } else {
            console.log("Project ID did not exist, adding");
            db.collection("users")
              .doc(userDocId)
              .update({
                followedProjects: userProjects,
              });
            commit("updateUserFollowingArray", {
              newFollowedProjectId: payload,
              userDocumentId: userDocId,
              currentUserProjects: userProjects,
            });
          }
          // console.log({ id: payload, fbKey: userDocId, userProjects });
          commit("setLoading", false);
        })
        .catch((error) => {
          console.error(error);
          commit("setLoading", false);
        });
    },

    //? ACTION - Unfollow Project
    unfollowProject({ commit, getters }, payload) {
      commit("setLoading", true);
      let followedProjects = getters.user.followedProjects;
      let { loggedInUserId, unfollowProjectId } = payload;
      let newFollowedProjectArray = [];
      for (let i = 0; i < followedProjects.length; i++) {
        if (followedProjects[i] != unfollowProjectId) {
          newFollowedProjectArray.push(followedProjects[i]);
        } else {
          console.log(`${followedProjects[i]} has been removed`);
        }
      }
      if (newFollowedProjectArray.length > 0) {
        db.collection("users")
          .doc(loggedInUserId.trim())
          .update({ followedProjects: newFollowedProjectArray });
      }
      commit("updateUserFollowingArrayUnfollow", newFollowedProjectArray);
      commit("setLoading", false);
    },

    //? ACTION - Load Hackers
    loadHackers({ commit }) {
      const hackersRef = db.collection("users");
      let hackers = [];
      hackersRef.onSnapshot((hacker) => {
        hacker.forEach((doc) => {
          hackers.push({ id: doc.id, ...doc.data() });
        });
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
          const stack = {
            languages: [],
            frameworksAndLibraries: [],
            databases: [],
            hostingPlatform: [],
            other: [],
            technologiesToLearn: [],
          };
          const userEmail = user.email;
          let userData = {
            id: uid,
            githubId: id,
            stack,
            projects: [],
            followedProjects: [],
            documentId: "",
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
          if (!isNewUser) {
            let userDocRef = db.collection("users");
            userDocRef.get().then((doc) => {
              doc.forEach((eachUser) => {
                if (eachUser.data().id == uid) {
                  userData.documentId = eachUser.data().id;
                  userData.projects = eachUser.data().projects;
                  userData.followedProjects = eachUser.data().followedProjects;
                }
              });
            });
          }
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
        userId: getters.user.id,
        name: getters.user.name,
        username: getters.user.login,
        emailAddress: getters.user.email,
        creatorId: getters.user.id,
        videoUrl: payload.videoUrl
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
                .update({ imageUrl: imageUrl_1, documentId: key });
              commit("createProject", {
                project,
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
        videoUrl
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
        videoUrl
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

    //? ACTION - LOG PROJECT UPDATE
    logProjectUpdate({ commit }, payload) {
      let updates = [];
      const { update, project } = payload;
      let projectRef = db.collection("projects").doc(project.documentId); //! Good
      projectRef
        .get()
        .then((doc) => {
          let document = doc.data();
          if (document.updates) {
            doc.data().updates.forEach((eachUpdate) => {
              updates.push(eachUpdate);
            });
          } else {
            console.log("no current goals");
          }
        })
        .then(() => {
          updates.push(update);
        })
        .then(() => {
          db.collection("projects")
            .doc(project.documentId)
            .update({ updates: updates });
        });
      commit("updateProject", { ...project, updates });
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
        imageUrl: "",
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
    // todo - this should be called loadTechnologies for consistancy
    setTechnologies({ commit }) {
      let technologies = [];
      let allTechnologies = [];


      // const getTech = () => {
        const techRef = db.collection("technologies")
        const query = techRef.where("documentId", "!=", null)
        // let allTechnologies = []
        // let technologies = []
        query.onSnapshot((allTech) => {
          allTech.forEach((doc) => {
            allTechnologies.push(doc.data())
            technologies.push(doc.data().technology)
            return {
              technologies: technologies,
              allTechnologies: allTechnologies
            }
          })
            // .then((tech) => {
            commit("setTechnologies", { technologies, allTechnologies });
          // })
        })

      // }

      // const getTechnologies = async () => {
      //   const snapshot = await db.collection("technologies").get();
      //   snapshot.forEach((doc) => {
      //     allTechnologies.push(doc.data());
      //     technologies.push(doc.data().technology);
      //   });
      // };
      // getTechnologies().then(() => {
      // getTech().then(() => {
      //   // console.log("setTechnologies", { technologies, allTechnologies });
      //   commit("setTechnologies", { technologies, allTechnologies });
      // });
    },
    
    
    
    // // ! for testing - delete me
    //    loadProjects({ commit }) {
    //   commit("setLoading", true);
    //   const projectsRef = db.collection("projects");
    //   const query = projectsRef.where("title", "!=", null);
    //   query.onSnapshot((project) => {
    //     const projects = [];
    //     project.forEach((doc) => {
    //       projects.push({ ...doc.data(), id: doc.id });
    //     });
    //     commit("setLoadedProjects", projects);
    //     commit("setLoading", false);
    //   });
    // },

    //? ACTION - Update Airtable Tech Listing
    // todo - remove if still in use
    // updateAirtableTech({ commit }, payload) {
    //   let { url, params } = payload;
    //   axios
    //     .post(url, params)
    //     .then(async (res) => {
    //       console.log(res.data[0]);
    //       payload.params.id = await res.data[0].id;
    //       payload.params.id = await res.data[0].fields;
    //       payload.params.categories = await res.data[0].fields.Categories;
    //       payload.params.technology = await res.data[0].fields.Technology;
    //       console.log(payload.params.id);
    //     })
    //     .finally(() => {
    //       commit("updateAirtableTech", payload);
    //     });
    // },
  },

  /*************************
   //* #4 - GETTERS
  ************************** */
  getters: {
    //? GETTER - GET Loaded Projects, (sorted by end date)
    projects(state) {
      return state.loadedProjects;
    },


    //? GETTER - GET Projects in order of creation
    loadedProjects(state) {
      return state.loadedProjects.sort((a, b) => {
        return a.created < b.created ? 1 : -1;
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

    //? GETTER - GET Loaded Technology - Single Technology by TechnologyId (Slug)
    loadedTechnology(state) {
      return (technologyId) => {
        return state.allTechnologies.find((technology) => {
          return technology.documentId === technologyId;
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

    //? GETTER - GET All Technologies
    allTechnologies(state) {
      return state.allTechnologies;
    },

    //? GETTER - GET All Technologies sorted by Date Modified
    allTechnologiesDateSorted(state) {
      if (state.allTechnologies) {
        return state.allTechnologies.sort((a, b) =>
          a.dateModified.split("-").join("") <
          b.dateModified.split("-").join("")
            ? 1
            : -1
        );
      } else {
        return [];
      }
    },

  },
});
