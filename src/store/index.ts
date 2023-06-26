import { createStore } from "vuex";
import { checkUser } from "@/firebase";
import BusinessModule from "./modules/BusinessModule";
import VuexPersist from "vuex-persist";
import router from "@/router/index";

const vuexLocalStorage = new VuexPersist({
  key: "vuex", // The key to store the state on in the storage provider.
  storage: window.localStorage, // or window.sessionStorage or localForage
});

const store = createStore({
  modules: {
    business: BusinessModule,
  },
  state: {
    user: {
      loggedIn: false,
      data: null,
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    reset(state) {
      state.user = {
        loggedIn: false,
        data: null,
      };
    },
  },
  actions: {
    async logIn(context, { email, password }) {
      const user = await checkUser(email, password);
      if (user) {
        context.commit("SET_USER", user);
        context.commit("SET_LOGGED_IN", true);
      } else {
        router.push("/");
        throw new Error("login failed");
      }
    },

    logOut(context) {
      context.commit("SET_USER", null);
      router.push("/");
    },
    reset({ commit }) {
      commit("reset");
    },
  },
  plugins: [vuexLocalStorage.plugin],
});

export default store;
