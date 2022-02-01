import { createStore } from 'vuex';
import rootMutations from './mutations';
import rootActions from './actions';
import rootGetters from './getters';
import authModule from './auth/index';

const store = createStore({
  modules: {
    auth: authModule,
  },
  state() {
    return {
      productionProductsApi: true,
      productionSpecialsApi: true,
      title1: 'SELECT',
      title2: 'STORE',
      scrollSpeed: 40,
      alreadyScrolling: false,
      screensSetting: '1 of 1',
      currentSpecials: null,
      upcomingSpecials: null,
      headerHeight: 0,
      columnHeight: 0,
    };
  },
  mutations: rootMutations,
  actions: rootActions,
  getters: rootGetters,
});
export default store;
