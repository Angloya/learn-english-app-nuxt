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
        @clicked="setMeanId"
        :_title="meanings[meanId].translation.text"
        :_letters="getLetters(meanings[meanId].text)"
        :_audio="meanings[meanId].soundUrl"
        :_show="show"
        :key="keyColor" />
      </b-row>
  </b-container>
</template>

<script>
import wordForLearn from '~/components/wordForLearn.vue'
import cardWord from '~/components/CardWord.vue'
import wordConstructor from '~/components/word-constructor.vue'
import _ from 'lodash'
import { delay } from 'q';

export default {
  name: 'make-word',
  components: {
    wordForLearn,
    cardWord,
    wordConstructor
  },
  data () {
    return {
      start: false,
      meanId: 0,
      keyColor: '',
      wrongAnswers: null,
      answers: null,
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
    
    getLetters (word) {
      debugger
      var letters = word.split('')
      this.sortArray(letters)
      return letters
    },
    setMeanId () {
      if (this.meanings && this.meanId != this.meanings.length - 1) {
        this.meanId += 1
        this.keyColor = ''
        this.setWordMeans()
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
