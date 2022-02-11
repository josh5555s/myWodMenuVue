<template>
  <div id="column-container">
    <ul v-if="storeSelector" class="select-menu">
      <li v-for="store in stores" v-bind:key="store.url">
        <router-link :to="`${store.url}`">
          <h2>
            {{ store.name }}
          </h2>
        </router-link>
      </li>
    </ul>

    <ul v-else class="select-menu">
      <li v-for="(product, i) in products" v-bind:key="product">
        <router-link :to="`${location}/${products[i]}`">
          <h2 class="cap">
            {{ product }}
          </h2>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stores: [
        { url: 'cedarMill', name: 'Cedar Mill' },
        { url: 'hillsboro', name: 'Hillsboro' },
        { url: 'newberg', name: 'Newberg' },
        { url: 'sherwood', name: 'Sherwood' },
      ],
      products: [
        'specials',
        'flower',
        'preroll',
        'cartridge',
        'concentrate',
        'edible',
        'tincture',
        'topical',
      ],
    };
  },
  computed: {
    storeSelector() {
      return this.$route.path === '/';
    },
    location() {
      return this.$route.path;
    },
  },
  methods: {
    updateTitles() {
      if (this.storeSelector) {
        this.$store.commit('storeTitles');
      } else {
        this.$store.commit('productTitles');
      }
    },
  },
  created() {
    document.title = 'WOD Menu';
  },
  mounted() {
    this.updateTitles();
  },
  watch: {
    storeSelector() {
      this.updateTitles();
    },
  },
};
</script>

<style lang="scss" scoped>
#column-container {
  display: flex;
  justify-content: center;
}

.select-menu {
  text-align: center;
  min-width: 200px;

  :hover {
    color: var(--highlight-text-color);
  }
}

ul {
  list-style-type: none;
  padding-left: 0;
}
</style>
