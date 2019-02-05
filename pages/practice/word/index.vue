<template>
  <b-container class="text-center">
    <b-row class="justify-content-center">
        <b-card
          title="Word - Translation"
          v-if="!start"
          img-src="/image/wordPractice.png"
          style="max-width: 20rem;"
          class="mb-2">
    <p class="card-text">
      Here you need to select one correct translation of the word.
    </p>
    <b-button
      @click="getSkyengMeanings"> 
        begin to learn the words
    </b-button>
  </b-card>
    <b-container 
      class="mt-3 text-center"  
      v-if="!start && wrongAnswers.length">
      <h2>Words added to your dictionary</h2>
      <b-row class="justify-content-center"
        align-h="center">
       <b-col cols="auto" md="auto" sm="auto" v-for="word in wrongAnswers" :key="word.id">
      <cardWord
        class="mb-3"
        :_imageWord="getMeaningImg(word)"
        :_title="word.text"
        :_text="word.translation.text"
        :_transcription="word.transcription"
        :_audio="word.soundUrl"/>
      </b-col>
     </b-row>
    </b-container>
      <wordForLearn v-if="start" 
        @change="checkAnswer"
        @clicked="setMeanId"
        :_title="meaning.text"
        :_audio="meaning.soundUrl"
        :_answerId="meaning.id"
        :_answers="answers"
        :_image="getMeaningImg(meaning)"
        :_show="show"
        :key="keyColor"
        _answerLabel="translation" />
      </b-row>
  </b-container>
</template>

<script>
import wordForLearn from '~/components/wordForLearn.vue'
import cardWord from '~/components/CardWord.vue'
import _ from 'lodash'

export default {
  name: 'word',
  components: {
    wordForLearn,
    cardWord
  },
  data () {
    return {
      start: false,
      meanId: 0,
      keyColor: '',
      wrongAnswers: [],
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
