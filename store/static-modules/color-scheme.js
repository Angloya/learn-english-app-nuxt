import localStorage from '@/store/utils/localStorage'

export default {
  namespaced: true,
  state () {
    return {
      isColorDark: false
    }
  },
  mutations: {
    isColorDark (state, _isColorDark) {
        state.isColorDark = _isColorDark
        localStorage.saveToLS('isColorDark', state.isColorDark)
    }
  },
  actions: {
    restore ({state}) {
      var isColorDark = localStorage.restoreFormLS('isColorDark')
      if (isColorDark) {
        state.isColorDark = isColorDark
      }
    }
  }
}
