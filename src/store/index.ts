import Vuex, { createStore } from 'vuex'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
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
    async register(context, { email, password, name}){
      const response = await createUserWithEmailAndPassword(getAuth(), email, password)
      if (response) {
        context.commit('SET_USER', response.user)
        console.log(response.user)
        // response.user.updateProfile({displayName: name})
      } else {
        throw new Error('Unable to register user')
      }
    },

    async logIn(context, { email, password }){
      const response = await signInWithEmailAndPassword(getAuth(), email, password)
      console.log('response', response)
      if (response) {
        context.commit('SET_USER', response.user)
      } else {
        throw new Error('login failed')
      }
    },

    async logOut(context){
      await signOut(getAuth())
      context.commit('SET_USER', null)
    },

    async fetchUser(context ,user) {
      context.commit("SET_LOGGED_IN", user !== null);
      if (user) {
        context.commit("SET_USER", {
          displayName: user.displayName,
          email: user.email
        });
      } else {
        context.commit("SET_USER", null);
      }
    }
  },
  plugins: [vuexLocalStorage.plugin]
})

// export the store
export default store