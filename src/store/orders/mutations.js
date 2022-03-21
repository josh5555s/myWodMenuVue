export default {
  setOrders(state, payload) {
    state.orders = payload.orders;
  },
  setOrderItems(state, payload) {
    state.orderItems = payload.orderItems;
  },
};
