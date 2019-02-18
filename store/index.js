import Vue from 'vue'
import Vuex from 'vuex'
import appLogic from './appLogic'
import wordsForPractice from './static-modules/words-for-practice'
import colorScheme from './static-modules/color-scheme'

const createStore = () => {
  return new Vuex.Store({
    namespaced: true,
    modules: {
      appLogic,
      wordsForPractice,
      colorScheme
    }
  })
}

export default createStore
