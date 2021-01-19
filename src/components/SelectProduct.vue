<template>
    <div id="select-menu">
      <button v-on:click="showDisplay('flower')"><h2>Flower</h2></button>
      <button v-on:click="showDisplay('preroll')"><h2>Preroll</h2></button>
      <button v-on:click="showDisplay('cart')"><h2>Cartridge</h2></button>
      <button v-on:click="showDisplay('dab')"><h2>Dab</h2></button>
      <button v-on:click="showDisplay('edible')"><h2>Edible</h2></button>
    </div>
</template>

<script>

export default {
  // props: ['patterns','i'],
  emits: ['show-display'],
  data() {
    return {
    
    }
  },
  methods: {
    showDisplay(product) {
      this.$emit("show-display", product)
    }
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