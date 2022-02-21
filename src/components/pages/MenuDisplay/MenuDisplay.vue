<template>
  <div id="columns-container" ref="column">
    <product-column
      v-for="(table, tableIndex) in tables"
      :key="table"
      :tableIndex="tableIndex"
      :tableData="table"
      :product="product"
      :sortBy="sortBy"
      :flipDirection="flipDirection"
      @set-sort-by="setSortBy"
    ></product-column>
  </div>
  <specials-ticker></specials-ticker>
</template>

<script>
import ProductColumn from './ProductColumn.vue';
import SpecialsTicker from './SpecialsTicker.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    ProductColumn,
    SpecialsTicker,
  },
  props: ['fontSize'],
  emits: ['menu-number'],
  data() {
    return {
      userAuth: false,
      userType: 'none',
      logged: false,
      store: this.$route.params.store,
      product: this.$route.params.product,
      fetchLoop: '',
      sortBy: 'type',
      flipDirection: false,
    };
  },
  computed: {
    ...mapGetters([
      'products',
      'productsScreen1of2',
      'productsScreen2of2',
      'scrollSpeed',
      'alreadyScrolling',
      'screensSetting',
    ]),
    halfProductsForScreen() {
      return Math.ceil(this.screenSplitProducts.length / 2);
    },
    table1Data() {
      return this.screenSplitProducts.slice(0, this.halfProductsForScreen);
    },
    table2Data() {
      return this.screenSplitProducts.slice(
        this.halfProductsForScreen,
        this.screenSplitProducts.length
      );
    },
    tables() {
      return [this.table1Data, this.table2Data];
    },
    sortedData() {
      let sortedData = [];
      sortedData = [...this.products];
      let reverseType = [...this.products];
      reverseType.reverse();
      if (this.sortBy === 'name') {
        sortedData = sortedData.sort((a, b) => {
          let aProp = a.productName.toLowerCase(),
            bProp = b.productName.toLowerCase();
          if (aProp < bProp) {
            return -1;
          }
          if (aProp > bProp) {
            return 1;
          }
          return 0;
        });
        return this.flipDirection ? sortedData.reverse() : sortedData;
      } else if (this.sortBy === 'test') {
        sortedData = sortedData.sort((a, b) => Number(a.thc) - Number(b.thc));
        return this.flipDirection ? sortedData : sortedData.reverse();
      } else if (this.sortBy === 'price') {
        sortedData = sortedData.sort((a, b) => a.price - b.price);
        return this.flipDirection ? sortedData.reverse() : sortedData;
      } else if (this.sortBy === 'type') {
        return this.flipDirection ? [...this.products].reverse() : this.products;
      } else {
        console.log(`This shouldn't happen, but sortBy is: ${this.sortBy}`);
        return 'oops';
      }
    },
    screenSplitProducts() {
      let halfwayThrough = Math.floor(this.sortedData.length / 2);
      let arrayFirstHalf = this.sortedData.slice(0, halfwayThrough);
      let arraySecondHalf = this.sortedData.slice(halfwayThrough, this.sortedData.length);
      if (this.screensSetting === '1 of 1') {
        return this.sortedData;
      } else if (this.screensSetting === '1 of 2') {
        return arrayFirstHalf;
      } else {
        return arraySecondHalf;
      }
    },
  },
  methods: {
    setSortBy(byThis) {
      if (this.sortBy === byThis) {
        this.flipDirection = !this.flipDirection;
      } else {
        this.sortBy = byThis;
        this.flipDirection = false;
      }
    },
    // updateSortBy(byThis) {
    //   if (this.sortBy === byThis) {
    //     this.swapFlipDirection();
    //   } else {
    //     this.sortBy = byThis;
    //     this.flipDirection = false;
    //   }
    //   this.$gtag.event('columnClick', {
    //     event_category: 'interaction',
    //     event_label: 'user clicked on a product column',
    //     value: byThis,
    //   });
    //   console.log(`sortBy: ${this.sortBy}, flipDirection: ${this.flipDirection}`);
    // },
    columnHeight() {
      setTimeout(() => {
        this.$store.commit('columnHeight', this.$refs.column.clientHeight);
      }, 400);
    },
    async fetchProducts() {
      try {
        await this.$store.dispatch('fetchProducts', {
          store: this.store,
          product: this.product,
        });
      } catch (error) {
        this.error = error.message || 'Failed to fetch products';
      }
    },
    loopFetchProducts() {
      this.fetchProducts();
      this.fetchLoop = setInterval(() => {
        this.fetchProducts();
        // fetchLoop firing interupts scroll, bringing it immediately back to the top.  Probably because this.removeOldRows() makes the whole page fit on screen, so bring the screen back to Y = 0.
      }, 600000);
    },
    autoScroll() {
      // let innerLogged = false
      // console.log(`outer scroll speed: ${this.scrollSpeed}`)
      function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }

      if (this.userType === 'store') {
        const scroll = async () => {
          let atBottom = false;
          let oldYoffset = pageYOffset;
          await sleep(3000);
          while (!atBottom) {
            if (this.scrollSpeed !== 0) {
              scrollBy(0, 1);
            }
            // if (!innerLogged) {
            //   innerLogged = true
            //   setInterval(() => {
            //     console.log(`inner scroll speed: ${this.scrollSpeed}`)
            //   }, 1000);
            // }
            await sleep(this.scrollSpeed);
            if (oldYoffset === pageYOffset) {
              await sleep(4000);
              scrollTo(0, 0);
              atBottom = true;
            } else {
              oldYoffset = pageYOffset;
            }
          }
          scroll();
        };
        if (!this.alreadyScrolling && innerWidth < 1080 && innerWidth > 500) {
          scroll();
          this.$store.commit('nowScrolling');
        }
      }
    },
    menuTitles() {
      this.$store.commit('menuTitles', this.product);
      if (this.screensSetting !== '1 of 1') {
        this.$emit('menu-number');
      }
    },
  },
  created() {
    document.title = `${this.store} ${this.product}`;
    this.loopFetchProducts();
    this.menuTitles();
  },
  mounted() {
    this.autoScroll();
  },
  unmounted() {
    clearInterval(this.fetchLoop);
  },
  watch: {
    screensSetting() {
      clearInterval(this.fetchLoop);
      this.loopFetchProducts();
    },
    products() {
      this.columnHeight();
    },
  },
};
</script>

<style lang="scss">
.blue {
  color: var(--balanced-blue);
}
.red {
  color: var(--uplifting-red);
}
.purple {
  color: var(--relaxing-purple);
}
.green {
  color: var(--cbd-green);
}
.highlight {
  color: var(--highlight-text-color);
}

#columns-container {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}
#table-container {
  width: 50%;
}

#table {
  display: flex;
  flex-direction: column;
}

table,
th,
td {
  border: 0px solid black;
  border-collapse: collapse;
  padding: 1.5px 3px;
  font-size: 1.6vw;
  cursor: pointer;
}

.product-name {
  font-weight: bold;
  width: 20vw;
}

.edible-name,
.tincture-name {
  width: 33vw;
}

.topical-name {
  width: 44vw;
}

.product-weight {
  width: 6vw;
}

.product-test {
  width: 14vw;
}

.product-type {
  font-weight: bold;
  width: 8vw;
}

.product-price {
  width: 4vw;
}

/* MEDIA QUERIES */

/* Tablet */
@media screen and (max-width: 1080px) {
  #columns-container {
    flex-direction: column;
    margin-top: 0px;
  }

  #table-container {
    width: 100%;
  }

  table,
  th,
  td {
    // font-size: 3.2vw;
    font-size: 2.6vw;
    // font-size: 2vw;
  }

  tr.flower-info-container {
    width: 100%;
    margin-left: 0%;
  }

  .product-name {
    width: 66vw;
  }

  .flower-name {
    width: 44vw;
  }

  .preroll-name,
  .cartridge-name,
  .concentrate-name {
    width: 33vw;
  }

  .topical-name {
    width: 88vw;
  }

  .product-weight {
    width: 10vw;
  }

  .cartridge-weight,
  .concentrate-weight {
    width: 6vw;
  }

  .product-test {
    width: 26vw;
  }

  .product-type {
    width: 14vw;
  }

  .product-price {
    width: 9vw;
  }
}
</style>
