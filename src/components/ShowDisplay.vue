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
  props: ['store','product','results'],
  // emits: ['show-display'],
  data() {
    return {
      data: []
    }
  },
  methods: {
    selectReleventData() {
      if (this.store === "newberg" && this.product === "flower") {this.data = this.results.newberg.flower;}
      else if (this.store === "newberg" && this.product === "preroll") {this.data = this.results.newberg.preroll;} 
      else if (this.store === "newberg" && this.product === "cart") {this.data = this.results.newberg.cart;}
      else if (this.store === "newberg" && this.product === "dab") {this.data = this.results.newberg.dab;} 
      else if (this.store === "newberg" && this.product === "edible") {this.data = this.results.newberg.edible;} 
      // Cedar Mill
      else if (this.store === "cedar-mill" && this.product === "flower") {this.data = this.results.cedarMill.flower;}
      else if (this.store === "cedar-mill" && this.product === "preroll") {this.data = this.results.cedarMill.preroll;}
      else if (this.store === "cedar-mill" && this.product === "cart") {this.data = this.results.cedarMill.cart;}
      else if (this.store === "cedar-mill" && this.product === "dab") {this.data = this.results.cedarMill.dab;}
      else if (this.store === "cedar-mill" && this.product === "edible") {this.data = this.results.cedarMill.edible;}
      // Hillsboro
      else if (this.store === "hillsboro" && this.product === "flower") {this.data = this.results.hillsboro.flower;}
      else if (this.store === "hillsboro" && this.product === "preroll") {this.data = this.results.hillsboro.preroll;}
      else if (this.store === "hillsboro" && this.product === "cart") {this.data = this.results.hillsboro.cart;}
      else if (this.store === "hillsboro" && this.product === "dab") {this.data = this.results.hillsboro.dab;} 
      else if (this.store === "hillsboro" && this.product === "edible") {this.data = this.results.hillsboro.edible;}
      // Sherwood
      else if (this.store === "sherwood" && this.product === "flower") {this.data = this.results.sherwood.flower;}
      else if (this.store === "sherwood" && this.product === "preroll") {this.data = this.results.sherwood.preroll;}
      else if (this.store === "sherwood" && this.product === "cart") {this.data = this.results.sherwood.cart;}
      else if (this.store === "sherwood" && this.product === "dab") {this.data = this.results.sherwood.dab;}
      else if (this.store === "sherwood" && this.product === "edible") {this.data = this.results.sherwood.cart;}
      this.removeOldRows();
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
    }
  },
  mounted() {
    this.selectReleventData()
  },
  watch: {
    results: function () {this.selectReleventData()}
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