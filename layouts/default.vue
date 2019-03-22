<template>
  <b-container
    fluid
    class="px-0 h-100"
    style="min-height: 100vh;"
    :class="color"
    :key="key">
    <b-breadcrumb>
      <b-breadcrumb-item
      v-for="(item, idx) in breadcrumb"
      :text="item"
      no-prefetch
      :to="'/' + item"
      :key="idx"/>
    </b-breadcrumb>
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
  data () {
    return {
      key: '',
      breadcrumb: []
    }
  },
  created () {
    if (process.browser) {
      this.$store.dispatch('colorScheme/restore')
      this.$store.dispatch('wordsForPractice/restore')
      this.routePath()
    }
  },
  watch: {
    $route () {
      this.routePath()
    }
  },
  computed: {
    color () { 
      if (this.$store.state.colorScheme.isColorDark) {
        this.key='dark'
        return ['bg-dark','text-light']
      } else {
        this.key='light'
        return ['bg-light', 'text-dark']
      }
    }
  },
 methods: {
    routePath () {
      this.breadcrumb = this.$route.path.split('/')
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
