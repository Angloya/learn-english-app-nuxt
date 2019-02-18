<template>
  <b-row class="justify-content-center">
    <b-card
      v-if="_practiceInfo"
      :title="_practiceInfo.name"
      :border-variant="isColorDark ? 'light' : 'dark'"
      :bg-variant="isColorDark ? 'dark' : 'light'"
      :text-variant="isColorDark ? 'light' : 'dark'"
      img-src="/image/wordImage2.png"
      style="max-width: 20rem;"
      class="mb-2">
      <p class="card-text">
        {{_practiceInfo.text}}
      </p>
      <b-button
        @click="$emit('click')"> 
          begin to learn the words
      </b-button>
    </b-card>
    <wrongAnswers 
      :_wrongAnswers='_wrongAnswers' 
      v-if="_wrongAnswers"/>
  </b-row>
</template>

<script>
import wrongAnswers from '~/components/wrong-answers.vue'

export default {
  name: 'practice-card',
  components: {
    wrongAnswers
  },
  props: {
    _practiceInfo: {
      type: Object
    },
    _wrongAnswers: {
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
