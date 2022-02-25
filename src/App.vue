<template>
  <Drawer :direction="'right'" :exist="true" ref="LeftDrawer">
    <DrawerContent
      :fontSize="fontSize"
      @theme-setting="updateSelectedThemeSetting"
      @font-size="updateFontSize"
    />
  </Drawer>

  <TheHeader :darkMode="darkMode" @toggle-menu="toggleMenu" />
  <router-view :fontSize="fontSize"></router-view>
</template>

<script>
import TheHeader from './components/UI/TheHeader.vue';
import Drawer from './components/UI/Drawer.vue';
import DrawerContent from './components/UI/DrawerContent.vue';
// import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    TheHeader,
    Drawer,
    DrawerContent,
  },
  data() {
    return {
      fontSize: 'large',
      darkMode: false,
      nothing: '',
    };
  },
  methods: {
    toggleMenu(toggle) {
      if (toggle === 'toggle') {
        this.$refs.LeftDrawer.active
          ? this.$refs.LeftDrawer.close()
          : this.$refs.LeftDrawer.open();
      } else {
        this.$refs.LeftDrawer.close();
      }
    },
    updateSelectedThemeSetting(setting) {
      this.darkMode = setting;
    },
    updateFontSize(size) {
      this.fontSize = size;
      console.log('fontSize: ' + this.fontSize);
    },
  },
  created() {
    this.$store.dispatch('checkLocalToken');
  },
  mounted() {
    this.$store.dispatch('readFlowerPricePoints');

    // set page title
    document.title = 'WOD Menu';

    // set 'app-background' class to body tag
    let bodyElement = document.body;
    bodyElement.classList.add('app-background');

    // check for active theme
    let htmlElement = document.documentElement;
    let theme = localStorage.getItem('theme');

    if (theme === 'dark') {
      htmlElement.setAttribute('theme', 'dark');
      this.darkMode = true;
    } else {
      htmlElement.setAttribute('theme', 'light');
      this.darkMode = false;
    }
  },
  watch: {
    darkMode: function() {
      // add/remove class to/from html tag
      let htmlElement = document.documentElement;

      if (this.darkMode) {
        localStorage.setItem('theme', 'dark');
        htmlElement.setAttribute('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
        htmlElement.setAttribute('theme', 'light');
      }
    },
  },
};
</script>

<style lang="scss">
@import 'src/components/UI/_themes.scss';
@import 'src/components/UI/_global.scss';
</style>
