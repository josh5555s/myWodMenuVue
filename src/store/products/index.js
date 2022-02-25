import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
  state() {
    return {
      productionProductsApi: true,
      products: [],
      productsScreen1of2: [],
      productsScreen2of2: [],
      flowerPricePoints: [],
    };
  },
  mutations,
  actions,
  getters,
};
