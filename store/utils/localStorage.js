export default {
  saveToLS: function (_name, _state) {
    var data
    data = JSON.stringify(_state)
    window.localStorage.setItem(_name, data)
  },
  restoreFormLS: function (_name) {
    var data = 'null'
    data = window.localStorage.getItem(_name)
    data = JSON.parse(data)
    return data
  }
}
