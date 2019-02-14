<template>
<div>  страничка слова {{meaning}}</div>

</template>

<script>
export default {
  name: 'dictionary-word-id',
  created () {
    this.$store.dispatch('getSkyengMeanings', this.searchWordId).then(() => {
      return this.$store.state.appLogic.meanings
    })
  },
  computed: {
    searchWordId () {
      return this.$route.params.id
    },
    meaning () {
      return this.$store.state.appLogic.meanings
    }
  }
}
</script>
