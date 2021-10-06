import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import VueGtag from "vue-gtag-next"


const app = createApp(App)

app.use(VueGtag, {
  property: { id: "G-RBH5LRWBLJ" }
})

app.use(router)
app.use(store)
app.mount('#app')
