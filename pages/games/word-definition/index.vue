<template>
<b-container>
  <b-card-group deck class="mb-3">

  </b-card-group>
</b-container>
</template>

<script>
import CardGameDefinition from '~/components/cards/card-game-definition.vue'
export default {
  name: 'game-word-definition',
  components: {
    CardGameDefinition
  },
  data () {
    return {
      wordsCount: 10,
    }
  },
  mixins: [
    require('~/mixins/wordPractice').default,
    require('~/mixins/user-base').default
  ]
}
</script>
