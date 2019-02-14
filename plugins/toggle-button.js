import Vue from 'vue'
import ToggleButton from 'vue-js-toggle-button'

if (process.client) {
  Vue.use(ToggleButton)
}