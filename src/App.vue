// Need to set up url navigation
// autoScroll

<template>
  <TheHeader 
  :title1="title1"
  :title2="title2"
  @select-store="selectStore"
  />
  <SelectStore 
    v-if="show === 'store'" 
    @select-product="selectProduct"
  />
  <SelectProduct 
    v-else-if="show === 'product'" 
    @show-display="showDisplay"
  />
  <ShowDisplay 
    v-else-if="show === 'display'"
    :store="store"
    :product="product"
    :results="results"
    />
</template>

<script>
import TheHeader from './components/TheHeader.vue'
import SelectStore from './components/SelectStore.vue'
import SelectProduct from './components/SelectProduct.vue'
import ShowDisplay from './components/ShowDisplay.vue'

export default {
  name: 'App',
  components: {
    TheHeader,
    SelectStore,
    SelectProduct,
    ShowDisplay
  },
  data() {
    return {
      show: "store",
      title1: 'SELECT',
      title2: 'STORE',
      store: '',
      product: '',
      results: {}
    }
  },
   methods: {
    selectStore() {
      this.show = "store";
      this.title1= "SELECT",
      this.title2 = "STORE";
    },
    selectProduct(store) {
      this.store = store;
      this.show = "product";
      this.title2 = "PRODUCT";
    },
    showDisplay(product) {
      this.product = product;
      this.show = "display";
      this.title1 = product.toUpperCase();
      this.title2 = "MENU";
    },
    getData() {
      fetch('http://192.168.1.2:4000/json')
        .then(response => response.json())
        .then(data => {
          let obj = (JSON.parse(data));
          this.results = obj;
        })
    }
  },
  mounted() {
    this.getData();
    setInterval(() => {
      this.getData()
    }, 60000);
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
button {
  background: none!important;
  border: none;
  padding: 0!important;
  color: #c1d448;
  cursor: pointer;
  font-size: 26px;
  display: block;
  margin: auto;
}

button h2 {
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
}
/* mouse over button */
button:hover {
  color: white;
}

button:focus {outline:0;}

#select-menu {
  margin: auto;
  text-align: center;
  margin-top: 20px;
}
</style>
