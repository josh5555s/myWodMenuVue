export default {
  productsUrl(state) {
    return state.productionProductsApi
      ? 'https://api.westernoregondispensary.com'
      : 'http://192.168.1.29:4000';
  },
  specialsUrl(state) {
    return state.productionSpecialsApi
      ? 'https://api.westernoregondispensary.com/specials'
      : 'http://192.168.1.29:4000/specials';
  },
  headerHeight(state) {
    return state.headerHeight;
  },
  columnHeight(state) {
    return state.columnHeight;
  },
  title1(state) {
    return state.title1;
  },
  title2(state) {
    return state.title2;
  },
  scrollSpeed(state) {
    return state.scrollSpeed;
  },
  alreadyScrolling(state) {
    return state.alreadyScrolling;
  },
  screensSetting(state) {
    return state.screensSetting;
  },
  currentSpecials(state) {
    return state.currentSpecials;
  },
  upcomingSpecials(state) {
    return state.upcomingSpecials;
  },
};
