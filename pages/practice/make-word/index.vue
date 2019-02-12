<template>
  <b-container class="text-center">
    <b-row class="justify-content-center">
      <b-card
        title="Make a word"
        v-if="!start"
        img-src="/image/wordImage2.png"
        style="max-width: 20rem;"
        class="mb-2">
        <p class="card-text">
          You need to collect the word from the provided letters.
        </p>
        <b-button
          @click="getSkyengMeanings"> 
            begin to learn the words
        </b-button>
      </b-card>
      <wrongAnswers 
        :_wrongAnswers='wrongAnswers' 
        v-if="!start && wrongAnswers"/>
      <wordConstructor v-if="start" 
        @change="checkAnswer"
        @next="setMeanId"
        :_title="meanings[meanId].translation.text"
        :_letters="getLetters(meanings[meanId].text)"
        :_audio="meanings[meanId].soundUrl"
        :_show="show"
        :_color="keyColor"
        :_check="checkWord"
        :key="keyColor" />
      </b-row>
  </b-container>
</template>

<script>
import wrongAnswers from '~/components/wrong-answers.vue'
import cardWord from '~/components/CardWord.vue'
import wordConstructor from '~/components/word-constructor.vue'
import _ from 'lodash'
import { delay } from 'q';

export default {
  name: 'make-word',
  components: {
    wrongAnswers,
    cardWord,
    wordConstructor
  },
  data () {
    return {
      start: false,
      meanId: 0,
      keyColor: '',
      wrongAnswers: null,
      checkWord: false,
      show: {
        title: true,
        audio: true,
        image: true
      }
    }
  },
  computed: {
    meanings () {
      return this.$store.state.appLogic.meanings || []
    }
  },
  methods: {
    getSkyengMeanings () {
      this.$store.dispatch('getSkyengMeanings', this.randomIds()).then(() => {
        if( this.$store.state.appLogic.meanings.length === 5) {
          this.start = true
          this.wrongAnswers = {}
          return this.$store.state.appLogic.meanings
        } else {
          this.getSkyengMeanings()
        }
      })
    },
    checkAnswer (answer) {
      this.checkWord = true
      if (this.meanings[this.meanId].text == answer) {
        this.keyColor = 'success'
      } else {
        this.keyColor = 'danger'
        this.setWrongAnswer(this.meanings[this.meanId])
      }
    },
    getLetters (word) {
      var letters = word.split('')
      this.sortArray(letters)
      return letters
    },
    setMeanId () {
      if (this.meanings && this.meanId != this.meanings.length - 1) {
        this.meanId += 1
        this.keyColor = ''
        this.checkWord = false
      } else {
        this.start = false
      }
    }
  },
  mixins: [
    require('~/mixins/wordPractice').default
  ]
}
</script>
