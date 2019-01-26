<template>
  <b-card-group deck class="mb-3">
    <b-card 
      v-for="card in cards"
      :key="card.id"
      border-variant="info"
      :header="card.name"
      header-bg-variant="info"
      header-text-variant="white"
      align="center">
      <p class="card-text">{{card.text}}
      </p>
    </b-card>
  </b-card-group>
</template>

<script>
import firebase, {StoreDB} from '@/services/fireinit.js'

export default {
  name: 'cards',
  props: {
    _collection: {
      type: String
    },
    _document: {
      type: String
    },
    _cards: {
      type: Object
    }
  },
  data () {
    return {
      dbCards: {}
    }
  },
  created () {
    if (!this._cards && this._collection && this._document) {
        this.getDBCards()
    }
  },
  computed: {
    cards () {
      if (this.dbCards) {
        return this.dbCards
      } else {
        return this._cards || {}
      }
    }
  },
  methods: {
    getDBCards () {
        this.$store.dispatch('getDocFB', [this._collection, this._document]).then(() => {
          this.dbCards = this.$store.state.docsFB[this._document]
          return this.dbCards
      })
    }
  }
}
</script>
