// autoScroll
// Sherwood edibles server side error

<template>
  <TheHeader 
    :title1="title1"
    :title2="title2"
  />
  <router-view 
    @store-titles="storeTitles"
    @product-titles="productTitles"
    @display-titles="displayTitles"
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
      title1: 'SELECT',
      title2: 'STORE'
    }
  },
  methods: {
    storeTitles() {
      this.title1= "SELECT"
      this.title2 = "STORE"
    },
    productTitles() {
      this.title1 = "SELECT"
      this.title2 = "PRODUCT"
    },
    displayTitles(product) {
      this.title1 = product.toUpperCase();
      this.title2 = "MENU"
    },
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
