<template>
  <div id="columns-container" ref="column">
    <div id="table-1-container">
      <table id="table-1" v-for="product in table1Data" :key="product">
        <tr class="flower-info-container">
          <td 
            class="product-name" :class="[dynamicNameClass, dynamicPriceColor(product.price)]" @click="updateSortBy('name')"
          > {{ product.productName }} </td>
          <td
            v-if="hasTest"
            class="product-test" :class="dynamicTestClass" @click="updateSortBy('test')"
          > {{ product.thc }}%, {{ product.cbd }}% </td>
          <td
            v-if="hasWeight"
            class="product-weight" :class="dynamicWeightClass"
          > {{ product.weight }} </td>
          <td
            v-if="this.product !== 'topical'"
            class="product-type" :class="[dynamicTypeClass, dynamicTypeColor(product.type)]" @click="updateSortBy('type')"
          > {{ product.type }} </td>
          <td
            class="product-price" :class="[dynamicPriceClass, dynamicPriceColor(product.price)]" @click="updateSortBy('price')"
          > ${{ product.price }} </td>
        </tr>
      </table>
    </div>
    <div id="table-2-container">
      <table id="table-2" v-for="product in table2Data" :key="product">
        <tr class="flower-info-container">
          <td 
            class="product-name" :class="[dynamicNameClass, dynamicPriceColor(product.price)]" @click="updateSortBy('name')"
          > {{ product.productName }} </td>
          <td
            v-if="hasTest"
            class="product-test" :class="dynamicTestClass" @click="updateSortBy('test')"
          > {{ product.thc }}%, {{ product.cbd }}% </td>
          <td
            v-if="hasWeight"
            class="product-weight" :class="dynamicWeightClass"
          > {{ product.weight }} </td>
          <td
            v-if="this.product !== 'topical'"
            class="product-type" :class="[dynamicTypeClass, dynamicTypeColor(product.type)]" @click="updateSortBy('type')"
          > {{ product.type }} </td>
          <td
            class="product-price" :class="[dynamicPriceClass, dynamicPriceColor(product.price)]" @click="updateSortBy('price')"
          > ${{ product.price }} </td>
        </tr>
      </table>  
    </div>
  </div>
  <specials-ticker></specials-ticker>
</template>

<script>
import SpecialsTicker from './SpecialsTicker.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    SpecialsTicker,
  },
  props: ['fontSize'],
  emits: ['menu-number'],
  data() {
    return {
      logged: false,
      store: this.$route.params.store,
      product: this.$route.params.product,
      fetchLoop: '',
      data: [],
      sortBy: 'type', 
      flipDirection: false,
      autoTesting: ['flower','preroll','cartridge','concentrate'],
      productsWithWeight: ['preroll','cartridge','concentrate'],
    }
  },
  computed: {
    ...mapGetters(['productsUrl','scrollSpeed','alreadyScrolling','screensSetting']),
    halfData() {return Math.ceil(this.data.length / 2)},
    table1Data() {return this.sortedData.slice(0, this.halfData) },
    table2Data() {return this.sortedData.slice(this.halfData, this.data.length) },
    sortedData() {
      let sortedData = []
      sortedData.push(...this.data)
      if (this.sortBy === 'name') {
        sortedData = sortedData.sort((a,b) => {
          let aProp = a.productName.toLowerCase(), bProp = b.productName.toLowerCase();
          if (aProp < bProp) {
            return -1
          }
          if (aProp > bProp) {
            return 1
          }
          return 0
        })
        return this.flipDirection ? sortedData.reverse() : sortedData
      } else if (this.sortBy === 'test') {
        sortedData = sortedData.sort((a,b) => Number(a.thc) - Number(b.thc))
        return this.flipDirection ? sortedData : sortedData.reverse()
      } else if (this.sortBy === 'price') {
        sortedData = sortedData.sort((a,b) => a.price - b.price)
        return this.flipDirection ? sortedData.reverse() : sortedData
      }
      else if (this.sortBy === 'type') { return this.data } 
      else {
        console.log(`This shouldn't happen, but sortBy is: ${this.sortBy}`)
        return 'oops'
      }
    },  
    hasWeight() {return this.productsWithWeight.indexOf(this.product) !== -1},
    hasTest() {return this.autoTesting.indexOf(this.product) !== -1},
    dynamicNameClass() {return `${this.product}-name`},
    dynamicTestClass() {return `${this.product}-test`},
    dynamicWeightClass() {return `${this.product}-weight`},
    dynamicTypeClass() {return `${this.product}-type`},
    dynamicPriceClass() {return `${this.product}-price`},
  },
  methods: {
    updateSortBy(byThis) {
      if (this.sortBy === byThis) {
        this.flipDirection = !this.flipDirection
      } else {
        this.sortBy = byThis
        this.flipDirection = false
      }
      this.$gtag.event('columnClick', {
        'event_category': 'interaction',
        'event_label': 'user clicked on a product column',
        'value': byThis 
      })
      console.log(`sortBy: ${this.sortBy}, flipDirection: ${this.flipDirection}`)
    },
    columnHeight() {
      setTimeout(() => {
        this.$store.commit('columnHeight', this.$refs.column.clientHeight)
      }, 400);
    },
    dynamicTypeColor(type) {
      if (type == "Hybrid"
        || type == "Balanced") {
        return 'blue' 
      } else if (type == "Sativa"
        || type == "Uplifting") {
        return 'red'
      } else if (type == "Relaxing"
        || type == "Relaxed") {
        return 'purple'
      } else if (type == "CBD") {
        return 'green'
      }
    },
    dynamicPriceColor(price) {
      if (this.product === "flower") {
        if (price === 5) {
          return 'highlight'
        }
      }
    },
    getData() {
      const fetchLogic = () => {
        try {
          // console.log('fetching new data...')
          fetch(`${this.productsUrl}${this.$route.path}`)
          .then(response => response.json())
          .then(data => {
            let obj = (JSON.parse(data));
            if (obj !== {}) {
              let data1o1 = obj
              data1o1.forEach(item => {
                if (this.product === "preroll") {
                  item.productName = item.productName.replace("Pre-Roll", "")
                  item.productName = item.productName.replace("pre-roll", "")
                  item.productName = item.productName.replace("1.3G", "")
                  item.productName = item.productName.replace("1G", "")
                  item.productName = item.productName.replace("- -", "-")
                  item.productName = item.productName.replace("--", "-")
                  }
                if (this.product === "cartridge") {
                  item.productName = item.productName.replace("Cart", "")
                  item.productName = item.productName.replace("1G", "")
                  item.productName = item.productName.replace(".5G", "")
                  item.productName = item.productName.replace("- -", "-")
                }
                if (this.product === "concentrate" || this.product === "cartridge") {
                  if (item.weight === "0 G") {
                    item.weight = "1 G"
                  } else if (item.weight === "0.5 G") {
                    item.weight = ".5 G"
                  }
                }
                if (item.type === 'unknown') {item.type = ''}
              })
              // primary sort by type
              let uplifting = [];
              let balanced = [];
              let relaxing = [];
              let typeMissing = [];
              data1o1.forEach(product => {
                if (product.type === 'Uplifting') {uplifting.push(product)} 
                else if (product.type === 'Balanced') {balanced.push(product)}
                else if (product.type === 'Relaxing') {relaxing.push(product)} 
                else {typeMissing.push(product)}
              });

              // turn testing strings into floats to order them
              let typeThc = {
                uplifting:[],
                balanced:[],
                relaxing:[],
                typeMissing:[],
              }
              uplifting.forEach(product => {
                if (product.thc !== undefined){ typeThc.uplifting.push(product) }
              })
              balanced.forEach(product => {
                if (product.thc !== undefined){ typeThc.balanced.push(product) }
              })
              relaxing.forEach(product => {
                if (product.thc !== undefined){ typeThc.relaxing.push(product) }
              })
              typeMissing.forEach(product => {
                if (product.thc !== undefined){ typeThc.typeMissing.push(product) }
              })

              // ternary sort by highest thc
              uplifting = typeThc.uplifting.sort((a, b) => (a.thc > b.thc) ? 1 : -1)
              balanced = typeThc.balanced.sort((a, b) => (a.thc > b.thc) ? 1 : -1)
              relaxing = typeThc.relaxing.sort((a, b) => (a.thc > b.thc) ? 1 : -1)
              typeMissing = typeThc.typeMissing.sort((a, b) => (a.thc > b.thc) ? 1 : -1)
              // secondary sort by price
              uplifting = typeThc.uplifting.sort((a, b) => (a.price < b.price) ? 1 : -1)
              balanced = typeThc.balanced.sort((a, b) => (a.price < b.price) ? 1 : -1)
              relaxing = typeThc.relaxing.sort((a, b) => (a.price < b.price) ? 1 : -1)
              typeMissing = typeThc.typeMissing.sort((a, b) => (a.price < b.price) ? 1 : -1)

              data1o1.length = 0
              data1o1.push(...uplifting,...balanced,...relaxing,...typeMissing)
              // split into two arrays
              let halfwayThrough = Math.floor(data1o1.length / 2)
              let arrayFirstHalf = data1o1.slice(0, halfwayThrough)
              let arraySecondHalf = data1o1.slice(halfwayThrough, data1o1.length)
              let data1o2 = arrayFirstHalf
              let data2o2 = arraySecondHalf
              // select array to display
              if (this.screensSetting === '1 of 1') {this.data = data1o1}
              else if (this.screensSetting === '1 of 2') {this.data = data1o2}
              else if (this.screensSetting === '2 of 2') {this.data = data2o2}
            }
          })
        } catch (error) {
          console.log(error)
        }
      }
      fetchLogic()

      this.fetchLoop = setInterval(() => {
        fetchLogic()
       // fetchLoop firing interupts scroll, bringing it immediately back to the top.  Probably because this.removeOldRows() makes the whole page fit on screen, so bring the screen back to Y = 0.
      }, 600000);
    },
    autoScroll () {
      // let innerLogged = false
      // console.log(`outer scroll speed: ${this.scrollSpeed}`)
      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      const scroll = async () => {
        let atBottom = false
        let oldYoffset = pageYOffset
        await sleep(3000)
        while (!atBottom) {
          if (this.scrollSpeed !== 0) {scrollBy(0,1)}
          // if (!innerLogged) {
          //   innerLogged = true
          //   setInterval(() => {
          //     console.log(`inner scroll speed: ${this.scrollSpeed}`)
          //   }, 1000);
          // }
          await sleep(this.scrollSpeed)
          if (oldYoffset === pageYOffset) {
            await sleep(4000)
            scrollTo(0,0)
            atBottom = true;
          } else {oldYoffset = pageYOffset}
        }
        scroll()
      }
      if (!this.alreadyScrolling && innerWidth < 1080 && innerWidth > 500) {
        scroll()
        this.$store.commit('nowScrolling')
      }
    },
    menuTitles() {
      this.$store.commit('menuTitles', this.product)
      if (this.screensSetting !== '1 of 1') {
        this.$emit('menu-number')
      }
    }
  },
  created() {
    this.getData();
    this.menuTitles()
  },
  mounted() {
    this.autoScroll()
  },
  unmounted() {
    clearInterval(this.fetchLoop)
  },
  watch: {
    screensSetting() {
      clearInterval(this.fetchLoop)
      this.getData()
    },
    data() {
      this.columnHeight()
    }
  },

}
</script>


<style lang="scss">

.blue {
  color:var(--balanced-blue); 
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
#table-1-container {
  width: 50%;
}
#table-2-container {
  width: 50%;
}

#table-1,
#table-2 {
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

  #table-1-container,
  #table-2-container {
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

  .preroll-name, .cartridge-name, .concentrate-name {
    width: 33vw;
  }

  .topical-name {
    width: 88vw;
  }

  .product-weight {
    width: 10vw;
  }

  .cartridge-weight, .concentrate-weight {
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