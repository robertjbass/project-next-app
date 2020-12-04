// import firebase from 'firebase/app'
// import 'firebase/firestore'
// import 'firebase/auth'
// import store from './store'
// import axios from 'axios'

// const firebaseConfig = {
//   apiKey: "AIzaSyCC8VUrpoEii3a32r5TA3KJEh481fSHGdA",
//   authDomain: "project-next-app.firebaseapp.com",
//   databaseURL: "https://project-next-app.firebaseio.com",
//   projectId: "project-next-app",
//   storageBucket: "project-next-app.appspot.com",
//   messagingSenderId: "272078008397",
//   appId: "1:272078008397:web:0f380f73021cfd031eec04",
//   measurementId: "G-6VHPREYJES"
// };

// firebase.initializeApp(firebaseConfig)

// export const db = firebase.firestore()
// export const auth = firebase.auth()
// export const provider = new firebase.auth.GithubAuthProvider()

// firebase.auth().onAuthStateChanged(user => {
//   console.log({ user })
//   // console.log(user.additionalUserInfo.profile.bio)
//   console.log("user.loggedIn", user.loggedIn)
//   let providerData = user.providerData[0]
//   let { displayName, email, photoURL, uid } = providerData
//   console.table({displayName, email, photoURL, uid})
//   // let userEmail = "test@test.com"
//   let userEmail = email
//   let ghEmailEncodedURI = userEmail.split("@").join("%40");
//   let url = `https://v1.nocodeapi.com/bbass/airtable/OWBByjdlNVhiKRiR?tableName=Users&view=User%20Profiles&filterByFormula=email%20%3D%20%22${ghEmailEncodedURI}%22`;
//   axios.get(url)
//     .then(res => {
//     console.log(res.data.records.length)
//       let responseLength = res.data.records.length
//       if (responseLength == 1) {
//         console.log(res.data.records)
//       } else if (!responseLength) {
//         // todo - add to airtable
//         console.log("Not In Airtable")
//         axios
//           .post("https://v1.nocodeapi.com/bbass/airtable/OWBByjdlNVhiKRiR?tableName=Users", [{
//             Name: displayName,
//             // todo - Active is not available
//             // Active: true,
//             Email: userEmail,
//             // todo - profileSummary bio info is not available
//             // ProfileSummary: this.profileBio,
//             ProfilePicURL: photoURL,
//             FirebaseUID: uid,
//             // todo - ghusername is not available
//             // GitHubUsername: ghUsername,
//           }])
//           .then(async (res) => {
//             console.log(res)
//             // this.$store.dispatch("fetchProfile", await res.data[0].fields);
//             // todo - add all available data to the vuex store
//             user = {user, displayName, userEmail, photoURL, uid, ...user}
//             store.dispatch("fetchUser", { user});
//           })
//           .catch((err) => {
//             console.error(err);
//           });
//         }
//     })
//     .catch(err => {
//       console.error(err); 
//     })
// });