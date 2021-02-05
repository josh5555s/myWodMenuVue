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
        // duplicate code due to 'this' being undefined when in a local function
        // let path = `http://192.168.1.29:4000${this.$route.path}`
        let path = `https://api.westernoregondispensary.com${this.$route.path}`
        try {
          console.log('fetching new data...')
          fetch(path)
          .then(response => response.json())
          .then(data => {
            let obj = (JSON.parse(data));
            if (obj !== {}) {
              this.data1o1 = obj
              if (this.product === 'flower') {
                // secondary sort by price
                this.data1o1 = this.data1o1.sort((a, b) => (a.price < b.price) ? 1 : -1)
                // primary sort by type
                let uplifting = [];
                let balanced = [];
                let relaxing = [];
                let typeMissing = [];
                this.data1o1.forEach(product => {
                  if (product.type === 'Uplifting' || product.strainType === 'Uplifting') {
                    uplifting.push(product)
                  } else if (product.type === 'Balanced') {
                    balanced.push(product)
                  } else if (product.type === 'Relaxing') {
                    relaxing.push(product)
                  } else {
                    typeMissing.push(product)
                  }
                });
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

      this.fetchLoop = setInterval(() => {
        try {
          console.log('fetching new data...')
          fetch(path)
          .then(response => response.json())
                   .then(data => {
            let obj = (JSON.parse(data));
            if (obj !== {}) {
              this.data1o1 = obj
              if (this.product === 'flower') {
                // secondary sort by price
                this.data1o1 = this.data1o1.sort((a, b) => (a.price < b.price) ? 1 : -1)
                // primary sort by type
                let uplifting = [];
                let balanced = [];
                let relaxing = [];
                let typeMissing = [];
                this.data1o1.forEach(product => {
                  if (product.type === 'Uplifting' || product.strainType === 'Uplifting') {
                    uplifting.push(product)
                  } else if (product.type === 'Balanced') {
                    balanced.push(product)
                  } else if (product.type === 'Relaxing') {
                    relaxing.push(product)
                  } else {
                    typeMissing.push(product)
                  }
                });
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
        // fetchLoop firing interupts scroll, bringing it immediately back to the top.  Need better understanding of this.function() scope issues in order to resolve this issue. Probably related to issue running this.function() inside an async function.
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
        let name = row.strain;
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
          if (typeof row.thc === "undefined") {
            row.thc = "%";
          }
          if (typeof row.cbd === "undefined") {
            row.cbd = "%";
          }
          tdTest.textContent = `${row.thc}, ${row.cbd}`;
        } else {
          tdTest.textContent = row.test;
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
        else {         
          if (row.strainType !== "") {tdType.textContent = row.strainType;}
          else {tdType.textContent = ''}
        }
        tdType.setAttribute("class", `${this.product}-type product-type`);

        // create price cell
        const tdPrice = document.createElement("TD");
        tdPrice.textContent = '$' + row.price;
        tdPrice.setAttribute("class", `${this.product}-price product-price`);

        // append cells to row
        tr.appendChild(tdName);
        if (this.product === "flower") {tr.appendChild(tdTest);}
        if (this.product === "preroll" || this.product === "cartridge" || this.product === "concentrate") {tr.appendChild(tdWeight)}
        tr.appendChild(tdType);
        tr.appendChild(tdPrice);

        // Determine # of columns for larger than tablet screens
        if (innerWidth > 650) {
          // append rows to 2 table columns
          if (i <= this.data.length / 2) {document.getElementById("table-1").appendChild(tr);}
          else {document.getElementById("table-2").appendChild(tr);}
        } else {
          // append rows to single column (tablet/mobile)
          document.getElementById("table-1").appendChild(tr);
        }
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
        } else {
          productType[i].style.color = "#C1D448";
        }
      }

      if (this.product === "flower") {
        for (let i = 0; i < productPrice.length; i++) {
          if (productPrice[i].innerText === "$5") {
            productPrice[i].style.color = "white";
            productName[i].style.color = "white";
          }
        }
      }
    },
    autoScroll () {
      let speed = this.scrollSpeed
      // console.log(`outer scroll speed: ${speed}`)
      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      async function scroll() {
        let atBottom = false
        let oldYoffset = pageYOffset
        await sleep(3000)
        while (!atBottom) {
          scrollBy(0,1)
          // console.log(`inner scroll speed: ${speed}`)
          await sleep(speed)
          if (oldYoffset === pageYOffset) {
            await sleep(3000)
            scrollTo(0,0)
            atBottom = true;
          } else {oldYoffset = pageYOffset}
        }
        scroll()
      }
      if (!this.alreadyScrolling && innerWidth < 800 && innerWidth > 500) {
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
  watch: {
    // data: function () {
    //   this.removeOldRows()
    //   }
  },
  created() {
    this.getData();
    this.displayTitles()
  },
  mounted() {
    this.autoScroll()
  },
  unmounted() {
    console.log("fetchLoop cleared")
    clearInterval(this.fetchLoop)
  },
}
</script>

<style>
#columns-container {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}

#table-1-container {
  width: 100%;
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
}

tr {
  width: 800px;
  margin-left: 40px;
}

.product-name {
  font-weight: bold;
  width: 330px;
}
.preroll-name,
.concentrate-name {
  width: 550px
}

.product-weight {
  width: 70px;
}

.product-test {
  width: 220px;
}

.product-type {
  font-weight: bold;
  width: 130px;
}
.preroll-type,
.concentrate-type {
  width: 120px;
}
.product-price {
  width: 80px;
}

/* MEDIA QUERIES */
/* Tablet */
@media screen and (max-width: 800px) {
  #columns-container {
    margin-top: 0px;
  }

  table,
  th,
  td {
    padding: 4px 3px;
  }

  tr {
    width: 500px;
    margin-left: 5px;
  }

  .product-name {
    font-weight: bold;
    width: 360px;
    font-size: 20px;
  }
  .flower-name{
    width: 205px;
  }
  .preroll-name {
    width: 320px;
  }
  .cartridge-name {
    width: 320px;
  }
  .edible-name {
    width: 360px;
  }

  .product-weight {
    width: 55px;
    font-size: 18px;
  }
  .concentrate-weight,
  .cartridge-weight {
    width: 35px;
  }

  .product-test {
    width: 160px;
    font-size: 18px;
  }

  .product-type {
    width: 75px;
    font-size: 17px;
  }
  .product-price {
    width: 45px;
    font-size: 20px;
  }
}

/* Phone */
@media screen and (max-width: 400px) {
  tr {
    width: 360px;
    margin-left: 0px;
  }

  .product-name {
    width: 190px;
    font-size: 15px;
  }
  .cartridge-name,
  .edible-name {
    width: 240px;
  }

  .product-weight {
    width: 50px;
    font-size: 15px;
  }

  .product-test {
    width: 110px;
    font-size: 13px;
  }

  .product-type {
    width: 60px;
     font-size: 13px;
  }
  .product-price {
    width: 40px;
     font-size: 15px;
  }
}
</style>