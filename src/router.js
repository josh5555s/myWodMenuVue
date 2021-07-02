import { createRouter, createWebHistory } from 'vue-router'
// import store from './store/index'

import SelectStore from './components/SelectStore.vue'
import SelectProduct from './components/SelectProduct.vue'
import MenuDisplay from './components/MenuDisplay.vue'
import SpecialsDisplay from './components/SpecialsDisplay.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: SelectStore },
    { path: '/:store', component: SelectProduct },
    { path: '/:store/specials', component: SpecialsDisplay },
    { path: '/:store/:product', component: MenuDisplay },
  ]
})

export default router