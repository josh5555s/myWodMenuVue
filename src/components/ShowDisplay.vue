<template>
  <div id="columns-container">
    
    <div id="table-1-container">
      <table id="table-1"></table>
    </div>
    <div id="table-2-container">
      <table id="table-2"></table>
    </div>
  </div>
</template>

<script>
export default {
  props: ['scrollSpeed','alreadyScrolling','selectedScreenSetting'],
  emits: ['display-titles','now-scrolling','menu-number'],
  data() {
    return {
      logged: false,
      store: this.$route.params.store,
      product: this.$route.params.product,
      fetchLoop: '',
      data1o1: [],
      data1o2: [],
      data2o2: [],
      data: [], 
    }
  },
  methods: {
    getData() {
      // let path = `http://192.168.1.2:4000${this.$route.path}`
      let path = `https://api.westernoregondispensary.com${this.$route.path}`
      const fetchLogic = () => {
        try {
          console.log('fetching new data...')
          fetch(path)
          .then(response => response.json())
          .then(data => {
            let obj = (JSON.parse(data));
            if (obj !== {}) {
              this.data1o1 = obj
              if (this.product === 'flower') {
                // primary sort by type
                let uplifting = [];
                let balanced = [];
                let relaxing = [];
                let typeMissing = [];
                this.data1o1.forEach(product => {
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

                this.data1o1.length = 0
                this.data1o1.push(...uplifting,...balanced,...relaxing,...typeMissing)
              }
              // split into two arrays
              let halfwayThrough = Math.floor(this.data1o1.length / 2)
              let arrayFirstHalf = this.data1o1.slice(0, halfwayThrough)
              let arraySecondHalf = this.data1o1.slice(halfwayThrough, this.data1o1.length)
              this.data1o2 = arrayFirstHalf
              this.data2o2 = arraySecondHalf
              // select array to display
              if (this.selectedScreenSetting === '1 of 1') {this.data = this.data1o1}
              else if (this.selectedScreenSetting === '1 of 2') {this.data = this.data1o2}
              else if (this.selectedScreenSetting === '2 of 2') {this.data = this.data2o2}
              this.removeOldRows()
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
    removeOldRows() {
    const table1 = document.getElementById("table-1");
    table1.innerHTML = '';
    const table2 = document.getElementById("table-2");
    table2.innerHTML = '';
    this.addRows();
    },
    addRows() {
      this.data.forEach((row, i)=> {
        //for each item, create/insert table row
        const tr = document.createElement("TR");
        tr.setAttribute("class", "flower-info-container");

        // create name cell
        const tdName = document.createElement("TD");
        let name = row.productName;
        if (this.product === "preroll") {name = name.replace("Pre-Roll", "")}
        if (this.product === "cartridge") {
          name = name.replace("Cart", "")
          name = name.replace("1G", "")
          name = name.replace(".5G", "")
        }
        tdName.textContent = name;
        tdName.setAttribute("class", `${this.product}-name product-name`);

        // create test cell
        const tdTest = document.createElement("TD");
        if (this.product === "flower") {
          // if (typeof row.thc === "undefined") {
          //   row.thc = "%";
          // }
          // if (typeof row.cbd === "undefined") {
          //   row.cbd = "%";
          // }
          tdTest.textContent = `${row.thc}%, ${row.cbd}%`;
        } 
        tdTest.setAttribute("class", `${this.product}-test product-test`);

        // create weight cell
        const tdWeight = document.createElement("TD")
        let weight = row.weight;
        if (this.product === "concentrate" || this.product === "cartridge") {
          if (weight === "0 G") {
            weight = "1 G"
          } else if (weight === "0.5 G") {
            weight = ".5 G"
          }
        }
        tdWeight.textContent = weight;
        tdWeight.setAttribute('class', `${this.product}-weight product-weight`)

        // create type cell (relaxing, uplifting...)
        const tdType = document.createElement("TD");
        if (row.type !== 'unknown') {tdType.textContent = row.type;}
        tdType.setAttribute("class", `${this.product}-type product-type`);

        // create price cell
        const tdPrice = document.createElement("TD");
        tdPrice.textContent = '$' + row.price;
        tdPrice.setAttribute("class", `${this.product}-price product-price`);

        // append cells to row
        tr.appendChild(tdName);
        if (this.product === "flower") {tr.appendChild(tdTest);}
        if (this.product === "preroll" || this.product === "cartridge" || this.product === "concentrate") {tr.appendChild(tdWeight)}
        if (this.product !== 'topical') {tr.appendChild(tdType)}
        tr.appendChild(tdPrice);

        // append rows to 2 table columns
        if (i <= this.data.length / 2) {document.getElementById("table-1").appendChild(tr);}
        else {document.getElementById("table-2").appendChild(tr);}
      })
      this.colorize();
    },
    colorize() {
      let productName = document.querySelectorAll(".product-name");
      let productType = document.querySelectorAll(".product-type");
      let productPrice = document.querySelectorAll(".product-price");

      for (let i = 0; i < productType.length; i++) {
        if (productType[i].innerText == "Hybrid"
          || productType[i].innerText == "Balanced") {
          productType[i].style.color = "#5B9BD5";
          // #5B9BD5 = Light blue matching jars
        } else if (productType[i].innerText == "Sativa"
          || productType[i].innerText == "Uplifting") {
          productType[i].style.color = "#e43434";
          // #e43434 = Pastel red
        } else if (productType[i].innerText == "Relaxing"
          || productType[i].innerText == "Relaxed") {
          productType[i].style.color = "#7030A0";
          // #7030A0 = Purple matching jars
        } else if (productType[i].innerText == "CBD") {
          console.log('CBD!')
          productType[i].style.color = "rgb(19, 255, 37)";
          // #7030A0 = Purple matching jars
        } else {
          productType[i].style.color = "#C1D448";
        }
      }

      if (this.product === "flower") {
        for (let i = 0; i < productPrice.length; i++) {
          if (productPrice[i].innerText === "$5") {
            productPrice[i].style.color = "var(--highlight-text-color)";
            productName[i].style.color = "var(--highlight-text-color)";
          }
        }
      }
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
        this.$emit('now-scrolling')
      }
    },
    displayTitles() {
      this.$emit('display-titles', this.product)
      if (this.selectedScreenSetting !== '1 of 1') {
        this.$emit('menu-number')
      }
    }
  },
  created() {
    this.getData();
    this.displayTitles()
  },
  mounted() {
    this.autoScroll()
  },
  unmounted() {
    clearInterval(this.fetchLoop)
  },
  watch: {
    selectedScreenSetting() {
      clearInterval(this.fetchLoop)
      this.getData()
    }
  },

}
</script>


<style lang="scss">
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
  padding: 3px 3px;
  font-size: 1.6vw;
}

tr.flower-info-container {
  width: 98%;
  margin-left: 2%;
}

.product-name {
  font-weight: bold;
  width: 20vw;
}

.preroll-name,
.concentrate-name,
.cartridge-name {
  width: 30vw;
}

.edible-name,
.tincture-name {
  width: 33vw;
}

.topical-name {
  width: 44vw;
}

.product-weight {
  width: 5vw;
}

.product-test {
  width: 15vw;
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
    padding: 4px 3px;
    font-size: 3.2vw;
  }

  tr.flower-info-container {
      width: 100%;
      margin-left: 0%;
  }


  .product-name {
    width: 66vw;
  }

  .flower-name {
    width: 45vw;
  }

  .topical-name {
    width: 88vw;
  }

  .product-weight {
    width: 10vw;
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