<template>
  <b-container class="text-center">
    <practice-card
      v-if="!start && infoPractice && !loading"
      :_practiceInfo="infoPractice"
      :_notEnoughWords="notEnoughWords"
      :_wrongAnswers="wrongAnswers"
      @click="getSkyengMeanings" />
    <b-row class="justify-content-center">
      <wordConstructor v-if="start" 
        @change="checkAnswer"
        @next="setMeanId"
        :_title="meanings[meanId].translation.text"
        :_letters="checkWord ? meanings[meanId].text.split('') : getLetters(meanings[meanId].text)"
        :_audio="meanings[meanId].soundUrl || ''"
        :_show="show"
        :_color="keyColor"
        :_check="checkWord"
        :key="keyColor" />
      </b-row>
      <meaning-info :_meaning="meanings[meanId]" v-if="start && checkWord"/>  
  </b-container>
</template>

<script>
import practiceCard from '~/components/cards/Practice-card.vue'
import cardWord from '~/components/cards/CardWord.vue'
import wordConstructor from '~/components/cards/word-constructor.vue'
import meaningInfo from '~/components/cards/meaning-info.vue'
import _ from 'lodash'

export default {
  name: 'make-word',
  components: {
    practiceCard,
    cardWord,
    wordConstructor,
    meaningInfo
  },
  data () {
    return {
      start: false,
      meanId: 0,
      wordsCount: 5,
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
