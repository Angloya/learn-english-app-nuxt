<template>
  <b-row class="justify-content-center">
    <b-card
      v-if="_practiceInfo"
      :title="_practiceInfo.name"
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
}
</script>
