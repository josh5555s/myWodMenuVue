<template>
  <div id="settings-column-container">
    <div id="settings-column">

      <div id="theme-settings" class='column'>
        <h3>Color Theme</h3>
          <button
            @click="updateSelectedThemeSetting(false)"
            v-bind:class="{ active: buttonLightActive }"
            >Light <i class="far fa-sun"></i></button>
          <button
            @click="updateSelectedThemeSetting(true)"
            v-bind:class="{ active: buttonDarkActive }"
          >Dark  <i class="far fa-moon"></i></button>
      </div>

      <!-- <div id="font-settings" class='column'>
        <h3>Font Size</h3>
          <button
            @click="updateFontSize('small')"
            v-bind:class="{ active: buttonSizeSmallActive }"
          >Small</button>
          <button
            @click="updateFontSize('medium')"
            v-bind:class="{ active: buttonSizeMediumActive }"
          >Medium</button>
          <button
            @click="updateFontSize('large')"
            v-bind:class="{ active: buttonSizeLargeActive }"
            >Large</button>
      </div> -->

      <div id="screen-settings" class='column'>
        <h3>Screen Number</h3>
          <button 
            @click="updateScreensSetting('1 of 1')"
            v-bind:class="{ active: button1o1Active }"
          >1 of 1</button>
          <button 
            @click="updateScreensSetting('1 of 2')"
            v-bind:class="{ active: button1o2Active }"
          >1 of 2</button>
          <button 
            @click="updateScreensSetting('2 of 2')"
            v-bind:class="{ active: button2o2Active }"
          >2 of 2</button>
      </div>

 <!-- show only if scroll is enabled -->
      <div id="scroll-settings" v-if="windowInnerWidth < 1080" class='column'>
        <h3>Scroll Speed</h3>
        <!-- <div class="settings-block"> -->
        <button
          @click="updateScrollSpeed('off')"
          v-bind:class="{ active: buttonOffActive }"
        >Off</button>
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
        >Fast</button>
        <!-- </div> -->
      </div>  

    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  props: ['fontSize'],
  emits: ['screen-setting','scroll-speed', 'theme-setting','menu-number'],
  data() {
    return {
      settingsButtonText: 'Settings',
      showSettings: false,
      windowInnerWidth: 0,
      location: '',
      buttonDarkActive: true,
      buttonLightActive: false,
      buttonSystemActive: false,
      button1o1Active: true, 
      button1o2Active: false,
      button2o2Active: false,
      buttonSlowActive: true,
      buttonMediumActive: false,
      buttonFastActive: false,
      buttonOffActive: false,
    }
  },
  // computed: {
  //   ...mapGetters(['alreadyScrolling'])
  // },
  methods: {
    getLocation() {
      this.location = this.$route.path
    },
    getInnerWidth() {
      this.windowInnerWidth = window.innerWidth
    },
    updateSelectedThemeSetting(setting) {
      this.$emit('theme-setting', setting)
      this.buttonDarkActive = false
      this.buttonLightActive = false
      this.buttonSystemActive = false
      if (setting === true) {this.buttonDarkActive = true}
      else if (setting === false) {this.buttonLightActive = true}
    },
    updateScreensSetting(setting) {
      this.$store.commit('updateScreensSetting', setting)
      this.button1o1Active = false
      this.button1o2Active = false
      this.button2o2Active = false
      if (setting === '1 of 1') { this.button1o1Active = true }
      else if (setting === '1 of 2') {this.button1o2Active = true}
      else if (setting === '2 of 2') {this.button2o2Active = true}
    },
    updateScrollSpeed(speed) {
      this.$store.commit('scrollSpeed', speed)
      this.buttonOffActive = false
      this.buttonSlowActive = false
      this.buttonMediumActive = false
      this.buttonFastActive = false
      if (speed === 'slow') { this.buttonSlowActive = true }
      else if (speed === 'medium') { this.buttonMediumActive = true }
      else if (speed === 'fast') { this.buttonFastActive = true }
      else if (speed === 'off') { this.buttonOffActive = true }
    },
    updateFontSize(size) {
      this.$emit('font-size', size)
    },
    displayTitles() {
      this.$emit('display-titles', this.product)
      this.$emit('menu-number')
    }
  },
  created() {
    this.getLocation(),
    this.getInnerWidth()
  }
}
</script>

<style>

#settings-column-container {
  display: flex;
  justify-content: right;
}

#settings-column {
  width: 200px;
  margin: 0 auto;
}

#theme-settings {
  margin-top: 40px;
}

.column {
  display: flex;
  flex-direction: column;
}

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

#settings-column button {
  background-color: var(--app-background-color);
  color: var(--primary-text-color);
  border-block-color: var(--primary-text-color);
  border-radius: 5px;
  font-size: 24px;
}

#settings-column h3 {
  color: var(--highlight-text-color);
  margin-block-start: 2em;
  margin-block-end: .7em;
}

#settings-column .active {
  color: var(--highlight-text-color);
  border-block-color: var(--highlight-text-color);
}

</style>