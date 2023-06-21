import { createStore } from 'vuex'
import { checkUser } from '@/firebase'

import VuexPersist from 'vuex-persist';

const vuexLocalStorage = new VuexPersist({
  key: 'vuex', // The key to store the state on in the storage provider.
  storage: window.localStorage, // or window.sessionStorage or localForage
})

const store = createStore({
  state: {
    user: {
      loggedIn: false,
      data: null
    }
  },
  getters: {
    user(state){
      return state.user
    }
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    }
  },
  actions: {
    async logIn(context, { email, password }){
      const user = await checkUser(email, password)
      if (user) {
        context.commit('SET_USER', user)
      } else {
        throw new Error('login failed')
        this.$router.push('/')
      }
    },

    async logOut(context){
      context.commit('SET_USER', null)
    },
  },
  plugins: [vuexLocalStorage.plugin]
})

// export the store
export default store