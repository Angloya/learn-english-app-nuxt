<template>
   <b-container class="text-center">
    <loading v-if="loading"/>
    <emptySearch v-if="!wordMeaning && !loading" :_searchWord="searchWord"/>
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
      @click="showAllMeanings"
      :_isExtraButtonShow="wordInDB(wordMeaning)"
      :_extraButton="wordAdded"
      @change="addWordinDB"/>
     </b-row>
     <b-container class="text-center" v-if="isShowAllMeanings">
      <b-row class="justify-content-center">
        <b-col
          cols="auto"
          md="auto"
          v-for="word in words"
          :key="word.id">
          <cardWord
            class="mb-3"
            :_imageWord="word.imageUrl"
            :_title="searchWord"
            :_text="word.translation.text"
            _showAllMean="Hide translations"
            :_transcription="word.transcription"
            @click="showAllMeanings"
            :_audio="word.soundUrl"/>
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>

<script>
import cardWord from '~/components/cards/CardWord.vue'
import Loading from '~/components/loading.vue'
import emptySearch from '~/components/EmptySearch.vue'
import { delay } from 'q';

export default {
  name: 'dictionary',
  components: {
    cardWord,
    Loading,
    emptySearch
  },
  data () {
    return {
      isShowAllMeanings: false,
      wordAdded: 'add'
    }
  },
  computed: {
    searchWord () {
      return this.$route.params.word
    },
    loading () {
      return this.$store.state.appLogic.loading
    },
    user () {
      return this.$store.state.appLogic.user
    },
    word () {
      return this.$store.state.appLogic.word
    },
    wordMeaning () {
      if (this.word && this.word.length != 0) {
        return this.word[0].meanings[0]
      }
    },
    wordsForDictionary () {
       return this.$store.state.appLogic.wordsForDictionary
    },
    words () {
       if (this.word && this.word.length != 0) {
        return this.word[0].meanings
      }
    }
  },
  created () {
    this.$store.dispatch('getSkyengWord', this.searchWord).then(() => {
      return this.$store.state.appLogic.word
    })
    if (!this.wordsForDictionary) {
      this.getWords()
    }
  },
  methods: {
    showAllMeanings () {
      this.isShowAllMeanings = !this.isShowAllMeanings
    },
    getWords () {
      if (this.user) {
        this.$store.dispatch('getWordsFromDB').then(() => {
          return this.$store.state.appLogic.wordsForDictionary
        })
      }
    },
    addWordinDB () {
      this.wordAdded = 'school'
      this.$store.dispatch('getSkyengMeanings', this.wordMeaning.id).then(() => {
          this.$store.dispatch('addWordInDB', this.$store.state.appLogic.meanings[0])
      })
    },
    wordInDB (wordMeaning) {
      var isNotWordDB = true
      if (this.wordsForDictionary) {
       this.wordsForDictionary.forEach(wordForDictionary => {
          if (wordForDictionary.id === String(wordMeaning.id)) {
            isNotWordDB = false
          }
        })
      }
      return isNotWordDB
    }
  }
}
</script>