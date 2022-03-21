export default {
  readFlowerPricePointUrl(state) {
    return state.useProductionOrdersApi
      ? 'https://api.westernoregondispensary.com/'
      : 'http://127.0.0.1:8079/orders_api/read_flower_price_points/';
  },
  userOrdersUrl(state) {
    return state.useProductionOrdersApi
      ? 'https://api.westernoregondispensary.com/'
      : 'http://127.0.0.1:8079/orders_api/user_orders/';
  },
  userOrderItemsUrl(state) {
    return state.useProductionOrdersApi
      ? 'https://api.westernoregondispensary.com/'
      : 'http://127.0.0.1:8079/orders_api/user_order_items/';
  },
  flowerPricePoints(state) {
    return state.flowerPricePoints;
  },
  orders(state) {
    return state.orders;
  },
  orderItems(state) {
    return state.orderItems;
  },
};
