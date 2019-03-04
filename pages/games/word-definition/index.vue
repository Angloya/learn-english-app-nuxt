<template>
<b-container>
  <b-button @click="getSkyengMeanings(true)">start</b-button>
  <b-card-group deck class="mb-3">
    {{meanings}}
    <!-- <card-game-definition v-for="(mean, idx) in meanings" :key="idx"/> -->
  </b-card-group>
  <rules _title="game word-definition" _text="rules game"/>
</b-container>
</template>

<script>
import CardGameDefinition from '~/components/cards/card-game-definition.vue'
import Rules from '~/components/games/Rules.vue'
import _ from 'lodash'
export default {
  name: 'game-word-definition',
  components: {
    CardGameDefinition,
    Rules
  },
  data () {
    return {
      wordsCount: 10,
      start: false,
      meanId: 0,
      keyColor: '',
      wrongAnswers: null,
      checkWord: false,
    }
  },
    methods: {
    checkAnswer (answer) {
      this.checkWord = true
      if (this.meanings[this.meanId].text == answer) {
        this.keyColor = 'success'
      } else {
        this.keyColor = 'danger'
        this.setWrongAnswer(this.meanings[this.meanId])
      }
    },
    setMeanId () {
      if (this.meanings && this.meanId != this.meanings.length - 1) {
        this.meanId += 1
        this.keyColor = ''
        this.checkWord = false
      } else {
        this.summation()
        this.start = false
        this.keyColor = ''
        this.checkWord = false
        this.meanId = 0
      }
    }
  },
  mixins: [
    require('~/mixins/wordPractice').default,
    require('~/mixins/user-base').default
  ]
}
</script>
