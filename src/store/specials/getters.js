export default {
  specialsUrl(state) {
    return state.productionSpecialsApi
      ? 'https://api.westernoregondispensary.com/specials'
      : 'http://192.168.1.29:4000/specials';
  },
  currentSpecials(state) {
    return state.currentSpecials;
  },
  upcomingSpecials(state) {
    return state.upcomingSpecials;
  },
};
