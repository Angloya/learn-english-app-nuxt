<template>
  <b-container 
    class="mt-3 text-center" v-if="!isAnswersEmpty" >
    <h2 v-if="user">Words added to your dictionary</h2>
    <h2 v-else>Wrong answers</h2>
    <b-row class="justify-content-center">
      <b-col
        cols="auto"
        md="auto"
        v-for="word in _wrongAnswers"
        :key="word.id">
        <cardWord
          class="mb-3"
          :_imageWord="word.images[0].url || ''"
          :_title="word.text"
          :_text="word.translation.text"
          :_transcription="word.transcription"
          :_audio="word.soundUrl"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import cardWord from '~/components/cards/CardWord.vue'

export default {
  name: 'wrong-answers',
  components: {
    cardWord
  },
  props: {
    _wrongAnswers: {
      type: Object,
      default: () => {}
    }
  }, 
  computed: {
    user () {
      return this.$store.state.appLogic.user
    },
    isAnswersEmpty () {
      for (var answer in this._wrongAnswers) {
        return false 
      } 
      return true
    }
  }
}
</script>

