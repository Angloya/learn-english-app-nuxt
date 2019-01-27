<template>
  <b-container class="text-center">
     <cards _collection="structure" @click="choosePractice" _document="practice"/>
  </b-container>
</template>

<script>
import cards from '~/components/Cards.vue'

export default {
  name: 'practice',
  components: {
    cards
  },
  methods: {
    choosePractice (e) {
      this.$router.push('/practice/' + e)
    }
  }
}
</script>
