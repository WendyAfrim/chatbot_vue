// store.js
import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import axios from 'axios'
import * as Cookies from 'js-cookie'

const store = createStore({
  state: {
    logged: false,
    user: {
      id: -1,
      name: '',
      email: '',
      role: '',
      online: false,
      token: '',
    }
  },
  mutations: {
    setUser(state, user, logged) {
      state.logged = logged
      state.user.id = user.id
      state.user.name = user.name
      state.user.email = user.email
      state.user.role = user.role
      state.user.online = user.online
      state.user.token = user.token
    }
  },
  getters: {
    logged: state => state.logged,
    user: state => state.user,
  },
  actions: {
    login(state,user) {
      return axios.post('http://localhost:8081/auth/login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.success) {
          state.commit('setUser', response.data.user, true)
          console.log(response.data)
        } else {
          console.log(response.data)
        }
      })
    },
    logout(state) {
      state.commit('setUser', {
        id: -1,
        name: '',
        email: '',
        role: '',
        online: false,
        token: '',
      },
      false)
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})

export default store