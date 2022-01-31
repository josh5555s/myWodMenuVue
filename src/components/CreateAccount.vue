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
          <label for="email">Email: </label>
          <input
            id="email"
            name="email"
            type="email"
            autocomplete="off"
            ref="emailInput"
            v-model.trim="emailInput"
          />
        </div>
        <div class="form-input">
          <label for="password" id="password">Password: </label>
          <input type="password" name="password" id="password" v-model="passwordInput" />
        </div>
        <div class="form-input">
          <label for="password2" id="password2">Re-enter password: </label>
          <input
            type="password"
            name="password2"
            id="password2"
            v-model="password2Input"
          />
        </div>

        <div class="button-container">
          <button @click="submitCreateAccount">Create Account</button>
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
export default {
  data() {
    return {
      usernameInput: '',
      emailInput: '',
      passwordInput: '',
      password2Input: '',
    };
  },
  computed: {},
  methods: {
    submitCreateAccount() {
      if (this.userNameInput === '') {
        console.log('error: missing username');
        // this.$emit('error-modal');
        return;
      }
      if (this.passwordInput !== this.password2Input) {
        console.log('error: passwords do not match');
        // this.$emit('error-modal');
      }
      fetch('http://127.0.0.1:8079/users_api/create/', {
        // fetch('https://api.westernoregondispensary.com/strains', {
        method: 'POST',
        accept: 'application/json',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({
          username: this.usernameInput,
          email: this.emailInput,
          password: this.passwordInput,
        }),
      })
        .then((response) => {
          console.log(this.usernameInput);
          console.log(this.passwordInput);
          console.log(response.json());
          if (response.ok) {
            this.$router.push({ path: '/sign-in' });
          } else {
            throw new Error('too bad, it failed');
            // if account already exists, give error message that says so
          }
        })
        .catch((error) => {
          this.error = error.message;
          console.log(error);
        });
    },
    setCreateAccountTitles() {
      this.$store.commit('setCreateAccountTitles');
    },
  },
  created() {
    document.title = 'WOD Create Account';
    this.setCreateAccountTitles();
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
