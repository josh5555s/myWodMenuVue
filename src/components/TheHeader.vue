<template>
  <header>
    <div id="flex-container">
      <div id="title-1-container">
        <h1>{{ title1 }}</h1>
      </div>
      <div id="logo">
        <button @click="selectStore()" >  
          <img :src="require(`@/assets/logo.png`)"/>
        </button>
      </div>
      <div id="title-2-container">
        <h1>{{ title2 }}</h1>
      </div>
    </div>
  </header>
</template>

<script>

export default {
  props: ['title1','title2'],
  emits: ['select-store'],
  data() {
    return {
  
    }
  },
  methods: {
    selectStore() {
      this.$emit("select-store")
    },
  }
}
</script>

<style>
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
@media screen and (max-width: 800px) {

  #flex-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 5px;
    height: 130px;
  }

  #title-category,
  #title-menu {
    
    width: 220px;
  }

  #title-category {
    margin-right: 10px;
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
    height: 85px;
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

  img {
    margin-top: 5px;
    width: 80px;
  }

  #title-menu {
    margin-left: 15px;
  }

  h1 {
    vertical-align: top;
    margin: 22px 0px;
    font-size: 30px;
  }
}

</style>