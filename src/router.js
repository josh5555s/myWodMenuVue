import { createRouter, createWebHistory } from 'vue-router';
import { trackRouter } from 'vue-gtag-next';
// import store from './store/index'

import SelectMenu from './components/SelectMenu.vue';
import CreateAccount from './components/CreateAccount.vue';
import SignIn from './components/SignIn.vue';
import MenuDisplay from './components/MenuDisplay.vue';
import SpecialsDisplay from './components/SpecialsDisplay.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: SelectMenu },
    { path: '/sign-in', component: SignIn },
    { path: '/create-account', component: CreateAccount },
    { path: '/:store', component: SelectMenu },
    { path: '/:store/specials', component: SpecialsDisplay },
    { path: '/:store/:product', component: MenuDisplay },
  ],
});

trackRouter(router);

export default router;
