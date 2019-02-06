<template>
  <b-container class="text-center">
    <h2  class="my-2">Dictionary</h2>
    <loading v-if="loading"/>
    <b-row class="my-4 justify-content-center" v-if="!loading">
      <b-col cols="8" sm="8" md="4">
        <b-form @keyup.enter.prevent="getWordFromDictionary" class="d-flex justify-content-center align-items-center">
          <b-form-input size="md" class="my-3" v-model="searchWord" type="text" placeholder="Search"/>
          <b-button size="md" type="submit"
            class="d-flex justify-content-center align-items-center mx-3"
            @click.prevent="getWordFromDictionary"><i class="material-icons md-light">search</i></b-button>
        </b-form>
      </b-col>
     </b-row>
    <b-row class="justify-content-center" v-if="!loading">
      <b-col v-for="word in wordsForDictionary" :key="word.id">
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
      searchWord: ''
    }
  },
  created () {
    this.getWord()
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    loading () {
      return this.$store.state.loading
    },
    wordsForDictionary () {
      return this.$store.state.wordsForDictionary || {}
    }
  },
  methods: {
    getWord () {
      if (this.user) {
        this.$store.dispatch('getWordsFromDB').then(() => {
          return this.$store.state.wordsForDictionary
        })
      }
    },
    getMeaningImg (mean) {
      if (mean.images.length != 0) {
        return mean.images[0].url
      } else {
        return ''
      }
    },
    getWordFromDictionary () {
      if (this.searchWord) {
        this.$router.push("/dictionary/" + this.searchWord)
        this.searchWord = ''
      } 
    }
  }
}
</script>