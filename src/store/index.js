// store/index.js
import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    isLoggedIn: false
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      state.isLoggedIn = !!user // Define o estado de login
    },
    clearUser(state) {
      state.user = null
      state.isLoggedIn = false // Limpa o estado de login
    }
  },
  actions: {
    signin({ commit }, user) {
      commit('setUser', user)
    },
    signout({ commit }) {
      commit('clearUser')
    },
    initialize({ commit }) {
      const token = localStorage.getItem('token')
      const user = JSON.parse(localStorage.getItem('user'))

      if (token && user) {
        commit('setUser', user)
      } else {
        commit('clearUser')
      }
    }
  }
})
