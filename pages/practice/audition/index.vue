<template>
  <b-container class="text-center">
    <practice-card
      v-if="!start && infoPractice"
      :_practiceInfo="infoPractice"
      :_wrongAnswers="wrongAnswers"
      @click="getSkyengMeanings" />
    <b-row class="justify-content-center">
      <wordConstructor v-if="start" 
        @change="checkAnswer"
        @next="setMeanId"
        :_title="meanings[meanId].translation.text"
        :_letters="checkWord ? meanings[meanId].text.split('') : getLetters(meanings[meanId].text) "
        :_audio="meanings[meanId].soundUrl || ''"
        :_show="show"
        :_color="keyColor"
        :_check="checkWord"
        :key="keyColor" />
      </b-row>
  </b-container>
</template>

<script>
import practiceCard from '~/components/Practice-card.vue'
import cardWord from '~/components/CardWord.vue'
import wordConstructor from '~/components/word-constructor.vue'
import _ from 'lodash'

export default {
  name: 'audition',
  components: {
    practiceCard,
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
        this.keyColor = ''
        this.checkWord = false
        this.meanId = 0
      }
    }
  },
  mixins: [
    require('~/mixins/wordPractice').default
  ]
}
</script>
