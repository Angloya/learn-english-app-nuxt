<template>
  <b-container class="text-center">
    {{word}}
  </b-container>
</template>

<script>

export default {
  name: 'dictionary',
  data () {
    return {
      word: null
    }
  },
 created () {
   debugger
    this.$store.dispatch('getSkyengWord', this.$route.params.id).then(() => {
    this.word = this.$store.state.word
    })
  }
}
</script>