<template>
  <div class="greater-container">
    <div class="columns-container">
      <div class="specials-column">
        <ul>
          <h1>Current Specials</h1>
          <li v-for="special in currentSpecials" :key="special.id">
            <h2>{{ special.title }}</h2>
            <p>{{ special.description }}</p>
            <p v-if="new Date(special.start).getTime() > 30000000000000">
              Until: {{ getWordDate(special.end) }}
            </p>
          </li>
          <p v-if="currentSpecialsEmpty">Nothing at the moment...</p>
        </ul>
      </div>
      <div class="specials-column">
        <ul>
          <h1>Upcoming Specials</h1>
          <li v-for="special in sortedUpcomingSpecials" :key="special.id">
            <h2>{{ special.title }}</h2>
            <p>{{ special.description }}</p>
            <p>From: {{ getWordDate(special.start) }}</p>
            <p>Until: {{ getWordDate(special.end) }}</p>
          </li>
          <p v-if="upcomingSpecialsEmpty">Nothing at the moment...</p>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      store: this.$route.params.store,
    };
  },
  computed: {
    ...mapGetters(["currentSpecials", "upcomingSpecials"]),
    sortedUpcomingSpecials() {
      let sortedSpecials = this.upcomingSpecials;
      sortedSpecials = sortedSpecials.sort((a, b) => {
        return a["endNumber"] - b["endNumber"];
      });
      return this.asc ? sortedSpecials.reverse() : sortedSpecials;
    },
    currentSpecialsEmpty() {
      return this.currentSpecials !== null && this.currentSpecials.length === 0;
    },
    upcomingSpecialsEmpty() {
      return (
        this.upcomingSpecials !== null && this.upcomingSpecials.length === 0
      );
    },
  },
  methods: {
    getWordDate(dateTime) {
      let d = new Date(dateTime);
      d = d.toString();
      let wordDate = d.substring(0, 10);
      return wordDate;
    },
    fetchSpecials() {
      this.$store.dispatch({
        type: "fetchSpecials",
        location: this.store,
      });
    },
    specialsTitles() {
      this.$store.commit("specialsTitles");
    },
  },
  created() {
    document.title = `${this.store} specials`;
    this.fetchSpecials();
    this.specialsTitles();
  },
};
</script>

<style scoped>
h1 {
  text-decoration: underline;
}

h2,
p {
  color: var(--specials-highlight-text-color);
}

.greater-container {
  display: flex;
  justify-content: center;
}

.columns-container {
  display: flex;
  justify-content: center;
}
.specials-column {
  display: flex;
  flex-direction: column;
  width: 40vw;
  margin: 0;
}

ul {
  list-style: none;
  text-align: center;
  padding: 0;
  width: 100%;
}

li {
  padding: 10px;
  margin: 30px 20px;
  border: solid 2px var(--primary-text-color);
  border-radius: 10px;
}

/* MEDIA QUERIES */

/* Tablet */
@media screen and (max-width: 1080px) {
  .columns-container {
    flex-direction: column;
  }

  ul {
    margin: 0;
  }

  .specials-column {
    width: 90vw;
  }
}

/* Phone */
@media screen and (max-width: 400px) {
  .specials-column {
    width: 90vw;
  }
}
</style>