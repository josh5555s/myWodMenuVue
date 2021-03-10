<template>
  <div id="settings-column-container">
    <div id="settings-column">

      <div id="theme-settings">
        <h3>Color Theme</h3>
          <button
            @click="updateSelectedThemeSetting(false)"
            v-bind:class="{ active: buttonLightActive }"
            >Light <i class="far fa-sun"></i></button>
          <button
            @click="updateSelectedThemeSetting(true)"
            v-bind:class="{ active: buttonDarkActive }"
          >Dark  <i class="far fa-moon"></i></button>
        <!-- </div> -->
      </div>

      <div id="screen-settings">
        <h3>Screen Number</h3>
        <!-- <div class="settings-block"> -->
          <button 
            @click="updateSelectedScreenSetting('1 of 1')"
            v-bind:class="{ active: button1o1Active }"
          >1 of 1</button>
          <button 
            @click="updateSelectedScreenSetting('1 of 2')"
            v-bind:class="{ active: button1o2Active }"
          >1 of 2</button>
          <button 
            @click="updateSelectedScreenSetting('2 of 2')"
            v-bind:class="{ active: button2o2Active }"
          >2 of 2</button>
        <!-- </div> -->
      </div>

 <!-- show only if scroll is enabled -->
      <div id="scroll-settings" v-if="windowInnerWidth < 1080">
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

export default {
  props: ['button1o1Active','button1o2Active','button2o2Active','buttonOffActive','buttonSlowActive','buttonMediumActive','buttonFastActive','buttonDarkActive','buttonLightActive','buttonSystemActive','alreadyScrolling'],
  emits: ['screen-setting','scroll-speed', 'theme-setting'],
  data() {
    return {
      settingsButtonText: 'Settings',
      showSettings: false,
      windowInnerWidth: 0
    }
  },
  methods: {
    getLocation() {
      this.location = this.$route.path
    },
    getInnerWidth() {
      this.windowInnerWidth = window.innerWidth
    },
    updateSelectedThemeSetting(setting) {
      this.$emit('theme-setting', setting)
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

#theme-settings,
#scroll-settings,
#screen-settings {
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