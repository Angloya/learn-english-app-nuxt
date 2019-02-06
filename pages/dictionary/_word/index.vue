<template>
   <b-container class="text-center">
    <loading v-if="loading"/>
    <h2 v-if="!wordMeaning && !loading">Sorry we can't find the word "{{searchWord}}"</h2>
    <b-row class="justify-content-center"
      v-if="!isShowAllMeanings && !loading">
      <cardWord
      v-if="wordMeaning"
      :_imageWord="wordMeaning.imageUrl"
      :_title="word[0].text"
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
        :_imageWord="word.imageUrl"
        :_title="searchWord"
        :_text="word.translation.text"
        :_transcription="word.transcription"
        :_audio="word.soundUrl"/>
      </b-col>
     </b-row>
    </b-container>
  </b-container>
</template>

<script>
import cardWord from '~/components/CardWord.vue'
import loading from '~/components/loading.vue'

export default {
  name: 'dictionary',
  components: {
    cardWord,
    loading
  },
  data () {
    return {
      isShowAllMeanings: false
    }
  },
  computed: {
    searchWord () {
      return this.$route.params.word
    },
    loading () {
      return this.$store.state.loading
    },
    word () {
      return this.$store.state.word
    },
    wordMeaning () {
      if (this.word && this.word.length != 0) {
        return this.word[0].meanings[0]
      }
    },
    words () {
       if (this.word && this.word.length != 0) {
        return this.word[0].meanings
      }
    }
  },
  created () {
    this.$store.dispatch('getSkyengWord', this.searchWord).then(() => {
      return this.$store.state.word
    })
  },
  methods: {
    showAllMeanings () {
      this.isShowAllMeanings = !this.isShowAllMeanings
    }
  }
}
</script>