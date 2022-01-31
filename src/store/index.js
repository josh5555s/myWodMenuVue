import { createStore } from 'vuex';
// import { mutations } from './mutations'
// import { actions } from './actions'
// import { getters } from './getters'

const store = createStore({
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
  mutations: {
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
    filterSpecials(state, payload) {
      let results = payload.results;
      let location = payload.location;

      // filter for location specific list
      let locationFilteredSpecials = [];
      results.forEach((result) => {
        let locationsWithSpecial = [];
        result.locations.forEach((item) => {
          if (item === 'Cedar Mill') {
            locationsWithSpecial.push('cedarMill');
          } else {
            locationsWithSpecial.push(item.toLowerCase());
          }
        });
        if (
          locationsWithSpecial !== undefined &&
          locationsWithSpecial.indexOf(location) !== -1
        ) {
          locationFilteredSpecials.push(result);
        }
      });

      // filter for specialTiming
      let d = new Date();
      let currentDatetimeNumber = d.getTime();
      let upcomingSpecials = [];
      let currentSpecials = [];
      locationFilteredSpecials.forEach((special) => {
        if (special.startNumber > currentDatetimeNumber) {
          upcomingSpecials.push(special);
        } else if (
          special.startNumber < currentDatetimeNumber &&
          special.endNumber > currentDatetimeNumber
        ) {
          currentSpecials.push(special);
        }
        //  else if (state.specialsTiming === 'Past' && special.endNumber < currentDatetimeNumber){
        //   timingFilteredSpecials.push(special)
        // }
      });
      state.currentSpecials = currentSpecials.reverse();
      state.upcomingSpecials = upcomingSpecials;
    },
  },
  actions: {
    fetchSpecials(context, payload) {
      const location = payload.location;
      fetch(context.getters.specialsUrl)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          const parsedData = JSON.parse(data);
          const results = [];
          parsedData.forEach((item) => {
            results.push({
              id: item.id,
              title: item.title,
              locations: item.locations,
              description: item.description,
              start: item.start,
              end: item.end,
              startNumber: new Date(item.start).getTime(),
              endNumber: new Date(item.end).getTime(),
            });
          });
          context.commit('filterSpecials', { results, location });
        })
        .catch((error) => {
          console.log(error);
          console.log('there was an error fetching specials ');
          this.isLoading = false;
          this.error = 'Failed to fetch data please try again later';
        });
    },
  },
  getters: {
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
  },
});
export default store;
