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
    <meaning-info :_meaning="meanings[meanId]" v-if="start && checkWord"/>  
  </b-container>
</template>

<script>
import practiceCard from '~/components/Practice-card.vue'
import cardWord from '~/components/CardWord.vue'
import wordAudio from '~/components/word-audio.vue'
import meaningInfo from '~/components/meaning-info.vue'

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
        this.start = false
        this.keyColor = ''
        this.checkWord = false
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
