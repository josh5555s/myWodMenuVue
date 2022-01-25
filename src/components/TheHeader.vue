<template>
  <header>
    <div id="upper-right">
      <router-link @click="toggleMenu('close')" :to="`${'/sign-in'}`">
        <h5 id="sign-in">Sign In</h5>
      </router-link>
      <button @click="toggleMenu('toggle')"><i class="fas fa-cog"></i></button>
    </div>
    <div id="flex-container" ref="header">
      <div class="title-container tc-left">
        <h1>{{ title1 }}</h1>
      </div>
      <div v-if="darkMode" id="logo">
        <router-link to="/"><img :src="require(`@/assets/dark-logo.png`)"/></router-link>
      </div>
      <div v-else id="logo">
        <router-link to="/"><img :src="require(`@/assets/light-logo.png`)"/></router-link>
      </div>
      <div class="title-container tc-right">
        <h1>{{ title2 }}</h1>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {};
  },
  props: ['darkMode'],
  emits: ['toggle-menu'],
  computed: {
    ...mapGetters(['title1', 'title2']),
  },
  methods: {
    toggleMenu(toggle) {
      this.$emit('toggle-menu', toggle);
    },
    headerHeight() {
      this.$store.commit('headerHeight', this.$refs.header.clientHeight);
    },
  },
  mounted() {
    this.headerHeight();
  },
};
</script>

<style>
#upper-right {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1001;
  display: flex;
  flex-direction: row;
}

#sign-in {
  margin: 0 20px 0 0;
}

#upper-right button {
  background-color: var(--app-background-color);
  color: var(--primary-text-color);
  border-block-color: var(--primary-text-color);
  height: 25px;
}

#flex-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 5px;
  height: 140px;
  width: 100%;
}

#title-category,
#title-menu {
  font-size: 30px;
  width: 25vw;
}

.title-container {
  padding-top: 20px;
}

.tc-left {
  width: 250px;
  text-align: right;
}

.tc-right {
  width: 250px;
}

#title-category {
  margin-right: 50px;
}

img {
  margin-top: 5px;
  width: 150px;
}

#title-menu {
  margin-left: 50px;
}

h1 {
  vertical-align: top;
  margin: 25px 0px;
}

/* MEDIA QUERIES */
/* Tablet */
@media screen and (max-width: 1080px) {
  #flex-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 5px;
    height: 130px;
  }

  #title-category,
  #title-menu {
    width: 23vw;
  }

  #title-category {
    margin-right: 10px;
  }

  .title-container {
    padding-top: 3px;
  }

  img {
    margin-top: 5px;
    width: 120px;
  }

  #title-menu {
    margin-left: 20px;
  }

  h1 {
    vertical-align: top;
    margin: 30px 0px;
    font-size: 35px;
  }
}

/* Phone */
@media screen and (max-width: 400px) {
  body {
    font-size: 14px;
  }

  #flex-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 5px;
    height: 80px;
    margin-left: 15px;
  }

  #title-category,
  #title-menu {
    font-size: 14px;
    width: 160px;
  }

  #title-category {
    margin-right: 15px;
  }

  .title-container {
    padding-top: 0px;
  }

  img {
    margin-top: 5px;
    width: 70px;
  }
  /* 
  #title-menu {
    margin-left: 15px;
  } */

  h1 {
    vertical-align: top;
    margin: 22px 0px;
    font-size: 20px;
  }
}
</style>
