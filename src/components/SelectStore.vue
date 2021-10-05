<template>
  <div id="column-container">
    <div id="select-menu">
      <router-link to="cedarMill"><h2>Cedar Mill</h2></router-link>
      <router-link to="hillsboro"><h2>Hillsboro</h2></router-link>
      <router-link to="newberg"><h2>Newberg</h2></router-link>
      <router-link to="sherwood"><h2>Sherwood</h2></router-link>
    </div>
  </div>
</template>

<script>

export default {
  methods: {
    storeTitles() { this.$store.commit('storeTitles') }
  },
  mounted() {
    this.storeTitles()
  }
}
</script>

<style>

#column-container {
  display: flex;
  justify-content: center;
}

#select-menu {
  min-width: 200px;
}

</style>