<template>
  <b-container class="text-center">
    <h2  class="my-2">Dictionary</h2>
    <loading v-if="loading"/>
    <meaning-info :_meaning="meaning" v-if="!loading"/>
  </b-container>
</template>

<script>
import meaningInfo from '~/components/meaning-info.vue'
import loading from '~/components/loading.vue'

export default {
  name: 'dictionary-word-id',
  components: {
    meaningInfo,
    loading
  },
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
      if (this.$store.state.appLogic.meanings) {
        return this.$store.state.appLogic.meanings[0]
      }
    },
    loading () {
      return this.$store.state.appLogic.loading
    }
  }
}
</script>
