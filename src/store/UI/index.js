import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
  state() {
    return {
      title1: 'SELECT',
      title2: 'STORE',
      scrollSpeed: 40,
      alreadyScrolling: false,
      screensSetting: '1 of 1',
      headerHeight: 0,
      columnHeight: 0,
    };
  },
  mutations,
  actions,
  getters,
};
