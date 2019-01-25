<template>
  <b-container class="text-center">
     <cards _collection="structure" _document="practice"/>
  </b-container>
</template>

<script>
import cards from '~/components/Cards.vue'

export default {
  name: 'practice',
  components: {
    cards
  }
}
</script>
