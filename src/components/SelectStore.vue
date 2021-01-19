<template>
    <div id="select-menu">
      <button v-on:click="selectProduct('cedar-mill')"><h2>Cedar Mill</h2></button>
      <button v-on:click="selectProduct('hillsboro')"><h2>Hillsboro</h2></button>
      <button v-on:click="selectProduct('newberg')"><h2>Newberg</h2></button>
      <button v-on:click="selectProduct('sherwood')"><h2>Sherwood</h2></button>
    </div>
</template>

<script>

export default {
  // props: ['patterns','i'],
  emits: ['select-product'],
  data() {
    return {
    
    }
  },
  methods: {
    selectProduct(store) {
      this.$emit("select-product", store)
    }
  }
}
</script>

<style>

</style>