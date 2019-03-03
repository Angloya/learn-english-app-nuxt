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
        :_title="meanings[meanId].text"
        :_audio="meanings[meanId].soundUrl"
        :_answerId="meanings[meanId].id"
        :_answers="answers"
        :_image="meanings[meanId].images[0].url || ''"
        :_show="show"
        :key="keyColor"
        _answerLabel="translation" />
      </b-row>
  </b-container>
</template>

<script>
import WordForLearn from '~/components/cards/Word-for-learn.vue'
import cardWord from '~/components/cards/CardWord.vue'
import practiceCard from '~/components/cards/Practice-card.vue'
import _ from 'lodash'

export default {
  name: 'word-translation',
  components: {
    WordForLearn,
    cardWord,
    practiceCard
  },
  data () {
    return {
      start: false,
      meanId: 0,
      keyColor: '',
      wordsCount: 5,
      wrongAnswers: null,
      answers: null,
      show: {
        title: true,
        audio: true,
        image: true
      }
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
        this.start = false
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
