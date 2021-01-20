<template>
    <div id="select-menu">
      <router-link to="cedar-mill"><h2>Cedar Mill</h2></router-link>
      <router-link to="hillsboro"><h2>Hillsboro</h2></router-link>
      <router-link to="newberg"><h2>Newberg</h2></router-link>
      <router-link to="sherwood"><h2>Sherwood</h2></router-link>
    </div>
</template>

<script>

export default {
  emits: ['store-titles'],
  data() {
    return {
    }
  },
  methods: {
    storeTitles() {
      this.$emit('store-titles')
    }
  },
  mounted() {
    this.storeTitles()
  }
}
</script>

<style>

</style>