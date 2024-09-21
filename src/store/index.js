import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null
  },
  mutations: {
    setUser(state, user) {
      console.log('Setting user:', user)
      state.user = user
    },
    logout(state) {
      console.log('Logging out user')
      state.user = null
    }
  },
  actions: {
    signin({ commit }, user) {
      console.log('Logging in user:', user)
      commit('setUser', user)
    },
    logout({ commit }) {
      commit('logout')
    },
    initialize({ commit }) {
      const token = localStorage.getItem('token')
      const user = JSON.parse(localStorage.getItem('user'))

      if (token && user) {
        commit('setUser', user)
      } else {
        commit('logout')
      }
    }
  },
  getters: {
    isAuthenticated(state) {
      return !!state.user
    },
    getUser(state) {
      return state.user
    }
  }
})
