<template>
  <b-container class="text-center">
    <h2  class="my-2">Dictionary</h2>
    <loading v-if="loading"/>
    <b-row class="my-4 justify-content-center" v-if="!loading">
      <b-col cols="8" sm="8" md="4">
        <b-form @keyup.enter.prevent="searchWordInDictionary" class="d-flex justify-content-center align-items-center">
          <b-form-input @input="searchWordInDictionary" size="md" class="my-3" v-model="searchWord" type="text" placeholder="Search"/>
          <b-button size="md" type="submit"
            class="d-flex justify-content-center align-items-center mx-3"
            @click.prevent="searchWordInDictionary"><i class="material-icons md-light">search</i></b-button>
        </b-form>
      </b-col>
     </b-row>
    <b-row class="justify-content-center" v-if="!loading">
      <b-col v-for="(word, idx) in wordsForDictionary" :key="word.id">
    <cardWord
      class="mb-3"
      :_imageWord="getMeaningImg(word)"
      :_title="word.text"
      :_text="word.translation.text"
      :_transcription="word.transcription"
      :_audio="word.soundUrl"
      :_isDictionary='true'
      @delete="deleteWord(word.id, idx)"/>
    </b-col>
    </b-row>
  </b-container>
</template>

<script>
import cardWord from '~/components/CardWord.vue'
import loading from '~/components/loading.vue'
import { delay } from 'q';
export default {
  name: 'dictionary',
  components: {
    cardWord,
    loading
  },
  data () {
    return {
      searchWord: '',
      words: null
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
      return this.words || this.$store.state.wordsForDictionary || []
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
    deleteWord (wordId, idx) {
      this.$store.dispatch('deleteWordsFromDB', wordId).then(() => {
          return this.wordsForDictionary.splice(idx, 1)
        })
    },
    getMeaningImg (mean) {
      if (mean.images.length != 0) {
        return mean.images[0].url
      } else {
        return ''
      }
    },
    searchWordInDictionary () {
      if (this.searchWord) {
         this.words = this.wordsForDictionary.filter((word) => {
          return word.text.toLowerCase().includes(this.searchWord.toLowerCase()) || word.translation.text.toLowerCase().includes(this.searchWord.toLowerCase())
        })
      } else {
        this.words = null
      }
      return this.words
    }
  }
}
</script>