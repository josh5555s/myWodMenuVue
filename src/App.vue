<template>
  <Drawer :direction="'right'" :exist="true" ref="LeftDrawer">
    <DrawerContent
      :fontSize="fontSize"
      @theme-setting="updateSelectedThemeSetting"
      @font-size="updateFontSize"
    />
  </Drawer>

  <TheHeader :darkMode="darkMode" @open-menu="openMenu" />
  <router-view :fontSize="fontSize"></router-view>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import Drawer from "./components/Drawer.vue";
import DrawerContent from "./components/DrawerContent.vue";
// import { mapGetters } from 'vuex'

export default {
  name: "App",
  components: {
    TheHeader,
    Drawer,
    DrawerContent,
  },
  data() {
    return {
      fontSize: "large",
      darkMode: false,
    };
  },
  methods: {
    openMenu() {
      if (this.$refs.LeftDrawer.active) {
        this.$refs.LeftDrawer.close();
      } else {
        this.$refs.LeftDrawer.open();
      }
    },
    updateSelectedThemeSetting(setting) {
      this.darkMode = setting;
    },
    updateFontSize(size) {
      this.fontSize = size;
      console.log("fontSize: " + this.fontSize);
    },
  },
  mounted() {
    // set page title
    document.title = "WOD Menu";

    // set 'app-background' class to body tag
    let bodyElement = document.body;
    bodyElement.classList.add("app-background");

    // check for active theme
    let htmlElement = document.documentElement;
    let theme = localStorage.getItem("theme");

    if (theme === "dark") {
      htmlElement.setAttribute("theme", "dark");
      this.darkMode = true;
    } else {
      htmlElement.setAttribute("theme", "light");
      this.darkMode = false;
    }
  },
  watch: {
    darkMode: function () {
      // add/remove class to/from html tag
      let htmlElement = document.documentElement;

      if (this.darkMode) {
        localStorage.setItem("theme", "dark");
        htmlElement.setAttribute("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
        htmlElement.setAttribute("theme", "light");
      }
    },
  },
};
</script>

<style lang="scss">
// themes
:root {
  --app-background-color: rgb(250, 250, 250);
  --primary-text-color: #0d093b;
  --highlight-text-color: mediumseagreen;
  --specials-highlight-text-color: #0d093b;
  --uplifting-red: rgb(197, 47, 47);
  --balanced-blue: rgb(72, 137, 197);
  --relaxing-purple: rgb(123, 53, 177);
  --cbd-green: rgb(18, 218, 34);
  --sidebar-background-color: rgba(245, 245, 245, 0.93);
}
[theme="dark"] {
  --app-background-color: black;
  --primary-text-color: #c1d448;
  --highlight-text-color: white;
  --specials-highlight-text-color: white;
  --uplifting-red: rgb(228, 52, 52);
  --balanced-blue: rgb(91, 155, 213);
  --relaxing-purple: rgb(112, 48, 160);
  --cbd-green: rgb(19, 255, 37);
  --sidebar-background-color: rgba(9, 9, 9, 0.92);
}

body {
  background-color: var(--app-background-color);
  color: var(--primary-text-color);
  font-family: "Merriweather Sans", sans-serif;
  min-height: 98vh;
}

a {
  text-decoration: none;
  background: none !important;
  border: none;
  padding: 0 !important;
  cursor: pointer;
  font-size: 24px;
}

h2 {
  color: var(--primary-text-color);
  margin-block: 0.5em;
}

/* mouse over button */
a:hover {
  color: var(--highlight-text-color);
}

a:focus {
  outline: 0;
}

#select-menu {
  margin: auto;
  text-align: center;
  margin-top: 20px;
}

/* Phone */
@media screen and (max-width: 400px) {
  a {
    font-size: 20px;
    margin-block: 0.4em;
  }
}
</style>
