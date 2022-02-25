export default {
  async fetchProducts(context, payload) {
    const url = `${context.getters.productsUrl}/${payload.store}/${payload.product}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let obj = JSON.parse(data);
        if (obj !== {}) {
          context.commit('processProducts', {
            products: obj,
            product: payload.product,
          });
        }
      });
  },
  readFlowerPricePoints(context) {
    fetch(context.getters.readFlowerPricePointUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log(response);
        }
      })
      .then((data) => {
        context.commit('setFlowerPricePoints', { flowerPricePoints: data });
      })
      .catch((error) => {
        console.log(error);
        console.log('error in read flower price points in actions.js');
        this.error = 'Failed to fetch flower price points';
      });
  },
};
