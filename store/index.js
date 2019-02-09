import Vue from 'vue'
import Vuex from 'vuex'
import appLogic from './appLogic'


const createStore = () => {
  return new Vuex.Store({
    namespaced: true,
    modules: {
      appLogic
    }
  })
}

export default createStore
