<template>
    <div id="select-menu">
      <router-link :to="`${location}/flower`"><h2>Flower</h2></router-link>
      <router-link :to="`${location}/preroll`"><h2>Preroll</h2></router-link>
      <router-link :to="`${location}/cartridge`"><h2>Cartridge</h2></router-link>
      <router-link :to="`${location}/concentrate`"><h2>Concentrate</h2></router-link>
      <router-link :to="`${location}/edible`"><h2>Edible</h2></router-link>
      <router-link :to="`${location}/tincture`"><h2>Tincture</h2></router-link>
      <router-link :to="`${location}/topical`"><h2>Topical</h2></router-link>
      <button @click="toggleShowSettings">{{ settingsButtonText }}</button>
      <template v-if="showSettings">
        <br>
<!-- 
        <h5>Scroll speed</h5>
        <button
          @click="updateScrollSpeed('slow')"
          v-bind:class="{ active: buttonSlowActive }"
        >Slow</button>
        <button
          @click="updateScrollSpeed('medium')"
          v-bind:class="{ active: buttonMediumActive }"
        >Medium</button>
        <button
          @click="updateScrollSpeed('fast')"
          v-bind:class="{ active: buttonFastActive }"
        >Fast</button> -->

        <h5>Screen number</h5>
        <button 
          @click="updateSelectedScreenSetting('1 of 1')"
          v-bind:class="{ active: button1o1Active }"
        >1 of 1</button><br>
        <button 
          @click="updateSelectedScreenSetting('1 of 2')"
          v-bind:class="{ active: button1o2Active }"
        >1 of 2</button>
        <button 
          @click="updateSelectedScreenSetting('2 of 2')"
          v-bind:class="{ active: button2o2Active }"
        >2 of 2</button>
      </template>
    </div>
</template>

<script>

export default {
  props: ['button1o1Active','button1o2Active','button2o2Active','buttonSlowActive','buttonMediumActive','buttonFastActive'],
  emits: ['product-titles', 'screen-setting','scroll-speed'],
  data() {
    return {
      settingsButtonText: 'Settings',
      showSettings: false,
      location: ''
    }
  },
  methods: {
    getLocation() {
      this.location = this.$route.path
    },
    productTitles() {
      this.$emit('product-titles')
    },
    toggleShowSettings() {
      if (!this.showSettings) {
        this.showSettings = !this.showSettings
        this.settingsButtonText = 'Hide settings'
      } else {
        this.showSettings = !this.showSettings
        this.settingsButtonText = 'Settings'
      }
    },
    updateSelectedScreenSetting(setting) {
      this.$emit('screen-setting', setting)
    },
    updateScrollSpeed(speed) {
      this.$emit('scroll-speed', speed)
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
a:hover,
button:hover {
  color: white;
  border-block-color: white;
  cursor: pointer;
}

/* selected link */
a:active {
  color: white;
}

#select-menu {
  margin: auto;
  text-align: center;
}

button {
  background: black;
  color: #c1d448;
  border-block-color: #c1d448;
  border-radius: 5px;
}

.active {
  color: white;
  border-block-color: white;
}

h5 {
  margin-block-start: 1em;
  margin-block-end: 0.1em;
}

</style>