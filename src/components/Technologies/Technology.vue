<template>
  <div class="technologies">
    <v-container class="top-spacing">
      <v-card dark class="card" align="left">
        <router-link to="../technologies" style="text-decoration: none"
          ><v-btn small color="accentRed"
            ><v-icon>mdi-chevron-left</v-icon>All Technologies</v-btn
          ></router-link
        >
        <div class="body" align="center">
          <h1>{{ techName }}</h1>
          <div class="technology">
            <!-- {{ techId }} -->
            <!-- {{ techName }} -->
            {{ techCategory }}
          </div>
          <br />
          <div class="placeholder" align="center">
            Stay tuned for recommendations, tutorials, and more!
          </div>
        </div>
      </v-card>
    </v-container>

    <br />
  </div>
</template>

<script>
export default {
  name: "Technology",
  props: ["technology"],
  data() {
    return {
      key: "value",
    };
  },
  computed: {
    technologies() {
      return this.$store.getters.allTechnologies.filter((tech) => {
        // return technology.technology == technology;
        return tech;
      });
    },
    techId() {
      return this.techInfo[0].id;
    },
    techName() {
      return this.techInfo[0].technology;
    },
    techCategory() {
      return this.techInfo[0].categories;
    },
    techInfo() {
      if (!this.technology) {
        return "";
      } else {
        return this.technologies.filter((tech) => {
          return tech.technology
            .toLowerCase()
            .split(" ")
            .join("")
            .split(".")
            .join("")
            .includes(
              this.technology
                .toLowerCase()
                .split(" ")
                .join("")
                .split(".")
                .join("")
            );
        });
      }
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.top-spacing {
  margin-top: 40px;
  padding: 0 5%;
}
.avatar {
  border-radius: 50%;
}
.card {
  padding: 5% 10%;
}
</style>