
import Vuex from 'vuex'
import BusinessModule from './modules/BusinessModule'

const store = new Vuex.Store({
  modules: {
    business: BusinessModule
  },

})

export default store