<template>
<b-container>
  <b-card no-body>
    <b-tabs card>
      <b-tab title="Game">
        <b-button @click="getSkyengMeanings(true)" v-if="!start">start</b-button>
        <b-card-group deck class="mb-3">
          <card-game-definition
            style="min-width: 15rem;"
            v-for="(answer, idx) in answers"
            :key="idx"
            :_card="answer"
            @click="checkAnswer"
          />
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
import _ from 'lodash'
export default {
  name: 'game-word-definition',
  components: {
    CardGameDefinition,
    Rules
  },
  data () {
    return {
      wordsCount: 5,
      start: false,
      meanId: 0,
      keyColor: '',
      wrongAnswers: null,
      checkWord: false,
      answers: [],
      answersForCheck: []
    }
  },
  methods: {
    checkAnswer (answer) {
      this.checkWord = true
      if (this.answersForCheck.length === 2) {

      } else {
        debugger
        this.answersForCheck.push(answer)
        answer.selected = true
      }
      // if (this.meanings[this.meanId].text == answer) {
      //   this.keyColor = 'success'
      // } else {
      //   this.keyColor = 'danger'
      //   this.setWrongAnswer(this.meanings[this.meanId])
      // }
    },
    startPractice (setWordMeans) {
      this.start = true
      this.wrongAnswers = {}
      this.getAnswers()
    },
    getAnswers () {
      for (var mean of this.meanings) {
        let word = {}
        let definition = {}
        word.id = mean.id
        word.type = 'word'
        word.text = mean.text
        definition.id = mean.id
        definition.type = 'definition'
        definition.text = mean.definition.text
        this.answers.push(definition)
        this.answers.push(word)
      }
      this.sortArray(this.answers)
    },
    setMeanId () {
      if (this.meanings && this.meanId != this.meanings.length - 1) {
        this.meanId += 1
        this.keyColor = ''
      } else {
        this.summation()
        this.start = false
        this.answers = []
        this.keyColor = ''
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
