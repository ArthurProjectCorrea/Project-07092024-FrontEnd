// import './assets/main.css'
import './assets/tailwind.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowLeft, faEnvelope, faKey, faMagnifyingGlass, faRightFromBracket, faXmark } from '@fortawesome/free-solid-svg-icons'

library.add(faMagnifyingGlass, faRightFromBracket, faXmark, faEnvelope, faKey, faArrowLeft)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.use(store)

store.dispatch('initialize').then(() => {
  app.mount('#app')
})
