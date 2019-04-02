import Vue from 'vue'
import VueTranslate from 'vue-translate-plugin'

if (process.client) {
  Vue.use(VueTranslate);
}

Vue.locales({
  spanish: {
      'hello world': 'hola mundo'
  }
});