<template>
  <b-card 
    class="mx-0 my-0"
    v-if="_card"
    @click="$emit('click', _card)"
    :border-variant="isColorDark ? 'light' : 'dark'"
    :header="_card.type"
    :text-variant="isColorDark ? 'light' : 'dark'"
    :bg-variant="colorCard"
    align="center">
    <p     :class="_card.selected ? 'bg-info text-white' : ''" class="card-text">{{_card.text}}
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
    },
    colorCard () {
      if (this._card.selected) {
        return 'info'
      } else if (this._card.correct) {
        return 'success'
      }
        else {
        return this.isColorDark ? 'dark' : 'light'
      }
    }
  }
}
</script>
