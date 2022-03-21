export default {
  fetchUserOrders(context) {
    console.log('fetching user orders...');
    fetch(context.getters.userOrdersUrl, {
      method: 'GET',
      accept: 'application/json',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Token ${context.rootGetters.token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log('response is OK');
          return response.json();
        } else {
          console.log(response);
        }
      })
      .then((orders) => {
        console.log(orders);
        const results = [];
        // orders.forEach((order) => {
        //   results.push({
        //     id: order.id,
        //     user: order.username,
        //     orderDate: order.order_date,
        //     location: order.location,
        //     status: order.status,
        //   });
        // });
        console.log('results', results);
        context.commit('setOrders', { orders: results });
        context.dispatch('fetchUserOrderItems');
      })
      .catch((error) => {
        console.log(error);
        console.log('error in fetchOrders in actions.js');
        this.isLoading = false;
        this.error = 'Failed to fetch data please try again later';
      });
  },
  fetchUserOrderItems(context) {
    console.log('fetching user order items...');
    fetch(context.getters.userOrderItemsUrl, {
      method: 'GET',
      accept: 'application/json',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Token ${context.rootGetters.token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log(response);
          return response.json();
        } else {
          console.log(response);
        }
      })
      .then((orderItems) => {
        console.log('orderItems', orderItems);
        const results = [];
        orderItems.forEach((item) => {
          results.push({
            orderId: item.order,
            flowerPricePoint: item.flower_price_point,
            productName: item.product_name,
            productType: item.product_type,
            vendorName: item.vendor_name,
            grams: item.grams,
            count: item.count,
            priceEach: item.price_each,
          });
        });
        console.log('items', results);
        context.commit('setOrderItems', { orderItems: results });
      })
      .catch((error) => {
        console.log(error);
        console.log('error in fetchUserOrderItems in actions.js');
        this.isLoading = false;
        this.error = 'Failed to fetch data please try again later';
      });
  },
};
