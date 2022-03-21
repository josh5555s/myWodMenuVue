export default {
  productsUrl(state) {
    return state.productionProductsApi
      ? 'https://api.westernoregondispensary.com'
      : 'http://192.168.1.2:4000';
  },
  readFlowerPricePointUrl(state) {
    return state.useProductionOrdersApi
      ? 'https://api.mywod.com/'
      : 'http://127.0.0.1:8079/orders_api/read_flower_price_points/';
  },
  products(state) {
    return state.products;
  },
  flowerPricePoints(state) {
    return state.flowerPricePoints;
  },
  productsScreen1of2(state) {
    return state.productsScreen1of2;
  },
  productsScreen2of2(state) {
    return state.productsScreen2of2;
  },
};
