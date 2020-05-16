<template>
  <b-container class="text-center">
    <loading v-if="loading"/>
     <cards v-else :_cards='practices' @click="choosePractice"/>
  </b-container>
</template>

<script>
import cards from './../../components/cards/Cards.vue'
import Loading from './../../components/Loading.vue'

export default {
  name: 'practice',
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
    practices () {
      return this.$store.state.appLogic.docsFB.practice || {}   
    }
  },
  methods: {
    choosePractice (e) {
      this.$router.push('/practice/' + e )
    },
    async getDBCards () {
      await this.$store.dispatch('getDocFB', ['structure', 'practice'])
    }
  }
}
</script>