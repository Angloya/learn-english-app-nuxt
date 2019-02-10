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
      <wordForLearn v-if="start" 
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
import wordForLearn from '~/components/wordForLearn.vue'
import cardWord from '~/components/CardWord.vue'
import wrongAnswers from '~/components/wrong-answers.vue'
import _ from 'lodash'

export default {
  name: 'word-translation',
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
