<template>
    <div id="select-menu">
      <router-link :to="`${location}/flower`"><h2>Flower</h2></router-link>
      <router-link :to="`${location}/preroll`"><h2>Preroll</h2></router-link>
      <router-link :to="`${location}/cart`"><h2>Cartridge</h2></router-link>
      <router-link :to="`${location}/dab`"><h2>Dab</h2></router-link>
      <router-link :to="`${location}/edible`"><h2>Edible</h2></router-link>
    </div>
</template>

<script>

export default {
  emits: ['product-titles'],
  data() {
    return {
      location: ''
    }
  },
  methods: {
    getLocation() {
      this.location = this.$route.path
    },
    productTitles() {
      this.$emit('product-titles')
    }
  },
  created() {
    this.getLocation(),
    this.productTitles()
  }
}
</script>

<style>
/* unvisited link */
a:link {
  color: #c1d448;
}
a:link {
  text-decoration: none;
}

/* visited link */
a:visited {
  color: #c1d448;
}

/* mouse over link */
a:hover {
  color: white;
}

/* selected link */
a:active {
  color: white;
}

#select-menu {
  margin: auto;
  text-align: center;
}
</style>