<template>
  <div class="container"></div>
  <h2>{{ username }}</h2>
  <h2>{{ email }}</h2>
  <h2></h2>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['username', 'email', 'isAuthenticated']),
  },
  methods: {
    setMyWodTitles() {
      this.$store.commit('setMyWodTitles');
    },
  },
  created() {
    if (!this.isAuthenticated) {
      this.$router.push({ path: '/sign-in' });
    }
    document.title = 'My WOD';
    this.setMyWodTitles();
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
