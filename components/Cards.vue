<template>
  <b-card-group deck class="mb-3">
    <b-card 
      v-for="card in _cards"
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
export default {
  name: 'cards',
  props: {
    _cards: {
      type: Object
    }
  },
  data () {
    return {
    }
  }
}
</script>
