<template>
  <TheHeader 
    :title1="title1"
    :title2="title2"
  />
  <router-view 
    :button1o1Active="button1o1Active"
    :button1o2Active="button1o2Active"
    :button2o2Active="button2o2Active"

    :buttonSlowActive="buttonSlowActive"
    :buttonMediumActive="buttonMediumActive"
    :buttonFastActive="buttonFastActive"
    :scrollSpeed="scrollSpeed"
    :alreadyScrolling="alreadyScrolling"
    @now-scrolling="nowScrolling"

    :selectedScreenSetting="selectedScreenSetting"
    @screen-setting="updateSelectedScreenSetting"

    @scroll-speed="updateScrollSpeed"
  
    @store-titles="storeTitles"
    @product-titles="productTitles"
    @display-titles="displayTitles"

    @menu-number="menuNumber"
  ></router-view>
</template>

<script>
import TheHeader from './components/TheHeader.vue'

export default {
  name: 'App',
  components: {
    TheHeader,
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
    }
  },
  methods: {
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

<style>
body {
  background-color: black;
  color: #c1d448;
  font-size: 26px;
  font-family: "Merriweather Sans", sans-serif;
}
a {
  text-decoration: none;
  background: none!important;
  border: none;
  padding: 0!important;
  color: #c1d448;
  cursor: pointer;
  font-size: 26px;
  display: block;
  margin: auto;
}

a h2 {
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
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
</style>
