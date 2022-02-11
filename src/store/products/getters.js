export default {
  productsUrl(state) {
    return state.productionProductsApi
      ? 'https://api.westernoregondispensary.com'
      : 'http://192.168.1.29:4000';
  },
  products(state) {
    return state.products;
  },
  productsScreen1of2(state) {
    return state.productsScreen1of2;
  },
  productsScreen2of2(state) {
    return state.productsScreen2of2;
  },
};
