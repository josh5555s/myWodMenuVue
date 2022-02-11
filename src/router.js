import { createRouter, createWebHistory } from 'vue-router';
import { trackRouter } from 'vue-gtag-next';
// import store from './store/index'

import SelectMenu from './components/pages/SelectMenu/SelectMenu.vue';
import CreateAccount from './components/pages/CreateAccount/CreateAccount.vue';
import SignIn from './components/pages/SignIn/SignIn.vue';
import UserDash from './components/pages/UserDash/UserDash.vue';
import MenuDisplay from './components/pages/MenuDisplay/MenuDisplay.vue';
import SpecialsDisplay from './components/pages/SpecialsDisplay/SpecialsDisplay.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: SelectMenu },
    { path: '/create-account', component: CreateAccount },
    { path: '/sign-in', component: SignIn },
    { path: '/user-dash', component: UserDash },
    { path: '/:store', component: SelectMenu },
    { path: '/:store/specials', component: SpecialsDisplay },
    { path: '/:store/:product', component: MenuDisplay },
  ],
});

trackRouter(router);

export default router;
