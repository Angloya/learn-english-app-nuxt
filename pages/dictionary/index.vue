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
            @click.prevent="searchWordInDictionary">
            <i class="material-icons md-light">search</i>
          </b-button>
        </b-form>
      </b-col>
    </b-row>
    <emptySearch
      :_searchWord="searchWord"
      v-if="words && words.length == 0"/>
    <b-row class="justify-content-center" v-if="!loading">
      <b-col
        cols="auto"
        md="auto"
        v-for="(word, idx) in wordsForDictionary"
        :key="word.id">
        <cardWord
          class="mb-3"
          :_imageWord="getMeaningImg(word)"
          :_title="word.text"
          :_text="word.translation.text"
          :_transcription="word.transcription"
          :_audio="word.soundUrl"
          :_isExtraButtonShow='true'
          @change="deleteWord(word.id, idx)"/>
      </b-col>
    </b-row>
    <b-row class="justify-content-center" v-if="!loading">
      <b-pagination
        size="md"
        v-if="paginatorTotalsRow > 10 && !words"
        :total-rows="paginatorTotalsRow"
        v-model="currentPage"
        :per-page="10"/>
    </b-row>
  </b-container>
</template>

<script>
import cardWord from '~/components/CardWord.vue'
import loading from '~/components/loading.vue'
import emptySearch from '~/components/EmptySearch.vue'
import { delay } from 'q';
export default {
  name: 'dictionary',
  components: {
    cardWord,
    loading,
    emptySearch
  },
  data () {
    return {
      searchWord: '',
      words: null,
      searchWord: false,
      currentPage: 1
    }
  },
  created () {
    this.getWords()
  },
  computed: {
    user () {
      return this.$store.state.appLogic.user
    },
    paginatorTotalsRow () {
      if (this.stateWords) {
        return this.stateWords.length
      }
    },
    loading () {
      return this.$store.state.appLogic.loading
    },
    wordsForDictionary () {
      return this.words || this.stateWords.slice((this.currentPage - 1) * 10, this.currentPage * 10) || []
    },
    stateWords () {
      return this.$store.state.appLogic.wordsForDictionary
    },
  },
  methods: {
    getWords () {
      if (this.user) {
        this.$store.dispatch('getWordsFromDB').then(() => {
          return this.$store.state.appLogic.wordsForDictionary
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
         this.words =this.stateWords.filter((word) => {
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