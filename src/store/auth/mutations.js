export default {
  setToken(state, payload) {
    state.token = payload.token;
  },
  setUser(state, payload) {
    state.userId = payload.id;
    state.username = payload.username;
    state.email = payload.email;
  },
};
