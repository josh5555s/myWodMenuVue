import router from '/app/src/router.js';

export default {
  async createAccount(context, payload) {
    const response = await fetch('http://127.0.0.1:8079/users_api/create/', {
      // fetch('https://api.westernoregondispensary.com/strains', {
      method: 'POST',
      accept: 'application/json',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        username: payload.username,
        email: payload.email,
        password: payload.password,
      }),
    });

    const responseData = await response.json();
    console.log(responseData);

    if (response.ok) {
      console.log('response OK');
      context.dispatch('requestToken', payload);
    } else {
      throw new Error('too bad, it failed');
      // if account already exists, give error message that says so
    }
  },
  async requestToken(context, payload) {
    console.log('requestToken called');
    const response = await fetch('http://127.0.0.1:8079/users_api/token/', {
      // fetch('https://api.westernoregondispensary.com/strains', {
      method: 'POST',
      accept: 'application/json',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        username: payload.username,
        password: payload.password,
      }),
    });

    const responseData = await response.json();

    if (response.ok) {
      context.commit('setToken', {
        token: responseData.token,
      });
      context.dispatch('viewAccount');
    } else {
      throw new Error('too bad, it failed');
    }
  },
  async viewAccount(context) {
    console.log('viewAccount called');
    const response = await fetch('http://127.0.0.1:8079/users_api/me/', {
      // fetch('https://api.westernoregondispensary.com/strains', {
      method: 'GET',
      accept: 'application/json',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Token ${context.rootGetters.token}`,
      },
    });

    const responseData = await response.json();
    console.log(responseData);

    if (response.ok) {
      router.push({ path: '/user-dash' });
      context.commit('setUser', {
        id: responseData.id,
        username: responseData.username,
        email: responseData.email,
      });
    } else {
      throw new Error('too bad, it failed');
    }
  },
};
