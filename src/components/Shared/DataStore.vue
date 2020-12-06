<template>
  <div class="dataStore">
    <h1>Data Store</h1>
    <h1>State</h1>
    <pre class="code">
Loaded Project Count: {{state.loadedProjects ? state.loadedProjects.length : null}}
<div v-if="loadedProjects">
<h3>Loaded Projects</h3>
  <div v-for="(loadedProject) in state.loadedProjects" :key="loadedProject">
    {{loadedProject.title}}
    {{loadedProject.id}}
  </div>
</div>
<!-- <hr>
Hacker Count: {{state.hackers ? state.hackers.length : null}}
<div v-if="hackers">
<h3>Hackers</h3>
  <div v-for="hacker in state.hackers" :key="hacker">{{hacker.name}}</div>
</div>
<hr>
User: {{state.user ? state.user : null}}
<h3>User</h3>
<div v-if="state.user">
 {{user}}
</div>
<hr>
Technologies Count: {{state.technologies ? state.technologies.length : null}}
<div v-if="state.technologies">
  <div v-for="technology in state.technology" :key="technology">{{technology}}</div>
</div>
Loading: {{this.state.loading}}
Errors: {{this.state.error}}
<hr>
    </pre>
    <pre class="code">
State: {{this.state}}
    <div v-for="stateObject in stateObjects" :key="stateObject.length">
      {{`${stateObject.name}: ${stateObject.startingValue}` }}
    </div>
    </pre>
    <code>mapState: {{ { ...mapState } }}</code>
    <br /><br />
    <hr />
    <h1>Actions</h1>
    <pre class="code">
actions:{{ this.actions }}
    </pre>
    <div v-for="(action, i) in actions" :key="action[i]">
      {{ action[i] }}
    </div>
    <code>mapActions: {{ { ...mapActions } }} </code><br />
    <br /><br />
    <hr />
    <h1>Mutations</h1>
    <pre class="code">
mutations: {{ this.mutations }}
    </pre>
    <code>mapMutations: {{ { ...mapMutations } }}</code>
    <br /><br />
    <hr />
    <h1>Getters</h1>
    <pre class="code">
getters: {{ this.getters }}
    </pre>
    <ul>
      <li v-for="(getter, i) in getters" :key="getter[i]">
        {{ getter[i] }}
      </li>
    </ul>
    mapGetters: <code>{{ { ...mapGetters } }}</code>
    <hr />
    <pre class="plainText" v-show="this.showPlainText"> -->
      <!--  -->
<!-- State
  loadedProjects: [],
  hackers: [],
  user: null,
  loading: false,
  error: null,
  technologies: null

 Actions
  loadHackers({ commit })
  loadProjects({ commit })
  signUserUp({ commit })
  signOut({ commit })
  createProject({ commit }, payload)
  setTechnologies({ commit })

Mutations
  createProject
  setUser
  setLoading
  setError
  clearError
  setTechnologies
  setLoadedProjects
  setHackers

Getters
  loadedProjects(state)
  featuredProjects(state, getters)
  loadedProject(state)
  user(state)
  loading(state)
  error(state)
  technologies(state)
  hackers(state) -->
    </pre>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      showPlainText: false,
      //
      stateNames: [
        "loadedProjects",
        "hackers",
        "user",
        "loading",
        "error",
        "technologies",
      ],
      stateObjects: [
        { name: "loadedProjects", startingValue: [] },
        { name: "hackers", startingValue: [] },
        { name: "user", startingValue: null },
        { name: "loading", startingValue: false },
        { name: "error", startingValue: null },
        { name: "technologies", startingValue: null },
      ],

      actions: {
        loadHackers: "loadHackers({ commit })",
        loadProjects: "loadProjects({ commit })",
        signUserUp: "signUserUp({ commit })",
        signOut: "signOut({ commit })",
        createProject: "createProject({ commit }, payload)",
        setTechnologies: "setTechnologies({ commit })",
      },

      mutations: {
        createProject: "createProject",
        setUser: "setUser",
        setLoading: "setLoading",
        setError: "setError",
        clearError: "clearError",
        setTechnologies: "setTechnologies",
        setLoadedProjects: "setLoadedProjects",
        setHackers: "setHackers",
      },

      getters: {
        loadedProjects: "loadedProjects(state)",
        featuredProjects: "featuredProjects(state, getters)",
        loadedProject: "loadedProject(state)",
        user: "user(state)",
        loading: "loading(state)",
        error: "error(state)",
        technologies: "technologies(state)",
        hackers: "hackers(state)",
      },
    };
  },
  computed: {
    state() {
      return this.$store.state;
    },
    ...mapState([
      "loadedProjects",
      "hackers",
      "user",
      "loading",
      "error",
      "technologies",
    ]),
    ...mapGetters([
      "loadedProjects",
      "featuredProjects",
      "loadedProject",
      "user",
      "loading",
      "error",
      "technologies",
      "hackers",
    ]),
    ...mapActions([
      "loadHackers",
      "loadProjects",
      "signUserUp",
      "signOut",
      "createProject",
      "setTechnologies",
    ]),
    ...mapMutations([
      "createProject",
      "setUser",
      "setLoading",
      "setError",
      "clearError",
      "setTechnologies",
      "setLoadedProjects",
      "setHackers",
    ]),
  },
};
</script>

<style scoped>
* {
  text-align: left;
}
ul {
  list-style: none;
}
.dataStore {
  padding: 5%;
  margin: 5%;
}
.code {
  text-align: start;
  background-color: #333;
}
</style>





    
