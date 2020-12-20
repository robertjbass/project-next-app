<template>
  <div class="TechnologySelector">
    <h3 v-if="isEditing">
      {{ usedFor
      }}<v-icon
        small
        color="light-blue"
        class="edit"
        right
        @click="toggleEditing"
        >mdi-pencil-outline</v-icon
      >
    </h3>
    <h3 v-else>
      {{ usedFor
      }}<v-icon small class="edit" right @click="toggleEditing"
        >mdi-pencil-lock-outline</v-icon
      >
    </h3>

    <form v-on:submit.prevent="dontSubmit">
      <!-- <form class="array"> -->
      <ul class="newTech">
        <li v-for="(item, i) in bank" :key="i">
          <v-chip
            class="chip"
            :outlined="isEditing"
            label
            :color="isEditing ? 'light-blue' : 'secondary'"
            close
            @click:close="removeItem(item)"
            >{{ item }}</v-chip
          >
        </li>
      </ul>
      <v-text-field
        v-if="isEditing"
        :disabled="!isEditing"
        clearable
        :placeholder="this.placeholder"
        v-model="adding"
        v-on:keyup="keyWasPressed"
        :hint="
          currentSelected
            ? 'Press Enter to add ' + currentSelected
            : partialMatchString.length > 0
            ? 'Press enter to add:' + partialMatchString
            : ''
        "
        persistent-hint
      />
      <v-text-field
        v-else
        :disabled="!isEditing"
        :placeholder="this.placeholder"
        v-model="saved"
        v-on:keyup="keyWasPressed"
        :hint="
          currentSelected
            ? 'Press Enter to add ' + currentSelected
            : partialMatchString.length > 0
            ? 'Press enter to add:' + partialMatchString
            : ''
        "
        persistent-hint
      />
    </form>
    <div class="matchWrap" v-if="technologies.length > 0">
      <ul v-for="(matches, i) in partialMatches" :key="i">
        <li>
          <v-chip
            @click="addThis(matches)"
            class="chip"
            :outlined="matches !== currentSelected"
            label
            color="orange"
            >{{ matches }}</v-chip
          >
        </li>
      </ul>
    </div>
    <div class="confirm-btn-wrap" align="right">
      <v-btn
        small
        class="confirm-btn"
        :disabled="this.bank == 0 || !this.isEditing"
        color="secondary"
        @click="submit"
        ><v-icon left small>mdi-check</v-icon>Confirm {{ usedFor }}</v-btn
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "TechnologySelector",
  props: ["usedFor", "placeholder"],
  data() {
    return {
      adding: "",
      saved: [],
      bank: [],
      selectedIndex: -1,
      isEditing: true,
    };
  },
  watch: {
    adding() {
      if (this.adding == "" && this.selectedIndex > -1) {
        this.selectedIndex = -1;
      }
    },
  },
  methods: {
    toggleEditing() {
      if (this.bank.length > 0) {
        this.isEditing = !this.isEditing;
      } else if (this.saved.length > 0) {
        this.bank = this.saved;
        this.isEditing = !this.isEditing;
      }
    },
    dontSubmit() {
      console.log("");
    },
    removeItem(itemToRemove) {
      let index = this.bank.indexOf(itemToRemove);
      console.log(index);
      this.bank.splice(index, 1);
    },
    submit() {
      this.$emit("arrayValue", this.bank);
      this.saved = this.bank;
      this.isEditing = false;
      this.bank = [];
    },
    addThis(value) {
      if (!this.bank.includes(value)) {
        this.bank.push(value);
        this.adding = "";
      }
    },
    keyWasPressed: function (e) {
      if (
        e.keyCode == 38 ||
        (e.keyCode == 40 && this.partialMatches.length > 0)
      ) {
        if (e.keyCode == 38) {
          if (this.selectedIndex >= 0) {
            this.selectedIndex--;
          }
        } else if (e.keyCode == 40) {
          if (this.selectedIndex < this.partialMatches.length - 1) {
            this.selectedIndex++;
          }
        }
      } else if (e.keyCode === 13) {
        if (this.partialMatches.length > 9 && !this.currentSelected) {
          alert(
            "You're attempting to add more than 9 technologies at once. Please limit your selection."
          );
        } else if (
          this.currentSelected &&
          this.partialMatches.includes(this.currentSelected)
        ) {
          // this.adding = this.currentSelected;
          this.bank.push(this.currentSelected); //new
          this.selectedIndex = -1;
          this.adding = "";
        } else if (
          this.partialMatches.length == 1 &&
          !this.bank.includes(this.partialMatches[0])
        ) {
          this.bank.push(this.partialMatches[0]);
        } else if (
          this.partialMatches.length == 1 &&
          this.bank.includes(this.partialMatches[0])
        ) {
          console.log("duplicate");
        } else if (this.partialMatches.length > 1) {
          this.partialMatches.forEach((item) => {
            if (!this.bank.includes(item)) {
              this.bank.push(item);
            }
          });
        }
        this.adding = "";
      } else {
        console.log("Something else was pressed");
      }
    },
  },
  computed: {
    currentSelected() {
      return this.partialMatches[this.selectedIndex];
    },
    partialMatches() {
      if (this.adding == "") {
        return [];
      } else {
        return this.technologies.filter((technology) => {
          return technology
            .toLowerCase()
            .split(" ")
            .join("")
            .split(".")
            .join("")
            .includes(
              this.adding.toLowerCase().split(" ").join("").split(".").join("")
            );
        });
      }
    },
    partialMatchString() {
      return this.partialMatches.map((technology) => {
        return " ".concat(technology.concat(" "));
      });
    },
    technologies() {
      return this.$store.getters.technologies;
    },
    addingTechIsInList() {
      return this.technologies.indexOf(this.adding) >= 0;
    },
  },
};
</script>

<style scoped>
li {
  list-style: none;
  display: inline;
}
.edit {
  cursor: pointer;
}
.chip {
  margin: 5px;
}
.confirm-btn {
  width: 200px;
}
</style>