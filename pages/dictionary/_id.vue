<template>
  <b-container class="text-center">
     <b-row class="justify-content-center" v-if="!isShowAllMeanings">
      <cardWord
      v-if="wordMeaning"
      :_imageWord="wordMeaning.imageUrl"
      :_title="$route.params.id"
      :_text="wordMeaning.translation.text"
      :_note="wordMeaning.translation.note"
      :_transcription="wordMeaning.transcription"
      :_audio="wordMeaning.soundUrl"
      _showAllMean="More translations"
      @click="showAllMeanings"/>
     </b-row>
     <b-container class="text-center" v-if="isShowAllMeanings">
      <b-row class="justify-content-center">
       <b-col v-for="word in words" :key="word.id">
      <cardWord
        class="mb-3"
        :_imageWord="word.meanings[0].imageUrl"
        :_title="word.text"
        :_text="word.meanings[0].translation.text"
        :_note="word.meanings[0].translation.note"
        :_transcription="word.meanings[0].transcription"
        :_audio="word.meanings[0].soundUrl"/>
      </b-col>
     </b-row>
    </b-container>
  </b-container>
</template>

<script>
import cardWord from '~/components/CardWord.vue'
export default {
  name: 'dictionary',
  components: {
    cardWord
  },
  data () {
    return {
      isShowAllMeanings: false
    }
  },
  computed: {
    word () {
      return this.$store.state.word
    },
    wordMeaning () {
      if (this.word) {
        return this.word[0].meanings[0]
      }
    },
    words () {
      if (this.word) {
        return this.word
      }
    }
  },
  created () {
    this.$store.dispatch('getSkyengWord', this.$route.params.id).then(() => {
      return this.$store.state.word[0].meanings[0]
    })
  },
  methods: {
    showAllMeanings () {
      this.isShowAllMeanings = !this.isShowAllMeanings
    }
  }
}
</script>