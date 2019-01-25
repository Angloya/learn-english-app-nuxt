<template>
  <b-card-group deck class="mb-3">
    <b-card 
      v-for="card in cards"
      :key="card.id"
      border-variant="primary"
      header="Primary"
      header-bg-variant="primary"
      header-text-variant="white"
      align="center">
      <p class="card-text">{{card.name}}
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
  computed: {
    cards () {
      if (!this._cards && this._collection && this._document) {
        this.getDBCards()
        return this.dbCards
      } else {
        return this._cards || {}
      }
    }
  },
  methods: {
    getDBCards () {
        this.$store.dispatch('getDocFB', [this._collection, this._document]).then(() => {
          this.dbCards = this.$store.state.docsFB
          return this.dbCards
    })
    }
  }
}
</script>
