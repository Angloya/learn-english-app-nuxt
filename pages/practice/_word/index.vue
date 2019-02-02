<template>
  <b-container class="text-center">
    <b-button @click="getSkyengMeanings">begin to learn the words</b-button>
    <wordForLearn v-if="start" 
      @change="setMeanId"
      :_title="meanings[meanId].text"
      :_audio="meanings[meanId].soundUrl"
      :_answerId="meanings[meanId].id"
      :_answers="meanings"
      :_show="show"
      _answerLabel="translation" />
  </b-container>
</template>

<script>
import wordForLearn from '~/components/wordForLearn.vue'

export default {
  name: 'word',
  components: {
    wordForLearn
  },
  data () {
    return {
      start: false,
      meanId: 0,
      show: {
        title: true,
        audio: false,
      }
    }
  },
  computed: {
    meanings () {
      return this.$store.state.meanings || {}
    }
  },
  methods: {
    setMeanId () {
      if (this.meanings && this.meanId != this.meanings.length - 1)
        this.meanId += 1
    },
    getSkyengMeanings () {
      this.$store.dispatch('getSkyengMeanings', this.randomIds()).then(() => {
        if( this.$store.state.meanings.length === 5) {
          this.start = true
          return this.$store.state.meanings
        } else {
          this.getSkyengMeanings()
        }
      })
    },
    randomIds () {
      var randomNum = []
      for (var i=0; i<5; i++) {
        var id = Math.floor(Math.random()*(250000))
         randomNum[i]=id
      }
      return randomNum

    }
  }
}
</script>
