<template>
  <div class="container">
    <div class="inner-container">
      <form id="sign-form" @submit.prevent="">
        <div class="form-input">
          <label for="username">Username: </label>
          <input
            id="username"
            name="username"
            type="text"
            autofocus
            autocomplete="off"
            ref="usernameInput"
            v-model.trim="usernameInput"
          />
        </div>
        <div class="form-input">
          <label for="password" id="password">Password: </label>
          <input type="password" name="password" id="password" v-model="passwordInput" />
        </div>

        <div class="button-container">
          <button @click="submitSignIn">Enter</button>
        </div>
      </form>
      <div id="no-account">
        <h4>Don't have WOD account yet?</h4>
        <router-link :to="`${'/create-account'}`">
          <h5 id="create-account">CREATE AN ACCOUNT!</h5>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// import router from '/app/src/router.js';
export default {
  data() {
    return {
      usernameInput: '',
      passwordInput: '',
    };
  },
  computed: {},
  methods: {
    async submitSignIn() {
      if (this.userNameInput === '') {
        console.log('error: missing username');
        // this.$emit('error-modal');
        return;
      }
      try {
        await this.$store.dispatch('requestToken', {
          username: this.usernameInput,
          password: this.passwordInput,
        });
        this.$router.push({ path: '/user-dash' });
      } catch (error) {
        this.error = error.message || 'Failed to receive auth token';
      }
    },
    setSignInTitles() {
      this.$store.commit('setSignInTitles');
    },
  },
  created() {
    document.title = 'WOD Sign-In';
    this.setSignInTitles();
  },
  mounted() {},
  watch: {},
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 10px;
  text-align: center;
  display: flex;
  justify-content: center;
}
.inner-container {
  display: flex;
  flex-direction: column;
}

#sign-form {
  margin: 30px 0 50px 0;
}

.form-input {
  margin: 10px;
}

#create-account {
  text-decoration: underline;
}

#no-account h4,
h5 {
  margin: 5px;
}
</style>
