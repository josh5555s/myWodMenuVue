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
};
