<template>
  <b-card 
    class="mx-0 my-0"
    v-if="_card"
    :style="cardSelected"
    @click="$emit('click', _card)"
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
  watch: {
    cardSelected () {
      debugger
    }
  },
  computed: {
    isColorDark () {
      return this.$store.state.colorScheme.isColorDark
    },
    cardSelected ()  {
      return  this._card.selected
    }
  }
}
</script>
