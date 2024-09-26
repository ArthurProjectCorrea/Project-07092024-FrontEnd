// import './assets/main.css'
import './assets/tailwind.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import {
  faArrowLeft,
  faArrowsRotate,
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
  faGoogle,
  faUser,
  faMoon,
  faSun,
  faArrowsRotate
)

const app = createApp(App)

store
  .dispatch('initialize')
  .then(() => {
    app.component('font-awesome-icon', FontAwesomeIcon)
    app.use(router)
    app.use(store)

    app.mount('#app')
  })
  .catch((err) => {
    console.error('Error initializing store:', err)
  })
