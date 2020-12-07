<template>
  <div class="hackers">
    <v-container class="top-spacing">
      <h1>Hackers</h1>
      <v-row justify="center">
        <v-col cols="10" sm="8" md="8" lg="6">
          <HackerCard
            v-for="hacker in hackers"
            :key="hacker.id"
            :hacker="hacker"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
import HackerCard from "@/components/Shared/HackerCard.vue";

export default {
  name: "Hackers",
  computed: {
    // ...mapGetters(["hackers"]),
    hackers() {
      return this.$store.getters.hackers;
    },
    avatarUrl() {
      return "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortFlat&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light";
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
  padding: 5px;
  padding: 20px;
  margin-bottom: 40px;
}
.top-spacing {
  margin-top: 40px;
}

.headline {
  padding-left: 80px;
}
</style>