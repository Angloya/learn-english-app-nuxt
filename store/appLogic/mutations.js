export default {
  setUser (state, payload) {
    state.user = payload
  },
  setLoading (state, payload) {
    state.loading = payload
  },
  setError (state, payload) {
    state.error = payload
  },
  clearError (state) {
    state.error = null
  },
  setURLPhoto (state, payload) {
    state.photoURL = payload
  },
  setProgress (state, payload) {
    state.progress = payload
  },
  setProgressShow (state, payload) {
    state.progressShow = payload
  },
  setDocsFB (state,[doc, payload]) {
    state.docsFB[doc] = payload
  },
  setWord (state, payload) {
    state.word = payload
  },
  setMeanings (state, payload) {
    state.meanings = payload
  },
  setWordsForDictionary (state, payload) {
    state.wordsForDictionary = payload
  }
}