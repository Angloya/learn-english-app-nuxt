<template>
  <b-container class="text-center">
    <loading v-if="loading"/>
     <cards v-else :_cards='games' @click="choosePractice"/>
  </b-container>
</template>

<script>
import cards from './../../components/cards/Cards.vue'
import Loading from './../../components/Loading.vue'

export default {
  name: 'games',
  components: {
    cards,
    Loading,
  },
  created () {
    this.getDBCards()
  },
  computed: {
    loading () {
      return this.$store.state.appLogic.loading
    },
    games () {
      return this.$store.state.appLogic.docsFB.games || {}   
    }
  },
  methods: {
    choosePractice (e) {
      this.$router.push('/games/' + e )
    },
    async getDBCards () {
      await this.$store.dispatch('getDocFB', ['structure', 'games'])
    }
  }
}
</script>