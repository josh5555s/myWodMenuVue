export default {
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
};
