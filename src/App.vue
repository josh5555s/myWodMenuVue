// implement functionallity of the settings menu

// fix autoScroll

// create url state for the settings

// dark mode detection (https://stackoverflow.com/questions/56393880/how-do-i-detect-dark-mode-using-javascript)

// scroll interuption by fetch loop issue

<template>
  <Drawer 
    :direction="'right'" 
    :exist="true"
    ref="LeftDrawer">
    <DrawerContent
      :button1o1Active="button1o1Active"
      :button1o2Active="button1o2Active"
      :button2o2Active="button2o2Active"
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
      buttonSlowActive: false,
      buttonMediumActive: true,
      buttonFastActive: false,
      theme: 'dark',
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
      this.theme = setting
      this.buttonDarkActive = false
      this.buttonLightActive = false
      this.buttonSystemActive = false
      if (setting === 'dark') {this.buttonDarkActive = true}
      else if (setting === 'light') {this.buttonLightActive = true}
      else if (setting === 'system') {this.buttonSystemActive = true}
      console.log(this.theme)
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
      this.scrollSpeed = speed
      this.buttonSlowActive = false
      this.buttonMediumActive = false
      this.buttonFastActive = false
      if (speed === 'slow') {
        this.buttonSlowActive = true
        this.scrollSpeed = 80
      }
      else if (speed === 'medium') {
        this.buttonMediumActive = true
        this.scrollSpeed = 20
      }
      else if (speed === 'fast') {
        this.buttonFastActive = true
        this.scrollSpeed = 5
      }
    }
  },
}
</script>

<style lang="scss">

$background-color-theme:black;

body {
  background-color: $background-color-theme;
  color: #c1d448;
  font-family: "Merriweather Sans", sans-serif;
  min-height: 98vh;
}

a {
  text-decoration: none;
  background: none!important;
  border: none;
  padding: 0!important;
  color: #c1d448;
  cursor: pointer;
  font-size: 24px;
}

h2 {
  margin-block: .5em;
}

/* mouse over button */
a:hover {
  color: white;
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
