export default {
  userId(state) {
    return state.userId;
  },
  username(state) {
    return state.username;
  },
  token(state) {
    return state.token;
  },
  email(state) {
    return state.email;
  },
  isAuthenticated(state) {
    return !!state.token;
  },
};
