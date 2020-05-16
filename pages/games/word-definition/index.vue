<template>
<b-container>
  <b-card no-body>
    <b-tabs card>
      <b-tab title="Game">
        <b-card align="center">
          <b-button @click="getSkyengMeanings(true)" v-if="!start" v-translate>start</b-button>
          <h2 v-if="start">{{gameTime}}</h2>
          <h2 v-if="!start && message">{{message}}</h2>
        </b-card>
        <b-card-group deck class="mb-3" :key="count" v-if="start">
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
          <rules
          _title="word-definition"
          _text="In the game you need to choose word and connect it with its definition.You have 60 seconds. When you make the mistake the game time reduce by 5 second."/>
      </b-tab>
    </b-tabs>
    <b-button @click="stopGame" v-if="start" v-translate></b-button>
  </b-card>
</b-container>
</template>

<script>
import CardGameDefinition from '~/components/cards/Card-game-definition.vue'
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
      wordsCount: 4,
      start: false,
      meanId: 0,
      count: 0,
      keyColor: '',
      wrongAnswers: null,
      checkWord: false,
      answers: [],
      answersForCheck: [],
      message: null
    }
  },
  beforeDestroy () {
    clearTimeout(this.timeout)
  },
  methods: { 
    checkAnswer (answer) {
      this.checkWord = true
      if(!answer.correct && !answer.selected) {
        if (this.answersForCheck.length === 1) {
          this.answersForCheck.push(answer)
          answer.selected = true
           this.count += 1
          if (process.client) {
           this.timeout = setTimeout(() => {
            if (this.answersForCheck[0].id === this.answersForCheck[1].id) {
              if (this.meanId < this.wordsCount) {
                this.answersForCheck.forEach(answerForCheck => {
                  answerForCheck.correct = true
                  answerForCheck.selected = false
                })
                this.setMeanId()
              } else {
                this.answersForCheck.forEach(answerForCheck => {
                  answerForCheck.correct = true
                  answerForCheck.selected = false
                })
                this.stopGame()
                this.message = "You win"
              }
            } else {
              this.answersForCheck.forEach(answerForCheck => {
                answerForCheck.selected = false
              })
              this.gameTime -=5
            }
            this.count = 0
            this.answersForCheck = []
            }, 1000)
          }
        } else if (this.answersForCheck.length < 1) {
          clearTimeout(this.timeout)
          this.answersForCheck.push(answer)
          answer.selected = true
          this.count += 1
        }
      }
    },
    startPractice (setWordMeans) {
      this.start = true
      this.message = null
      this.gameTime = 60
      this.timerGame()
      this.wrongAnswers = {}
      this.getAnswers()
    },
    stopGame () {
      this.start = false
      this.meanId = 0
      this.count = 0
      this.answers = []
      clearTimeout(this.timeout)
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
      } else {
        this.summation()
        this.stopGame()
        this.message = "You win"
      }
    }
  },
  mixins: [
    require('~/mixins/wordPractice').default,
    require('~/mixins/user-base').default
  ]
}
</script>
