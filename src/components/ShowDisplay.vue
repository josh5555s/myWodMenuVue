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
  props: ['alreadyScrolling'],
  emits: ['display-titles','now-scrolling'],
  data() {
    return {
      logged: false,
      store: this.$route.params.store,
      product: this.$route.params.product,
      data: []
    }
  },
  methods: {
    getData() {
      try {
        fetch(`http://192.168.1.2:4000${this.$route.path}`)
        .then(response => response.json())
        .then(data => {
          let obj = (JSON.parse(data));
          this.data = obj;
          this.removeOldRows()
        })
      } catch (error) {
        console.log(error)
      }
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
        if (this.product === "cart") {name = name.replace("Cart", "")}
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
        if (this.product === "dab") {
          if (weight === "0 G") {
            weight = "1 G"
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
        if (this.product === "preroll" || this.product === "dab") {tr.appendChild(tdWeight)}
        tr.appendChild(tdType);
        tr.appendChild(tdPrice);

        // Determine # of columns
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
      console.log(this.alreadyScrolling)
      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      async function scroll() {
        let atBottom = false
        let oldYoffset = pageYOffset
        await sleep(3000)
        while (!atBottom) {
          scrollBy(0,1)
          await sleep(20)
          if (oldYoffset === pageYOffset) {
            console.log("stuck at bottom!")
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
    }
  },
  created() {
    this.getData();
    setInterval(() => {
      if (
        this.$route.path !== "/" || 
        this.$route.path !== "/newberg" || 
        this.$route.path !== "/cedar-mill" || 
        this.$route.path !== "/hillsboro" || 
        this.$route.path !== "/sherwood"
      )
      this.getData()
    }, 60000);
    this.displayTitles()
  },
  mounted() {
    this.autoScroll()
  },
  watch: {
    data: function () {
      this.removeOldRows()
      }
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
.dab-name {
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
.dab-type {
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
    width: 205px;
    font-size: 20px;
  }
  .preroll-name,
  .dab-name {
    width: 345px;
  }
  .cart-name,
  .edible-name {
    width: 360px;
  }

  .product-weight {
    width: 50px;
    font-size: 18px;
  }
  .dab-weight {
    width: 40px;
  }

  .product-test {
    width: 140px;
    font-size: 18px;
  }

  .product-type {
    width: 80px;
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
  .cart-name,
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