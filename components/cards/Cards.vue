<template>
  <b-card-group deck class="mb-3">
    <b-card 
      v-for="card in _cards"
      :key="card.id"
      @click="$emit('click', card.routName)"
      :border-variant="isColorDark ? 'light' : 'dark'"
      :header="card.name"
      :text-variant="isColorDark ? 'light' : 'dark'"
      :bg-variant="isColorDark ? 'dark' : 'light'"
      align="center">
      <p class="card-text" v-translate>{{card.text}}
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
  computed: {
    isColorDark () {
      return this.$store.state.colorScheme.isColorDark
    }
  }
}
</script>
