<template>
  <b-container class="text-center">
    <!-- <b-button  @click="getWord"> test </b-button> -->
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
  methods: {
    getWord () {
        this.$store.dispatch('getSkyengWord', 'test').then(() => {
          this.word = this.$store.state.word
      })
    }
  }
}
</script>