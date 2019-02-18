<template>
  <b-container
  fluid
  :class="[isColorDark ? ['bg-dark', 'text-light']  : ['bg-light', 'text-dark']]"
  class="px-0 h-100">
    <navBar/>
    <nuxt />
  </b-container>
</template>

<script>
import NavBar from '~/components/control/NavBar.vue'
export default {
  components:{
    navBar : NavBar
  },
  computed: {
  isColorDark () {
    return this.$store.state.colorScheme.isColorDark
    }
  },
  created () {
    if (process.browser) {
      this.$store.dispatch('colorScheme/restore')
      this.$store.dispatch('wordsForPractice/restore')
    }
  }
}
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
