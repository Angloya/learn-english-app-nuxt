<template>
  <b-container class="text-center">
    <practice-card
      v-if="!start && infoPractice && !loading"
      :_practiceInfo="infoPractice"
      :_notEnoughWords="notEnoughWords"
      :_wrongAnswers="wrongAnswers"
      @click="getSkyengMeanings(true)" />
    <b-row class="justify-content-center">
      <word-for-learn v-if="start" 
        @change="checkAnswer"
        @clicked="setMeanId"
        :_title="meaning.translation.text"
        :_audio="meaning.soundUrl"
        :_answerId="meaning.id"
        :_answers="answers.color"
        :_image="getMeaningImg(meaning)"
        :_show="show"
        :key="keyColor" />
      </b-row>
      <b-button @click="stopPractice" v-if="start">Stop the practice</b-button>
  </b-container>
</template>

<script>
import WordForLearn from '~/components/cards/Word-for-learn.vue'
import cardWord from '~/components/cards/CardWord.vue'
import practiceCard from '~/components/cards/Practice-card.vue'
import _ from 'lodash'
import { delay } from 'q';

export default {
  name: 'translation-word',
  components: {
    WordForLearn,
    cardWord,
    practiceCard
  },
  data () {
    return {
      start: false,
      meanId: 0,
      wordsCount: 5,
      keyColor: '',
      wrongAnswers: null,
      answers: null,
      show: {
        title: true,
        audio: false,
        image: true
      }
    }
  },
  computed: {
    meaning () {
      return this.meanings[this.meanId]
    }
  },
  methods: {
    setMeanId () {
      if (this.meanings && this.meanId != this.meanings.length - 1) {
        this.meanId += 1
        this.keyColor = ''
        this.setWordMeans()
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
