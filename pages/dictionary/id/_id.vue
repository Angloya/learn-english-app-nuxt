<template>
  <b-container class="text-center">
    <h2 v-translate class="my-2">Dictionary</h2>
    <loading v-if="loading"/>
    <meaning-info :_meaning="meaning" v-if="!loading"/>
  </b-container>
</template>

<script>
import meaningInfo from '~/components/cards/meaning-info.vue'
import Loading from '~/components/Loading.vue'

export default {
  name: 'dictionary-word-id',
  components: {
    meaningInfo,
    Loading
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
