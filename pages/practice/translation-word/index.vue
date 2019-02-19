<template>
  <b-container class="text-center">
    <practice-card
      v-if="!start && infoPractice && !loading"
      :_practiceInfo="infoPractice"
      :_wrongAnswers="wrongAnswers"
      @click="getSkyengMeanings(true)" />
    <b-row class="justify-content-center">
      <word-for-learn v-if="start" 
        @change="checkAnswer"
        @clicked="setMeanId"
        :_title="meaning.translation.text"
        :_audio="meaning.soundUrl"
        :_answerId="meaning.id"
        :_answers="answers"
        :_image="getMeaningImg(meaning)"
        :_show="show"
        :key="keyColor" />
      </b-row>
  </b-container>
</template>

<script>
import WordForLearn from '~/components/Word-for-learn.vue'
import cardWord from '~/components/CardWord.vue'
import practiceCard from '~/components/Practice-card.vue'
import _ from 'lodash'

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
    meanings () {
      return this.$store.state.appLogic.meanings || []
    },
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
        this.start = false
        this.meanId = 0
      }
    }
  },
  mixins: [
    require('~/mixins/wordPractice').default
  ]
}
</script>
