<template>
  <div class="projectCard">
    <div class="heading">
      <router-link class="light-blue--text title" :to="`../project/${rt}`"
        >{{ project.title }} by
        {{ project.name || project.username }}</router-link
      >
      <div class="subtitle">
        <v-icon large class="gh-icon" dark>mdi-github</v-icon>
        <div class="username">{{ project.username }}</div>
      </div>
    </div>
    <div
      class="banner-image"
      :style="`background-image:url('${project.imageUrl}')`"
    >
      <div class="transparent">
        <div class="tech-wrap">
          <v-chip
            color="#fd0435"
            label
            link
            class="technologies"
            small
            v-for="technology in project.technologies"
            :key="technology"
            >{{ technology.substr(0, 10).trim() }}</v-chip
          >
        </div>
        <div class="dates">
          {{ project.created | date }} - {{ project.projectDuration }}
        </div>
      </div>
    </div>
    <div class="description">
      <strong>Description: </strong>{{ project.description }}
    </div>
    <div class="links">
      <div v-show="project.productPage" class="product-link">
        <v-icon dark>mdi-link</v-icon
        ><a :href="project.productPage" class="light-blue--text">Project URL</a>
      </div>
      <div v-show="project.githubRepo" class="gh-link">
        <v-icon dark>mdi-github</v-icon
        ><a :href="project.githubRepo" class="light-blue--text">GitHub Repo</a>
      </div>
    </div>
    <div class="goals">
      <strong>Goals: </strong>{{ project.goals.substr(0, 150)
      }}{{ project.goals.length > 150 ? "..." : "" }}
    </div>
    <!-- <div class="debug">
      <pre class="json">
        {{ project }}
      </pre>
    <div>
      imageUrl username technologies description title projectDuration
      productPage goals created name emailAddress userId githubRepo id
    </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "ProjectCard",
  props: {
    project: {
      type: Object,
    },
    rt: {
      type: String,
    },
  },
};
</script>

<style scoped>
* {
  padding: 10px;
}

a {
  text-decoration: none;
  color: white;
}

/* .debug {
  text-align: left;
} */

.projectCard {
  border: white solid 2px;
  width: 100%;
  background-color: #333;
  margin: 20px 0;
  height: 100%;
}

.json {
  contain: content;
  white-space: pre-wrap;
}

.transparent {
  background-image: linear-gradient(#111111cc, #333333cc);
  border-radius: 1.2rem;
  width: 100%;
}

.banner-image {
  width: 100%;
  position: static;
  height: 250px;
  background-size: cover;
  background-size: 100%;
  background-position: right 0px bottom 50%;
}

.dates {
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  border: solid rgb(87, 81, 81) 2px;
  font-size: 1.1em;
  border-radius: 0.2em;
  width: 300px;
  margin: 0;
  display: flex;
  padding: 0;
  justify-content: center;
}

.tech-wrap {
  min-width: 100px;
}

.technologies {
  position: relative;
  flex: wrap;
  color: #ffffff;
  width: 115px;
  font-size: 1rem;
  justify-content: center;
  margin: 5px;
}

.heading {
  padding: 10px 0;
}

.subtitle {
  display: flex;
  padding: 0;
}

.gh-icon {
  padding: 0;
  padding-left: 10px;
  width: 5%;
}

.username {
  padding: 0 0 0 15px;
  text-align: left;
  width: 45%;
  align-self: center;
  font-weight: 550;
}

.description {
  font-size: large;
  text-align: left;
}

.links {
  padding: 0;
  display: flex;
}

.product-link,
.gh-link {
  width: 50%;
}

.goals {
  text-align: left;
}
</style>