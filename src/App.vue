<template>
  <Drawer 
    :direction="'right'" 
    :exist="true"
    ref="LeftDrawer">
    <DrawerContent
      :button1o1Active="button1o1Active"
      :button1o2Active="button1o2Active"
      :button2o2Active="button2o2Active"
      :buttonOffActive="buttonOffActive"
      :buttonSlowActive="buttonSlowActive"
      :buttonMediumActive="buttonMediumActive"
      :buttonFastActive="buttonFastActive"
      :alreadyScrolling="alreadyScrolling"
      :buttonDarkActive="buttonDarkActive"
      :buttonLightActive="buttonLightActive"
      :buttonSystemActive="buttonSystemActive"
      @theme-setting="updateSelectedThemeSetting"
      @scroll-speed="updateScrollSpeed"
      @screen-setting="updateSelectedScreenSetting"
    />
  </Drawer>

  <TheHeader 
    :darkMode="darkMode"
    :title1="title1"
    :title2="title2"
    @open-menu="openMenu"
  />
  <router-view 
    :buttonSlowActive="buttonSlowActive"
    :buttonMediumActive="buttonMediumActive"
    :buttonFastActive="buttonFastActive"
    :scrollSpeed="scrollSpeed"
    :alreadyScrolling="alreadyScrolling"
    @now-scrolling="nowScrolling"

    :selectedScreenSetting="selectedScreenSetting"

    @store-titles="storeTitles"
    @product-titles="productTitles"
    @display-titles="displayTitles"

    @menu-number="menuNumber"
  ></router-view>
</template>

<script>
import TheHeader from './components/TheHeader.vue'
import Drawer from './components/Drawer.vue';
import DrawerContent from './components/DrawerContent.vue'

export default {
  name: 'App',
  components: {
    TheHeader,
    Drawer,
    DrawerContent,
  },
  data() {
    return {
      alreadyScrolling: false,
      title1: 'SELECT',
      title2: 'STORE',
      selectedScreenSetting: "1 of 1",
      button1o1Active: true,
      button1o2Active: false,
      button2o2Active: false,
      scrollSpeed: 40,
      buttonOffActive: false,
      buttonSlowActive: false,
      buttonMediumActive: true,
      buttonFastActive: false,
      darkMode: false,
      buttonDarkActive: true,
      buttonLightActive: false,
      buttonSystemActive: false,
    }
  },
  methods: {
    openMenu(){
      if(this.$refs.LeftDrawer.active){
        this.$refs.LeftDrawer.close();					
      }else{
        this.$refs.LeftDrawer.open();
      }
    },
    nowScrolling() {
      this.alreadyScrolling = true
    },
    storeTitles() {
      this.title1= "SELECT"
      this.title2 = "STORE"
    },
    productTitles() {
      this.title1 = "SELECT"
      this.title2 = "PRODUCT"
    },
    displayTitles(product) {
      this.title1 = product.toUpperCase()
      this.title2 = "MENU"
    },
    menuNumber() {
      this.title2 = this.title2 + " " + this.selectedScreenSetting.charAt(0)
    },
    updateSelectedThemeSetting(setting) {
      this.darkMode = setting
      this.buttonDarkActive = false
      this.buttonLightActive = false
      this.buttonSystemActive = false
      if (setting === true) {this.buttonDarkActive = true}
      else if (setting === false) {this.buttonLightActive = true}
    },
    updateSelectedScreenSetting(setting) {
      this.selectedScreenSetting = setting
      this.button1o1Active = false
      this.button1o2Active = false
      this.button2o2Active = false
      if (setting === '1 of 1') {this.button1o1Active = true}
      else if (setting === '1 of 2') {this.button1o2Active = true}
      else if (setting === '2 of 2') {this.button2o2Active = true}
    },
    updateScrollSpeed(speed) {
      this.buttonOffActive = false
      this.buttonSlowActive = false
      this.buttonMediumActive = false
      this.buttonFastActive = false
      if (speed === 'slow') {
        this.buttonSlowActive = true
        this.scrollSpeed = 80
      }
      else if (speed === 'medium') {
        this.buttonMediumActive = true
        this.scrollSpeed = 40
      }
      else if (speed === 'fast') {
        this.buttonFastActive = true
        this.scrollSpeed = 20
      }
      else if (speed === 'off') {
        this.buttonOffActive = true
        this.scrollSpeed = 0
      }
    }
  },
  mounted() {
    // set page title
    document.title = 'WOD Menu';

    // set 'app-background' class to body tag
    let bodyElement = document.body;
    bodyElement.classList.add("app-background");

    // check for active theme
    let htmlElement = document.documentElement;
    let theme = localStorage.getItem("theme");

    if (theme === 'dark') {
        htmlElement.setAttribute('theme', 'dark')
        this.darkMode = true
    } else {
        htmlElement.setAttribute('theme', 'light');
        this.darkMode = false
    }
},
watch: {
    darkMode: function () {
        // add/remove class to/from html tag
        let htmlElement = document.documentElement;

        if (this.darkMode) {
            localStorage.setItem("theme", 'dark');
            htmlElement.setAttribute('theme', 'dark');
        } else {
            localStorage.setItem("theme", 'light');
            htmlElement.setAttribute('theme', 'light');
        }
    }
}
}
</script>

<style lang="scss">

// themes
:root {
  --app-background-color: rgb(255, 255, 255);
  --primary-text-color: #0d093b;
  --highlight-text-color: #0400ff;
  // --highlight-text-color: #0d093b;
  // --primary-text-color: #193f00be;
  --sidebar-background-color: rgba(245, 245, 245, 0.93);
}
[theme="dark"] {
  --app-background-color: black;
  --primary-text-color: #c1d448;
  --highlight-text-color: white;
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
  background: none!important;
  border: none;
  padding: 0!important;
  cursor: pointer;
  font-size: 24px;
}

h2 {
  color: var(--primary-text-color);
  margin-block: .5em;
}

/* mouse over button */
a:hover {
  color: var(--highlight-text-color);
}

a:focus {outline:0;}

#select-menu {
  margin: auto;
  text-align: center;
  margin-top: 20px;
}

/* Phone */
@media screen and (max-width: 400px) {
  a {
    font-size: 20px;
    margin-block: .4em;
  }
}
</style>
