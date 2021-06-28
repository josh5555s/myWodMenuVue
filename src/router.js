import { createRouter, createWebHistory } from 'vue-router'
// import store from './store/index'

import SelectStore from './components/SelectStore.vue'
import SelectProduct from './components/SelectProduct.vue'
import ShowDisplay from './components/ShowDisplay.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: SelectStore },
    { path: '/:store', component: SelectProduct },
    { path: '/:store/:product', component: ShowDisplay },
  ]
})

export default router