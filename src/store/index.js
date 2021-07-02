import { createStore } from 'vuex';
// import { mutations } from './mutations'
// import { actions } from './actions'
// import { getters } from './getters'

const store = createStore({
  state() {
    return {
      title1: 'SELECT',
      title2: 'STORE',
      scrollSpeed: 40,
      alreadyScrolling: false,
      screensSetting: "1 of 1",
      currentSpecials: null,
      upcomingSpecials: null,
    }
  },
  mutations: {
    storeTitles(state) {
      state.title1= "SELECT"
      state.title2 = "STORE"
    },
    productTitles(state) {
      state.title1 = "SELECT"
      state.title2 = "PRODUCT"
    },
    specialsTitles(state) {
      state.title1 = "SPECIALS"
      state.title2 = "LIST"
    },
    menuTitles(state, product) {
      state.title1 = product.toUpperCase()
      state.title2 = "MENU"
    },
    scrollSpeed(state, speed) {
      if (speed === 'slow') { state.scrollSpeed = 80 }
      else if (speed === 'medium') { state.scrollSpeed = 40 }
      else if (speed === 'fast') { state.scrollSpeed = 20 }
      else if (speed === 'off') { state.scrollSpeed = 0 }
    },
    nowScrolling(state) {
      state.alreadyScrolling = true
    },
    updateScreensSetting(state, setting) {
      state.screensSetting = setting
      state.title2 = "MENU" + " " + state.screensSetting.charAt(0)
      if (setting === '1 of 1') { state.title2 = "MENU" }
    },   
    filterSpecials(state, payload) {
      let results = payload.results
      let location = payload.location

      // filter for location specific list
      let locationFilteredSpecials = []
      results.forEach(result => {
        let locationsWithSpecial = []
        result.locations.forEach(item => {
          if (item === 'Cedar Mill') {
            locationsWithSpecial.push('cedarMill')
          }
          else {locationsWithSpecial.push(item.toLowerCase())}
        })
        if (locationsWithSpecial !== undefined && locationsWithSpecial.indexOf(location) !== -1) {
          locationFilteredSpecials.push(result)
        }
      })
      
      // filter for specialTiming
      let d = new Date()
      let currentDatetimeNumber = d.getTime()
      let upcomingSpecials = []
      let currentSpecials = []
      locationFilteredSpecials.forEach(special => {
        if (special.startNumber > currentDatetimeNumber) {
          upcomingSpecials.push(special)
        } else if (special.startNumber < currentDatetimeNumber && special.endNumber > currentDatetimeNumber){
          currentSpecials.push(special)
        }
        //  else if (state.specialsTiming === 'Past' && special.endNumber < currentDatetimeNumber){
        //   timingFilteredSpecials.push(special)
        // }
      }) 
      state.currentSpecials = currentSpecials.reverse()
      state.upcomingSpecials = upcomingSpecials.reverse()
    }
  },
  actions: {
    fetchSpecials(context, payload) {
      const location = payload.location
      fetch('https://wod-admin-default-rtdb.firebaseio.com/specials.json')
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
      })
      .then(data => {
        const results = []
        for (const id in data) {
          results.push({
            id: id,
            title: data[id].title,
            locations: data[id].locations,
            description: data[id].description,
            start: data[id].start,
            end: data[id].end,
            startNumber: new Date(data[id].start).getTime(),
            endNumber: new Date(data[id].end).getTime(),
          })
        }
        context.commit('filterSpecials', { results, location })
      })
      .catch((error) => {
        console.log(error)
        console.log("there was an error in the fetch GET promise chain")
        this.isLoading = false
        this.error = 'Failed to fetch data please try again later'
      })
    },
  },
  getters: {
    title1(state) {
      return state.title1
    },
    title2(state) {
      return state.title2
    },
    scrollSpeed(state) {
      return state.scrollSpeed
    },
    alreadyScrolling(state) {
      return state.alreadyScrolling
    },
    screensSetting(state) {
      return state.screensSetting
    },
    currentSpecials(state) {
      return state.currentSpecials
    },
    upcomingSpecials(state) {
      return state.upcomingSpecials
    },
  } 
})
export default store