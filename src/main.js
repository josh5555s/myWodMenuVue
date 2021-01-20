import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

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

const app = createApp(App)
app.use(router);
app.mount('#app')
