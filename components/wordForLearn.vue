<template>
  <b-card no-body
    style="max-width: 20rem;">
    <h4 slot="header"
      v-if="_show.title">
      {{_title}}</h4>
    <b-list-group flush>
      <b-list-group-item
        v-for="answer in sortAnswer(_answers)"
        :key="answer.id"
        @click="checkAnswer(answer)">
        {{answer[_answerLabel].text}}
      </b-list-group-item>
    </b-list-group>
    <b-card-body v-if="_show.audio">
      <audio controls style="width: 250px;">
        <source :src="_audio" type="audio/mpeg">
      </audio>
    </b-card-body>
    <!-- <b-card-footer v-if="_showAllMean">
      <b-button @click="$emit('click')">{{_showAllMean}}
        </b-button>
      </b-card-footer> -->
  </b-card>
</template>

<script>
export default {
  name: 'word-for-learn',
  props: {
    _title: { 
      type: String,
      default: ''
    },
    _answerId:{
      type: String,
      default: 'text'
    },
    _answers: {
      type: Array
    },
    _audio: {
      type: String,
      default: ''
    },
    _show: {
      type: Object
    },
    _answerLabel: {
      type: String
    }
  },
  // computed: {
  //   answers () {
  //     return Object.assign(this._answers
  //   }
  // },
  methods: {
    checkAnswer (answer) {
      debugger
      if (this._answerId == answer.id) {
        this.$emit('change', answer)
      }
    },
    sortAnswer(answers) {
      return answers.slice().sort(this.compareRandom)
    },
    compareRandom(a, b) {
      return Math.random() - 0.5
    }
  }
}
</script>
