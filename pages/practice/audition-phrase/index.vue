<template>
  <b-container class="text-center">
    <practice-card
      v-if="!start && infoPractice && !loading"
      :_practiceInfo="infoPractice"
      :_notEnoughWords="notEnoughWords"
      :_wrongAnswers="wrongAnswers"
      @click="getSkyengMeanings" />
    <b-row class="justify-content-center">
      <phrase-constructor v-if="start && meanings" 
        @change="checkAnswer"
        @next="setMeanId"
        :_words="getWords(meanings[meanId].definition.text)"
        :_audio="meanings[meanId].definition.soundUrl || ''"
        :_show="show"
        :_userAnswer="userAnswer"
        :_answer="meanings[meanId].definition.text"
        :_color="keyColor"
        :_check="checkPhrase"
        :key="keyColor" />
      </b-row>
      <b-button @click="stopPractice" class="my-2" v-if="start" v-translate>Stop the practice</b-button>
  </b-container>
</template>

<script>
import practiceCard from '~/components/cards/Practice-card.vue'
import phraseConstructor from '~/components/cards/phrase-constructor.vue'
import meaningInfo from '~/components/cards/Meaning-info.vue'
import _ from 'lodash'

export default {
  name: 'phrase-audio',
  components: {
    practiceCard,
    phraseConstructor,
    meaningInfo
  },
  data () {
    return {
      start: false,
      meanId: 0,
      wordsCount: 5,
      keyColor: '',
      userAnswer: null,
      wrongAnswers: null,
      checkPhrase: false,
      show: {
        title: true,
        audio: true,
        image: true
      }
    }
  },
  methods: {
    checkAnswer (answer) {
      this.checkPhrase = true
      this.userAnswer = answer
      if (this.meanings[this.meanId].definition.text == answer.slice(0, -1)) {
        this.keyColor = 'success'
      } else {
        this.keyColor = 'danger'
        this.setWrongAnswer(this.meanings[this.meanId])
      }
    },
    getWords (phrase) {
      var words = phrase.split(' ')
      this.sortArray(words)
      return words
    },
    setMeanId () {
      if (this.meanings && this.meanId != this.meanings.length - 1) {
        this.meanId += 1
        this.keyColor = ''
        this.checkPhrase = false
      } else {
        this.summation()
        this.stopPractice()
      }
    }
  },
  mixins: [
    require('~/mixins/wordPractice').default,
    require('~/mixins/user-base').default
  ]
}
</script>
