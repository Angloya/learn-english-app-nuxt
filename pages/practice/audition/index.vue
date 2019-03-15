<template>
  <b-container class="text-center">
    <practice-card
      v-if="!start && infoPractice && !loading"
      :_practiceInfo="infoPractice"
      :_notEnoughWords="notEnoughWords"
      :_wrongAnswers="wrongAnswers"
      @click="getSkyengMeanings" />
    <b-row class="justify-content-center">
      <word-audio v-if="start" 
        @change="checkAnswer"
        @next="setMeanId"
        :_title="meanings[meanId].translation.text"
        :_audio="meanings[meanId].soundUrl || ''"
        :_show="show"
        :_answer="meanings[meanId]"
        :_color="keyColor"
        :_check="checkWord"
        :key="keyColor" />
      </b-row>
      <b-button @click="stopPractice" v-if="start">Stop the practice</b-button>
    <meaning-info :_meaning="meanings[meanId]" v-if="start && checkWord"/>  
  </b-container>
</template>

<script>
import practiceCard from '~/components/cards/Practice-card.vue'
import cardWord from '~/components/cards/CardWord.vue'
import wordAudio from '~/components/cards/word-audio.vue'
import meaningInfo from '~/components/cards/meaning-info.vue'

export default {
  name: 'audition',
  components: {
    practiceCard,
    cardWord,
    wordAudio,
    meaningInfo
  },
  data () {
    return {
      start: false,
      meanId: 0,
      keyColor: null,
      wordsCount: 5,
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
    setMeanId () {
      if (this.meanings && this.meanId != this.meanings.length - 1) {
        this.meanId += 1
        this.keyColor = ''
        this.checkWord = false
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
