// import './assets/main.css'
import './assets/tailwind.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import {
  faArrowLeft,
  faEnvelope,
  faKey,
  faMagnifyingGlass,
  faMoon,
  faRightFromBracket,
  faRightToBracket,
  faSun,
  faUser,
  faXmark
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faMagnifyingGlass,
  faRightFromBracket,
  faXmark,
  faEnvelope,
  faKey,
  faArrowLeft,
  faRightToBracket,
  faTwitter,
  faUser,
  faMoon,
  faSun
)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.use(store)

store.dispatch('initialize').then(() => {
  app.mount('#app')
})
