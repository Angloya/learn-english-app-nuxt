<template>
<b-container>
    <b-card no-body>
    <b-tabs card>
      <b-tab title="Game">
          <b-card-group deck class="mb-3">

  </b-card-group>
      </b-tab>
      <b-tab title="Rules">
          <rules _title="game word-definition" _text="rules game"/>
      </b-tab>
    </b-tabs>
  </b-card>
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
