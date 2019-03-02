<template>
  <b-card 
    @click="$emit('click', card.id)"
    :border-variant="isColorDark ? 'light' : 'dark'"
    :header="card.Type"
    :text-variant="isColorDark ? 'light' : 'dark'"
    :bg-variant="isColorDark ? 'dark' : 'light'"
    align="center">
    <p class="card-text">{{card.text}}
    </p>
  </b-card>
</template>

<script>

export default {
  name: 'card-game-definition',
  props: {
    _card: {
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
