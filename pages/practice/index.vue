<template>
  <b-container class="text-center">
     <cards/>
  </b-container>
</template>

<script>
import cards from '~/components/Cards.vue'

export default {
  name: 'practice',
  data () {
    return {
    }
  },
  components: {
    cards
  }
}
</script>
