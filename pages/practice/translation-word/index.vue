<template>
  <b-container class="text-center">
    <b-row class="justify-content-center">
        <b-card
          title="Translation - Word"
          v-if="!start"
          img-src="/image/wordImage.png"
          style="max-width: 20rem;"
          class="mb-2">
        <p class="card-text">
          Here you need to select one correct word of the translation.
        </p>
        <b-button
          @click="getSkyengMeanings"> 
            begin to learn the words
        </b-button>
      </b-card>
      <wrongAnswers 
        :_wrongAnswers='wrongAnswers' 
        v-if="!start && wrongAnswers"/>
      <wordForLearn v-if="start" 
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
import wordForLearn from '~/components/wordForLearn.vue'
import cardWord from '~/components/CardWord.vue'
import wrongAnswers from '~/components/wrong-answers.vue'
import _ from 'lodash'

export default {
  name: 'translation-word',
  components: {
    wordForLearn,
    cardWord,
    wrongAnswers
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
        this.meanId = 0
      }
    }
  },
  mixins: [
    require('~/mixins/wordPractice').default
  ]
}
</script>
