<template>
<b-container>
  <b-card-group deck class="mb-3">

  </b-card-group>
  <rules _title="game word-definition" _text="rules game"/>
</b-container>
</template>

<script>
import CardGameDefinition from '~/components/cards/card-game-definition.vue'
import Rules from '~/components/games/Rules.vue'
export default {
  name: 'game-word-definition',
  components: {
    CardGameDefinition,
    Rules
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
