<template>
  <b-container class="text-center">
    <h2  class="my-2">Dictionary</h2>
    <loading v-if="loading"/>
    <b-row class="my-4 justify-content-center" v-if="!loading && stateWords && stateWords.length">
      <b-col cols="4" sm="2" md="1">Cards</b-col>
        <no-ssr>
          <toggle-button class="vue-switcher" v-model="enabledTableView"/>
        </no-ssr>
      <b-col cols="4" sm="2" md="1">Table</b-col>
    </b-row>
    <b-row class="my-4 justify-content-center" v-if="!loading && stateWords && stateWords.length">
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
    <b-row class="my-4 justify-content-center" v-if="!stateWords || (stateWords && stateWords.length === 0)" v-translate> 
      Dictionary is empty
    </b-row>
    <b-row class="justify-content-center"
      v-if="!loading && !enabledTableView">
      <b-col
        cols="auto"
        md="auto"
        class="mb-3"
        v-for="(word, idx) in wordsForDictionary"
        :key="word.id">
        <cardWord
          :_imageWord="getMeaningImg(word)"
          :_title="word.text"
          :_text="word.translation ? word.translation.text : ''"
          :_transcription="word.transcription"
          :_audio="word.soundUrl"
          :_counter="word.knowledge"
          :_isExtraButtonShow='true'
          @change="deleteWord(word.id, idx)"/>
        <b-button
          class="mt-1"
          style="min-width: 10rem;"
          size="sm"
          @click="getWordPage(word.id)">
           {{t('Learn more')}}
        </b-button>
      </b-col>
    </b-row>
    <b-row class="justify-content-center" v-if="!loading && enabledTableView && stateWords && stateWords.length !== 0">
       <b-table
        striped
        hover
        bordered
        responsive
        :current-page="words ? 1 : currentPage"
        :per-page="words ? 1000 : 10"
        :items="tableWords" 
        :fields="fields">
        <template slot="knowledge" slot-scope="row">
          <b-progress :value="row.item.knowledge" :max="10" animated />
        </template>
          <template slot="actions" slot-scope="row">
            <b-container>
              <b-row class="justify-content-center">
                <b-col
                  cols="auto"
                  md="auto">
                  <b-button size="sm" @click="getWordPage(row.item.id)" class="mr-1">
                   {{t('Learn more')}}
                  </b-button>
                </b-col>
                <b-col
                  cols="auto"
                  md="auto">
                  <i class="material-icons md-dark" @click="deleteWord(row.item.id, row.index)">delete</i>
                </b-col>
              </b-row>
            </b-container>
          </template>
       </b-table>
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
import cardWord from '~/components/cards/CardWord.vue'
import Loading from '~/components/loading.vue'
import emptySearch from '~/components/EmptySearch.vue'
import { delay } from 'q'

export default {
  name: 'dictionary',
  components: {
    cardWord,
    Loading,
    emptySearch
  },
  data () {
    return {
      searchWord: '',
      words: null,
      searchWord: false,
      currentPage: 1,
      enabledTableView: false,
      fields: [
        {
          key: 'text',
          label: 'Word',
          sortable: true
        },
        {
          key: 'translation.text',
          label: 'Translation',
          sortable: false
        },
        {
          key: 'knowledge',
          label: 'degree of knowledge',
          sortable: true
        },
        { 
          key: 'actions',
          label: 'Actions' 
        }
      ]
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
      if (this.words) {
        return this.words
      } else {
        if (this.stateWords) {
          return this.stateWords.slice((this.currentPage - 1) * 10, this.currentPage * 10)
        } else {
          return []
        }
      }
    },
    tableWords () {
       return this.words || this.$store.state.appLogic.wordsForDictionary
    },
    stateWords () {
      return this.words || this.$store.getters.wordsForDictionary 
    }
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
          return this.$store.getters.wordsForDictionary.splice(idx, 1)
        })
    },
    getMeaningImg (mean) {
      if (mean.images && mean.images.length != 0) {
        return mean.images[0].url
      } else {
        return ''
      }
    },
    searchWordInDictionary () {
      if (this.searchWord) {
         this.words = this.stateWords.filter((word) => {
          return word.text.toLowerCase().includes(this.searchWord.toLowerCase()) || word.translation.text.toLowerCase().includes(this.searchWord.toLowerCase())
        })
      } else {
        this.words = null
      }
      return this.words
    },
    getWordPage (id) {
       this.$router.push("/dictionary/id/" + id)
    }
  }
}
</script>