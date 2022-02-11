import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
  state() {
    return {
      productionSpecialsApi: true,
      currentSpecials: null,
      upcomingSpecials: null,
    };
  },
  mutations,
  actions,
  getters,
};
