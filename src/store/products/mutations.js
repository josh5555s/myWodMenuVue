export default {
  setFlowerPricePoints(state, payload) {
    state.flowerPricePoints = [...payload.flowerPricePoints.reverse()];
  },
  processProducts(state, payload) {
    let data1o1 = payload.products;
    data1o1.forEach((item) => {
      if (this.product === 'preroll') {
        item.productName = item.productName.replace('Pre-Roll', '');
        item.productName = item.productName.replace('pre-roll', '');
        item.productName = item.productName.replace('1.3G', '');
        item.productName = item.productName.replace('1G', '');
        item.productName = item.productName.replace('- -', '-');
        item.productName = item.productName.replace('--', '-');
      }
      if (this.product === 'cartridge') {
        item.productName = item.productName.replace('Cart', '');
        item.productName = item.productName.replace('1G', '');
        item.productName = item.productName.replace('.5G', '');
        item.productName = item.productName.replace('- -', '-');
      }
      if (this.product === 'concentrate' || this.product === 'cartridge') {
        if (item.weight === '0 G') {
          item.weight = '1 G';
        } else if (item.weight === '0.5 G') {
          item.weight = '.5 G';
        }
      }
      if (item.type === 'unknown') {
        item.type = '';
      }
    });
    // primary sort by type
    let uplifting = [];
    let balanced = [];
    let relaxing = [];
    let typeMissing = [];

    data1o1.forEach((product) => {
      if (product.type === 'Uplifting') {
        uplifting.push(product);
      } else if (product.type === 'Balanced') {
        balanced.push(product);
      } else if (product.type === 'Relaxing') {
        relaxing.push(product);
      } else {
        typeMissing.push(product);
      }
    });

    // turn testing strings into floats to order them
    let typeThc = {
      uplifting: [],
      balanced: [],
      relaxing: [],
      typeMissing: [],
    };
    uplifting.forEach((product) => {
      if (product.thc !== undefined) {
        typeThc.uplifting.push(product);
      }
    });
    balanced.forEach((product) => {
      if (product.thc !== undefined) {
        typeThc.balanced.push(product);
      }
    });
    relaxing.forEach((product) => {
      if (product.thc !== undefined) {
        typeThc.relaxing.push(product);
      }
    });
    typeMissing.forEach((product) => {
      if (product.thc !== undefined) {
        typeThc.typeMissing.push(product);
      }
    });

    // ternary sort by highest thc
    uplifting = typeThc.uplifting.sort((a, b) => (a.thc > b.thc ? 1 : -1));
    balanced = typeThc.balanced.sort((a, b) => (a.thc > b.thc ? 1 : -1));
    relaxing = typeThc.relaxing.sort((a, b) => (a.thc > b.thc ? 1 : -1));
    typeMissing = typeThc.typeMissing.sort((a, b) => (a.thc > b.thc ? 1 : -1));
    // secondary sort by price
    uplifting = typeThc.uplifting.sort((a, b) => (a.price < b.price ? 1 : -1));
    balanced = typeThc.balanced.sort((a, b) => (a.price < b.price ? 1 : -1));
    relaxing = typeThc.relaxing.sort((a, b) => (a.price < b.price ? 1 : -1));
    typeMissing = typeThc.typeMissing.sort((a, b) => (a.price < b.price ? 1 : -1));

    data1o1.length = 0;
    data1o1.push(...uplifting, ...balanced, ...relaxing, ...typeMissing);
    state.products = data1o1;
  },
  splitAcrossTwoScreens(state, context) {
    const products = context.getters.products;
    let halfwayThrough = Math.floor(products.length / 2);
    let arrayFirstHalf = products.slice(0, halfwayThrough);
    let arraySecondHalf = products.slice(halfwayThrough, products.length);
    state.productsScreen1of2 = arrayFirstHalf;
    state.productsScreen2of2 = arraySecondHalf;
  },
};
