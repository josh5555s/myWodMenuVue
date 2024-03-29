import { createStore } from 'vuex';
import authModule from './auth/index';
import ordersModule from './orders/index';
import productsModule from './products/index';
import specialsModule from './specials/index';
import uiModule from './UI/index';

const store = createStore({
  modules: {
    auth: authModule,
    orders: ordersModule,
    products: productsModule,
    specials: specialsModule,
    ui: uiModule,
  },
  state() {
    return {};
  },
  mutations: {},
  actions: {},
  getters: {},
});
export default store;
