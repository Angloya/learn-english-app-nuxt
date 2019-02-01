<template>
  <b-container class="text-center">
    <b-button @click="getSkyengMeanings">begin to learn the words</b-button>
    {{meanings}}
  </b-container>
</template>

<script>
export default {
  name: 'word',
  computed: {
    meanings () {
      return this.$store.state.meanings || {}
    }
  },
  methods: {
    getSkyengMeanings () {
      this.$store.dispatch('getSkyengMeanings', this.randomIds()).then(() => {
        return this.$store.state.meanings
      })
    },
    randomIds () {
      var randomNum = []
      for (var i=0; i<5; i++) {
        var id = Math.floor(Math.random()*(250000))
         randomNum[i]=id
      }
      return randomNum

    }
  }
}
</script>
