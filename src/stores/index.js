import Vue from 'vue'
import Vuex from 'vuex'

import { state, getters, mutations, actions } from './global'

import user from './user'

Vue.use(Vuex)

const store = new Vuex.Store({
  actions,
  state,
  getters,
  mutations,
  modules: {
    user
  }
})

export default store
