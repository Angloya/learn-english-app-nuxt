<template>
  <b-card-group deck class="mb-3">
    <b-card 
      v-for="card in _cards"
      :key="card.id"
      @click="$emit('click', card.routName)"
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
    _cards: {
      type: Object
    }
  }
}
</script>
