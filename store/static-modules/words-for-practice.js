import localStorage from '@/store/utils/localStorage'

export default {
  namespaced: true,
  state () {
    return {
      isWordDictionary: false
    }
  },
  mutations: {
    isWordDictionary (state, _isWordDictionary) {
        state.isWordDictionary = _isWordDictionary
        localStorage.saveToLS('isWordDictionary', state.isWordDictionary)
    }
  },
  actions: {
    restore ({state}) {
      var isWordDictionary = localStorage.restoreFormLS('isWordDictionary')
      if (isWordDictionary) {
        state.isWordDictionary = isWordDictionary
      }
    }
  }
}
