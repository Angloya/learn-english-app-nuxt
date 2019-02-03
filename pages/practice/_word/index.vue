<template>
  <b-container class="text-center">
    <b-row class="justify-content-center">
    <b-button v-if="!start"
      @click="getSkyengMeanings">begin to learn the words</b-button>
    <wordForLearn v-if="start" 
      @change="checkAnswer"
      @clicked="setMeanId"
      :_title="meanings[meanId].text"
      :_audio="meanings[meanId].soundUrl"
      :_answerId="meanings[meanId].id"
      :_answers="answers"
      :_image="meanings[meanId].images[0].url"
      :_show="show"
      :key="keyColor"
      _answerLabel="translation" />
      </b-row>
  </b-container>
</template>

<script>
import wordForLearn from '~/components/wordForLearn.vue'
import _ from 'lodash'

export default {
  name: 'word',
  components: {
    wordForLearn
  },
  data () {
    return {
      start: false,
      meanId: 0,
      keyColor: '',
      wrongAnswer: [],
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
      return this.$store.state.meanings || []
    }
  },
  methods: {
    setWordMeans () {
      this.answers = []
      this.answers = _.cloneDeep(this.meanings)
      this.sortArray(this.answers)
    },
    setMeanId () {
      if (this.meanings && this.meanId != this.meanings.length - 1)
        this.meanId += 1
        this.keyColor = ''
        this.setWordMeans()
    }
  },
  mixins: [
    require('~/mixins/wordPractice').default
  ]
}
</script>
