<template>
  <div class="hackers">
    <v-container class="top-spacing">
      <h1>Hackers</h1>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="9" lg="7">
          <HackerCard
            v-for="hacker in sortedHackers"
            :key="hacker.id"
            :hacker="hacker"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import HackerCard from "@/components/Shared/HackerCard.vue";
import _ from "lodash";

export default {
  name: "Hackers",

  computed: {
    hackers() {
      return this.$store.getters.hackers;
    },
    avatarUrl() {
      return "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortFlat&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light";
    },
    sortedHackers() {
      return _.orderBy(this.hackers, "created_at").reverse();
    },
  },
  components: {
    HackerCard,
  },
};
</script>

<style scoped>
h4,
h5 {
  margin: 0;
}
.card {
  background-color: #333;
  margin-bottom: 40px;
}
.top-spacing {
  margin-top: 40px;
}

.headline {
  padding-left: 80px;
}
</style>