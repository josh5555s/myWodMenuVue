import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
  state() {
    return {
      useProductionOrdersApi: false,
      orders: [],
      orderItems: [],
    };
  },
  mutations,
  actions,
  getters,
};
