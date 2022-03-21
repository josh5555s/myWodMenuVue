<template>
  <div>
    <nav>
      <ul>
        <li v-for="view in dashViews" :key="view" @click="setDashView(view)">
          <a>{{ view }}</a>
        </li>
      </ul>
    </nav>

    <div v-if="dashView === 'shopping cart'" class="container">
      <h2>Shopping Cart Goes Here!</h2>
    </div>

    <div v-if="dashView === 'orders'" class="container">
      <h2>You have not yet placed an order for pickup, would you like to?</h2>
    </div>

    <div v-if="dashView === 'account details'" class="container">
      <h2>{{ username }}</h2>
      <h2>{{ email }}</h2>
    </div>

    <div v-if="dashView === 'custom settings'" class="container">
      <h2>Get notifications when your favorite strains come in?</h2>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      dashViews: ['shopping cart', 'orders', 'account details', 'custom settings'],
      dashView: 'shopping cart',
    };
  },
  computed: {
    ...mapGetters(['username', 'email', 'isAuthenticated']),
    // itemsInCart() {
    //   return this.orders.
    // },
  },
  methods: {
    setDashView(item) {
      this.dashView = item;
    },
    setMyWodTitles() {
      this.$store.commit('setMyWodTitles');
    },
    async fetchUserOrders() {
      try {
        await this.$store.dispatch('fetchUserOrders');
      } catch (error) {
        this.error = error.message || 'Failed to fetch orders';
      }
    },
  },
  created() {
    if (!this.isAuthenticated) {
      this.$router.push({ path: '/sign-in' });
    }
    document.title = 'My WOD';
    this.setMyWodTitles();
    this.fetchUserOrders();
  },
  mounted() {},
  watch: {},
};
</script>

<style lang="scss" scoped>
nav {
  margin-top: 20px;
  border-bottom: 1px solid var(--primary-text-color);
}

nav ul {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  list-style: none;
}
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
