<template>
  <b-card no-body
    :bg-variant="_color"
    :text-variant="_check ? 'white' : ''"
    style="max-width: 60rem; min-width: 20rem;">
    <b-container slot="header" class="px-0">
      <b-row class="text-center">
        <b-col cols="9" class="px-0">
          <h3 slot="header" v-if="_show.title">
          {{_title}}
          </h3>
        </b-col>
        <b-col class="px-0">
          <i slot="header"
            @click="showAudio = !showAudio"
            class="material-icons md-light">help</i>
        </b-col>
        <b-col class="px-0">
          <i slot="header"
            v-if="!_check"
            @click="resetLetters"
            class="material-icons md-light">cached</i>
        </b-col>
        </b-row>
    </b-container>
    <b-card-body v-if="_show.audio && showAudio">
      <audio controls style="width: 250px;">
        <source :src="_audio" type="audio/mpeg">
      </audio>
    </b-card-body>
    <b-card-body>
      <b-row class="text-center py-5">
        <b-col v-for="(letter, idx) in letters" :key="idx" class="px-1">
          <b-button
            size="lg"
            variant="primary"
            class='word-constructor-letter-button'
            v-if="!_check"
            @click="setLetter(idx)">
            {{letter}}
          </b-button>
          <b-button
            size="lg"
            variant="primary"
            class='word-constructor-letter-button'
            v-if="_check">
            {{letter}}
          </b-button>
        </b-col>
      </b-row>
    </b-card-body>
     <b-card v-if="!_check" :title="answer"/>
    <b-card-body>
      <b-button
        variant="primary"
        v-if="!_check"
        size="lg"
        @click="$emit('change', answer)">
        Check
      </b-button>
      <b-button
        variant="primary"
        v-if="_check"
        size="lg"
        @click="$emit('next')">
        continue
      </b-button>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  name: 'word-constructor',
  props: {
    _title: { 
      type: String,
      default: ''
    },
    _color: {
      type: String,
      default: ''
    },
    _check: {
      type: Boolean,
      default: false
    },
    _letters: { 
      type: Array,
      default: ''
    },
    _audio: {
      type: String,
      default: ''
    },
    _show: {
      type: Object
    }
  },
  data () {
    return {
      showAudio: false,
      answer: '',
      letters: [...this._letters] || []
    }
  },
  methods: {
    resetLetters () {
      this.letters = [...this._letters]
      this.answer = ''
    },
    setLetter (id) {
      this.answer += this.letters[id]
      this.letters.splice(id, 1)
    }
  }
}
</script>