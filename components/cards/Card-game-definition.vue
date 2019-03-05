<template>
  <b-card 
    v-if="_card"
    @click="$emit('click', _card.id)"
    :border-variant="isColorDark ? 'light' : 'dark'"
    :header="_card.type"
    :text-variant="isColorDark ? 'light' : 'dark'"
    :bg-variant="isColorDark ? 'dark' : 'light'"
    align="center">
    <p class="card-text">{{_card.text}}
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
