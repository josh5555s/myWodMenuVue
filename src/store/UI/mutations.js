export default {
  headerHeight(state, payload) {
    state.headerHeight = payload;
  },
  columnHeight(state, payload) {
    state.columnHeight = payload;
  },
  storeTitles(state) {
    state.title1 = 'SELECT';
    state.title2 = 'STORE';
  },
  productTitles(state) {
    state.title1 = 'SELECT';
    state.title2 = 'PRODUCT';
  },
  specialsTitles(state) {
    state.title1 = 'SPECIALS';
    state.title2 = 'LIST';
  },
  setSignInTitles(state) {
    state.title1 = 'SIGN';
    state.title2 = 'IN';
  },
  setMyWodTitles(state) {
    state.title1 = 'MY';
    state.title2 = 'WOD';
  },
  setCreateAccountTitles(state) {
    state.title1 = 'CREATE';
    state.title2 = 'ACCOUNT';
  },
  menuTitles(state, product) {
    state.title1 = product.toUpperCase();
    state.title2 = 'MENU';
  },
  scrollSpeed(state, speed) {
    if (speed === 'slow') {
      state.scrollSpeed = 80;
    } else if (speed === 'medium') {
      state.scrollSpeed = 40;
    } else if (speed === 'fast') {
      state.scrollSpeed = 20;
    } else if (speed === 'off') {
      state.scrollSpeed = 0;
    }
  },
  nowScrolling(state) {
    state.alreadyScrolling = true;
  },
  updateScreensSetting(state, setting) {
    state.screensSetting = setting;
    state.title2 = 'MENU' + ' ' + state.screensSetting.charAt(0);
    if (setting === '1 of 1') {
      state.title2 = 'MENU';
    }
  },
};
