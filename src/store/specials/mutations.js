export default {
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
};
