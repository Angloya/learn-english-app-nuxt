<template>
  <b-container class="text-center">
    <practice-card
      v-if="!start && infoPractice && !loading"
      :_practiceInfo="infoPractice"
      :_wrongAnswers="wrongAnswers"
      @click="getSkyengMeanings" />
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
import WordForLearn from '~/components/Word-for-learn.vue'
import cardWord from '~/components/CardWord.vue'
import practiceCard from '~/components/Practice-card.vue'
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
    setWordMeans () {
      this.answers = []
      this.answers = _.cloneDeep(this.meanings)
      this.sortArray(this.answers)
    },
    getSkyengMeanings () {
      this.$store.dispatch('getSkyengMeanings', this.randomIds()).then(() => {
        if( this.$store.state.appLogic.meanings.length === 5) {
          this.start = true
          this.wrongAnswers = {}
          this.setWordMeans()
          return this.$store.state.appLogic.meanings
        } else {
          this.getSkyengMeanings()
        }
      })
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
